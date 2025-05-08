const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected: " + mongoose.connection.host))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const categories = ["Marvel", "DC", "Anime", "Custom"];
const subcategories = [
  "Graphic Printed",
  "Oversized",
  "Acid Wash",
  "Solid Color",
  "Sleeveless",
  "Long Sleeve",
  "Hooded",
  "Crop Top",
];
const baseNames = [
  "Spider-Man: Web Slinger",
  "Batman: Dark Knight",
  "Naruto: Hidden Spark",
  "Custom Hero",
  "Iron Man: Arc Reactor",
  "Wonder Woman: Warrior",
  "Goku: Super Saiyan",
  "Deadpool: Anti-Hero",
  "Black Widow: Avenger",
  "Captain Marvel: Higher Further Faster",
  "Sailor Moon: Cosmic Power",
  "Superman: Man of Steel",
];

// Predefined products from Men.jsx and Women.jsx
const predefinedProducts = [
  {
    _id: "1",
    name: "Spider-Man: Web Slinger Graphic Tee",
    price: 799,
    images: [
      "https://m.media-amazon.com/images/I/B1OGJ8t+8ZS._CLa%7C2140%2C2000%7C91bGKdIRROL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX342_SY445_.png",
    ],
    category: "Marvel",
    subcategory: "Graphic Printed",
    rating: 4.5,
    reviewCount: 120,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Red", hex: "#e53e3e" },
      { name: "Blue", hex: "#3182ce" },
    ],
    features: ["100% cotton", "Vibrant print"],
    isNew: true,
    description: "High-quality Marvel T-shirt featuring Spider-Man.",
    longDescription: "<p>Premium cotton Graphic Printed T-shirt with vibrant Spider-Man print. Perfect for Marvel fans!</p>",
  },
  {
    _id: "2",
    name: "Batman: Dark Knight Oversized Tee",
    price: 899,
    images: [
      "https://images.bewakoof.com/original/men-s-navy-blue-the-dark-knight-graphic-printed-oversized-t-shirt-592058-1731661124-1.jpg",
    ],
    category: "DC",
    subcategory: "Oversized",
    rating: 5.0,
    reviewCount: 150,
    inStock: true,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#2d3748" },
      { name: "Blue", hex: "#3182ce" },
    ],
    features: ["100% cotton", "Oversized fit"],
    isNew: false,
    description: "High-quality DC T-shirt featuring Batman.",
    longDescription: "<p>Premium cotton Oversized T-shirt with vibrant Batman print. Perfect for DC fans!</p>",
  },
  {
    _id: "3",
    name: "Iron Man: Arc Reactor Glow Print",
    price: 999,
    images: [
      "https://tse2.mm.bing.net/th?id=OIP.gMTqgQ-XtU97Z_tcDbLXQwHaHa&pid=Api&P=0&h=180",
    ],
    category: "Marvel",
    subcategory: "Graphic Printed",
    rating: 4.0,
    reviewCount: 80,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Red", hex: "#e53e3e" },
      { name: "Black", hex: "#2d3748" },
    ],
    features: ["100% cotton", "Glow-in-dark print"],
    isNew: false,
    description: "High-quality Marvel T-shirt featuring Iron Man.",
    longDescription: "<p>Premium cotton Graphic Printed T-shirt with vibrant Iron Man print. Perfect for Marvel fans!</p>",
  },
  {
    _id: "4",
    name: "Superman: Man of Steel Acid Wash",
    price: 1099,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/91wEQqCFURL.-BZ1000-.superman-classic-logo-s-t-shirt.jpg",
    ],
    category: "DC",
    subcategory: "Acid Wash",
    rating: 3.5,
    reviewCount: 60,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "#3182ce" },
      { name: "Black", hex: "#2d3748" },
    ],
    features: ["100% cotton", "Acid wash finish"],
    isNew: false,
    description: "High-quality DC T-shirt featuring Superman.",
    longDescription: "<p>Premium cotton Acid Wash T-shirt with vibrant Superman print. Perfect for DC fans!</p>",
  },
  {
    _id: "5",
    name: "Wonder Woman: Amazonian Warrior Tee",
    price: 849,
    images: [
      "https://realinfinitywar.com/wp-content/uploads/2018/08/wonderwoman-casual-t-shirt-1.jpg",
    ],
    category: "DC",
    subcategory: "Graphic Printed",
    rating: 4.5,
    reviewCount: 100,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Red", hex: "#e53e3e" },
      { name: "Blue", hex: "#3182ce" },
    ],
    features: ["100% cotton", "Vibrant print"],
    isNew: true,
    description: "High-quality DC T-shirt featuring Wonder Woman.",
    longDescription: "<p>Premium cotton Graphic Printed T-shirt with vibrant Wonder Woman print. Perfect for DC fans!</p>",
  },
  {
    _id: "6",
    name: "Black Widow: Avenger Crop Top",
    price: 799,
    images: [
      "https://static.qns.digital/img/p/2/4/9/0/4/4/2/2490442.jpg",
    ],
    category: "Marvel",
    subcategory: "Crop Top",
    rating: 4.0,
    reviewCount: 90,
    inStock: true,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Black", hex: "#2d3748" },
      { name: "Red", hex: "#e53e3e" },
    ],
    features: ["100% cotton", "Cropped fit"],
    isNew: false,
    description: "High-quality Marvel crop top featuring Black Widow.",
    longDescription: "<p>Premium cotton Crop Top with vibrant Black Widow print. Perfect for Marvel fans!</p>",
  },
  {
    _id: "7",
    name: "Captain Marvel: Higher Further Faster Tee",
    price: 899,
    images: [
      "https://i5.walmartimages.com/seo/Captain-Marvel-Tshirt-Shirt-Tee_4b68b4f9-0b82-4017-b3a9-91c97602c237.e6c090abb6a933a6c562e176ba7731e8.jpeg",
    ],
    category: "Marvel",
    subcategory: "Graphic Printed",
    rating: 4.5,
    reviewCount: 110,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "#3182ce" },
      { name: "Red", hex: "#e53e3e" },
    ],
    features: ["100% cotton", "Vibrant print"],
    isNew: true,
    description: "High-quality Marvel T-shirt featuring Captain Marvel.",
    longDescription: "<p>Premium cotton Graphic Printed T-shirt with vibrant Captain Marvel print. Perfect for Marvel fans!</p>",
  },
  {
    _id: "8",
    name: "Sailor Moon: Cosmic Power Graphic Tee",
    price: 949,
    images: [
      "https://i5.walmartimages.com/asr/7cb0237a-538b-4d83-9dea-35432ee10cb1_1.3fd4e72403f6b82ef62f7739ff36fa96.jpeg",
    ],
    category: "Anime",
    subcategory: "Graphic Printed",
    rating: 5.0,
    reviewCount: 130,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Pink", hex: "#f687b3" },
    ],
    features: ["100% cotton", "Vibrant print"],
    isNew: false,
    description: "High-quality Anime T-shirt featuring Sailor Moon.",
    longDescription: "<p>Premium cotton Graphic Printed T-shirt with vibrant Sailor Moon print. Perfect for Anime fans!</p>",
  },
];

const products = Array.from({ length: 100 }, (_, i) => {
  const id = (i + 1).toString();
  if (i < predefinedProducts.length) return predefinedProducts[i];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
  const baseName = baseNames[i % baseNames.length];
  return {
    _id: id,
    name: `${baseName} T-Shirt ${i + 1}`,
    price: Math.floor(Math.random() * 1500) + 500,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 2000) + 1000 : null,
    description: `High-quality ${category} T-shirt featuring ${baseName}.`,
    longDescription: `<p>Premium cotton ${subcategory} T-shirt with vibrant ${baseName} print. Perfect for ${category} fans!</p>`,
    images: [
      `/assets/comic-tshirt-${(i % 5) + 1}.jpg`,
      `/assets/comic-tshirt-${(i % 5) + 2}.jpg`,
      `/assets/comic-tshirt-${(i % 5) + 3}.jpg`,
    ],
    category,
    subcategory,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviewCount: Math.floor(Math.random() * 500),
    inStock: Math.random() > 0.1,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Red", hex: "#e53e3e" },
      { name: "Blue", hex: "#3182ce" },
      { name: "Black", hex: "#2d3748" },
    ],
    features: [
      "100% premium cotton",
      "Vibrant print",
      "Machine washable",
      "Regular fit",
    ],
    isNew: Math.random() > 0.7,
  };
});

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    const seededProducts = await Product.insertMany(products);
    console.log("Products seeded:", seededProducts.map((p) => ({ id: p._id, name: p.name })));
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

seedDB();