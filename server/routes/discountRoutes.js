const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.protect, discountController.getAllDiscounts);
router.post('/', authMiddleware.protect, discountController.createDiscount);
router.put('/:id', authMiddleware.protect, discountController.updateDiscount);
router.delete('/:id', authMiddleware.protect, discountController.deleteDiscount);
router.post('/apply', discountController.applyDiscount);
router.get('/public', discountController.getPublicDiscounts); // Public endpoint for checkout

module.exports = router;