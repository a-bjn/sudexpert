"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call - replace with actual password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Nu s-a putut trimite emailul. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-orange-50/30 px-4 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-lg border border-slate-200">
                <KeyRound className="w-8 h-8 text-slate-600" />
              </div>
            </div>
          </motion.div>

          {success ? (
            // Success State
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="bebas-neue-regular text-3xl md:text-4xl text-slate-800 mb-3">
                Email Trimis!
              </h1>
              <p className="text-slate-500 mb-8">
                Am trimis instrucțiunile de resetare a parolei la adresa{" "}
                <span className="font-semibold text-slate-700">{email}</span>
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Nu ai primit emailul? Verifică folderul Spam sau{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-orange-600 hover:text-orange-500 font-medium"
                >
                  încearcă din nou
                </button>
              </p>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30"
                >
                  Înapoi la Autentificare
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            // Form State
            <>
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="bebas-neue-regular text-3xl md:text-4xl text-slate-800 mb-2">
                  Ai uitat parola?
                </h1>
                <p className="text-slate-500">
                  Nu-ți face griji, îți vom trimite instrucțiuni de resetare.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Introdu adresa de email"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    "Resetează Parola"
                  )}
                </motion.button>
              </form>

              {/* Back to Login Link */}
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 mt-8 text-slate-500 hover:text-orange-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Înapoi la autentificare
              </Link>
            </>
          )}
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-6 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la pagina principală
        </Link>
      </motion.div>
    </div>
  );
}
