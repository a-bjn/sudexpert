"use client";

import "aos/dist/aos.css";
import Lottie from "lottie-react";
import welderAnimation from "../../../public/welder-at-work.json";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[90vh] overflow-hidden mt-10 px-4">
      <div className="w-full max-w-screen-2xl mx-auto h-full flex items-center justify-center">
        <div className="flex flex-row w-min-6xl gap-20">
          <div className="flex flex-col items-center justify-center">
          <div className="relative z-10">
              <div className="flex flex-col gap-6" data-aos="fade-right" data-aos-delay="0">
                <p className="text-3xl font-base text-gray-200">
                  30+ ani de experiență și performanță în sudură
              </p>
                <h1 className="text-7xl font-bold leading-tight text-gray-200">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    Sudexpert
                  </span> 
                  {" "} - Produse și Soluții Complete în Sudură
              </h1>
                <h2 className="text-3xl text-gray-300 mt-2 font-semibold leading-relaxed">
                La Sudexpert oferim o gamă largă de produse de calitate pentru orice proiecte în sudură.
              </h2>
                <div className="flex flex-col gap-6 mt-4">
                <a
                  href="tel:+40724207132"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-100 rounded-full text-2xl font-bold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-[0px_10px_30px_rgba(0,0,0,0.8)] w-full"
                >
                  +40 724 207 132
                </a>
                </div>
              </div>
            </div>
          </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Lottie
                animationData={welderAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full object-contain animate-float"
                data-aos="fade-left"
                data-aos-delay="200"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
