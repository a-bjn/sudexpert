import React from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import RecommendationSection from "./components/RecommendationSection";
import EmailOrderSection from "./components/EmailOrderSection";


export default function Home() {
  return (
    <div className="min-h-screen space-y-16">
      <HeroSection />
      <EmailOrderSection />
      <RecommendationSection/>
      <AboutSection />
    </div>
  );
}
