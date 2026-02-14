"use client";

import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
