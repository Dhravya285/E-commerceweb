const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/WishlistController");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware.protect, wishlistController.getWishlist);
router.post("/", authMiddleware.protect, wishlistController.addToWishlist);
router.delete("/:id", authMiddleware.protect, wishlistController.removeFromWishlist);

module.exports = router;