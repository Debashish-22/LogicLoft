const User = require("../models/user_model");
const Avatar = require("../models/avatar_model");
const Session = require("../models/session_model");
const Subscription = require("../models/subscription_model");
const Payment = require("../models/payment_model");

const { usernameMinLen } = require("../config/validation");

const { otpVerify } = require("./otp_controller");

const updateAvatar = async(req, res) => {
    try {

        const { userId } = req;

        if(!userId) return res.status(400).json({ success: false, message: "INVALID_BODY" });

        const newAvatarId = req.body.newAvatarId;

        let avatar = null;

        if(newAvatarId){

            const fetchAvatar = await Avatar.findById(newAvatarId);

            avatar = fetchAvatar ? fetchAvatar.id : null;
        }

        const updateNewAvatar = await User.findByIdAndUpdate(userId, {
            userAvatar: avatar
        });

        if(!updateNewAvatar) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        res.status(200).json({ success: true, message: 'UPDATED' });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const updateProfile = async(req, res) => {
    try {

        const { userId } = req;

        const { username } = req.body;

        if(!userId || !username || username.trim().length < usernameMinLen) return res.status(400).json({ success: false, message: "INVALID_BODY" });

        const updateDetails = await User.findByIdAndUpdate(userId, req.body);

        if(!updateDetails) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        res.status(200).json({ success: true, message: 'UPDATED' });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const devices = async(req, res) => {
    try {

        const { userId, sessionId } = req;

        const sessions = await Session.find({ userId }).sort({ login: -1 });

        if(!sessions || sessions.length === 0) return res.status(409).json({ success: false, message: "NO_ACTIVE_SESSIONS" });

        let devices = [];

        sessions.map((session) => {

            const s_id = session.id;
            const currentDevice = s_id === sessionId;
            
            const { deviceId, login, platform } = session;
        
            devices.push({
                deviceId,
                login,
                platform,
                currentDevice
            });
        });

        return res.status(200).json({ success: true, data: devices });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
}

const revokeDevice = async(req, res) => {
    try {

        const { userId } = req;

        const { deviceId } = req.body;

        if(!userId || !deviceId) return res.status(400).json({ success: false, message: "INVALID_BODY" });

        const reqSession = await Session.findOne({ userId, deviceId });

        if(!reqSession || reqSession.length === 0) return res.status(409).json({ success: false, message: "SESSION_NOT_FOUND" });

        const sessionRevoked = await Session.findOneAndDelete({ userId, deviceId });

        if(!sessionRevoked) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        return res.status(200).json({ success: true, message: "DEVICE_REMOVED" });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
}

const deleteAccount = async(req, res) => {
    try {

        const { userId } = req;

        const { otpCode } = req.body;

        if(!userId || !otpCode) return res.status(400).json({ success: false, message: "INVALID_BODY" });

        const { email } = await User.findById(userId);

        const emailVerified = await otpVerify(email, otpCode);

        if(!emailVerified) return res.status(409).json({ success: false, message: 'VERIFICATION_FAILED' });

        const deleteSessions = await Session.deleteMany({ userId });

        if(!deleteSessions) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        const deleteUser = await User.findByIdAndDelete(userId);

        if(!deleteUser) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        res.status(200).json({ success: true, message: "ACCOUNT_DELETED" });

    } catch (error) {

        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
}

const currentSubscription = async(req, res) => {
    try {

        const { userId } = req;

        if(!userId) return res.status(400).json({ success: false, message: "CREDENTIALS_MISSING" });

        const subscriptionDetails = await Subscription.findOne({ user: userId}).populate("plan");

        return res.status(200).json({ success: true, message: 'FETCHED', subscription: subscriptionDetails });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const payments = async(req, res) => {
    try {

        const { userId } = req;

        if(!userId) return res.status(400).json({ success: false, message: "CREDENTIALS_MISSING" });

        const payments = await Payment.find({ user: userId}).populate({
            path: "subscription",
            populate: {
                path: "plan"
            }
        });

        return res.status(200).json({ success: true, message: 'FETCHED', payments });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    updateAvatar,
    updateProfile,
    devices,
    revokeDevice,
    deleteAccount,
    currentSubscription,
    payments
}