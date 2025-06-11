const User = require('../models/User');
const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');

// Configure Multer for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only JPEG/JPG/PNG images are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

// Update user profile (name, email, phone)
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update fields if provided
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    profilePicture: updatedUser.profilePicture,
    addresses: updatedUser.addresses,
  });
});

// Upload avatar
const uploadAvatar = upload.single('profilePicture');
const handleAvatarUpload = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Save the file path or URL
  user.profilePicture = `/Uploads/avatars/${req.file.filename}`;
  await user.save();

  res.json({ profilePicture: user.profilePicture });
});

// Add new address
const addAddress = asyncHandler(async (req, res) => {
  const { type, address, city, state, zipCode, isDefault } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const newAddress = { type, address, city, state, zipCode, isDefault };

  // If isDefault is true, unset isDefault for other addresses
  if (isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }

  user.addresses.push(newAddress);
  await user.save();

  res.json({ addresses: user.addresses });
});

// Update existing address
const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const { type, address, city, state, zipCode, isDefault } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const addr = user.addresses.id(addressId);
  if (!addr) {
    res.status(404);
    throw new Error('Address not found');
  }

  // Update address fields
  addr.type = type || addr.type;
  addr.address = address || addr.address;
  addr.city = city || addr.city;
  addr.state = state || addr.state;
  addr.zipCode = zipCode || addr.zipCode;

  // Handle isDefault logic
  if (isDefault) {
    user.addresses.forEach((a) => (a.isDefault = false));
    addr.isDefault = true;
  }

  await user.save();
  res.json({ addresses: user.addresses });
});

// Delete address
const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const addr = user.addresses.id(addressId);
  if (!addr) {
    res.status(404);
    throw new Error('Address not found');
  }

  user.addresses.pull(addressId);
  await user.save();
  res.json({ addresses: user.addresses });
});

// Get all customers (for admin)
const getAllCustomers = asyncHandler(async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      console.log(`Access denied for user ${req.user._id}: Not an admin`);
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    // Fetch non-admin users
    const users = await User.find({ role: { $ne: 'admin' } }).select('_id name email');

    // Aggregate order count and total spent for each user
    const customerData = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.aggregate([
          { $match: { 'user.userId': user._id, paymentStatus: 'completed' } },
          {
            $group: {
              _id: null,
              orderCount: { $sum: 1 },
              totalSpent: { $sum: '$total' },
            },
          },
        ]);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          orders: orders[0]?.orderCount || 0,
          totalSpent: orders[0]?.totalSpent || 0,
        };
      })
    );

    console.log(`Fetched ${customerData.length} customers for admin ${req.user._id}`);
    res.status(200).json(customerData);
  } catch (error) {
    console.error('Error fetching customers:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: 'Failed to fetch customers', details: error.message });
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadAvatar: [uploadAvatar, handleAvatarUpload],
  addAddress,
  updateAddress,
  deleteAddress,
  getAllCustomers,
};