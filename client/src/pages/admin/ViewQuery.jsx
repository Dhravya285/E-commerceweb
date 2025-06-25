import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Mail, User, MessageSquare, Calendar, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ViewQuery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuery = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to view query.');
        navigate('/login');
        return;
      }

      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        setError('Invalid query ID');
        toast.error('Invalid query ID');
        navigate('/admin/customers');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/queries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuery(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching query:', {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data,
          } : null,
        });
        const errorMessage = error.response?.data?.message || 'Failed to load query';
        setError(errorMessage);
        toast.error(errorMessage);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          navigate('/admin/customers');
        }
      }
    };
    fetchQuery();
  }, [id, navigate]);

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
        <p className="text-blue-300 text-lg">Loading query...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <p className="text-blue-400 mb-4">{error}</p>
          <Link to="/admin/customers" className="text-blue-300 hover:text-blue-400">
            Back to Queries
          </Link>
        </div>
      </div>
    );
  }

  return (
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="bg-black/40 rounded-xl shadow-lg border border-blue-900/50 backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-blue-900/50 relative overflow-hidden">
            <h2 className="text-lg font-medium text-white">Query Details</h2>
            <Star size={12} className="absolute top-2 right-2 text-yellow-400 opacity-50" />
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-blue-300" />
              <div>
                <p className="text-sm text-blue-400">Name</p>
                <p className="text-white">{query.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-300" />
              <div>
                <p className="text-sm text-blue-400">Email</p>
                <p className="text-white">{query.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-blue-300" />
              <div>
                <p className="text-sm text-blue-400">Message</p>
                <p className="text-white whitespace-pre-wrap">{query.message}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-300" />
              <div>
                <p className="text-sm text-blue-400">Submitted</p>
                <p className="text-white">{new Date(query.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="pt-4">
              <Link
                to="/admin/customers"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
              >
                Back to Queries
              </Link>
            </div>
          </div>
        </div>
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
  );
};

export default ViewQuery;