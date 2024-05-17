const mongoose = require("mongoose");
const mailer = require("../config/mailer");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otpCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;