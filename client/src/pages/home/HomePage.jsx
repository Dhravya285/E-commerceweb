import MainLayout from "../../components/layout/MainLayout"
import HeroSection from "./HeroSection"
import FeaturedCategories from "./FeaturedCategories"
import FeaturedProducts from "./FeaturedProducts"
import Newsletter from "./NewsLetter"
import TestimonialSection from "./TestimonialSection"

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <TestimonialSection />
      <Newsletter />
    </MainLayout>
  )
}

