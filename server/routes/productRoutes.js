const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const upload = multer(); 

// Add product (protected route)
router.post('/add', protect, upload.array('images'), productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;