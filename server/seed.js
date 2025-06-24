require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const { uploadImage } = require('./utils/cloudinaryUpload');
const fs = require('fs').promises;
const path = require('path');

// Ensure Uploads directory exists
const ensureUploadsDir = async () => {
  const uploadsDir = path.join(__dirname, 'Uploads');
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir);
  }
};

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected: ' + mongoose.connection.host))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const categories = ['Marvel', 'DC', 'Anime', 'Custom'];
const subcategories = [
  'Graphic Printed', 'Oversized', 'Acid Wash', 'Solid Color',
  'Sleeveless', 'Long Sleeve', 'Hooded', 'Crop Top'
];
const baseNames = [
  'Iron Man: Arc Reactor', 'Wonder Woman: Warrior', 'Goku: Super Saiyan',
  'Sailor Moon: Cosmic Power', 'Black Widow: Avenger', 'Captain Marvel: Higher Further Faster',
  'Superman: Man of Steel', 'Spider-Man: Web Slinger', 'Batman: Dark Knight',
  'Naruto: Hidden Spark', 'Custom Hero', 'Deadpool: Anti-Hero'
];
// Read images from assets folder
const imageDir = path.join(__dirname, 'public', 'assets');
const getImageFiles = async () => {
  try {
    const files = await fs.readdir(imageDir);
    const filteredFiles = files
      .filter(file => file.match(/^comic-tshirt-\d+\.(jpg|webp|gif)$/i))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      });
    console.log(`Found ${filteredFiles.length} images:`, filteredFiles.slice(0, 10));
    return filteredFiles;
  } catch (err) {
    console.error('Error reading image directory:', err.message);
    return [];
  }
};

// Generate products with three images each
const generateProducts = async () => {
  const imageFiles = await getImageFiles();
  if (imageFiles.length < 144) {
    console.warn(`Only ${imageFiles.length} images found. Expected at least 144 for 48 products with 3 images each.`);
  }

  const products = [];
  let productIndex = 0;
  let imageIndex = 0;

  for (const category of categories) {
    for (const subcategory of subcategories) {
      if (productIndex >= 48) break;
      if (imageIndex + 2 >= imageFiles.length) break;

      const baseName = baseNames[productIndex % baseNames.length];
      const gender = subcategory === 'Crop Tops' ? 'Women' : Math.random() > 0.5 ? 'Men' : 'Unisex';

      const fullImage = imageFiles[imageIndex];
      const frontImage = imageFiles[imageIndex + 1];
      const backImage = imageFiles[imageIndex + 2];
      const images = [
        `/assets/${fullImage}`,
        `/assets/${frontImage}`,
        `/assets/${backImage}`
      ];

      products.push({
        name: `${baseName} ${subcategory} T-Shirt`,
        price: Math.floor(Math.random() * 1500) + 500,
        originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 2000) + 1000 : null,
        description: `High-quality ${category} ${subcategory} T-shirt featuring ${baseName}.`,
        longDescription: `<p>Premium cotton ${subcategory} T-shirt with vibrant ${baseName} print. Perfect for ${category} fans!</p>`,
        images,
        category,
        subcategory,
        gender,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 500),
        inStock: Math.random() > 0.1,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
          { name: 'Red', hex: '#e53e3e' },
          { name: 'Blue', hex: '#3182ce' },
          { name: 'Black', hex: '#2d3748' }
        ],
        features: [
          '100% premium cotton',
          'Vibrant print',
          'Machine washable',
          'Regular fit'
        ],
        isNew: Math.random() > 0.7
      });

      productIndex++;
      imageIndex += 3;
    }
    if (productIndex >= 48) break;
  }

  return products;
};

const seedDB = async () => {
  try {
    await ensureUploadsDir();
    const products = await generateProducts();
   const productCount = await Product.countDocuments();
if (productCount > 0) {
  console.log('⚠️ Products already exist. Skipping seeding.');
  mongoose.connection.close();
  return;
}


    const seededProducts = [];

    for (const productData of products) {
      const images = [];
      for (const imagePath of productData.images) {
        let localPath = '';
        try {
          const fullImagePath = path.join(__dirname, 'public', imagePath.replace(/^\/assets\//, 'assets/'));
          if (await fs.access(fullImagePath).then(() => true).catch(() => false)) {
            const filename = path.basename(fullImagePath);
            localPath = path.join(__dirname, 'Uploads', filename);
            await fs.copyFile(fullImagePath, localPath);
            const fileBuffer = await fs.readFile(localPath);
            const { url, public_id } = await uploadImage(fileBuffer, filename);
            images.push({ url, public_id });
          } else {
            console.warn(`Image ${imagePath} not found, skipping.`);
            continue;
          }
        } catch (err) {
          console.error(`Error processing image ${imagePath} for product ${productData.name}:`, err.message);
          continue;
        } finally {
          if (localPath && (await fs.access(localPath).then(() => true).catch(() => false))) {
            await fs.unlink(localPath).catch(err => console.error(`Error deleting temp file ${localPath}:`, err.message));
          }
        }
      }

      const product = new Product({
        ...productData,
        images
      });
      const savedProduct = await product.save();
      seededProducts.push(savedProduct);
    }

    console.log('Products seeded:', seededProducts.map(p => ({ id: p._id, name: p.name, gender: p.gender, category: p.category, subcategory: p.subcategory, images: p.images })));
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
};

seedDB();