const express = require("express");
const router = express.Router();

const planController = require("../controllers/plan_controller");

router.get("/", planController.plans);

router.post("/add", planController.addPlan);

module.exports = router;