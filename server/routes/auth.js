const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

// Debug environment variables
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'Not set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Missing EMAIL_USER or EMAIL_PASS in .env');
  process.exit(1);
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer transporter verification failed:', error);
  } else {
    console.log('Nodemailer transporter is ready to send emails');
  }
});

// Store OTPs temporarily
const otpStore = new Map();

// Generate and send OTP
router.post('/send-otp', async (req, res) => {
  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(normalizedEmail, { otp, expires: Date.now() + 10 * 60 * 1000, role });

    console.log(`OTP generated for ${normalizedEmail}: ${otp}`);

    const mailOptions = {
      from: `"Starry Comics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your OTP for ${role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'} Signup Verification`,
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${normalizedEmail}`);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Send OTP error:', err);
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const storedOtp = otpStore.get(normalizedEmail);
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    if (storedOtp.expires < Date.now()) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    console.log(`OTP verified for ${normalizedEmail}`);
    res.status(200).json({ message: 'OTP verified successfully', role: storedOtp.role });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
});

// Admin/Vendor Signup
router.post('/admin/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log('Admin signup attempt:', { name, email, role });

  if (!name || !email || !password || !role) {
    console.log('Missing required fields:', { name, email, password, role });
    return res.status(400).json({ message: 'Name, email, password, and role are required' });
  }

  if (!['admin', 'vendor'].includes(role)) {
    console.log('Invalid role:', role);
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log('Email already exists:', normalizedEmail);
      return res.status(400).json({ message: 'Email already exists' });
    }

    const storedOtp = otpStore.get(normalizedEmail);
    if (!storedOtp || storedOtp.role !== role) {
      console.log('OTP verification failed:', { email: normalizedEmail, storedOtp });
      return res.status(400).json({ message: 'OTP verification required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully for:', normalizedEmail);

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      authProvider: 'local',
      isVerified: true,
      role,
      profilePicture: 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/default/admin.jpg',
    });

    await newUser.save();
    console.log('User saved to database:', { email: normalizedEmail, role, _id: newUser._id });

    otpStore.delete(normalizedEmail);

    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      message: 'Admin/Vendor created successfully',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      console.log('Duplicate key error:', err.keyValue);
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.error('Admin signup error:', err);
    res.status(500).json({ message: 'Error creating admin/vendor', error: err.message });
  }
});

// Admin/Vendor Login
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!['admin', 'vendor'].includes(user.role)) {
      return res.status(403).json({ message: 'Unauthorized: Not an admin or vendor' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'No password set for this account. Use Google login or reset password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Email not verified' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// User Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, profilePicture, authProvider } = req.body;

  if (!name || !email || (authProvider === 'local' && !password)) {
    return res.status(400).json({ message: 'Name, email, and password (for local) are required' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = authProvider === 'local' ? await bcrypt.hash(password, 10) : undefined;
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      profilePicture: profilePicture || 'https://tse4.mm.bing.net/th?id=OIP.26uriHoRkXW6Isg0HmfeNwHaE8&pid=Api&P=0&h=180',
      authProvider: authProvider || 'local',
      isVerified: authProvider === 'local' ? true : false,
      role: 'customer',
    });
    await newUser.save();
    console.log('User saved to database:', { email: normalizedEmail, role: newUser.role, _id: newUser._id });

    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully!',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        isVerified: newUser.isVerified,
        role: newUser.role,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      console.log('Duplicate key error:', err.keyValue);
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.error('Signup error:', err);
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.password && user.authProvider === 'local') {
      return res.status(400).json({ message: 'Password not set for this user' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    if (!user.isVerified && user.authProvider === 'local') {
      return res.status(400).json({ message: 'Email not verified' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router;