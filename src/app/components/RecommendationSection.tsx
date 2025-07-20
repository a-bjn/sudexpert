"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "./Card";

export default function RecommendationSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative min-h-screen bg-background flex items-center justify-center py-16 grid-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Ce ne recomanda?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experiența noastră de peste 25 de ani în domeniul sudurii ne permite să oferim servicii de cea mai înaltă calitate
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" data-aos="fade-up" data-aos-delay="200">
            <Card
              icon="/trophy-icon.svg"
              title="Profesionalism"
              description="25+ ani experienta in domeniu."
            />
            <Card
              icon="/weld-icon.svg"
              title="Calitate"
              description="Garantăm servicii care durează."
            />
            <Card
              icon="/shield-icon.svg"
              title="Incredere"
              description="Echipa noastră are experiență vastă."
            />
            <Card
              icon="/wrench-icon.svg"
              title="Promptitudine"
              description="Echipa noastră are experiență vastă."
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
            <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors">
              Vezi Produsele
            </button>
            <button className="px-8 py-4 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-colors">
              Contactează-ne
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
