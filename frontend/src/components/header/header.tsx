"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, Zap, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/70 bg-neutral-950 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 h-20 items-center">
          {/* Logo - Left */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Zap
                  className="h-8 w-8 text-orange-500 transition-all group-hover:text-orange-400"
                  fill="currentColor"
                />
                <div className="absolute inset-0 blur-md bg-orange-500/30 group-hover:bg-orange-500/40 transition-all" />
              </div>
              <span className="bebas-neue-regular text-2xl tracking-wider text-white">
                SUDEXPERT
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-xl font-light text-neutral-400">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Acasă
            </Link>
            <Link
              href="/magazin"
              className="hover:text-white transition-colors"
            >
              Magazin
            </Link>
            <Link
              href="/despre"
              className="hover:text-white transition-colors"
            >
              Despre
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center justify-end gap-2">
            {/* Search Field */}
            <div className="hidden lg:flex items-center gap-2">
              <input
                type="search"
                placeholder="Caută..."
                className="w-48 h-12 px-4 text-base rounded-md bg-neutral-900/50 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-transparent transition-all"
              />
              <button className="h-12 w-12 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                <Search className="h-6 w-6" />
              </button>
            </div>

            <Link
              href="/cos"
              className="relative h-12 w-12 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-orange-600 text-white text-sm flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="hidden lg:block text-sm text-neutral-400">
                  {user?.email}
                </span>
                <button
                  onClick={logout}
                  className="h-12 w-12 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                  title="Deconectare"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="h-12 w-12 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                title="Autentificare"
              >
                <User className="h-6 w-6" />
              </Link>
            )}

            <button
              className="md:hidden h-12 w-12 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800/70 bg-neutral-950">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Acasă
              </Link>
              <Link
                href="/magazin"
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Magazin
              </Link>
              <Link
                href="/despre"
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Despre
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Autentificare
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
