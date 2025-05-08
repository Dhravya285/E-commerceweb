
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, profilePicture, authProvider } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = authProvider === 'local' ? await bcrypt.hash(password, 10) : undefined;
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture: profilePicture || 'https://tse4.mm.bing.net/th?id=OIP.26uriHoRkXW6Isg0HmfeNwHaE8&pid=Api&P=0&h=180', // Store the provided URL or empty string
      authProvider: authProvider || 'local',
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully!',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Ensure the user has a password in the database
    if (!user.password) {
      return res.status(400).json({ message: 'Password not set for this user' });
    }

    console.log('User password hash:', user.password); // Debugging line

    // Compare password with the hash stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and userId in response
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error('Login error:', err); // Log the error
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router;
