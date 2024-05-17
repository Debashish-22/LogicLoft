const Avatar = require("../models/avatar_model");

const avatars = async(req, res) => {
    try {

        const fetchedAvatars = await Avatar.find();

        if(!fetchedAvatars || fetchedAvatars.length === 0) return res.status(404).json({ success: false, message: "NO_AVATARS_FOUND" });

        return res.status(200).json({ success: true, avatars: fetchedAvatars });

    } catch (error) {
       return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
}

module.exports = {
    avatars
}