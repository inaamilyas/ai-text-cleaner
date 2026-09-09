'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

const SUPPORTED_CODES = Object.keys(LANGUAGES); // ['en', 'es', 'de', 'fr', 'it', 'pt', 'ar', 'ja', 'nl', 'tr', 'id']
const DISMISS_KEY = 'aitextcleaner_lang_suggestion_dismissed';

export default function LanguageDetector() {
  const pathname = usePathname();
  const router = useRouter();
  const [suggestedCode, setSuggestedCode] = useState<string | null>(null);

  useEffect(() => {
    // Only ever suggest a switch from the English homepage — never auto-redirect.
    // Google explicitly discourages client-side redirects based on browser
    // locale, since it can trap crawlers and users on the "wrong" language.
    if (pathname !== '/') return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    let detected: string | undefined;

    const savedLang = localStorage.getItem('aitextcleaner_lang');
    if (savedLang && SUPPORTED_CODES.includes(savedLang) && savedLang !== 'en') {
      detected = savedLang;
    } else {
      const browserLangs = navigator.languages || [navigator.language || ''];
      detected = browserLangs
        .map((bLang) => bLang.toLowerCase().split('-')[0])
        .find((code) => SUPPORTED_CODES.includes(code) && code !== 'en');
    }

    // Reading localStorage/navigator (external browser APIs unavailable during
    // static prerendering) and syncing the result into state is exactly the
    // "subscribe to an external system" case React's effect docs sanction.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (detected) setSuggestedCode(detected);
  }, [pathname]);

  if (!suggestedCode) return null;

  const lang = LANGUAGES[suggestedCode];

  function handleAccept() {
    if (!suggestedCode) return;
    localStorage.setItem('aitextcleaner_lang', suggestedCode);
    router.push(`/${suggestedCode}`);
    setSuggestedCode(null);
  }

  function handleDismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setSuggestedCode(null);
  }

  return (
    <div className="flex items-center justify-center gap-3 bg-primary-50 px-4 py-2.5 text-center text-body-sm text-primary-900">
      <span>
        {lang.flag} This page is also available in {lang.nativeName}.
      </span>
      <button
        type="button"
        onClick={handleAccept}
        className="cursor-pointer font-bold underline transition-colors duration-200 hover:text-primary-700"
      >
        Switch to {lang.nativeName}
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss language suggestion"
        className="cursor-pointer text-primary-700 transition-colors duration-200 hover:text-primary-900"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
