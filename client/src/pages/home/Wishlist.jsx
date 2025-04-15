// WishlistPage.jsx
import { useState } from "react"
import { Heart, Trash2, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const sampleWishlist = [
  {
    id: 1,
    name: "Spider-Man Graphic Tee",
    price: 799,
    image: "https://m.media-amazon.com/images/I/B1OGJ8t+8ZS.png",
  },
  {
    id: 2,
    name: "Captain America Shield Hoodie",
    price: 1299,
    image: "https://tse3.mm.bing.net/th?id=OIP.5FJYl8WWplUKQthYl-KKxgHaHa&pid=Api&P=0&h=180",
  },
]

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(sampleWishlist)

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
      {/* Background nebula glow */}
      <div className="absolute inset-0 bg-stars z-0" />

      {/* Page Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}>
            Your Wishlist
          </h1>
          <Link
            to="/products"
            className="text-blue-400 hover:text-blue-300 transition-all flex items-center"
          >
            <ArrowLeft className="mr-1" size={16} />
            Continue Shopping
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <p className="text-blue-300 text-center">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-black/40 border border-blue-900/50 backdrop-blur-md rounded-xl p-4 flex items-center space-x-4 shadow-[0_0_15px_rgba(0,191,255,0.3)]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-white font-semibold text-lg">{item.name}</h2>
                  <p className="text-blue-300 text-sm">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-blue-400 hover:text-blue-300 underline text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional glowing decoration */}
      <div className="absolute top-1/3 left-1/3 w-1/2 h-1/2 rounded-full opacity-20 z-0"
        style={{
          background: "radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "nebula-pulse 8s infinite alternate ease-in-out"
        }}
      />

      <style jsx="true">{`
        .bg-stars {
          background-image:
            radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
            radial-gradient(2px 2px at 75% 75%, rgba(255, 255, 255, 0.8) 1%, transparent 1%),
            radial-gradient(1.5px 1.5px at 50% 50%, rgba(255, 255, 255, 0.9) 1%, transparent 1%),
            radial-gradient(1px 1px at 30% 70%, rgba(200, 200, 255, 0.7) 1%, transparent 1%);
          background-size: 200px 200px, 150px 150px, 100px 100px, 250px 250px;
          animation: star-bg-move 400s linear infinite;
        }

        @keyframes star-bg-move {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes nebula-pulse {
          0% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
          100% { opacity: 0.15; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default WishlistPage
