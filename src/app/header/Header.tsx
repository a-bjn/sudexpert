"use client";

import { useState } from "react";
import Image from "next/image";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="p-4 bg-white shadow-md">
      <div className="flex justify-between items-center">
         {/* Logo and Text */}
         <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Sudexpert Logo"
            width={32}
            height={32}
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
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-gray-100 shadow-md">
          <ul className="flex flex-col items-center gap-4 p-4">
            <li>
              <a href="#home" className="block text-lg text-gray-800">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block text-lg text-gray-800">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="block text-lg text-gray-800">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
