'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

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
        className="inline-flex items-center justify-between gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-300 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
        <span className="flex items-center gap-1">
          <span>{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
          <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-900 border border-gray-800 shadow-xl shadow-black/50 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-80 overflow-y-auto backdrop-blur-md">
          <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-800/60 mb-1">
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
                className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/10 text-emerald-400 font-bold'
                    : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-mono">{lang.code}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
