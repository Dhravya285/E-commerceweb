// CartPage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ChevronRight } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // Decode userId from token
        if (token) {
          try {
            const payload = token.split(".")[1];
            if (payload) {
              const decoded = JSON.parse(atob(payload));
              userId = decoded.id || decoded._id || decoded.sub || decoded.userId;
              console.log("Decoded userId from token:", userId);
              if (userId) {
                localStorage.setItem("userId", userId);
              }
            }
          } catch (e) {
            console.error("Token decode error:", e.message);
            toast.error("Invalid session. Please log in again.");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/login");
            return;
          }
        }

        if (!userId || !token) {
          console.warn("Missing userId or token, redirecting to login");
          toast.error("Please log in to view your cart", { duration: 4000 });
          navigate("/login");
          return;
        }

        console.log("Fetching cart - userId:", userId);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId },
        });
        const cartData = response.data.items || [];
        setCartItems(cartData);

        // Sync local cart with backend
        const localCartRaw = localStorage.getItem("cart");
        let localCart = [];
        try {
          localCart = JSON.parse(localCartRaw || "[]");
          if (!Array.isArray(localCart)) {
            console.warn("Local cart is not an array; resetting to empty");
            localCart = [];
          }
        } catch (e) {
          console.error("Local storage parse error:", e.message);
          localCart = [];
        }

        if (localCart.length > 0) {
          const mergedCart = localCart
            .filter(item => item.productId && /^[0-9a-fA-F]{24}$/.test(item.productId))
            .map(item => ({
              productId: String(item.productId),
              name: String(item.name || "Unknown Product"),
              price: Number(item.price) || 0,
              image: String(item.image || "https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/default/default-tshirt.jpg"),
              size: String(item.size || "M"),
              color: String(item.color || "Black"),
              quantity: Number(item.quantity) || 1,
            }));

          try {
            await axios.put(
              "http://localhost:5002/api/cart/update",
              { userId, items: mergedCart },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            localStorage.setItem("cart", JSON.stringify(mergedCart));
            setCartItems(mergedCart);
          } catch (mergeError) {
            console.error("Failed to sync local cart with backend:", mergeError.message);
            // toast.error("Failed to sync cart with server.");
          }
        } else {
          localStorage.setItem("cart", JSON.stringify(cartData));
        }
      } catch (error) {
        console.error("Fetch cart error:", error.response?.data || error.message);
        toast.error("Failed to load cart");
        setCartItems([]);
      }
    };

    fetchCart();
  }, [navigate]);

  // Example addToCart function (add to ProductDetailPage.jsx or similar)
  const addToCart = async (product) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const cartItem = {
        userId: userId || null,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size || "M", // Adjust based on your product structure
        color: product.color || "Black", // Adjust based on your product structure
        quantity: 1,
      };

      if (userId && token) {
        console.log("Adding to cart for userId:", userId, cartItem);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/cart`,
          cartItem,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems(response.data.cart.items);
        toast.success("Item added to cart!");
      } else {
        console.log("Adding to guest cart:", cartItem);
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = localCart.findIndex(
          (item) =>
            item.productId === cartItem.productId &&
            item.size === cartItem.size &&
            item.color === cartItem.color
        );
        if (itemIndex > -1) {
          localCart[itemIndex].quantity += cartItem.quantity;
        } else {
          localCart.push(cartItem);
        }
        localStorage.setItem("cart", JSON.stringify(localCart));
        setCartItems([...localCart]);
        toast.success("Item added to guest cart!");
      }
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      toast.error("Failed to add item to cart");
    }
  };

  const updateQuantity = async (id, size, color, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId && token) {
        const response = await axios.put(
         `${process.env.REACT_APP_API_BASE_URL}/api/cart/update`,
          { userId, productId: id, size, color, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems(response.data.cart.items);
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = localCart.findIndex(
          (item) => item.productId === id && item.size === size && item.color === color
        );
        if (itemIndex > -1) {
          localCart[itemIndex].quantity = newQuantity;
          localStorage.setItem("cart", JSON.stringify(localCart));
          setCartItems([...localCart]);
        }
      }
    } catch (error) {
      console.error("Update quantity error:", error.response?.data || error.message);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (id, size, color) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId && token) {
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/remove`, {
          data: { userId, productId: id, size, color },
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.cart.items);
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = localCart.filter(
          (item) => !(item.productId === id && item.size === size && item.color === color)
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems([...updatedCart]);
      }
    } catch (error) {
      console.error("Remove item error:", error.response?.data || error.message);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId && token) {
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/clear`, {
          data: { userId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems([]);
      } else {
        localStorage.setItem("cart", JSON.stringify([]));
        setCartItems([]);
      }
    } catch (error) {
      console.error("Clear cart error:", error.response?.data || error.message);
      toast.error.boxer
      toast.error("Failed to clear cart");
    }
  };

  const applyCoupon = () => {
    if (couponCode.trim() === "") {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (couponCode.toUpperCase() === "HERO10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal - discount + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
      <Header />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1
          className="text-3xl font-bold text-white mb-6 flex items-center"
          style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
        >
          <ShoppingBag className="mr-2 text-blue-400" size={28} />
          Your Cosmic Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)] transform rotate-1">
                <div className="divide-y divide-blue-900/30 transform -rotate-1">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row"
                    >
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-blue-900/20 rounded-md overflow-hidden mb-4 sm:mb-0 border border-blue-800/30">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium text-white">
                              <Link
                                to={`/product/${item.productId}`}
                                className="hover:text-blue-400 transition-colors"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-blue-300">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="mt-1 text-sm font-medium text-blue-200">₹{item.price}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.size, item.color)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border border-blue-900/50 rounded-md bg-black/30">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                              }
                              className="p-2 text-blue-400 hover:text-blue-300"
                            >
                              <Minus size={14} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.color,
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                              className="w-12 text-center border-x border-blue-900/50 py-1 text-white bg-transparent"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                              }
                              className="p-2 text-blue-400 hover:text-blue-300"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-medium text-white">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Link
                  to="/products"
                  className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Continue Exploring
                </Link>
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)] transform -rotate-1">
                <div className="transform rotate-1">
                  <h2
                    className="text-xl font-bold text-white mb-4"
                    style={{ textShadow: "0 0 8px rgba(100, 200, 255, 0.7)" }}
                  >
                    Order Summary
                  </h2>
                  <div className="mb-6">
                    <label
                      htmlFor="coupon"
                      className="block text-sm font-medium text-blue-300 mb-2 text-glow-blue"
                    >
                      Discount Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError("");
                        }}
                        disabled={couponApplied}
                        placeholder="Enter code"
                        className="flex-grow px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-blue-300/70"
                      />
                      <button
                        onClick={applyCoupon}
                        disabled={couponApplied}
                        className={`px-4 py-2 rounded-r-md font-medium transition-all duration-300 ${
                          couponApplied
                            ? "bg-green-800/70 text-white"
                            : "bg-blue-900/30 hover:bg-blue-800/50 text-white border-blue-900/50 border"
                        }`}
                      >
                        {couponApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {couponError && <p className="text-sm text-red-400 mt-1">{couponError}</p>}
                    {couponApplied && (
                      <p className="text-sm text-green-400 mt-1">Coupon applied: 10% discount</p>
                    )}
                    {!couponApplied && !couponError && (
                      <p className="text-xs text-blue-300/70 mt-1">
                        Try "HERO10" for 10% off your order
                      </p>
                    )}
                  </div>
                  <div className="space-y-3 border-b border-blue-900/30 pb-4 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300">Subtotal</span>
                      <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300">Discount</span>
                        <span className="text-green-400 font-medium">-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300">Shipping</span>
                      <span className="text-white font-medium">
                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span
                      className="text-lg font-bold text-blue-400"
                      style={{ textShadow: "0 0 8px rgba(100, 200, 255, 0.7)" }}
                    >
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  <Link
                    to="/checkout"
                    className="w-full bg-blue-900/30 hover:bg-blue-800/50 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 border border-blue-900/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)]"
                  >
                    <CreditCard size={20} />
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-black/40 backdrop-blur-md rounded-xl border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
            <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-800/50">
              <ShoppingBag className="text-blue-400" size={32} />
            </div>
            <h2
              className="text-2xl font-bold text-white mb-2"
              style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
            >
              Your cosmic cart is empty
            </h2>
            <p className="text-blue-300 mb-6">Looks like you haven't added any heroic items to your cart yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-900/30 hover:bg-blue-800/50 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-blue-900/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)]"
            >
              Start Shopping
              <ChevronRight className="ml-2" size={18} />
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;