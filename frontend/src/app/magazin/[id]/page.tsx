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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-500/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-neutral-400 text-sm">Se încarcă produsul...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Produsul nu a fost găsit</h2>
          <p className="text-neutral-400 mb-6">{error || "Acest produs nu există sau a fost șters."}</p>
          <Link
            href="/magazin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Înapoi la magazin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Breadcrumb */}
      <div className="bg-neutral-900/50 border-b border-neutral-800 pt-24 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-wrap overflow-x-auto scrollbar-hide -mx-1 px-1">
            <Link href="/" className="text-neutral-500 hover:text-white transition-colors whitespace-nowrap flex-shrink-0">
              Acasă
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-600 flex-shrink-0" />
            <Link href="/magazin" className="text-neutral-500 hover:text-white transition-colors whitespace-nowrap flex-shrink-0">
              Magazin
            </Link>
            {product.category && (
              <>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-600 flex-shrink-0" />
                <Link
                  href={`/magazin?category=${product.category.id}`}
                  className="text-neutral-500 hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-600 flex-shrink-0" />
            <span className="text-orange-500 font-medium truncate max-w-[120px] sm:max-w-[200px] flex-shrink-0">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6 sm:mb-8 group min-h-[44px] min-w-[44px] -m-2 p-2 rounded-lg hover:bg-neutral-800/50"
          aria-label="Înapoi"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 flex-shrink-0" />
          <span className="text-sm sm:text-base">Înapoi</span>
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 relative">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Package className="w-24 h-24 text-neutral-700" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isNew && (
                  <span className="px-3 py-1.5 text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg flex items-center gap-1.5 shadow-lg shadow-orange-500/30">
                    <Sparkles className="w-4 h-4" />
                    NOU
                  </span>
                )}
                {isOutOfStock && (
                  <span className="px-3 py-1.5 text-sm font-bold bg-red-500 text-white rounded-lg shadow-lg">
                    STOC EPUIZAT
                  </span>
                )}
              </div>

              {/* Category Badge */}
              {product.category && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 text-sm font-medium bg-black/60 backdrop-blur-sm text-white rounded-lg">
                    {product.category.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-10 lg:mt-0">
            {/* Category */}
            {product.category && (
              <Link
                href={`/magazin?category=${product.category.id}`}
                className="inline-block text-sm text-orange-500 font-medium uppercase tracking-wider hover:text-orange-400 transition-colors mb-3"
              >
                {product.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white bebas-neue-regular tracking-wide break-words">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 sm:mt-6 flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {product.price.toFixed(2)}
              </span>
              <span className="text-lg sm:text-xl text-neutral-500">RON</span>
            </div>

            {/* Stock Status */}
            <div className="mt-6">
              {isOutOfStock ? (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Stoc epuizat</span>
                </div>
              ) : isLowStock ? (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Doar {product.stock} bucăți în stoc</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">În stoc ({product.stock} buc.)</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                Descriere
              </h3>
              <div className="prose prose-invert prose-neutral max-w-none">
                <p className="text-neutral-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-10 space-y-4">
              {/* Quantity Selector */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-sm font-medium text-neutral-400 w-full sm:w-auto">Cantitate:</span>
                <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="min-h-[48px] min-w-[48px] p-3 flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 min-h-[48px] flex items-center justify-center text-center text-white font-medium text-base">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="min-h-[48px] min-w-[48px] p-3 flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full min-h-[52px] flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 touch-manipulation ${
                  isOutOfStock
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : justAdded
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98]"
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
              </button>

              {/* Subtotal Preview */}
              {!isOutOfStock && quantity > 1 && (
                <p className="text-center text-neutral-400">
                  Subtotal: <span className="text-white font-semibold">{(product.price * quantity).toFixed(2)} RON</span>
                </p>
              )}
            </div>

            {/* Features */}
            <div className="mt-10 pt-10 border-t border-neutral-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Truck className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Livrare rapidă</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">În 24-48 ore</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Garanție</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">Produse certificate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <RotateCcw className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Retur gratuit</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">În 14 zile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
