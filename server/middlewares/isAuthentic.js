const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const User = require("../models/user_model");
const Session = require("../models/session_model");

const isAuthentic = async(req, res, next) => {

    try {

        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){

            return res.status(200).json({ success: false, message: "TOKEN_MISSING" });
        }

        const token = req.headers.authorization.split(" ")[1];

        if(!token) return res.status(200).json({ success: false, message: "TOKEN_MISSING" });

        jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded){

            if(err) return res.status(200).json({ success: false, message: "TOKEN_INVALID" });

            const now = Math.floor(Date.now() / 1000);

            if(decoded.exp < now) return res.status(2000).json({ success: false, message: 'TOKEN_EXPIRED' });
            
            const sid = decoded[process.env.SESSION_NAME];

            if(!sid) return res.status(200).json({ success: false, message: "TOKEN_INVALID" });
    
            const decryptedSessionId = CryptoJS.AES.decrypt(sid, process.env.SESSION_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    
            const session = await Session.findById(decryptedSessionId);
    
            if(!session || !session.userId) return res.status(200).json({ success: false, message: "UNAUTHORIZED" });
    
            const user = await User.findById(session.userId);
    
            if(!user || !user.activeStatus) return res.status(200).json({ success: false, message: "UNAUTHORIZED" });
    
            req.userId = user.id;
            req.sessionId = decryptedSessionId;
    
            next();
        });

    } catch (error) {
        
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = isAuthentic;