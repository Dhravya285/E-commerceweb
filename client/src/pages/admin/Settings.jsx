import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Star } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Currency mapping for display
  const currencyMap = {
    INR: 'INR (₹)',
    USD: 'USD ($)',
    EUR: 'EUR (€)',
  };

  // Reverse mapping for backend
  const reverseCurrencyMap = {
    'INR (₹)': 'INR',
    'USD ($)': 'USD',
    'EUR (€)': 'EUR',
  };

  // Fetch settings on mount
  const fetchSettings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to view settings.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/api/settings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { adminName, adminEmail, storeName, currency } = response.data;
      setAdminName(adminName || '');
      setAdminEmail(adminEmail || '');
      setStoreName(storeName || '');
      setCurrency(currency || 'INR');
      console.log('Settings fetched:', response.data);
    } catch (error) {
      console.error('Error fetching settings:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch settings.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Save settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to save settings.');
      navigate('/login');
      setSaving(false);
      return;
    }

    // Client-side validation
    if (!adminName || !adminEmail || !storeName || !currency) {
      toast.error('All fields are required.');
      setSaving(false);
      return;
    }
    if (!adminEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email.');
      setSaving(false);
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5002/api/settings',
        {
          adminName,
          adminEmail,
          storeName,
          currency,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { adminName: updatedName, adminEmail: updatedEmail, storeName: updatedStore, currency: updatedCurrency } = response.data;
      setAdminName(updatedName);
      setAdminEmail(updatedEmail);
      setStoreName(updatedStore);
      setCurrency(updatedCurrency);
      toast.success('Settings saved successfully!');
      console.log('Settings updated:', response.data);
    } catch (error) {
      console.error('Error saving settings:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'Invalid input. Please check your data.');
      } else {
        toast.error('Failed to save settings.');
      }
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-purple-300 text-lg">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Navigation */}
          <div className="bg-slate-800/80 backdrop-blur-sm border-b border-purple-500/30 z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-purple-300">Settings</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
            <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
                <h2 className="text-lg font-medium text-purple-300">Admin Settings</h2>
                <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
              </div>
              <div className="p-6">
                <form onSubmit={handleSaveSettings}>
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-purple-200 mb-2">Profile Settings</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm text-purple-200">Admin Name</label>
                        <input
                          type="text"
                          className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md text-white p-2"
                          placeholder="Enter admin name"
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-purple-200">Admin Email</label>
                        <input
                          type="email"
                          className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md text-white p-2"
                          placeholder="Enter admin email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-purple-200 mb-2">Store Settings</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm text-purple-200">Store Name</label>
                        <input
                          type="text"
                          className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md text-white p-2"
                          placeholder="Starry Comics"
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-purple-200">Currency</label>
                        <select
                          className="mt-1 block w-full bg-slate-700/50 border border-purple-500/50 rounded-md text-white p-2"
                          value={currencyMap[currency]}
                          onChange={(e) => setCurrency(reverseCurrencyMap[e.target.value])}
                        >
                          {Object.values(currencyMap).map((curr) => (
                            <option key={curr} value={curr}>
                              {curr}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-400/50"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;