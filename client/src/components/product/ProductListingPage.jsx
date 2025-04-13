"use client"

import { useState } from "react"
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react'
import ProductCard from "./ProductCard"

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "Spider-Man: Web Slinger Graphic Tee",
    price: 799,
    image: "https://m.media-amazon.com/images/I/B1OGJ8t+8ZS._CLa%7C2140%2C2000%7C91bGKdIRROL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX342_SY445_.png",
    rating: 4.5,
    category: "Marvel",
    subcategory: "Graphic Printed",
    isNew: true,
    discount: 0,
  },
  {
    id: 2,
    name: "Batman: Dark Knight Oversized Tee",
    price: 899,
    image: "https://images.bewakoof.com/original/men-s-navy-blue-the-dark-knight-graphic-printed-oversized-t-shirt-592058-1731661124-1.jpg",
    rating: 5,
    category: "DC",
    subcategory: "Oversized",
    isNew: false,
    discount: 15,
  },
  {
    id: 3,
    name: "Iron Man: Arc Reactor Glow Print",
    price: 999,
    image: "https://tse2.mm.bing.net/th?id=OIP.gMTqgQ-XtU97Z_tcDbLXQwHaHa&pid=Api&P=0&h=180",
    rating: 4,
    category: "MARVEL",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 0,
  },
  {
    id: 4,
    name: "Naruto: Nine-Tails Mode Graphic Tee",
    price: 849,
    image: "https://tse2.mm.bing.net/th?id=OIP.gMTqgQ-XtU97Z_tcDbLXQwHaHa&pid=Api&P=0&h=180",
    rating: 4.5,
    category: "ANIME",
    subcategory: "Graphic Printed",
    isNew: true,
    discount: 10,
  },
  {
    id: 5,
    name: "Superman: Man of Steel Acid Wash",
    price: 1099,
    image: "https://images-na.ssl-images-amazon.com/images/I/91wEQqCFURL.-BZ1000-.superman-classic-logo-s-t-shirt.jpg",
    rating: 3.5,
    category: "DC",
    subcategory: "Acid Wash",
    isNew: false,
    discount: 0,
  },
  {
    id: 6,
    name: "Deadpool: Chimichangas Oversized Tee",
    price: 899,
    image: "https://www.redwolf.in/image/cache/catalog/t-shirts/oversized/deadpool-merc-with-a-mouth-oversized-t-shirt-mock-back-600x800.jpg?m=1728472094",
    rating: 5,
    category: "MARVEL",
    subcategory: "Oversized",
    isNew: true,
    discount: 0,
  },
  {
    id: 7,
    name: "One Punch Man: Saitama Graphic Tee",
    price: 799,
    image: "https://cdn.media.amplience.net/s/hottopic/20107884_hi?$productMainDesktop$",
    rating: 4,
    category: "ANIME",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 20,
  },
  {
    id: 8,
    name: "Wonder Woman: Amazonian Warrior Tee",
    price: 849,
    image: "https://mmv2api.s3.us-east-2.amazonaws.com/products/thumbs/2-image-tswwprdamaz-3-productimagenowatermark.jpg",
    rating: 4.5,
    category: "DC",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 0,
  },
  {
    id: 9,
    name: "Thor: Mjolnir Graphic Tee",
    price: 849,
    image: "https://cdn03.ciceksepeti.com/cicek/kcm76329998-1/L/thor-mjolnir-dijital-resimli-baski-hammer-siyah-tshirt-kcm76329998-1-192292648dd2491eb176dd0d3e5cf933.jpg",
    rating: 4.5,
    category: "Marvel",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 0,
  },
  {
    id: 10,
    name: "Demon Slayer: Tanjiro Graphic Tee",
    price: 899,
    image: "https://tse3.mm.bing.net/th?id=OIP.iosKPeA_9nl04nrXi8vnpgHaIJ&pid=Api&P=0&h=180",
    rating: 4.5,
    category: "Anime" ,
    subcategory: "Graphic Printed",
    isNew: true,
    discount: 0,
  },
  {
    id: 11,
    name: "Flash: Speedster Oversized Tee",
    price: 849,
    image: "https://tse4.mm.bing.net/th?id=OIP.ILcmxECqd5j2epD98MSOIAHaJ4&pid=Api&P=0&h=180",
    rating: 4,
    category: "DC ",
    subcategory: "Oversized",
    isNew: false,
    discount: 10,
  },
  {
    id: 12,
    name: "Black Panther: Wakanda Forever Tee",
    price: 899,
    image: "https://mmv2api.s3.us-east-2.amazonaws.com/products/images/2-image-tsbpmtchalla-1-productimagenowatermark.jpg",
    rating: 5,
    category: "Marvel",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 0,
  },
]

const ProductListingPage = () => {
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    priceRange: [0, 2000],
    onSale: false,
    newArrivals: false,
  })
  const [sortBy, setSortBy] = useState("featured")
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    subcategories: true,
    price: true,
  })
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter categories
  const categories = ["Marvel", "DC", "Anime", "Custom"]
  const subcategories = [
    "Graphic Printed",
    "Oversized",
    "Acid Wash",
    "Solid Color",
    "Sleeveless",
    "Long Sleeve",
    "Hooded",
  ]

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      const currentFilters = [...prev[filterType]]
      const index = currentFilters.indexOf(value)

      if (index === -1) {
        currentFilters.push(value)
      } else {
        currentFilters.splice(index, 1)
      }

      return {
        ...prev,
        [filterType]: currentFilters,
      }
    })
  }

  const toggleExpandFilter = (filterType) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      subcategories: [],
      priceRange: [0, 2000],
      onSale: false,
      newArrivals: false,
    })
  }

  // Apply filters to products
  const filteredProducts = sampleProducts.filter((product) => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Subcategory filter
    if (filters.subcategories.length > 0 && !filters.subcategories.includes(product.subcategory)) {
      return false
    }

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    // On sale filter
    if (filters.onSale && product.discount === 0) {
      return false
    }

    // New arrivals filter
    if (filters.newArrivals && !product.isNew) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.isNew ? -1 : a.isNew ? 1 : 0
      default: // featured
        return 0
    }
  })

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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center" style={{textShadow: "0 0 10px rgba(100, 200, 255, 0.7)"}}>
            Comic T-Shirts Collection
          </h1>
          <p className="text-blue-300 text-center">{sortedProducts.length} products found</p>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full bg-black/40 backdrop-blur-md border border-blue-900/50 hover:bg-blue-900/30 text-blue-300 font-medium py-2 px-4 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(0,191,255,0.3)]"
          >
            <Filter size={18} className="mr-2" />
            Filter & Sort
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-blue-300" style={{textShadow: "0 0 5px rgba(0, 191, 255, 0.7)"}}>Filters</h2>
                  <button onClick={clearFilters} className="text-sm text-blue-400 hover:text-blue-300">
                    Clear all
                  </button>
                </div>

                {/* Categories Filter */}
                <div className="mb-6 border-b border-blue-900/30 pb-6">
                  <button
                    onClick={() => toggleExpandFilter("categories")}
                    className="flex items-center justify-between w-full text-left font-medium text-blue-300 mb-3"
                  >
                    <span>Categories</span>
                    {expandedFilters.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {expandedFilters.categories && (
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center">
                          <input
                            id={`category-${cat}`}
                            type="checkbox"
                            checked={filters.categories.includes(cat)}
                            onChange={() => toggleFilter("categories", cat)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                          />
                          <label htmlFor={`category-${cat}`} className="ml-2 text-sm text-blue-300">
                            {cat}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subcategories Filter */}
                <div className="mb-6 border-b border-blue-900/30 pb-6">
                  <button
                    onClick={() => toggleExpandFilter("subcategories")}
                    className="flex items-center justify-between w-full text-left font-medium text-blue-300 mb-3"
                  >
                    <span>T-Shirt Types</span>
                    {expandedFilters.subcategories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {expandedFilters.subcategories && (
                    <div className="space-y-2">
                      {subcategories.map((subcat) => (
                        <div key={subcat} className="flex items-center">
                          <input
                            id={`subcat-${subcat}`}
                            type="checkbox"
                            checked={filters.subcategories.includes(subcat)}
                            onChange={() => toggleFilter("subcategories", subcat)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                          />
                          <label htmlFor={`subcat-${subcat}`} className="ml-2 text-sm text-blue-300">
                            {subcat}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="mb-6 border-b border-blue-900/30 pb-6">
                  <button
                    onClick={() => toggleExpandFilter("price")}
                    className="flex items-center justify-between w-full text-left font-medium text-blue-300 mb-3"
                  >
                    <span>Price Range</span>
                    {expandedFilters.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {expandedFilters.price && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-300">₹{filters.priceRange[0]}</span>
                        <span className="text-sm text-blue-300">₹{filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="100"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], Number.parseInt(e.target.value)],
                          }))
                        }
                        className="w-full h-2 bg-blue-900/30 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Filters */}
                <div>
                  <h3 className="font-medium text-blue-300 mb-3">Additional Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="filter-sale"
                        type="checkbox"
                        checked={filters.onSale}
                        onChange={() => setFilters((prev) => ({ ...prev, onSale: !prev.onSale }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                      />
                      <label htmlFor="filter-sale" className="ml-2 text-sm text-blue-300">
                        On Sale
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-new"
                        type="checkbox"
                        checked={filters.newArrivals}
                        onChange={() => setFilters((prev) => ({ ...prev, newArrivals: !prev.newArrivals }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                      />
                      <label htmlFor="filter-new" className="ml-2 text-sm text-blue-300">
                        New Arrivals
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div
                className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                onClick={() => setIsMobileFilterOpen(false)}
              ></div>
              <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-blue-950 shadow-xl overflow-y-scroll">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900/30">
                      <h2 className="text-lg font-medium text-blue-300" style={{textShadow: "0 0 5px rgba(0, 191, 255, 0.7)"}}>Filters</h2>
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="p-4">
                      {/* Sort By */}
                      <div className="mb-6 border-b border-blue-900/30 pb-6">
                        <h3 className="font-medium text-blue-300 mb-3">Sort By</h3>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="block w-full py-2 px-3 border border-blue-900/50 bg-black/30 text-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                        >
                          <option value="featured">Featured</option>
                          <option value="price-low-high">Price: Low to High</option>
                          <option value="price-high-low">Price: High to Low</option>
                          <option value="rating">Highest Rated</option>
                          <option value="newest">Newest First</option>
                        </select>
                      </div>

                      {/* Categories Filter */}
                      <div className="mb-6 border-b border-blue-900/30 pb-6">
                        <h3 className="font-medium text-blue-300 mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((cat) => (
                            <div key={cat} className="flex items-center">
                              <input
                                id={`mobile-category-${cat}`}
                                type="checkbox"
                                checked={filters.categories.includes(cat)}
                                onChange={() => toggleFilter("categories", cat)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                              />
                              <label htmlFor={`mobile-category-${cat}`} className="ml-2 text-sm text-blue-300">
                                {cat}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Subcategories Filter */}
                      <div className="mb-6 border-b border-blue-900/30 pb-6">
                        <h3 className="font-medium text-blue-300 mb-3">T-Shirt Types</h3>
                        <div className="space-y-2">
                          {subcategories.map((subcat) => (
                            <div key={subcat} className="flex items-center">
                              <input
                                id={`mobile-subcat-${subcat}`}
                                type="checkbox"
                                checked={filters.subcategories.includes(subcat)}
                                onChange={() => toggleFilter("subcategories", subcat)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                              />
                              <label htmlFor={`mobile-subcat-${subcat}`} className="ml-2 text-sm text-blue-300">
                                {subcat}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Filters */}
                      <div className="mb-6 border-b border-blue-900/30 pb-6">
                        <h3 className="font-medium text-blue-300 mb-3">Additional Filters</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              id="mobile-filter-sale"
                              type="checkbox"
                              checked={filters.onSale}
                              onChange={() => setFilters((prev) => ({ ...prev, onSale: !prev.onSale }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                            />
                            <label htmlFor="mobile-filter-sale" className="ml-2 text-sm text-blue-300">
                              On Sale
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="mobile-filter-new"
                              type="checkbox"
                              checked={filters.newArrivals}
                              onChange={() => setFilters((prev) => ({ ...prev, newArrivals: !prev.newArrivals }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                            />
                            <label htmlFor="mobile-filter-new" className="ml-2 text-sm text-blue-300">
                              New Arrivals
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={clearFilters}
                          className="flex-1 py-2 px-4 border border-blue-900/50 rounded-md text-sm font-medium text-blue-300 hover:bg-blue-900/20 backdrop-blur-sm"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={() => setIsMobileFilterOpen(false)}
                          className="flex-1 bg-blue-900/30 py-2 px-4 border border-blue-900/50 rounded-md text-sm font-medium text-blue-300 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)]"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort and Results Count - Desktop */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-sm text-blue-300">
                Showing <span className="font-medium">{sortedProducts.length}</span> results
              </p>
              <div className="flex items-center">
                <span className="text-sm text-blue-300 mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-1 px-2 border border-blue-900/50 bg-black/30 text-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm backdrop-blur-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 ||
              filters.subcategories.length > 0 ||
              filters.onSale ||
              filters.newArrivals) && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-blue-300 mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((cat) => (
                    <button
                      key={`filter-${cat}`}
                      onClick={() => toggleFilter("categories", cat)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-300 border border-blue-900/50 backdrop-blur-sm"
                    >
                      {cat} <X size={14} className="ml-1" />
                    </button>
                  ))}
                  {filters.subcategories.map((subcat) => (
                    <button
                      key={`filter-${subcat}`}
                      onClick={() => toggleFilter("subcategories", subcat)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-300 border border-blue-900/50 backdrop-blur-sm"
                    >
                      {subcat} <X size={14} className="ml-1" />
                    </button>
                  ))}
                  {filters.onSale && (
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, onSale: false }))}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-300 border border-blue-900/50 backdrop-blur-sm"
                    >
                      On Sale <X size={14} className="ml-1" />
                    </button>
                  )}
                  {filters.newArrivals && (
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, newArrivals: false }))}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-300 border border-blue-900/50 backdrop-blur-sm"
                    >
                      New Arrivals <X size={14} className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-black/40 backdrop-blur-md rounded-lg border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                <h3 className="text-lg font-medium text-blue-300 mb-2">No products found</h3>
                <p className="text-blue-300/70 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-blue-900/50 rounded-md shadow-sm text-sm font-medium text-blue-300 bg-blue-900/30 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)]"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <button className="px-2 py-1 border border-blue-900/50 rounded-l-md text-sm font-medium text-blue-300 hover:bg-blue-900/30 backdrop-blur-sm">
                    Previous
                  </button>
                  <button className="px-3 py-1 border-t border-b border-blue-900/50 text-sm font-medium text-blue-300 bg-blue-900/50">
                    1
                  </button>
                  <button className="px-3 py-1 border-t border-b border-blue-900/50 text-sm font-medium text-blue-300 hover:bg-blue-900/30 backdrop-blur-sm">
                    2
                  </button>
                  <button className="px-3 py-1 border-t border-b border-blue-900/50 text-sm font-medium text-blue-300 hover:bg-blue-900/30 backdrop-blur-sm">
                    3
                  </button>
                  <button className="px-2 py-1 border border-blue-900/50 rounded-r-md text-sm font-medium text-blue-300 hover:bg-blue-900/30 backdrop-blur-sm">
                    Next
                  </button>
                </nav>
              </div>
            )}
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

export default ProductListingPage
