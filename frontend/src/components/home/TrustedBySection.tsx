"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PARTNERS } from "@/lib/home-data";
import SectionHeader from "./SectionHeader";

export default function TrustedBySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-10 sm:py-14 md:py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          subtitle="Parteneri de încredere"
          variant="minimal"
          animate={true}
          isInView={isInView}
        />

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="bebas-neue-regular text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 group-hover:text-orange-500 transition-colors duration-300 cursor-default">
                {partner.logo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
