const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountPercentage: { type: Number, required: true, min: 0, max: 100 },
  usageCount: { type: Number, default: 0 },
  maxUsageLimit: { type: Number, default: null }, // Null for unlimited
  status: { type: String, enum: ['active', 'expired', 'inactive'], default: 'active' },
  startsAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);