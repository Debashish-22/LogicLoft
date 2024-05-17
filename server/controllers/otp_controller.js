const crypto = require("crypto");

const Otp = require("../models/otp_model");

const mailer = require("../config/mailer");

const { randomInt } = crypto;

const { emailRegex } = require("../config/validation");

const generateOtp = () => randomInt(1000, 10000);

const sendOtp = async(req, res) => {
    try {

        const { email } = req.body;

        if(!email || !emailRegex.test(email)) return res.status(400).json({ success: false, message: 'INVALID_BODY' });

        const otpCode = generateOtp();

        if(!otpCode) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        const otp = await Otp.create({ email, otpCode });

        if(!otp) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        const mailSubject = "Email Verification";
        const mailContent = `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp.otpCode}</p>`;

        const emailSent = await mailer(email, mailSubject, mailContent);

        if(!emailSent) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        res.status(200).json({ success: true, message: 'OTP_SENT' });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const verifyOtp = async(req, res) => {
    try {

        const { email, otpCode } = req.body;

        if(!email || !otpCode) return res.status(400).json({ success: false, message: 'INVALID_BODY' });

        // getting the last otp code with the provided email
        const lastOtp = await Otp.find({ email }).sort({createdAt: -1}).limit(1);

        if(lastOtp.length === 0 || lastOtp[0].otpCode !== otpCode) return res.status(401).json({ success: false, message: "VERIFICATION_FAILED"});

        res.status(200).json({ success: true, message: 'VERIFIED' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    sendOtp,
    verifyOtp
}