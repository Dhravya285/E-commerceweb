import ProductCard from "./ProductCard"

// Sample related products data
const sampleProducts = [
  {
    id: 2,
    name: "Captain America Shield Logo Tee",
    price: 749,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    category: "Marvel",
    isNew: false,
    discount: 0,
  },
  {
    id: 3,
    name: "Iron Man: Arc Reactor Glow Print",
    price: 999,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4,
    category: "Marvel",
    isNew: false,
    discount: 10,
  },
  {
    id: 6,
    name: "Deadpool: Chimichangas Oversized Tee",
    price: 899,
    image: "/placeholder.svg?height=400&width=300",
    rating: 5,
    category: "Marvel",
    isNew: true,
    discount: 0,
  },
  {
    id: 9,
    name: "Thor: Mjolnir Graphic Tee",
    price: 849,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    category: "Marvel",
    isNew: false,
    discount: 0,
  },
]

const RelatedProducts = ({ category, currentProductId }) => {
  // Filter products by category and exclude current product
  const relatedProducts = sampleProducts.filter(
    (product) => product.category === category && product.id !== currentProductId,
  )

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts

