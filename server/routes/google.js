const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config({path:'../.env'});

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub: googleId } = ticket.getPayload();
    
    // Find or create user
    let user = await User.findOne({ 
      $or: [
        { email },
        { googleId }
      ]
    });

    if (!user) {
      // Create new user
      user = new User({
        name,
        email,
        googleId,
        profilePicture: picture,
        isVerified: true,
        authProvider: 'google'
      });
      await user.save();
    } else {
      // Update existing user's Google ID if not present
      if (!user.googleId) {
        user.googleId = googleId;
        user.isVerified = true;
        user.authProvider = 'google';
        await user.save();
      }
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        isVerified: user.isVerified
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(200).json({ 
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    console.error('Google authentication error:', err);
    console.error('Error details:', err);
    res.status(400).json({ 
      message: 'Google authentication failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;