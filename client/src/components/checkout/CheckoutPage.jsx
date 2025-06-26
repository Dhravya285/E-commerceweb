import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, Truck, Shield, Check, Star } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [paypalError, setPaypalError] = useState(null);
  const [discountData, setDiscountData] = useState(null);
  
  const isMounted = useRef(true);

  // Merge guest and user carts
  const mergeCarts = (guestCart, userCart) => {
    const merged = [...userCart];
    guestCart.forEach((guestItem) => {
      // Validate guest item
      if (
        !guestItem.productId ||
        !mongoose.Types.ObjectId.isValid(guestItem.productId) ||
        !guestItem.name ||
        !guestItem.price ||
        !guestItem.quantity ||
        !guestItem.size ||
        !guestItem.color ||
        !guestItem.image
      ) {
        console.warn('Skipping invalid guest cart item:', guestItem);
        return;
      }

      const existing = merged.find(
        (item) =>
          item.productId === guestItem.productId &&
          item.size === guestItem.size &&
          item.color === guestItem.color
      );
      if (existing) {
        existing.quantity = Number(existing.quantity) + Number(guestItem.quantity);
      } else {
        merged.push({
          productId: String(guestItem.productId),
          name: String(guestItem.name),
          price: Number(guestItem.price),
          image: String(guestItem.image),
          size: String(guestItem.size),
          color: String(guestItem.color),
          quantity: Number(guestItem.quantity),
        });
      }
    });
    console.log('Merged cart items:', merged);
    return merged;
  };

  // Clean cart items for backend
  const cleanCartItems = (items) => {
    return items
      .filter(item => 
        item.productId &&
        mongoose.Types.ObjectId.isValid(item.productId) &&
        item.name &&
        item.price != null &&
        item.quantity != null &&
        item.size &&
        item.color &&
        item.image
      )
      .map(({ _id, createdAt, updatedAt, productId, id, ...item }) => ({
        productId: String(productId || id),
        name: String(item.name),
        price: Number(item.price),
        image: String(item.image),
        size: String(item.size),
        color: String(item.color),
        quantity: Number(item.quantity),
      }));
  };

  useEffect(() => {
    isMounted.current = true;
    let isSyncInProgress = false;

    const fetchCartItems = async () => {
      if (isSyncInProgress) {
        console.log('Sync already in progress, waiting...');
        await new Promise(resolve => setTimeout(resolve, 100));
        return fetchCartItems(); // Retry after delay
      }

      isSyncInProgress = true;
      console.log('Starting fetchCartItems at:', new Date().toISOString());
      try {
        const token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');

        // Decode userId from token
        if (token) {
          try {
            const payload = token.split('.')[1];
            if (payload) {
              const decoded = JSON.parse(atob(payload));
              const tokenUserId = decoded.id || decoded._id || decoded.sub || decoded.userId;
              console.log('Decoded token userId:', tokenUserId);
              if (tokenUserId) {
                if (userId && userId !== tokenUserId) {
                  console.warn('LocalStorage userId mismatch with token; updating localStorage', { local: userId, token: tokenUserId });
                  localStorage.setItem('userId', tokenUserId);
                }
                userId = tokenUserId;
              }
            }
          } catch (decodeError) {
            console.error('Token decode error:', decodeError.message);
            toast.error('Invalid session. Please log in again.');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
            return;
          }
        }

        let cartData = [];
        let localCart = [];

        // Fetch and sanitize local cart
        try {
          const localCartRaw = localStorage.getItem('cart');
          console.log('Raw local storage cart:', localCartRaw);
          localCart = JSON.parse(localCartRaw || '[]');
          if (!Array.isArray(localCart)) {
            console.warn('Local cart is not an array; resetting to empty');
            localStorage.setItem('cart', '[]');
            localCart = [];
          } else {
            localCart = localCart
              .filter(item => item.productId && mongoose.Types.ObjectId.isValid(item.productId))
              .map(item => ({
                productId: String(item.productId),
                name: String(item.name || 'Unknown Product'),
                price: Number(item.price) || 0,
                image: String(item.image || 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/default/default-tshirt.jpg'),
                size: String(item.size || 'M'),
                color: String(item.color || 'Black'),
                quantity: Number(item.quantity) || 1,
              }));
            console.log('Sanitized local cart:', localCart);
          }
        } catch (parseError) {
          console.error('Local storage parse error:', parseError.message);
          // toast.error('Corrupted cart data in local storage.');
          localStorage.setItem('cart', '[]');
          localCart = [];
        }

        if (userId && token && isMounted.current) {
          console.log(`Fetching cart from backend for userId: ${userId}`);
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
              headers: { Authorization: `Bearer ${token}` },
              params: { userId },
              timeout: 10000,
            });
            cartData = response.data.items || [];
            if (!Array.isArray(cartData)) {
              console.warn('Backend response is not an array:', cartData);
              cartData = [];
            }
            console.log(`Backend returned ${cartData.length} cart items`);

            // Merge local cart with backend cart
            if (localCart.length > 0) {
              console.log('Merging local cart with backend cart');
              cartData = mergeCarts(localCart, cartData);
              console.log('Merged cart:', JSON.stringify(cartData, null, 2));
              // Update backend with merged cart
              try {
                const cleanedCart = cleanCartItems(cartData);
                console.log('Cleaned cart for backend:', JSON.stringify(cleanedCart, null, 2));
                await axios.put(
                 `${import.meta.env.VITE_API_BASE_URL}/api/cart/update`,
                  { userId, items: cleanedCart },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 10000,
                  }
                );
                console.log('Updated backend with merged cart using PUT');
                localStorage.setItem('cart', JSON.stringify(cleanedCart));
              } catch (mergeError) {
                console.error('Failed to update backend with merged cart:', mergeError.message);
                console.log('Merge error details:', {
                  status: mergeError.response?.status,
                  data: mergeError.response?.data,
                });
                toast.error(`Failed to sync cart with server: ${mergeError.response?.data?.message || mergeError.message}`);
                localStorage.setItem('cart', JSON.stringify(cartData));
              }
            } else {
              localStorage.setItem('cart', JSON.stringify(cartData));
            }
          } catch (backendError) {
            console.error('Backend fetch error:', backendError.message);
            console.log('Error details:', {
              status: backendError.response?.status,
              data: backendError.response?.data,
            });
            toast.error('Failed to fetch cart from server. Using local cart.');
            cartData = localCart;
            localStorage.setItem('cart', JSON.stringify(cartData));
          }
        } else {
          console.log('No userId or token; using local cart');
          cartData = localCart;
          localStorage.setItem('cart', JSON.stringify(cartData));
        }

        if (isMounted.current) {
          console.log('Setting cartItems with:', cartData);
          setCartItems(cartData);
          if (cartData.length === 0) {
            console.log('Cart is empty; setting error message');
            setError('Your cart is empty.');
          } else {
            setError(null);
          }
        }
      } catch (error) {
        console.error('Unexpected error in fetchCartItems:', error);
        console.log('Error stack:', error.stack);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load cart items';
        if (isMounted.current) {
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        isSyncInProgress = false;
        if (isMounted.current) {
          setLoading(false);
          console.log('setLoading(false) called');
        }
      }
    };

    fetchCartItems();
    return () => {
      console.log('Cleaning up useEffect at:', new Date().toISOString());
      isMounted.current = false;
    };
  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const applyCoupon = async () => {
    if (couponCode.trim() === "") {
      setCouponError("Please enter a coupon code");
      toast.error("Please enter a coupon code");
      return;
    }
    

   try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/discounts/apply`, {
        code: couponCode.toUpperCase(),
        subtotal,
      });
      setDiscountData(response.data);
      setCouponError("");
      localStorage.setItem("couponCode", couponCode.toUpperCase());
      localStorage.setItem("discountData", JSON.stringify(response.data));
      toast.success(`Coupon applied: ${response.data.discountPercentage}% discount`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid coupon code";
      setCouponError(errorMessage);
      setDiscountData(null);
      localStorage.removeItem("couponCode");
      localStorage.removeItem("discountData");
      toast.error(errorMessage);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (paymentMethod !== "paypal") {
      try {
        console.log("Submitting order...");
        const token = localStorage.getItem("token");
        const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
          {
            user: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
            },
            items: cartItems.map((item) => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
              image: item.image,
            })),
            paymentMethod,
            shippingMethod,
            subtotal,
            discount,
            shipping,
            tax,
            total: parseFloat(total.toFixed(2)),
          },
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (!response.data.orderId) throw new Error("Failed to save order");
        console.log("Order placed, clearing cart...");
        localStorage.removeItem("cart");
        localStorage.removeItem("couponCode");
        toast.success("Order placed successfully!");
        navigate("/order-confirmation");
      } catch (error) {
        console.error("Error saving order:", error);
        toast.error(error.response?.data?.error || "Failed to place order");
      }
    }
  };

  // Update calculations for USD (assuming 1 USD ≈ 83 INR for conversion)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = discountData ? discountData.discountAmount : 0;
  const shipping = shippingMethod === "express" ? 1.19 : subtotal > 499 ? 0 : 0.59;
  const tax = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + shipping + tax;
 return (
  <PayPalScriptProvider
    options={{
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb",
      currency: "USD", // Changed from INR to USD
      intent: "capture",
      components: "buttons",
      debug: import.meta.env.NODE_ENV === "development",
    }}
    onError={(err) => {
      console.error("PayPal SDK failed to load:", err);
      setPaypalError("Failed to load PayPal. Please try another payment method or refresh the page.");
      toast.error("PayPal is currently unavailable. Please try another payment method.");
      console.log("Current loading state after PayPal error:", loading);
    }}
  >
    <Navbar />
    <div className="bg-gradient-to-b from-gray-900 to-blue-950 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <ChevronLeft size={18} className="mr-1" />
            Back to Cart
          </Link>
        </div>

        {loading ? (
          <div className="min-h-screen flex items-center justify-center flex-col">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-300">Loading your cart... Please wait.</p>
              <p className="mt-2 text-sm text-gray-400">If this takes too long, check your network or try refreshing.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-blue-400 hover:text-blue-300 inline-flex items-center"
              >
                Refresh Page
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">Debug: Loading state is {loading.toString()}</p>
          </div>
        ) : error ? (
          <div className="min-h-screen flex items-center justify-center flex-col">
            <p className="text-red-400 text-lg">{error}</p>
            <Link to="/cart" className="text-blue-400 hover:text-blue-300 mt-4 inline-flex items-center">
              <ChevronLeft size={18} className="mr-1" />
              Back to Cart
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-400 hover:text-blue-300 mt-2 inline-flex items-center"
            >
              Try Again
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center flex-col">
            <p className="text-gray-300 text-lg">Your cart is empty.</p>
            <Link to="/products" className="text-blue-400 hover:text-blue-300 mt-4 inline-flex items-center">
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            {paypalError && (
              <div className="bg-red-900/50 border border-red-700 p-4 rounded-md mb-6">
                <p className="text-red-300">{paypalError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-blue-400 hover:text-blue-300 mt-2 inline-flex items-center"
                >
                  Try Again
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-black/40 backdrop-blur-md rounded-xl border border-blue-900/50 p-6 mb-6 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                  <div className="mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {step > 1 ? <Check size={16} /> : 1}
                        </div>
                        <div className="ml-2">
                          <p className={`font-medium ${step >= 1 ? "text-blue-400" : "text-gray-400"}`}>Shipping</p>
                        </div>
                      </div>
                      <div className="w-16 h-1 bg-gray-700">
                        <div className={`h-full ${step > 1 ? "bg-blue-500" : "bg-gray-700"}`}></div>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 2 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {step > 2 ? <Check size={16} /> : 2}
                        </div>
                        <div className="ml-2">
                          <p className={`font-medium ${step >= 2 ? "text-blue-400" : "text-gray-400"}`}>Payment</p>
                        </div>
                      </div>
                      <div className="w-16 h-1 bg-gray-700">
                        <div className={`h-full ${step > 2 ? "bg-blue-500" : "bg-gray-700"}`}></div>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= 3 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          3
                        </div>
                        <div className="ml-2">
                          <p className={`font-medium ${step >= 3 ? "text-blue-400" : "text-gray-400"}`}>Review</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {step === 1 && (
                    <form onSubmit={handleSubmit}>
                      <h2 className="text-xl font-bold mb-4 text-white">Shipping Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-blue-300 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-blue-300 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-blue-300 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="address" className="block text-sm font-medium text-blue-300 mb-1">
                          Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium text-blue-300 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-blue-300 mb-1">
                            State *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-blue-300 mb-1">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-black/30 border border-blue-900/50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3 text-white">Shipping Method</h3>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 rounded-md bg-black/30 border border-blue-900/50">
                            <input
                              id="shipping-standard"
                              name="shippingMethod"
                              type="radio"
                              checked={shippingMethod === "standard"}
                              onChange={() => setShippingMethod("standard")}
                              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500"
                            />
                            <label htmlFor="shipping-standard" className="ml-3 flex flex-col">
                              <span className="text-sm font-medium text-blue-300">Standard Shipping</span>
                              <span className="text-sm text-gray-400">
                                {subtotal > 499 ? "Free" : "$0.59"} - Delivery in 4-6 business days
                              </span>
                            </label>
                          </div>
                          <div className="flex items-center p-3 rounded-md bg-black/30 border border-blue-900/50">
                            <input
                              id="shipping-express"
                              name="shippingMethod"
                              type="radio"
                              checked={shippingMethod === "express"}
                              onChange={() => setShippingMethod("express")}
                              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500"
                            />
                            <label htmlFor="shipping-express" className="ml-3 flex flex-col">
                              <span className="text-sm font-medium text-blue-300">Express Shipping</span>
                              <span className="text-sm text-gray-400">$1.19 - Delivery in 1-2 business days</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center"
                        >
                          Continue to Payment
                          <Star size={14} className="ml-2 text-yellow-300" />
                        </button>
                      </div>
                    </form>
                  )}

                 {step === 2 && (
  <form onSubmit={handleSubmit}>
    <h2 className="text-xl font-bold mb-4 text-white">Payment Method</h2>
    <div className="mb-6">
      <div className="space-y-3">
        <div className="flex items-center p-3 rounded-md bg-black/30 border border-blue-900/50">
          <input
            id="payment-cod"
            name="paymentMethod"
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500"
          />
          <label htmlFor="payment-cod" className="ml-3">
            <span className="text-sm font-medium text-blue-300">Cash on Delivery</span>
          </label>
        </div>
        <div className="flex items-center p-3 rounded-md bg-black/30 border border-blue-900/50">
          <input
            id="payment-paypal"
            name="paymentMethod"
            type="radio"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500"
          />
          <label htmlFor="payment-paypal" className="ml-3">
            <span className="text-sm font-medium text-blue-300">PayPal</span>
          </label>
        </div>
      </div>
    </div>

    {paymentMethod === "cod" && (
      <div className="bg-black/30 p-4 rounded-md mb-6 border border-blue-900/50">
        <p className="text-sm text-gray-300">
          Pay with cash upon completion. Please ensure someone is available to receive the package and make the payment.
        </p>
      </div>
    )}

    {paymentMethod === "paypal" && (
      <div className="bg-black/30 p-4 rounded-md mb-6 border border-blue-900/50">
        <p className="text-sm text-gray-300 mb-4">Complete your payment using PayPal.</p>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "silver",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={async (data, actions) => {
            try {
              console.log("Creating PayPal order with payload:", {
                formData,
                cartItems,
                shippingMethod,
                subtotal,
                discount,
                shipping,
                tax,
                total: total.toFixed(2),
              });
              const token = localStorage.getItem("token");
              if (!token) {
                toast.error("Please log in to use PayPal.");
                navigate("/login");
                throw new Error("No authentication token found");
              }
              const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/paypal/create-order`,
                {
                  formData,
                  cartItems: cartItems.map((item) => ({
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                    image: item.image,
                  })),
                  shippingMethod,
                  subtotal,
                  discount,
                  shipping,
                  tax,
                  total,
                  currency: "USD",
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const orderData = response.data;
              if (response.status !== 200 || !orderData.id) {
                throw new Error(orderData.error || "Failed to create order");
              }
              console.log("PayPal order created:", orderData.id);
              return orderData.id;
            } catch (error) {
              console.error("Error creating PayPal order:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
              });
              toast.error("Failed to initiate PayPal payment. Please try again.");
              throw error;
            }
          }}
          onApprove={async (data, actions) => {
            try {
              console.log("Capturing PayPal order:", data.orderID);
              const token = localStorage.getItem("token");
              if (!token) {
                toast.error("Please log in to use PayPal.");
                navigate("/login");
                throw new Error("No authentication token found");
              }
              const response = await axios.post(
               `${import.meta.env.VITE_API_BASE_URL}/api/paypal/capture-order`,
                { orderID: data.orderID },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const captureData = response.data;
              if (response.status !== 200 || captureData.status !== "COMPLETED") {
                throw new Error(captureData.error || "Failed to capture order");
              }
              console.log("PayPal payment captured:", captureData);
              localStorage.removeItem("cart");
              localStorage.removeItem("couponCode");
              toast.success("PayPal payment successful!");
              navigate("/order-confirmation");
            } catch (error) {
              console.error("Error capturing PayPal order:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
              });
              toast.error("Payment failed. Please try again.");
            }
          }}
          onError={(error) => {
            console.error("PayPal error:", error);
            toast.error("An error occurred with PayPal. Please try again.");
          }}
        />
      </div>
    )}

    <div className="flex justify-between">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
      >
        <ChevronLeft size={16} className="mr-1" />
        Back to Shipping
      </button>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center"
      >
        Review Order
        <Star size={14} className="ml-2 text-yellow-300" />
      </button>
    </div>
  </form>
)}

                  {step === 3 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4 text-white">Review Your Order</h2>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3 text-white">Shipping Information</h3>
                        <div className="bg-black/30 p-4 rounded-md border border-blue-900/50">
                          <p className="font-medium text-blue-300">
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p className="text-gray-300">{formData.address}</p>
                          <p className="text-gray-300">
                            {formData.city}, {formData.state} {formData.zipCode}
                          </p>
                          <p className="text-gray-300">{formData.email}</p>
                          <p className="text-gray-300">{formData.phone}</p>
                        </div>
                      </div>
                     <div className="mb-6">
  <h3 className="text-lg font-medium mb-3 text-white">Payment Method</h3>
  <div className="bg-black/30 p-4 rounded-md border border-blue-900/50">
    {paymentMethod === "cod" && <p className="text-gray-300">Cash on Delivery</p>}
    {paymentMethod === "paypal" && <p className="text-gray-300">PayPal</p>}
  </div>
</div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3 text-white">Items</h3>
                        <div className="bg-black/30 p-4 rounded-md border border-blue-900/50">
                          {cartItems.map((item) => (
                            <div
                              key={`${item.productId}-${item.size}-${item.color}`}
                              className="flex items-center py-2 border-b border-gray-700 last:border-0"
                            >
                              <div className="w-16 h-16 flex-shrink-0 bg-gray-700 rounded-md overflow-hidden">
                                <img
                                  src={item.image || "https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/default/default-tshirt.jpg"}
                                  alt={item.name}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="text-sm font-medium text-blue-300">{item.name}</h4>
                                <p className="text-sm text-gray-400">
                                  Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-sm font-medium text-blue-300">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
                        >
                          <ChevronLeft size={16} className="mr-1" />
                          Back to Payment
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center"
                        >
                          Place Order
                          <Star size={14} className="ml-2 text-yellow-300" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-blue-900/50 sticky top-4 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                  <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
                  <div className="mb-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-blue-300 mb-2">
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
                        className="flex-grow px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                      />
                      <button
                        onClick={applyCoupon}
                        disabled={couponApplied}
                        className={`px-4 py-2 rounded-r-md font-medium transition-all duration-300 ${
                          couponApplied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {couponApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {couponError && <p className="text-sm text-red-500 mt-1">{couponError}</p>}
                    {couponApplied && <p className="text-sm text-green-500 mt-1">Coupon applied: 10% discount</p>}
                    {!couponError && !couponApplied && (
                      <p className="text-sm text-gray-400 mt-1">Try 'HERO10' for 10% off</p>
                    )}
                  </div>
                  <div className="space-y-3 border-b border-blue-600 pb-4 mb-4">
                    {cartItems.map((item) => (
                      <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.name} × {item.quantity}</span>
                        <span className="text-blue-300 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 border-b border-blue-600 pb-4 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-blue-300 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Discount</span>
                        <span className="text-green-500 font-medium">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Shipping</span>
                      <span className="text-blue-300 font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Tax (18% GST)</span>
                      <span className="text-blue-300 font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-lg font-bold text-blue-400">${total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start bg-black/30 p-3 rounded-md border border-blue-600">
                      <Truck className="text-blue-400 mt-0.5 flex-shrink-0 mr-3" size={18} />
                      <div>
                        <h4 className="text-sm font-medium text-blue-300">Shipping</h4>
                        <p className="text-xs text-gray-400">
                          {shippingMethod === "express" ? "Express Shipping (1-2 business days)" : "Standard Shipping (4-6 business days)"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start bg-black/30 p-3 rounded-md border border-blue-600">
                      <CreditCard className="text-blue-400 mt-0.5 flex-shrink-0 mr-3" size={18} />
                      <div>
                        <h4 className="text-sm font-medium text-blue-300">Payment</h4>
                        <p className="text-xs text-gray-400">
                          {/* {paymentMethod === "card" && "Credit/Debit Card"} */}
                          {/* {paymentMethod === "upi" && "UPI Payment"} */}
                          {/* {paymentMethod === "cod" && "Cash on Delivery"} */}
                          {paymentMethod === "paypal" && "PayPal"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start bg-black/30 p-3 rounded-md border border-blue-600">
                      <Shield className="text-blue-400 mt-0.5 flex-shrink-0 mr-3" size={18} />
                      <div>
                        <h4 className="text-sm font-medium text-blue-300">Secure Checkout</h4>
                        <p className="text-xs text-gray-400">Your payment information is processed securely.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
    </PayPalScriptProvider>
);
};

export default CheckoutPage;