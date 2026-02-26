"use client";

import { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { api } from "@/lib/api";

interface CheckoutFormProps {
  orderId: number | null;
  orderCode: string | null;
  onSuccess: () => void;
}

export default function CheckoutForm({ orderCode, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
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

      if (paymentIntent && paymentIntent.status === "succeeded") {
        if (paymentIntent.id) {
          api.payments.confirmSuccess(paymentIntent.id).catch(() => {});
        }
        sessionStorage.removeItem("cart");
        onSuccess();
        const successUrl = orderCode
          ? `/checkout/success?orderCode=${orderCode}`
          : `/checkout/success`;
        window.location.href = successUrl;
      } else if (paymentIntent) {
        setMessage(`Payment status: ${paymentIntent.status}. Please contact support if payment was processed.`);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred during payment.";
      setMessage(errorMessage);
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

