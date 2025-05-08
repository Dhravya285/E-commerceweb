import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Tag, BarChart, Settings, LogOut, ShoppingBag, DollarSign, TrendingUp, UserPlus, Search, Bell, Menu, X, Star, Moon } from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample dashboard data with Cloudinary URLs
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
      { id: 'ORD123462', customer: 'Natasha Romanoff', date: '2023-10-14', total: 999, status: 'Delivered' },
    ],
    topProducts: [
      {
        id: 1,
        name: 'Spider-Man: Web Slinger Graphic Tee',
        sales: 42,
        revenue: 33558,
        image: 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/spiderman/spiderman-tshirt.jpg',
      },
      {
        id: 2,
        name: 'Batman: Dark Knight Oversized Tee',
        sales: 38,
        revenue: 34162,
        image: 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/batman/batman-tshirt.jpg',
      },
      {
        id: 6,
        name: 'Deadpool: Chimichangas Oversized Tee',
        sales: 35,
        revenue: 31465,
        image: 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/deadpool/deadpool-tshirt.jpg',
      },
      {
        id: 3,
        name: 'Iron Man: Arc Reactor Glow Print',
        sales: 31,
        revenue: 30969,
        image: 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/ironman/ironman-tshirt.jpg',
      },
    ],
  };

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
              <button className="flex items-center w-full px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
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
              <button className="flex items-center w-full px-4 py-2 text-purple-200 hover:bg-purple-700/50 rounded-md">
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
                  <p className="text-2xl font-semibold text-purple-400">₹{dashboardData.averageOrderValue.toFixed(2)}</p>
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
                    {dashboardData.recentOrders.map((order) => (
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
                          ₹{order.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-emerald-400/20 text-emerald-400' :
                            order.status === 'Shipped' ? 'bg-blue-400/20 text-blue-400' :
                            order.status === 'Processing' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-slate-400/20 text-slate-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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
                    {dashboardData.topProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-200">
                          <div className="flex items-center">
                            <img
                              src={product.image || 'https://res.cloudinary.com/your-cloud-name/image/upload/ecommerce/products/default/default-tshirt.jpg'}
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
                    ))}
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

          {/* Sales Chart Placeholder */}
          <div className="bg-slate-800/80 rounded-lg shadow-lg p-6 mb-8 border border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
            <h2 className="text-lg font-medium text-purple-300 mb-4">Sales Overview</h2>
            <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
              <p className="text-slate-300">Sales chart will be displayed here</p>
            </div>
            <Star size={10} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;