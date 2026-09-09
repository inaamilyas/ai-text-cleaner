'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n/dictionaries';
import { trackLanguageChange } from '@/lib/analytics';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Detect current language from pathname
  const currentLangCode = Object.keys(LANGUAGES).find(
    (code) => code !== 'en' && (pathname === `/${code}` || pathname.startsWith(`/${code}/`))
  ) || 'en';

  const currentLang = LANGUAGES[currentLangCode] || LANGUAGES.en;

  // Extract subpath without current language prefix
  const cleanPath = currentLangCode === 'en'
    ? pathname
    : pathname.replace(new RegExp(`^/${currentLangCode}`), '') || '/';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLanguageSelect(code: string) {
    trackLanguageChange(code);
    try {
      localStorage.setItem('aitextcleaner_lang', code);
    } catch {
      // Ignore if localStorage is restricted
    }
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white hover:border-primary-500 hover:text-primary-700 border border-neutral-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-3.5 h-3.5 text-neutral-500" />
        <span className="flex items-center gap-1">
          <span>{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
          <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-neutral-200 py-1.5 z-50 max-h-80 overflow-y-auto">
          <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-neutral-500 uppercase border-b border-neutral-200 mb-1">
            Select Language
          </div>
          {Object.values(LANGUAGES).map((lang) => {
            const isSelected = lang.code === currentLangCode;
            const targetHref = lang.code === 'en'
              ? (cleanPath === '/' ? '/' : cleanPath)
              : (cleanPath === '/' ? `/${lang.code}` : `/${lang.code}${cleanPath}`);

            return (
              <Link
                key={lang.code}
                href={targetHref}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center justify-between px-3 py-2 text-xs transition-colors duration-200 ${
                  isSelected
                    ? 'bg-primary-50 text-primary-700 font-bold'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase font-mono">{lang.code}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
