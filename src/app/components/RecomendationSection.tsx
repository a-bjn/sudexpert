"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "./Card";

export default function RecomendationSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative h-screen flex justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/welder_recomendation_bg.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(160deg,black,rgba(0,0,0,0.4)80%,rgba(200,0,0,0.2))]"
      ></div>
      <div className="relative z-10 w-full h-full text-white p-4 pt-16 pb-16 flex flex-col items-start justify-between">
        <h1
          className="text-4xl sm:text-5xl font-bold text-white underline decoration-teal-400 underline-offset-8"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          Ce ne recomanda?
        </h1>
        <div
          className="grid grid-cols-2 sm:grid-cols-1 gap-2 w-full"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Card
            icon="/trophy-icon.svg"
            title="Profesionalism"
            description="25+ ani experienta in domeniu."
          />
          <Card
            icon="/trophy-icon.svg"
            title="Calitate"
            description="Garantăm servicii care durează."
          />
          <Card
            icon="/trophy-icon.svg"
            title="Incredere"
            description="Echipa noastră are experiență vastă."
          />
          <Card
            icon="/trophy-icon.svg"
            title="Promptitudine"
            description="Echipa noastră are experiență vastă."
          />
        </div>
        <div
          className="w-full flex flex-col gap-4 mt-4 text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <button className="py-2 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 transition-colors">
            Produse
          </button>
          <button className="py-2 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
