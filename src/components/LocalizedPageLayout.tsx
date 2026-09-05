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
      canonical: langCode === 'en' ? 'https://aitextcleaner.com' : `https://aitextcleaner.com/${langCode}`,
      languages: {
        en: 'https://aitextcleaner.com',
        es: 'https://aitextcleaner.com/es',
        de: 'https://aitextcleaner.com/de',
        fr: 'https://aitextcleaner.com/fr',
        it: 'https://aitextcleaner.com/it',
        pt: 'https://aitextcleaner.com/pt',
        ar: 'https://aitextcleaner.com/ar',
        ja: 'https://aitextcleaner.com/ja',
        nl: 'https://aitextcleaner.com/nl',
        tr: 'https://aitextcleaner.com/tr',
        id: 'https://aitextcleaner.com/id',
      },
    },
    openGraph: {
      title: lang.title,
      description: lang.description,
      url: langCode === 'en' ? 'https://aitextcleaner.com' : `https://aitextcleaner.com/${langCode}`,
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
    url: langCode === 'en' ? 'https://aitextcleaner.com' : `https://aitextcleaner.com/${langCode}`,
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
