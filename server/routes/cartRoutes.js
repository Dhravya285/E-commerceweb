// routes/cartRoutes.js (create or update)
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.post('/add', protect, cartController.addToCart);
router.get('/', protect, cartController.getCart);
router.put('/update', protect, cartController.updateCartItem);
router.delete('/remove', protect, cartController.removeFromCart);
router.delete('/clear', protect, cartController.clearCart);

module.exports = router;