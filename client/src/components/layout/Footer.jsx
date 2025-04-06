import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-white">
      {/* Starry night effect at the top of the footer */}
      <div className="h-8 bg-gradient-to-b from-transparent to-indigo-950 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px)",
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">Starry Comics</h3>
            <p className="text-indigo-200 mb-4">
              Your one-stop shop for premium superhero-themed t-shirts and merchandise. Bringing comic book magic to
              your wardrobe!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 hover:text-yellow-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-yellow-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-yellow-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-yellow-300 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">Quick Links</h3>
            <ul className="space-y-2">
              {["Shop All", "New Arrivals", "Best Sellers", "Discounts", "Size Guide"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-indigo-200 hover:text-yellow-300 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">Categories</h3>
            <ul className="space-y-2">
              {["Marvel Universe", "DC Comics", "Anime Superheroes", "Classic Comics", "Sci-Fi & Fantasy"].map(
                (item) => (
                  <li key={item}>
                    <Link to="#" className="text-indigo-200 hover:text-yellow-300 transition-colors">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-yellow-300 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-indigo-200">123 Comic Lane, Superhero City, Universe 616</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-yellow-300 mr-2 flex-shrink-0" size={18} />
                <span className="text-indigo-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-yellow-300 mr-2 flex-shrink-0" size={18} />
                <span className="text-indigo-200">support@starrycomics.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Starry Comics. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-indigo-300 text-sm hover:text-yellow-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-indigo-300 text-sm hover:text-yellow-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-indigo-300 text-sm hover:text-yellow-300 transition-colors">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

