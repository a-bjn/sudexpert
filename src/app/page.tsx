import React from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import RecommendationSection from "./components/RecommendationSection";
import TokenFormUserEmail from "./components/TokenFormUserEmail";


export default function Home() {
  return (
    <div className="bg-background grid-background space-y-2 md:space-y-20">
      <HeroSection />
      <TokenFormUserEmail />
      <RecommendationSection/>
      <AboutSection />
    </div>
  );
}
