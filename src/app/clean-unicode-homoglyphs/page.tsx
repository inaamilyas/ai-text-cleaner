import type { Metadata } from "next";
import HomoglyphSanitizer from "@/components/HomoglyphSanitizer";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Unicode Homoglyph Remover — Fix Lookalike Characters",
  description:
    "Detect and convert lookalike Unicode characters, like a Cyrillic \"а\" that looks identical to a Latin \"a,\" back to standard ASCII. Free tool.",
  keywords: [
    "unicode homoglyph",
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
  {
    character: "Mathematical Alphanumeric Symbols",
    unicode: "U+1D400-U+1D7FF",
    description: "The fake 𝗯𝗼𝗹𝗱 / 𝘪𝘵𝘢𝘭𝘪𝘤 styled letters some AI tools and chat apps generate instead of real formatting — converted back to plain ASCII.",
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
    question: "Why are homoglyphs used in text?",
    answer:
      "Homoglyphs are used to bypass keyword filters, evade AI plagiarism detectors, or create look-alike phishing domain names.",
  },
  {
    question: "Can I paste a URL to check it?",
    answer:
      "Yes — pasting a domain name is one of the more common uses, since a single swapped character is nearly impossible to spot by eye.",
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
        heading="Fix Unicode Homoglyphs (Lookalike Characters)"
        subheading="Detect and convert lookalike Unicode characters back to standard ASCII — free and browser-based."
      />
      <SubToolContent
        title="Unicode Homoglyph Cleaner"
        directAnswerTitle="What Is a Homoglyph?"
        directAnswerText="A homoglyph is a character from a different alphabet that looks identical, or nearly identical, to a normal letter — for example, a Cyrillic 'а' that looks exactly like a Latin 'a' but is a different character underneath. These can end up in text through copy-pasting, some fonts, or occasionally through someone deliberately using them to disguise a word (a common trick in phishing links and spam). This tool scans text for characters that look like standard Latin letters but aren't, and converts them back to the real thing."
        beforeExample="Tеstаng text wіth fаkе Cyrіllіc letters."
        afterExample="Testing text with fake Cyrillic letters."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
