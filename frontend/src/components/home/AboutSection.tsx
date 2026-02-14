"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { ABOUT_STATS, ABOUT_CHECKMARKS } from "@/lib/home-data";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/welder-2.png"
                alt="Sudexpert - Echipamente de Sudură"
                fill
                className="object-cover object-center"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:-bottom-8 lg:-right-8 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-100"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <div className="bebas-neue-regular text-2xl sm:text-3xl text-slate-800">
                    30+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">Ani pe piață</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-600 uppercase tracking-widest mb-4">
              Despre Noi
            </span>
            <h2 className="bebas-neue-regular text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-4 sm:mb-6">
              Tradiție și Inovație în Sudură
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6">
              Din 1994, Sudexpert s-a dedicat furnizării celor mai bune produse de sudură
              pentru profesioniști și entuziaști din România. Cu peste 30 de ani de
              experiență, am construit relații de încredere cu cei mai mari producători din
              lume.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Misiunea noastră este să oferim calitate excepțională, consultanță de
              specialitate și servicii impecabile pentru fiecare client. Fiecare produs este
              atent selectat pentru a îndeplini cele mai înalte standarde.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {ABOUT_CHECKMARKS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/despre" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors shadow-lg min-h-[48px]"
              >
                Află Mai Multe
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bebas-neue-regular text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
