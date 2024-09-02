const express = require("express");
const router = express.Router();

const otpRoutes = require("./otp_routes");

const authRoutes = require("./auth_routes");

const profileRoutes = require("./profile_routes");

const avatarRoutes = require("./avatar_routes");

const planRoutes = require("./plan_routes");

const orderRoutes = require("../routes/order_routes");

router.get("/", (req, res) => res.status(200).json({ success: true, message: "API, all system opertional"}));

router.use("/otp", otpRoutes);

router.use("/auth", authRoutes);

router.use("/profile", profileRoutes);

router.use("/avatars", avatarRoutes);

router.use("/plans", planRoutes);

router.use("/order", orderRoutes);

router.use("*", (req, res) => {

    return res.status(404).json({
        success: false,
        message: "Sorry, the requested route doesn't exist."
    });
});

module.exports = router;