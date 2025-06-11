const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// User profile routes
router.get('/me', authMiddleware.protect, userController.getUserProfile);
router.put('/me', authMiddleware.protect, userController.updateUserProfile);
router.post('/upload-avatar', authMiddleware.protect, userController.uploadAvatar);
router.post('/addresses', authMiddleware.protect, userController.addAddress);
router.put('/addresses/:addressId', authMiddleware.protect, userController.updateAddress);
router.delete('/addresses/:addressId', authMiddleware.protect, userController.deleteAddress);
router.get('/admin', authMiddleware.protect, userController.getAllCustomers);

module.exports = router;