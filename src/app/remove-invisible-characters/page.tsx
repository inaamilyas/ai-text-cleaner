import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://aitextcleaner.com";

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
  ],
  alternates: {
    canonical: "/remove-invisible-characters",
  },
  openGraph: {
    title: "Remove Invisible Characters Online — Clean Hidden Unicode Control Marks",
    description:
      "Clean hidden invisible characters and unicode control marks instantly in your browser.",
    url: `${siteUrl}/remove-invisible-characters`,
  },
};

const removedItems = [
  {
    character: "Soft Hyphen (SHY)",
    unicode: "U+00AD",
    description: "Invisible hyphen character used in web documents for line breaking that breaks word search queries.",
  },
  {
    character: "Left-To-Right / Right-To-Left Marks",
    unicode: "U+200E / U+200F",
    description: "Directional formatting marks that cause text alignment bugs in multi-lingual documents.",
  },
  {
    character: "Word Joiner",
    unicode: "U+2060",
    description: "Invisible character preventing line breaks that confuses screen readers and word processors.",
  },
];

const howToSteps = [
  {
    title: "Paste Suspicious Text",
    description: "Paste text copied from PDF documents, websites, or AI outputs.",
  },
  {
    title: "Scan & Remove",
    description: "Our engine scans string hex codes and removes all hidden unicode control characters.",
  },
  {
    title: "Copy Clean Output",
    description: "Copy sanitized plain text with zero hidden characters remaining.",
  },
];

const faqs = [
  {
    question: "How do invisible characters get into my text?",
    answer:
      "Invisible characters are created when copying text from PDFs, formatted websites, Microsoft Word, or LLM AI outputs (ChatGPT/Claude). They represent hidden layout instructions.",
  },
  {
    question: "Will removing invisible characters alter my visible text?",
    answer:
      "No. Only non-printable control marks, zero-width spaces, and soft hyphens are removed. All visible letters, numbers, and punctuation remain untouched.",
  },
  {
    question: "Why are soft hyphens (U+00AD) harmful in web content?",
    answer:
      "Soft hyphens are invisible layout codes that break search engines from matching keywords. Removing them restores clean keyword indexing.",
  },
  {
    question: "How do directional formatting marks (U+200E, U+200F) affect text?",
    answer:
      "Directional marks force text alignment in bi-directional scripts (such as Arabic or Hebrew). In English text, they cause unexpected cursor jumping.",
  },
  {
    question: "Can I inspect the visual diff of removed characters?",
    answer:
      "Yes! Click 'View Diff' after cleaning to see exact highlighted locations of removed invisible characters.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Invisible Character Remover",
  url: `${siteUrl}/remove-invisible-characters`,
  description: "Free online utility to detect and remove invisible characters and hidden unicode control marks.",
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
        heading="Remove Invisible Characters"
        subheading="Detect and strip hidden unicode control characters, soft hyphens, directional marks, and zero-width spaces instantly."
        initialOptions={{
          removeHiddenCharacters: true,
          convertNonBreakingSpaces: true,
          normalizeUnicode: true,
        }}
      />
      <SubToolContent
        title="Remove Invisible Characters"
        directAnswerTitle="What Are Invisible Characters & How to Fix Them?"
        directAnswerText="Invisible characters are hidden unicode control codes (such as U+200B, U+00AD, U+200E) that exist in text without displaying visually. They cause silent database errors, broken searches, and syntax bugs. Our tool sanitizes your text instantly in your browser."
        beforeExample={"Sanitize\u00AD text with hidden\u200E control marks."}
        afterExample="Sanitize text with hidden control marks."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
