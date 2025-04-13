import MainLayout from "../../components/layout/MainLayout"
import HeroSection from "./HeroSection"
import FeaturedCategories from "./FeaturedCategories"
import FeaturedProducts from "./FeaturedProducts"
import Newsletter from "./NewsLetter"
import TestimonialSection from "./TestimonialSection"
import Header from "../../components/layout/Header"

export default function HomePage() {
  return (
      <MainLayout>
      <HeroSection />
      <FeaturedCategories />
      
      <TestimonialSection />
      <Newsletter />
      </MainLayout>
      
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react"
// import ProductCard from "../../components/product/ProductCard"
// import Header from "../../components/layout/Header"

// // Sample product data
// const products = [
//   {
//     id: "1",
//     title: "Spider-Man: Web Slinger Graphic Tee",
//     price: 29.99,
//     originalPrice: 39.99,
//     image: "/api/placeholder/400/500",
//     category: "Marvel Universe",
//     rating: 4.5,
//     isNew: true,
//   },
//   {
//     id: "2",
//     title: "Batman: Dark Knight Oversized Tee",
//     price: 34.99,
//     image: "/api/placeholder/400/500",
//     category: "DC Comics",
//     rating: 5,
//     isBestseller: true,
//   },
//   {
//     id: "3",
//     title: "One Punch Man Graphic Tee",
//     price: 27.99,
//     originalPrice: 32.99,
//     image: "/api/placeholder/400/500",
//     category: "Anime Superheroes",
//     rating: 4,
//     isNew: true,
//   },
//   {
//     id: "4",
//     title: "Superman Classic Logo Tee",
//     price: 24.99,
//     image: "/api/placeholder/400/500",
//     category: "Classic Comics",
//     rating: 4.5,
//   },
//   {
//     id: "5",
//     title: "Iron Man: Arc Reactor Glow Tee",
//     price: 39.99,
//     originalPrice: 49.99,
//     image: "/api/placeholder/400/500",
//     category: "Marvel Universe",
//     rating: 5,
//     isBestseller: true,
//   },
//   {
//     id: "6",
//     title: "Wonder Woman: Amazonian Warrior Tee",
//     price: 29.99,
//     image: "/api/placeholder/400/500",
//     category: "DC Comics",
//     rating: 4.5,
//   },
//   {
//     id: "7",
//     title: "Naruto: Nine-Tails Mode Tee",
//     price: 32.99,
//     image: "/api/placeholder/400/500",
//     category: "Anime Superheroes",
//     rating: 4.5,
//   },
//   {
//     id: "8",
//     title: "The Hulk: Smash Oversized Tee",
//     price: 34.99,
//     originalPrice: 39.99,
//     image: "/api/placeholder/400/500",
//     category: "Marvel Universe",
//     rating: 4,
//     isNew: true,
//   },
// ]

// const tabs = ["All", "Marvel Universe", "DC Comics", "Anime Superheroes", "Classic Comics"]

// // Hero carousel slides
// const heroSlides = [
//   {
//     id: 1,
//     title: "Marvel Collection",
//     description: "Discover premium Marvel character tees with exceptional quality and designs",
//     buttonText: "Shop Marvel",
//     image: "/api/placeholder/800/400",
//     bgColor: "from-blue-900 to-indigo-900",
//   },
//   {
//     id: 2,
//     title: "DC Exclusives",
//     description: "Limited edition DC hero t-shirts with premium comfort and style",
//     buttonText: "Shop DC",
//     image: "/api/placeholder/800/400",
//     bgColor: "from-indigo-900 to-purple-900",
//   },
//   {
//     id: 3,
//     title: "Anime Favorites",
//     description: "Express your anime passion with our premium character apparel",
//     buttonText: "Shop Anime",
//     image: "/api/placeholder/800/400",
//     bgColor: "from-purple-900 to-indigo-900",
//   },
// ]

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState("All")
//   const [currentSlide, setCurrentSlide] = useState(0)
  
//   // Filter products based on active tab
//   const filteredProducts = activeTab === "All" 
//     ? products 
//     : products.filter((product) => product.category === activeTab)
  
//   // Auto-rotate carousel
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
//     }, 5000)
    
//     return () => clearInterval(interval)
//   }, [])
  
//   // Carousel navigation
//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//   }
  
//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
//   }
  
//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
//   }

//   // Star animation effect for hero section
//   useEffect(() => {
//     // Function to create subtle stars in hero section
//     const createSubtleStars = () => {
//       const heroSection = document.getElementById('hero-section')
//       if (!heroSection) return
      
//       // Clear existing stars
//       const existingStars = heroSection.querySelectorAll('.subtle-star')
//       existingStars.forEach(star => star.remove())
      
//       // Create new stars
//       for (let i = 0; i < 50; i++) {
//         const star = document.createElement('div')
//         star.classList.add('subtle-star')
        
//         const size = Math.random() * 2 + 1
//         const posX = Math.random() * 100
//         const posY = Math.random() * 100
//         const duration = Math.random() * 3 + 2
//         const delay = Math.random() * 2
        
//         star.style.width = `${size}px`
//         star.style.height = `${size}px`
//         star.style.left = `${posX}%`
//         star.style.top = `${posY}%`
//         star.style.animationDuration = `${duration}s`
//         star.style.animationDelay = `${delay}s`
        
//         heroSection.appendChild(star)
//       }
//     }
    
//     createSubtleStars()
//     window.addEventListener('resize', createSubtleStars)
    
//     return () => {
//       window.removeEventListener('resize', createSubtleStars)
//     }
//   }, [])

//   return (
    
//     <div className="min-h-screen bg-gradient-to-b from-black to-indigo-950">
//       <Header/>
//       {/* Hero Section with Carousel */}
//       <section id="hero-section" className="relative overflow-hidden">
//         {/* Subtle stars animation will be injected here */}
        
//         {/* Carousel */}
//         <div className="relative h-[500px] md:h-[600px]">
//           {heroSlides.map((slide, index) => (
//             <div 
//               key={slide.id}
//               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center
//                 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//             >
//               <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`}></div>
              
//               {/* Star field overlay */}
//               <div 
//                 className="absolute inset-0 opacity-30"
//                 style={{
//                   backgroundImage: `
//                     radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
//                     radial-gradient(1.5px 1.5px at 50% 50%, white 1%, transparent 1%),
//                     radial-gradient(1px 1px at 75% 75%, white 1%, transparent 1%)
//                   `,
//                   backgroundSize: "150px 150px, 100px 100px, 200px 200px"
//                 }}
//               ></div>
              
//               <div className="container mx-auto px-4 z-20 flex flex-col md:flex-row items-center">
//                 <div className="md:w-1/2 mb-8 md:mb-0 text-white space-y-6">
//                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                     {slide.title}
//                   </h1>
//                   <p className="text-lg md:text-xl text-indigo-100 max-w-lg">
//                     {slide.description}
//                   </p>
//                   <div>
//                     <Link 
//                       to="/shop"
//                       className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-lg hover:shadow-indigo-500/50"
//                     >
//                       {slide.buttonText}
//                       <ShoppingBag className="ml-2" size={18} />
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="md:w-1/2 flex justify-center">
//                   <img 
//                     src={slide.image} 
//                     alt={slide.title} 
//                     className="rounded-lg shadow-xl max-w-full object-cover h-[250px] md:h-[350px] transform hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {/* Navigation arrows */}
//           <button 
//             onClick={goToPrevSlide}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button 
//             onClick={goToNextSlide}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
//           >
//             <ChevronRight size={24} />
//           </button>
          
//           {/* Carousel indicators */}
//           <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
//             {heroSlides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   index === currentSlide 
//                     ? 'bg-white w-8' 
//                     : 'bg-white/50 hover:bg-white/80'
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Featured Categories */}
//       <section className="py-16 bg-black/40 backdrop-blur-sm">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
//               Shop by Universe
//               <span className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-500"></span>
//             </h2>
//             <p className="text-indigo-200 max-w-2xl mx-auto">
//               Explore our exclusive collections from your favorite comic and anime universes
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {['Marvel Universe', 'DC Comics', 'Anime Superheroes', 'Classic Comics'].map((category) => (
//               <Link 
//                 key={category} 
//                 to={`/category/${category.toLowerCase().replace(' ', '-')}`}
//                 className="relative overflow-hidden group rounded-lg shadow-lg h-60"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 to-black/90 group-hover:from-indigo-700/80 transition-all duration-300"></div>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
//                   <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
//                   <span className="inline-block w-12 h-1 bg-indigo-500 mb-4 transform group-hover:w-24 transition-all duration-300"></span>
//                   <p className="text-indigo-200">Discover premium designs</p>
//                 </div>
//                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/50 transition-all duration-300 rounded-lg"></div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
//               Featured Products
//               <span className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-500"></span>
//             </h2>
//             <p className="text-indigo-200 max-w-2xl mx-auto">
//               Check out our most popular superhero t-shirts featuring iconic characters from your favorite universes
//             </p>
//           </div>

//           {/* Category tabs */}
//           <div className="flex flex-wrap justify-center mb-8 gap-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
//                   activeTab === tab 
//                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
//                     : "bg-indigo-900/40 text-white hover:bg-indigo-800/60"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Products grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
          
//           <div className="mt-12 text-center">
//             <Link 
//               to="/shop" 
//               className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-lg"
//             >
//               View All Products
//               <ChevronRight className="ml-1" size={18} />
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* Features Section */}
//       <section className="py-16 bg-black/40 backdrop-blur-sm">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Premium Quality",
//                 description: "Our t-shirts are made with 100% combed cotton for maximum comfort and durability",
//                 icon: "✨"
//               },
//               {
//                 title: "Free Shipping",
//                 description: "Enjoy free shipping on all orders over $50 with fast and reliable delivery",
//                 icon: "🚚"
//               },
//               {
//                 title: "Easy Returns",
//                 description: "Not satisfied? Return within 30 days for a full refund, no questions asked",
//                 icon: "↩️"
//               }
//             ].map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="bg-indigo-900/30 backdrop-blur-sm p-6 rounded-lg border border-indigo-500/30 hover:border-indigo-500/60 transition-all hover:shadow-lg hover:shadow-indigo-500/20"
//               >
//                 <div className="text-4xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
//                 <p className="text-indigo-200">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Newsletter */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-8 md:p-12 shadow-xl relative overflow-hidden">
//             {/* Star effect overlay */}
//             <div 
//               className="absolute inset-0 opacity-20"
//               style={{
//                 backgroundImage: `
//                   radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
//                   radial-gradient(1.5px 1.5px at 50% 50%, white 1%, transparent 1%),
//                   radial-gradient(1px 1px at 75% 75%, white 1%, transparent 1%)
//                 `,
//                 backgroundSize: "150px 150px, 100px 100px, 200px 200px"
//               }}
//             ></div>
            
//             <div className="text-center max-w-2xl mx-auto relative z-10">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Universe</h2>
//               <p className="text-indigo-200 mb-8">
//                 Subscribe to our newsletter for exclusive discounts, new arrivals, and superhero news
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black/30 border border-indigo-500/50 text-white placeholder-indigo-300 min-w-[250px]"
//                 />
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-lg whitespace-nowrap">
//                   Subscribe Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* CSS for subtle stars in hero section */}
//       <style jsx>{`
//         .subtle-star {
//           position: absolute;
//           background-color: white;
//           border-radius: 50%;
//           opacity: 0.4;
//           animation: twinkleSubtle infinite alternate ease-in-out;
//         }
        
//         @keyframes twinkleSubtle {
//           0% { opacity: 0.2; }
//           100% { opacity: 0.6; }
//         }
//       `}</style>
//     </div>
//   )
// }

