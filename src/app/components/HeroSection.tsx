"use client";

import { useState } from "react";
import "aos/dist/aos.css";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: { target: { checked: any; }; }) => {
    setFormData((prev) => ({
      ...prev,
      consent: e.target.checked,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch("https://sudexpert-backend.fly.dev/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
          consent: false,
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <section className="relative w-full h-[190vh]">
      <div className="bg-gray-100/10 p-6 rounded-2xl">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Ne puteti contacta si prin Email</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-teal-300"> Nume </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-black"
                placeholder="Numele"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-teal-300"> Prenume </label>
              <input
                type="text"
                name="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-black"
                placeholder="Prenumele"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-teal-300"> Telefon* </label>
              <input
                type="text"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-black"
                placeholder="Numar de telefon"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-teal-300"> Email* </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-black"
                placeholder="Adresa dv. de email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-teal-300"> Subiect </label>
              <input
                type="text"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-black"
                placeholder="Subiect (ex. comanda sarma)"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-teal-300"> Mesaj* </label>
              <textarea
                name="message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-black resize-none overflow-auto"
                placeholder="Mesajul dv."
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                checked={formData.consent}
                onChange={handleCheckboxChange}
              />
              <label className="ml-2 text-sm text-white"> Sunt de acord cu termenii si conditiile </label>
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-teal-700 rounded-md hover:bg-teal-800 focus:outline-none focus:bg-teal-800">
                Trimite mail-ul
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
