"use client";

import "aos/dist/aos.css";
import Lottie from "lottie-react";
import welderAnimation from "../../../public/welder-at-work.json";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-auto min-h-[70vh] md:h-[90vh] overflow-hidden pt-28 md:pt-36 mt-6 md:mt-10 px-2 sm:px-4">
      <div className="w-full max-w-screen-2xl mx-auto h-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full gap-8 md:gap-20 items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full md:w-1/2">
            <div className="relative z-10 w-full">
              <div className="flex flex-col gap-4 md:gap-6" data-aos="fade-right" data-aos-delay="0">
                <p className="hidden md:block text-lg sm:text-2xl md:text-3xl font-base text-gray-200 text-center md:text-left">
                  30+ ani de experiență și performanță în sudură
                </p>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-gray-200 text-center md:text-left">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    Sudexpert
                  </span> 
                  {" "} - Produse și Soluții Complete în Sudură
                </h1>
                  <h2 className="text-lg sm:text-2xl md:text-3xl text-gray-300 mt-2 font-semibold leading-relaxed text-center md:text-left">
                  La Sudexpert oferim o gamă largă de produse de calitate pentru orice proiecte în sudură.
                </h2>
                <div className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4 w-full">
                  <a
                    href="tel:+40724207132"
                    className="inline-flex flex-col items-center justify-center px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-100 rounded-full text-base sm:text-xl font-bold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-[0px_4px_12px_rgba(0,0,0,0.4)] sm:shadow-[0px_8px_20px_rgba(0,0,0,0.7)] w-full"
                  >
                    <span>+40 724 207 132</span>
                    <span className="text-base md:text-xl font-semibold md:font-bold">Inginer Bejan Laurentiu</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
            <div className="relative w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0 hidden md:flex">
              <Lottie
                animationData={welderAnimation}
                loop={true}
                autoplay={true}
                className="w-60 h-60 sm:w-80 sm:h-80 md:w-full md:h-full object-contain animate-float"
                data-aos="fade-left"
                data-aos-delay="200"
              />
            </div>
        </div>
      </div>
    </section>
  );
}
