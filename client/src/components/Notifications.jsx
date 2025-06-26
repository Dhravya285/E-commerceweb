import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, Clock, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/discounts/public`, {
          headers,
        });
        console.log('Discounts fetched:', response.data);
        setDiscounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discounts:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load discounts';
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    };
    fetchDiscounts();
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.write(code);
    toast.success(`Copied code: ${code}`);
  };

  const isNew = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const isExpiringSoon = (expiresAt) => {
    if (!expiresAt) return false;
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const diffDays = (expiryDate - now) / (1000 * 60 * 60 * 24);
    return diffDays <= 3 && diffDays >= 0;
  };

  const renderGlowingStars = () => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1;
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

  const renderShootingStars = () => {
    const shootingStars = [];
    for (let i = 0; i < 5; i++) {
      const width = Math.random() * 100 + 50;
      const top = Math.random() * 100;
      const left = Math.random() * 50;
      const delay = Math.random() * 15;
      const duration = Math.random() * 2 + 1;
      const angle = Math.random() * 60 - 30;
      shootingStars.push(
        <div
          key={i}
          className="shooting-star"
          style={{
            width: `${width}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${angle}deg)`,
            animation: `shoot ${duration}s ${delay}s linear infinite`,
          }}
        />
      );
    }
    return shootingStars;
  };

  const renderPulsatingStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 3;
      stars.push(
        <div
          key={i}
          className="pulsating-star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            boxShadow: `0 0 ${size * 3}px ${size}px rgba(100, 200, 255, 0.8)`,
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden flex-col">
        <p className="text-blue-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-300 hover:text-blue-400"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 relative overflow-hidden">
      <div id="starry-bg" className="absolute inset-0 overflow-hidden">
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
            backgroundSize: "200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px",
            animation: "star-rotation 500s linear infinite",
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
            backgroundSize: "250px 250px, 300px 300px, 350px 350px",
            animation: "star-rotation-reverse 600s linear infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)",
          }}
        />
        <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
        <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>
        {renderGlowingStars()}
        {renderPulsatingStars()}
        {renderShootingStars()}
        <div
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "nebula-pulse 8s infinite alternate ease-in-out",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(100, 0, 255, 0.2) 0%, transparent 70%)",
            filter: "blur(30px)",
            animation: "nebula-pulse 12s infinite alternate-reverse ease-in-out",
          }}
        />
      </div>

      <div className="flex min-h-screen flex-col relative z-10">
        <div className="bg-black/40 backdrop-blur-sm border-b border-blue-900/50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-semibold text-white">Coupons & Discounts</h1>
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-blue-300 hover:text-blue-400 transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <div className="bg-black/40 rounded-xl shadow-lg border border-blue-900/50 backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-blue-900/50 relative overflow-hidden">
                <h2 className="text-lg font-medium text-white">Available Offers</h2>
                <Star size={12} className="absolute top-2 right-2 text-yellow-400 opacity-50" />
              </div>
              <div className="p-6">
                {discounts.length === 0 ? (
                  <div className="text-center text-blue-300">
                    No discounts available at the moment. Check back later!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {discounts.map((discount) => (
                      <div
                        key={discount._id}
                        className="bg-black/20 p-4 rounded-md border border-blue-900/50 flex justify-between items-center"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <Tag className="h-5 w-5 text-blue-300" />
                            <span className="text-lg font-medium text-white">{discount.code}</span>
                            {isNew(discount.createdAt) && (
                              <span className="px-2 py-1 text-xs bg-yellow-400/20 text-yellow-400 rounded-full">
                                New
                              </span>
                            )}
                            {isExpiringSoon(discount.expiresAt) && (
                              <span className="px-2 py-1 text-xs bg-red-400/20 text-red-400 rounded-full">
                                Expiring Soon
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-blue-300">{discount.discountPercentage}% off</p>
                          <p className="text-xs text-blue-400">{discount.description || 'Apply at checkout'}</p>
                          {discount.expiresAt && (
                            <p className="text-xs text-blue-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Expires: {new Date(discount.expiresAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => copyToClipboard(discount.code)}
                          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 border border-blue-900/50 transition-all duration-300"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </button>
                      </div>
                    ))}
                  </div>
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
        @keyframes star-rotation-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .shooting-star {
          position: absolute;
          height: 2px;
          background: linear-gradient(to right, transparent, white, white, transparent);
          border-radius: 50%;
          box-shadow: 0 0 5px 1px rgba(0, 191, 255, 0.6);
          animation: shoot linear forwards;
        }
        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0) rotate(inherit);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(400px) translateY(400px) rotate(inherit);
            opacity: 0;
          }
        }
        .pulsating-star {
          position: absolute;
          border-radius: 50%;
          background-color: white;
          animation: pulsate 3s infinite ease-in-out;
        }
        @keyframes pulsate {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
            box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.2);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
            box-shadow: 0 0 10px 4px rgba(100, 200, 255, 0.7);
          }
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
        .star-cluster-1 {
          top: 20%;
          left: 15%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 8px 8px;
          border-radius: 50%;
          animation: cluster-drift 60s infinite linear alternate;
          box-shadow: 0 0 20px 10px rgba(100, 200, 255, 0.2);
        }
        .star-cluster-2 {
          bottom: 30%;
          right: 20%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 10px 10px;
          border-radius: 50%;
          animation: cluster-drift 70s infinite linear alternate-reverse;
          box-shadow: 0 0 20px 10px rgba(100, 200, 255, 0.2);
        }
        @keyframes cluster-drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 20px) rotate(180deg); }
          100% { transform: translate(-30px, -20px) rotate(360deg); }
        }
        @keyframes nebula-pulse {
          0% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
          100% { opacity: 0.15; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Notifications;