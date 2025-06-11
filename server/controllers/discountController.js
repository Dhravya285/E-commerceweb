const asyncHandler = require('express-async-handler');
const Discount = require('../models/Discounts');
const Order = require('../models/Order');

exports.getAllDiscounts = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Access denied. Admin privileges required.');
  }

  const { search } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.code = new RegExp(search, 'i');
  }

  const discounts = await Discount.find(queryObject).sort({ createdAt: -1 });
  res.status(200).json(discounts);
});

exports.createDiscount = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Access denied.');
  }

  const { code, discountPercentage, maxUsageLimit, startsAt, expiresAt, description } = req.body;
  if (!code || !discountPercentage) {
    res.status(400);
    throw new Error('Code and discount percentage are required.');
  }

  const discountExists = await Discount.findOne({ code: code.toUpperCase() });
  if (discountExists) {
    res.status(400);
    throw new Error('Discount code already exists.');
  }

  const discount = await Discount.create({
    code: code.toUpperCase(),
    discountPercentage,
    maxUsageLimit: maxUsageLimit || null,
    startsAt: startsAt || Date.now(),
    expiresAt,
    description,
  });

  res.status(201).json(discount);
});

exports.updateDiscount = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Access denied.');
  }

  const { id } = req.params;
  const { code, discountPercentage, maxUsageLimit, status, startsAt, expiresAt, description } = req.body;

  const discount = await Discount.findById(id);
  if (!discount) {
    res.status(404);
    throw new Error('Discount not found.');
  }

  discount.code = code ? code.toUpperCase() : discount.code;
  discount.discountPercentage = discountPercentage || discount.discountPercentage;
  discount.maxUsageLimit = maxUsageLimit !== undefined ? maxUsageLimit || null : discount.maxUsageLimit;
  discount.status = status || discount.status;
  discount.startsAt = startsAt || discount.startsAt;
  discount.expiresAt = expiresAt || discount.expiresAt;
  discount.description = description || discount.description;

  await discount.save();
  res.status(200).json(discount);
});

exports.deleteDiscount = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Access denied.');
  }

  const { id } = req.params;
  const discount = await Discount.findByIdAndDelete(id);
  if (!discount) {
    res.status(404);
    throw new Error('Discount not found.');
  }

  res.status(204).json({ message: 'Discount deleted successfully.' });
});

exports.applyDiscount = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.body;
  if (!code || !subtotal) {
    res.status(400);
    throw new Error('Coupon code and subtotal are required.');
  }

  const discount = await Discount.findOne({ code: code.toUpperCase() });
  if (!discount) {
    res.status(400);
    throw new Error('Invalid coupon code.');
  }

  const now = new Date();
  if (discount.status !== 'active') {
    res.status(400);
    throw new Error('Coupon is not active.');
  }
  if (discount.startsAt > now) {
    res.status(400);
    throw new Error('Coupon is not yet valid.');
  }
  if (discount.expiresAt && discount.expiresAt < now) {
    discount.status = 'expired';
    await discount.save();
    res.status(400);
    throw new Error('Coupon has expired.');
  }
  if (discount.maxUsageLimit && discount.usageCount >= discount.maxUsageLimit) {
    res.status(400);
    throw new Error('Coupon usage limit reached.');
  }

  const discountAmount = (subtotal * discount.discountPercentage) / 100;
  res.status(200).json({
    code: discount.code,
    discountPercentage: discount.discountPercentage,
    discountAmount,
  });
});

exports.incrementUsage = asyncHandler(async (code) => {
  const discount = await Discount.findOne({ code: code.toUpperCase() });
  if (discount) {
    discount.usageCount += 1;
    if (discount.maxUsageLimit && discount.usageCount >= discount.maxUsageLimit) {
      discount.status = 'inactive';
    }
    await discount.save();
  }
});

exports.getPublicDiscounts = asyncHandler(async (req, res) => {
  const now = new Date();
  const discounts = await Discount.find({
    status: 'active',
    startsAt: { $lte: now },
    $or: [
      { expiresAt: null },
      { expiresAt: { $gte: now } },
    ],
  }).sort({ createdAt: -1 });
  console.log('Public discounts fetched:', discounts); // Debug
  res.status(200).json(discounts);
});