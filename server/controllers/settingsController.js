const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Settings = require('../models/Settings');

// Get all settings (admin profile and store settings)
const getSettings = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    console.log(`Access denied for user ${req.user._id}: Not an admin`);
    res.status(403);
    throw new Error('Access denied. Admin privileges required.');
  }

  // Fetch admin profile
  const user = await User.findById(req.user._id).select('name email');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Fetch or create store settings
  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings();
    await settings.save();
    console.log(`Created default store settings: ${JSON.stringify(settings)}`);
  }

  res.status(200).json({
    adminName: user.name,
    adminEmail: user.email,
    storeName: settings.storeName,
    currency: settings.currency,
  });
});

// Update settings (admin profile and store settings)
const updateSettings = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    console.log(`Access denied for user ${req.user._id}: Not an admin`);
    res.status(403);
    throw new Error('Access denied. Admin privileges required.');
  }

  const { adminName, adminEmail, storeName, currency } = req.body;

  // Validate inputs
  if (!adminName || !adminEmail || !storeName || !currency) {
    res.status(400);
    throw new Error('All fields are required');
  }
  if (!['INR', 'USD', 'EUR'].includes(currency)) {
    res.status(400);
    throw new Error('Invalid currency. Must be INR, USD, or EUR');
  }
  if (!adminEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  // Update admin profile
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.name = adminName;
  user.email = adminEmail;
  await user.save();
  console.log(`Updated admin profile for user ${req.user._id}: name=${adminName}, email=${adminEmail}`);

  // Update store settings
  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings();
  }
  settings.storeName = storeName;
  settings.currency = currency;
  await settings.save();
  console.log(`Updated store settings: storeName=${storeName}, currency=${currency}`);

  res.status(200).json({
    adminName: user.name,
    adminEmail: user.email,
    storeName: settings.storeName,
    currency: settings.currency,
  });
});

module.exports = { getSettings, updateSettings };