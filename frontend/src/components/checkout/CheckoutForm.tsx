"use client";

import { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

interface CheckoutFormProps {
  orderId: number | null;
  orderCode: string | null;
  onSuccess: () => void;
}

export default function CheckoutForm({ orderId, orderCode, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?orderCode=${orderCode || ''}`,
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message || "An unexpected error occurred.");
        setIsLoading(false);
        return;
      }

      console.log("Payment result:", { 
        paymentIntent: paymentIntent ? {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount
        } : null,
        error: error ? error.message : null
      });

      if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("✅ Payment succeeded! Order code:", orderCode);
        
        // Confirm with backend in parallel (don't wait)
        if (token && paymentIntent.id) {
          api.payments.confirmSuccess(paymentIntent.id, token)
            .then(() => console.log("✅ Payment confirmed with backend"))
            .catch(err => console.error("⚠️ Backend confirmation failed:", err));
        }
        
        // Redirect IMMEDIATELY - no delay
        const successUrl = orderCode 
          ? `/checkout/success?orderCode=${orderCode}`
          : `/checkout/success`;
        console.log("🔄 Redirecting immediately to:", successUrl);
        
        // Use window.location for instant redirect (no React router delay)
        window.location.href = successUrl;
      } else if (paymentIntent) {
        console.log("⚠️ Payment status:", paymentIntent.status);
        setMessage(`Payment status: ${paymentIntent.status}. Please contact support if payment was processed.`);
        setIsLoading(false);
      } else {
        console.log("⚠️ No payment intent returned");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setMessage(err.message || "An unexpected error occurred during payment.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Pay Now"
        )}
      </button>

      {message && (
        <div className={`text-sm text-center p-3 rounded ${
          message.includes("successful") || message.includes("Success")
            ? "text-green-700 bg-green-50"
            : "text-red-600 bg-red-50"
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}

