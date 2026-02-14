"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Package } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  category?: { id: number; name: string };
};

type ProductCardProps = {
  product: Product;
  viewMode?: "grid" | "list";
};

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  if (viewMode === "list") {
    return <ListCard product={product} />;
  }

  return <GridCard product={product} />;
}

// Grid View - Liquid Glass Card
function GridCard({ product }: { product: Product }) {
  return (
    <Link href={`/magazin/${product.id}`} className="group block">
      <motion.div
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="relative overflow-hidden rounded-xl
          bg-white/60 backdrop-blur-xl
          border border-white/80
          shadow-[0_6px_24px_rgba(0,0,0,0.04),0_1px_6px_rgba(0,0,0,0.02)]
          hover:shadow-[0_16px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(251,146,60,0.15)]
          transition-shadow duration-500"
      >
        {/* Top light reflection */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-50/20 pointer-events-none" />

        {/* Image Container */}
        <div className="relative m-3 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200/80">
          {/* Image highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/30 z-10 pointer-events-none" />

          {product.imageUrl && !product.imageUrl.includes("placeholder") ? (
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-400">
              <Package className="w-1/3 h-1/3" strokeWidth={1.25} />
            </div>
          )}

          {/* Category badge */}
          {product.category && (
            <div className="absolute top-1.5 left-1.5 z-20">
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full
                bg-white/80 backdrop-blur-md text-slate-600
                border border-white/50 shadow-sm">
                {product.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative px-3 pb-3 pt-1">
          <h3 className="text-base font-semibold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2 leading-snug">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            {/* Price Badge */}
            <div className="px-2.5 py-1.5 rounded-full
              bg-orange-50
              backdrop-blur-sm border border-orange-200/50">
              <span className="text-base font-bold text-orange-600">
                {product.price} <span className="text-xs font-semibold">RON</span>
              </span>
            </div>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                bg-orange-500
                shadow-lg shadow-orange-500/25
                hover:shadow-orange-500/40
                transition-shadow duration-300"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Bottom edge highlight */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />
      </motion.div>
    </Link>
  );
}

// List View
function ListCard({ product }: { product: Product }) {
  return (
    <Link href={`/magazin/${product.id}`} className="group block">
      <motion.div
        whileHover={{
          x: 4,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        className="relative overflow-hidden rounded-2xl
          bg-white/60 backdrop-blur-xl
          border border-white/80
          shadow-[0_4px_20px_rgba(0,0,0,0.03),0_1px_4px_rgba(0,0,0,0.02)]
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.06),0_0_0_1px_rgba(251,146,60,0.1)]
          transition-shadow duration-300
          flex flex-col sm:flex-row"
      >
        {/* Top light reflection */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-50/10 pointer-events-none" />

        {/* Image Container */}
        <div className="relative m-3 sm:m-4 w-full sm:w-44 h-44 sm:h-auto sm:aspect-square flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/80">
          {/* Image highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/20 z-10 pointer-events-none" />

          {product.imageUrl && !product.imageUrl.includes("placeholder") ? (
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-400">
              <Package className="w-1/4 h-1/4" strokeWidth={1.25} />
            </div>
          )}

          {/* Category badge */}
          {product.category && (
            <div className="absolute top-2 left-2 z-20">
              <span className="px-2 py-0.5 text-xs font-medium rounded-full
                bg-white/80 backdrop-blur-md text-slate-600
                border border-white/50 shadow-sm">
                {product.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative flex-1 p-4 sm:py-5 sm:pr-5 sm:pl-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                {product.name}
              </h3>

              {/* Cart Button - Desktop */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic
                }}
                className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0
                  bg-orange-500
                  shadow-lg shadow-orange-500/25
                  hover:shadow-orange-500/40
                  transition-shadow duration-300"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </motion.button>
            </div>
            <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {/* Price Badge */}
            <div className="px-4 py-2 rounded-full
              bg-orange-50
              backdrop-blur-sm border border-orange-200/50">
              <span className="text-xl font-bold text-orange-600">
                {product.price} <span className="text-sm font-semibold">RON</span>
              </span>
            </div>

            {/* Cart Button - Mobile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
              className="sm:hidden w-11 h-11 rounded-full flex items-center justify-center
                bg-orange-500
                shadow-lg shadow-orange-500/25
                hover:shadow-orange-500/40
                transition-shadow duration-300"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Left edge highlight for list view */}
        <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-orange-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}
