const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");

const otpController = require("../controllers/otp_controller");

const otpVerificationLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Max 5 requests per windowMs
    message: "Too many attempts. Please try again later."
});

router.post("/send-otp", otpVerificationLimiter, otpController.sendOtp);

router.post("/verify-otp", otpVerificationLimiter, otpController.verifyOtp);

module.exports = router;