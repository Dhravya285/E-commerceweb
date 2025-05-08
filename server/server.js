const dotenv = require("dotenv");
const express = require("express");
const authRoutes = require("./routes/auth");
const googleRoutes = require("./routes/google");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const productRoutes = require('./routes/productRoutes');
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Helmet security middleware
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:5002", "http://localhost:5173", "data:"],
      connectSrc: ["'self'", "http://localhost:5002", "http://localhost:5173"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for frontend
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
      fontSrc: ["'self'"],
    },
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/google", googleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use('/api/products', productRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));