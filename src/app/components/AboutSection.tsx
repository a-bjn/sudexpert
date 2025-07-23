"use client";

// import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="about" className="relative flex items-center justify-center overflow-hidden px-4 pb-8 sm:px-6 md:px-8">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid gap-8 items-center lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 sm:space-y-8" data-aos="fade-right">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Despre
                </span> Noi
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-base text-gray-300 leading-relaxed max-w-2xl">
                Cu peste 30 de ani de experiență în domeniul sudurii și metalurgiei, 
                suntem dedicați să oferim servicii de cea mai înaltă calitate. 
                Fiecare proiect este realizat cu precizie și atenție la detalii.
          </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-base text-gray-300 leading-relaxed max-w-2xl">
                Echipa noastră de specialiști folosește tehnologii moderne și 
                echipamente de ultimă generație pentru a garanta rezultate 
                excepționale în orice tip de lucrare de sudură.
              </p>
            </div>
            <div className="pt-2 sm:pt-4">
              <button className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-base sm:text-xl font-bold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-[0px_6px_18px_rgba(0,0,0,0.3)] sm:shadow-[0px_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0px_10px_30px_rgba(20,184,166,0.2)] sm:hover:shadow-[0px_15px_40px_rgba(20,184,166,0.3)] transform hover:scale-105">
                Descoperă serviciile noastre
              </button>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6" data-aos="fade-left" data-aos-delay="200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="300">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center h-full">
                  <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                    30+
                  </div>
                  <p className="text-gray-200 text-xs sm:text-sm font-medium">
                    Ani de experiență
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="400">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center h-full">
                  <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                    500+
                  </div>
                  <p className="text-gray-200 text-xs sm:text-sm font-medium">
                    Proiecte finalizate
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="500">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center h-full">
                  <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                    98%
                  </div>
                  <p className="text-gray-200 text-xs sm:text-sm font-medium">
                    Satisfacție clienți
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="600">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center h-full">
                  <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                    24/7
                  </div>
                  <p className="text-gray-200 text-xs sm:text-sm font-medium">
                    Suport disponibil
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-6" data-aos="fade-up" data-aos-delay="700">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-200 text-sm sm:text-base font-medium">Echipamente moderne și certificate</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-200 text-sm sm:text-base font-medium">Specialiști cu experiență vastă</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-200 text-sm sm:text-base font-medium">Garanție completă pentru toate lucrările</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
