import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Footer() {
  const [query, setQuery] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.name || !query.email || !query.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5002/api/queries", query);
      toast.success("Query submitted successfully!");
      setQuery({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting query:", {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      });
      toast.error(error.response?.data?.message || "Failed to submit query.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-blue-900 text-white relative overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-300">Iconix</h3>
            <p className="text-blue-400 mb-4">
              Your one-stop shop for premium superhero-themed t-shirts and merchandise. Bringing comic book magic to
              your wardrobe!
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a key={index} href={href} className="text-blue-400 hover:text-blue-300 transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2">
              {["Shop All", "New Arrivals", "Best Sellers", "Discounts", "Size Guide"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-blue-400 hover:text-blue-300 transition-all duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-blue-300 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-blue-400">123 Comic Lane, Superhero City, Universe 616</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-300 mr-2 flex-shrink-0" size={18} />
                <span className="text-blue-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-300 mr-2 flex-shrink-0" size={18} />
                <span className="text-blue-400">support@starrycomics.com</span>
              </li>
            </ul>
          </div>

          {/* Ask Query */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-300">Ask a Query</h3>
            <form onSubmit={handleQuerySubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={query.name}
                  onChange={(e) => setQuery({ ...query, name: e.target.value })}
                  className="w-full bg-black/40 border border-blue-900/50 text-blue-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={query.email}
                  onChange={(e) => setQuery({ ...query, email: e.target.value })}
                  className="w-full bg-black/40 border border-blue-900/50 text-blue-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Query"
                  value={query.message}
                  onChange={(e) => setQuery({ ...query, message: e.target.value })}
                  className="w-full bg-black/40 border border-blue-900/50 text-blue-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition-all duration-300"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              >
                <Send size={18} className="mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Query"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-900/50 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Starry Comics. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Shipping Info"].map((item) => (
              <Link key={item} to="#" className="text-blue-400 text-sm hover:text-blue-300 transition-all duration-300">
                {item}
              </Link>
            ))}
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
    </footer>
  );
}