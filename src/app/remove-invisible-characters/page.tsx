import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Remove Invisible Characters Online — Clean Hidden Unicode Control Marks",
  description:
    "Detect and remove invisible characters, zero-width spaces, soft hyphens, and hidden unicode control marks from text. Free & 100% private client-side tool.",
  keywords: [
    "remove invisible characters",
    "hidden unicode character remover",
    "clean invisible text",
    "invisible character finder",
    "remove hidden control codes",
    "zero width space remover",
    "soft hyphen cleaner",
  ],
  alternates: {
    canonical: "/remove-invisible-characters",
    languages: {
      en: "/remove-invisible-characters",
      es: "/es/remove-invisible-characters",
      de: "/de/remove-invisible-characters",
      fr: "/fr/remove-invisible-characters",
      it: "/it/remove-invisible-characters",
      pt: "/pt/remove-invisible-characters",
      ar: "/ar/remove-invisible-characters",
      ja: "/ja/remove-invisible-characters",
      nl: "/nl/remove-invisible-characters",
      tr: "/tr/remove-invisible-characters",
      id: "/id/remove-invisible-characters",
    },
  },
  openGraph: {
    title: "Remove Invisible Characters Online — Clean Hidden Unicode Control Marks",
    description:
      "Clean hidden invisible characters and unicode control marks instantly in your browser with zero data logging.",
    url: `${siteUrl}/remove-invisible-characters`,
  },
};

const technicalGuidePoints = [
  {
    title: "Zero-Width Non-Joiners (ZWNJ)",
    desc: "Used in complex scripts; causes unexpected breakages in tokenizers and string length counters.",
  },
  {
    title: "Soft Hyphens (U+00AD)",
    desc: "Injected by typography engines; disrupts keyword search, regex pattern matching & database querying.",
  },
  {
    title: "Bidirectional Marks (U+200E/U+200F)",
    desc: "Directional override codes causing erratic cursor jumping and backward deletion in code editors.",
  },
];

const removedItems = [
  {
    character: "Zero-Width Space (ZWSP)",
    unicode: "U+200B",
    description:
      "Invisible zero-width space injected by web layouts, rich text editors, and LLMs that corrupts string lengths and breaks search indices.",
  },
  {
    character: "Soft Hyphen (SHY)",
    unicode: "U+00AD",
    description:
      "Invisible hyphen character used in web documents for line breaking that breaks word search queries, regex matching, and SEO keywords.",
  },
  {
    character: "Left-To-Right / Right-To-Left Marks",
    unicode: "U+200E / U+200F",
    description:
      "Directional formatting marks that cause text alignment bugs, backward cursor deletion, and terminal rendering issues in multi-lingual documents.",
  },
  {
    character: "Word Joiner",
    unicode: "U+2060",
    description:
      "Invisible character preventing line breaks that confuses screen readers, text-to-speech engines, and word processors.",
  },
];

const howToSteps = [
  {
    title: "Paste Suspicious Text",
    description:
      "Paste text copied from PDF documents, formatted web pages, or LLM AI chats into the input buffer.",
  },
  {
    title: "Scan & Remove",
    description:
      "Our engine scans unicode hex codes and strips zero-width spaces, soft hyphens, and control markers.",
  },
  {
    title: "Copy Clean Output",
    description:
      "Copy sanitized plain text with zero hidden characters remaining, verified via local string assertion.",
  },
];

const faqs = [
  {
    question: "How do invisible characters get into my text?",
    answer:
      "Invisible characters are created when copying text from PDFs, formatted websites, Microsoft Word, or LLM AI outputs (ChatGPT/Claude). They represent hidden layout instructions, soft hyphenation points, zero-width tracking signals, or bidirectional marker tags.",
  },
  {
    question: "Will removing invisible characters alter my visible text?",
    answer:
      "No. Only non-printable control marks, zero-width spaces, and soft hyphens are removed. All visible letters, numbers, and punctuation remain untouched unless you explicitly enable optional normalization toggles (like smart quotes or markdown stripping).",
  },
  {
    question: "Why are soft hyphens (U+00AD) harmful in web content?",
    answer:
      'Soft hyphens are invisible layout codes that break search engines from matching keywords. In database queries, a search for "cleaning" will fail to match "clean\u00ADing" because the byte stream contains the invisible U+00AD code point. Removing them restores clean keyword indexing.',
  },
  {
    question: "How do directional formatting marks (U+200E, U+200F) affect text?",
    answer:
      "Directional marks force text alignment in bi-directional scripts (such as Arabic or Hebrew). In English text, they cause unexpected cursor jumping, backward deletions in code editors, and malformed database queries.",
  },
  {
    question: "Can I inspect the visual diff of removed characters?",
    answer:
      "Yes! Click 'View Diff' after cleaning to see exact highlighted locations of removed invisible characters rendered with red highlight tags.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Remove Invisible Characters",
  url: `${siteUrl}/remove-invisible-characters`,
  description:
    "Detect and remove invisible characters, zero-width spaces, soft hyphens, and hidden unicode control marks.",
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
  name: "How to Remove Invisible Characters from Text",
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

export default function RemoveInvisibleCharactersPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">
        Remove Invisible Characters Online — Clean Hidden Unicode Control Marks | Text Cleaner AI
      </span>
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
        heading="Remove Invisible Characters"
        subheading="Strip hidden zero-width spaces, soft hyphens, and invisible unicode control marks instantly in your browser."
        initialOptions={{
          removeHiddenCharacters: true,
          convertNonBreakingSpaces: true,
          normalizeUnicode: true,
        }}
      />
      <SubToolContent
        title="Remove Invisible Characters"
        badgeLabel="Technical Guide"
        badgeIcon="code"
        directAnswerTitle="What Are Invisible Characters & How to Fix Them?"
        directAnswerText="Invisible characters are non-printing unicode code points embedded inside standard text. While they don't appear visually on your screen, they alter how compilers, web browsers, database indices, and text parsers process your data. They often creep in when copying text from PDF documents, Notion, Apple Notes, or AI assistants like ChatGPT and Claude."
        technicalGuidePoints={technicalGuidePoints}
        beforeExample={
          <>
            Sanitize
            <span className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-error-container text-on-error-container font-code-stat text-[11px] font-bold shadow-xs">
              U+00AD [SHY]
            </span>
            text with hidden
            <span className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-error-container text-on-error-container font-code-stat text-[11px] font-bold shadow-xs">
              U+200E [LTR]
            </span>
            control marks.
          </>
        }
        afterExample="Sanitize text with hidden control marks."
        beforeNote="Contains: U+00AD soft hyphen, U+200E left-to-right mark"
        afterNote="Purged: Standard UTF-8 plain text with hidden unicode removed"
        beforeBadgeText="ALERT"
        afterBadgeText="PASS"
        removedItems={removedItems}
        activeSuiteToolHref="/visualize-invisible-characters"
        streamChart={true}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
