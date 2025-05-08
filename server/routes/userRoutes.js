// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authenticateToken'); // Assuming you have an auth middleware to verify JWT

// User profile routes
router.get('/me', authMiddleware, userController.getUserProfile);
router.put('/me', authMiddleware, userController.updateUserProfile);
router.post('/upload-avatar', authMiddleware, userController.uploadAvatar);
router.post('/addresses', authMiddleware, userController.addAddress);
router.put('/addresses/:addressId', authMiddleware, userController.updateAddress);
router.delete('/addresses/:addressId', authMiddleware, userController.deleteAddress);

module.exports = router;