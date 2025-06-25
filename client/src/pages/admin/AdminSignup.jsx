import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill form with query parameters after OTP verification
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const emailParam = query.get('email');
    const roleParam = query.get('role');
    if (emailParam && roleParam) {
      setEmail(emailParam.toLowerCase());
      setRole(roleParam);
      // Restore form data from local storage
      const storedData = JSON.parse(localStorage.getItem('adminSignupData') || '{}');
      if (storedData.email.toLowerCase() === emailParam.toLowerCase()) {
        setName(storedData.name || '');
        setPassword(storedData.password || '');
        setRole(storedData.role || roleParam);
        // Auto-submit signup
        handleSignup({
          name: storedData.name,
          email: emailParam.toLowerCase(),
          password: storedData.password,
          role: roleParam,
        });
      }
    }
  }, [location.search]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password || !role) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const normalizedEmail = email.toLowerCase();
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/send-otp`, { email: normalizedEmail, role });
      // Store form data in local storage
      localStorage.setItem('adminSignupData', JSON.stringify({ name, email: normalizedEmail, password, role }));
      setOtpSent(true);
      toast.success('OTP sent to your email');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send OTP';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (signupData) => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/admin/signup`, {
        ...signupData,
        email: signupData.email.toLowerCase(),
      });
      localStorage.removeItem('adminSignupData');
      toast.success('Signup successful! Please log in.');
      navigate('/admin/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      toast.error(errorMessage);
      setOtpSent(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/starry-background.svg')] bg-fixed bg-cover">
      <div className="m-auto w-full max-w-md">
        <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm p-6 relative overflow-hidden">
          <Star size={12} className="absolute top-2 right-2 text-yellow-300 opacity-50" />
          <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">Admin/Vendor Signup</h2>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <label className="block text-sm text-purple-200 mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
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
              <div className="mb-4">
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
              <div className="mb-6">
                <label className="block text-sm text-purple-200 mb-2">Role</label>
                <select
                  className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/50 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <p className="text-purple-200 text-center">
              OTP sent to {email}.{' '}
              <Link
                to={`/admin/verify-otp?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`}
                className="text-purple-400 hover:text-purple-300"
              >
                Verify OTP
              </Link>
            </p>
          )}
          <p className="text-sm text-purple-200 mt-4 text-center">
            Already have an account?{' '}
            <Link to="/admin/login" className="text-purple-400 hover:text-purple-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;