"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
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
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <style jsx>{`
          @keyframes elegant-spin {
            0% { transform: rotate(0deg); opacity: 0.3; }
            50% { opacity: 1; }
            100% { transform: rotate(360deg); opacity: 0.3; }
          }
        `}</style>
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-[3px] border-[#2F4538]/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-[3px] border-transparent border-t-[#2F4538] rounded-full"
                 style={{ animation: 'elegant-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}></div>
          </div>
          <p className="text-[#8B8681] text-sm font-light tracking-wide">Se încarcă produsul...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#C4907C]/5 border-2 border-[#C4907C]/20 flex items-center justify-center">
            <X className="w-12 h-12 text-[#C4907C]" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-light text-[#2F4538] mb-3 tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Produsul nu a fost găsit
          </h2>
          <p className="text-[#8B8681] mb-8 leading-relaxed">{error || "Acest produs nu există sau a fost șters."}</p>
          <Link
            href="/magazin"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2F4538] hover:bg-[#243529] text-[#FAF8F5] transition-all duration-300 hover:shadow-lg hover:shadow-[#2F4538]/10"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            Înapoi la magazin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden">
        {/* Grain texture overlay */}
        <div className="grain-overlay"></div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8DED0] rounded-full blur-[120px] opacity-30 -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2F4538] rounded-full blur-[150px] opacity-5 -z-0"></div>

        {/* Breadcrumb */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-[#E8DED0]/50 pt-24 sm:pt-28 lg:pt-32 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm flex-wrap" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <Link href="/" className="text-[#8B8681] hover:text-[#2F4538] transition-colors duration-300 whitespace-nowrap">
                Acasă
              </Link>
              <ChevronRight className="w-4 h-4 text-[#C4B5A0]" strokeWidth={1.5} />
              <Link href="/magazin" className="text-[#8B8681] hover:text-[#2F4538] transition-colors duration-300 whitespace-nowrap">
                Magazin
              </Link>
              {product.category && (
                <>
                  <ChevronRight className="w-4 h-4 text-[#C4B5A0]" strokeWidth={1.5} />
                  <Link
                    href={`/magazin?category=${product.category.id}`}
                    className="text-[#8B8681] hover:text-[#2F4538] transition-colors duration-300 whitespace-nowrap"
                  >
                    {product.category.name}
                  </Link>
                </>
              )}
              <ChevronRight className="w-4 h-4 text-[#C4B5A0]" strokeWidth={1.5} />
              <span className="text-[#2F4538] font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[#8B8681] hover:text-[#2F4538] transition-all duration-300 mb-10 group min-h-[44px] -ml-2 px-2"
            aria-label="Înapoi"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
            <span className="text-sm font-light tracking-wide">Înapoi</span>
          </button>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            {/* Image Section */}
            <div className="lg:col-span-7 animate-scale-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="sticky top-32">
                <div className="aspect-[4/5] w-full overflow-hidden bg-white border border-[#E8DED0] shadow-xl shadow-[#2F4538]/5 relative group">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FAF8F5] to-[#E8DED0]">
                      <Package className="w-32 h-32 text-[#C4B5A0]" strokeWidth={1} />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    {isNew && (
                      <span className="px-4 py-2 text-xs font-medium bg-[#2F4538] text-[#FAF8F5] flex items-center gap-2 shadow-lg uppercase tracking-widest"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                        Noutate
                      </span>
                    )}
                    {isOutOfStock && (
                      <span className="px-4 py-2 text-xs font-medium bg-[#C4907C] text-white shadow-lg uppercase tracking-widest"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Stoc epuizat
                      </span>
                    )}
                  </div>

                  {/* Category Badge */}
                  {product.category && (
                    <div className="absolute bottom-6 right-6">
                      <span className="px-4 py-2 text-xs font-light bg-white/90 backdrop-blur-sm text-[#2F4538] border border-[#E8DED0] uppercase tracking-widest"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {product.category.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-12 lg:mt-0 lg:col-span-5 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              {/* Category */}
              {product.category && (
                <Link
                  href={`/magazin?category=${product.category.id}`}
                  className="inline-block text-xs text-[#8B8681] font-medium uppercase tracking-[0.2em] hover:text-[#2F4538] transition-colors duration-300 mb-4"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {product.category.name}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#2F4538] tracking-tight leading-[1.1] mb-6"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-8 border-b border-[#E8DED0]">
                <span className="text-5xl font-light text-[#2F4538] tracking-tight"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {product.price.toFixed(2)}
                </span>
                <span className="text-xl text-[#8B8681] font-light"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  RON
                </span>
              </div>

              {/* Stock Status */}
              <div className="mt-6">
                {isOutOfStock ? (
                  <div className="flex items-center gap-2 text-[#C4907C]">
                    <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-light text-sm tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Stoc epuizat
                    </span>
                  </div>
                ) : isLowStock ? (
                  <div className="flex items-center gap-2 text-[#D4A574]">
                    <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-light text-sm tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Doar {product.stock} bucăți în stoc
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#5C7A5E]">
                    <Check className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-light text-sm tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      În stoc ({product.stock} buc.)
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-10">
                <h3 className="text-xs font-medium text-[#8B8681] uppercase tracking-[0.2em] mb-4"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Descriere
                </h3>
                <p className="text-[#5C5752] leading-[1.8] font-light text-base"
                   style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {product.description}
                </p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-12 space-y-5">
                {/* Quantity Selector */}
                <div className="flex items-center gap-5">
                  <span className="text-sm font-light text-[#8B8681] tracking-wide"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Cantitate
                  </span>
                  <div className="flex items-center bg-white border border-[#E8DED0] overflow-hidden">
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="min-h-[52px] min-w-[52px] flex items-center justify-center text-[#8B8681] hover:text-[#2F4538] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <Minus className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <span className="w-16 min-h-[52px] flex items-center justify-center text-center text-[#2F4538] font-light text-lg"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="min-h-[52px] min-w-[52px] flex items-center justify-center text-[#8B8681] hover:text-[#2F4538] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full min-h-[60px] flex items-center justify-center gap-3 px-8 py-4 font-medium text-base transition-all duration-500 uppercase tracking-[0.15em] ${
                    isOutOfStock
                      ? "bg-[#E8DED0] text-[#C4B5A0] cursor-not-allowed"
                      : justAdded
                      ? "bg-[#5C7A5E] text-white shadow-xl shadow-[#5C7A5E]/20"
                      : "bg-[#2F4538] hover:bg-[#243529] text-[#FAF8F5] hover:shadow-xl hover:shadow-[#2F4538]/20 active:scale-[0.98]"
                  }`}
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-5 h-5" strokeWidth={2} />
                      Adăugat în coș
                    </>
                  ) : (
                    <>
                      <ShoppingCart className={`w-5 h-5 ${isAdding ? "animate-bounce" : ""}`} strokeWidth={1.5} />
                      {isOutOfStock ? "Indisponibil" : "Adaugă în coș"}
                    </>
                  )}
                </button>

                {/* Subtotal Preview */}
                {!isOutOfStock && quantity > 1 && (
                  <p className="text-center text-[#8B8681] font-light text-sm"
                     style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Subtotal:{" "}
                    <span className="text-[#2F4538] font-medium"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {(product.price * quantity).toFixed(2)} RON
                    </span>
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="mt-16 pt-12 border-t border-[#E8DED0]">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-[#2F4538]/5 border border-[#E8DED0] transition-all duration-300 group-hover:bg-[#2F4538]/10">
                      <Truck className="w-5 h-5 text-[#2F4538]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#2F4538] mb-1"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Livrare rapidă
                      </h4>
                      <p className="text-xs text-[#8B8681] font-light leading-relaxed"
                         style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        În 24-48 ore
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-[#2F4538]/5 border border-[#E8DED0] transition-all duration-300 group-hover:bg-[#2F4538]/10">
                      <Shield className="w-5 h-5 text-[#2F4538]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#2F4538] mb-1"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Garanție
                      </h4>
                      <p className="text-xs text-[#8B8681] font-light leading-relaxed"
                         style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Produse certificate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-[#2F4538]/5 border border-[#E8DED0] transition-all duration-300 group-hover:bg-[#2F4538]/10">
                      <RotateCcw className="w-5 h-5 text-[#2F4538]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#2F4538] mb-1"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        Retur gratuit
                      </h4>
                      <p className="text-xs text-[#8B8681] font-light leading-relaxed"
                         style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        În 14 zile
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper function to check if a date is within X days
function isWithinDays(date: Date, days: number): boolean {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}
