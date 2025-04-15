"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { User, Package, Heart, CreditCard, LogOut, Edit, Camera, MapPin, Mail, Phone } from "lucide-react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"

// Sample user data
const userData = {
  id: 1,
  name: "Peter Parker",
  email: "peter.parker@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://tse2.mm.bing.net/th?id=OIP.wimm5qxWNiF6qsr1GIImYgHaHa&pid=Api&P=0&h=180",
  addresses: [
    {
      id: 1,
      type: "Home",
      address: "20 Ingram Street, Queens",
      city: "New York",
      state: "NY",
      zipCode: "11375",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "Daily Bugle, 39th Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: false,
    },
  ],
}

// Sample orders data
const ordersData = [
  {
    id: "ORD123456",
    date: "2023-10-15",
    status: "Delivered",
    total: 1698,
    items: [
      {
        id: 1,
        name: "Spider-Man: Web Slinger Graphic Tee",
        price: 799,
        image: "/placeholder.svg?height=100&width=100",
        quantity: 1,
      },
      {
        id: 2,
        name: "Batman: Dark Knight Oversized Tee",
        price: 899,
        image: "/placeholder.svg?height=100&width=100",
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD123457",
    date: "2023-09-28",
    status: "Processing",
    total: 899,
    items: [
      {
        id: 6,
        name: "Deadpool: Chimichangas Oversized Tee",
        price: 899,
        image: "/placeholder.svg?height=100&width=100",
        quantity: 1,
      },
    ],
  },
]

// Sample wishlist data
const wishlistData = [
  {
    id: 3,
    name: "Iron Man: Arc Reactor Glow Print",
    price: 999,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 8,
    name: "Wonder Woman: Amazonian Warrior Tee",
    price: 849,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 10,
    name: "Demon Slayer: Tanjiro Graphic Tee",
    price: 899,
    image: "/placeholder.svg?height=100&width=100",
    inStock: false,
  },
]

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Save profile data
    console.log("Updated profile:", profileData)
    setIsEditingProfile(false)
  }

  // Generate glowing stars dynamically
  const renderGlowingStars = () => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      stars.push(
        <div 
          key={i}
          className="glowing-star" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            boxShadow: `0 0 ${size * 2}px ${size/2}px rgba(255, 255, 255, 0.8)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  // Generate shooting stars
  const renderShootingStars = () => {
    const shootingStars = [];
    for (let i = 0; i < 5; i++) {
      const width = Math.random() * 100 + 50;
      const top = Math.random() * 100;
      const left = Math.random() * 50;
      const delay = Math.random() * 15;
      const duration = Math.random() * 2 + 1;
      const angle = Math.random() * 60 - 30;
      
      shootingStars.push(
        <div 
          key={i}
          className="shooting-star" 
          style={{
            width: `${width}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${angle}deg)`,
            animation: `shoot ${duration}s ${delay}s linear infinite`
          }}
        />
      );
    }
    return shootingStars;
  };

  // Generate pulsating stars
  const renderPulsatingStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 3;
      
      stars.push(
        <div 
          key={i}
          className="pulsating-star" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            boxShadow: `0 0 ${size * 3}px ${size}px rgba(100, 200, 255, 0.8)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
        {/* Container for stars */}
        <div id="starry-profile-bg" className="absolute inset-0 overflow-hidden">
          {/* Enhanced star layers */}
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
              animation: "star-rotation 500s linear infinite"
            }}
          />
          
          {/* Secondary rotating star layer */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 10%, white 1%, transparent 1%),
                radial-gradient(1.5px 1.5px at 60% 40%, white 1%, transparent 1%),
                radial-gradient(1px 1px at 30% 80%, white 1%, transparent 1%)
              `,
              backgroundSize: "250px 250px, 300px 300px, 350px 350px",
              animation: "star-rotation-reverse 600s linear infinite"
            }}
          />
          
          {/* Deep space nebula effects */}
          <div className="absolute inset-0 opacity-30" 
            style={{
              background: "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)"
            }}
          />
          
          {/* Animated star clusters */}
          <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
          <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>
          
          {/* New enhanced glowing stars */}
          {renderGlowingStars()}
          {renderPulsatingStars()}
          {renderShootingStars()}
          
          {/* Additional nebula glow */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "nebula-pulse 8s infinite alternate ease-in-out"
            }}
          />
          
          <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(100, 0, 255, 0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
              animation: "nebula-pulse 12s infinite alternate-reverse ease-in-out"
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-8" 
             style={{textShadow: "0 0 10px rgba(100, 200, 255, 0.7)"}}>
            My Cosmic Profile
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50 transform rotate-1">
                <div className="transform -rotate-1">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-600 shadow-[0_0_15px_rgba(0,191,255,0.5)]">
                        <img
                          src={userData.avatar || "/placeholder.svg"}
                          alt={userData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-[0_0_10px_rgba(0,191,255,0.5)]">
                        <Camera size={16} />
                      </button>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-white" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                      {userData.name}
                    </h2>
                    <p className="text-blue-300 text-sm">{userData.email}</p>
                  </div>

                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "profile" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "orders" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <Package size={18} className="mr-3" />
                      Orders
                    </button>
                    <button
                      onClick={() => setActiveTab("wishlist")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "wishlist" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <Heart size={18} className="mr-3" />
                      Wishlist
                    </button>
                    <button
                      onClick={() => setActiveTab("payment")}
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        activeTab === "payment" 
                          ? "bg-blue-900/50 text-white shadow-[0_0_10px_rgba(0,191,255,0.3)]" 
                          : "text-blue-300 hover:bg-blue-900/30"
                      }`}
                    >
                      <CreditCard size={18} className="mr-3" />
                      Payment Methods
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/30 rounded-md transition-all duration-300">
                      <LogOut size={18} className="mr-3" />
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Comic-style decorative element */}
              <div className="absolute -bottom-6 -left-6 transform -rotate-12 z-20 hidden md:block">
                <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
                  POW!
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                <div>
              
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                        Personal Information
                      </h2>
                      {!isEditingProfile && (
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300"
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </button>
                      )}
                    </div>

                    {isEditingProfile ? (
                      <form onSubmit={handleProfileSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-1" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.5)"}}>
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                              className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg placeholder-blue-300/70 backdrop-blur-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.5)"}}>
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg placeholder-blue-300/70 backdrop-blur-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="phone" className="block text-sm font-medium text-blue-300 mb-1" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.5)"}}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-blue-900/50 bg-black/30 text-white rounded-lg placeholder-blue-300/70 backdrop-blur-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-2 border border-blue-900/50 rounded-md text-blue-300 hover:bg-blue-900/20 transition-all duration-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900/50 text-white rounded-md hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300"
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
                            <p className="text-sm text-blue-300">Phone Number</p>
                            <p className="font-medium text-white">{userData.phone}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                          Addresses
                        </h2>
                        <button className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300">
                          <Edit size={16} className="mr-1" />
                          Manage
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.addresses.map((address) => (
                          <div key={address.id} className="border border-blue-900/50 rounded-lg p-4 bg-black/20 backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <span className="font-medium text-white">{address.type}</span>
                                {address.isDefault && (
                                  <span className="ml-2 bg-blue-900/50 text-blue-200 text-xs px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <button className="text-blue-400 hover:text-blue-300 transition-all duration-300">
                                <Edit size={16} />
                              </button>
                            </div>
                            <div className="flex items-start">
                              <MapPin className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                              <div>
                                <p className="text-blue-200">{address.address}</p>
                                <p className="text-blue-200">
                                  {address.city}, {address.state} {address.zipCode}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                  <h2 className="text-xl font-bold text-white mb-6" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                    My Orders
                  </h2>

                  {ordersData.length > 0 ? (
                    <div className="space-y-6">
                      {ordersData.map((order) => (
                        <div key={order.id} className="border border-blue-900/50 rounded-lg overflow-hidden bg-black/20">
                          <div className="bg-blue-900/30 p-4 flex justify-between items-center backdrop-blur-sm">
                            <div>
                              <p className="font-medium text-white">Order #{order.id}</p>
                              <p className="text-sm text-blue-300">Placed on {order.date}</p>
                            </div>
                            <div className="flex items-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-yellow-900/50 text-yellow-300"
                                }`}
                              >
                                {order.status}
                              </span>
                              <Link
                                to={`/order/${order.id}`}
                                className="ml-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-300"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center">
                                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-blue-900/50">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex-1">
                                    <h3 className="text-sm font-medium text-white">{item.name}</h3>
                                    <p className="text-sm text-blue-300">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium text-white">₹{item.price}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-between items-center border-t border-blue-900/30 pt-4">
                              <p className="text-sm text-blue-300">Total Amount</p>
                              <p className="text-lg font-bold text-white" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.5)"}}>
                                ₹{order.total}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-blue-900/20 rounded-lg backdrop-blur-sm">
                      <Package className="mx-auto text-blue-400" size={48} />
                      <h3 className="mt-4 text-lg font-medium text-white">No orders yet</h3>
                      <p className="mt-1 text-blue-300">When you place an order, it will appear here.</p>
                      <Link
                        to="/products"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md shadow-sm text-sm font-medium text-white bg-blue-900/40 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                  <h2 className="text-xl font-bold text-white mb-6" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                    My Wishlist
                  </h2>

                  {wishlistData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistData.map((item) => (
                        <div key={item.id} className="border border-blue-900/50 rounded-lg p-4 flex bg-black/20 backdrop-blur-sm">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-blue-900/50">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <h3 className="text-sm font-medium text-white">{item.name}</h3>
                              <p className="mt-1 text-sm font-bold text-white">₹{item.price}</p>
                              <p className="mt-1 text-sm text-blue-300">
                                {item.inStock ? "In Stock" : "Out of Stock"}
                              </p>
                            </div>
                            <div className="mt-auto flex justify-between">
                              <button
                                className={`text-sm font-medium ${
                                  item.inStock
                                    ? "text-blue-400 hover:text-blue-300"
                                    : "text-gray-500 cursor-not-allowed"
                                  } transition-all duration-300`}
                                  disabled={!item.inStock}
                                >
                                  Add to Cart
                                </button>
                                <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-300">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-blue-900/20 rounded-lg backdrop-blur-sm">
                        <Heart className="mx-auto text-blue-400" size={48} />
                        <h3 className="mt-4 text-lg font-medium text-white">Your wishlist is empty</h3>
                        <p className="mt-1 text-blue-300">Save items you love to your wishlist.</p>
                        <Link
                          to="/products"
                          className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md shadow-sm text-sm font-medium text-white bg-blue-900/40 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300"
                        >
                          Explore Products
                        </Link>
                      </div>
                    )}
                  </div>
                )}
  
                {/* Payment Methods Tab */}
                {activeTab === "payment" && (
                  <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
                    <h2 className="text-xl font-bold text-white mb-6" style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                      Payment Methods
                    </h2>
                    
                    <div className="text-center py-12 bg-blue-900/20 rounded-lg backdrop-blur-sm">
                      <CreditCard className="mx-auto text-blue-400" size={48} />
                      <h3 className="mt-4 text-lg font-medium text-white">No payment methods</h3>
                      <p className="mt-1 text-blue-300">Add a payment method for faster checkout.</p>
                      <button
                        className="mt-6 inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md shadow-sm text-sm font-medium text-white bg-blue-900/40 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300"
                      >
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Comic-style decorative element */}
        <div className="hidden md:block absolute bottom-20 right-10 transform rotate-12 z-20">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
            ZOOM!
          </div>
        </div>
        
        <Footer />
        
        {/* CSS for animations */}
        <style jsx>{`
          @keyframes star-rotation {
            0% { background-position: 0 0, 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px; }
          }
          
          @keyframes star-rotation-reverse {
            0% { background-position: 0 0, 0 0, 0 0; }
            100% { background-position: -250px -250px, -300px -300px, -350px -350px; }
          }
          
          .glowing-star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0;
            animation: star-glow 3s infinite ease-in-out;
          }
          
          @keyframes star-glow {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
          
          .shooting-star {
            position: absolute;
            height: 2px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
            opacity: 0;
          }
          
          @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(var(--angle)); opacity: 0; }
            10% { opacity: 1; }
            70% { opacity: 1; }
            100% { transform: translateX(500px) translateY(300px) rotate(var(--angle)); opacity: 0; }
          }
          
          .pulsating-star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            animation: pulsate 3s infinite ease-in-out;
          }
          
          @keyframes pulsate {
            0% { transform: scale(0.8); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(0.8); opacity: 0.3; }
          }
          
          .star-cluster-1 {
            top: 15%;
            left: 20%;
            background-image: radial-gradient(1px 1px at 25% 25%, white 1%, transparent 2%),
                              radial-gradient(2px 2px at 75% 75%, white 1%, transparent 2%),
                              radial-gradient(1px 1px at 50% 50%, white 1%, transparent 2%);
            background-size: 100px 100px;
            animation: cluster-float 20s infinite alternate ease-in-out;
          }
          
          .star-cluster-2 {
            bottom: 30%;
            right: 25%;
            background-image: radial-gradient(1px 1px at 25% 25%, white 1%, transparent 2%),
                              radial-gradient(2px 2px at 75% 75%, white 1%, transparent 2%),
                              radial-gradient(1px 1px at 50% 50%, white 1%, transparent 2%);
            background-size: 80px 80px;
            animation: cluster-float 25s infinite alternate-reverse ease-in-out;
          }
          
          @keyframes cluster-float {
            0% { transform: translateY(0) rotate(0); }
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