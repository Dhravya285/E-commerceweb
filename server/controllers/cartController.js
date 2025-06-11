const mongoose = require('mongoose'); // Add this import
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
exports.addToCart = async (req, res) => {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log('addToCart request:', { body: req.body, user: req.user, attempt: attempt + 1 });
      const { productId, name, price, image, size, color, quantity, userId: bodyUserId } = req.body;
      const userId = req.user?.userId;

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        console.log('Invalid or missing userId:', userId);
        return res.status(401).json({ message: 'Please log in to add to cart' });
      }

      if (bodyUserId && bodyUserId !== userId) {
        console.log('Mismatched userId:', { bodyUserId, userId });
        return res.status(403).json({ message: 'Unauthorized: User ID mismatch' });
      }

      if (!productId || !name || !price || !image || !size || !color || !quantity) {
        console.log('Missing required fields:', { productId, name, price, image, size, color, quantity });
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.log('Invalid productId:', productId);
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        console.log('Product not found:', productId);
        return res.status(404).json({ message: 'Product not found' });
      }

      let cart = await Cart.findOne({ userId });
      const cartItem = {
        productId,
        name,
        price: Number(price),
        image,
        size,
        color,
        quantity: Number(quantity),
      };

      if (cart) {
        const itemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId && item.size === size && item.color === color
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push(cartItem);
        }
      } else {
        cart = new Cart({ userId, items: [cartItem] });
        console.log('New cart created for userId:', userId);
      }

      cart.updatedAt = Date.now();
      await cart.save();
      console.log('Cart saved successfully:', { userId, itemCount: cart.items.length });
      return res.status(200).json({ message: 'Item added to cart', cart }); // Exit on success
    } catch (error) {
      console.error('Add to cart error:', {
        message: error.message,
        stack: error.stack,
        requestBody: req.body,
        attempt: attempt + 1,
      });
      if (error.message.includes('No matching document found') && attempt < maxRetries - 1) {
        console.log('Version conflict detected, retrying...', { attempt: attempt + 1 });
        attempt++;
        continue;
      }
      return res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
    }
  }

  console.error('Max retries exhausted for addToCart', { userId: req.body.userId });
  return res.status(500).json({ message: 'Failed to add item to cart after multiple attempts', error: 'Concurrency issue' });
};
// Get cart items
// Get cart items
exports.getCart = async (req, res) => {
  try {
    console.log('Received getCart request:', { user: req.user });
    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid or missing userId:', userId);
      return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }

    console.log('Fetching cart for userId:', userId);
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      console.log('Cart not found for userId:', userId);
      return res.status(200).json({ items: [] });
    }

    // Validate and clean cart items
    const validItems = cart.items.filter(item => {
      if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
        console.log('Invalid productId in cart item:', item);
        return false;
      }
      return item.name && item.price != null && item.quantity != null && item.size && item.color && item.image;
    });

    cart.items = validItems;
    await cart.save();

    console.log('Cart retrieved successfully:', { userId, itemCount: cart.items.length });
    return res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error('Get cart error:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Failed to retrieve cart', error: error.message });
  }
};

// Update item quantity
// controllers/cartController.js
exports.updateCartItem = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const authUserId = req.user?.userId || req.user?.id || req.user?._id;

    console.log('updateCartItem request:', { userId, items, authUserId });

    // Validate authentication
    if (!authUserId || authUserId !== userId) {
      console.log('Unauthorized: User ID mismatch or missing', { userId, authUserId });
      return res.status(403).json({ message: 'Unauthorized: Invalid user ID', details: { userId, authUserId } });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log('Invalid items data:', items);
      return res.status(400).json({ message: 'Items must be a non-empty array' });
    }

    // Validate each item
    for (const item of items) {
      if (!item.productId || !item.quantity || !item.name || !item.price || !item.image || !item.size || !item.color) {
        console.log('Missing required fields in item:', item);
        return res.status(400).json({ message: 'All item fields are required', invalidItem: item });
      }
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        console.log('Invalid productId:', item.productId);
        return res.status(400).json({ message: 'Invalid product ID', invalidProductId: item.productId });
      }
      // Validate numeric fields
      if (isNaN(Number(item.price)) || isNaN(Number(item.quantity))) {
        console.log('Invalid numeric fields in item:', item);
        return res.status(400).json({ message: 'Price and quantity must be valid numbers', invalidItem: item });
      }
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log('Cart not found, creating new cart for userId:', userId);
      cart = new Cart({ userId, items });
    } else {
      cart.items = items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        size: item.size,
        color: item.color,
        quantity: Number(item.quantity),
      }));
      cart.updatedAt = Date.now();
    }

    await cart.save();
    console.log('Cart updated successfully:', { userId: userId, itemCount: cart.items.length });
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Update cart error:', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
    });
    res.status(500).json({ message: 'Failed to update cart', error: error.message });
  }
};
// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    console.log('Received removeFromCart request:', req.body);
    const { userId, productId, size, color } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId:', userId);
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log('Invalid productId:', productId);
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log('Cart not found for userId:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
        )
    );

    cart.updatedAt = Date.now();
    console.log('Saving cart:', cart);
    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
   console.log('Received clearCart request:', req.body);
    const { userId } = req.body;
    const authUserId = req.user?.userId || req.user?.id;

    // Validate authentication
    if (!authUserId || authUserId !== userId) {
      console.log('Unauthorized: User ID mismatch or missing', { userId, authUserId });
      return res.status(403).json({ message: 'Unauthorized: Invalid user ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId:', userId);
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log('Cart not found for userId:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    console.log('Saving cleared cart:', { userId });
    await cart.save();
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Clear cart error:', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
    });
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
};