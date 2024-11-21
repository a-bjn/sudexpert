import React from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import RecomendationSection from "./components/RecomendationSection";
import Separator from "./components/Separator";


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Separator />
      <RecomendationSection/>
      <Separator />
      <AboutSection />
    </div>
  );
}
