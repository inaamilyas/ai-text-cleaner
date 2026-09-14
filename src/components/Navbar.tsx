'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

const toolCategories = [
  {
    category: "AI & Content Tools",
    items: [
      { href: "/ai-text-detector", label: "AI / GPT Detector", badge: "DET" },
      { href: "/humanize-ai-text", label: "AI Text Humanizer", badge: "HUM" },
      { href: "/remove-ai-words", label: "Remove AI Words", badge: "RAW" },
      { href: "/strip-ai-prompts", label: "Strip AI Prompts", badge: "STP" },
      { href: "/check-readability-score", label: "Readability Score", badge: "RDS" },
      { href: "/remove-ai-image-metadata", label: "AI Image Metadata", badge: "IMG" },
    ],
  },
  {
    category: "Formatting & Unicode",
    items: [
      { href: "/visualize-invisible-characters", label: "Invisible Visualizer", badge: "VIS" },
      { href: "/remove-invisible-characters", label: "Remove Invisible Chars", badge: "INV" },
      { href: "/remove-zero-width-space", label: "Remove Zero-Width Space", badge: "ZWS" },
      { href: "/clean-unicode-homoglyphs", label: "Unicode Homoglyphs", badge: "GLY" },
      { href: "/smart-quotes-to-straight-quotes", label: "Smart Quotes to Straight", badge: "QUO" },
      { href: "/case-converter", label: "Case Converter", badge: "CAS" },
      { href: "/markdown-to-plain-text", label: "Markdown to Plain Text", badge: "MD" },
    ],
  },
  {
    category: "Platform & File Cleaners",
    items: [
      { href: "/clean-pdf-metadata", label: "PDF Metadata Cleaner", badge: "PDF" },
      { href: "/clean-chatgpt-text", label: "Clean ChatGPT Text", badge: "GPT" },
      { href: "/clean-claude-text", label: "Clean Claude Text", badge: "CLD" },
      { href: "/clean-claude-code", label: "Clean Claude Code", badge: "COD" },
      { href: "/clean-gemini-text", label: "Clean Gemini Text", badge: "GEM" },
      { href: "/clean-copilot-text", label: "Clean Copilot Text", badge: "COP" },
    ],
  },
];

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog & Guides" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toolsMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setToolsMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setToolsMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [toolsMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container-highest">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-[68px] flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">

          <Link className="flex items-center gap-2.5 group no-underline" href="/">
            <Image
              src="/logo.png"
              alt="Text Cleaner AI Logo"
              width={36}
              height={36}
              priority
              className="w-9 h-9 rounded-lg object-contain shadow-xs transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg md:text-[19px] tracking-tight text-on-surface">
              Text Cleaner AI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                onClick={() => setToolsMenuOpen((open) => !open)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-medium text-[15px] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Tools</span>
                <span className={`material-symbols-outlined text-[15px] transition-transform duration-200 ${toolsMenuOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {toolsMenuOpen && (
                <div className="absolute top-full left-0 pt-2 w-[720px] max-w-[90vw] z-50 animate-in fade-in duration-100">
                  <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-highest/80 shadow-2xl grid grid-cols-3 gap-4">
                    {toolCategories.map((col) => (
                      <div key={col.category} className="flex flex-col gap-1">
                        <span className="text-code-stat uppercase tracking-wider text-outline font-semibold mb-1 px-2">
                          {col.category}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          {col.items.map((t) => (
                            <Link
                              key={t.href}
                              href={t.href}
                              onClick={() => setToolsMenuOpen(false)}
                              className="px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-label-sm text-label-sm flex items-center justify-between no-underline transition-colors"
                            >
                              <span className="truncate mr-1">{t.label}</span>
                              <span className="font-code-stat text-code-stat text-outline shrink-0">{t.badge}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-medium text-[15px] no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Controls: Language Selector + Avatar / Hamburger */}
        <div className="flex items-center gap-space-sm">
          <LanguageSelector />
          <div className="hidden sm:flex w-9 h-9 rounded-full bg-primary items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="border-t border-surface-container-highest bg-surface-container-lowest px-4 py-3 md:hidden flex flex-col gap-1 shadow-lg max-h-[85vh] overflow-y-auto">
          <button
            type="button"
            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
              <span>All 19 Tools</span>
            </span>
            <span className={`material-symbols-outlined text-[16px] transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`}>
              expand_more
            </span>
          </button>

          {mobileToolsOpen && (
            <div className="pl-2 flex flex-col gap-3 my-1">
              {toolCategories.map((col) => (
                <div key={col.category} className="flex flex-col gap-1">
                  <span className="text-code-stat uppercase tracking-wider text-outline font-semibold px-2">
                    {col.category}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {col.items.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileToolsOpen(false);
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-label-sm text-label-sm flex items-center justify-between no-underline"
                      >
                        <span>{t.label}</span>
                        <span className="font-code-stat text-code-stat text-outline">{t.badge}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
