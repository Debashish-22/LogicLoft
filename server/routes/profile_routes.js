const express = require("express");
const router = express.Router();

const profileControlller = require("../controllers/profile_controller");

const isAuthentic = require("../middlewares/isAuthentic");

router.post("/update", isAuthentic, profileControlller.updateProfile);

router.post("/update-avatar", isAuthentic, profileControlller.updateAvatar);

router.get("/devices", isAuthentic, profileControlller.devices);

router.post("/revoke-device", isAuthentic, profileControlller.revokeDevice);

router.delete("/delete-account", isAuthentic, profileControlller.deleteAccount);

module.exports = router;