import Hero from '@/components/Hero';
import SubToolContent from '@/components/SubToolContent';
import { LANGUAGES } from '@/lib/i18n/dictionaries';
import { generateWebApplicationSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/schema';

export interface LocalizedSubToolLayoutProps {
  langCode: string;
  subToolKey: keyof typeof LANGUAGES['en']['subtools'];
  initialOptions?: Record<string, boolean>;
}

export function generateSubToolMetadata(langCode: string, subToolKey: keyof typeof LANGUAGES['en']['subtools'], pathSlug: string) {
  const lang = LANGUAGES[langCode] || LANGUAGES.en;
  const defaultTool = LANGUAGES.en.subtools[subToolKey] || { title: '', description: '', heading: '', subheading: '' };
  const toolData = (lang.subtools && lang.subtools[subToolKey]) || defaultTool;

  return {
    title: `${toolData.title} | AI Text Cleaner`,
    description: toolData.description,
    alternates: {
      canonical: langCode === 'en' ? `https://www.text-cleaner-ai.com/${pathSlug}` : `https://www.text-cleaner-ai.com/${langCode}/${pathSlug}`,
      languages: {
        en: `https://www.text-cleaner-ai.com/${pathSlug}`,
        es: `https://www.text-cleaner-ai.com/es/${pathSlug}`,
        de: `https://www.text-cleaner-ai.com/de/${pathSlug}`,
        fr: `https://www.text-cleaner-ai.com/fr/${pathSlug}`,
        it: `https://www.text-cleaner-ai.com/it/${pathSlug}`,
        pt: `https://www.text-cleaner-ai.com/pt/${pathSlug}`,
        ar: `https://www.text-cleaner-ai.com/ar/${pathSlug}`,
        ja: `https://www.text-cleaner-ai.com/ja/${pathSlug}`,
        nl: `https://www.text-cleaner-ai.com/nl/${pathSlug}`,
        tr: `https://www.text-cleaner-ai.com/tr/${pathSlug}`,
        id: `https://www.text-cleaner-ai.com/id/${pathSlug}`,
      },
    },
    openGraph: {
      title: toolData.title,
      description: toolData.description,
      url: langCode === 'en' ? `https://www.text-cleaner-ai.com/${pathSlug}` : `https://www.text-cleaner-ai.com/${langCode}/${pathSlug}`,
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
  const defaultTool = LANGUAGES.en.subtools[subToolKey] || { title: '', description: '', heading: '', subheading: '' };
  const toolData = (lang.subtools && lang.subtools[subToolKey]) || defaultTool;

  const currentUrl = langCode === 'en' ? 'https://www.text-cleaner-ai.com' : `https://www.text-cleaner-ai.com/${langCode}`;

  const webAppJsonLd = generateWebApplicationSchema({
    name: toolData.heading,
    description: toolData.description,
    url: currentUrl,
    inLanguage: langCode,
  });

  const defaultFaqs = [
    {
      question: `How does ${toolData.heading} work?`,
      answer: `${toolData.heading} runs 100% locally in your web browser. It scans pasted text, removes hidden control characters, zero-width spaces, and formatting artifacts instantly without sending your data to any server.`,
    },
    {
      question: "Is my text data private?",
      answer: "Yes, completely. Your text is processed in your local browser memory and is never uploaded or saved.",
    },
  ];

  const faqJsonLd = generateFAQPageSchema(defaultFaqs);

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", url: currentUrl },
    { name: toolData.heading, url: currentUrl },
  ]);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-arabic' : ''}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
