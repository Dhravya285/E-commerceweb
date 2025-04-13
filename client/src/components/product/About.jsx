"use client"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

// Sample team members
const teamMembers = [
  {
    name: "Alex Parker",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Comic enthusiast and entrepreneur with a passion for bringing superhero fashion to everyday life.",
  },
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Former Marvel artist with an eye for translating comic art into wearable fashion.",
  },
  {
    name: "Michael Chen",
    role: "Head of Product",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Tech and comic book geek who ensures our products meet the highest quality standards.",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Digital marketing expert who helps spread our superhero fashion revolution worldwide.",
  },
]

// Timeline events
const timelineEvents = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Founded in a small garage by Alex Parker, with just 5 t-shirt designs featuring classic superheroes.",
  },
  {
    year: "2019",
    title: "First Store",
    description: "Opened our first physical store in Mumbai, expanding our collection to include 50+ designs.",
  },
  {
    year: "2020",
    title: "Going Digital",
    description: "Launched our e-commerce platform during the pandemic, reaching comic fans nationwide.",
  },
  {
    year: "2021",
    title: "Official Partnerships",
    description: "Secured official licensing partnerships with Marvel and DC Comics for authentic merchandise.",
  },
  {
    year: "2022",
    title: "International Expansion",
    description: "Expanded operations to 5 countries, bringing superhero fashion to fans worldwide.",
  },
  {
    year: "2023",
    title: "Today",
    description: "Over 500,000 happy customers and counting, with a community of superhero fashion enthusiasts.",
  },
]

const AboutPage = () => {
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
        />,
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
        />,
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
        />,
      )
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
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
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)",
          }}
        />

        {/* Animated star clusters */}
        <div className="star-cluster-1 absolute w-32 h-32 opacity-40"></div>
        <div className="star-cluster-2 absolute w-40 h-40 opacity-40 right-0"></div>

        {/* New enhanced glowing stars */}
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            About Iconix
          </h1>
          <p className="text-blue-300 text-lg md:text-xl max-w-3xl mx-auto">
            We're on a mission to bring the excitement and inspiration of comic book heroes into everyday fashion.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
              >
                Our Story
              </h2>
              <p className="text-blue-300 mb-4">
                Iconix began with a simple idea: to create high-quality, comfortable apparel that celebrates the
                superheroes we all love.  a lifelong comic book enthusiast, our company
                started with just five t-shirt designs in a small garage in Bangalore.
              </p>
              <p className="text-blue-300 mb-4">
                What began as a passion project quickly grew into something bigger. Comic fans from across India
                discovered our unique designs and attention to detail. Today, we're proud to offer officially licensed
                merchandise from Marvel, DC, and popular anime franchises, bringing authentic superhero fashion to fans
                worldwide.
              </p>
              <p className="text-blue-300">
                Our commitment to quality, creativity, and customer satisfaction remains at the heart of everything we
                do. Each product is designed with the same passion and excitement that inspired our founder's first
                sketches.
              </p>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Our Story"
                className="rounded-lg w-full h-auto shadow-[0_0_15px_rgba(0,191,255,0.3)]"
              />
              <div className="absolute -top-4 -right-4 transform rotate-12 z-20">
                <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
                  POW!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-bold text-white mb-6"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Our Mission
          </h2>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
            <p className="text-blue-300 text-lg mb-6">
              To inspire everyday heroism through fashion that celebrates the characters and stories we love.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-900/50">
                <h3 className="text-xl font-bold text-white mb-3">Quality</h3>
                <p className="text-blue-300">
                  We use premium materials and printing techniques to ensure our products are as exceptional as the
                  heroes they feature.
                </p>
              </div>
              <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-900/50">
                <h3 className="text-xl font-bold text-white mb-3">Authenticity</h3>
                <p className="text-blue-300">
                  We work directly with official licensors to create merchandise that truly captures the essence of
                  beloved characters.
                </p>
              </div>
              <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-900/50">
                <h3 className="text-xl font-bold text-white mb-3">Community</h3>
                <p className="text-blue-300">
                  We're building a global community of fans who express their passion and identity through our products.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-blue-300 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Our Journey
          </h2>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-blue-900/50"></div>

              {/* Timeline events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                  >
                    <div className="hidden md:block w-1/2"></div>
                    <div
                      className={`absolute left-0 md:left-1/2 transform translate-y-1 md:translate-y-0 md:translate-x-[-50%] w-8 h-8 rounded-full bg-blue-900 border-4 border-blue-500 shadow-[0_0_10px_rgba(0,191,255,0.7)] z-10`}
                    ></div>
                    <div className={`relative ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-900/50">
                        <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 text-sm font-bold rounded-full mb-2">
                          {event.year}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-blue-300">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ textShadow: "0 0 10px rgba(100, 200, 255, 0.7)" }}
          >
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-blue-400 mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Visit Us</h4>
                    <p className="text-blue-300">
                      Comic Tees HQ, 123 Hero Avenue
                      <br />
                      Mumbai, Maharashtra 400001
                      <br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-blue-400 mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Email Us</h4>
                    <p className="text-blue-300">
                      <a href="mailto:hello@comictees.com" className="hover:text-blue-200">
                        hello@comictees.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-blue-400 mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Call Us</h4>
                    <p className="text-blue-300">+91 (22) 1234 5678</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 p-3 rounded-full border border-blue-900/50 transition-all duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 p-3 rounded-full border border-blue-900/50 transition-all duration-300"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 p-3 rounded-full border border-blue-900/50 transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 p-3 rounded-full border border-blue-900/50 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
              <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-blue-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-black/30 border border-blue-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-blue-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-black/30 border border-blue-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-blue-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-black/30 border border-blue-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-blue-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-black/30 border border-blue-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 py-3 px-6 rounded-lg border border-blue-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all duration-300 w-full"
                >
                  Send Message
                </button>
              </form>
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
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
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
          0%, 100% { opacity: 0.2; transform: scale(1); box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.2); }
          50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px 4px rgba(100, 200, 255, 0.7); }
        }
        
        .glowing-star {
          position: absolute;
          border-radius: 50%;
          background-color: white;
          animation: glow 4s infinite ease-in-out alternate;
        }
        
        @keyframes glow {
          0% { transform: scale(0.8); opacity: 0.6; box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.4); }
          100% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 15px 5px rgba(100, 200, 255, 0.8); }
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
  )
}

export default AboutPage
