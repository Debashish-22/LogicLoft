const CryptoJS = require("crypto-js");

const User = require("../models/user_model");
const Session = require("../models/session_model");

const cookieParser = require("../utils/cookie_parser");

const isAuthentic = async(req, res, next) => {
    try {

        const sid = cookieParser(req)[process.env.SESSION_NAME];

        if(!sid) return res.status(200).json({ success: false, message: "TOKEN_MISSING" });

        const decryptedSessionId = CryptoJS.AES.decrypt(sid, process.env.SESSION_SECRET_KEY).toString(CryptoJS.enc.Utf8);

        const session = await Session.findById(decryptedSessionId);

        if(!session || !session.userId){
            res.clearCookie(process.env.SESSION_NAME);
            res.clearCookie(process.env.DEVICE_NAME);
            res.status(200).json({ success: false, message: "UNAUTHORIZED" });
            return;
        }

        const user = await User.findById(session.userId);

        if(!user || !user.activeStatus){
            res.clearCookie(process.env.SESSION_NAME);
            res.clearCookie(process.env.DEVICE_NAME);
            res.status(200).json({ success: false, message: "UNAUTHORIZED" });
            return;
        }

        req.userId = user.id;
        req.sessionId = decryptedSessionId;

        next();
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = isAuthentic;