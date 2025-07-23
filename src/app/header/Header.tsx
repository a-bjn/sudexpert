"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/40 backdrop-blur-md border-b border-white/10' 
        : 'bg-black/20 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo and Text */}
          <div className="flex items-center gap-3">
            <div className="relative">
          <Image
            src="/logo.svg"
            alt="Sudexpert Logo"
                width={48}
                height={48}
                className="w-12 h-12 invert"
          />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Sudexpert Brăila
              </span>
          </h1>
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-white hover:text-teal-400 transition-colors duration-300 font-medium relative group scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Acasă
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#about" 
              className="text-white hover:text-teal-400 transition-colors duration-300 font-medium relative group scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Despre Noi
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#services" 
              className="text-white hover:text-teal-400 transition-colors duration-300 font-medium relative group scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Servicii
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-teal-400 transition-colors duration-300 font-medium relative group scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            {/* CTA Button */}
            <a
              href="tel:+40724207132"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25"
            >
              Sună Acum
            </a>
          </nav>

          {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMenu}
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
        >
          {/* Top Bar */}
          <span
              className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
            }`}
          ></span>
          {/* Middle Bar */}
          <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          {/* Bottom Bar */}
          <span
              className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-0.55" : "translate-y-1"
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
      >
          <nav className="px-6 py-6">
            <ul className="space-y-4">
          <li>
                <a 
                  href="#home" 
                  className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2 border-b border-white/10"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Acasă
            </a>
          </li>
          <li>
                <a 
                  href="#about" 
                  className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2 border-b border-white/10"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Despre Noi
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2 border-b border-white/10"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Servicii
            </a>
          </li>
          <li>
              <a 
                href="#contact" 
                className="block text-white hover:text-teal-400 transition-colors duration-300 font-medium py-2 border-b border-white/10"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
              Contact
            </a>
          </li>
              <li className="pt-4">
                <a
                  href="tel:+40724207132"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sună Acum
                </a>
              </li>
        </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}
