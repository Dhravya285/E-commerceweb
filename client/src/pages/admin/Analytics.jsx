import React, { useState, useEffect } from 'react';
import { BarChart, Star } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    sales: 0,
    orders: 0,
    customers: 0,
    ordersPerCustomer: 0,
    topProduct: 'None',
    topCategory: 'None',
  });
  const [loading, setLoading] = useState(true);
  const [chartError, setChartError] = useState(null);
  const navigate = useNavigate();

  // Fetch analytics data
  const fetchAnalytics = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to view analytics.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalyticsData({
        sales: response.data.sales || 0,
        orders: response.data.orders || 0,
        customers: response.data.customers || 0,
        ordersPerCustomer: response.data.ordersPerCustomer || 0,
        topProduct: response.data.topProduct || 'None',
        topCategory: response.data.topCategory || 'None',
      });
      console.log('Analytics fetched:', response.data);
    } catch (error) {
      console.error('Error fetching analytics:', {
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
        toast.error(error.response?.data?.message || 'Failed to fetch analytics.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [navigate]);

  // Error boundary for charts
  const ChartWrapper = ({ children }) => {
    try {
      return children;
    } catch (error) {
      console.error('Chart rendering error:', error);
      setChartError(error.message);
      return <p className="text-red-400">Error rendering chart: {error.message}</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-purple-300 text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (chartError) {
    return (
      <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400 text-lg">Chart error: {chartError}</p>
        </div>
      </div>
    );
  }

  // Sales Chart Data
  const salesChartData = {
    labels: ['Total Sales', 'Total Orders'],
    datasets: [
      {
        label: 'Sales & Orders',
        data: [analyticsData.sales, analyticsData.orders * 100], // Scale orders for visibility
        backgroundColor: ['rgba(147, 51, 234, 0.6)', 'rgba(59, 130, 246, 0.6)'],
        borderColor: ['rgba(147, 51, 234, 1)', 'rgba(59, 130, 246, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const salesChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
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

  // Product Popularity Chart Data
  const productChartData = {
    labels: [analyticsData.topProduct, 'Other Products'],
    datasets: [
      {
        data: [70, 30], // Placeholder; update backend for dynamic data
        backgroundColor: ['rgba(147, 51, 234, 0.6)', 'rgba(107, 114, 128, 0.6)'],
        borderColor: ['rgba(147, 51, 234, 1)', 'rgba(107, 114, 128, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const productChartOptions = {
    plugins: {
      legend: { labels: { color: '#d1d5db' } },
      title: {
        display: true,
        text: 'Product Popularity',
        color: '#d1d5db',
      },
    },
    maintainAspectRatio: false,
  };

  // User Engagement Chart Data
  const userChartData = {
    labels: ['Customers', 'Orders per Customer'],
    datasets: [
      {
        data: [analyticsData.customers, parseFloat(analyticsData.ordersPerCustomer)],
        backgroundColor: ['rgba(59, 130, 246, 0.6)', 'rgba(147, 191, 255, 0.6)'],
        borderColor: ['rgba(59, 130, 246, 1)', 'rgba(147, 191, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const userChartOptions = {
    plugins: {
      legend: { labels: { color: '#d1d5db' } },
      title: {
        display: true,
        text: 'User Engagement',
        color: '#d1d5db',
      },
    },
    maintainAspectRatio: false,
  };

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
                  <h1 className="text-xl font-semibold text-purple-300">Analytics</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Content */}
          <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
                  <h2 className="text-lg font-medium text-purple-300">Sales Report</h2>
                  <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
                </div>
                <div className="p-6">
                  <div className="h-64">
                    <ChartWrapper>
                      <Bar data={salesChartData} options={salesChartOptions} />
                    </ChartWrapper>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-purple-200">Total Sales: <span className="font-semibold text-purple-400">${analyticsData.sales.toLocaleString()}</span></p>
                    <p className="text-sm text-purple-200">Total Orders: <span className="font-semibold text-purple-400">{analyticsData.orders}</span></p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
                  <h2 className="text-lg font-medium text-purple-300">Product Popularity</h2>
                  <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-purple-200">Top Product: <span className="font-semibold text-purple-400">{analyticsData.topProduct}</span></p>
                  <p className="text-sm text-purple-200">Top Category: <span className="font-semibold text-purple-400">{analyticsData.topCategory}</span></p>
                  <div className="h-64">
                    <ChartWrapper>
                      <Pie data={productChartData} options={productChartOptions} />
                    </ChartWrapper>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-purple-500/30 relative overflow-hidden">
                  <h2 className="text-lg font-medium text-purple-300">User Engagement</h2>
                  <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-purple-200">Total Customers: <span className="font-semibold text-purple-400">{analyticsData.customers}</span></p>
                  <p className="text-sm text-purple-200">Orders per Customer: <span className="font-semibold text-purple-400">{analyticsData.ordersPerCustomer}</span></p>
                  <div className="h-64">
                    <ChartWrapper>
                      <Doughnut data={userChartData} options={userChartOptions} />
                    </ChartWrapper>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Analytics;