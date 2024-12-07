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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
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
        alert(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <section className="relative w-full h-[190vh]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/welding-gif.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-start p-6 text-white h-full justify-around">
        {/* Text Content */}
        <div
          className="flex flex-col gap-2"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <p className="text-base sm:text-lg text-gray-300 font-bold">
            25+ Ani de experiență și performanță în sudură
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold">
            Produse și Soluții Complete în Sudură
          </h1>
          <h2 className="text-lg sm:text-lg text-gray-200 pt-4">
            La Sudexpert oferim o gamă largă de produse de calitate pentru orice proiecte în sudură.
          </h2>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col justify-between items-center w-full" data-aos="fade-up" data-aos-delay="200">
          {/* Button */}
          <a
            href="tel:+40724207132"
            className="block w-full text-center px-8 py-3 border border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300 max-w-md shadow-[0px_10px_30px_rgba(0,0,0,0.8)]"
          >
            +40 724 207 132
          </a>
          
          {/* Trusted By Section */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <p className="text-md sm:text-lg text-white text-center">
              Asigurăm încrederea mărcilor de top din industrie.
            </p>
            <div className="flex gap-1 text-1xl text-teal-400">
              {"★ ★ ★ ★ ★".split(" ").map((star, index) => (
                <span key={index}>{star}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Email Form */}
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
      </div>
    </section>
  );
}
