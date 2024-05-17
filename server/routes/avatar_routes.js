const express = require("express");
const router = express.Router();

const avatarControlller = require("../controllers/avatar_controller");

const isAuthentic = require("../middlewares/isAuthentic");

router.get("/", isAuthentic, avatarControlller.avatars);

module.exports = router;