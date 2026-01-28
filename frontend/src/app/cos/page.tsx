"use client";

import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { items, removeItem, totalPrice } = useCart();
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!isAuthenticated || !token) {
      router.push("/login?redirect=/cos");
      return;
    }

    // Redirect to checkout page with Stripe integration
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-28 sm:pt-32 lg:pt-36 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">Coșul tău este gol</h1>
        <Link
          href="/magazin"
          className="text-orange-600 hover:text-orange-500 font-medium flex items-center gap-2 min-h-[48px] items-center justify-center"
        >
          Mergi la magazin <ArrowRight className="h-4 w-4 flex-shrink-0" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:pt-32 lg:pt-36 py-8 sm:py-16 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
          Coș de cumpărături
        </h1>

        <div className="mt-8 sm:mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 sm:py-6 md:py-10">
                  <div className="flex-shrink-0 relative flex justify-center sm:justify-start">
                    {item.imageUrl ? (
                      <div className="h-24 w-24 sm:h-32 sm:w-32 md:h-48 md:w-48 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 192px"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-24 sm:h-32 sm:w-32 md:h-48 md:w-48 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm flex-shrink-0">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col sm:ml-4 md:ml-6">
                    <div className="relative">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-medium text-gray-800">
                            <Link
                              href={`/magazin/${item.id}`}
                              className="hover:text-orange-600 transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {item.price} RON
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0 -m-2 sm:m-0"
                          aria-label={`Șterge ${item.name} din coș`}
                        >
                          <Trash2 className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 sm:mt-4">
                        <p className="text-sm text-gray-500">Cantitate: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-6 sm:mt-8 lg:mt-0 rounded-xl bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8 sticky top-20 sm:top-24 lg:top-28"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Sumar comandă
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  {totalPrice} RON
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full min-h-[48px] rounded-xl border border-transparent bg-orange-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-colors"
              >
                Continuă la plată
              </button>
              {!isAuthenticated && (
                <p className="mt-2 text-sm text-center text-gray-500 px-2">
                  Trebuie să fii autentificat pentru a plasa comanda.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
