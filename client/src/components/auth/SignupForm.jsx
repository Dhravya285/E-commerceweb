"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ArrowRight } from "lucide-react"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Animation effect hook would go here in a real implementation
  // We'll include it in the JSX and style sections instead
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!validateForm()) return;
      setStep(2);
    } else {
      if (!selectedAvatar) {
        setError("Please select an avatar");
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5002/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            profilePicture: selectedAvatar.toString(),
            authProvider: 'local'
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("Signup successful:", data);
          window.location.href = "/login";
        } else {
          setError(data.message || "Something went wrong during signup");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
        console.error("Error submitting form:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Superhero avatars
  const avatars = [
    { id: 1, name: "Iron Man", image: "https://tse4.mm.bing.net/th?id=OIP.26uriHoRkXW6Isg0HmfeNwHaE8&pid=Api&P=0&h=180" },
    { id: 2, name: "Captain America", image: "https://tse1.mm.bing.net/th?id=OIP.94QbVG9_mkAd4k3eN7t_kgHaIq&pid=Api&P=0&h=180" },
    { id: 3, name: "Black Widow", image: "https://tse2.mm.bing.net/th?id=OIP.FFQl4PIlDkLz1wA-Wd7pCgHaKp&pid=Api&P=0&h=180" },
    { id: 4, name: "Spider-Man", image: "https://tse4.mm.bing.net/th?id=OIP.02_xra9QDLDvrzOLzrrrHAHaEK&pid=Api&P=0&h=180" },
    { id: 5, name: "Batman", image: "https://tse1.mm.bing.net/th?id=OIP.vvGX5Ai5-Uc5X1S4_RsJTAHaHw&pid=Api&P=0&h=180" },
    { id: 6, name: "Superman", image: "https://tse3.mm.bing.net/th?id=OIP.DZlNV5ESVV7XuFPaEg8OvwHaHO&pid=Api&P=0&h=180" },
    { id: 7, name: "Wonder Woman", image: "https://tse4.mm.bing.net/th?id=OIP.dnusZLslMBVbokkOM6Ew2gHaHx&pid=Api&P=0&h=180" },
    { id: 8, name: "Flash", image: "https://tse2.mm.bing.net/th?id=OIP.6ws5Fx0-RmS0C8ZbUsR13AHaEK&pid=Api&P=0&h=180" },
    { id: 9, name: "Naruto", image: "https://tse1.mm.bing.net/th?id=OIP.G2j0dqsHvjAosTu3g_SFGgHaEi&pid=Api&P=0&h=180" },
    { id: 10, name: "Goku", image: "https://tse1.mm.bing.net/th?id=OIP.MTTN0KUW5YG9GZlf5wY7JwHaHa&pid=Api&P=0&h=180" },
    { id: 11, name: "Luffy", image: "https://tse4.mm.bing.net/th?id=OIP.sNnzmAowpLuLnfEuk-NReAHaEK&pid=Api&P=0&h=180" },
    { id: 12, name: "Ichigo", image: "https://tse2.mm.bing.net/th?id=OIP.wimm5qxWNiF6qsr1GIImYgHaHa&pid=Api&P=0&h=180" },
  ]

  // Generate glowing stars dynamically
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
            boxShadow: `0 0 ${size * 2}px ${size/2}px rgba(255, 255, 255, 0.8)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  // Generate shooting stars
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
            animation: `shoot ${duration}s ${delay}s linear infinite`
          }}
        />
      );
    }
    return shootingStars;
  };

  // Generate pulsating stars
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
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
      {/* Container for stars */}
      <div id="starry-signup-bg" className="absolute inset-0 overflow-hidden">
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
            animation: "star-rotation 500s linear infinite"
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
            animation: "star-rotation-reverse 600s linear infinite"
          }}
        />
        
        {/* Deep space nebula effects */}
        <div className="absolute inset-0 opacity-30" 
          style={{
            background: "radial-gradient(circle at 70% 20%, rgba(32, 43, 100, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 70%, rgba(43, 36, 82, 0.4) 0%, transparent 25%)"
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
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "nebula-pulse 8s infinite alternate ease-in-out"
          }}
        />
        
        <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(100, 0, 255, 0.2) 0%, transparent 70%)",
            filter: "blur(30px)",
            animation: "nebula-pulse 12s infinite alternate-reverse ease-in-out"
          }}
        />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white" 
               style={{textShadow: "0 0 10px rgba(100, 200, 255, 0.7)"}}>
            {step === 1 ? "Create your account" : "Choose your superhero avatar"}
          </h2>
          <p className="mt-2 text-center text-sm text-blue-300">
            {step === 1 ? "Join our community of comic enthusiasts" : "Select an avatar that represents you"}
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 transform rotate-1 border border-blue-900/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
          <div className="transform -rotate-1">
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  {/* Step 1: Basic Information */}
                  <div className="rounded-md shadow-sm -space-y-px mb-6">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-1 text-glow-blue">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-blue-900/50 bg-black/30 text-white rounded-lg placeholder-blue-300/70 backdrop-blur-sm"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1 text-glow-blue">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-blue-900/50 bg-black/30 text-white rounded-lg placeholder-blue-300/70 backdrop-blur-sm"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-blue-300 mb-1 text-glow-blue">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-3 border border-blue-900/50 bg-black/30 text-white rounded-lg placeholder-blue-300/70 backdrop-blur-sm"
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-blue-400 hover:text-blue-300 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-300 mb-1 text-glow-blue">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-3 border border-blue-900/50 bg-black/30 text-white rounded-lg placeholder-blue-300/70 backdrop-blur-sm"
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-blue-400 hover:text-blue-300 focus:outline-none"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-3 px-4 border border-blue-900/50 rounded-lg text-white bg-blue-900/30 hover:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <UserPlus className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                      </span>
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2: Avatar Selection */}
                  <div className="mb-6">
                    <p className="text-sm text-blue-300 mb-4">
                      Choose a superhero avatar that represents you. This will be displayed on your profile and reviews.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {avatars.map((avatar) => (
                        <div
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar.id)}
                          className={`cursor-pointer rounded-lg p-2 transition-all ${
                            selectedAvatar === avatar.id
                              ? "bg-blue-900/30 border-2 border-blue-500 transform scale-105 shadow-[0_0_10px_rgba(0,191,255,0.5)]"
                              : "border border-blue-900/30 hover:border-blue-500/50 hover:shadow-[0_0_5px_rgba(0,191,255,0.3)]"
                          }`}
                        >
                          <img
                            src={avatar.image || "/placeholder.svg"}
                            alt={avatar.name}
                            className="w-full h-auto rounded-full aspect-square object-cover"
                          />
                          <p className="text-xs text-center mt-1 font-medium truncate text-blue-300">{avatar.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 border border-blue-900/50 rounded-lg text-blue-300 bg-black/50 hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedAvatar || loading}
                      className={`flex-1 py-3 px-4 border border-blue-900/50 rounded-lg text-white ${
                        selectedAvatar && !loading ? "bg-blue-900/30 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] hover:shadow-[0_0_15px_rgba(0,191,255,0.5)]" : "bg-blue-900/10 cursor-not-allowed"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300`}
                    >
                      {loading ? "Signing Up..." : "Complete Sign Up"}
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-blue-300">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-all duration-300">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Social Sign Up */}
            {step === 1 && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-900/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black/30 text-blue-300 backdrop-blur-sm">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center py-3 px-4 border border-blue-900/50 rounded-lg shadow-sm bg-black/40 text-sm font-medium text-blue-300 hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 backdrop-blur-sm"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign up with Google
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comic-style decorative elements */}
        <div className="absolute -top-6 -right-6 transform rotate-12 z-20 hidden md:block">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg border-2 border-black shadow-[0_0_10px_rgba(0,191,255,0.5)]">
            POW!
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 transform -rotate-12 z-20 hidden md:block">
          <div className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg border-2 border-black shadow-[0_0_10px_rgba(0,191,255,0.5)]">
            BOOM!
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
        
        .text-glow-blue {
          text-shadow: 0 0 5px rgba(0, 191, 255, 0.7);
        }
      `}</style>
    </div>
  )
}

export default SignupForm