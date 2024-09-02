const express = require("express");
const router = express.Router();

const profileControlller = require("../controllers/profile_controller");

const isAuthentic = require("../middlewares/isAuthentic");

router.post("/update", isAuthentic, profileControlller.updateProfile);

router.post("/update-avatar", isAuthentic, profileControlller.updateAvatar);

router.get("/devices", isAuthentic, profileControlller.devices);

router.post("/revoke-device", isAuthentic, profileControlller.revokeDevice);

router.delete("/delete-account", isAuthentic, profileControlller.deleteAccount);

router.get("/subscription", isAuthentic, profileControlller.currentSubscription);

router.get("/payments", isAuthentic, profileControlller.payments);

router.use("*", (req, res) => {

    return res.status(404).json({
        success: false,
        message: "Sorry, the requested route doesn't exist."
    });
});

module.exports = router;