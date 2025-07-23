"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import Card from "./Card";

export default function RecommendationSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="services" className="relative py-10 px-8">
      <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-200 mb-6">
            Ce ne{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              recomandă
            </span>
            ?
            </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-8"></div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experiența noastră de peste 30 de ani în domeniul sudurii și dedicarea pentru excelență 
            ne permit să oferim servicii de cea mai înaltă calitate în industrie.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="bg-zinc-600/10 backdrop-blur-sm rounded-2xl p-8 text-center h-full border border-white/10 hover:border-teal-400/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-4">Profesionalism</h3>
              <p className="text-gray-300 leading-relaxed">30+ ani de experiență în domeniul sudurii și metalurgiei.</p>
            </div>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="bg-zinc-600/10 backdrop-blur-sm rounded-2xl p-8 text-center h-full border border-white/10 hover:border-teal-400/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-4">Calitate Premium</h3>
              <p className="text-gray-300 leading-relaxed">Echipamente moderne și materiale de cea mai bună calitate.</p>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <div className="bg-zinc-600/10 backdrop-blur-sm rounded-2xl p-8 text-center h-full border border-white/10 hover:border-teal-400/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-4">Încredere</h3>
              <p className="text-gray-300 leading-relaxed">Peste 500 de proiecte finalizate cu succes și clienți mulțumiți.</p>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <div className="bg-zinc-600/10 backdrop-blur-sm rounded-2xl p-8 text-center h-full border border-white/10 hover:border-teal-400/50 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-4">Promptitudine</h3>
              <p className="text-gray-300 leading-relaxed">Intervenții rapide și respectarea termenelor stabilite.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
