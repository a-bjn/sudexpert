"use client";

import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import { motion } from "framer-motion";
import { Search, ChevronDown, Grid3X3, LayoutList, X, Sparkles, Package } from "lucide-react";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  category?: Category;
  createdAt?: string;
};

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";

export default function Magazin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.products.getAll(),
          api.categories.getAll()
        ]);
        setProducts(productsData as Product[]);
        setCategories(categoriesData as Category[]);
      } catch (err: unknown) {
        setError("Nu s-au putut încărca produsele.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== null) {
      result = result.filter((p) => p.category?.id === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSortBy("default");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== null || sortBy !== "default";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-500 text-sm">Se încarcă produsele...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-100 flex items-center justify-center">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
          >
            Încearcă din nou
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative Orbs */}
      <div className="absolute top-40 -right-40 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -left-40 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />

      {/* Hero Section */}
      <div className="relative pt-28 sm:pt-32 lg:pt-36 pb-6 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-100 text-orange-700 text-xs sm:text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Colecția noastră
              </motion.div>
            </div>
            <h1 className="bebas-neue-regular text-4xl sm:text-5xl md:text-6xl text-slate-800 mb-3 sm:mb-4">
              Magazin
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl">
              Echipamente profesionale de sudură pentru toate nevoile tale. Calitate garantată și prețuri competitive.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-16 sm:top-20 lg:top-24 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200"
        >
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full min-w-0">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Caută produse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors -mr-2"
                  aria-label="Șterge căutarea"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="relative flex-1 sm:flex-initial min-w-0 sm:min-w-[160px]">
                <select
                  value={selectedCategory ?? ""}
                  onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                  className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer transition-all min-h-[44px] min-w-0"
                >
                  <option value="">Toate categoriile</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative flex-1 sm:flex-initial min-w-0 sm:min-w-[180px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer transition-all min-h-[44px] min-w-0"
                >
                  <option value="default">Sortare implicită</option>
                  <option value="price-asc">Preț: Mic → Mare</option>
                  <option value="price-desc">Preț: Mare → Mic</option>
                  <option value="name-asc">Nume: A → Z</option>
                  <option value="name-desc">Nume: Z → A</option>
                  <option value="newest">Cele mai noi</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 rounded-xl p-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Vizualizare grilă"
                  className={`min-h-[44px] min-w-[44px] p-2.5 rounded-lg transition-all flex items-center justify-center ${
                    viewMode === "grid"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="Vizualizare listă"
                  className={`min-h-[44px] min-w-[44px] p-2.5 rounded-lg transition-all flex items-center justify-center ${
                    viewMode === "list"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 hover:bg-red-100 transition-all"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Șterge filtrele</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 mb-8 flex items-center justify-between"
        >
          <p className="text-slate-500">
            {filteredProducts.length === 0 ? (
              "Nu s-au găsit produse"
            ) : (
              <>
                <span className="text-slate-800 font-semibold">{filteredProducts.length}</span>
                {filteredProducts.length === 1 ? " produs" : " produse"}
                {hasActiveFilters && " găsite"}
              </>
            )}
          </p>
        </motion.div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Package className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Nu s-au găsit produse</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Încearcă să modifici criteriile de căutare sau să ștergi filtrele pentru a vedea mai multe produse.
            </p>
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
              >
                Șterge toate filtrele
              </motion.button>
            )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} viewMode="list" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
