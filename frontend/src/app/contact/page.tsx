"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, User, MessageSquare, Send, Loader2, CheckCircle, Clock, Building2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call - replace with actual contact form logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Nu s-a putut trimite mesajul. Încearcă din nou.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "0724 207 132",
      subContent: "Luni - Vineri: 8:00 - 17:00",
      href: "tel:+40724207132",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@sudexpert.ro",
      subContent: "Răspundem în 24h",
      href: "mailto:contact@sudexpert.ro",
    },
    {
      icon: MapPin,
      title: "Adresă",
      content: "Strada Principală nr. 10",
      subContent: "Brăila, România",
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Program",
      content: "Luni - Vineri",
      subContent: "08:00 - 17:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative Orbs */}
      <div className="absolute top-20 -right-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/30 mb-4 sm:mb-6"
        >
          <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>
        <h1 className="bebas-neue-regular text-4xl sm:text-5xl md:text-6xl text-slate-800 mb-3 sm:mb-4 px-2">
          Contactează-ne
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto px-4">
          Suntem aici pentru a te ajuta cu orice întrebare despre produsele și serviciile noastre.
          Nu ezita să ne contactezi!
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-4"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group"
              >
                {info.href ? (
                  <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-all">
                          <info.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 mb-1">{info.title}</h3>
                          <p className="text-slate-700">{info.content}</p>
                          <p className="text-sm text-slate-500">{info.subContent}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">{info.title}</h3>
                        <p className="text-slate-700">{info.content}</p>
                        <p className="text-sm text-slate-500">{info.subContent}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Hartă interactivă</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 md:p-8 lg:p-10">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="bebas-neue-regular text-3xl md:text-4xl text-slate-800 mb-3">
                    Mesaj Trimis!
                  </h2>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Îți mulțumim pentru mesaj! Echipa noastră îți va răspunde în cel mai scurt timp posibil.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSuccess(false)}
                    className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30"
                  >
                    Trimite Alt Mesaj
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="bebas-neue-regular text-3xl md:text-4xl text-slate-800 mb-2">
                      Trimite un Mesaj
                    </h2>
                    <p className="text-slate-500">
                      Completează formularul și te vom contacta în cel mai scurt timp.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Nume Complet
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Introdu numele"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Adresă Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Introdu emailul"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                          Telefon (opțional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Introdu telefonul"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                          Subiect
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Selectează subiectul</option>
                            <option value="general">Întrebare Generală</option>
                            <option value="products">Despre Produse</option>
                            <option value="order">Despre Comandă</option>
                            <option value="support">Suport Tehnic</option>
                            <option value="partnership">Parteneriat</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Mesaj
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Scrie mesajul tău aici..."
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all resize-none"
                      />
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
                      className="w-full py-4 bg-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Se trimite...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Trimite Mesajul
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
