import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginForm from "./components/auth/LoginForm";
import CartPage from "./components/cart/CartPage";
import ProductDetail from "./components/product/ProductDetail";
import SignupForm from "./components/auth/SignupForm";
import Newsletter from "./pages/home/NewsLetter";
import UserProfilePage from "./components/profile/UserProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductListingPage from "./components/product/ProductListingPage";
import MenPage from "./components/product/Men";
import WomenPage from "./components/product/Women";
import AboutPage from "./components/product/About";
import CheckoutPage from "./components/checkout/CheckoutPage";
import WishlistPage from "./pages/home/Wishlist";
// index.js or App.js


// Sample product data for ProductDetail
const sampleProduct = {
  id: "1",
  title: "Spider-Man: Web Slinger Graphic Tee",
  price: 29.99,
  originalPrice: 39.99,
  images: [
    "/assets/product-spiderman-1.jpg",
    "/assets/product-spiderman-2.jpg",
    "/assets/product-spiderman-3.jpg",
    "/assets/product-spiderman-4.jpg",
    "/assets/product-spiderman-5.jpg",
  ],
  description:
    "Swing into action with this premium Spider-Man graphic tee featuring the iconic web-slinger in a dynamic pose. Made from high-quality cotton for maximum comfort and durability.",
  category: "Marvel Universe",
  rating: 4.5,
  reviewCount: 128,
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Red", hex: "#e53e3e" },
    { name: "Blue", hex: "#3182ce" },
    { name: "Black", hex: "#2d3748" },
  ],
  inStock: true,
  features: [
    "100% premium cotton material",
    "Officially licensed Marvel merchandise",
    "Vibrant, long-lasting print",
    "Comfortable ribbed crew neck",
    "Machine washable",
    "Regular fit",
  ],
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail product={sampleProduct} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/news" element={<Newsletter />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/shop" element={<ProductListingPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage/>} />
        <Route path="/about" element={<AboutPage/>} />
  
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/wishlist" element={<WishlistPage/>} />
      </Routes>
    </Router>
  );
}
