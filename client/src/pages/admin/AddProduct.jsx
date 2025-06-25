import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Star, Upload, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    longDescription: '',
    category: 'T-Shirts',
    subcategory: '',
    gender: 'Unisex',
    sizes: [],
    colors: [{ name: '', hex: '' }],
    features: [''],
    inStock: true,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['Marvel', 'DC', 'Anime', 'Custom'];
  const subcategories = [
    'Graphic Printed', 'Oversized', 'Acid Wash', 'Solid Color',
    'Sleeveless', 'Long Sleeve', 'Hooded', 'Crop Top',
  ];
  const genders = ['Men', 'Women', 'Unisex'];
  const sizesOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = arrayName === 'colors' ? { ...updatedArray[index], [field]: value } : value;
      return { ...prev, [arrayName]: updatedArray };
    });
  };

  const addArrayItem = (arrayName, defaultItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultItem],
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });
    // Debug: Log FormData contents
    for (let [key, value] of data.entries()) {
      console.log(`FormData ${key}:`, value);
    }
    images.forEach((image) => {
  if (image) data.append('images', image);
});

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/products/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Let axios set Content-Type for multipart/form-data
        },
      });
      toast.success('Product added successfully!');
      navigate('/admin/products');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add product';
      toast.error(errorMessage);
      console.error('Request error:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm p-6 relative overflow-hidden">
          <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
          <h2 className="text-2xl font-semibold text-purple-300 mb-6 flex items-center">
            <Package className="h-6 w-6 mr-2" />
            Add New Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-purple-200 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-purple-200 mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-purple-200 mb-2">Original Price (₹, optional)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter original price"
                />
              </div>
              <div>
                <label className="block text-sm text-purple-200 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-purple-200 mb-2">Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Select subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-purple-200 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  {genders.map((gen) => (
                    <option key={gen} value={gen}>{gen}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm text-purple-200 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Enter short description"
                rows="3"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm text-purple-200 mb-2">Long Description</label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Enter detailed description"
                rows="5"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm text-purple-200 mb-2">Sizes</label>
              <div className="flex flex-wrap gap-2">
                {sizesOptions.map((size) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sizes.includes(size)}
                      onChange={() => {
                        setFormData((prev) => ({
                          ...prev,
                          sizes: prev.sizes.includes(size)
                            ? prev.sizes.filter((s) => s !== size)
                            : [...prev.sizes, size],
                        }));
                      }}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                    />
                    <span className="ml-2 text-sm text-purple-200">{size}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm text-purple-200 mb-2">Colors</label>
              {formData.colors.map((color, index) => (
                <div key={index} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={color.name}
                    onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'colors')}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => handleArrayChange(index, 'hex', e.target.value, 'colors')}
                    className="w-12 h-10 bg-slate-700/50 border border-purple-500/50 rounded-md"
                  />
                  {formData.colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'colors')}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('colors', { name: '', hex: '' })}
                className="mt-2 text-purple-400 hover:text-purple-300 text-sm"
              >
                + Add Color
              </button>
            </div>
            <div className="mt-6">
  <label className="block text-sm text-purple-200 mb-2">Features</label>
  {formData.features.map((feature, index) => (
    <div key={index} className="flex gap-4 mb-2">
      <input
        type="text"
        placeholder="Feature"
        value={feature}
        onChange={(e) => handleArrayChange(index, null, e.target.value, 'features')}
        className="flex-1 px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      {formData.features.length > 1 && (
        <button
          type="button"
          onClick={() => removeArrayItem(index, 'features')}
          className="text-red-400 hover:text-red-300"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={() => addArrayItem('features', '')}
    className="mt-2 text-purple-400 hover:text-purple-300 text-sm"
  >
    + Add Feature
  </button>
</div>
            <div className="mt-6">
              <label className="block text-sm text-purple-200 mb-2">Images</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center w-full h-32 bg-slate-700/50 border-2 border-purple-500/50 border-dashed rounded-md cursor-pointer hover:bg-slate-600/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-purple-300 mb-2" />
                    <p className="text-sm text-purple-200">Upload images</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    name="images" // Explicitly set name attribute
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
              />
              <label className="ml-2 text-sm text-purple-200">In Stock</label>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
              <Link
                to="/admin/products"
                className="px-4 py-2 bg-slate-700/50 text-purple-200 rounded-md hover:bg-slate-600/50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;