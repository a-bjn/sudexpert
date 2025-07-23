"use client";

import "aos/dist/aos.css";
import Lottie from "lottie-react";
import welderAnimation from "../../../public/welder-at-work.json";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-auto min-h-[70vh] md:h-[90vh] overflow-hidden pt-20 mt-16 md:mt-0 md:pt-20 px-2 sm:px-4">
      <div className="w-full max-w-screen-2xl mx-auto h-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full gap-8 md:gap-20 items-center justify-center">
          {/* Left: Text (always shown) */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/2">
            <div className="relative z-10 w-full">
              <div className="flex flex-col gap-4 md:gap-10" data-aos="fade-right" data-aos-delay="0">
                <p className="hidden md:block text-lg sm:text-2xl md:text-3xl font-base text-gray-200 text-center md:text-left">
                  30+ ani de experiență și performanță în sudură
                </p>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-gray-200 text-center md:text-left">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    Sudexpert
                  </span> 
                  {" "} - Produse și Soluții Complete în Sudură
                </h1>
                <h2 className="text-lg sm:text-2xl md:text-3xl text-gray-300 mt-2 font-light leading-relaxed text-center md:text-left">
                  La Sudexpert oferim o gamă largă de produse de calitate pentru orice proiecte în sudură.
                </h2>
                {/* Lottie Animation above the button on mobile only */}
                <div className="flex justify-center my-2 md:hidden">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
                    <Lottie
                      animationData={welderAnimation}
                      loop={true}
                      autoplay={true}
                      className="w-60 h-60 sm:w-80 sm:h-80 object-contain animate-float relative z-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4 w-full">
                  <a
                    href="tel:+40724207132"
                    className="inline-flex flex-col md:flex-row items-center justify-center py-3 md:py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-100 rounded-full text-base font-bold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-[0px_4px_12px_rgba(0,0,0,0.4)] sm:shadow-[0px_8px_20px_rgba(0,0,0,0.7)] w-full"
                  >
                    <span className="text-xl md:text-3xl">+40 724 207 132</span>
                    <span className="hidden md:inline text-3xl font-semibold">&nbsp;- Inginer Bejan Laurentiu</span>
                    <span className="text-xl md:hidden font-semibold">Inginer Bejan Laurentiu</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Lottie animation on desktop only */}
          <div className="hidden md:flex relative w-full md:w-1/2 items-center justify-center mb-6 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
              <Lottie
                animationData={welderAnimation}
                loop={true}
                autoplay={true}
                className="w-[32rem] h-[32rem] object-contain animate-float relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
