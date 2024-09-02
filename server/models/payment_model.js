const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: "INR",
        required: true,
        enum: ["INR", "USD", "EUR"]
    },
    status: {
        type: String,
        default: "PENDING",
        enum: ["SUCCESS", "FAILED", "PENDING"]
    },
    method: {
        type: String,
        default: ""
    },
    orderId: {
        type: String,
        default: ''
    },
    transactionId: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;