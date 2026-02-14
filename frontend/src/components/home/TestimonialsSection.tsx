"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/home-data";
import SectionHeader from "./SectionHeader";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          subtitle="Recenzii"
          title="Ce Spun Clienții"
          description="Peste 10.000 de clienți mulțumiți ne-au ales ca partener de încredere"
          isInView={isInView}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="h-full bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-100 hover:shadow-lg hover:border-orange-100 transition-all">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-orange-200 mb-4 sm:mb-6" />

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-none">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
