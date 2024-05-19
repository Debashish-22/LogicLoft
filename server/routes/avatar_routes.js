const express = require("express");
const router = express.Router();

const avatarControlller = require("../controllers/avatar_controller");

const isAuthentic = require("../middlewares/isAuthentic");

router.get("/", isAuthentic, avatarControlller.avatars);

router.use("*", (req, res) => {

    return res.status(404).json({
        success: false,
        message: "Sorry, the requested route doesn't exist."
    });
});

module.exports = router;