"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, CreditCard, Truck, Shield, Check } from "lucide-react"
import Navbar from "../layout/Navbar"
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
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
              <ChevronLeft size={18} className="mr-1" />
              Back to Cart
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                {/* Checkout Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step > 1 ? <Check size={16} /> : 1}
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${step >= 1 ? "text-indigo-600" : "text-gray-500"}`}>Shipping</p>
                      </div>
                    </div>
                    <div className="w-16 h-1 bg-gray-200">
                      <div className={`h-full ${step > 1 ? "bg-indigo-600" : "bg-gray-200"}`}></div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step > 2 ? <Check size={16} /> : 2}
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${step >= 2 ? "text-indigo-600" : "text-gray-500"}`}>Payment</p>
                      </div>
                    </div>
                    <div className="w-16 h-1 bg-gray-200">
                      <div className={`h-full ${step > 2 ? "bg-indigo-600" : "bg-gray-200"}`}></div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 3 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        3
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${step >= 3 ? "text-indigo-600" : "text-gray-500"}`}>Review</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Shipping Method</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="shipping-standard"
                            name="shippingMethod"
                            type="radio"
                            checked={shippingMethod === "standard"}
                            onChange={() => setShippingMethod("standard")}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="shipping-standard" className="ml-3 flex flex-col">
                            <span className="text-sm font-medium text-gray-900">Standard Shipping</span>
                            <span className="text-sm text-gray-500">
                              {subtotal > 499 ? "Free" : "₹49"} - Delivery in 4-6 business days
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="shipping-express"
                            name="shippingMethod"
                            type="radio"
                            checked={shippingMethod === "express"}
                            onChange={() => setShippingMethod("express")}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="shipping-express" className="ml-3 flex flex-col">
                            <span className="text-sm font-medium text-gray-900">Express Shipping</span>
                            <span className="text-sm text-gray-500">₹99 - Delivery in 1-2 business days</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                    <div className="mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="payment-card"
                            name="paymentMethod"
                            type="radio"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="payment-card" className="ml-3 flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-2">Credit/Debit Card</span>
                            <div className="flex space-x-1">
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                              <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            </div>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="payment-upi"
                            name="paymentMethod"
                            type="radio"
                            checked={paymentMethod === "upi"}
                            onChange={() => setPaymentMethod("upi")}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="payment-upi" className="ml-3">
                            <span className="text-sm font-medium text-gray-900">UPI</span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="payment-cod"
                            name="paymentMethod"
                            type="radio"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="payment-cod" className="ml-3">
                            <span className="text-sm font-medium text-gray-900">Cash on Delivery</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="mb-4">
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-600 mb-4">
                          You will be redirected to complete the payment using your UPI app after reviewing your order.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-600">
                          Pay with cash upon delivery. Please ensure someone is available to receive the package and
                          make the payment.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Review Order */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {paymentMethod === "card" && <p>Credit/Debit Card ending in {formData.cardNumber.slice(-4)}</p>}
                        {paymentMethod === "upi" && <p>UPI Payment</p>}
                        {paymentMethod === "cod" && <p>Cash on Delivery</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Items</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center py-2 border-b border-gray-200 last:border-0">
                            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
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
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Back to Payment
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 border sticky top-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-gray-900 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="text-gray-900 font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-indigo-600">₹{total.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <Truck className="text-indigo-600 mt-0.5 flex-shrink-0 mr-3" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Shipping</h4>
                      <p className="text-xs text-gray-500">
                        {shippingMethod === "express"
                          ? "Express Shipping (1-2 business days)"
                          : "Standard Shipping (4-6 business days)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="text-indigo-600 mt-0.5 flex-shrink-0 mr-3" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Payment</h4>
                      <p className="text-xs text-gray-500">
                        {paymentMethod === "card" && "Credit/Debit Card"}
                        {paymentMethod === "upi" && "UPI Payment"}
                        {paymentMethod === "cod" && "Cash on Delivery"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="text-indigo-600 mt-0.5 flex-shrink-0 mr-3" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Secure Checkout</h4>
                      <p className="text-xs text-gray-500">Your payment information is processed securely</p>
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

