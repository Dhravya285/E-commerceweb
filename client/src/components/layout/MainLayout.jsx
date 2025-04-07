import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  // Create and manage animated elements
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
      
      document.getElementById('starry-main').appendChild(shootingStar);
      
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
      const posY = Math.random() * window.innerHeight;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 3000 + 2000;
      const delay = Math.random() * 2000;
      
      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}ms`;
      star.style.animationDelay = `${delay}ms`;
      
      document.getElementById('starry-main').appendChild(star);
      
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
      const posY = Math.random() * window.innerHeight;
      const size = Math.random() * 4 + 2;
      const intensity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 5000 + 3000;
      // Use darker blues instead of yellow to match Thor theme
      const hue = Math.random() > 0.7 ? 220 : 240; // Different shades of blue
      
      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = `hsla(${hue}, 100%, 80%, ${intensity})`;
      star.style.boxShadow = `0 0 ${size * 2}px ${size}px hsla(${hue}, 100%, 70%, ${intensity * 0.5})`;
      star.style.animationDuration = `${duration}ms`;
      
      document.getElementById('starry-main').appendChild(star);
      
      // Remove after some time
      setTimeout(() => {
        star.remove();
      }, 30000);
    };
    
    // Create star clusters
    const createStarCluster = () => {
      const container = document.getElementById('starry-main');
      if (!container) return;
      
      for (let i = 0; i < 2; i++) {
        const cluster = document.createElement('div');
        cluster.classList.add('star-cluster');
        
        const posX = Math.random() * 80 + 10;
        const posY = Math.random() * 80 + 10;
        const size = Math.random() * 30 + 20;
        
        cluster.style.left = `${posX}%`;
        cluster.style.top = `${posY}%`;
        cluster.style.width = `${size}px`;
        cluster.style.height = `${size}px`;
        
        container.appendChild(cluster);
      }
    };
    
    // Create nebula clouds with Thor-themed colors
    const createNebulaElements = () => {
      const mainElement = document.getElementById('starry-main');
      if (!mainElement) return;
      
      // Remove any existing nebulas
      const existingNebulas = mainElement.querySelectorAll('.nebula-cloud');
      existingNebulas.forEach(el => el.remove());
      
      // Create new nebula elements
      for (let i = 0; i < 8; i++) {
        const nebula = document.createElement('div');
        nebula.classList.add('nebula-cloud');
        
        // Random positioning and size
        const size = Math.random() * 300 + 200;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Thor color scheme - blue lightning and dark purple space
        const thorColors = [
          Math.random() > 0.7 ? 210 : 260, // Blue or purple hue
          Math.random() > 0.8 ? 190 : 275  // Electric blue or deep royal purple
        ];
        const hue = thorColors[Math.floor(Math.random() * thorColors.length)];
        
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
    
    // Create lightning effect (Thor's power)
    const createLightningEffect = () => {
      const container = document.getElementById('starry-main');
      if (!container) return;
      
      const lightningInterval = setInterval(() => {
        if (Math.random() > 0.7) { // Only show occasionally
          const lightning = document.createElement('div');
          lightning.classList.add('lightning-flash');
          
          // Random position
          const startX = Math.random() * window.innerWidth;
          const startY = Math.random() * (window.innerHeight * 0.5);
          
          lightning.style.left = `${startX}px`;
          lightning.style.top = `${startY}px`;
          lightning.style.width = `${Math.random() * 5 + 2}px`;
          lightning.style.height = `${Math.random() * 100 + 50}px`;
          
          container.appendChild(lightning);
          
          // Remove after animation
          setTimeout(() => {
            lightning.remove();
          }, 200);
        }
      }, 2000);
      
      return lightningInterval;
    };
    
    // Create constellation effect
    const createConstellations = () => {
      const container = document.getElementById('constellation-container');
      if (!container) return;
      
      // Clear existing constellations
      container.innerHTML = '';
      
      // Create constellation nodes
      const createConstellation = (points, centerX, centerY, rotation = 0, isThor = false) => {
        const constellationGroup = document.createElement('div');
        constellationGroup.classList.add('constellation');
        if (isThor) {
          constellationGroup.classList.add('thor-constellation');
        }
        constellationGroup.style.left = `${centerX}%`;
        constellationGroup.style.top = `${centerY}%`;
        constellationGroup.style.transform = `rotate(${rotation}deg)`;
        
        // Create stars at each point
        points.forEach((point, index) => {
          const star = document.createElement('div');
          star.classList.add('constellation-star');
          if (isThor) {
            star.classList.add('thor-constellation-star');
          }
          
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
            if (isThor) {
              line.classList.add('thor-constellation-line');
            }
            
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
      
      // Define Thor's hammer constellation
      const thorHammer = [
        { x: 0, y: 0, size: 2.5 },
        { x: 0, y: -30, size: 2 },
        { x: -20, y: -45, size: 2 },
        { x: 20, y: -45, size: 2 },
        { x: 0, y: -30, size: 2 } // Connect back
      ];
      
      // Define Thor's lightning bolt constellation
      const thorLightning = [
        { x: 0, y: -50, size: 2.5 },
        { x: 15, y: -20, size: 2 },
        { x: 0, y: 0, size: 3 },
        { x: -15, y: 30, size: 2 },
        { x: 0, y: 60, size: 2.5 }
      ];
      
      // Regular constellations
      const orion = [
        { x: -40, y: -40, size: 2 },
        { x: -30, y: -20, size: 2 },
        { x: -20, y: 0, size: 2 },
        { x: -10, y: 20, size: 2 },
        { x: 10, y: 25, size: 2 },
        { x: 30, y: 20, size: 2 }
      ];
      
      // Create multiple constellations at different positions
      createConstellation(orion, 25, 60, 0);
      createConstellation(thorHammer, 75, 30, 15, true);
      createConstellation(thorLightning, 80, 70, -10, true);
    };
    
    // Mjolnir (Thor's hammer) cursor effect
    const createMjolnirEffect = () => {
      const cursor = document.createElement('div');
      cursor.id = 'mjolnir-cursor';
      document.body.appendChild(cursor);
      
      // Update cursor position with slight delay for lightning trail effect
      const mouseListener = (e) => {
        setTimeout(() => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        }, 50);
        
        // Occasionally create lightning spark on mouse movement
        if (Math.random() > 0.9) {
          const spark = document.createElement('div');
          spark.classList.add('lightning-spark');
          spark.style.left = `${e.clientX + (Math.random() * 20 - 10)}px`;
          spark.style.top = `${e.clientY + (Math.random() * 20 - 10)}px`;
          document.body.appendChild(spark);
          
          setTimeout(() => {
            spark.remove();
          }, 300);
        }
      };
      
      document.addEventListener('mousemove', mouseListener);
      
      return () => {
        document.removeEventListener('mousemove', mouseListener);
        cursor.remove();
      };
    };
    
    // Create initial stars
    for (let i = 0; i < 15; i++) {
      createPulsatingStar();
      if (i % 3 === 0) createGlowingStar();
    }
    
    // Initialize all cosmic effects
    createStarCluster();
    createNebulaElements();
    createConstellations();
    const mjolnirCleanup = createMjolnirEffect();
    
    // Setup intervals for continuous creation of dynamic elements
    const shootingStarInterval = setInterval(() => {
      createShootingStar();
    }, 2000);
    
    const pulsatingStarInterval = setInterval(() => {
      createPulsatingStar();
    }, 3000);
    
    const glowingStarInterval = setInterval(() => {
      createGlowingStar();
    }, 5000);
    
    const lightningInterval = createLightningEffect();
    
    // Handle window resize
    const resizeHandler = () => {
      createNebulaElements();
      createConstellations();
      createStarCluster();
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // Cleanup function
    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(pulsatingStarInterval);
      clearInterval(glowingStarInterval);
      clearInterval(lightningInterval);
      window.removeEventListener('resize', resizeHandler);
      mjolnirCleanup();
      
      // Remove star layers and effects
      document.querySelectorAll('.star-layer').forEach(layer => layer.remove());
      document.body.classList.remove('starry-background');
      
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
        {/* Base gradient layer - Thor-themed dark purple with electric blue */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-purple-950"></div>
        
        {/* Static star field with different densities - darker background */}
        <div
          className="absolute inset-0 opacity-70"
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
        
        {/* Thor's special stars layer with animation */}
        <div className="absolute inset-0 opacity-70 animate-twinkle-slow"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 15% 15%, rgba(0, 191, 255, 0.9) 1%, transparent 1%),
              radial-gradient(2px 2px at 25% 25%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 35% 35%, rgba(0, 191, 255, 0.8) 1%, transparent 1%),
              radial-gradient(2px 2px at 45% 45%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 55% 55%, rgba(0, 191, 255, 0.9) 1%, transparent 1%),
              radial-gradient(2px 2px at 65% 65%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 75% 75%, rgba(0, 191, 255, 0.8) 1%, transparent 1%),
              radial-gradient(2px 2px at 85% 85%, white 1%, transparent 1%),
              radial-gradient(2px 2px at 95% 95%, rgba(0, 191, 255, 0.9) 1%, transparent 1%)
            `,
            backgroundSize: "350px 350px"
          }}
        ></div>
        
        {/* Thor's electric energy effects in the distance */}
        <div className="absolute inset-0 opacity-30" 
          style={{
            background: "radial-gradient(circle at 70% 30%, rgba(0, 191, 255, 0.3) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(138, 43, 226, 0.3) 0%, transparent 25%)"
          }}
        ></div>
        
        {/* Deep space nebula effects - darker blue tones */}
        <div className="absolute inset-0 opacity-30" 
          style={{
            background: "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)"
          }}
        ></div>
        
        {/* Animated star clusters */}
        <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
        <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>
        
        {/* Constellation container */}
        <div id="constellation-container" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      </div>
      
      {/* Container for dynamic nebula clouds, lightning and stars */}
      <div id="starry-main" className="fixed inset-0 z-0 overflow-hidden pointer-events-none"></div>
      
      {/* Content with enhanced glass effect container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-6 px-4">
          <div className="container mx-auto backdrop-blur-sm bg-black/40 rounded-lg border border-blue-500/40 shadow-[0_0_15px_rgba(0,191,255,0.3)] p-6 transition-all duration-500 hover:bg-purple-900/40 hover:border-blue-400/50">
            {children}
          </div>
        </main>
        <Footer />
      </div>
      
      {/* Global CSS for animations and Thor effects */}
      <style jsx global>{`
        /* Base starry background */
        body {
          background-color: #000000; /* Black base for deeper space feel */
          min-height: 100vh;
          overflow-x: hidden;
          cursor: none; /* Hide default cursor for custom Mjolnir cursor */
        }
        
        /* Star rotation animations */
        @keyframes star-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes star-rotation-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes twinkle-animation {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        /* Shooting star animation */
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
        
        /* Pulsating star animation */
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
        
        /* Glowing star animation */
        .glowing-star {
          position: absolute;
          border-radius: 50%;
          animation: glow infinite ease-in-out alternate;
        }
        
        @keyframes glow {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 1; }
        }
        
        /* Star cluster animations */
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
        
        /* Thor's lightning effects */
        .lightning-flash {
          position: absolute;
          background: linear-gradient(to bottom, transparent, rgba(0, 191, 255, 0.8), white, rgba(0, 191, 255, 0.8), transparent);
          border-radius: 10px;
          box-shadow: 0 0 10px 5px rgba(0, 191, 255, 0.5);
          transform-origin: top;
          animation: lightning-flash 0.2s ease-in-out;
          z-index: 2;
        }
        
        @keyframes lightning-flash {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .lightning-spark {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: rgba(0, 191, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 8px 4px rgba(0, 191, 255, 0.6);
          animation: spark-fade 0.3s forwards;
          pointer-events: none;
          z-index: 9999;
        }
        
        @keyframes spark-fade {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        /* Mjolnir cursor */
        #mjolnir-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23DDD" d="M50,20v40l-10,40h20l-10-40V20l15-10H35z"/><path fill="%2300BFFF" stroke="%23FFF" stroke-width="1" d="M45,20h10v5h-10z"/></svg>');
          background-size: contain;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          filter: drop-shadow(0 0 5px rgba(0, 191, 255, 0.8));
        }
        
        /* Nebula cloud styles */
        .nebula-cloud {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          animation: nebula-drift 180s infinite linear alternate;
          mix-blend-mode: screen;
        }
        
        @keyframes nebula-drift {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(10deg);
          }
        }
        
        /* Constellation styles with Thor-specific variants */
        .constellation {
          position: absolute;
          height: 0;
          width: 0;
        }
        
        .constellation-star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.8);
          animation: constellation-star-appear 1s ease-out forwards;
          opacity: 0;
        }
        
        .thor-constellation-star {
          background-color: #00BFFF;
          box-shadow: 0 0 6px 2px rgba(0, 191, 255, 0.8);
        }
        
        .constellation-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1));
          animation: constellation-line-appear 1.5s ease-out forwards;
          opacity: 0;
        }
        
        .thor-constellation-line {
          height: 1.5px;
          background: linear-gradient(to right, 
            rgba(0, 191, 255, 0.1), 
            rgba(0, 191, 255, 0.7), 
            rgba(0, 191, 255, 0.1));
          box-shadow: 0 0 3px rgba(0, 191, 255, 0.5);
        }
        
        @keyframes constellation-star-appear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes constellation-line-appear {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          100% {
            opacity: 0.6;
            transform: scaleX(1);
          }
        }
        
        /* Fade-in animation for content */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        
        /* Add twinkle animation for stars */
        .animate-twinkle-slow {
          animation: twinkle-animation 8s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}