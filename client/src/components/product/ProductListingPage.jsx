"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import ProductCard from "./ProductCard"

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "Spider-Man: Web Slinger Graphic Tee",
    price: 799,
    image: "/placeholder.svg?height=400&width=300",
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
    image: "/placeholder.svg?height=400&width=300",
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
    image: "/placeholder.svg?height=400&width=300",
    rating: 4,
    category: "Marvel",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 0,
  },
  {
    id: 4,
    name: "Naruto: Nine-Tails Mode Graphic Tee",
    price: 849,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    category: "Anime",
    subcategory: "Graphic Printed",
    isNew: true,
    discount: 10,
  },
  {
    id: 5,
    name: "Superman: Man of Steel Acid Wash",
    price: 1099,
    image: "/placeholder.svg?height=400&width=300",
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
    image: "/placeholder.svg?height=400&width=300",
    rating: 5,
    category: "Marvel",
    subcategory: "Oversized",
    isNew: true,
    discount: 0,
  },
  {
    id: 7,
    name: "One Punch Man: Saitama Graphic Tee",
    price: 799,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4,
    category: "Anime",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 20,
  },
  {
    id: 8,
    name: "Wonder Woman: Amazonian Warrior Tee",
    price: 849,
    image: "/placeholder.svg?height=400&width=300",
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
    image: "/placeholder.svg?height=400&width=300",
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
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    category: "Anime",
    subcategory: "Graphic Printed",
    isNew: true,
    discount: 0,
  },
  {
    id: 11,
    name: "Flash: Speedster Oversized Tee",
    price: 849,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4,
    category: "DC",
    subcategory: "Oversized",
    isNew: false,
    discount: 10,
  },
  {
    id: 12,
    name: "Black Panther: Wakanda Forever Tee",
    price: 899,
    image: "/placeholder.svg?height=400&width=300",
    rating: 5,
    category: "Marvel",
    subcategory: "Graphic Printed",
    isNew: false,
    discount: 0,
  },
]

const ProductListingPage = () => {
  const { category } = useParams()
  const [filters, setFilters] = useState({
    categories: category ? [category] : [],
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

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {category ? `${category} T-Shirts` : "All T-Shirts"}
            </h1>
            <p className="text-gray-600">{sortedProducts.length} products found</p>
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <Filter size={18} className="mr-2" />
              Filter & Sort
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    <button onClick={clearFilters} className="text-sm text-indigo-600 hover:text-indigo-800">
                      Clear all
                    </button>
                  </div>

                  {/* Categories Filter */}
                  <div className="mb-6 border-b border-gray-200 pb-6">
                    <button
                      onClick={() => toggleExpandFilter("categories")}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
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
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`category-${cat}`} className="ml-2 text-sm text-gray-700">
                              {cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Subcategories Filter */}
                  <div className="mb-6 border-b border-gray-200 pb-6">
                    <button
                      onClick={() => toggleExpandFilter("subcategories")}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
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
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`subcat-${subcat}`} className="ml-2 text-sm text-gray-700">
                              {subcat}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6 border-b border-gray-200 pb-6">
                    <button
                      onClick={() => toggleExpandFilter("price")}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                    >
                      <span>Price Range</span>
                      {expandedFilters.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {expandedFilters.price && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">₹{filters.priceRange[0]}</span>
                          <span className="text-sm text-gray-600">₹{filters.priceRange[1]}</span>
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
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Additional Filters */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Additional Filters</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="filter-sale"
                          type="checkbox"
                          checked={filters.onSale}
                          onChange={() => setFilters((prev) => ({ ...prev, onSale: !prev.onSale }))}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="filter-sale" className="ml-2 text-sm text-gray-700">
                          On Sale
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="filter-new"
                          type="checkbox"
                          checked={filters.newArrivals}
                          onChange={() => setFilters((prev) => ({ ...prev, newArrivals: !prev.newArrivals }))}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="filter-new" className="ml-2 text-sm text-gray-700">
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
                  className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  onClick={() => setIsMobileFilterOpen(false)}
                ></div>
                <div className="fixed inset-y-0 right-0 max-w-full flex">
                  <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => setIsMobileFilterOpen(false)}
                        >
                          <X size={24} />
                        </button>
                      </div>
                      <div className="p-4">
                        {/* Sort By */}
                        <div className="mb-6 border-b border-gray-200 pb-6">
                          <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="featured">Featured</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest First</option>
                          </select>
                        </div>

                        {/* Categories Filter */}
                        <div className="mb-6 border-b border-gray-200 pb-6">
                          <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                          <div className="space-y-2">
                            {categories.map((cat) => (
                              <div key={cat} className="flex items-center">
                                <input
                                  id={`mobile-category-${cat}`}
                                  type="checkbox"
                                  checked={filters.categories.includes(cat)}
                                  onChange={() => toggleFilter("categories", cat)}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`mobile-category-${cat}`} className="ml-2 text-sm text-gray-700">
                                  {cat}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Subcategories Filter */}
                        <div className="mb-6 border-b border-gray-200 pb-6">
                          <h3 className="font-medium text-gray-900 mb-3">T-Shirt Types</h3>
                          <div className="space-y-2">
                            {subcategories.map((subcat) => (
                              <div key={subcat} className="flex items-center">
                                <input
                                  id={`mobile-subcat-${subcat}`}
                                  type="checkbox"
                                  checked={filters.subcategories.includes(subcat)}
                                  onChange={() => toggleFilter("subcategories", subcat)}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`mobile-subcat-${subcat}`} className="ml-2 text-sm text-gray-700">
                                  {subcat}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Additional Filters */}
                        <div className="mb-6 border-b border-gray-200 pb-6">
                          <h3 className="font-medium text-gray-900 mb-3">Additional Filters</h3>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                id="mobile-filter-sale"
                                type="checkbox"
                                checked={filters.onSale}
                                onChange={() => setFilters((prev) => ({ ...prev, onSale: !prev.onSale }))}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label htmlFor="mobile-filter-sale" className="ml-2 text-sm text-gray-700">
                                On Sale
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="mobile-filter-new"
                                type="checkbox"
                                checked={filters.newArrivals}
                                onChange={() => setFilters((prev) => ({ ...prev, newArrivals: !prev.newArrivals }))}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label htmlFor="mobile-filter-new" className="ml-2 text-sm text-gray-700">
                                New Arrivals
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={clearFilters}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Clear All
                          </button>
                          <button
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
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
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{sortedProducts.length}</span> results
                </p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.categories.map((cat) => (
                      <button
                        key={`filter-${cat}`}
                        onClick={() => toggleFilter("categories", cat)}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                      >
                        {cat} <X size={14} className="ml-1" />
                      </button>
                    ))}
                    {filters.subcategories.map((subcat) => (
                      <button
                        key={`filter-${subcat}`}
                        onClick={() => toggleFilter("subcategories", subcat)}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                      >
                        {subcat} <X size={14} className="ml-1" />
                      </button>
                    ))}
                    {filters.onSale && (
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, onSale: false }))}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                      >
                        On Sale <X size={14} className="ml-1" />
                      </button>
                    )}
                    {filters.newArrivals && (
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, newArrivals: false }))}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
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
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {sortedProducts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center">
                    <button className="px-2 py-1 border border-gray-300 rounded-l-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border-t border-b border-gray-300 text-sm font-medium text-indigo-600 bg-indigo-50">
                      1
                    </button>
                    <button className="px-3 py-1 border-t border-b border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border-t border-b border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-2 py-1 border border-gray-300 rounded-r-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductListingPage

