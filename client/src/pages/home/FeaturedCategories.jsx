import { Link } from "react-router-dom"

const categories = [
  {
    id: "marvel",
    name: "Marvel Universe",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/97e9f5fa6e50c185d249956c6f198a2652a9217e69a59ecd.jpg",
    count: 42,
    color: "from-red-600 to-red-900",
  },
  {
    id: "dc",
    name: "DC Comics",
    image: "https://tse3.mm.bing.net/th?id=OIP.CPaOZraDmB5OpVnNiq08qwHaFz&pid=Api&P=0&h=180",
    count: 38,
    color: "from-blue-600 to-blue-900",
  },
  {
    id: "anime",
    name: "Anime Superheroes",
    image: "https://i.pinimg.com/originals/72/ed/57/72ed573173150abcbe4f5ed701d666f6.jpg",
    count: 27,
    color: "from-purple-600 to-purple-900",
  },
  {
    id: "classic",
    name: "Classic Comics",
    image: "https://tse2.mm.bing.net/th?id=OIP.UITiw8ukJdMLdoJvkYOMkAHaEO&pid=Api&P=0&h=180",
    count: 31,
    color: "from-green-600 to-green-900",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Our Collections</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Discover our wide range of superhero-themed t-shirts from your favorite comic universes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg h-80 shadow-xl"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={category.image || `/placeholder.svg?height=400&width=300`}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                ></div>
              </div>

              {/* Comic-style border */}
              <div className="absolute inset-0 border-[3px] border-white border-dashed opacity-0 group-hover:opacity-100 m-3 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4 transform transition-transform duration-300 group-hover:-translate-y-2">
                  {category.count} Products
                </p>
                <span className="inline-block bg-white text-indigo-900 font-bold py-2 px-4 rounded-full transform transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-yellow-400">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

