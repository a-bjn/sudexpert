"use client";

import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { items, removeItem, totalPrice, clearCart } = useCart();
  const { isAuthenticated, token } = useAuth();
  const [loading, setLoading] = useState(false);
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Coșul tău este gol</h1>
        <Link
          href="/magazin"
          className="text-orange-600 hover:text-orange-500 font-medium flex items-center"
        >
          Mergi la magazin <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Coș de cumpărături
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-400 sm:h-48 sm:w-48">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              href={`/magazin/${item.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {item.price} RON
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">
                          Quantity, {item.name}
                        </label>
                        <p className="text-sm text-gray-500">Cantitate: {item.quantity}</p>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
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
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
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
                onClick={handleCheckout}
                className="w-full rounded-md border border-transparent bg-orange-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Continuă la plată
              </button>
              {!isAuthenticated && (
                <p className="mt-2 text-sm text-center text-gray-500">
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
