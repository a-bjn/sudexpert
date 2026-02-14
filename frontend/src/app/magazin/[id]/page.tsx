"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  Package,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  X
} from "lucide-react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
  createdAt?: string;
};

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.products.getById(params.id as string);
        setProduct(data as Product);
      } catch (err: unknown) {
        setError("Nu s-a putut încărca produsul.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0 || isAdding) return;

    setIsAdding(true);

    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }

    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 3000);
    }, 400);
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const isOutOfStock = product?.stock !== undefined && product.stock <= 0;
  const isLowStock = product?.stock !== undefined && product.stock > 0 && product.stock <= 5;
  const isNew = product?.createdAt && isWithinDays(new Date(product.createdAt), 14);

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
          <p className="text-slate-500 text-sm">Se încarcă produsul...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-red-100 flex items-center justify-center">
            <X className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="bebas-neue-regular text-4xl text-slate-800 mb-3">
            Produsul nu a fost găsit
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">{error || "Acest produs nu există sau a fost șters."}</p>
          <Link
            href="/magazin"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Înapoi la magazin
          </Link>
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

      {/* Breadcrumb */}
      <div className="relative bg-white/80 backdrop-blur-sm border-b border-slate-100 pt-24 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap overflow-x-auto">
            <Link href="/" className="text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap">
              Acasă
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link href="/magazin" className="text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap">
              Magazin
            </Link>
            {product.category && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <Link
                  href={`/magazin?category=${product.category.id}`}
                  className="text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-orange-600 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:py-16 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-8 group min-h-[44px] -ml-2 px-2"
          aria-label="Înapoi"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Înapoi</span>
        </motion.button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="sticky top-32">
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-900/5 relative group">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                    <Package className="w-32 h-32 text-slate-300" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {isNew && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-2 text-xs font-bold bg-orange-500 text-white rounded-full flex items-center gap-2 shadow-lg shadow-orange-500/30"
                    >
                      <Sparkles className="w-4 h-4" />
                      NOU
                    </motion.span>
                  )}
                  {isOutOfStock && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-2 text-xs font-bold bg-red-500 text-white rounded-full shadow-lg"
                    >
                      STOC EPUIZAT
                    </motion.span>
                  )}
                </div>

                {/* Category Badge */}
                {product.category && (
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-800 rounded-full border border-slate-200 shadow-sm">
                      {product.category.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 lg:mt-0"
          >
            {/* Category */}
            {product.category && (
              <Link
                href={`/magazin?category=${product.category.id}`}
                className="inline-block text-xs text-orange-600 font-semibold uppercase tracking-widest hover:text-orange-700 transition-colors mb-4"
              >
                {product.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="bebas-neue-regular text-4xl sm:text-5xl lg:text-6xl text-slate-800 tracking-tight leading-tight mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-8 border-b border-slate-200">
              <span className="text-5xl font-bold text-slate-800">
                {product.price.toFixed(2)}
              </span>
              <span className="text-xl text-slate-500 font-medium">RON</span>
            </div>

            {/* Stock Status */}
            <div className="mt-8">
              {isOutOfStock ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600"
                >
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm">Stoc epuizat</span>
                </motion.div>
              ) : isLowStock ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700"
                >
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm">Doar {product.stock} bucăți în stoc</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700"
                >
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm">În stoc ({product.stock} buc.)</span>
                </motion.div>
              )}
            </div>

            {/* Description */}
            <div className="mt-10">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Descriere
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-12 space-y-5">
              {/* Quantity Selector */}
              <div className="flex items-center gap-5">
                <span className="text-sm font-medium text-slate-700">
                  Cantitate:
                </span>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="min-h-[52px] min-w-[52px] flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-16 min-h-[52px] flex items-center justify-center text-center text-slate-900 font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="min-h-[52px] min-w-[52px] flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
                whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full min-h-[60px] flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ${
                  isOutOfStock
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : justAdded
                    ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-6 h-6" />
                    Adăugat în coș!
                  </>
                ) : (
                  <>
                    <ShoppingCart className={`w-6 h-6 ${isAdding ? "animate-bounce" : ""}`} />
                    {isOutOfStock ? "Indisponibil" : "Adaugă în coș"}
                  </>
                )}
              </motion.button>

              {/* Subtotal Preview */}
              {!isOutOfStock && quantity > 1 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-slate-600"
                >
                  Subtotal: <span className="text-slate-900 font-bold text-lg">{(product.price * quantity).toFixed(2)} RON</span>
                </motion.p>
              )}
            </div>

            {/* Features */}
            <div className="mt-12 pt-12 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <Truck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">
                      Livrare rapidă
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      În 24-48 ore
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">
                      Garanție
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Produse certificate
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <RotateCcw className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">
                      Retur gratuit
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      În 14 zile
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Helper function to check if a date is within X days
function isWithinDays(date: Date, days: number): boolean {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}
