'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSelector from "@/components/LanguageSelector";

const tools = [
  { href: "/ai-text-detector", label: "AI Text Detector" },
  { href: "/clean-chatgpt-text", label: "ChatGPT Text Cleaner" },
  { href: "/clean-claude-text", label: "Claude Text Cleaner" },
  { href: "/clean-claude-code", label: "Claude Code Output Cleaner" },
  { href: "/clean-copilot-text", label: "Copilot Text Cleaner" },
  { href: "/clean-gemini-text", label: "Gemini Text Cleaner" },
  { href: "/markdown-to-plain-text", label: "Markdown to Plain Text" },
  { href: "/remove-ai-words", label: "Remove AI Words & Buzzwords" },
  { href: "/remove-invisible-characters", label: "Remove Invisible Characters" },
  { href: "/remove-zero-width-space", label: "Remove Zero-Width Space" },
  { href: "/smart-quotes-to-straight-quotes", label: "Smart Quotes to Straight Quotes" },
  { href: "/remove-ai-image-metadata", label: "AI Image Metadata Remover" },
  { href: "/strip-ai-prompts", label: "AI Prompt Stripper" },
  { href: "/visualize-invisible-characters", label: "Invisible Character Visualizer" },
  { href: "/clean-unicode-homoglyphs", label: "Unicode Homoglyph Cleaner" },
  { href: "/clean-pdf-metadata", label: "PDF Metadata Sanitizer" },
  { href: "/case-converter", label: "Text Case Converter" },
  { href: "/check-readability-score", label: "Readability & Grade Checker" },
  { href: "/humanize-ai-text", label: "AI Text Humanizer" },
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
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white">
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
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
            <div className="relative" ref={toolsMenuRef}>
              <button
                type="button"
                onClick={() => setToolsMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={toolsMenuOpen}
                className="flex cursor-pointer items-center gap-1 text-body-sm font-bold text-neutral-700 transition-colors duration-200 hover:text-primary-600"
              >
                Tools
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${toolsMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {toolsMenuOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-3 grid w-[560px] grid-cols-2 gap-1 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg"
                >
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      role="menuitem"
                      onClick={() => setToolsMenuOpen(false)}
                      className="rounded-md px-3 py-2.5 text-body-sm font-medium text-neutral-700 no-underline transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
          <nav className="mt-3 flex flex-col gap-1 border-t border-neutral-200 pt-3 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              type="button"
              onClick={() => setMobileToolsOpen((open) => !open)}
              aria-expanded={mobileToolsOpen}
              className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-body-sm font-bold text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
            >
              Tools
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {mobileToolsOpen && (
              <div className="flex flex-col gap-1 pl-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileToolsOpen(false);
                    }}
                    className="rounded-lg px-3 py-2.5 text-body-sm font-medium text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-body-sm font-bold text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
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
