const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const getAnalytics = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    console.log(`Access denied for user ${req.user._id}: Not an admin`);
    res.status(403);
    throw new Error('Access denied. Admin privileges required.');
  }

  try {
    // Total sales and orders
    const salesData = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // Total customers
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    // Orders per customer
    const ordersPerCustomer = totalCustomers > 0 ? (salesData[0]?.totalOrders || 0) / totalCustomers : 0;

    // Top product (by quantity sold)
    const topProductData = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalQuantity: { $sum: '$items.quantity' },
          name: { $first: '$items.name' },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
    ]);

    // Top category (by quantity sold)
    const topCategoryData = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          totalQuantity: { $sum: '$items.quantity' },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
    ]);

    const analytics = {
      sales: salesData[0]?.totalSales || 0,
      orders: salesData[0]?.totalOrders || 0,
      customers: totalCustomers,
      ordersPerCustomer: ordersPerCustomer.toFixed(2),
      topProduct: topProductData[0]?.name || 'None',
      topCategory: topCategoryData[0]?._id || 'None',
    };

    console.log(`Analytics fetched for admin ${req.user._id}:`, analytics);
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: 'Failed to fetch analytics', details: error.message });
  }
});

module.exports = { getAnalytics };