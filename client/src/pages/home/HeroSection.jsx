

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Sample slide data with corrected URLs and alt text
const slides = [
  {
    id: "1",
    image: "https://images.bewakoof.com/t320/men-s-black-need-space-snoopy-graphic-printed-oversized-t-shirt-630667-1730989610-1.jpg",
    alt: "Men's Black Need Space Snoopy Graphic Printed Oversized T-Shirt",
  },
  {
    id: "2",
    image: "https://images.bewakoof.com/t320/men-s-black-friends-feelings-t-j-graphic-printed-oversized-t-shirt-591318-1736761721-1.jpg",
    alt: "Men's Black Friends Feelings Graphic Printed Oversized T-Shirt",
  },
  {
    id: "3",
    image: "https://images.bewakoof.com/t320/men-s-grey-wakanda-forever-graphic-printed-oversized-t-shirt-637171-1739771276-1.jpg",
    alt: "Men's Grey Wakanda Forever Graphic Printed Oversized T-Shirt",
  },
  {
    id: "4",
    image: "https://images.bewakoof.com/t640/men-s-black-marvel-moon-knight-graphic-printed-t-shirt-483825-1738673493-1.jpg",
    alt: "Men's Black Marvel Moon Knight Graphic Printed T-Shirt",
  },
  {
    id: "5",
    image: "https://images.bewakoof.com/t640/women-s-pink-avoiding-responsibilities-graphic-printed-t-shirt-585778-1738831666-1.jpg",
    alt: "Women's Pink Avoiding Responsibilities Graphic Printed T-Shirt",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-scroll slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  // Generate glowing stars dynamically
  const renderGlowingStars = () => {
    const stars = []
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1
      const top = Math.random() * 100
      const left = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 3 + 2
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
      )
    }
    return stars
  }

  // Generate shooting stars
  const renderShootingStars = () => {
    const shootingStars = []
    for (let i = 0; i < 5; i++) {
      const width = Math.random() * 100 + 50
      const top = Math.random() * 100
      const left = Math.random() * 50
      const delay = Math.random() * 15
      const duration = Math.random() * 2 + 1
      const angle = Math.random() * 60 - 30

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
      )
    }
    return shootingStars
  }

  // Generate pulsating stars
  const renderPulsatingStars = () => {
    const stars = []
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1
      const top = Math.random() * 100
      const left = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 3 + 3

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
      )
    }
    return stars
  }

  return (
    <section className="relative h-screen w-full bg-gradient-to-b from-gray-900 to-blue-950 text-white overflow-hidden m-0 p-0">
      {/* Container for stars */}
      <div id="starry-bg" className="absolute inset-0 overflow-hidden">
        {/* Enhanced star layers */}
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
            animation: "star-rotation-reverse 600s linear infinite",
          }}
        />

        {/* Deep space nebula effects */}
        <div
          class blueprint="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)",
          }}
        />

        {/* Animated star clusters */}
        <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
        <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>

        {/* Glowing, pulsating, and shooting stars */}
        {renderGlowingStars()}
        {renderPulsatingStars()}
        {renderShootingStars()}

        {/* Additional nebula glow */}
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

      <div className="relative z-10 flex flex-col h-full w-full lg:flex-row items-stretch justify-between">
        {/* Left: Tagline and Paragraph */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-4">
          <div className="text-center lg:text-left max-w-lg">
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
            >
              Empower Your Epic: Wear the Legend
            </h1>
            <p className="text-blue-300 text-md mb-6">
              Dive into a universe of premium superhero tees, where Marvel, DC, and Anime legends come to life. Crafted
              for fans, our collection blends iconic designs with stellar comfort. Start your adventure today!
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 font-medium py-2 px-6 rounded-lg border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right: Carousel */}
        <div className="lg:w-1/2 w-full h-full relative">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-xl border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=500&width=500" // Fallback placeholder
                    e.target.alt = "Image failed to load"
                  }}
                />
              </div>
            ))}
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-blue-500" : "bg-blue-900/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
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

        .shooting-star {
          position: absolute;
          height: 2px;
          background: linear-gradient(to right, transparent, white, white, transparent);
          border-radius: 50%;
          box-shadow: 0 0 5px 1px rgba(0, 191, 255, 0.6);
          animation: shoot linear forwards;
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
    </section>
  )
}
