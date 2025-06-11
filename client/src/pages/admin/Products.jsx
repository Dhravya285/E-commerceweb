import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5002/api/products', {
        params: { name: query }, // Pass search query as a parameter
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      toast.error(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Delete product by ID
  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5002/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Product deleted successfully');
      fetchProducts(searchQuery); // Refresh product list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  // Fetch products on mount and when searchQuery changes
  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-slate-800/80 backdrop-blur-sm border-b border-purple-500/30 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-purple-300">Products</h1>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Search products"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link
                  to="/admin/products/add"
                  className="ml-4 flex items-center px-4 py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Products Content */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
          <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
              <h2 className="text-lg font-medium text-purple-300">Product Management</h2>
              <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
            </div>
            {loading && <p className="px-6 py-4 text-purple-200">Loading products...</p>}
            {error && <p className="px-6 py-4 text-red-400">{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className="px-6 py-4 text-purple-200">No products found.</p>
            )}
            {!loading && !error && products.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-500/30">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/30">
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={product.images[0]?.url || 'https://via.placeholder.com/40'}
                            alt={product.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400">
                          <Link to={`/admin/products/${product._id}`}>{product.name}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">₹{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link to={`/admin/products/edit/${product._id}`} className="text-purple-400 hover:text-purple-300 mr-4">
                            <Edit className="h-5 w-5 inline" />
                          </Link>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-5 w-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;