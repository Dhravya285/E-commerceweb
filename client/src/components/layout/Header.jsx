"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Enhanced animation for multiple types of stars
  useEffect(() => {
    // Function to create shooting stars
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.classList.add('shooting-star');
      
      // Random position, size, and duration
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * 100;
      const length = Math.random() * 50 + 30; // Varying length
      const duration = Math.random() * 1500 + 500;
      const angle = Math.random() * 20 + 35; // Varying angle
      
      shootingStar.style.left = `${startX}px`;
      shootingStar.style.top = `${startY}px`;
      shootingStar.style.width = `${length}px`;
      shootingStar.style.transformOrigin = 'left';
      shootingStar.style.transform = `rotate(${angle}deg)`;
      shootingStar.style.animationDuration = `${duration}ms`;
      
      document.getElementById('starry-bg').appendChild(shootingStar);
      
      // Remove after animation completes
      setTimeout(() => {
        shootingStar.remove();
      }, duration);
    };
    
    // Function to create pulsating stars
    const createPulsatingStar = () => {
      const star = document.createElement('div');
      star.classList.add('pulsating-star');
      
      // Random position and size
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * 150;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 3000 + 2000;
      const delay = Math.random() * 2000;
      
      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}ms`;
      star.style.animationDelay = `${delay}ms`;
      
      document.getElementById('starry-bg').appendChild(star);
      
      // Remove after some time to manage DOM elements
      setTimeout(() => {
        star.remove();
      }, 30000);
    };
    
    // Function to create glowing stars
    const createGlowingStar = () => {
      const star = document.createElement('div');
      star.classList.add('glowing-star');
      
      // Random position and properties
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * 150;
      const size = Math.random() * 4 + 2;
      const intensity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 5000 + 3000;
      const hue = Math.random() > 0.7 ? 60 : 220; // Yellow or blue
      
      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = `hsla(${hue}, 100%, 80%, ${intensity})`;
      star.style.boxShadow = `0 0 ${size * 2}px ${size}px hsla(${hue}, 100%, 70%, ${intensity * 0.5})`;
      star.style.animationDuration = `${duration}ms`;
      
      document.getElementById('starry-bg').appendChild(star);
      
      // Remove after some time
      setTimeout(() => {
        star.remove();
      }, 30000);
    };
    
    // Create initial stars
    for (let i = 0; i < 15; i++) {
      createPulsatingStar();
      if (i % 3 === 0) createGlowingStar();
    }
    
    // Periodically create new stars
    const shootingStarInterval = setInterval(() => {
      createShootingStar();
    }, 2000);
    
    const pulsatingStarInterval = setInterval(() => {
      createPulsatingStar();
    }, 3000);
    
    const glowingStarInterval = setInterval(() => {
      createGlowingStar();
    }, 5000);
    
    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(pulsatingStarInterval);
      clearInterval(glowingStarInterval);
    };
  }, []);

  return (
    <header className="relative z-50">
      {/* Enhanced starry night background */}
      <div id="starry-bg" className="absolute inset-0 bg-indigo-950 overflow-hidden -z-10">
        {/* Static star field with different densities */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 25% 25%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 75% 75%, rgba(255, 255, 255, 0.8) 1%, transparent 1%),
              radial-gradient(1.5px 1.5px at 50% 50%, rgba(255, 255, 255, 0.9) 1%, transparent 1%),
              radial-gradient(1px 1px at 30% 70%, rgba(255, 255, 230, 0.7) 1%, transparent 1%),
              radial-gradient(2.5px 2.5px at 80% 20%, rgba(255, 255, 255, 0.7) 1%, transparent 1%)
            `,
            backgroundSize: "200px 200px, 150px 150px, 100px 100px, 250px 250px, 300px 300px",
            animation: "star-rotation 500s linear infinite"
          }}
        ></div>
        
        {/* Secondary rotating star layer */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 10% 10%, white 1%, transparent 1%),
              radial-gradient(1.5px 1.5px at 60% 40%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 30% 80%, white 1%, transparent 1%)
            `,
            backgroundSize: "250px 250px, 300px 300px, 350px 350px",
            animation: "star-rotation-reverse 600s linear infinite"
          }}
        ></div>
        
        {/* Blue nebula effects */}
        <div className="absolute inset-0 opacity-30" 
          style={{
            background: "radial-gradient(circle at 70% 20%, rgba(111, 126, 225, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(146, 109, 222, 0.4) 0%, transparent 25%)"
          }}
        ></div>
        
        {/* Animated star clusters */}
        <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
        <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with glowing effect */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white font-comic relative">
              Starry Comics
              <span className="absolute inset-0 blur-sm text-yellow-200 opacity-70 animate-pulse">Starry Comics</span>
            </span>
          </Link>

          {/* Desktop Navigation with enhanced hover effects */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Shop", "Collections", "About"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white hover:text-yellow-300 transition-all duration-300 font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Enhanced Search Bar with glow effect */}
          <div className="hidden md:flex items-center bg-indigo-900/30 rounded-full px-4 py-2 border border-indigo-700/50 shadow-[0_0_10px_rgba(122,122,255,0.3)]">
            <input
              type="text"
              placeholder="Search for superhero tees..."
              className="bg-transparent text-white placeholder-indigo-300 focus:outline-none w-64"
            />
            <Search className="text-indigo-300 ml-2 hover:text-yellow-300 transition-colors cursor-pointer" size={20} />
          </div>

          {/* Action Icons with badges and animations */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-indigo-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-[0_0_5px_rgba(234,179,8,0.5)]">
                3
              </span>
            </Link>
            <Link to="/profile" className="text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110">
              <User size={24} />
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with backdrop blur and animations */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-indigo-900/80 backdrop-blur-md p-4 border-t border-indigo-700 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              {["Home", "Shop", "Collections", "About"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white hover:text-yellow-300 transition-colors font-medium py-2 border-b border-indigo-800/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="flex items-center bg-indigo-800/50 rounded-full px-4 py-2 border border-indigo-700/50 shadow-[0_0_8px_rgba(122,122,255,0.3)]">
                <input
                  type="text"
                  placeholder="Search for superhero tees..."
                  className="bg-transparent text-white placeholder-indigo-300 focus:outline-none w-full"
                />
                <Search className="text-indigo-300 ml-2 hover:text-yellow-300 transition-colors cursor-pointer" size={20} />
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes star-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes star-rotation-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .shooting-star {
          position: absolute;
          height: 2px;
          background: linear-gradient(to right, transparent, white, white, transparent);
          border-radius: 50%;
          box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.6);
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        
        .pulsating-star {
          position: absolute;
          border-radius: 50%;
          background-color: white;
          animation: pulsate infinite ease-in-out;
        }
        
        @keyframes pulsate {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        .glowing-star {
          position: absolute;
          border-radius: 50%;
          animation: glow infinite ease-in-out alternate;
        }
        
        @keyframes glow {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 1; }
        }
        
        .star-cluster-1 {
          top: 20%;
          left: 15%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 8px 8px;
          border-radius: 50%;
          animation: cluster-drift 60s infinite linear alternate;
        }
        
        .star-cluster-2 {
          bottom: 30%;
          right: 20%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 10px 10px;
          border-radius: 50%;
          animation: cluster-drift 70s infinite linear alternate-reverse;
        }
        
        @keyframes cluster-drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 20px) rotate(180deg); }
          100% { transform: translate(-30px, -20px) rotate(360deg); }
        }
      `}</style>
    </header>
  )
}