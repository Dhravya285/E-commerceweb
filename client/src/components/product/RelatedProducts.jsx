// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Star } from "lucide-react";
// import axios from "axios";

// const RelatedProducts = ({ category, currentProductId }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5002/api/products/related`,
//           {
//             params: { category, currentProductId },
//           }
//         );
//         setProducts(
//           response.data.map((p) => ({
//             id: p._id,
//             name: p.name,
//             price: p.price,
//             image: p.images[0],
//             rating: p.rating,
//             isNew: p.isNew,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching related products:", error);
//       }
//     };
//     if (category && currentProductId) {
//       fetchRelatedProducts();
//     }
//   }, [category, currentProductId]);

//   if (!products.length) {
//     return <p className="text-blue-300">No related products found.</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <div
//           key={product.id}
//           className="group relative rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
//         >
//           <div className="bg-black/40 backdrop-blur-md border border-blue-900/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,191,255,0.3)]">
//             <div className="relative aspect-[3/4] overflow-hidden">
//               <img
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               {product.isNew && (
//                 <div className="absolute top-2 left-2">
//                   <span className="bg-blue-500/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
//                     NEW
//                   </span>
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <h3 className="text-blue-300 font-medium text-sm mb-1 line-clamp-2">
//                 {product.name}
//               </h3>
//               <div className="flex items-center mb-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={14}
//                       className={
//                         i < Math.floor(product.rating)
//                           ? "text-yellow-400 fill-current"
//                           : "text-gray-400"
//                       }
//                       fillOpacity={i < Math.floor(product.rating) ? 1 : 0}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-blue-300 text-xs ml-1">
//                   {product.rating}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-blue-300 font-bold">₹{product.price}</span>
//                 <Link
//                   to={`/product/${product.id}`}
//                   className="text-blue-400 text-sm hover:text-blue-300"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RelatedProducts;