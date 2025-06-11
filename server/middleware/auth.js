const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  console.log('Protect middleware - Authorization header:', authHeader || 'missing');

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      console.log('Protect middleware - Token received:', token.substring(0, 10) + '...');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Protect middleware - Decoded JWT:', decoded);

      const userId = decoded._id || decoded.id || decoded.sub;
      if (!userId) {
        console.log('Protect middleware - No userId in JWT payload:', decoded);
        return res.status(401).json({ message: 'Not authorized, invalid token payload' });
      }

      const user = await User.findById(userId).select('-password');
      if (!user) {
        console.log(`Protect middleware - User not found for ID: ${userId}`);
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = {
        ...user.toObject(),
        userId: user._id.toString(),
        id: user._id.toString(), // Ensure compatibility with WishlistController
        isAdmin: user.role === 'admin',
      };
      console.log(`Protect middleware - User authenticated: ${user.name}, Role: ${user.role}, userId: ${req.user.userId}`);

      next();
    } catch (error) {
      console.error('Protect middleware - Error:', {
        message: error.message,
        name: error.name,
      });
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('Protect middleware - No token provided or invalid format');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };