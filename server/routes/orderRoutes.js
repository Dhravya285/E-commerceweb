const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.protect, orderController.getUserOrders);

module.exports = router;