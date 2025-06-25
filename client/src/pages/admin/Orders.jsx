import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to view orders.');
      navigate('/login');
      return;
    }

    console.log('Fetching orders with token:', token.substring(0, 20) + '...');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const validatedOrders = Array.isArray(response.data)
        ? response.data.map((order) => {
            console.log(`Order ID fetched: ${order._id}`);
            return {
              _id: order._id,
              user: order.user || {},
              createdAt: order.createdAt || new Date().toISOString(),
              total: parseFloat(order.total) || 0,
              orderStatus: order.orderStatus || 'pending',
              paypalTransactionId: order.paypalTransactionId || '',
            };
          })
        : [];
      setOrders(validatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', {
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
        toast.error('Failed to fetch orders.');
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`Updating order ID: ${orderId} to status: ${newStatus}`);
      const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/paypal/orders/${orderId}/tracking`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      toast.success(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', {
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
      } else if (error.response?.status === 404) {
        toast.error('Order not found.');
        console.log('Order not found:', orderId);
      } else {
        toast.error(error.response?.data?.error || 'Failed to update order status.');
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.user?.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center p-10 text-white bg-gradient-to-b from-gray-900 to-blue-950">
        Loading orders...
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
                radial-gradient(2px 2px at 75% 75%, rgba(255, 255, 255, 0.8) 1%, transparent 1%),
                radial-gradient(1.5px 1.5px at 50% 50%, rgba(255, 255, 255, 0.9) 1%, transparent 1%),
                radial-gradient(1px 1px at 30% 70%, rgba(200, 200, 255, 0.7) 1%, transparent 1%),
                radial-gradient(2.5px 2.5px at 80% 20%, rgba(255, 255, 255, 0.7) 1%, transparent 1%)
              `,
              backgroundSize: '200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px',
              animation: 'star-rotation 500s linear infinite',
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 10%, white 1%, transparent 1%),
                radial-gradient(1.5px 1.5px at 60% 40%, white 1%, transparent 1%),
                radial-gradient(1px 1px at 30% 80%, white 1%, transparent 1%)
              `,
              backgroundSize: '250px 250px, 300px 300px, 350px 350px',
              animation: 'star-rotation-reverse 600s linear infinite',
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8" style={{ textShadow: '0_0_10px_rgba(100,200,255,0.7)' }}>
            Order Management
          </h1>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_15px_rgba(0,191,255,0.3)] border border-blue-900/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">All Orders</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 bg-black/30 border border-blue-900/50 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by order ID or email"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-900/50">
                  <thead className="bg-black/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-900/50">
                    {filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                          <Link to={`/orders/${order._id}`}>{order._id}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">{order.user.email || 'Unknown'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">${order.total.toFixed(2)}</td>
                        <td className="px-2 py-1 whitespace-nowrap py-4">
                          <select
                            className="px-2 py-1 bg-black/30 border border-blue-900/50 rounded-md text-sm text-white"
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="text-blue-400 hover:text-blue-600 mr-4"
                            onClick={() => navigate(`/orders/${order._id}`)}
                          >
                            View
                          </button>
                          <button
                            className="text-red-400 hover:text-red-600"
                            onClick={() => handleStatusChange(order._id, 'cancelled')}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-blue-900/30 rounded-lg">
                <ShoppingBag className="mx-auto text-blue-400 h-12 w-12" />
                <h3 className="mt-4 text-lg font-medium text-white">No orders found</h3>
                <p className="mt-2 text-blue-400">Orders will appear here once placed.</p>
              </div>
            )}
          </div>
        </div>
        <style jsx>
          {`
            @keyframes star-rotation {
              0% {
                background-position: 0 0, 0 0, 0 0, 0 0, 0 0;
              }
              100% {
                background-position: 200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px;
              }
            }
            @keyframes star-rotation-reverse {
              0% {
                background-position: 0 0, 0 0, 0 0;
              }
              100% {
                background-position: -250px -250px, -300px -300px, -350px -350px;
              }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Orders;