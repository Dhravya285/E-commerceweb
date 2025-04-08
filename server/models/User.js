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
      return !this.googleId; // Make password required only if googleId is not present
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allow multiple documents without googleId
  },
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: '' },
  socialLinks: { type: Map, of: String }, // e.g., { linkedin: '', github: '' }
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
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;