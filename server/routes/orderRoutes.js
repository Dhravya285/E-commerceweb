const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.protect, orderController.getOrders);
router.get('/admin', authMiddleware.protect, orderController.getAllOrders);
router.post('/', authMiddleware.protect, orderController.createOrder);

module.exports = router;