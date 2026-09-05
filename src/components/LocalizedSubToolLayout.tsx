import Hero from '@/components/Hero';
import SubToolContent from '@/components/SubToolContent';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export interface LocalizedSubToolLayoutProps {
  langCode: string;
  subToolKey: keyof typeof LANGUAGES['en']['subtools'];
  initialOptions?: Record<string, boolean>;
}

export function generateSubToolMetadata(langCode: string, subToolKey: keyof typeof LANGUAGES['en']['subtools'], pathSlug: string) {
  const lang = LANGUAGES[langCode] || LANGUAGES.en;
  const toolData = lang.subtools?.[subToolKey] || LANGUAGES.en.subtools[subToolKey];

  return {
    title: `${toolData.title} | AI Text Cleaner`,
    description: toolData.description,
    alternates: {
      canonical: langCode === 'en' ? `https://aitextcleaner.com/${pathSlug}` : `https://aitextcleaner.com/${langCode}/${pathSlug}`,
      languages: {
        en: `https://aitextcleaner.com/${pathSlug}`,
        es: `https://aitextcleaner.com/es/${pathSlug}`,
        de: `https://aitextcleaner.com/de/${pathSlug}`,
        fr: `https://aitextcleaner.com/fr/${pathSlug}`,
        it: `https://aitextcleaner.com/it/${pathSlug}`,
        pt: `https://aitextcleaner.com/pt/${pathSlug}`,
        ar: `https://aitextcleaner.com/ar/${pathSlug}`,
        ja: `https://aitextcleaner.com/ja/${pathSlug}`,
        nl: `https://aitextcleaner.com/nl/${pathSlug}`,
        tr: `https://aitextcleaner.com/tr/${pathSlug}`,
        id: `https://aitextcleaner.com/id/${pathSlug}`,
      },
    },
    openGraph: {
      title: toolData.title,
      description: toolData.description,
      url: langCode === 'en' ? `https://aitextcleaner.com/${pathSlug}` : `https://aitextcleaner.com/${langCode}/${pathSlug}`,
      locale: langCode,
      type: 'website',
    },
  };
}

export default function LocalizedSubToolLayout({
  langCode,
  subToolKey,
  initialOptions,
}: LocalizedSubToolLayoutProps) {
  const lang = LANGUAGES[langCode] || LANGUAGES.en;
  const isRtl = lang.dir === 'rtl';
  const toolData = lang.subtools?.[subToolKey] || LANGUAGES.en.subtools[subToolKey];

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolData.heading,
    url: langCode === 'en' ? 'https://aitextcleaner.com' : `https://aitextcleaner.com/${langCode}`,
    description: toolData.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: langCode,
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-arabic' : ''}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <Hero
        heading={toolData.heading}
        subheading={toolData.subheading}
        initialOptions={initialOptions}
      />
      <SubToolContent
        title={toolData.heading}
        directAnswerTitle={toolData.heading}
        directAnswerText={toolData.subheading}
        beforeExample={"**Sample AI Text:**\n1. AI output has *asterisks* & zero-width spaces."}
        afterExample={"Sample AI Text:\n1. AI output has asterisks & zero-width spaces."}
        removedItems={[
          {
            character: "Markdown Formatting & Asterisks",
            unicode: "U+002A (*)",
            description: "Surrounding bold double asterisks, header hashes, and backticks.",
          },
          {
            character: "Hidden Zero-Width Spaces",
            unicode: "U+200B",
            description: "Invisible Unicode characters that break text flows and word counts.",
          },
          {
            character: "Robotic AI Buzzwords",
            unicode: "Vocabulary",
            description: "Overused AI clichés like delve, tapestry, realm, and testaments.",
          },
        ]}
        howToSteps={[
          {
            title: "Paste AI Text",
            description: "Paste your copied text into the text area above.",
          },
          {
            title: "Select Cleaning Preset",
            description: "Choose your desired cleaning options or click quick presets.",
          },
          {
            title: "Copy Clean Text",
            description: "Get clean, publication-ready text in one click.",
          },
        ]}
        faqs={[
          {
            question: toolData.heading,
            answer: toolData.subheading,
          },
          {
            question: "Is this browser-based and free?",
            answer: "Yes, 100% client-side privacy. Zero server storage.",
          },
        ]}
      />
    </div>
  );
}
