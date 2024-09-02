const mongoose = require("mongoose");

// Define the PlanChange schema
const planChangeSchema = new mongoose.Schema({
    oldPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    newPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    changeDate: {
        type: Date,
        default: Date.now
    },
    reason: {
        type: String,
        default: '' // Optional field to describe the reason for the change
    }
}, { _id: false });

// Define the Subscription schema
const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "CANCELED", "PAUSED", "PENDING", "EXPIRED", "PROGRESS", "FAILED"],
        default: "PROGRESS"
    },
    planChanges: [planChangeSchema]
}, { timestamps: true });

// Correctly define the model
const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
