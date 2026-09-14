import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean Google Gemini Text — Remove Gemini Formatting & Citation Marks",
  description:
    "Remove Gemini's citation brackets, bold spam, and leftover formatting from pasted text. Free, runs in your browser, no sign-up.",
  keywords: [
    "clean gemini text",
    "remove gemini formatting",
  ],
  alternates: {
    canonical: "/clean-gemini-text",
    languages: {
      en: "/clean-gemini-text",
      es: "/es/clean-gemini-text",
      de: "/de/clean-gemini-text",
      fr: "/fr/clean-gemini-text",
      it: "/it/clean-gemini-text",
      pt: "/pt/clean-gemini-text",
      ar: "/ar/clean-gemini-text",
      ja: "/ja/clean-gemini-text",
      nl: "/nl/clean-gemini-text",
      tr: "/tr/clean-gemini-text",
      id: "/id/clean-gemini-text",
    },
  },
  openGraph: {
    title: "Clean Google Gemini Text — Remove Gemini Formatting & Citation Marks",
    description:
      "Remove Gemini's citation brackets, bold spam, and leftover formatting from pasted text. Free and browser-based.",
    url: `${siteUrl}/clean-gemini-text`,
  },
};

const removedItems = [
  {
    character: "Citation Brackets & Reference Numbers",
    unicode: "[1] [2]",
    description: "Gemini adds bracketed reference numbers that only make sense inside its own interface.",
  },
  {
    character: "Overused Bold Formatting",
    unicode: "U+002A (*)",
    description: "Gemini tends to bold too many words with Markdown asterisks that clutter plain text.",
  },
  {
    character: "Repeated Preamble",
    unicode: "\"Based on your question...\"",
    description: "Gemini often opens by restating your question back to you before answering.",
  },
  {
    character: "Smart Typography Quotes",
    unicode: "U+201C / U+201D",
    description: "Curly quotation marks that trigger code syntax errors in web forms and databases.",
  },
];

const howToSteps = [
  {
    title: "Copy from Google Gemini",
    description: "Copy your response or generated content from Gemini (gemini.google.com).",
  },
  {
    title: "Paste into Editor",
    description: "Paste into the input box above. The cleaner automatically applies optimal Gemini sanitization settings.",
  },
  {
    title: "Copy Clean Output",
    description: "Click Clean Text and copy sanitized plain text with 1 click.",
  },
];

const faqs = [
  {
    question: "Why does Gemini text have brackets like [1] in it?",
    answer:
      "Those are citation markers Gemini adds when it references a source. They only make sense inside Gemini's own interface, so it's worth removing them before you paste the text anywhere else.",
  },
  {
    question: "Does this work on mobile?",
    answer: "Yes, in any modern browser.",
  },
  {
    question: "Is my text stored anywhere?",
    answer: "No. Cleaning happens locally in your browser, not on a server.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Google Gemini Text Cleaner",
  url: `${siteUrl}/clean-gemini-text`,
  description: "Remove Gemini's citation brackets, bold spam, and leftover formatting from pasted text.",
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
  name: "How to Clean Google Gemini Text Formatting",
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

export default function CleanGeminiTextPage() {
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
        heading="Clean Text Copied From Google Gemini"
        subheading="Remove Gemini's citation brackets, bold spam, and leftover formatting from pasted text — free and browser-based."
        initialOptions={{
          removeMarkdown: true,
          normalizeQuotes: true,
          normalizeDashes: true,
          removeTrailingWhitespace: true,
          removeHiddenCharacters: true,
        }}
      />
      <SubToolContent
        title="Clean Google Gemini Text"
        directAnswerTitle="Why Does Gemini Text Need Cleaning?"
        directAnswerText="Google Gemini has its own habits when it writes. It tends to bold too many words, add bracketed reference numbers like [1] or [2] that mean nothing once you've left Gemini, and open answers by restating your question back to you. None of that belongs in a finished document. This tool removes those Gemini-specific habits, plus the general problems that show up in any AI text: zero-width spaces, smart quotes, and stray Markdown symbols."
        beforeExample={"**Gemini Overview:**\n* Feature 1: *Speed*\n* Feature 2: “Smart quotes”"}
        afterExample={'Gemini Overview:\nFeature 1: Speed\nFeature 2: "Smart quotes"'}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
