"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import Link from "next/link";

interface OrderDetails {
  id: number;
  orderCode: string;
  total: number;
  status: string;
  createdAt: string;
  deliveryName: string;
  deliveryEmail: string;
  deliveryPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryCounty: string;
  deliveryPostalCode: string;
  deliveryCountry: string;
  deliveryNotes: string;
  items: Array<{
    id: number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
}

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useAuth();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const orderCode = searchParams.get("orderCode");

  useEffect(() => {
    // Don't redirect to login - show success page even without token
    // Just try to fetch order details if we have token and orderCode
    
    if (!orderCode) {
      console.log("No order code in URL - showing generic success");
      setLoading(false);
      return;
    }

    // Wait a bit for auth context to load, then try to fetch order
    const fetchOrder = async () => {
      // Check both context token and localStorage as fallback
      const storedToken = localStorage.getItem("token");
      const authToken = token || storedToken;
      
      if (!authToken) {
        console.log("No token available - showing success without order details");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching order with code:", orderCode);
        const orderData = await api.orders.getByCode(orderCode, authToken) as OrderDetails;
        console.log("Order fetched successfully:", orderData);
        setOrder(orderData);
      } catch (err) {
        console.error("Error fetching order:", err);
        const errorMessage = err instanceof Error ? err.message : "Nu s-a putut încărca comanda";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to allow auth context to initialize
    const timer = setTimeout(fetchOrder, 100);
    return () => clearTimeout(timer);
  }, [orderCode, token, router]);

  // Show loading while fetching order details
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Se încarcă detaliile comenzii...</p>
        </div>
      </div>
    );
  }

  // Show success page even if order details can't be loaded
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Success Header - Always show success even without order details */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mulțumim pentru comandă!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Plata a fost procesată cu succes
            </p>
            {orderCode && (
              <div className="inline-block bg-blue-50 px-6 py-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Număr comandă</p>
                <p className="text-2xl font-mono font-bold text-blue-600">{orderCode}</p>
              </div>
            )}
            {error && (
              <p className="mt-4 text-sm text-orange-600">
                Notă: {error}
              </p>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Ce urmează?</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Vei primi un email de confirmare</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Comanda ta va fi procesată în 1-2 zile lucrătoare</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Vei primi un email când comanda va fi expediată</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/magazin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
            >
              Continuă cumpărăturile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mulțumim pentru comandă!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Plata a fost procesată cu succes
          </p>
          <div className="inline-block bg-blue-50 px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Număr comandă</p>
            <p className="text-2xl font-mono font-bold text-blue-600">{order.orderCode}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white p-8 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Detalii Comandă</h2>
          
          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {item.price.toFixed(2)} RON
                  </p>
                </div>
                <p className="font-semibold">{item.subtotal.toFixed(2)} RON</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{order.total.toFixed(2)} RON</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white p-8 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Informații Livrare</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Nume</p>
              <p className="font-medium">{order.deliveryName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{order.deliveryEmail}</p>
            </div>
            <div>
              <p className="text-gray-600">Telefon</p>
              <p className="font-medium">{order.deliveryPhone}</p>
            </div>
            <div>
              <p className="text-gray-600">Adresă</p>
              <p className="font-medium">{order.deliveryAddress}</p>
            </div>
            <div>
              <p className="text-gray-600">Oraș</p>
              <p className="font-medium">
                {order.deliveryCity}
                {order.deliveryCounty && `, ${order.deliveryCounty}`}
                {order.deliveryPostalCode && `, ${order.deliveryPostalCode}`}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Țară</p>
              <p className="font-medium">{order.deliveryCountry}</p>
            </div>
            {order.deliveryNotes && (
              <div className="md:col-span-2">
                <p className="text-gray-600">Observații</p>
                <p className="font-medium">{order.deliveryNotes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Ce urmează?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Vei primi un email de confirmare la <strong>{order.deliveryEmail}</strong></span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Comanda ta va fi procesată în 1-2 zile lucrătoare</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Vei primi un email când comanda va fi expediată</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Livrarea se face în 3-5 zile lucrătoare</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/magazin"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
          >
            Continuă cumpărăturile
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Printează confirmarea
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Se încarcă...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
