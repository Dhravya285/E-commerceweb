import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to add to wishlist");
        return;
      }
      await axios.post(
        "http://localhost:5002/api/wishlist",
        { productId: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist");
    } catch (error) {
      console.error("Wishlist Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add to wishlist");
    }
  };

  console.log("ProductCard Product:", product); // Debug: Log product data

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-blue-900/50 shadow-[0_0_10px_rgba(0,191,255,0.3)]">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-blue-300">{product.title}</h3>
          <p className="text-blue-400 font-bold">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-blue-500 line-through">₹{product.originalPrice}</p>
          )}
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.56 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-blue-300">({product.reviewCount})</span>
          </div>
        </Link>
        <button
          onClick={handleAddToWishlist}
          className="mt-4 p-2 rounded-full border border-blue-900/50 text-blue-300 hover:bg-blue-900/30"
        >
          <Heart size={20} fill={product.isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;