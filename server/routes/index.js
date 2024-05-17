const express = require("express");
const router = express.Router();

const otpRoutes = require("./otp_routes");

const authRoutes = require("./auth_routes");

const profileRoutes = require("./profile_routes");

const avatarRoutes = require("./avatar_routes");

router.use("/otp", otpRoutes);

router.use("/auth", authRoutes);

router.use("/profile", profileRoutes);

router.use("/avatars", avatarRoutes);

module.exports = router;