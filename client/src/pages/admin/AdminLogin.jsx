import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      toast.error('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/auth/admin/login', {
        email: email.toLowerCase(),
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default header
      toast.success('Login successful!');
      navigate('/admin');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
      <div className="m-auto w-full max-w-md">
        <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm p-6 relative overflow-hidden">
          <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
          <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">Admin/Vendor Login</h2>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm text-purple-200 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-purple-200 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-sm text-purple-200 mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/admin/signup" className="text-purple-400 hover:text-purple-300">
              Sign Up
            </Link>
          </p>
          <p className="text-sm text-purple-200 mt-2 text-center">
            Forgot password?{' '}
            <Link to="/admin/reset-password" className="text-purple-400 hover:text-purple-300">
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;