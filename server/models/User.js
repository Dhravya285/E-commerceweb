// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profilePicture: { type: String, default: '' },
  phone: { type: String, default: '' }, // Add phone field
  bio: { type: String, default: '' },
  socialLinks: { type: Map, of: String },
  isVerified: {
    type: Boolean,
    default: false,
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  isGuest: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  addresses: [
    {
      type: { type: String },
      address: String,
      city: String,
      state: String,
      zipCode: String,
      isDefault: Boolean,
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;