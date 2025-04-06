import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  // Create and manage animated elements
  useEffect(() => {
    // Create nebula clouds
    const createNebulaElements = () => {
      const mainElement = document.getElementById('starry-main');
      if (!mainElement) return;
      
      // Remove any existing nebulas
      const existingNebulas = mainElement.querySelectorAll('.nebula-cloud');
      existingNebulas.forEach(el => el.remove());
      
      // Create new nebula elements
      for (let i = 0; i < 5; i++) {
        const nebula = document.createElement('div');
        nebula.classList.add('nebula-cloud');
        
        // Random positioning and size
        const size = Math.random() * 300 + 200;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const hue = Math.random() * 60 + 220; // Blue to purple hues
        
        nebula.style.width = `${size}px`;
        nebula.style.height = `${size}px`;
        nebula.style.left = `${left}%`;
        nebula.style.top = `${top}%`;
        nebula.style.background = `radial-gradient(circle at center, 
                                  hsla(${hue}, 80%, 60%, 0.1) 0%,
                                  hsla(${hue}, 80%, 60%, 0.05) 30%, 
                                  transparent 70%)`;
        
        mainElement.appendChild(nebula);
      }
    };
    
    // Create floating stars with random movement
    const createFloatingStars = () => {
      const container = document.getElementById('floating-stars-container');
      if (!container) return;
      
      // Clear existing stars
      container.innerHTML = '';
      
      // Create various types of floating stars
      for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.classList.add('floating-star');
        
        // Randomize properties
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 100 + 50;
        const delay = Math.random() * -50;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
      }
    };
    
    // Create constellation effect
    const createConstellations = () => {
      const container = document.getElementById('constellation-container');
      if (!container) return;
      
      // Clear existing constellations
      container.innerHTML = '';
      
      // Create constellation nodes
      const createConstellation = (points, centerX, centerY, rotation = 0) => {
        const constellationGroup = document.createElement('div');
        constellationGroup.classList.add('constellation');
        constellationGroup.style.left = `${centerX}%`;
        constellationGroup.style.top = `${centerY}%`;
        constellationGroup.style.transform = `rotate(${rotation}deg)`;
        
        // Create stars at each point
        points.forEach((point, index) => {
          const star = document.createElement('div');
          star.classList.add('constellation-star');
          
          const size = point.size || (Math.random() * 2 + 1.5);
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.left = `${point.x}px`;
          star.style.top = `${point.y}px`;
          star.style.animationDelay = `${index * 0.15}s`;
          
          constellationGroup.appendChild(star);
          
          // Connect stars with lines (except for the last star)
          if (index < points.length - 1) {
            const line = document.createElement('div');
            line.classList.add('constellation-line');
            
            // Calculate line position and angle
            const x1 = point.x;
            const y1 = point.y;
            const x2 = points[index + 1].x;
            const y2 = points[index + 1].y;
            
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            line.style.width = `${length}px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1 + size/2}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transformOrigin = '0 center';
            line.style.animationDelay = `${index * 0.3 + 0.3}s`;
            
            constellationGroup.appendChild(line);
          }
        });
        
        container.appendChild(constellationGroup);
      };
      
      // Define some constellation patterns
      const bigDipper = [
        { x: 0, y: 0, size: 2 },
        { x: 20, y: -5, size: 2 },
        { x: 40, y: -10, size: 2 },
        { x: 50, y: -25, size: 2.5 },
        { x: 65, y: -20, size: 2 },
        { x: 75, y: -5, size: 2 },
        { x: 90, y: 5, size: 2 }
      ];
      
      const orion = [
        { x: -40, y: -40, size: 2.5 },
        { x: -30, y: -20, size: 2 },
        { x: -20, y: 0, size: 2 },
        { x: -10, y: 20, size: 2.5 },
        { x: 10, y: 25, size: 2 },
        { x: 30, y: 20, size: 2 },
        { x: 5, y: 0, size: 3 },
        { x: 15, y: -15, size: 2 },
        { x: 25, y: -35, size: 2.5 }
      ];
      
      const cassiopeia = [
        { x: -30, y: 0, size: 2 },
        { x: -15, y: -15, size: 2.5 },
        { x: 0, y: -10, size: 2 },
        { x: 15, y: -25, size: 2 },
        { x: 30, y: -15, size: 2.5 }
      ];
      
      // Create multiple constellations at different positions
      createConstellation(bigDipper, 70, 30, 15);
      createConstellation(orion, 25, 60, 0);
      createConstellation(cassiopeia, 80, 75, -10);
    };
    
    // Create starfall effect
    const createStarfall = () => {
      const container = document.getElementById('starry-main');
      if (!container) return;
      
      setInterval(() => {
        // Create multiple shooting stars in a cascade
        const starCount = Math.floor(Math.random() * 5) + 2;
        let delay = 0;
        
        for (let i = 0; i < starCount; i++) {
          setTimeout(() => {
            const star = document.createElement('div');
            star.classList.add('shooting-star');
            
            // Random position and properties
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * (window.innerHeight * 0.3);
            const size = Math.random() * 3 + 1;
            const length = Math.random() * 100 + 50;
            const duration = Math.random() * 1000 + 700;
            
            star.style.width = `${length}px`;
            star.style.height = `${size}px`;
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            star.style.animationDuration = `${duration}ms`;
            
            container.appendChild(star);
            
            // Remove after animation
            setTimeout(() => {
              star.remove();
            }, duration);
          }, delay);
          
          delay += Math.random() * 200 + 100;
        }
      }, 8000); // Create starfall every 8 seconds
    };

    createNebulaElements();
    createFloatingStars();
    createConstellations();
    createStarfall();
    
    window.addEventListener('resize', () => {
      createNebulaElements();
      createFloatingStars();
      createConstellations();
    });
    
    return () => {
      window.removeEventListener('resize', createNebulaElements);
      // Clear any remaining intervals to prevent memory leaks
      const highestId = window.setTimeout(() => {}, 0);
      for (let i = 0; i < highestId; i++) {
        window.clearTimeout(i);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      {/* Enhanced background with multiple layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950"></div>
        
        {/* Small stars layer */}
        <div className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 10% 10%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 20% 20%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 30% 30%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 40% 40%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 50% 50%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 60% 60%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 70% 70%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 80% 80%, white 1%, transparent 1%),
              radial-gradient(1px 1px at 90% 90%, white 1%, transparent 1%)
            `,
            backgroundSize: '400px 400px'
          }}
        ></div>
        
        {/* Medium stars layer with animation */}
        <div className="absolute inset-0 opacity-70 animate-twinkle-slow"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 15% 15%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 25% 25%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 35% 35%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 45% 45%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 55% 55%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 65% 65%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 75% 75%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 85% 85%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 95% 95%, white 1%, transparent 1%)
            `,
            backgroundSize: '350px 350px'
          }}
        ></div>
        
        {/* Larger stars layer with different animation timing */}
        <div className="absolute inset-0 opacity-70 animate-twinkle-fast"
          style={{
            backgroundImage: `
              radial-gradient(3px 3px at 5% 5%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 15% 15%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 25% 25%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 35% 35%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 45% 45%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 55% 55%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 65% 65%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 75% 75%, white 1%, transparent 1%),
              radial-gradient(3px 3px at 85% 85%, white 1%, transparent 1%)
            `,
            backgroundSize: '500px 500px'
          }}
        ></div>
        
        {/* Distant galaxies */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-64 h-64 rounded-full blur-2xl bg-blue-500/20 top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-48 h-48 rounded-full blur-2xl bg-purple-500/20 top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-56 h-56 rounded-full blur-2xl bg-indigo-500/20 bottom-1/4 left-3/4 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        {/* Floating stars container */}
        <div id="floating-stars-container" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
        
        {/* Constellation container */}
        <div id="constellation-container" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      </div>
      
      {/* Container for dynamic nebula clouds */}
      <div id="starry-main" className="fixed inset-0 z-0 overflow-hidden pointer-events-none"></div>
      
      {/* Content with glass effect container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-6 px-4">
          <div className="container mx-auto backdrop-blur-sm bg-indigo-900/20 rounded-lg border border-indigo-800/30 shadow-lg p-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}