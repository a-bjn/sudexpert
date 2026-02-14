"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Flame, Box } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/lib/home-data";

export default function FeaturedProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-600 uppercase tracking-widest mb-3 sm:mb-4">
              <Flame className="w-4 h-4" />
              Produse Recomandate
            </span>
            <h2 className="bebas-neue-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-800">
              Cele Mai Vândute
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/magazin"
              className="group inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 font-medium transition-colors text-sm sm:text-base"
            >
              Vezi toate produsele
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURED_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/magazin/${product.id}`} className="group block">
                <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-200 hover:shadow-xl transition-all duration-300">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-500 text-white rounded-full shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden">
                    <div className="w-32 h-32 bg-slate-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Box className="w-12 h-12 text-slate-400" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-800">
                        {product.price}{" "}
                        <span className="text-sm font-normal text-slate-500">RON</span>
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-orange-500 group-hover:text-white transition-all"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
