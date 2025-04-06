"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
} from "lucide-react"

export default function ProductDetail(props) {
  const product = props.product

  const [mainImage, setMainImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [expandedSection, setExpandedSection] = useState("description")

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={mainImage || "/placeholder.svg?height=600&width=600"}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`rounded-md overflow-hidden border-2 ${
                  mainImage === image ? "border-indigo-600" : "border-gray-200"
                }`}
              >
                <img
                  src={image || `/placeholder.svg?height=100&width=100`}
                  alt={`${product.title} - view ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
            <span className="mx-2">/</span>
            <Link
              to={`/shop/category/${product.category.toLowerCase().replace(" ", "-")}`}
              className="hover:text-indigo-600"
            >
              {product.category}
            </Link>
          </div>

          {/* Title and Rating */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < product.rating ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-gray-900 mr-3">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through mr-3">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedColor === color.name ? "ring-2 ring-offset-2 ring-indigo-600" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && <span className="text-white">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <Link to="/size-guide" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                Size guide
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 border rounded-md text-center ${
                    selectedSize === size
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 text-gray-700 hover:border-indigo-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center">
              <button onClick={decrementQuantity} className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100">
                <Minus size={16} />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 text-center border-t border-b border-gray-300 py-2"
              />
              <button onClick={incrementQuantity} className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              disabled={!product.inStock}
            >
              <ShoppingCart size={20} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-lg border ${
                isFavorite
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-gray-300 text-gray-700 hover:border-indigo-600"
              }`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="p-3 rounded-lg border border-gray-300 text-gray-700 hover:border-indigo-600">
              <Share2 size={20} />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Truck className="text-indigo-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-600">Free standard shipping on orders over $50</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <RotateCcw className="text-indigo-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium text-gray-900">Easy Returns</h4>
                <p className="text-sm text-gray-600">30-day return policy for unworn items</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="text-indigo-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium text-gray-900">Secure Checkout</h4>
                <p className="text-sm text-gray-600">SSL encrypted payment processing</p>
              </div>
            </div>
          </div>

          {/* Accordion Section */}
          <div className="border rounded-lg divide-y">
            <div className="p-4">
              <button
                onClick={() => toggleSection("description")}
                className="w-full flex items-center justify-between font-medium text-gray-900"
              >
                <span>Description</span>
                {expandedSection === "description" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedSection === "description" && (
                <div className="mt-4 text-gray-700 space-y-3">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
