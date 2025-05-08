const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  description: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  sizes: {
    type: [String],
    default: [],
  },
  colors: {
    type: [{ name: String, hex: String }],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  isNew: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);