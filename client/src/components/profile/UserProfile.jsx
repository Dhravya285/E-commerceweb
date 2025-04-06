"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { User, Package, Heart, CreditCard, LogOut, Edit, Camera, MapPin, Mail, Phone } from "lucide-react"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"

// Sample user data
const userData = {
  id: 1,
  name: "Peter Parker",
  email: "peter.parker@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=200&width=200",
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

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-600">
                      <img
                        src={userData.avatar || "/placeholder.svg"}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full">
                      <Camera size={16} />
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "profile" ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <User size={18} className="mr-3" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "orders" ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Package size={18} className="mr-3" />
                    Orders
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "wishlist" ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Heart size={18} className="mr-3" />
                    Wishlist
                  </button>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "payment" ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard size={18} className="mr-3" />
                    Payment Methods
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
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
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="text-indigo-600 mr-3" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{userData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="text-indigo-600 mr-3" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium">{userData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-indigo-600 mr-3" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">{userData.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Addresses</h2>
                      <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                        <Edit size={16} className="mr-1" />
                        Manage
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userData.addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="font-medium">{address.type}</span>
                              {address.isDefault && (
                                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit size={16} />
                            </button>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                            <div>
                              <p className="text-gray-700">{address.address}</p>
                              <p className="text-gray-700">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">My Orders</h2>

                  {ordersData.length > 0 ? (
                    <div className="space-y-6">
                      {ordersData.map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-gray-500">Placed on {order.date}</p>
                            </div>
                            <div className="flex items-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                              <Link
                                to={`/order/${order.id}`}
                                className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center">
                                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-between items-center border-t pt-4">
                              <p className="text-sm text-gray-500">Total Amount</p>
                              <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Package className="mx-auto text-gray-400" size={48} />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                      <p className="mt-1 text-gray-500">When you place an order, it will appear here.</p>
                      <Link
                        to="/products"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>

                  {wishlistData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistData.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm font-bold text-gray-900">₹{item.price}</p>
                              <p className="mt-1 text-sm text-gray-500">{item.inStock ? "In Stock" : "Out of Stock"}</p>
                            </div>
                            <div className="mt-auto flex justify-between">
                              <button
                                className={`text-sm font-medium ${
                                  item.inStock
                                    ? "text-indigo-600 hover:text-indigo-800"
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!item.inStock}
                              >
                                Add to Cart
                              </button>
                              <button className="text-sm font-medium text-red-600 hover:text-red-800">Remove</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Heart className="mx-auto text-gray-400" size={48} />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                      <p className="mt-1 text-gray-500">Save items you love to your wishlist.</p>
                      <Link
                        to="/products"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Explore Products
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === "payment" && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h2>

                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CreditCard className="mx-auto text-gray-400" size={48} />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No payment methods saved</h3>
                    <p className="mt-1 text-gray-500">Add a payment method for faster checkout.</p>
                    <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
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
    </>
  )
}

export default UserProfilePage

