const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    planType: {
        type: String,
        enum: ["FREE", "BASIC", "PREMIUM"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: "INR",
        enum: ["INR", "USD", "EUR"]
    },
    duration: {
        type: Number, // in months
        required: true,
        min: 1
    },
    features: {
        screenLimit: {
            type: Number,
            default: 3
        },
    },
    featurePoints: [{
        type: String,
        required: true,
        trim: true
    }],
    isPopular: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// for upgradation dynamically modify subscription with old plan id new plan id utilised Date, etc and also payment details of the upgradation

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;

// const user = await User.findById(userId).populate({
//     path: 'subscription',
//     populate: {
//         path: 'plan'
//     }
// }).exec();

// if (!user || !user.subscription || !user.subscription.plan) {
//     throw new Error('User or subscription or plan not found');
// }

// return user.subscription.plan.screenLimit;