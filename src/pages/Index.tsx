
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromotionBanner } from "@/components/home/PromotionBanner";
import { TestimonialSlider } from "@/components/home/TestimonialSlider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <PromotionBanner />
      <TestimonialSlider />
      <Footer />
    </div>
  );
};

export default Index;
