'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSelector from "@/components/LanguageSelector";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog & Guides" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 z-30 px-3 sm:px-6">
      <div className="container mx-auto rounded-2xl border border-neutral-200 bg-neutral-50/95 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-md shadow-sm transition-all">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm sm:text-body-md font-bold text-primary-900 no-underline"
          >
            <Logo className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
            <span className="truncate">AI Text Cleaner</span>
          </Link>

          {/* Desktop Navigation Links + Language Selector */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm font-bold text-neutral-700 no-underline transition-colors duration-200 hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSelector />
          </nav>

          {/* Mobile Right Controls (Language Selector + Hamburger Button) */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-3 flex flex-col gap-3 border-t border-neutral-200 pt-3 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-body-sm font-bold text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
