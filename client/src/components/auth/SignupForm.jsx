"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ArrowRight } from "lucide-react"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // Handle form submission
      console.log("Form submitted:", formData, "Avatar:", selectedAvatar)
    }
  }

  // Superhero avatars
  const avatars = [
    { id: 1, name: "Iron Man", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Captain America", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Black Widow", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Spider-Man", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Batman", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Superman", image: "/placeholder.svg?height=100&width=100" },
    { id: 7, name: "Wonder Woman", image: "/placeholder.svg?height=100&width=100" },
    { id: 8, name: "Flash", image: "/placeholder.svg?height=100&width=100" },
    { id: 9, name: "Naruto", image: "/placeholder.svg?height=100&width=100" },
    { id: 10, name: "Goku", image: "/placeholder.svg?height=100&width=100" },
    { id: 11, name: "Luffy", image: "/placeholder.svg?height=100&width=100" },
    { id: 12, name: "Ichigo", image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Stars background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {step === 1 ? "Create your account" : "Choose your superhero avatar"}
          </h2>
          <p className="mt-2 text-center text-sm text-indigo-200">
            {step === 1 ? "Join our community of comic enthusiasts" : "Select an avatar that represents you"}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-8 transform rotate-1">
          <div className="transform -rotate-1">
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  {/* Step 1: Basic Information */}
                  <div className="rounded-md shadow-sm -space-y-px mb-6">
                    <div className="mb-4">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg"
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg"
                          placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                      </span>
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2: Avatar Selection */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Choose a superhero avatar that represents you. This will be displayed on your profile and reviews.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {avatars.map((avatar) => (
                        <div
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar.id)}
                          className={`cursor-pointer rounded-lg p-2 transition-all ${
                            selectedAvatar === avatar.id
                              ? "bg-indigo-100 border-2 border-indigo-600 transform scale-105"
                              : "border border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <img
                            src={avatar.image || "/placeholder.svg"}
                            alt={avatar.name}
                            className="w-full h-auto rounded-full aspect-square object-cover"
                          />
                          <p className="text-xs text-center mt-1 font-medium truncate">{avatar.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedAvatar}
                      className={`flex-1 py-3 px-4 border border-transparent rounded-lg text-white ${
                        selectedAvatar ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-400 cursor-not-allowed"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      Complete Sign Up
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Social Sign Up */}
            {step === 1 && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
            POW!
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 transform -rotate-12 z-20 hidden md:block">
          <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-black">
            BOOM!
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default SignupForm

