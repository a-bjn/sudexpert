"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { api } from "@/lib/api";

// Replace with your Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_your_publishable_key_here");

interface DeliveryInfo {
  deliveryName: string;
  deliveryEmail: string;
  deliveryPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryCounty: string;
  deliveryPostalCode: string;
  deliveryCountry: string;
  deliveryNotes: string;
}

interface OrderResponse {
  id: number;
  orderCode: string;
  total: number;
  status: string;
  createdAt: string;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"delivery" | "payment">("delivery");
  
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    deliveryName: "",
    deliveryEmail: user?.email || "",
    deliveryPhone: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryCounty: "",
    deliveryPostalCode: "",
    deliveryCountry: "Romania",
    deliveryNotes: "",
  });

  useEffect(() => {
    // If cart is empty, redirect to shop (no need to check auth)
    if (items.length === 0) {
      router.push("/magazin");
      return;
    }

    // Wait a moment for auth context to load token from localStorage
    const checkAuth = () => {
      // Check both context token and localStorage as fallback
      const storedToken = localStorage.getItem("token");
      const storedEmail = localStorage.getItem("email");
      const authToken = token || storedToken;
      const authUser = user || (storedEmail ? { email: storedEmail } : null);
      
      if (!authUser || !authToken) {
        // Only redirect if we're sure there's no token after a delay
        // This prevents false redirects when token is still loading
        setTimeout(() => {
          const finalToken = localStorage.getItem("token");
          const finalEmail = localStorage.getItem("email");
          if (!finalToken || !finalEmail) {
            console.log("No auth found after delay, redirecting to login");
            router.push("/login?redirect=/checkout");
          }
        }, 500);
        return;
      }
    };

    checkAuth();
  }, [user, token, items, router]);

  const handleDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError("");

      // Debug: Check if token exists
      console.log('Checkout - Token exists:', !!token);
      console.log('Checkout - User:', user);
      
      if (!token) {
        setError("You must be logged in to place an order. Redirecting to login...");
        setTimeout(() => router.push("/login?redirect=/checkout"), 2000);
        return;
      }

      // Create order with delivery information
      const orderData = {
        items: items.map((item) => ({
          product: { id: item.id },
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
        ...deliveryInfo,
      };

      console.log('Creating order with data:', orderData);
      const order = await api.orders.create(orderData, token) as OrderResponse;
      console.log('Order created:', order);
      console.log('Order code:', order.orderCode);
      setOrderId(order.id);
      setOrderCode(order.orderCode);
      
      if (!order.orderCode) {
        console.warn('Warning: Order created but orderCode is missing!');
      }

      // Create payment intent
      const paymentIntent = await api.payments.createPaymentIntent(
        {
          amount: totalPrice,
          currency: "ron",
          orderId: order.id,
        },
        token!
      ) as PaymentIntentResponse;

      setClientSecret(paymentIntent.clientSecret);
      setStep("payment");
    } catch (err: unknown) {
      console.error("Checkout initialization error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize checkout";
      
      // Check if it's an authentication error
      if (errorMessage.includes("403") || errorMessage.includes("Forbidden")) {
        setError("Authentication failed. Please log in again.");
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          router.push("/login?redirect=/checkout");
        }, 2000);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 sm:pt-32 lg:pt-36 py-8 sm:py-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Finalizare Comandă</h1>

        {/* Progress Steps */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0 ${step === "delivery" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`}>
              {step === "payment" ? "✓" : "1"}
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-900">Livrare</span>
          </div>
          <div className="w-12 sm:w-24 h-1 bg-gray-300 flex-shrink-0"></div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0 ${step === "payment" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}`}>
              2
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-900">Plată</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Order Summary - Always visible */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow sticky top-20 sm:top-24 lg:top-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Sumar Comandă</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-700">{item.quantity} × {item.price.toFixed(2)} RON</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} RON
                    </p>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} RON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {step === "delivery" ? (
              /* Delivery Form */
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">Informații Livrare</h2>
                <form onSubmit={handleDeliverySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-900">Nume complet *</label>
                      <input
                        type="text"
                        name="deliveryName"
                        value={deliveryInfo.deliveryName}
                        onChange={handleInputChange}
                        required
                        className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-900">Email *</label>
                      <input
                        type="email"
                        name="deliveryEmail"
                        value={deliveryInfo.deliveryEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telefon *</label>
                    <input
                      type="tel"
                      name="deliveryPhone"
                      value={deliveryInfo.deliveryPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="07XX XXX XXX"
                      className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Adresă *</label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={deliveryInfo.deliveryAddress}
                      onChange={handleInputChange}
                      required
                      placeholder="Strada, număr, bloc, scară, apartament"
                      className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-900">Oraș *</label>
                      <input
                        type="text"
                        name="deliveryCity"
                        value={deliveryInfo.deliveryCity}
                        onChange={handleInputChange}
                        required
                        className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-900">Județ</label>
                      <input
                        type="text"
                        name="deliveryCounty"
                        value={deliveryInfo.deliveryCounty}
                        onChange={handleInputChange}
                        className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-900">Cod poștal</label>
                      <input
                        type="text"
                        name="deliveryPostalCode"
                        value={deliveryInfo.deliveryPostalCode}
                        onChange={handleInputChange}
                        className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Țară *</label>
                    <input
                      type="text"
                      name="deliveryCountry"
                      value={deliveryInfo.deliveryCountry}
                      onChange={handleInputChange}
                      required
                      className="w-full min-h-[44px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Observații (opțional)</label>
                    <textarea
                      name="deliveryNotes"
                      value={deliveryInfo.deliveryNotes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Instrucțiuni speciale pentru livrare..."
                      className="w-full min-h-[80px] px-4 py-2.5 border rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full min-h-[48px] bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-base"
                  >
                    {loading ? "Se procesează..." : "Continuă la plată"}
                  </button>
                </form>
              </div>
            ) : (
              /* Payment Form */
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Plată</h2>
                </div>
                {clientSecret && (
                  <Elements options={{ clientSecret, appearance: { theme: "stripe" as const } }} stripe={stripePromise}>
                    <CheckoutForm 
                      orderId={orderId}
                      orderCode={orderCode}
                      onSuccess={() => {
                        console.log('✅ onSuccess called! Order code:', orderCode);
                        clearCart();
                        const redirectUrl = orderCode 
                          ? `/checkout/success?orderCode=${orderCode}`
                          : `/checkout/success`;
                        console.log('🔄 Attempting redirect to:', redirectUrl);
                        
                        // Try router.push first
                        try {
                          router.push(redirectUrl);
                          console.log('✅ router.push called');
                          
                          // Fallback: if router.push doesn't work, use window.location after a delay
                          setTimeout(() => {
                            if (window.location.pathname !== '/checkout/success') {
                              console.log('⚠️ router.push may have failed, using window.location');
                              window.location.href = redirectUrl;
                            }
                          }, 500);
                        } catch (err) {
                          console.error('❌ Error with router.push, using window.location:', err);
                          window.location.href = redirectUrl;
                        }
                      }}
                    />
                  </Elements>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

