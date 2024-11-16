"use client";

import Image from "next/image";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights as per your need
});

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative h-[80vh] flex justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/welder.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(160deg,black,rgba(0,0,0,0.4)80%,rgba(200,0,0,0.2))]"
      ></div>
      <div className="relative z-10 w-full h-full text-white p-6 pt-16 pb-16 flex flex-col items-start justify-between">
        <div>
          <h1
            className="text-4xl sm:text-6xl font-bold mb-8 text-gray-200 underline decoration-teal-400 underline-offset-8"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            Despre Noi
          </h1>

          <p
            className="text-lg leading-relaxed text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We are committed to providing top-notch services in welding and
            metalworks. With years of experience, we aim to deliver quality and
            precision in every project.
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div
            className="flex flex-row gap-8 w-full justify-center"
            data-aos-delay="400"
          >
            <div 
              className="text-start"
              data-aos="fade-right"
            >
              <p className={`text-teal-400 text-4xl font-bold ${roboto.className}`}>
                30+
              </p>
              <p className="text-gray-300 text-lg">Ani de experiență în domeniu</p>
            </div>

            <div 
              className="text-start"
              data-aos="fade-left"
            >
              <p className={`text-teal-400 text-4xl font-bold ${roboto.className}`}>
                200+
              </p>
              <p className="text-gray-300 text-lg">De clienți satisfăcuți</p>
            </div>
          </div>

          <div className="mt-10 w-full flex justify-center" data-aos="zoom-in" data-aos-delay="400">
            <button
              className="w-full py-2 border border-white text-white rounded-xl text-lg max-w-md 
                        hover:bg-white hover:text-black transition-all duration-300 
                        bg-gradient-to-r from-white/5 via-white/0 to-white/5 backdrop-blur-sm shadow-md"
            >
              Aflați mai multe
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
