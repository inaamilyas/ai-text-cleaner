import Metadata from 'next';
import Hero from '@/components/Hero';
import WhyCleanAIText from '@/components/WhyCleanAIText';
import WhatMakesDifferent from '@/components/WhatMakesDifferent';
import CompetitorComparison from '@/components/CompetitorComparison';
import HowItWorks from '@/components/HowItWorks';
import WhatWeClean from '@/components/WhatWeClean';
import WhoItsFor, { audiences } from '@/components/WhoItsFor';
import FAQ, { faqs } from '@/components/FAQ';
import { LANGUAGES, LocalizedContent } from '@/lib/i18n/dictionaries';

export function generateLocalizedMetadata(langCode: string) {
  const lang = LANGUAGES[langCode] || LANGUAGES.en;
  return {
    title: lang.title,
    description: lang.description,
    alternates: {
      canonical: langCode === 'en' ? 'https://www.text-cleaner-ai.com' : `https://www.text-cleaner-ai.com/${langCode}`,
      languages: {
        en: 'https://www.text-cleaner-ai.com',
        es: 'https://www.text-cleaner-ai.com/es',
        de: 'https://www.text-cleaner-ai.com/de',
        fr: 'https://www.text-cleaner-ai.com/fr',
        it: 'https://www.text-cleaner-ai.com/it',
        pt: 'https://www.text-cleaner-ai.com/pt',
        ar: 'https://www.text-cleaner-ai.com/ar',
        ja: 'https://www.text-cleaner-ai.com/ja',
        nl: 'https://www.text-cleaner-ai.com/nl',
        tr: 'https://www.text-cleaner-ai.com/tr',
        id: 'https://www.text-cleaner-ai.com/id',
      },
    },
    openGraph: {
      title: lang.title,
      description: lang.description,
      url: langCode === 'en' ? 'https://www.text-cleaner-ai.com' : `https://www.text-cleaner-ai.com/${langCode}`,
      locale: langCode,
      type: 'website',
    },
  };
}

export default function LocalizedPageLayout({ langCode }: { langCode: string }) {
  const lang = LANGUAGES[langCode] || LANGUAGES.en;
  const isRtl = lang.dir === 'rtl';

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `AI Text Cleaner - ${lang.name}`,
    url: langCode === 'en' ? 'https://www.text-cleaner-ai.com' : `https://www.text-cleaner-ai.com/${langCode}`,
    description: lang.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: langCode,
    browserRequirements: 'Requires JavaScript',
    author: {
      '@type': 'Person',
      name: 'Inam Ilyas',
      url: 'https://www.linkedin.com/in/inam-ilyas/',
    },
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-arabic' : ''}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero heading={lang.heading} subheading={lang.subheading} />
      <WhyCleanAIText />
      <WhatMakesDifferent />
      <CompetitorComparison />
      <HowItWorks />
      <WhatWeClean />
      <WhoItsFor />
      <FAQ />
    </div>
  );
}
