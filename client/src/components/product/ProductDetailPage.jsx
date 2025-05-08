import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
} from "lucide-react";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";
import RelatedProducts from "./RelatedProducts";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedSection, setExpandedSection] = useState("description");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/products/${id}`);
        const productData = response.data;
        const formattedProduct = {
          ...productData,
          id: productData._id,
          name: productData.name || "Unnamed Product",
          price: productData.price || 0,
          originalPrice: productData.originalPrice || null,
          description: productData.description || "",
          longDescription: productData.longDescription || "",
          images: productData.images?.length > 0 ? productData.images : ["/placeholder.svg"],
          category: productData.category || "Unknown",
          subcategory: productData.subcategory || "",
          rating: productData.rating || 0,
          reviewCount: productData.reviewCount || 0,
          inStock: productData.inStock ?? true,
          sizes: productData.sizes?.length > 0 ? productData.sizes : [],
          colors: productData.colors?.length > 0 ? productData.colors : [],
          features: productData.features?.length > 0 ? productData.features : [],
        };
        setProduct(formattedProduct);
        setMainImage(formattedProduct.images[0]);
        setSelectedSize(formattedProduct.sizes[0] || "");
        setSelectedColor(formattedProduct.colors[0]?.name || "");

        // Check if product is in wishlist
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        console.log("Wishlist on load:", wishlist);
        console.log("Checking if product ID", formattedProduct.id, "is in wishlist");
        setIsFavorite(wishlist.some((item) => item.id === formattedProduct.id));
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load product details");
        toast.error(error.response?.data?.message || "Failed to load product details");
      }
    };
    fetchProduct();
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleSection = (section) =>
    setExpandedSection(expandedSection === section ? null : section);

  const handleAddToWishlist = () => {
    if (!product) {
      console.error("No product data available");
      toast.error("Cannot add to wishlist: Product not loaded");
      return;
    }

    console.log("Handling wishlist for product ID:", product.id);
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    console.log("Current wishlist:", wishlist);

    if (isFavorite) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsFavorite(false);
      toast.success("Removed from wishlist");
      console.log("Removed product", product.id, "from wishlist. New wishlist:", updatedWishlist);
    } else {
      // Add to wishlist
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      };
      const updatedWishlist = [...wishlist, wishlistItem];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsFavorite(true);
      toast.success("Added to wishlist");
      console.log("Added product", product.id, "to wishlist. New wishlist:", updatedWishlist);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    toast.success(`Added ${quantity} ${product.name} to cart`);
    // Implement cart logic here (e.g., update context or local storage)
  };

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
            boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, 0.8)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return stars;
  };

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
            animation: `shoot ${duration}s ${delay}s linear infinite`,
          }}
        />
      );
    }
    return shootingStars;
  };

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
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return stars;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link to="/shop" className="text-blue-300 hover:text-blue-400">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
        <p className="text-blue-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
      <div id="starry-bg" className="absolute inset-0 overflow-hidden">
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
        <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
        <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>
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

      <Navbar />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`relative rounded-md overflow-hidden border-2 ${
                    mainImage === img ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }
                    />
                  ))}
                </div>
                <span className="text-blue-300 text-sm ml-2">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-green-400">{discount}% OFF</span>
                  </>
                )}
              </div>
              <p className="text-blue-300 mt-1">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Select Size</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-black/40 text-blue-300 border-blue-900/50"
                    } hover:bg-blue-600 hover:text-white transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Select Color
              </h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-black/40 border border-blue-900/50 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="p-2 hover:bg-blue-900/50"
                >
                  <Minus size={20} className="text-blue-300" />
                </button>
                <span className="px-4 text-white">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 hover:bg-blue-900/50"
                >
                  <Plus size={20} className="text-blue-300" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center"
                disabled={!product.inStock}
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`p-3 rounded-md ${
                  isFavorite ? "bg-red-500/50" : "bg-black/40"
                } border border-blue-900/50 hover:bg-red-500/70`}
              >
                <Heart
                  size={20}
                  className={isFavorite ? "text-red-400 fill-current" : "text-blue-300"}
                />
              </button>
            </div>

            <div className="flex space-x-4 text-blue-300">
              <button className="flex items-center">
                <Share2 size={20} className="mr-2" />
                Share
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-blue-300">
              <div className="flex flex-col items-center">
                <Truck size={24} />
                <span className="mt-1 text-center">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw size={24} />
                <span className="mt-1 text-center">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield size={24} />
                <span className="mt-1 text-center">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Details */}
        <div className="mt-12">
          <div className="border-b border-blue-900/50">
            <button
              onClick={() => toggleSection("description")}
              className="flex justify-between w-full py-4 text-white font-semibold"
            >
              Description
              {expandedSection === "description" ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSection === "description" && (
              <div
                className="text-blue-300 py-4"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            )}
          </div>
          <div className="border-b border-blue-900/50">
            <button
              onClick={() => toggleSection("features")}
              className="flex justify-between w-full py-4 text-white font-semibold"
            >
              Features
              {expandedSection === "features" ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSection === "features" && (
              <ul className="text-blue-300 py-4 list-disc pl-5">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Related Products
          </h2>
          <RelatedProducts
            category={product.category}
            currentProductId={product.id}
          />
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes star-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes star-rotation-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
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
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
            box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.2);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
            box-shadow: 0 0 10px 4px rgba(100, 200, 255, 0.7);
          }
        }
        .glowing-star {
          position: absolute;
          border-radius: 50%;
          background-color: white;
          animation: glow 4s infinite ease-in-out alternate;
        }
        @keyframes glow {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
            box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.4);
          }
          100% {
            transform: scale(1.2);
            opacity: 1;
            box-shadow: 0 0 15px 5px rgba(100, 200, 255, 0.8);
          }
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
      `}</style>
    </div>
  );
};

export default ProductDetailPage;