"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
          </div>
          <h2 className="bebas-neue-regular text-2xl sm:text-3xl md:text-4xl text-slate-800 mb-3 sm:mb-4 px-2">
            Abonează-te la Newsletter
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8 px-2">
            Primește primii informații despre oferte speciale, produse noi și sfaturi de la
            experți.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresa ta de email"
              className="flex-1 min-h-[48px] h-12 sm:h-14 px-4 sm:px-6 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="min-h-[48px] h-12 sm:h-14 px-6 sm:px-8 bg-orange-500 text-white font-semibold rounded-xl shadow-orange hover:shadow-lg transition-shadow text-sm sm:text-base"
            >
              Abonează-te
            </motion.button>
          </form>

          <p className="text-xs text-slate-400 mt-4 px-2">
            Prin abonare, ești de acord cu{" "}
            <Link href="/privacy" className="text-orange-500 hover:underline">
              Politica de Confidențialitate
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
