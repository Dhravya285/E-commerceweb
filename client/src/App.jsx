import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import LoginForm from "./components/auth/LoginForm";
import CartPage from "./components/cart/CartPage";
import ProductDetailPage from "./components/product/ProductDetailPage";
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/news" element={<Newsletter />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/shop" element={<ProductListingPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}