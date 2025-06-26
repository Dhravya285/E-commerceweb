

import { useState, useEffect } from "react";
import { Filter, ChevronDown, ChevronUp, X, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";
import toast from "react-hot-toast";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    gender: [],
    categories: [],
    subcategories: [],
    priceRange: [0, 2000],
    onSale: false,
    newArrivals: false,
  });
  const [sortBy, setSortBy] = useState("featured");
  
  const [expandedFilters, setExpandedFilters] = useState({
    gender: true,
    categories: true,
    subcategories: true,
    price: true,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const menCategories = [
    { name: "Graphic Tees", image: "https://i.pinimg.com/originals/3c/4b/c6/3c4bc697ab443981b57ecda389db42a1.jpg", count: 42 },
    { name: "Oversized Fits", image: "https://tse3.mm.bing.net/th?id=OIP.VzFeft62u1aa9ExKweqo-AAAAA&pid=Api&P=0&h=180", count: 28 },
    { name: "Hoodies", image: "https://1.bp.blogspot.com/-Z-7bRmz1pfc/VWQThXBIbZI/AAAAAAAAAGs/xWsujezxU6M/s1600/hoodie2.jpg", count: 16 },
    { name: "Accessories", image: "https://tse1.mm.bing.net/th?id=OIP.FxwrviRZ3Acu-y1NJWRRigHaHa&pid=Api&P=0&h=180", count: 23 },
  ];

  const womenCategories = [
    { name: "Graphic Tees", image: "https://i5.walmartimages.com/asr/7cb0237a-538b-4d83-9dea-35432ee10cb1_1.3fd4e72403f6b82ef62f7739ff36fa96.jpeg", count: 38 },
    { name: "Crop Tops", image: "https://img.ltwebstatic.com/images/pi/201711/e8/15115155444351802642.jpg", count: 24 },
    { name: "Hoodies", image: "https://i5.walmartimages.com/seo/Hat-and-Beyond-Women-s-Ultra-Soft-Fleece-Hoodie-Customizable-Oversized-Pullover-Hoodie-With-Half-Moon-Patch-For-Custom-Branding_f0e356ec-3da8-45e2-b3ba-4d2bb720d286.aaf8f235753f53b6f0fd56f6943ed925.jpeg", count: 19 },
    { name: "Accessories", image: "https://nilsonline.lk/image/catalog/nils/accessories/accessories.jpg", count: 27 },
  ];

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
        
        params: showAll
          ? {
              gender: filters.gender.join(",") || undefined,
              category: filters.categories.join(",") || undefined,
              subcategory: filters.subcategories.join(",") || undefined,
              minPrice: filters.priceRange[0],
              maxPrice: filters.priceRange[1],
              onSale: filters.onSale || undefined,
              isNew: filters.newArrivals || undefined,
            }
          : {
              page: currentPage,
              limit: productsPerPage,
              gender: filters.gender.join(",") || undefined,
              category: filters.categories.join(",") || undefined,
              subcategory: filters.subcategories.join(",") || undefined,
              minPrice: filters.priceRange[0],
              maxPrice: filters.priceRange[1],
              onSale: filters.onSale || undefined,
              isNew: filters.newArrivals || undefined,
            },
      });
      console.log("Backend Response:", response.data); // Add this to debug
      const fetchedProducts = response.data.products.map((p) => ({
  ...p,
  id: p._id,
  title: p.name,
  image: p.images[0]?.url || "/placeholder.png",
}));
      setProducts(fetchedProducts);
      setTotalProducts(response.data.total || fetchedProducts.length);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      toast.error("Failed to load products");
    }
  };
  fetchProducts();
}, [currentPage, productsPerPage, showAll, filters]);

  useEffect(() => {
    console.log("Current Filters:", filters);
    console.log("Displayed Products After Filtering:", filteredProducts.length);
  }, [filters, products]);

  const genders = ["Men", "Women"];
  const categories = ["Marvel", "DC", "Anime", "Custom"];
  const subcategories = [
    "Graphic Printed",
    "Oversized",
    "Acid Wash",
    "Solid Color",
    "Sleeveless",
    "Long Sleeve",
    "Hooded",
    "Crop Top",
  ];

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      const currentFilters = [...prev[filterType]];
      const index = currentFilters.indexOf(value);
      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }
      return { ...prev, [filterType]: currentFilters };
    });
    setCurrentPage(1);
  };

  const toggleExpandFilter = (filterType) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const clearFilters = () => {
    setFilters({
      gender: [],
      categories: [],
      subcategories: [],
      priceRange: [0, 2000],
      onSale: false,
      newArrivals: false,
    });
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) return false;
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
    if (filters.subcategories.length > 0 && !filters.subcategories.includes(product.subcategory)) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    if (filters.onSale && !product.originalPrice) return false;
    if (filters.newArrivals && !product.isNew) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.isNew ? -1 : a.isNew ? 1 : 0;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border-t border-b border-blue-900/50 text-sm font-medium ${
            currentPage === i
              ? "bg-blue-900/50 text-blue-300"
              : "text-blue-300 hover:bg-blue-900/30"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

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
console.log('Products State:', products); // Add before the return statement
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-white mb-2 text-center"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Comic T-Shirts Collection
          </h1>
          <p className="text-blue-300 text-center">{sortedProducts.length} of {totalProducts} products</p>
        </div>

        {/* Men's Collection Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <img
            src="https://wallpaperaccess.com/full/1448078.jpg"
            alt="Men's Collection"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
            >
              Men's Collection
            </h1>
            <p className="text-blue-300 text-lg md:text-xl max-w-md mb-6">
              Discover our exclusive range of superhero-inspired apparel designed for the modern hero.
            </p>
            <button
              onClick={() => toggleFilter("gender", "Men")}
              className="inline-flex items-center bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-3 px-6 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all duration-300 w-fit"
            >
              Shop Men <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Men's Categories */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Men's Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menCategories.map((category, index) => (
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
                    <button
                      onClick={() => toggleFilter("subcategories", category.name)}
                      className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-2 px-4 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_10px_rgba(0,191,255,0.3)] transition-all duration-300"
                    >
                      View All
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Women's Collection Banner */}
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
            <button
              onClick={() => toggleFilter("gender", "Women")}
              className="inline-flex items-center bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-3 px-6 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all duration-300 w-fit"
            >
              Shop Women <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Women's Categories */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Women's Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womenCategories.map((category, index) => (
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
                    <button
                      onClick={() => toggleFilter("subcategories", category.name)}
                      className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-2 px-4 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_10px_rgba(0,191,255,0.3)] transition-all duration-300"
                    >
                      View All
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className="text-lg font-bold text-blue-300"
                    style={{ textShadow: "0 0 5px rgba(0, 191, 255, 0.7)" }}
                  >
                    Filters
                  </h2>
                  <button onClick={clearFilters} className="text-sm text-blue-400 hover:text-blue-300">
                    Clear all
                  </button>
                </div>

                <div className="mb-6 border-b border-blue-900/30 pb-6">
                  <button
                    onClick={() => toggleExpandFilter("gender")}
                    className="flex items-center justify-between w-full text-left font-medium text-blue-300 mb-3"
                  >
                    <span>Gender</span>
                    {expandedFilters.gender ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedFilters.gender && (
                    <div className="space-y-2">
                      {genders.map((gen) => (
                        <div key={gen} className="flex items-center">
                          <input
                            id={`gender-${gen}`}
                            type="checkbox"
                            checked={filters.gender.includes(gen)}
                            onChange={() => toggleFilter("gender", gen)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                          />
                          <label htmlFor={`gender-${gen}`} className="ml-2 text-sm text-blue-300">
                            {gen}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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
                      <h2
                        className="text-lg font-medium text-blue-300"
                        style={{ textShadow: "0 0 5px rgba(0, 191, 255, 0.7)" }}
                      >
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="p-4">
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

                      <div className="mb-6 border-b border-blue-900/30 pb-6">
                        <h3 className="font-medium text-blue-300 mb-3">Gender</h3>
                        <div className="space-y-2">
                          {genders.map((gen) => (
                            <div key={gen} className="flex items-center">
                              <input
                                id={`mobile-gender-${gen}`}
                                type="checkbox"
                                checked={filters.gender.includes(gen)}
                                onChange={() => toggleFilter("gender", gen)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                              />
                              <label htmlFor={`mobile-gender-${gen}`} className="ml-2 text-sm text-blue-300">
                                {gen}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

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

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-blue-300">
                Showing <span className="font-medium">{sortedProducts.length}</span> of{" "}
                <span className="font-medium">{totalProducts}</span> results
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  {showAll ? "Show Paginated" : "Show All"}
                </button>
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
            </div>

            {(filters.gender.length > 0 ||
              filters.categories.length > 0 ||
              filters.subcategories.length > 0 ||
              filters.onSale ||
              filters.newArrivals) && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-blue-300 mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.gender.map((gen) => (
                    <button
                      key={`filter-${gen}`}
                      onClick={() => toggleFilter("gender", gen)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-300 border border-blue-900/50 backdrop-blur-sm"
                    >
                      {gen} <X size={14} className="ml-1" />
                    </button>
                  ))}
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

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {sortedProducts.map((product) => {
    console.log('Rendering product:', product.title, 'Image:', product.image); // Debug log
    return (
      <div
        key={product.id}
        className="group relative rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
      >
        <div className="bg-black/40 backdrop-blur-md border border-blue-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,191,255,0.3)]">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.image || "https://via.placeholder.com/150"} // Use product.image and external placeholder
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {product.isNew && (
              <div className="absolute top-2 left-2">
                <span className="bg-blue-500/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                  NEW
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-blue-300 font-medium text-sm mb-1 line-clamp-2">{product.title}</h3>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"}
                    fillOpacity={i < Math.floor(product.rating) ? 1 : 0}
                  />
                ))}
              </div>
              <span className="text-blue-300 text-xs ml-1">{product.rating}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-300 font-bold">₹{product.price}</span>
              <Link
                to={`/products/${product.id}`}
                className="text-blue-400 text-sm hover:text-blue-300"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  })}
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

            {sortedProducts.length > 0 && !showAll && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 border border-blue-900/50 rounded-l-md text-sm font-medium text-blue-300 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900/30"
                    }`}
                  >
                    Previous
                  </button>
                  {renderPageNumbers()}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 border border-blue-900/50 rounded-r-md text-sm font-medium text-blue-300 ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900/30"
                    }`}
                  >
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
  );
};

export default ProductListingPage;