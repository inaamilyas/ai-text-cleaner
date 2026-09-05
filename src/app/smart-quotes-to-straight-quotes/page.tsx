import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://aitextcleaner.com";

export const metadata: Metadata = {
  title: "Smart Quotes to Straight Quotes Converter — Normalize Typography Online",
  description:
    "Convert curly smart quotes (“ ” ‘ ’) to straight quotes (\" ') and em dashes (—) to standard hyphens. Prevent syntax errors in code & SQL.",
  keywords: [
    "smart quotes to straight quotes",
    "curly quotes to straight quotes",
    "convert em dash to hyphen",
    "normalize smart quotes online",
    "straight quote converter",
  ],
  alternates: {
    canonical: "/smart-quotes-to-straight-quotes",
  },
  openGraph: {
    title: "Smart Quotes to Straight Quotes Converter — Normalize Typography Online",
    description:
      "Normalize curly quotes and em dashes to straight quotes and standard hyphens instantly.",
    url: `${siteUrl}/smart-quotes-to-straight-quotes`,
  },
};

const removedItems = [
  {
    character: "Curly Double Quotes",
    unicode: "U+201C / U+201D",
    description: 'Replaced with standard straight double quote (").',
  },
  {
    character: "Curly Single Quotes & Apostrophes",
    unicode: "U+2018 / U+2019",
    description: "Replaced with standard straight single quote (').",
  },
  {
    character: "Em Dash & En Dash",
    unicode: "U+2013 / U+2014",
    description: "Replaced with standard ASCII hyphen (-).",
  },
];

const howToSteps = [
  {
    title: "Paste Typography Text",
    description: "Paste text with curly quotes, smart apostrophes, or em dashes.",
  },
  {
    title: "Normalize Quotes",
    description: "Our typography engine converts smart curly characters into standard ASCII quotes.",
  },
  {
    title: "Copy Code-Safe Output",
    description: "Copy code-safe plain text free from syntax-breaking curly characters.",
  },
];

const faqs = [
  {
    question: "Why do smart quotes cause programming errors?",
    answer:
      'Compilers, SQL query engines, and JSON parsers only recognize ASCII straight quotes (" and \'). Curly smart quotes generate syntax error exceptions because they are distinct unicode symbols.',
  },
  {
    question: "Will this fix em dashes and ellipsis?",
    answer:
      "Yes! When option toggles are enabled, long em dashes (—) are converted into standard hyphens (-) and ellipsis symbols (...) into three dots.",
  },
  {
    question: "How do curly smart quotes get into code snippets?",
    answer:
      "Word processors (like Microsoft Word or Apple Pages) and web chat interfaces automatically convert typed straight quotes into curly typographical 'smart quotes'.",
  },
  {
    question: "What is the ASCII hex code for straight double quotes?",
    answer:
      "ASCII straight double quote is U+0022 (\"), whereas smart left double quote is U+201C and smart right double quote is U+201D.",
  },
  {
    question: "Can I convert smart quotes in SQL or JSON files?",
    answer:
      "Yes! Use our 'Code & JSON Safe' quick preset to normalize all smart quotes and dashes instantly.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Smart Quotes Converter",
  url: `${siteUrl}/smart-quotes-to-straight-quotes`,
  description: "Free online utility to convert smart curly quotes and em dashes to standard ASCII straight quotes.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert Smart Quotes to Straight Quotes",
  step: howToSteps.map((step) => ({
    "@type": "HowToStep",
    name: step.title,
    text: step.description,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function SmartQuotesToStraightQuotesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero
        heading="Smart Quotes to Straight Quotes"
        subheading={'Convert curly quotes (“ ” ‘ ’) and em dashes (—) into code-safe ASCII straight quotes (" and \') and standard hyphens (-).'}
        initialOptions={{
          normalizeQuotes: true,
          normalizeDashes: true,
          convertEllipsis: true,
        }}
      />
      <SubToolContent
        title="Smart Quotes to Straight Quotes Converter"
        directAnswerTitle="How to Convert Smart Curly Quotes to Straight Quotes?"
        directAnswerText={'Smart quotes (curly quotes like “ ” and ‘ ’) look nice in print but cause fatal syntax errors in code, SQL queries, and web forms. Our tool converts smart quotes into code-safe straight quotes (" and \') and converts em dashes (—) into standard hyphens instantly.'}
        beforeExample="“Hello World,” said John’s bot — it works…."
        afterExample={' "Hello World," said John\'s bot - it works... '}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
