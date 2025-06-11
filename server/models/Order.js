const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String },
    color: { type: String },
    image: { type: String },
  }],
  paymentMethod: { type: String, enum: ['card', 'upi', 'cod', 'paypal'], required: true },
  paypalOrderId: { type: String },
  paypalTransactionId: { type: String },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  shippingMethod: { type: String, enum: ['standard', 'express'], required: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  orderStatus: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  trackingNumber: { type: String },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  coupon: { // Added coupon field
    code: { type: String },
    discountAmount: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);