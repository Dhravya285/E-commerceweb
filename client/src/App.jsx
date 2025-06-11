
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

import OrderConfirmation from "./components/checkout/OrderConfirmation";
import Settings from "./pages/admin/Settings";
import Customers from "./pages/admin/Customers";
import Analytics from "./pages/admin/Analytics";
import Products from "./pages/admin/Products";
import Discounts from "./pages/admin/Discounts";
import Orders from "./pages/admin/Orders";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import VerifyOtp from "./pages/admin/VerifyOtp";
import AddProduct from "./pages/admin/AddProduct";
import AddDiscount from "./pages/admin/AddDiscount";
import Notifications from "./components/Notifications";
import ViewQuery from "./pages/admin/ViewQuery";
import { jwtDecode } from "jwt-decode";

// Protected route for admin roles (admin or vendor)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!["admin", "vendor"].includes(decoded.role)) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/admin/login" />;
  }
};

// Protected route for general users (any valid token)
const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    jwtDecode(token); // Validate token
    return children;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Authentication) */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/verify-otp" element={<VerifyOtp />} />

        {/* Protected User Routes */}
        <Route
          path="/"
          element={
            <UserProtectedRoute>
              <HomePage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <UserProtectedRoute>
              <CartPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <UserProtectedRoute>
              <ProductDetailPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <UserProtectedRoute>
              <Newsletter />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <UserProfilePage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <UserProtectedRoute>
              <ProductListingPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/men"
          element={
            <UserProtectedRoute>
              <MenPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/women"
          element={
            <UserProtectedRoute>
              <WomenPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <UserProtectedRoute>
              <AboutPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <CheckoutPage />
            </UserProtectedRoute>
          }
        />
        
        <Route
          path="/order-confirmation"
          element={
            <UserProtectedRoute>
              <OrderConfirmation />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <UserProtectedRoute>
              <Notifications />
            </UserProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/queries/:id"
          element={
            <ProtectedRoute>
              <ViewQuery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/discounts"
          element={
            <ProtectedRoute>
              <Discounts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/discount/add"
          element={
            <ProtectedRoute>
              <AddDiscount />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}
