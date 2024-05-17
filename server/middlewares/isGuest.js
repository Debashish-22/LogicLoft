const cookieParser = require("../utils/cookie_parser");

const isGuest = async(req, res, next) => {
    try {

        const sid = cookieParser(req)[process.env.SESSION_NAME];

        if (sid) {
            return res.status(401).json({success: false, message: 'UNAUTHORIZED'});
        }

        next();
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = isGuest;