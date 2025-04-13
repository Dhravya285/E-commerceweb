"use client"
import { ArrowRight, Star } from "lucide-react"
import { Link } from "react-router-dom";


// Sample featured products
const featuredProducts = [
  {
    id: 1,
    name: "Wonder Woman: Amazonian Warrior Tee",
    price: 849,
    image: "https://realinfinitywar.com/wp-content/uploads/2018/08/wonderwoman-casual-t-shirt-1.jpg",
    rating: 4.5,
    category: "DC",
    isNew: true,
  },
  {
    id: 2,
    name: "Black Widow: Avenger Crop Top",
    price: 799,
    image: "https://static.qns.digital/img/p/2/4/9/0/4/4/2/2490442.jpg",
    rating: 4.0,
    category: "Marvel",
    isNew: false,
  },
  {
    id: 3,
    name: "Captain Marvel: Higher Further Faster Tee",
    price: 899,
    image: "https://i5.walmartimages.com/seo/Captain-Marvel-Tshirt-Shirt-Tee_4b68b4f9-0b82-4017-b3a9-91c97602c237.e6c090abb6a933a6c562e176ba7731e8.jpeg",
    rating: 4.5,
    category: "Marvel",
    isNew: true,
  },
  {
    id: 4,
    name: "Sailor Moon: Cosmic Power Graphic Tee",
    price: 949,
    image: "https://i5.walmartimages.com/asr/7cb0237a-538b-4d83-9dea-35432ee10cb1_1.3fd4e72403f6b82ef62f7739ff36fa96.jpeg",
    rating: 5.0,
    category: "Anime",
    isNew: false,
  },
]

// Sample categories
const categories = [
  {
    name: "Graphic Tees",
    image: "https://i5.walmartimages.com/asr/7cb0237a-538b-4d83-9dea-35432ee10cb1_1.3fd4e72403f6b82ef62f7739ff36fa96.jpeg",
    count: 38,
  },
  {
    name: "Crop Tops",
    image: "https://img.ltwebstatic.com/images/pi/201711/e8/15115155444351802642.jpg",
    count: 24,
  },
  {
    name: "Hoodies",
    image: "https://i5.walmartimages.com/seo/Hat-and-Beyond-Women-s-Ultra-Soft-Fleece-Hoodie-Customizable-Oversized-Pullover-Hoodie-With-Half-Moon-Patch-For-Custom-Branding_f0e356ec-3da8-45e2-b3ba-4d2bb720d286.aaf8f235753f53b6f0fd56f6943ed925.jpeg",
    count: 19,
  },
  {
    name: "Accessories",
    image: "https://nilsonline.lk/image/catalog/nils/accessories/accessories.jpg",
    count: 27,
  },
]

const WomenPage = () => {
  // Generate glowing stars dynamically
  const renderGlowingStars = () => {
    const stars = []
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1
      const top = Math.random() * 100
      const left = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 3 + 2
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
        />,
      )
    }
    return stars
  }

  // Generate shooting stars
  const renderShootingStars = () => {
    const shootingStars = []
    for (let i = 0; i < 5; i++) {
      const width = Math.random() * 100 + 50
      const top = Math.random() * 100
      const left = Math.random() * 50
      const delay = Math.random() * 15
      const duration = Math.random() * 2 + 1
      const angle = Math.random() * 60 - 30

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
        />,
      )
    }
    return shootingStars
  }

  // Generate pulsating stars
  const renderPulsatingStars = () => {
    const stars = []
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1
      const top = Math.random() * 100
      const left = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 3 + 3

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
        />,
      )
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
      {/* Container for stars */}
      <div id="starry-bg" className="absolute inset-0 overflow-hidden">
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
            animation: "star-rotation 500s linear infinite",
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
            animation: "star-rotation-reverse 600s linear infinite",
          }}
        />

        {/* Deep space nebula effects */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)",
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <img
            src="https://nilsonline.lk/image/catalog/nils/accessories/accessories.jpg"
            alt="Women's Collection"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
            >
              Women's Collection
            </h1>
            <p className="text-blue-300 text-lg md:text-xl max-w-md mb-6">
              Embrace your inner heroine with our exclusive range of superhero-inspired women's apparel.
            </p>
            <Link
              to="/products?category=women"
              className="inline-flex items-center bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-3 px-6 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all duration-300 w-fit"
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-transform duration-300 hover:scale-105"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3
                      className="text-xl font-bold text-white mb-2"
                      style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-blue-300 mb-4">{category.count} Products</p>
                    <Link
                      to={`/products?category=women&type=${category.name}`}
                      className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-2 px-4 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_10px_rgba(0,191,255,0.3)] transition-all duration-300"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}>
              Featured Products
            </h2>
            <Link to="/products?category=women" className="text-blue-300 hover:text-blue-200 flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-black/40 backdrop-blur-md border border-blue-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Badges */}
                    {product.isNew && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-blue-500/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-blue-300 font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                            }
                            fillOpacity={i < Math.floor(product.rating) ? 1 : 0}
                          />
                        ))}
                      </div>
                      <span className="text-blue-300 text-xs ml-1">{product.rating}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 font-bold">₹{product.price}</span>
                      <Link to={`/product/${product.id}`} className="text-blue-400 text-sm hover:text-blue-300">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <img
            src="https://i.etsystatic.com/33362627/c/862/685/114/55/il/51c3e4/4112352526/il_340x270.4112352526_a01b.jpg"
            alt="Special Offer"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
            >
              Superhero Summer Collection
            </h2>
            <p className="text-blue-300 text-lg max-w-md mb-6">
              New arrivals featuring your favorite heroines. Get 20% off with code HERO20.
            </p>
            <Link
              to="/products?collection=summer"
              className="inline-flex items-center bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-3 px-6 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all duration-300 w-fit"
            >
              Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
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
      `}</style>
    </div>
  )
}

export default WomenPage
