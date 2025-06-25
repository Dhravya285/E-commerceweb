import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Key, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email');
  const role = query.get('role');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !otp) {
      setError('Email and OTP are required');
      toast.error('Email and OTP are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-otp`, { email, otp });
      toast.success(response.data.message);
      navigate(`/admin/signup?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'OTP verification failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/send-otp`, { email, role });
      toast.success(response.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to resend OTP';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="flex h-screen bg-slate-900 text-white bg-[url('/static/backgrounds/starry-background.svg')] bg-fixed bg-cover">
      <div className="m-auto w-full max-w-md">
        <div className="bg-slate-800/80 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm p-6">
          <Star size={12} className="absolute top-2 right-2 text-yellow-400 opacity-50" />
          <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">Verify OTP</h2>
          <p className="text-sm text-purple-200 mb-4 text-center">
            Enter the OTP sent to <span className="font-semibold">{email}</span>
          </p>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <label className="block text-sm text-purple-200 mb-2">OTP</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-600" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-purple-600/50 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.trim())}
                  maxLength={6}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
          </form>
          <p className="text-sm text-purple-200 mt-4 text-center">
            Didn't receive OTP?{' '}
            <button
              onClick={handleResendOtp}
              className="text-purple-400 hover:text-purple-300 focus:outline-none"
              disabled={loading}
            >
              Resend OTP
            </button>
          </p>
          <p className="text-sm text-purple-200 mt-2 text-center">
            Back to{' '}
            <Link to="/admin/signup" className="text-purple-400 hover:text-purple-300">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;