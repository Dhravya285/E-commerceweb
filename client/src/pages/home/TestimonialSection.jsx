"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Peter Parker",
    avatar: "/assets/avatar-peter.jpg",
    location: "New York",
    rating: 5,
    text: "These t-shirts are amazing! The Spider-Man design I got looks exactly like in the comics. The quality is top-notch and it's super comfortable to wear. Will definitely buy more!",
    superhero: "Spider-Man",
  },
  {
    id: 2,
    name: "Bruce Wayne",
    avatar: "/assets/avatar-bruce.jpg",
    location: "Gotham City",
    rating: 5,
    text: "The Batman t-shirt I ordered exceeded my expectations. The material is durable and the design is sleek and elegant. Perfect for night patrols or casual days.",
    superhero: "Batman",
  },
  {
    id: 3,
    name: "Diana Prince",
    avatar: "/assets/avatar-diana.jpg",
    location: "Themyscira",
    rating: 4,
    text: "I love my Wonder Woman tee! The colors are vibrant and the fit is perfect. The only reason for 4 stars is that I wish they had more designs from the Amazonian collection.",
    superhero: "Wonder Woman",
  },
  {
    id: 4,
    name: "Tony Stark",
    avatar: "/assets/avatar-tony.jpg",
    location: "Malibu",
    rating: 5,
    text: "As someone who appreciates fine craftsmanship, I can say these t-shirts are state-of-the-art. The Iron Man design glows in the dark, which is a cool touch. Highly recommend!",
    superhero: "Iron Man",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Comic-style background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-indigo-950">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px)",
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Superheroes Say</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Hear from our satisfied customers who are rocking their superhero style
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-1">
            <div className="md:flex transform -rotate-1">
              {/* Left side - Avatar */}
              <div className="md:w-1/3 bg-gradient-to-br from-indigo-600 to-indigo-900 p-6 flex flex-col justify-between">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mx-auto mb-4">
                    <img
                      src={testimonials[currentIndex].avatar || `/placeholder.svg?height=100&width=100`}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h3>
                  <p className="text-indigo-200 text-sm">{testimonials[currentIndex].location}</p>
                  <div className="flex justify-center mt-2 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < testimonials[currentIndex].rating ? "currentColor" : "none"}
                        stroke={i < testimonials[currentIndex].rating ? "currentColor" : "currentColor"}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-block bg-yellow-400 text-indigo-900 font-bold py-1 px-3 rounded-full text-sm">
                    Fan of {testimonials[currentIndex].superhero}
                  </div>
                </div>
              </div>

              {/* Right side - Testimonial */}
              <div className="md:w-2/3 p-8">
                <div className="h-full flex flex-col justify-center">
                  <div className="text-5xl text-indigo-300 mb-4">"</div>
                  <p className="text-gray-700 text-lg mb-6 italic">{testimonials[currentIndex].text}</p>
                  <div className="text-5xl text-indigo-300 self-end">"</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-indigo-700 hover:bg-indigo-600 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-indigo-700 hover:bg-indigo-600 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-yellow-400" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

