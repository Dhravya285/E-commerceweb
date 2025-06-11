

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, Heart, CreditCard, LogOut, Edit, Camera, MapPin, Mail, Phone } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "", phone: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressData, setAddressData] = useState({
    type: "Home",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get("http://localhost:5002/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData({
        ...res.data,
        addresses: res.data.addresses || [],
      });
      setProfileData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
      });
    } catch (err) {
      console.error("Failed to fetch user:", {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data,
        } : null,
      });
      toast.error("Failed to load profile. Please log in again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
const fetchOrdersAndWishlist = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found, skipping fetch");
    navigate("/login");
    return;
  }

  console.log("JWT Token:", token);
  let userId = null;
  try {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("Invalid token: Missing payload");
    const decoded = JSON.parse(atob(payload));
    console.log("Token Payload:", decoded);
    userId = decoded.id || decoded._id || decoded.sub;
    console.log("Token userId:", userId || "undefined");
    if (!userId) {
      console.warn("No userId found in token payload");
    }
  } catch (e) {
    console.error("Token decode error:", e.message);
    toast.error("Invalid token. Please log in again.");
    localStorage.removeItem("token");
    navigate("/login");
    return;
  }

  try {
    const [ordersRes, wishlistRes] = await Promise.all([
      axios.get("http://localhost:5002/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:5002/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    console.log("Orders API Response:", {
      status: ordersRes.status,
      headers: ordersRes.headers,
      data: ordersRes.data,
    });

    const validatedOrders = Array.isArray(ordersRes.data)
      ? ordersRes.data.map((order) => ({
          _id: order._id,
          items: Array.isArray(order.items)
            ? order.items.map((item) => ({
                _id: item._id,
                productId: item.productId,
                name: item.name || "Unknown Item",
                price: parseFloat(item.price) || 0,
                quantity: parseInt(item.quantity) || 1,
                size: item.size || "",
                color: item.color || "",
                image: item.image || "/placeholder.png",
              }))
            : [],
          user: order.user || {},
          paymentMethod: order.paymentMethod || "unknown",
          paypalOrderId: order.paypalOrderId || "",
          paypalTransactionId: order.paypalTransactionId || "",
          paymentStatus: order.paymentStatus || "pending",
          shippingMethod: order.shippingMethod || "standard",
          subtotal: parseFloat(order.subtotal) || 0,
          discount: parseFloat(order.discount) || 0,
          shipping: parseFloat(order.shipping) || 0,
          tax: parseFloat(order.tax) || 0,
          total: parseFloat(order.total) || 0,
          orderStatus: order.orderStatus || "pending",
          trackingNumber: order.trackingNumber || null,
          isDelivered: !!order.isDelivered,
          deliveredAt: order.deliveredAt || null,
          createdAt: order.createdAt || new Date().toISOString(),
        }))
      : [];

    console.log("Validated Orders:", validatedOrders);
    setOrders(validatedOrders);

    console.log("Wishlist API Response:", {
      status: wishlistRes.status,
      headers: wishlistRes.headers,
      data: wishlistRes.data,
    });

    const wishlistData = Array.isArray(wishlistRes.data)
      ? wishlistRes.data
      : Array.isArray(wishlistRes.data.wishlist)
      ? wishlistRes.data.wishlist
      : [];

    const validatedWishlist = wishlistData
      .filter((item) => item.productId && typeof item.productId === "object" && item.productId._id)
      .map((item) => ({
        _id: item._id,
        productId: {
          _id: item.productId._id,
          name: item.productId.name || "Unnamed Product",
          price: parseFloat(item.productId.price) || 0,
          images: Array.isArray(item.productId.images) && item.productId.images.length > 0
            ? item.productId.images
            : [{ url: "/placeholder.png" }],
          inStock: item.productId.inStock ?? false,
        },
      }));

    console.log("Validated Wishlist:", validatedWishlist);
    setWishlist(validatedWishlist);
  } catch (error) {
    console.error("Failed to fetch orders/wishlist:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      toast.error("Failed to load orders or wishlist.");
    }
    setOrders([]);
    setWishlist([]);
  }
};
  useEffect(() => {
    fetchUser();
    fetchOrdersAndWishlist();
  }, [navigate]);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      console.log("wishlistUpdated event triggered");
      fetchOrdersAndWishlist();
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5002/api/users/me", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
      setIsEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };


const handleCancelOrder = async (orderId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(`Cancelling order ID: ${orderId}`);
    const response = await axios.put(
      `http://localhost:5002/api/paypal/orders/${orderId}/cancel`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, orderStatus: "cancelled" } : order
      )
    );
    toast.success(`Order ${orderId} cancelled successfully`);
  } catch (error) {
    console.error("Error cancelling order:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : null,
    });
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    } else if (error.response?.status === 403) {
      toast.error("Access denied. You can only cancel your own orders.");
    } else if (error.response?.status === 404) {
      toast.error("Order not found.");
    } else if (error.response?.status === 400) {
      toast.error(error.response.data.error || "Only pending orders can be cancelled.");
    } else {
      toast.error("Failed to cancel order.");
    }
  }
};



  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const formData = new FormData();
      formData.append("profilePicture", file);
      try {
        const res = await axios.post("http://localhost:5002/api/users/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData((prev) => ({
          ...prev,
          profilePicture: res.data.profilePicture,
        }));
        toast.success("Avatar updated successfully!");
      } catch (error) {
        console.error("Failed to upload avatar", error);
        toast.error("Failed to upload avatar. Please try again.");
      }
    }
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let res;
      if (selectedAddress) {
        res = await axios.put(
          `http://localhost:5002/api/users/addresses/${selectedAddress._id}`,
          addressData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await axios.post("http://localhost:5002/api/users/addresses", addressData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setUserData((prev) => ({
        ...prev,
        addresses: res.data.addresses || [],
      }));
      setIsEditingAddress(false);
      setSelectedAddress(null);
      setAddressData({
        type: "Home",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        isDefault: false,
      });
      toast.success(selectedAddress ? "Address updated successfully!" : "Address added successfully!");
    } catch (err) {
      console.error("Address update failed:", err);
      toast.error("Failed to update address. Please try again.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5002/api/users/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData((prev) => ({
        ...prev,
        addresses: res.data.addresses || [],
      }));
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address. Please try again.");
    }
  };

  const editAddress = (address) => {
    setSelectedAddress(address);
    setAddressData({
      type: address.type,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault,
    });
    setIsEditingAddress(true);
  };

  const handleRemoveFromWishlist = async (wishlistItemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5002/api/wishlist/${wishlistItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== wishlistItemId));
      toast.success("Removed from wishlist");
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error removing from wishlist:", {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Failed to remove from wishlist");
      }
    }
  };

  const handleAddToCart = async (product) => {
  if (!product?.inStock) {
    toast.error("Product is out of stock");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add to cart");
      navigate("/login");
      return;
    }

    let userId = localStorage.getItem("userId");
    if (!userId) {
      const payload = token.split(".")[1];
      if (!payload) throw new Error("Invalid token: Missing payload");
      const decoded = JSON.parse(atob(payload));
      console.log("Add to Cart - Token Payload:", decoded);
      userId = decoded._id || decoded.id || decoded.sub;
      console.log("Add to Cart - Decoded userId:", userId || "undefined");
      if (!userId) {
        throw new Error("No userId in token payload");
      }
      localStorage.setItem("userId", userId);
    }

    const cartItem = {
      userId,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || "/placeholder.png",
      size: product.sizes?.[0] || "M",
      color: product.colors?.[0]?.name || "Default",
      quantity: 1,
    };

    console.log("Add to Cart - Sending request:", { cartItem, headers: { Authorization: `Bearer ${token}` } });
    const response = await axios.post("http://localhost:5002/api/cart", cartItem, { // Updated endpoint
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Add to Cart - Response:", response.data);
    toast.success(`${product.name} added to cart!`);
  } catch (error) {
    console.error("Cart error:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : null,
    });
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    } else {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  }
};
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const renderGlowingStars = () => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      stars.push(
        <div
          key={i}
          className="glowing-star absolute"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, 0.8)`,
            animation: `star-glow ${Math.random() * 3 + 2}s infinite ease-in-out ${delay}s`,
          }}
        />
      );
    }
    return stars;
  };

  const renderShootingStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const width = Math.random() * 100 + 50;
      const top = Math.random() * 100;
      const left = Math.random() * 50;
      const delay = Math.random() * 15;
      const duration = Math.random() * 2 + 1;
      const angle = Math.random() * 60 - 30;
      stars.push(
        <div
          key={i}
          className="shooting-star absolute"
          style={{
            width: `${width}px`,
            height: "2px",
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${angle}deg)`,
            background: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)",
            animation: `shoot ${duration}s ${delay}s linear infinite`,
          }}
        />
      );
    }
    return stars;
  };

  const renderPulsatingStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      stars.push(
        <div
          key={i}
          className="pulsating-star absolute"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: `0 0 ${size * 3}px ${size}px rgba(100, 200, 255, 0.8)`,
            animation: `pulsate ${Math.random() * 3 + 3}s infinite ease-in-out ${delay}s`,
          }}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="text-center p-10 text-white">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="text-center p-10 text-white">User not found or not logged in</div>;
  }

  return (
    <>
      <Toaster />
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
                radial-gradient(2px 2px at 75% 75%, rgba(255, 255, 255, 0.8) 1%, transparent 1%),
                radial-gradient(1.5px 1.5px at 50% 50%, rgba(255, 255, 255, 0.9) 1%, transparent 1%),
                radial-gradient(1px 1px at 30% 70%, rgba(200, 200, 255, 0.7) 1%, transparent 1%),
                radial-gradient(2.5px 2.5px at 80% 20%, rgba(255, 255, 255, 0.7) 1%, transparent 1%)
              `,
              backgroundSize: "200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px",
              animation: "star-rotation 500s linear infinite",
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 10%, white 1%, transparent 1%),
                radial-gradient(1.5px 1.5px at 60% 40%, white 1%, transparent 1%),
                radial-gradient(1px 1px at 30% 80%, white 1%, transparent 1%)
              `,
              backgroundSize: "250px 250px, 300px 300px, 350px 350px",
              animation: "star-rotation-reverse 600s linear infinite",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)",
            }}
          />
          <div className="star-cluster-1 absolute w-32 h-32 opacity-40 top-[15%] left-[20%]" />
          <div className="star-cluster-2 absolute w-40 h-40 opacity-40 bottom-[30%] right-[25%]" />
          {renderGlowingStars()}
          {renderPulsatingStars()}
          {renderShootingStars()}
          <div
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "nebula-pulse 8s infinite alternate ease-in-out",
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(100, 0, 255, 0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
              animation: "nebula-pulse 12s infinite alternate-reverse ease-in-out",
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8" style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}>
            My Cosmic Profile
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="transform rotate-2 bg-black bg-opacity-40 p-6 rounded-xl shadow-2xl border border-blue-900">
                <div className="transform -rotate-2">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600 shadow">
                        <img
                          src={userData.profilePicture || "/placeholder.png"}
                          alt={userData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow">
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        <Camera size={16} />
                      </label>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-white">{userData.name}</h2>
                    <p className="text-blue-300">{userData.email}</p>
                  </div>
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "profile" ? "bg-blue-900 text-white shadow-lg" : "text-blue-300 hover:bg-blue-900/50"
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "orders" ? "bg-blue-900 text-white shadow-lg" : "text-blue-300 hover:bg-blue-900/50"
                      }`}
                    >
                      <Package size={18} className="mr-3" />
                      Orders
                    </button>
                    <button
                      onClick={() => setActiveTab("wishlist")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "wishlist" ? "bg-blue-900 text-white shadow-lg" : "text-blue-300 hover:bg-blue-900/50"
                      }`}
                    >
                      <Heart size={18} className="mr-3" />
                      Wishlist
                    </button>
                    {/* <button
                      onClick={() => setActiveTab("payment")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "payment" ? "bg-blue-900 text-white shadow-lg" : "text-blue-300 hover:bg-blue-900/50"
                      }`}
                    > */}
                      {/* <CreditCard size={18} className="mr-3" />
                      Payment Methods */}
                    {/* </button> */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-md transition-all"
                    >
                      <LogOut size={18} className="mr-3" />
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              {activeTab === "profile" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white">Personal Information</h2>
                      {!isEditingProfile && (
                        <button onClick={() => setIsEditingProfile(true)} className="flex items-center text-blue-400 hover:text-blue-300">
                          <Edit size={16} className="mr-1" />
                          Edit
                        </button>
                      )}
                    </div>
                    {isEditingProfile ? (
                      <form onSubmit={handleProfileSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                              className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="phone" className="block text-sm font-medium text-blue-300 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-2 border border-blue-900/50 rounded-md text-blue-300 hover:bg-blue-900/20"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900/50 text-white rounded-md hover:bg-blue-800/50"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <User className="text-blue-400 mr-3" size={20} />
                          <div>
                            <p className="text-sm text-blue-300">Full Name</p>
                            <p className="font-medium text-white">{userData.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Mail className="text-blue-400 mr-3" size={20} />
                          <div>
                            <p className="text-sm text-blue-300">Email Address</p>
                            <p className="font-medium text-white">{userData.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="text-blue-400 mr-3" size={20} />
                          <div>
                            <p className="text-sm text-blue-300">Phone</p>
                            <p className="font-medium text-white">{userData.phone || "Not provided"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Addresses</h3>
                        <button
                          onClick={() => {
                            setIsEditingAddress(true);
                            setSelectedAddress(null);
                            setAddressData({
                              type: "Home",
                              address: "",
                              city: "",
                              state: "",
                              zipCode: "",
                              isDefault: false,
                            });
                          }}
                          className="flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <Edit size={16} className="mr-1" />
                          Add Address
                        </button>
                      </div>
                      {isEditingAddress && (
                        <form onSubmit={handleAddressSubmit} className="mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="type" className="block text-sm font-medium text-blue-300 mb-1">
                                Address Type
                              </label>
                              <select
                                id="type"
                                name="type"
                                value={addressData.type}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                              >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="address" className="block text-sm font-medium text-blue-300 mb-1">
                                Street Address
                              </label>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={addressData.address}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-blue-300 mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                id="city"
                                name="city"
                                value={addressData.city}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="state" className="block text-sm font-medium text-blue-300 mb-1">
                                State
                              </label>
                              <input
                                type="text"
                                id="state"
                                name="state"
                                value={addressData.state}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="zipCode" className="block text-sm font-medium text-blue-300 mb-1">
                                Zip Code
                              </label>
                              <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={addressData.zipCode}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg"
                                required
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="isDefault"
                                name="isDefault"
                                checked={addressData.isDefault}
                                onChange={handleAddressChange}
                                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-blue-500 rounded"
                              />
                              <label htmlFor="isDefault" className="ml-2 text-sm font-medium text-blue-300">
                                Set as default
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3 mt-4">
                            <button
                              type="button"
                              onClick={() => {
                                setIsEditingAddress(false);
                                setSelectedAddress(null);
                              }}
                              className="px-4 py-2 border border-blue-900/50 rounded-md text-blue-300 hover:bg-blue-900/20"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-900/50 text-white rounded-md hover:bg-blue-800/50"
                            >
                              {selectedAddress ? "Update Address" : "Add Address"}
                            </button>
                          </div>
                        </form>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.isArray(userData.addresses) &&
                          userData.addresses.map((address) => (
                            <div key={address._id} className="border border-blue-900/50 rounded-lg p-4 bg-black/20">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center">
                                  <span className="font-medium text-white">{address.type}</span>
                                  {address.isDefault && (
                                    <span className="ml-2 bg-blue-900/50 text-blue-200 text-xs px-2 py-0.5 rounded-full">Default</span>
                                  )}
                                </div>
                                <div className="space-x-2">
                                  <button onClick={() => editAddress(address)} className="text-blue-400 hover:text-blue-300">
                                    <Edit size={16} />
                                  </button>
                                  <button onClick={() => handleDeleteAddress(address._id)} className="text-red-400 hover:text-red-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <MapPin className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                <div>
                                  <p className="text-blue-200">{address.address}</p>
                                  <p className="text-blue-200">{address.city}, {address.state} {address.zipCode}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {activeTab === "orders" && (
  <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
    <h2 className="text-xl font-bold text-white mb-6">My Orders</h2>
    {orders.length > 0 ? (
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-blue-900/50 rounded-lg overflow-hidden bg-black/20">
            <div className="bg-blue-900/50 p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-white">Order #{order._id}</p>
                <p className="text-sm text-blue-300">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                {order.paymentMethod === "paypal" && order.paypalTransactionId && (
                  <p className="text-sm text-blue-400">PayPal Transaction ID: {order.paypalTransactionId}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.orderStatus === "delivered"
                      ? "bg-green-900/50 text-green-300"
                      : order.orderStatus === "shipped"
                      ? "bg-blue-900/50 text-blue-300"
                      : order.orderStatus === "processing"
                      ? "bg-yellow-900/50 text-yellow-300"
                      : order.orderStatus === "cancelled"
                      ? "bg-red-900/50 text-red-300"
                      : "bg-gray-900/50 text-gray-300"
                  }`}
                >
                  {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </span>
                {order.orderStatus === "pending" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={item._id || index} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-blue-900/50">
                      <img src={item.image || "/placeholder.png"} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-white">{item.name}</h3>
                      <p className="text-sm text-blue-400">Qty: {item.quantity}</p>
                      {item.size && <p className="text-sm text-blue-400">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-blue-400">Color: {item.color}</p>}
                    </div>
                    <p className="text-sm font-medium text-white">${item.price?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-blue-900/50 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-blue-400">Subtotal:</p>
                  <p className="text-sm text-white">${order.subtotal?.toFixed(2)}</p>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-blue-400">Discount:</p>
                    <p className="text-sm text-white">-${order.discount?.toFixed(2)}</p>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-blue-400">Shipping:</p>
                  <p className="text-sm text-white">${order.shipping?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-blue-400">Tax:</p>
                  <p className="text-sm text-white">${order.tax?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-blue-400">Total Amount:</p>
                  <p className="text-lg font-bold text-white">${order.total?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-blue-400">Shipping Address:</p>
                  <p className="text-sm text-white">
                    {order.user?.address}, {order.user?.city}, {order.user?.state} {order.user?.zipCode}
                  </p>
                </div>
                {order.trackingNumber && (
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-blue-400">Tracking Number:</p>
                    <a
                      href={`https://www.fedex.com/fedextrack/?trknbr=${order.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 underline"
                    >
                      {order.trackingNumber}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 bg-blue-900/30 rounded-lg">
        <Package className="mx-auto text-blue-400" size={48} />
        <h3 className="mt-4 text-lg font-medium text-white">No orders yet</h3>
        <p className="mt-1 text-blue-400">When you place an order, it will appear here.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Start Shopping
        </Link>
      </div>
    )}
  </div>
)}
              {activeTab === "wishlist" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                  <h2 className="text-xl font-bold text-white mb-6">My Wishlist</h2>
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div key={item._id} className="border border-blue-900/50 rounded-lg p-4 flex bg-black/20">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-blue-900/50">
                            <Link to={`/product/${item.productId._id}`}>
                              <img
                                src={item.productId.images[0]?.url || "/placeholder.png"}
                                alt={item.productId.name}
                                className="h-full w-full object-cover"
                              />
                            </Link>
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <Link to={`/product/${item.productId._id}`}>
                                <h3 className="text-sm font-medium text-white hover:text-blue-400">{item.productId.name}</h3>
                              </Link>
                              <p className="mt-1 text-sm font-bold text-white">${item.productId.price.toFixed(2)}</p>
                              <p className="mt-1 text-sm text-blue-400">{item.productId.inStock ? "In stock" : "Out of stock"}</p>
                            </div>
                            <div className="mt-auto flex justify-between">
                              <button
                                onClick={() => handleAddToCart(item.productId)}
                                className="text-sm font-medium text-blue-400 hover:text-blue-300"
                                disabled={!item.productId.inStock}
                              >
                                Add to cart
                              </button>
                              <button
                                onClick={() => handleRemoveFromWishlist(item._id)}
                                className="text-sm font-medium text-red-400 hover:text-red-300"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
 grund                    </div>
                  ) : (
                    <div className="text-center py-12 bg-blue-900/30 rounded-lg">
                      <Heart className="mx-auto text-blue-400" size={48} />
                      <h3 className="mt-4 text-lg font-medium text-white">Your wishlist is empty</h3>
                      <p className="mt-1 text-blue-400">Save items you love to your wishlist.</p>
                      <Link
                        to="/products"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md text-sm font-medium text-white bg-blue-900/40 hover:bg-blue-800/50"
                      >
                        Explore Products
                      </Link>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "payment" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                  <h2 className="text-xl font-bold text-white mb-6">Payment Methods</h2>
                  <div className="text-center py-12 bg-blue-900/30 rounded-lg">
                    <CreditCard className="mx-auto text-blue-400" size={48} />
                    <h3 className="mt-4 text-lg font-medium text-white">No payment methods</h3>
                    <p className="mt-1 text-blue-400">Add a payment method for faster checkout.</p>
                    <button className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md text-sm font-medium text-white bg-blue-900/40 hover:bg-blue-800/50">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        @keyframes star-rotation {
          0% { background-position: 0 0, 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px; }
        }
        @keyframes star-rotation-reverse {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: -250px -250px, -300px -300px, -350px -350px; }
        }
        @keyframes star-glow {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(var(--angle)); opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(500px) translateY(300px) rotate(var(--angle)); opacity: 0; }
        }
        @keyframes pulsate {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.3; }
        }
        .star-cluster-1 {
          background-image: radial-gradient(1px 1px at 25% 25%, white 1%, transparent 2%),
            radial-gradient(2px 2px at 75% 75%, white 1%, transparent 2%),
            radial-gradient(1px 1px at 50% 50%, white 1%, transparent 2%);
          background-size: 100px 100px;
          animation: cluster-float 20s infinite alternate ease-in-out;
        }
        .star-cluster-2 {
          background-image: radial-gradient(1px 1px at 25% 25%, white 1%, transparent 2%),
            radial-gradient(2px 2px at 75% 75%, white 1%, transparent 2%),
            radial-gradient(1px 1px at 50% 50%, white 1%, transparent 2%);
          background-size: 80px 80px;
          animation: cluster-float 25s infinite alternate-reverse ease-in-out;
        }
        @keyframes cluster-float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(20px) rotate(5deg); }
        }
        @keyframes nebula-pulse {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
          100% { opacity: 0.1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default UserProfilePage;