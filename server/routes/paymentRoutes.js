const express = require("express");
const router = express.Router();
const paypalController = require("../controllers/paypalController");
const authMiddleware = require("../middleware/auth");

router.post("/create-order", authMiddleware.protect, paypalController.createOrder);
router.post("/capture-order", authMiddleware.protect, paypalController.captureOrder);
router.put("/orders/:id/tracking", authMiddleware.protect, paypalController.updateTracking);
router.post("/orders/:id/resend-email", authMiddleware.protect, paypalController.resendOrderConfirmationEmail);

module.exports = router;