const Product = require("../models/Product");
const mongoose = require("mongoose");
const { uploadImage } = require("../utils/cloudinaryUpload");
const fs = require("fs").promises;
const path = require("path");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Ensure user is admin or vendor
    if (!['admin', 'vendor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized: Admin or vendor access required' });
    }

    const {
      name, price, originalPrice, description, longDescription, category, subcategory,
      gender, inStock, sizes, colors, features,
    } = req.body;

    // Parse JSON strings for arrays
    let parsedSizes = [];
    let parsedColors = [];
    let parsedFeatures = [];
    try {
      parsedSizes = sizes ? JSON.parse(sizes) : [];
      parsedColors = colors ? JSON.parse(colors) : [];
      parsedFeatures = features ? JSON.parse(features) : [];
    } catch (parseError) {
      return res.status(400).json({ message: 'Invalid JSON format for sizes, colors, or features' });
    }

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    // Validate price
    if (isNaN(price) || Number(price) <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    // Debug: Log req.files
    console.log('req.files:', req.files);

    // Handle image uploads
    const images = [];
    const files = req.files || [];

    if (files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    for (const file of files) {
      try {
        // Validate file before upload
        if (!file.buffer || !file.originalname) {
          console.warn(`Skipping invalid file: ${file.originalname || 'unknown'}`);
          continue;
        }
        const { url, public_id } = await uploadImage(file.buffer, file.originalname);
        images.push({ url, public_id });
      } catch (uploadError) {
        console.error(`Error uploading image ${file.originalname || 'unknown'}:`, uploadError.message);
        // Continue with other files instead of failing the entire request
        continue;
      }
    }

    if (images.length === 0) {
      return res.status(400).json({ message: 'At least one image must be uploaded successfully' });
    }

    // Create product
    const product = new Product({
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description,
      longDescription,
      images,
      category: category || 'T-Shirts',
      subcategory,
      gender: gender || 'Unisex',
      inStock: inStock === 'true' || inStock === true,
      sizes: parsedSizes,
      colors: parsedColors,
      features: parsedFeatures,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all products with pagination and filtering
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      gender,
      category,
      subcategory,
      minPrice,
      maxPrice,
      onSale,
      isNew,
    } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (gender) query.gender = { $in: gender.split(',') };
    if (category) query.category = { $in: category.split(',') };
    if (subcategory) query.subcategory = { $in: subcategory.split(',') };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (onSale === 'true') query.originalPrice = { $exists: true, $ne: null };
    if (isNew === 'true') query.isNew = true;

    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit));
    const total = await Product.countDocuments(query);
    res.status(200).json({ products, total });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    // Ensure user is admin or vendor
    if (!['admin', 'vendor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized: Admin or vendor access required' });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};