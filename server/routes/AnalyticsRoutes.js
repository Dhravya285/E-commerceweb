const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/AnalyticsController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.protect, analyticsController.getAnalytics);

module.exports = router;