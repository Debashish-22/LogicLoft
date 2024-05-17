const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth_controller");

const isAuthentic = require("../middlewares/isAuthentic");
const isGuest = require("../middlewares/isGuest");

router.post("/email-unique", isGuest, authController.emailUnique);

router.post("/local-sign-up", isGuest, authController.localSignup);

router.post("/login", isGuest, authController.login);

router.get("/google-login", isGuest, authController.googleLogin);

router.post("/google-one-tap", isGuest, authController.googleOneTap);

router.post("/logout", isAuthentic, authController.logout);

// router.get("/sessions", isAuthentic, authController.sessions);

// router.post("/revoke-session", isAuthentic, authController.revokeSession);

router.get("/auth-user", isAuthentic, authController.authUser);

router.post("/reset-password", authController.resetPassword);

module.exports = router;