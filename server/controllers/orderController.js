const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

module.exports = { getUserOrders };