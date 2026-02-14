"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="bebas-neue-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 px-2">
            Pregătit Să Începi?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 leading-relaxed px-2">
            Descoperă gama completă de produse profesionale pentru sudură. Calitate
            garantată, prețuri competitive, livrare rapidă.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center sm:items-stretch">
            <Link href="/magazin" className="w-full sm:w-auto max-w-sm sm:max-w-none">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-orange-600 rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-shadow min-h-[48px]"
              >
                Explorează Magazinul
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto max-w-sm sm:max-w-none">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-base sm:text-lg hover:bg-white/10 transition-colors min-h-[48px]"
              >
                Contactează-ne
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
