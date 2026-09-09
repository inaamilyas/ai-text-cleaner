import type { Metadata } from "next";
import HomoglyphSanitizer from "@/components/HomoglyphSanitizer";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Unicode Homoglyph Cleaner — Detect & Replace Cyrillic / Greek Confusables",
  description:
    "Free online tool to detect and replace fake Cyrillic, Greek, full-width ASCII, and mathematical homoglyph characters with standard Latin ASCII equivalents.",
  keywords: [
    "clean unicode homoglyphs",
    "homoglyph detector",
    "confusable character remover",
    "cyrillic to latin ascii converter",
    "homoglyph attack protection",
  ],
  alternates: {
    canonical: "/clean-unicode-homoglyphs",
  },
  openGraph: {
    title: "Unicode Homoglyph Cleaner — Confusable Character Sanitizer",
    description:
      "Replace fake Cyrillic and Greek look-alike letters disguised inside text with standard ASCII Latin letters.",
    url: `${siteUrl}/clean-unicode-homoglyphs`,
  },
};

const removedItems = [
  {
    character: "Cyrillic Small Letter a",
    unicode: "U+0430 ('а')",
    description: "Looks identical to Latin 'a' (U+0061) but breaks keyword searches and tricks AI detectors.",
  },
  {
    character: "Cyrillic Small Letter e",
    unicode: "U+0435 ('е')",
    description: "Confusable character replacing Latin 'e' (U+0065) causing secret character watermarks.",
  },
  {
    character: "Cyrillic Small Letter o",
    unicode: "U+043E ('о')",
    description: "Cyrillic look-alike for Latin 'o' (U+006F) used in homoglyph domain phishing attacks.",
  },
  {
    character: "Full-Width Latin Letters",
    unicode: "U+FF01-U+FF5E",
    description: "Wide unicode symbols replacing standard ASCII characters that break database constraints.",
  },
];

const howToSteps = [
  {
    title: "Paste Text with Confusables",
    description: "Paste text suspected of containing fake Cyrillic, Greek, or full-width look-alike letters.",
  },
  {
    title: "Detect & Replace",
    description: "Our engine maps non-standard homoglyph code points directly back to clean Latin ASCII equivalents.",
  },
  {
    title: "Copy Clean ASCII",
    description: "Copy sanitized plain ASCII text with 100% standard Latin letters.",
  },
];

const faqs = [
  {
    question: "What is a homoglyph character?",
    answer:
      "A homoglyph (or confusable) is a character from another alphabet (like Cyrillic 'а' U+0430) that looks visually identical to a Latin letter ('a' U+0061), but has a completely different digital code point.",
  },
  {
    question: "Why are homoglyphs used in text?",
    answer:
      "Homoglyphs are used to bypass keyword filters, evade AI plagiarism detectors, or create look-alike phishing domain names.",
  },
  {
    question: "Does this tool change the meaning of my text?",
    answer:
      "No! It normalizes all look-alike non-Latin characters back to standard Latin ASCII letters so humans and search engines read it identically.",
  },
  {
    question: "Is this homoglyph cleaner free?",
    answer:
      "Yes. It is 100% free and runs entirely inside your browser memory without uploading text to any server.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unicode Homoglyph Cleaner",
  url: `${siteUrl}/clean-unicode-homoglyphs`,
  description: "Detect and replace fake Cyrillic and Greek homoglyphs with standard ASCII letters.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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

export default function CleanUnicodeHomoglyphsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomoglyphSanitizer
        heading="Unicode Homoglyph & Confusable Character Cleaner"
        subheading="Detect and replace Cyrillic, Greek, or Latin look-alike characters disguised inside text to bypass AI detectors or phishing filters."
      />
      <SubToolContent
        title="Unicode Homoglyph Cleaner"
        directAnswerTitle="What Are Homoglyphs & How to Sanitize Confusable Text?"
        directAnswerText="A homoglyph attack replaces standard Latin letters with visually identical characters from other Unicode alphabets (such as Cyrillic 'а' U+0430 instead of Latin 'a' U+0061). Our Unicode Homoglyph Cleaner scans your text string and replaces all confusable characters with 100% standard ASCII Latin equivalents."
        beforeExample="Tеstаng text wіth fаkе Cyrіllіc letters."
        afterExample="Testing text with fake Cyrillic letters."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
