"use client";

import { useState } from "react";
import "aos/dist/aos.css";

export default function EmailOrderSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      consent: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.textContent = "Se trimite...";
    submitButton.disabled = true;

    try {
      // Prepare form data for Netlify
      const formDataToSend = new FormData(e.currentTarget);
      
      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend as any).toString(),
      });

      if (response.ok) {
        // Show success message
        alert("Mulțumim! Formularul a fost trimis cu succes. Vă vom contacta în curând!");
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });

        // Redirect to home page after a short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      console.error("Error:", error);
      alert("A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.");
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-16 grid-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Trimiteti o comanda prin e-mail
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Contactati-ne pentru orice intrebari despre produsele noastre sau pentru a face o comanda personalizata
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20" data-aos="fade-up" data-aos-delay="200">
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit} data-netlify="true" name="contact">
                <input type="hidden" name="form-name" value="contact" />
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-teal-300">
                      Nume *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black bg-white/90"
                      placeholder="Numele dvs."
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-teal-300">
                      Prenume *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black bg-white/90"
                      placeholder="Prenumele dvs."
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-teal-300">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black bg-white/90"
                      placeholder="Numarul de telefon"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-teal-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black bg-white/90"
                      placeholder="Adresa de email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-teal-300">
                    Subiect
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black bg-white/90"
                    placeholder="Subiect (ex. comanda sarma, intrebare despre produse)"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-teal-300">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black bg-white/90 resize-none"
                    placeholder="Detaliati comanda sau intrebarea dvs. (tipul de produs, cantitatea, specificatii speciale, etc.)"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    onChange={handleCheckboxChange}
                  />
                  <label className="text-sm text-gray-300">
                    Sunt de acord cu{" "}
                    <a href="#" className="text-teal-400 hover:text-teal-300 underline">
                      termenii si conditiile
                    </a>{" "}
                    si{" "}
                    <a href="#" className="text-teal-400 hover:text-teal-300 underline">
                      politica de confidentialitate
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Trimite comanda
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 