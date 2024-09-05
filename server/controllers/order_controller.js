const Razorpay = require('razorpay');
const crypto = require("crypto");

const Plan = require("../models/plan_model");
const Subscription = require("../models/subscription_model");
const User = require("../models/user_model");
const Payment = require("../models/payment_model");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount, currency) => {
    try {

        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit
            currency: currency,
            receipt: crypto.randomBytes(10).toString("hex"),
            payment_capture: '0'
        };
  
        const order = await razorpay.orders.create(options);
        return order;

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw new Error('Payment authorization failed');
    }
};

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const signature = crypto.createHmac('sha256', keySecret).update(razorpayOrderId + '|' + razorpayPaymentId).digest('hex');

    return signature;
};

// user should not have any subcription with status as ACTIVE
// user should not have any plans with status as pending
// user should not have any subscription whose endDate is greater than the current date
// user have any subscription with progree will be canceled as failed subscription

// check whether subscription and plan exist or not
// subscription has been progress and should not be failed
// after verifying payment subscription will be active
// new subscription will be linked to user
// also update user
// in case subscription we may need to handle refund

const initialiseOrder = async (req, res) => {

    try {

        const { userId } = req;

        const { planId } = req.body;

        if(!userId || !planId) return res.status(400).json({ success: false, message: 'INVALID_BODY' });
        
        const planDetails = await Plan.findById(planId);

        if(!planDetails) return res.status(400).json({ success: false, message: 'INVALID_PLAN' });
        
        const { amount, currency, duration } = planDetails;

        if(isNaN(duration)) throw new Error('Invalid duration.');

        const currentDate = new Date();

        // const endDate = new Date(currentDate);
        // endDate.setMonth(currentDate.getMonth() + duration);

        const endDate = new Date(currentDate);
        endDate.setMonth(currentDate.getMonth() + duration);

        // Adjust endDate to be the last day of the month if necessary
        // const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
        // endDate.setDate(lastDayOfMonth.getDate());

        const adjustedEndDate = new Date(endDate);
        if (adjustedEndDate.getMonth() === 1) { // February is month 1 in JavaScript
            // Ensure it doesn't exceed February's last day
            const lastDayOfFebruary = new Date(adjustedEndDate.getFullYear(), 2, 0);
            if (adjustedEndDate.getDate() > lastDayOfFebruary.getDate()) {
                adjustedEndDate.setDate(lastDayOfFebruary.getDate());
            }
        }
  
        if(isNaN(adjustedEndDate.getTime())) throw new Error('Invalid endDate calculated.');

        // await Subscription.updateMany(
        //     { status: "PROGRESS" },
        //     { $set: { status: "FAILED" } }
        // );
          
        const activeSubscriptions = await Subscription.find({
            user: userId,
            status: "ACTIVE"
        });

        const futureSubscriptions = await Subscription.find({
            user: userId,
            status: "PENDING"
        });

        // const existingSubscriptions = await Subscription.find({
        //     user: userId,         
        //     endDate: { $gt: currentDate }
        // });      
        
        if(activeSubscriptions.length > 0 || futureSubscriptions.length > 0){
           return res.status(400).json({ success: false, message: 'NOT_ELIGIBLE' });
        }

        const newSubscription = await Subscription.create({
            user: userId,
            plan: planId,
            startDate: currentDate,
            endDate: endDate
        });

        if(!newSubscription) return res.status(400).json({ success: false, message: 'SOMETHING_WENT_WRONG' });

        const { id } = newSubscription;

        const order = await createOrder(amount, currency);

        if(!order){
            await Subscription.findByIdAndDelete(id);
            return res.status(500).json({ success: false, message: 'SOMETHING_WENT_WRONG' });
        }

        return res.status(200).json({ order, subscriptionId: id });
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" }); 
    }
}

const verifyPayment = async(req, res) => {
    try {

        const { userId } = req;
        const { orderCreationId, razorpayPaymentId, razorpaySignature, subscriptionId } = req.body;

        // Validate request
        if(!userId || !orderCreationId || !razorpayPaymentId || !razorpaySignature || !subscriptionId) return res.status(400).json({ success: false, message: 'INVALID_BODY' });

        // Verify payment signature
        const signature = generatedSignature(orderCreationId, razorpayPaymentId);
        if(signature !== razorpaySignature) return res.status(400).json({ success: false, message: "PAYMENT_VERIFICATION_FAILED" }); 
        
        // Fetch payment details
        const payment = await razorpay.payments.fetch(razorpayPaymentId);   
        // Payment is not authorized or already captured
        if(!payment || payment.status !== 'authorized') return res.status(400).json({ success: false, message: 'PAYMENT_NOT_AUTHORIZED' });
        
        // Check subscription
        const subscription = await Subscription.findOne({ 
            _id: subscriptionId, 
            user: userId
        });

        if(!subscription) return res.status(404).json({ success: false, message: 'SUBSCRIPTION_NOT_FOUND' });

        if(subscription.status !== 'PROGRESS') return res.status(200).json({ success: true, message: 'PAYMENT_ALREADY_VERIFIED' });

        // Check payment timeout
        const orderCreationTime   = parseInt(payment.created_at, 10);
        const currentTime         = Math.floor(Date.now() / 1000); 
        const differenceInSeconds = Math.abs((currentTime - orderCreationTime) / 1000);

        // 600 seconds = 10 minutes
        if(differenceInSeconds >= 600) return res.status(404).json({ success: false, message: 'PAYMENT_TIMEOUT' });
        
        const { id, amount, currency, method, order_id } = payment;

        // Record the payment
        const paymentRecord = await Payment.create({
            user: userId,
            subscription: subscriptionId,
            amount: (amount / 100),
            currency, 
            method,
            transactionId: id,
            orderId: order_id
        });

        if(!paymentRecord){
            subscription.status = 'FAILED';
            await subscription.save();
            return res.status(500).json({ success: false, message: 'PAYMENT_RECORD_CREATION_FAILED' });
        }

        // Capture the payment
        const capturePayment = await razorpay.payments.capture(razorpayPaymentId, amount, currency);

        if(capturePayment){
            subscription.status = 'ACTIVE';
            paymentRecord.status = 'SUCCESS';
            await subscription.save();
            await paymentRecord.save();
            await User.findByIdAndUpdate(userId, { subscription: subscriptionId });
            return res.status(200).json({ success: true, message: 'PAYMENT_VERIFIED' });
        } else {
            subscription.status = 'FAILED';
            paymentRecord.status = 'FAILED';
            await subscription.save();
            await paymentRecord.save();
            return res.status(500).json({ success: false, message: 'PAYMENT_CAPTURE_FAILED' });
        }

    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" }); 
    }
}

const daysLeftFromNow = (startDateStr, endDateStr) => {
    // Convert ISO strings to Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Calculate the difference in milliseconds
    const diffTime = endDate - startDate;

    // Convert milliseconds to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Use Math.ceil to round up to the next whole number of days
    return Math.ceil(diffDays);
}

const getPlanUpgradeDetails = async(req, res) => {
    try {

        const { userId } = req;
        const newPlanId = req.body.planId;

        if(!userId || !newPlanId) return res.status(400).json({ success: false, message: 'INVALID_BODY' });

        const now = new Date();

        const subscriptionDetails = await Subscription.findOne({
            user: userId,
            status: 'ACTIVE',
            startDate: { $lte: now },
            endDate: { $gte: now }
        }).sort({ createdAt: -1 }).populate("plan");

        if(!subscriptionDetails) return res.status(400).json({ success: false, message: 'IN_ELIGIBLE' });

        if(!subscriptionDetails.planType === "PREMIUM") return res.status(400).json({ success: false, message: 'IN_ELIGIBLE' });

        const newPlanDetails = await Plan.findById(newPlanId);

        if(!newPlanDetails) return res.status(400).json({ success: false, message: 'INVALID_PLAN' });

        const newPlanAmount = newPlanDetails.amount;
        const currentPlanAmount = subscriptionDetails.plan.amount;

        const currentPlanDurationInDays = daysLeftFromNow(subscriptionDetails.startDate, subscriptionDetails.endDate);

        const currentPlanExhaustedDays = daysLeftFromNow(subscriptionDetails.startDate, now);

        const currentPlanAmountPerDay = parseFloat((currentPlanAmount / currentPlanDurationInDays).toFixed(2));

        const currentPlanRemainingAmount = parseFloat(currentPlanAmount - (currentPlanAmountPerDay * currentPlanExhaustedDays));

        const upgradableAmount = (newPlanAmount - currentPlanRemainingAmount);

        const planUpgradeDetails = {
            newPlanId,
            isUpgradable: true,
            upgradeDetails: {
                newPlanAmount,
                currentPlanRemainingAmount,
                upgradableAmount
            }
        }

        return res.status(200).json({ success: true, message: 'PAYMENT_VERIFIED', planUpgradeDetails });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
}

module.exports = {
    initialiseOrder,
    verifyPayment,
    getPlanUpgradeDetails
}