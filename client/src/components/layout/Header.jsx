"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const createShootingStar = () => {
      const shootingStar = document.createElement("div");
      shootingStar.classList.add("shooting-star");

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * 100;
      const length = Math.random() * 50 + 30;
      const duration = Math.random() * 1500 + 500;
      const angle = Math.random() * 20 + 35;

      shootingStar.style.left = `${startX}px`;
      shootingStar.style.top = `${startY}px`;
      shootingStar.style.width = `${length}px`;
      shootingStar.style.transformOrigin = "left";
      shootingStar.style.transform = `rotate(${angle}deg)`;
      shootingStar.style.animationDuration = `${duration}ms`;

      document.getElementById("starry-bg").appendChild(shootingStar);

      setTimeout(() => {
        shootingStar.remove();
      }, duration);
    };

    const createPulsatingStar = () => {
      const star = document.createElement("div");
      star.classList.add("pulsating-star");

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

      document.getElementById("starry-bg").appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 30000);
    };

    const createGlowingStar = () => {
      const star = document.createElement("div");
      star.classList.add("glowing-star");

      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * 150;
      const size = Math.random() * 4 + 2;
      const intensity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 5000 + 3000;
      const hue = Math.random() > 0.7 ? 220 : 240;

      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = `hsla(${hue}, 100%, 80%, ${intensity})`;
      star.style.boxShadow = `0 0 ${size * 2}px ${size}px hsla(${hue}, 100%, 70%, ${intensity * 0.5})`;
      star.style.animationDuration = `${duration}ms`;

      document.getElementById("starry-bg").appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 30000);
    };

    for (let i = 0; i < 15; i++) {
      createPulsatingStar();
      if (i % 3 === 0) createGlowingStar();
    }

    const shootingStarInterval = setInterval(createShootingStar, 2000);
    const pulsatingStarInterval = setInterval(createPulsatingStar, 3000);
    const glowingStarInterval = setInterval(createGlowingStar, 5000);

    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(pulsatingStarInterval);
      clearInterval(glowingStarInterval);
    };
  }, []);

  return (
    <header className="relative z-50">
      {/* Starry Background */}
      <div id="starry-bg" className="absolute inset-0 bg-black overflow-hidden -z-10">
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
            animation: "star-rotation 500s linear infinite"
          }}
        ></div>

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

        <div className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)"
          }}
        ></div>

        <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
        <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white font-comic relative">
              Iconix
              <span className="absolute inset-0 blur-sm text-blue-300 opacity-70 animate-pulse">Iconix</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Shop", "Men", "Women", "About"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white hover:text-blue-300 transition-all duration-300 font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Icons + Auth */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-110 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-blue-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-[0_0_5px_rgba(0,191,255,0.5)]">
                3
              </span>
            </Link>
            <Link to="/profile" className="text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
              <User size={24} />
            </Link>

            {/* Sign In / Sign Up */}
            <Link to="/login" className="text-sm text-blue-300 border border-blue-500 px-3 py-1 rounded-lg hover:bg-blue-800/40 transition-all">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all">
              Sign Up
            </Link>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md p-4 border-t border-blue-900 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              {["Home", "Shop", "Men", "Women", "About"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white hover:text-blue-300 transition-colors font-medium py-2 border-b border-blue-900/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link to="/signin" className="text-white hover:text-blue-300 transition-colors font-medium py-2 border-b border-blue-900/30" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" className="text-white hover:text-blue-300 transition-colors font-medium py-2 border-b border-blue-900/30" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
              <div className="flex items-center bg-black/50 rounded-full px-4 py-2 border border-blue-900/50 shadow-[0_0_8px_rgba(0,191,255,0.3)]">
                <input
                  type="text"
                  placeholder="Search for superhero tees..."
                  className="bg-transparent text-white placeholder-blue-300 focus:outline-none w-full"
                />
                <Search className="text-blue-300 ml-2 hover:text-blue-400 transition-colors cursor-pointer" size={20} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
