"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="p-4 bg-white shadow-md relative">
      <div className="flex justify-between items-center">
        {/* Logo and Text */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Sudexpert Logo"
            width={42}
            height={42}
          />
          <h1 className="text-lg font-bold">Sudexpert</h1>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="relative w-6 h-4 flex flex-col justify-between items-center group"
        >
          {/* Top Bar */}
          <span
            className={`block w-6 h-[2px] bg-black transform transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-[6px] origin-center" : ""
            }`}
          ></span>
          {/* Middle Bar */}
          <span
            className={`block w-full h-[2px] bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          {/* Bottom Bar */}
          <span
            className={`block w-full h-[2px] bg-black transform transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-end gap-6 p-4">
          <li>
            <a href="#home" className="block text-md text-black">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="block text-md text-black">
              About
            </a>
          </li>
          <li>
            <a href="#about" className="block text-md text-black">
              Products
            </a>
          </li>
          <li>
            <a href="#contact" className="block text-md text-black">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}
