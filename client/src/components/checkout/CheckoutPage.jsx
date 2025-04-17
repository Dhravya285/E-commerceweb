"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, CreditCard, Truck, Shield, Check, Star, Moon } from "lucide-react"
import Navbar from "../layout/Header"
import Footer from "../layout/Footer"

// Sample cart data
const cartItems = [
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

const CheckoutPage = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Payment Information
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process order
      console.log("Order submitted:", formData)
      // Redirect to confirmation page
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 0 // No discount in this example
  const shipping = shippingMethod === "express" ? 99 : subtotal > 499 ? 0 : 49
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal - discount + shipping + tax

  return (
    <>
      <Navbar />
      <div className="bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center text-purple-400 hover:text-purple-300">
              <ChevronLeft size={18} className="mr-1" />
              Back to Cart
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800 rounded-lg shadow-lg border border-purple-500/30 p-6 mb-6 backdrop-blur-sm relative overflow-hidden">
                {/* Starry accents */}
                <div className="absolute top-2 left-2">
                  <Star size={12} className="text-yellow-300 opacity-70" />
                </div>
                <div className="absolute top-6 right-12">
                  <Star size={10} className="text-yellow-300 opacity-50" />
                </div>
                <div className="absolute bottom-8 left-16">
                  <Star size={14} className="text-yellow-300 opacity-60" />
                </div>
                <div className="absolute bottom-16 right-6">
                  <Star size={8} className="text-yellow-300 opacity-40" />
                </div>
                
                {/* Checkout Steps */}
                <div className="mb-8 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 1 ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {step > 1 ? <Check size={16} /> : 1}
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${step >= 1 ? "text-purple-400" : "text-slate-400"}`}>Shipping</p>
                      </div>
                    </div>
                    <div className="w-16 h-1 bg-slate-700">
                      <div className={`h-full ${step > 1 ? "bg-purple-500" : "bg-slate-700"}`}></div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 2 ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {step > 2 ? <Check size={16} /> : 2}
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${step >= 2 ? "text-purple-400" : "text-slate-400"}`}>Payment</p>
                      </div>
                    </div>
                    <div className="w-16 h-1 bg-slate-700">
                      <div className={`h-full ${step > 2 ? "bg-purple-500" : "bg-slate-700"}`}></div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 3 ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        3
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${step >= 3 ? "text-purple-400" : "text-slate-400"}`}>Review</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <form onSubmit={handleSubmit} className="relative z-10">
                    <h2 className="text-xl font-bold mb-4 text-purple-300">Shipping Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-purple-200 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-purple-200 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-purple-200 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-purple-200 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-purple-200 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-purple-200 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-purple-200 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3 text-purple-300">Shipping Method</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 rounded-lg bg-slate-700/50 border border-purple-500/30">
                          <input
                            id="shipping-standard"
                            name="shippingMethod"
                            type="radio"
                            checked={shippingMethod === "standard"}
                            onChange={() => setShippingMethod("standard")}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-500"
                          />
                          <label htmlFor="shipping-standard" className="ml-3 flex flex-col">
                            <span className="text-sm font-medium text-purple-200">Standard Shipping</span>
                            <span className="text-sm text-slate-400">
                              {subtotal > 499 ? "Free" : "₹49"} - Delivery in 4-6 business days
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center p-3 rounded-lg bg-slate-700/50 border border-purple-500/30">
                          <input
                            id="shipping-express"
                            name="shippingMethod"
                            type="radio"
                            checked={shippingMethod === "express"}
                            onChange={() => setShippingMethod("express")}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-500"
                          />
                          <label htmlFor="shipping-express" className="ml-3 flex flex-col">
                            <span className="text-sm font-medium text-purple-200">Express Shipping</span>
                            <span className="text-sm text-slate-400">₹99 - Delivery in 1-2 business days</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg shadow-purple-500/30 flex items-center"
                      >
                        Continue to Payment
                        <Star size={14} className="ml-2 text-yellow-300" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <form onSubmit={handleSubmit} className="relative z-10">
                    <h2 className="text-xl font-bold mb-4 text-purple-300">Payment Method</h2>

                    <div className="mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center p-3 rounded-lg bg-slate-700/50 border border-purple-500/30">
                          <input
                            id="payment-card"
                            name="paymentMethod"
                            type="radio"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-500"
                          />
                          <label htmlFor="payment-card" className="ml-3 flex items-center">
                            <span className="text-sm font-medium text-purple-200 mr-2">Credit/Debit Card</span>
                            <div className="flex space-x-1">
                              <div className="w-8 h-5 bg-slate-600 rounded"></div>
                              <div className="w-8 h-5 bg-slate-600 rounded"></div>
                              <div className="w-8 h-5 bg-slate-600 rounded"></div>
                            </div>
                          </label>
                        </div>
                        <div className="flex items-center p-3 rounded-lg bg-slate-700/50 border border-purple-500/30">
                          <input
                            id="payment-upi"
                            name="paymentMethod"
                            type="radio"
                            checked={paymentMethod === "upi"}
                            onChange={() => setPaymentMethod("upi")}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-500"
                          />
                          <label htmlFor="payment-upi" className="ml-3">
                            <span className="text-sm font-medium text-purple-200">UPI</span>
                          </label>
                        </div>
                        <div className="flex items-center p-3 rounded-lg bg-slate-700/50 border border-purple-500/30">
                          <input
                            id="payment-cod"
                            name="paymentMethod"
                            type="radio"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-500"
                          />
                          <label htmlFor="payment-cod" className="ml-3">
                            <span className="text-sm font-medium text-purple-200">Cash on Delivery</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="bg-slate-700/70 p-4 rounded-lg mb-6 border border-purple-500/30">
                        <div className="mb-4">
                          <label htmlFor="cardName" className="block text-sm font-medium text-purple-200 mb-1">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-slate-800 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-purple-200 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full px-3 py-2 bg-slate-800 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-purple-200 mb-1">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              required
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 bg-slate-800 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-purple-200 mb-1">
                              CVV *
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              required
                              placeholder="XXX"
                              className="w-full px-3 py-2 bg-slate-800 border border-purple-500/50 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="bg-slate-700/70 p-4 rounded-lg mb-6 border border-purple-500/30">
                        <p className="text-sm text-slate-300 mb-4">
                          You will be redirected to complete the payment using your UPI app after reviewing your order.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="bg-slate-700/70 p-4 rounded-lg mb-6 border border-purple-500/30">
                        <p className="text-sm text-slate-300">
                          Pay with cash upon delivery. Please ensure someone is available to receive the package and
                          make the payment.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-purple-400 hover:text-purple-300 font-medium flex items-center"
                      >
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg shadow-purple-500/30 flex items-center"
                      >
                        Review Order
                        <Star size={14} className="ml-2 text-yellow-300" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Review Order */}
                {step === 3 && (
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-4 text-purple-300">Review Your Order</h2>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3 text-purple-300">Shipping Information</h3>
                      <div className="bg-slate-700/70 p-4 rounded-lg border border-purple-500/30">
                        <p className="font-medium text-purple-200">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-slate-300">{formData.address}</p>
                        <p className="text-slate-300">
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p className="text-slate-300">{formData.email}</p>
                        <p className="text-slate-300">{formData.phone}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3 text-purple-300">Payment Method</h3>
                      <div className="bg-slate-700/70 p-4 rounded-lg border border-purple-500/30">
                        {paymentMethod === "card" && <p className="text-slate-300">Credit/Debit Card ending in {formData.cardNumber.slice(-4)}</p>}
                        {paymentMethod === "upi" && <p className="text-slate-300">UPI Payment</p>}
                        {paymentMethod === "cod" && <p className="text-slate-300">Cash on Delivery</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3 text-purple-300">Items</h3>
                      <div className="bg-slate-700/70 p-4 rounded-lg border border-purple-500/30">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center py-2 border-b border-slate-600 last:border-0">
                            <div className="w-16 h-16 flex-shrink-0 bg-slate-600 rounded-md overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-sm font-medium text-purple-200">{item.name}</h4>
                              <p className="text-sm text-slate-400">
                                Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-sm font-medium text-purple-300">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-purple-400 hover:text-purple-300 font-medium flex items-center"
                      >
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Payment
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg shadow-purple-500/30 flex items-center"
                      >
                        Place Order
                        <Star size={14} className="ml-2 text-yellow-300" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-lg p-6 border border-purple-500/30 sticky top-4 backdrop-blur-sm shadow-lg relative overflow-hidden">
                {/* Starry accents */}
                <div className="absolute top-4 right-4">
                  <Star size={12} className="text-yellow-300 opacity-70" />
                </div>
                <div className="absolute bottom-8 right-12">
                  <Star size={10} className="text-yellow-300 opacity-50" />
                </div>
                <div className="absolute bottom-12 left-8">
                  <Moon size={14} className="text-purple-300 opacity-30" />
                </div>
                
                <h2 className="text-lg font-bold text-purple-300 mb-4 relative z-10">Order Summary</h2>

                <div className="space-y-3 border-b border-slate-600 pb-4 mb-4 relative z-10">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-300">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-purple-200 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-b border-slate-600 pb-4 mb-4 relative z-10">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Subtotal</span>
                    <span className="text-purple-200 font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Discount</span>
                      <span className="text-emerald-400 font-medium">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Shipping</span>
                    <span className="text-purple-200 font-medium">
                      {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Tax (18% GST)</span>
                    <span className="text-purple-200 font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 relative z-10">
                  <span className="text-lg font-bold text-purple-300">Total</span>
                  <span className="text-lg font-bold text-purple-400">₹{total.toFixed(2)}</span>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start bg-slate-700/40 p-3 rounded-lg border border-purple-500/20">
                    <Truck className="text-purple-400 mt-0.5 flex-shrink-0 mr-3" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-purple-200">Shipping</h4>
                      <p className="text-xs text-slate-400">
                        {shippingMethod === "express"
                          ? "Express Shipping (1-2 business days)"
                          : "Standard Shipping (4-6 business days)"}
                      </p></div>
                  </div>
                  <div className="flex items-start bg-slate-700/40 p-3 rounded-lg border border-purple-500/20">
                    <CreditCard className="text-purple-400 mt-0.5 flex-shrink-0 mr-3" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-purple-200">Payment</h4>
                      <p className="text-xs text-slate-400">
                        {paymentMethod === "card" && "Credit/Debit Card"}
                        {paymentMethod === "upi" && "UPI Payment"}
                        {paymentMethod === "cod" && "Cash on Delivery"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-slate-700/40 p-3 rounded-lg border border-purple-500/20">
                    <Shield className="text-purple-400 mt-0.5 flex-shrink-0 mr-3" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-purple-200">Secure Checkout</h4>
                      <p className="text-xs text-slate-400">Your payment information is processed securely</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CheckoutPage