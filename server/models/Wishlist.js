const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: String, // Match Product model's _id type (string, e.g., "4")
    ref: "Product",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);