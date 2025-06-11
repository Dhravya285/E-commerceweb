const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String },
  longDescription: { type: String },
  images: [{
    url: { type: String, required: true }, // Cloudinary URL
    public_id: { type: String, required: true } // Cloudinary public ID
  }],
  category: { type: String, default: 'T-Shirts' },
  subcategory: { type: String },
  gender: { type: String, default: 'Unisex' },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  sizes: [{ type: String }],
  colors: [{
    name: { type: String },
    hex: { type: String }
  }],
  features: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);