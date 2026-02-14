"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FEATURES } from "@/lib/home-data";
import SectionHeader from "./SectionHeader";

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          subtitle="De ce să ne alegi"
          title="Beneficiile Tale"
          isInView={isInView}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className={`w-20 h-20 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:shadow-lg transition-shadow`}
              >
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
