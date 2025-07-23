"use client";

import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import emailjs from '@emailjs/browser';

export default function TokenFormUserEmail() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.error("EmailJS public key not found in environment variables");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const templateParams = {
        to_email: "sudexpert@yahoo.com",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        title: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleString('ro-RO'),
      };

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      
      if (!serviceId || !templateId) {
        throw new Error("EmailJS service ID or template ID not found in environment variables");
      }

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );
      
      setSubmitStatus("success");
      setShowModal(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05),transparent_70%)]"></div>
      
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-200 leading-tight">
              Formular de{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                comandă
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto"></div>
            
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Completați formularul de mai jos pentru a trimite comanda dumneavoastră. 
              Toate informațiile vor fi transmise direct către echipa noastră.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-600/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-white/20" data-aos="fade-up" data-aos-delay="200">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-teal-300">
                    Nume complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-6 py-4 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-gray-100/95 text-lg transition-all duration-300 hover:border-teal-400/50"
                    placeholder="Introduceți numele complet"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-teal-300">
                    Adresă email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-gray-100/95 text-lg transition-all duration-300 hover:border-teal-400/50"
                    placeholder="exemplu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-teal-300">
                    Număr de telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-6 py-4 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-gray-100/95 text-lg transition-all duration-300 hover:border-teal-400/50"
                    placeholder="+40 123 456 789"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-teal-300">
                    Subiectul comenzii *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-6 py-4 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-gray-100/95 text-lg transition-all duration-300 hover:border-teal-400/50"
                    placeholder="Descrierea scurtă a comenzii"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Message Field - Full Width */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-teal-300">
                  Detalii comandă *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full px-6 py-4 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-gray-100/95 text-lg resize-none transition-all duration-300 hover:border-teal-400/50"
                  placeholder="Descrieți în detaliu cerințele pentru comandă, specificații tehnice, termene, etc."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              {/* Info Box */}
              <div className="bg-teal-500/10 border border-teal-400/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-teal-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <p className="font-medium text-teal-300 mb-1">Informații importante:</p>
                    <p>Comanda dumneavoastră va fi trimisă direct către echipa noastră și veți primi un răspuns în cel mai scurt timp posibil. Pentru urgențe, vă rugăm să ne contactați direct la +40 724 207 132.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-xl hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="flex items-center justify-center space-x-3">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Se trimite comanda...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        <span>Trimite comanda</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
                          </form>
          </div>
        </div>

      {/* Enhanced Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100" data-aos="zoom-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Comandă trimisă cu succes!
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Am primit comanda dumneavoastră și vă vom contacta în cel mai scurt timp posibil pentru confirmarea detaliilor.
              </p>
              
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 