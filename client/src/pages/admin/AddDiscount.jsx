// src/pages/admin/AddDiscount.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddDiscount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: '',
    maxUsageLimit: '',
    startsAt: '',
    expiresAt: '',
    description: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
      console.log('Submitting discount:', formData); // Debug
      const response = await axios.post(
        'http://localhost:5002/api/discounts',
        {
          code: formData.code.toUpperCase(),
          discountPercentage: Number(formData.discountPercentage),
          maxUsageLimit: formData.maxUsageLimit ? Number(formData.maxUsageLimit) : null,
          startsAt: formData.startsAt || new Date().toISOString(),
          expiresAt: formData.expiresAt || null,
          description: formData.description || '',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Discount created:', response.data); // Debug
      toast.success('Discount created successfully!');
      navigate('/admin/discounts');
    } catch (error) {
      console.error('Error creating discount:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create discount';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-slate-800/80 backdrop-blur-sm border-b border-purple-500/30 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-semibold text-purple-300">Add Discount</h1>
              <Link
                to="/admin/discounts"
                className="flex items-center px-4 py-2 text-purple-400 hover:text-purple-300"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </Link>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
          <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-400/20 text-red-400 rounded-md">{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-200">Discount Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., HERO10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-200">Discount Percentage</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., 10"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-200">Max Usage Limit (Optional)</label>
                  <input
                    type="number"
                    name="maxUsageLimit"
                    value={formData.maxUsageLimit}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., 100"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-200">Start Date (Optional)</label>
                  <input
                    type="datetime-local"
                    name="startsAt"
                    value={formData.startsAt}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-200">Expiration Date (Optional)</label>
                  <input
                    type="datetime-local"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-purple-200">Description (Optional)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., 10% off for new customers"
                    rows="4"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-700"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Discount
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddDiscount;