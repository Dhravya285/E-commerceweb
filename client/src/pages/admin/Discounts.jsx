import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Plus, Search, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Discounts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/discounts`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { search: searchQuery },
        });
        setDiscounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discounts:', error);
        toast.error('Failed to load discounts');
        setLoading(false);
      }
    };
    fetchDiscounts();
  }, [searchQuery]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-900 text-white">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-slate-800/80 backdrop-blur-sm border-b border-purple-500/30 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-purple-300">Discounts</h1>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Search discounts"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link
                  to="/admin/discount/add"
                  className="ml-4 flex items-center px-4 py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Discount
                </Link>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
          <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
              <h2 className="text-lg font-medium text-purple-300">Discount Management</h2>
              <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-purple-500/30">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/30">
                  {discounts.map((discount) => (
                    <tr key={discount._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-400">
                        <Link to={`/admin/discounts/${discount._id}`}>{discount.code}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">{discount.discountPercentage}% off</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{discount.usageCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            discount.status === 'active' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-slate-400/20 text-slate-400'
                          }`}
                        >
                          {discount.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link to={`/admin/discounts/edit/${discount._id}`} className="text-purple-400 hover:text-purple-300">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discounts;