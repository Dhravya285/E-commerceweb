

import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/newsletter/subscribe`, { email });
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to subscribe. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Comic-style background with stars and speech bubbles */}
      <div className="absolute inset-0 bg-indigo-900">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px)",
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        ></div>

        {/* Comic speech bubble decorations */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-red-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-20 w-30 h-30 bg-blue-500 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-2xl transform rotate-1">
          <div className="text-center mb-6 transform -rotate-1">
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">
              Join Our Superhero Newsletter
            </h2>
            <p className="text-indigo-700">
              Subscribe to get exclusive offers, new release alerts, and superhero news!
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center transform -rotate-1">
              <p className="font-medium">Thanks for subscribing!</p>
              <p className="text-sm mt-1">
                We've sent a confirmation email to your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="transform -rotate-1">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  disabled={isLoading}
                  className="flex-grow px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-indigo-400"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"} <Send size={18} />
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-3 text-center">{error}</p>
              )}
              <p className="text-xs text-gray-500 mt-3 text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          )}

          {/* Comic-style decorative elements */}
          <div className="absolute -bottom-6 -right-6 transform rotate-12">
            <div className="bg-yellow-400 text-indigo-900 font-bold py-2 px-4 rounded-lg shadow-lg">
              POW!
            </div>
          </div>
          <div className="absolute -top-6 -left-6 transform -rotate-12">
            <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
              BOOM!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}