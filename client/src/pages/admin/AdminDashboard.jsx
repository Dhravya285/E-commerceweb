import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Tag, BarChart, Settings, LogOut, ShoppingBag, DollarSign, TrendingUp, UserPlus, Search, Bell, Menu, X, Star, Moon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    recentOrders: [],
    topProducts: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to view dashboard.');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);

      // Fetch analytics data
      const analyticsResponse = await axios.get('http://localhost:5002/api/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch recent orders
      const ordersResponse = await axios.get('http://localhost:5002/api/orders/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch top products
      const productsResponse = await axios.get('http://localhost:5002/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Process orders data
      const validatedOrders = Array.isArray(ordersResponse.data)
        ? ordersResponse.data.slice(0, 5).map((order) => ({
            id: order._id || 'N/A',
            customer: order.user?.email || 'Unknown',
            date: order.createdAt ? new Date(order.createdAt).toISOString().split('T')[0] : 'N/A',
            total: parseFloat(order.total) || 0,
            status: order.orderStatus || 'pending',
          }))
        : [];

      // Process top products data
      const validatedProducts = Array.isArray(productsResponse.data.products)
        ? productsResponse.data.products
            .sort((a, b) => (b.sales || 0) - (a.sales || 0))
            .slice(0, 4)
            .map((product) => ({
              id: product._id || 'N/A',
              name: product.name || 'Unknown',
              sales: product.sales || 0,
              revenue: product.sales && product.price ? product.sales * product.price : 0,
              image: product.images?.[0]?.url || 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/default/default-tshirt.jpg',
            }))
        : [];

      // Update state with validated data
      setDashboardData({
        totalSales: analyticsResponse.data.sales || 0,
        totalOrders: analyticsResponse.data.orders || 0,
        totalCustomers: analyticsResponse.data.customers || 0,
        averageOrderValue: analyticsResponse.data.orders
          ? (analyticsResponse.data.sales / analyticsResponse.data.orders).toFixed(2)
          : 0,
        recentOrders: validatedOrders,
        topProducts: validatedProducts,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', {
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
        toast.error(error.response?.data?.message || 'Failed to fetch dashboard data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [navigate]);

  // Sales Chart Data
  const salesChartData = {
    labels: ['Total Sales', 'Total Orders'],
    datasets: [
      {
        label: 'Sales & Orders',
        data: [dashboardData.totalSales, dashboardData.totalOrders * 100], // Scale orders for visibility
        backgroundColor: ['rgba(147, 51, 234, 0.6)', 'rgba(59, 130, 246, 0.6)'],
        borderColor: ['rgba(147, 51, 234, 1)', 'rgba(59, 130, 246, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
          color: '#d1d5db',
        },
        ticks: { color: '#d1d5db' },
        grid: { color: 'rgba(209, 213, 219, 0.1)' },
      },
      x: {
        ticks: { color: '#d1d5db' },
        grid: { color: 'rgba(209, 213, 219, 0.1)' },
      },
    },
    plugins: {
      legend: { labels: { color: '#d1d5db' } },
      title: {
        display: true,
        text: 'Sales and Orders Overview',
        color: '#d1d5db',
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-purple-300 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-slate-800/80 backdrop-blur-sm border-r border-purple-500/30">
          <div className="flex items-center justify-center h-16 bg-slate-900/90 relative overflow-hidden">
            <span className="text-xl font-bold text-purple-300">Starry Comics</span>
            <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-70" />
            <Moon size={14} className="absolute bottom-2 left-2 text-purple-300 opacity-30" />
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link to="/admin" className="flex items-center px-4 py-2 text-white bg-purple-600/80 rounded-md">
                <LayoutDashboard className="mr-3 h-5 w-5 text-purple-300" />
                Dashboard
              </Link>
              <Link to="/admin/products" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                <Package className="mr-3 h-5 w-5 text-purple-300" />
                Products
              </Link>
              <Link to="/admin/orders" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                <ShoppingBag className="mr-3 h-5 w-5 text-purple-300" />
                Orders
              </Link>
              <Link to="/admin/customers" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                <Users className="mr-3 h-5 w-5 text-purple-300" />
                Customers
              </Link>
              <Link to="/admin/discounts" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                <Tag className="mr-3 h-5 w-5 text-purple-300" />
                Discounts
              </Link>
              <Link to="/admin/analytics" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                <BarChart className="mr-3 h-5 w-5 text-purple-300" />
                Analytics
              </Link>
              <Link to="/admin/settings" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                <Settings className="mr-3 h-5 w-5 text-purple-300" />
                Settings
              </Link>
            </nav>
            <div className="px-4 py-4 border-t border-purple-500/30">
              <button
                className="flex items-center w-full px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                <LogOut className="mr-3 h-5 w-5 text-purple-300" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-slate-900/75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800/80 backdrop-blur-sm text-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-purple-300" />
              </button>
            </div>
            <div className="flex items-center justify-center h-16 bg-slate-900/90 relative overflow-hidden">
              <span className="text-xl font-bold text-purple-300">Starry Comics</span>
              <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-70" />
            </div>
            <div className="flex-1 overflow-y-auto pt-5 pb-4">
              <nav className="mt-5 px-2 space-y-1">
                <Link to="/admin" className="flex items-center px-4 py-2 text-white bg-purple-600/80 rounded-md">
                  <LayoutDashboard className="mr-3 h-5 w-5 text-purple-300" />
                  Dashboard
                </Link>
                <Link to="/admin/products" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                  <Package className="mr-3 h-5 w-5 text-purple-300" />
                  Products
                </Link>
                <Link to="/admin/orders" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                  <ShoppingBag className="mr-3 h-5 w-5 text-purple-300" />
                  Orders
                </Link>
                <Link to="/admin/customers" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                  <Users className="mr-3 h-5 w-5 text-purple-300" />
                  Customers
                </Link>
                <Link to="/admin/discounts" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                  <Tag className="mr-3 h-5 w-5 text-purple-300" />
                  Discounts
                </Link>
                <Link to="/admin/analytics" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                  <BarChart className="mr-3 h-5 w-5 text-purple-300" />
                  Analytics
                </Link>
                <Link to="/admin/settings" className="flex items-center px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
                  <Settings className="mr-3 h-5 w-5 text-purple-300" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="px-4 py-4 border-t border-purple-500/30">
              <button
                className="flex items-center w-full px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                <LogOut className="mr-3 h-5 w-5 text-purple-300" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-slate-800/80 backdrop-blur-sm border-b border-purple-500/30 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-purple-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <h1 className="text-xl font-semibold text-purple-300">Dashboard</h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-purple-300" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
                <button className="ml-4 p-1 rounded-full text-purple-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-4 relative flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/80 rounded-lg shadow-lg p-6 border border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
              <Star size={10} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-600/30 text-purple-300">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">Total Sales</p>
                  <p className="text-2xl font-semibold text-purple-400">₹{dashboardData.totalSales.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-emerald-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>12% increase</span>
              </div>
            </div>
            <div className="bg-slate-800/80 rounded-lg shadow-lg p-6 border border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
              <Star size={10} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-600/30 text-purple-300">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">Total Orders</p>
                  <p className="text-2xl font-semibold text-purple-400">{dashboardData.totalOrders}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-emerald-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8% increase</span>
              </div>
            </div>
            <div className="bg-slate-800/80 rounded-lg shadow-lg p-6 border border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
              <Star size={10} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-600/30 text-purple-300">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">Total Customers</p>
                  <p className="text-2xl font-semibold text-purple-400">{dashboardData.totalCustomers}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-emerald-400">
                <UserPlus className="h-4 w-4 mr-1" />
                <span>24 new today</span>
              </div>
            </div>
            <div className="bg-slate-800/80 rounded-lg shadow-lg p-6 border border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
              <Star size={10} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-600/30 text-purple-300">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">Avg. Order Value</p>
                  <p className="text-2xl font-semibold text-purple-400">₹{dashboardData.averageOrderValue}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-emerald-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>3% increase</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Orders */}
            <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
                <h2 className="text-lg font-medium text-purple-300">Recent Orders</h2>
                <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-500/30">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/30">
                    {dashboardData.recentOrders.length > 0 ? (
                      dashboardData.recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-400">
                            <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">
                            ₹{order.total.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'delivered' ? 'bg-emerald-400/20 text-emerald-400' :
                                order.status === 'shipped' ? 'bg-blue-400/20 text-blue-400' :
                                order.status === 'processing' ? 'bg-yellow-400/20 text-yellow-400' :
                                'bg-slate-400/20 text-slate-400'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-purple-200">
                          No recent orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-purple-500/30">
                <Link to="/admin/orders" className="text-sm font-medium text-purple-400 hover:text-purple-300">
                  View all orders
                </Link>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
                <h2 className="text-lg font-medium text-purple-300">Top Selling Products</h2>
                <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-500/30">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Units Sold
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/30">
                    {dashboardData.topProducts.length > 0 ? (
                      dashboardData.topProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-200">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-md mr-3 object-cover"
                              />
                              <Link to={`/admin/products/${product.id}`} className="text-purple-400 hover:text-purple-300">
                                {product.name}
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                            {product.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">
                            ₹{product.revenue.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-purple-200">
                          No top products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-purple-500/30">
                <Link to="/admin/products" className="text-sm font-medium text-purple-400 hover:text-purple-300">
                  View all products
                </Link>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-slate-800/80 rounded-lg shadow-lg p-6 mb-8 border border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
            <h2 className="text-lg font-medium text-purple-300 mb-4">Sales Overview</h2>
            <div className="h-64">
              <Bar data={salesChartData} options={salesChartOptions} />
            </div>
            <Star size={10} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;