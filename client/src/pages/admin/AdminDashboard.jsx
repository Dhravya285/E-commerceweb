import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Tag, BarChart, Settings, LogOut, ShoppingBag, DollarSign, TrendingUp, UserPlus, Search, Bell, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample dashboard data
  const dashboardData = {
    totalSales: 125850,
    totalOrders: 256,
    totalCustomers: 1245,
    averageOrderValue: 491.60,
    recentOrders: [
      { id: 'ORD123458', customer: 'Tony Stark', date: '2023-10-18', total: 2499, status: 'Delivered' },
      { id: 'ORD123459', customer: 'Bruce Wayne', date: '2023-10-17', total: 1899, status: 'Processing' },
      { id: 'ORD123460', customer: 'Diana Prince', date: '2023-10-16', total: 849, status: 'Shipped' },
      { id: 'ORD123461', customer: 'Steve Rogers', date: '2023-10-15', total: 1599, status: 'Pending' },
      { id: 'ORD123462', customer: 'Natasha Romanoff', date: '2023-10-14', total: 999, status: 'Delivered' }
    ],
    topProducts: [
      { id: 1, name: 'Spider-Man: Web Slinger Graphic Tee', sales: 42, revenue: 33558 },
      { id: 2, name: 'Batman: Dark Knight Oversized Tee', sales: 38, revenue: 34162 },
      { id: 6, name: 'Deadpool: Chimichangas Oversized Tee', sales: 35, revenue: 31465 },
      { id: 3, name: 'Iron Man: Arc Reactor Glow Print', sales: 31, revenue: 30969 }
    ]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-indigo-800 text-white">
          <div className="flex items-center justify-center h-16 bg-indigo-900">
            <span className="text-xl font-bold">Starry Comics</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link to="/admin" className="flex items-center px-4 py-2 text-white bg-indigo-700 rounded-md">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link to="/admin/products" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <Package className="mr-3 h-5 w-5" />
                Products
              </Link>
              <Link to="/admin/orders" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <ShoppingBag className="mr-3 h-5 w-5" />
                Orders
              </Link>
              <Link to="/admin/customers" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <Users className="mr-3 h-5 w-5" />
                Customers
              </Link>
              <Link to="/admin/discounts" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <Tag className="mr-3 h-5 w-5" />
                Discounts
              </Link>
              <Link to="/admin/analytics" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <BarChart className="mr-3 h-5 w-5" />
                Analytics
              </Link>
              <Link to="/admin/settings" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
            <div className="px-4 py-4 border-t border-indigo-700">
              <button className="flex items-center w-full px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-800 text-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex items-center justify-center h-16 bg-indigo-900">
              <span className="text-xl font-bold">Starry Comics</span>
            </div>
            <div className="flex-1 overflow-y-auto pt-5 pb-4">
              <nav className="mt-5 px-2 space-y-1">
                <Link to="/admin" className="flex items-center px-4 py-2 text-white bg-indigo-700 rounded-md">
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                <Link to="/admin/products" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                  <Package className="mr-3 h-5 w-5" />
                  Products
                </Link>
                <Link to="/admin/orders" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                  <ShoppingBag className="mr-3 h-5 w-5" />
                  Orders
                </Link>
                <Link to="/admin/customers" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                  <Users className="mr-3 h-5 w-5" />
                  Customers
                </Link>
                <Link to="/admin/discounts" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                  <Tag className="mr-3 h-5 w-5" />
                  Discounts
                </Link>
                <Link to="/admin/analytics" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                  <BarChart className="mr-3 h-5 w-5" />
                  Analytics
                </Link>
                <Link to="/admin/settings" className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="px-4 py-4 border-t border-indigo-700">
              <button className="flex items-center w-full px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded-md">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
                <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-4 relative flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Sales</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{dashboardData.totalSales.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>12% increase</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.totalOrders}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8% increase</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Customers</p>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.totalCustomers}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                <UserPlus className="h-4 w-4 mr-1" />
                <span>24 new today</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{dashboardData.averageOrderValue.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>3% increase</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                          <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <Link to="/admin/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  View all orders
                </Link>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Top Selling Products</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Units Sold
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.topProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link to={`/admin/products/${product.id}`} className="text-indigo-600 hover:text-indigo-800">
                            {product.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.sales}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{product.revenue.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <Link to="/admin/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  View all products
                </Link>
              </div>
            </div>
          </div>

          {/* Sales Chart Placeholder */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Sales chart will be displayed here</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
