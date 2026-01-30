"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Tag,
  DollarSign,
  Package,
  Filter,
  X,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
};

type ShopSidebarProps = {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  priceRange: [number, number] | null;
  onPriceRangeChange: (range: [number, number] | null) => void;
  stockFilter: "all" | "in-stock" | "low-stock";
  onStockFilterChange: (filter: "all" | "in-stock" | "low-stock") => void;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function ShopSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  stockFilter,
  onStockFilterChange,
  isOpen = true,
  onClose,
}: ShopSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    stock: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const priceRanges = [
    { label: "Sub 100 RON", value: [0, 100] as [number, number] },
    { label: "100 - 500 RON", value: [100, 500] as [number, number] },
    { label: "500 - 1000 RON", value: [500, 1000] as [number, number] },
    { label: "Peste 1000 RON", value: [1000, 999999] as [number, number] },
  ];

  const stockOptions = [
    { label: "Toate produsele", value: "all" as const },
    { label: "Doar în stoc", value: "in-stock" as const },
    { label: "Stoc redus", value: "low-stock" as const },
  ];

  const hasActiveFilters = selectedCategory !== null || priceRange !== null || stockFilter !== "all";

  const clearAllFilters = () => {
    onCategoryChange(null);
    onPriceRangeChange(null);
    onStockFilterChange("all");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-80 bg-white border-r border-slate-200
          overflow-y-auto z-50 lg:z-0
          ${isOpen ? "block" : "hidden lg:block"}
        `}
        style={{ top: "var(--header-height, 0px)" }}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Filter className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="bebas-neue-regular text-2xl text-slate-800">Filtrare</h2>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Închide meniul"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={clearAllFilters}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-red-600 text-sm font-medium transition-all"
            >
              <X className="w-4 h-4" />
              Șterge toate filtrele
            </motion.button>
          )}

          {/* Categories Section */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection("categories")}
              className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-slate-600 group-hover:text-orange-600 transition-colors" />
                <span className="font-semibold text-slate-800">Categorii</span>
              </div>
              <motion.div
                animate={{ rotate: expandedSections.categories ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedSections.categories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pr-2 space-y-1">
                    {/* All Categories Option */}
                    <button
                      type="button"
                      onClick={() => onCategoryChange(null)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                        selectedCategory === null
                          ? "bg-orange-50 text-orange-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>Toate categoriile</span>
                      {selectedCategory === null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-orange-500 rounded-full"
                        />
                      )}
                    </button>

                    {/* Category List */}
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => onCategoryChange(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                          selectedCategory === category.id
                            ? "bg-orange-50 text-orange-700 font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span>{category.name}</span>
                        {selectedCategory === category.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-orange-500 rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Range Section */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => toggleSection("price")}
              className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-slate-600 group-hover:text-orange-600 transition-colors" />
                <span className="font-semibold text-slate-800">Preț</span>
              </div>
              <motion.div
                animate={{ rotate: expandedSections.price ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedSections.price && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pr-2 space-y-1">
                    {/* All Prices Option */}
                    <button
                      type="button"
                      onClick={() => onPriceRangeChange(null)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                        priceRange === null
                          ? "bg-orange-50 text-orange-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>Toate prețurile</span>
                      {priceRange === null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-orange-500 rounded-full"
                        />
                      )}
                    </button>

                    {/* Price Range List */}
                    {priceRanges.map((range, index) => {
                      const isSelected =
                        priceRange &&
                        priceRange[0] === range.value[0] &&
                        priceRange[1] === range.value[1];

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => onPriceRangeChange(range.value)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                            isSelected
                              ? "bg-orange-50 text-orange-700 font-semibold"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span>{range.label}</span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-orange-500 rounded-full"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stock Status Section */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => toggleSection("stock")}
              className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-slate-600 group-hover:text-orange-600 transition-colors" />
                <span className="font-semibold text-slate-800">Disponibilitate</span>
              </div>
              <motion.div
                animate={{ rotate: expandedSections.stock ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedSections.stock && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pr-2 space-y-1">
                    {stockOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => onStockFilterChange(option.value)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                          stockFilter === option.value
                            ? "bg-orange-50 text-orange-700 font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span>{option.label}</span>
                        {stockFilter === option.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-orange-500 rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ChevronRight className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Ai nevoie de ajutor?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Contactează-ne pentru consultanță gratuită în alegerea produselor potrivite.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
