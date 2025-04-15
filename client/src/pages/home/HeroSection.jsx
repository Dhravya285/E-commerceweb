"use client"

import { useState } from "react"
import ProductCard from "../../components/product/ProductCard"

// Sample product data
const products = [
  {
    id: "1",
    title: "Spider-Man: Web Slinger Graphic Tee",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://m.media-amazon.com/images/I/B1OGJ8t+8ZS._CLa%7C2140%2C2000%7C91bGKdIRROL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX342_SY445_.png",
    category: "Marvel Universe",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "2",
    title: "Batman: Dark Knight Oversized Tee",
    price: 34.99,
    image: "https://images.bewakoof.com/original/men-s-navy-blue-the-dark-knight-graphic-printed-oversized-t-shirt-592058-1731661124-1.jpg",
    category: "DC Comics",
    rating: 5,
    isBestseller: true,
  },
  {
    id: "3",
    title: "One Punch Man Graphic Tee",
    price: 27.99,
    originalPrice: 32.99,
    image: "https://cdn.media.amplience.net/s/hottopic/20107884_hi?$productMainDesktop$",
    category: "Anime Superheroes",
    rating: 4,
    isNew: true,
  },
  {
    id: "4",
    title: "Superman Classic Logo Tee",
    price: 24.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/91wEQqCFURL.-BZ1000-.superman-classic-logo-s-t-shirt.jpg",
    category: "Classic Comics",
    rating: 4.5,
  },
  {
    id: "5",
    title: "Iron Man: Arc Reactor Glow Tee",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://tse2.mm.bing.net/th?id=OIP.gMTqgQ-XtU97Z_tcDbLXQwHaHa&pid=Api&P=0&h=180",
    category: "Marvel Universe",
    rating: 5,
    isBestseller: true,
  },
  {
    id: "6",
    title: "Wonder Woman: Amazonian Warrior Tee",
    price: 29.99,
    image: "https://mmv2api.s3.us-east-2.amazonaws.com/products/thumbs/2-image-tswwprdamaz-3-productimagenowatermark.jpg",
    category: "DC Comics",
    rating: 4.5,
  },
  {
    id: "7",
    title: "Naruto: Nine-Tails Mode Tee",
    price: 32.99,
    image: "https://149360821.v2.pressablecdn.com/wp-content/uploads/2014/07/NINE-TAILS-T-Shirt.jpeg",
    category: "Anime Superheroes",
    rating: 4.5,
  },
  {
    id: "8",
    title: "The Hulk: Smash Oversized Tee",
    price: 34.99,
    originalPrice: 39.99,
    image: "https://down-ph.img.susercontent.com/file/sg-11134201-23010-o8o37pzc2kmv72",
    category: "Marvel Universe",
    rating: 4,
    isNew: true,
  },
]

const tabs = ["All", "Marvel Universe", "DC Comics", "Anime Superheroes", "Classic Comics"]

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredProducts = activeTab === "All" ? products : products.filter((product) => product.category === activeTab)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Products</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Check out our most popular superhero t-shirts featuring iconic characters from your favorite universes
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab ? "bg-yellow-400 text-indigo-900" : "bg-indigo-800/50 text-white hover:brightness-110"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

