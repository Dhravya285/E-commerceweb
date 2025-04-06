"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-yellow-400 text-indigo-900 text-xs font-bold px-2 py-1 rounded">NEW</span>
        )}
        {product.isBestseller && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">BESTSELLER</span>
        )}
        {discount > 0 && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>
        )}
      </div>

      {/* Wishlist button */}
      <button
        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-300 ${
          isFavorite
            ? "bg-red-500 text-white"
            : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
        }`}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      {/* Product image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-w-3 aspect-h-4 bg-indigo-50">
          <img
            src={product.image || "/placeholder.svg?height=400&width=300"}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110"
          />
        </div>

        {/* Quick add to cart overlay */}
        <div
          className={`absolute inset-0 bg-indigo-900/70 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-2 px-4 rounded-full flex items-center gap-2 transform transition-transform duration-300 hover:scale-105">
            <ShoppingCart size={18} />
            Quick Add
          </button>
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4">
        <div className="text-xs text-indigo-600 font-medium mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 hover:text-indigo-700 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < product.rating ? "currentColor" : "none"}
                stroke="currentColor"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 100) + 10})</span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
