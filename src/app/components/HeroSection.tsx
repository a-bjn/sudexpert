"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative w-full h-screen">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/welding-gif.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-start p-6 text-white h-full justify-around">
        {/* Text Content */}
        <div
          className="flex flex-col gap-2"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <p className="text-base sm:text-lg text-gray-300 font-bold">
            25+ Ani de experiență și performanță în sudură
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold">
            Produse și Soluții Complete în Sudură
          </h1>
          <h2 className="text-lg sm:text-lg text-gray-200 pt-4">
            La Sudexpert oferim o gamă largă de produse de calitate pentru orice proiecte în sudură.
          </h2>
        </div>

        {/* Call to Action Section */}
        <div
          className="flex flex-col justify-between items-center w-full"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Button */}
          <a
            href="tel:+40724207132"
            className="block w-full text-center px-8 py-3 border border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300 max-w-md shadow-[0px_10px_30px_rgba(0,0,0,0.8)]"
          >
            +40 0724 207 132
          </a>

          {/* Trusted By Section */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="text-md sm:text-lg text-white text-center">
              Asigurăm încrederea mărcilor de top din industrie.
            </p>
            <div className="flex gap-1 text-1xl text-teal-400">
              {"★ ★ ★ ★ ★".split(" ").map((star, index) => (
                <span key={index}>{star}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
