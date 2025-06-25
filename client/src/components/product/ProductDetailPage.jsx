

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Heart, ShoppingCart, Star, ChevronLeft, ChevronRight,
  Minus, Plus, Share2, Truck, RotateCcw, Shield,
  ChevronUp, ChevronDown
} from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProductWishlistAndReviews = async () => {
      if (!id || id === "undefined" || !/^[0-9a-fA-F]{24}$/.test(id)) {
        setError("Invalid product ID");
        toast.error("Invalid product ID");
        navigate("/products");
        return;
      }

      try {
        // Fetch product
        const productResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`);
        console.log("Fetched Product Data:", productResponse.data);
        const productData = productResponse.data;
        const formattedProduct = {
          ...productData,
          id: productData._id,
          name: productData.name || "Unnamed Product",
          price: productData.price || 0,
          originalPrice: productData.originalPrice || null,
          description: productData.description || "",
          longDescription: productData.longDescription || "",
          images: productData.images?.length > 0 ? productData.images.map(img => img.url) : ["/placeholder.svg"],
          category: productData.category || "Unknown",
          subcategory: productData.subcategory || "",
          gender: productData.gender || "Unisex",
          rating: productData.rating || 0,
          reviewCount: productData.reviewCount || 0,
          inStock: productData.inStock ?? true,
          sizes: productData.sizes?.length > 0 ? productData.sizes : [],
          colors: productData.colors?.length > 0 ? productData.colors : [],
          features: productData.features?.length > 0 ? productData.features : [],
        };
        console.log("Formatted Product:", formattedProduct);
        setProduct(formattedProduct);
        setMainImage(formattedProduct.images[0] || "/placeholder.svg");
        setSelectedSize(formattedProduct.sizes[0] || "");
        setSelectedColor(formattedProduct.colors[0]?.name || "");

        // Fetch reviews
        const reviewsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/reviews/product/${id}`);
        console.log("Fetched Reviews Data:", reviewsResponse.data);
        setReviews(reviewsResponse.data.reviews || []);

        // Fetch wishlist
        const token = localStorage.getItem("token");
        let userId = null;
        if (token) {
          try {
            const payload = token.split(".")[1];
            if (!payload) throw new Error("Invalid token: Missing payload");
            const decoded = JSON.parse(atob(payload));
            console.log("Fetch Product Token Payload:", decoded);
            userId = decoded.id || decoded._id || decoded.sub;
            console.log("Fetch Product userId:", userId || "undefined");
            if (!userId) {
              console.warn("No userId found in token payload");
            }
          } catch (e) {
            console.error("Token decode error:", e.message);
          }
        }

        if (userId && token) {
          const wishlistResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Wishlist API Response:", {
            status: wishlistResponse.status,
            headers: wishlistResponse.headers,
            data: wishlistResponse.data,
          });
          const wishlistData = Array.isArray(wishlistResponse.data)
            ? wishlistResponse.data
            : Array.isArray(wishlistResponse.data.wishlist)
            ? wishlistResponse.data.wishlist
            : [];
          console.log("Wishlist Data:", wishlistData);
          const wishlistItem = wishlistData.find((item) => item.productId?._id === formattedProduct.id);
          setIsFavorite(!!wishlistItem);
          setWishlistItemId(wishlistItem?._id || null);
        } else {
          const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
          setIsFavorite(localWishlist.some((item) => item.id === formattedProduct.id));
        }
      } catch (error) {
        console.error("Error fetching product, wishlist, or reviews:", {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          } : null,
        });
        setError(error.response?.data?.message || "Failed to load product details");
        toast.error(error.response?.data?.message || "Failed to load product details");
        navigate("/products");
      }
    };
    fetchProductWishlistAndReviews();
  }, [id, navigate]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddToWishlist = async () => {
    if (!product) {
      toast.error("Cannot add to wishlist: Product not loaded");
      return;
    }

    const token = localStorage.getItem("token");
    let userId = null;
    if (token) {
      try {
        const payload = token.split(".")[1];
        if (!payload) throw new Error("Invalid token: Missing payload");
        const decoded = JSON.parse(atob(payload));
        console.log("Add to Wishlist Token Payload:", decoded);
        userId = decoded.id || decoded._id || decoded.sub;
        console.log("Add to Wishlist userId:", userId || "undefined");
        if (!userId) {
          console.warn("No userId found in token payload");
        }
      } catch (e) {
        console.error("Token decode error:", e.message);
      }
    }

    try {
      if (userId && token) {
        if (isFavorite) {
          await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${wishlistItemId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsFavorite(false);
          setWishlistItemId(null);
          toast.success("Removed from wishlist");
          window.dispatchEvent(new Event("wishlistUpdated"));
        } else {
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/wishlist`,
            { productId: product.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("POST Wishlist Response:", response.data);
          setIsFavorite(true);
          setWishlistItemId(response.data._id);
          toast.success("Added to wishlist");
          window.dispatchEvent(new Event("wishlistUpdated"));
        }
      } else {
        let localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        if (isFavorite) {
          localWishlist = localWishlist.filter((item) => item.id !== product.id);
          localStorage.setItem("wishlist", JSON.stringify(localWishlist));
          setIsFavorite(false);
          toast.success("Removed from wishlist");
        } else {
          const wishlistItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            category: product.category,
          };
          localWishlist.push(wishlistItem);
          localStorage.setItem("wishlist", JSON.stringify(localWishlist));
          setIsFavorite(true);
          toast.success("Added to wishlist");
        }
      }
    } catch (error) {
      console.error("Wishlist error:", {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        } : null,
      });
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };

 const handleAddToCart = async () => {
  if (!product?.inStock) {
    toast.error('Product is out of stock');
    return;
  }
  if (!selectedSize) {
    toast.error('Please select a size');
    return;
  }

  try {
    let userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    console.log('Add to Cart - userId:', userId || 'undefined');
    console.log('Add to Cart - token:', token ? token.substring(0, 10) + '...' : 'missing');

    // Fallback: Decode userId from token
    if (!userId && token) {
      try {
        const payload = token.split('.')[1];
        if (!payload) throw new Error('Invalid token: Missing payload');
        const decoded = JSON.parse(atob(payload));
        console.log('Add to Cart - Token Payload:', decoded);
        userId = decoded._id || decoded.id || decoded.sub;
        console.log('Add to Cart - Decoded userId:', userId || 'undefined');
        if (userId) {
          localStorage.setItem('userId', userId);
        } else {
          throw new Error('No userId in token payload');
        }
      } catch (e) {
        console.error('Token decode error:', e.message);
        toast.error('Invalid session. Please log in again.');
        navigate('/login');
        return;
      }
    }

    if (!userId || !token) {
      toast.error('Please log in to add to cart');
      navigate('/login');
      return;
    }

    const cartItem = {
      userId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.png',
      size: selectedSize,
      color: selectedColor || 'Default',
      quantity,
    };

    console.log('Add to Cart - Sending request:', { cartItem, headers: { Authorization: `Bearer ${token}` } });
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/cart/add`, // Updated endpoint
      cartItem,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Add to Cart - Response:', response.data);
    toast.success(`${product.name} added to cart!`);
  } catch (error) {
    console.error('Cart error:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
      } : null,
    });
    toast.error(error.response?.data?.message || 'Failed to add to cart');
  }
};
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment) {
      toast.error("Please provide a rating and comment");
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/reviews`,
        {
          productId: id,
          rating: newReview.rating,
          comment: newReview.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Review Submission Response:", response.data);
      setReviews([...reviews, response.data.review]);
      setNewReview({ rating: 0, comment: "" });
      setProduct({
        ...product,
        rating: response.data.newProductRating,
        reviewCount: product.reviewCount + 1,
      });
      toast.success("Review submitted successfully");
    } catch (error) {
      console.error("Error submitting review:", {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
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
    console.log("Rendering Error State:", error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <p className="text-blue-400 mb-4">{error}</p>
          <Link to="/products" className="text-blue-300 hover:text-blue-400">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    console.log("Rendering Loading State");
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
        <p className="text-blue-300">Loading...</p>
      </div>
    );
  }

  console.log("Rendering Product Details for:", product.name);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 relative overflow-hidden">
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

      <Header />
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
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-green-400">{discount}% OFF</span>
                  </>
                )}
              </div>
              <p className="text-blue-300 mt ajudar-1">
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
                    } hover:bg-blue-600 hover:text-white transition-all duration-300`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Select Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name ? "border-blue-500" : "border-transparent"
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
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center justify-center transition-all duration-300"
                disabled={!product.inStock}
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`p-3 rounded-md ${
                  isFavorite ? "bg-red-500/50" : "bg-black/20"
                } border border-blue-900/50 hover:bg-red-500/70 transition-all duration-300`}
              >
                <Heart
                  size={24}
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

          {/* Reviews Section */}
          <div className="mt-12">
            <div className="border-b border-blue-900/50">
              <button
                onClick={() => toggleSection("reviews")}
                className="flex justify-between w-full py-4 text-white font-semibold"
              >
                Reviews ({product.reviewCount})
                {expandedSection === "reviews" ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {expandedSection === "reviews" && (
                <div className="py-4">
                  {reviews.length === 0 ? (
                    <p className="text-blue-300">No reviews yet. Be the first to review!</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review._id} className="border-t border-blue-900/50 pt-4">
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-400"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-blue-300 text-sm ml-2">
                              {review.userId?.username || "Anonymous"}
                            </span>
                          </div>
                          <p className="text-blue-300">{review.comment}</p>
                          <p className="text-gray-400 text-sm mt-1">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Review Form */}
                  <form onSubmit={handleReviewSubmit} className="mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Write a Review</h3>
                    <div className="mb-4">
                      <label className="text-blue-300 mb-2 block">Rating</label>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleRatingChange(i + 1)}
                            className="focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={
                                i < newReview.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-400"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment" className="text-blue-300 mb-2 block">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview({ ...newReview, comment: e.target.value })
                        }
                        className="w-full bg-black/40 border border-blue-900/50 text-blue-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
                        rows="4"
                        placeholder="Share your thoughts about the product..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
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