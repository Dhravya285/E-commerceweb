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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden pb-12">
      {/* Container for stars */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="max-w-6xl w-full mx-auto mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="relative transform rotate-1">
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden border border-blue-500/30 shadow-[0_0_15px_rgba(0,191,255,0.3)] bg-black/40 backdrop-blur-md">
              <img
                src={mainImage || "/placeholder.svg?height=600&width=600"}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Thumbnail Images
            <div className="grid grid-cols-5 gap-2 transform -rotate-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`rounded-md overflow-hidden border-2 transition-all duration-300 ${
                    mainImage === image 
                      ? "border-blue-400 shadow-[0_0_10px_rgba(0,191,255,0.7)]" 
                      : "border-blue-900/30 hover:border-blue-500/50"
                  }`}
                >
                  <img
                    src={image || `/placeholder.svg?height=100&width=100`}
                    alt={`${product.title} - view ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </button>
              ))}
            </div> */}

            {/* Comic-style decorative element */}
            <div className="absolute -top-6 -right-6 transform rotate-12 z-20 hidden md:block">
              <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
                HERO!
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)] transform -rotate-1">
            <div className="transform rotate-1">
              {/* Breadcrumbs */}
              <div className="flex items-center text-sm text-blue-300 mb-4">
                <Link to="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/shop" className="hover:text-blue-400 transition-colors duration-300">Shop</Link>
                <span className="mx-2">/</span>
                <Link
                  to={`/shop/category/${product.category.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {product.category}
                </Link>
              </div>

              {/* Title and Rating */}
              <h1 className="text-3xl font-bold text-white mb-2" 
                 style={{textShadow: "0 0 10px rgba(100, 200, 255, 0.7)"}}>
                {product.title}
              </h1>
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
                <span className="text-blue-300">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-white mr-3" 
                      style={{textShadow: "0 0 5px rgba(100, 200, 255, 0.7)"}}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-blue-300 line-through mr-3">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-green-900/50 text-green-300 text-sm font-medium px-2.5 py-0.5 rounded border border-green-500/30">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-blue-300 mb-3 text-glow-blue">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedColor === color.name 
                          ? "ring-2 ring-offset-2 ring-blue-400 shadow-[0_0_5px_rgba(0,191,255,0.7)]" 
                          : ""
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
                  <h3 className="text-sm font-medium text-blue-300 text-glow-blue">Size</h3>
                  <Link to="/size-guide" className="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline transition-all duration-300">
                    Size guide
                  </Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 border rounded-md text-center transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-blue-700/50 text-white border-blue-500/70 shadow-[0_0_5px_rgba(0,191,255,0.5)]"
                          : "border-blue-900/30 text-blue-300 hover:border-blue-500/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-blue-300 mb-3 text-glow-blue">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity} 
                    className="p-2 border border-blue-900/50 rounded-l-md hover:bg-blue-900/30 text-blue-300 transition-all duration-300"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-t border-b border-blue-900/50 py-2 bg-black/30 text-blue-300"
                  />
                  <button 
                    onClick={incrementQuantity} 
                    className="p-2 border border-blue-900/50 rounded-r-md hover:bg-blue-900/30 text-blue-300 transition-all duration-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  className={`flex-1 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    product.inStock 
                      ? "bg-blue-700/50 hover:bg-blue-600/70 border border-blue-500/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)]" 
                      : "bg-gray-700/50 border border-gray-500/50 cursor-not-allowed"
                  }`}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={20} />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    isFavorite
                      ? "bg-red-900/30 border-red-500/50 text-red-400 shadow-[0_0_5px_rgba(255,100,100,0.5)]"
                      : "border-blue-900/50 text-blue-300 hover:border-blue-500/50"
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button className="p-3 rounded-lg border border-blue-900/50 text-blue-300 hover:border-blue-500/50 transition-all duration-300">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Shipping Info */}
              <div className="bg-blue-950/30 backdrop-blur-sm rounded-lg p-4 mb-6 border border-blue-900/30">
                <div className="flex items-start gap-3 mb-3">
                  <Truck className="text-blue-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-300 text-glow-blue">Free Shipping</h4>
                    <p className="text-sm text-blue-200">Free standard shipping on orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <RotateCcw className="text-blue-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-300 text-glow-blue">Easy Returns</h4>
                    <p className="text-sm text-blue-200">30-day return policy for unworn items</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="text-blue-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-300 text-glow-blue">Secure Checkout</h4>
                    <p className="text-sm text-blue-200">SSL encrypted payment processing</p>
                  </div>
                </div>
              </div>

              {/* Accordion Section */}
              <div className="border border-blue-900/30 rounded-lg divide-y divide-blue-900/30">
                <div className="p-4">
                  <button
                    onClick={() => toggleSection("description")}
                    className="w-full flex items-center justify-between font-medium text-blue-300 text-glow-blue"
                  >
                    <span>Description</span>
                    {expandedSection === "description" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSection === "description" && (
                    <div className="mt-4 text-blue-200 space-y-3">
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
      </div>

      {/* Comic-style decorative element - bottom left */}
      <div className="absolute bottom-6 left-6 transform -rotate-12 z-20 hidden md:block">
        <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
          BOOM!
        </div>
      </div>

      <style jsx>{`
        @keyframes star-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes star-rotation-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .shooting-star {
          position: absolute;
          height: 2px;
          background: linear-gradient(to right, transparent, white, white, transparent);
          border-radius: 50%;
          box-shadow: 0 0 5px 1px rgba(0, 191, 255, 0.6);
          animation: shoot linear forwards;
        }
        
        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0) rotate(inherit);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(400px) translateY(400px) rotate(inherit);
            opacity: 0;
          }
        }
        
        .pulsating-star {
          position: absolute;
          border-radius: 50%;
          background-color: white;
          animation: pulsate 3s infinite ease-in-out;
        }
        
        @keyframes pulsate {
          0%, 100% { opacity: 0.2; transform: scale(1); box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.2); }
          50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px 4px rgba(100, 200, 255, 0.7); }
        }
        
        .glowing-star {
          position: absolute;
          border-radius: 50%;
          background-color: white;
          animation: glow 4s infinite ease-in-out alternate;
        }
        
        @keyframes glow {
          0% { transform: scale(0.8); opacity: 0.6; box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.4); }
          100% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 15px 5px rgba(100, 200, 255, 0.8); }
        }
        
        .star-cluster-1 {
          top: 20%;
          left: 15%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 8px 8px;
          border-radius: 50%;
          animation: cluster-drift 60s infinite linear alternate;
          box-shadow: 0 0 20px 10px rgba(100, 200, 255, 0.2);
        }
        
        .star-cluster-2 {
          bottom: 30%;
          right: 20%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 10px 10px;
          border-radius: 50%;
          animation: cluster-drift 70s infinite linear alternate-reverse;
          box-shadow: 0 0 20px 10px rgba(100, 200, 255, 0.2);
        }
        
        @keyframes cluster-drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 20px) rotate(180deg); }
          100% { transform: translate(-30px, -20px) rotate(360deg); }
        }
        
        @keyframes nebula-pulse {
          0% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
          100% { opacity: 0.15; transform: scale(1); }
        }
        
        .text-glow-blue {
          text-shadow: 0 0 5px rgba(0, 191, 255, 0.7);
        }
      `}</style>
    </div>
  )
}