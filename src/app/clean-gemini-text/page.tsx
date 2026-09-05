import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://aitextcleaner.com";

export const metadata: Metadata = {
  title: "Clean Google Gemini Text — Remove Gemini AI Formatting & Artifacts",
  description:
    "Clean text copied from Google Gemini (formerly Bard). Remove bullet points, Markdown asterisks, smart quotes, and hidden unicode spacers.",
  keywords: [
    "clean gemini text",
    "clean google gemini text",
    "remove gemini formatting",
    "gemini text cleaner",
    "google bard text sanitizer",
  ],
  alternates: {
    canonical: "/clean-gemini-text",
  },
  openGraph: {
    title: "Clean Google Gemini Text — Remove Gemini AI Formatting & Artifacts",
    description:
      "Paste your Google Gemini outputs to instantly strip bold asterisks, bullet artifacts, and hidden unicode characters.",
    url: `${siteUrl}/clean-gemini-text`,
  },
};

const removedItems = [
  {
    character: "Gemini Markdown Bullets & Bold",
    unicode: "U+002A (*)",
    description: "Google Gemini heavily uses bold asterisks and Markdown list markers that clutter plain text outputs.",
  },
  {
    character: "Non-Breaking Spaces (NBSP)",
    unicode: "U+00A0",
    description: "Inserted by Gemini web application to manage paragraph spacing, causing awkward line wrapping.",
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
    question: "Why does Google Gemini text have markdown symbols?",
    answer:
      "Gemini uses Markdown formatting for visually styled responses in the web app. When copied to plain text editors, raw asterisks and hashtags remain in the text.",
  },
  {
    question: "Does this work for Gemini Advanced output?",
    answer:
      "Yes! It cleans output from all versions of Google Gemini, including Gemini 1.5 Pro, Flash, and Ultra.",
  },
  {
    question: "How do I remove non-breaking spaces (NBSP) from Gemini output?",
    answer:
      "Select 'Convert non-breaking spaces'. The cleaner replaces invisible U+00A0 characters with standard spacebars.",
  },
  {
    question: "Can I download cleaned Gemini responses as a .txt file?",
    answer:
      "Yes! After clicking 'Clean Text', click the 'Download .txt' button to save a sanitized text file directly to your device.",
  },
  {
    question: "Is there any cost to clean Gemini text?",
    answer:
      "No. AI Text Cleaner is 100% free with no account creation or subscription required.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Google Gemini Text Cleaner",
  url: `${siteUrl}/clean-gemini-text`,
  description: "Free tool to clean text copied from Google Gemini AI.",
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
        heading="Clean Google Gemini Text"
        subheading="Sanitize text from Google Gemini. Strip bold asterisks, Markdown artifacts, smart quotes, and hidden unicode spacers instantly."
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
        directAnswerTitle="How to Remove Formatting from Google Gemini Text?"
        directAnswerText="Text copied from Google Gemini often contains Markdown bold tags (**asterisks**), lists (# headers), non-breaking spaces, and smart quotes. Our tool strips these formatting artifacts instantly in your browser."
        beforeExample={"**Gemini Overview:**\n* Feature 1: *Speed*\n* Feature 2: “Smart quotes”"}
        afterExample={'Gemini Overview:\nFeature 1: Speed\nFeature 2: "Smart quotes"'}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
