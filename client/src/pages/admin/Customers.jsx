import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Search, Star, Mail } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('customers'); // 'customers' or 'queries'
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to view customers.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const validatedCustomers = Array.isArray(response.data)
        ? response.data.map((customer) => ({
            id: customer.id,
            name: customer.name || 'Unknown',
            email: customer.email || '',
            orders: Number(customer.orders) || 0,
            totalSpent: Number(customer.totalSpent) || 0,
          }))
        : [];
      setCustomers(validatedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', {
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
        toast.error('Failed to fetch customers.');
      }
      setCustomers([]);
    }
  };

  const fetchQueries = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to view queries.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/queries/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueries(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching queries:', {
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
        toast.error('Failed to fetch queries.');
      }
      setQueries([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCustomers(), fetchQueries()]);
      setLoading(false);
    };
    loadData();
  }, [navigate]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQueries = queries.filter(
    (query) =>
      query.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGlowingStars = () => {
    const stars = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      stars.push(
        <div
          key={i}
          className="glowing-star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, 0.8)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
        <p className="text-blue-300 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
                radial-gradient(1px 1px at 75% 75%, rgba(255, 255, 255, 0.8) 1%, transparent 1%)
              `,
              backgroundSize: "200px 200px, 150px 150px",
              animation: "star-rotation 500s linear infinite",
            }}
          />
          {renderGlowingStars()}
        </div>

        <div className="flex flex-col min-h-screen relative z-10">
          <div className="bg-black/40 backdrop-blur-sm border-b border-blue-900/50">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <h1 className="text-xl font-semibold text-white">{view === 'customers' ? 'Customers' : 'Queries'}</h1>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      className="block w-64 pl-10 pr-3 py-2 bg-black/40 border border-blue-900/50 rounded-md text-blue-300 placeholder-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder={view === 'customers' ? 'Search customers' : 'Search queries'}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setView('customers')}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        view === 'customers'
                          ? 'bg-blue-500 text-white'
                          : 'bg-black/40 text-blue　className="text-blue-300 hover:bg-blue-900/50"'
                      } transition-all duration-300`}
                    >
                      Customers
                    </button>
                    <button
                      onClick={() => setView('queries')}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        view === 'queries'
                          ? 'bg-blue-500 text-white'
                          : 'bg-black/40 text-blue　className="text-blue-300 hover:bg-blue-900/50"'
                      } transition-all duration-300`}
                    >
                      Queries
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="container mx-auto">
              <div className="bg-black/40 rounded-xl shadow-lg border border-blue-900/50 backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-blue-900/50 relative overflow-hidden">
                  <h2 className="text-lg font-medium text-white">
                    {view === 'customers' ? 'Customer Management' : 'Query Management'}
                  </h2>
                  <Star size={12} className="absolute top-2 right-2 text-yellow-400 opacity-50" />
                </div>
                <div className="overflow-x-auto p-6">
                  {view === 'customers' ? (
                    <table className="min-w-full divide-y divide-blue-900/50">
                      <thead className="bg-black/20">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Orders</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Total Spent</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-900/50">
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                                <Link to={`/admin/customers/${customer.id}`}>{customer.name}</Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">{customer.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">{customer.orders}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">${customer.totalSpent.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Link to={`/admin/queries/${customer.id}`} className="text-blue-300 hover:text-blue-400">
                                  View Support Queries
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-blue-400">
                              No customers found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="min-w-full divide-y divide-blue-900/50">
                      <thead className="bg-black/20">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Message</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Submitted</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-900/50">
                        {filteredQueries.length > 0 ? (
                          filteredQueries.map((query) => (
                            <tr key={query._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">{query.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">{query.email}</td>
                              <td className="px-6 py-4 text-sm text-blue-400 max-w-md truncate">{query.message}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                                {new Date(query.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Link to={`/admin/queries/${query._id}`} className="text-blue-300 hover:text-blue-400">
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-blue-400">
                              No queries found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        <style jsx>{`
          @keyframes star-rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .glowing-star {
            position: absolute;
            border-radius: 50%;
            background-color: white;
            animation: glow 4s infinite ease-in-out alternate;
          }
          @keyframes glow {
            0% {
              transform: scale(0.8);
              opacity: 0.6;
              box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.4);
            }
            100% {
              transform: scale(1.2);
              opacity: 1;
              box-shadow: 0 0 15px 5px rgba(100, 200, 255, 0.8);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Customers;