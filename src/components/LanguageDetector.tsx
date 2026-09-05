'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

const SUPPORTED_CODES = Object.keys(LANGUAGES); // ['en', 'es', 'de', 'fr', 'it', 'pt', 'ar', 'ja', 'nl', 'tr', 'id']

export default function LanguageDetector() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Extract language code currently in the URL
    const urlLang = SUPPORTED_CODES.find(
      (code) => code !== 'en' && (pathname === `/${code}` || pathname.startsWith(`/${code}/`))
    ) || 'en';

    // 1. Check if user has an explicit saved preference in localStorage
    const savedLang = localStorage.getItem('aitextcleaner_lang');

    if (savedLang) {
      if (SUPPORTED_CODES.includes(savedLang) && savedLang !== urlLang) {
        // If user saved preference (e.g. 'es') and lands on root '/', auto-redirect to '/es'
        if (urlLang === 'en' && pathname === '/') {
          router.replace(`/${savedLang}`);
        }
      }
      return;
    }

    // 2. If no stored preference, detect browser language (navigator.language)
    const browserLangs = navigator.languages || [navigator.language || ''];
    let detectedCode: string | undefined;

    for (const bLang of browserLangs) {
      const code = bLang.toLowerCase().split('-')[0];
      if (SUPPORTED_CODES.includes(code) && code !== 'en') {
        detectedCode = code;
        break;
      }
    }

    if (detectedCode && urlLang === 'en' && pathname === '/') {
      localStorage.setItem('aitextcleaner_lang', detectedCode);
      router.replace(`/${detectedCode}`);
    }
  }, [pathname, router]);

  return null;
}
