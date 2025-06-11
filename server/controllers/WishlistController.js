const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/Wishlist");

const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!productId) {
    res.status(400).json({ message: "Product ID is required" });
    return;
  }

  const existingWishlistItem = await Wishlist.findOne({ userId, productId });
  if (existingWishlistItem) {
    res.status(400).json({ message: "Product already in wishlist" });
    return;
  }

  const wishlistItem = new Wishlist({
    userId,
    productId,
  });

  const savedItem = await wishlistItem.save();
  await savedItem.populate("productId");
  res.status(201).json(savedItem);
});

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.find({ userId: req.user.id }).populate("productId");
  res.json(wishlist); // Return array directly
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlistItem = await Wishlist.findById(req.params.id);
  if (!wishlistItem) {
    res.status(404).json({ message: "Wishlist item not found" });
    return;
  }
  if (wishlistItem.userId.toString() !== req.user.id) {
    res.status(401).json({ message: "Not authorized to remove this item" });
    return;
  }
  await wishlistItem.deleteOne();
  res.json({ message: "Wishlist item removed" });
});

module.exports = { addToWishlist, getWishlist, removeFromWishlist };