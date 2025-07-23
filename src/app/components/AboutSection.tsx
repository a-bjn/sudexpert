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
    <section id="about" className="relative flex items-center justify-center overflow-hidden px-8 pb-8">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8" data-aos="fade-right">
            <div className="space-y-6">
              <h2 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Despre
                </span> Noi
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
              <p className="text-2xl font-base text-gray-300 leading-relaxed max-w-2xl">
                Cu peste 30 de ani de experiență în domeniul sudurii și metalurgiei, 
                suntem dedicați să oferim servicii de cea mai înaltă calitate. 
                Fiecare proiect este realizat cu precizie și atenție la detalii.
          </p>
              <p className="text-2xl font-base text-gray-300 leading-relaxed max-w-2xl">
                Echipa noastră de specialiști folosește tehnologii moderne și 
                echipamente de ultimă generație pentru a garanta rezultate 
                excepționale în orice tip de lucrare de sudură.
              </p>
            </div>
            <div className="pt-4">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-xl font-bold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-[0px_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0px_15px_40px_rgba(20,184,166,0.3)] transform hover:scale-105">
                Descoperă serviciile noastre
              </button>
            </div>
          </div>
          <div className="space-y-6" data-aos="fade-left" data-aos-delay="200">
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="300">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-center h-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                    30+
                  </div>
                  <p className="text-gray-200 text-sm font-medium">
                    Ani de experiență
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="400">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-center h-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                    500+
                  </div>
                  <p className="text-gray-200 text-sm font-medium">
                    Proiecte finalizate
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="500">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-center h-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                    98%
                  </div>
                  <p className="text-gray-200 text-sm font-medium">
                    Satisfacție clienți
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20" data-aos="zoom-in" data-aos-delay="600">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-center h-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                    24/7
                  </div>
                  <p className="text-gray-200 text-sm font-medium">
                    Suport disponibil
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-6" data-aos="fade-up" data-aos-delay="700">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-200 font-medium">Echipamente moderne și certificate</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-200 font-medium">Specialiști cu experiență vastă</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-200 font-medium">Garanție completă pentru toate lucrările</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
