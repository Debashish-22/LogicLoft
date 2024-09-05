const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order_controller");

const isAuthentic = require("../middlewares/isAuthentic");

router.post("/initialise-order", isAuthentic, orderController.initialiseOrder);

router.post("/verify-payment", isAuthentic, orderController.verifyPayment);

router.post("/upgrade-details", isAuthentic, orderController.getPlanUpgradeDetails);

module.exports = router;