"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ChevronRight } from "lucide-react"
// import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Spider-Man: Web Slinger Graphic Tee",
    price: 799,
    image: "/placeholder.svg?height=100&width=100",
    size: "L",
    color: "Red",
    quantity: 1,
  },
  {
    id: 2,
    name: "Batman: Dark Knight Oversized Tee",
    price: 899,
    image: "/placeholder.svg?height=100&width=100",
    size: "M",
    color: "Black",
    quantity: 2,
  },
  {
    id: 6,
    name: "Deadpool: Chimichangas Oversized Tee",
    price: 899,
    image: "/placeholder.svg?height=100&width=100",
    size: "XL",
    color: "Red",
    quantity: 1,
  },
]

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState("")

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.trim() === "") {
      setCouponError("Please enter a coupon code")
      return
    }

    // Simulate coupon validation
    if (couponCode.toUpperCase() === "HERO10") {
      setCouponApplied(true)
      setCouponError("")
    } else {
      setCouponError("Invalid coupon code")
      setCouponApplied(false)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0 // 10% discount
  const shipping = subtotal > 499 ? 0 : 49
  const total = subtotal - discount + shipping

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ShoppingBag className="mr-2" size={24} />
            Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="sm:ml-6 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                <Link to={`/product/${item.id}`} className="hover:text-indigo-600">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Size: {item.size} | Color: {item.color}
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-900">₹{item.price}</p>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 text-gray-600 hover:text-gray-800"
                              >
                                <Minus size={14} />
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                className="w-12 text-center border-x border-gray-300 py-1 text-gray-900"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 text-gray-600 hover:text-gray-800"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-base font-medium text-gray-900">
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
                  <Link to="/products" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
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
                    Continue Shopping
                  </Link>

                  <button onClick={() => setCartItems([])} className="text-red-600 hover:text-red-800 font-medium">
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 border">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value)
                          setCouponError("")
                        }}
                        disabled={couponApplied}
                        placeholder="Enter code"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={applyCoupon}
                        disabled={couponApplied}
                        className={`px-4 py-2 rounded-r-md font-medium ${
                          couponApplied ? "bg-green-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                      >
                        {couponApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {couponError && <p className="text-sm text-red-600 mt-1">{couponError}</p>}
                    {couponApplied && <p className="text-sm text-green-600 mt-1">Coupon applied: 10% discount</p>}
                    {!couponApplied && !couponError && (
                      <p className="text-xs text-gray-500 mt-1">Try "HERO10" for 10% off your order</p>
                    )}
                  </div>

                  {/* Price Details */}
                  <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="text-green-600 font-medium">-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">
                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-indigo-600">₹{total.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    to="/checkout"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <CreditCard size={20} />
                    Proceed to Checkout
                  </Link>

                  {/* Payment Methods */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">We accept</p>
                    <div className="flex justify-center space-x-2">
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="text-indigo-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link
                to="/products"
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Shopping
                <ChevronRight className="ml-2" size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CartPage

