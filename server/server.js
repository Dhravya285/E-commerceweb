require('dotenv').config();
const express = require("express");
const authRoutes = require("./routes/auth");
const googleRoutes = require("./routes/google");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');
const paypalRoutes = require('./routes/paymentRoutes'); 
const settingsRoutes = require('./routes/settingsRoutes');
const analyticsRoutes = require('./routes/AnalyticsRoutes')
const discountRoutes = require('./routes/discountRoutes');
const queryRoutes = require('./routes/queryRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://*.google.com"],
      connectSrc: ["'self'", "https://e-commerceweb-g4hq.onrender.com", "https://e-commerceweb-nine.vercel.app", "https://accounts.google.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://accounts.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
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
app.use('/api/cart', cartRoutes); 
app.use('/api/paypal', paypalRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings',settingsRoutes)
app.use('/api/analytics', analyticsRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/newsletter', newsletterRoutes);



app.get("/hello",(req,res)=>{
  res.json({message:"Hello from the server!"});
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));