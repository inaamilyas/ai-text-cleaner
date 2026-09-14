import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean Microsoft Copilot Text — Remove Copilot Formatting & Citations",
  description:
    "Remove Copilot's sidebar headers, citation links, and repeated web references from pasted text. Free and browser-based.",
  keywords: [
    "clean copilot text",
    "remove copilot formatting",
  ],
  alternates: {
    canonical: "/clean-copilot-text",
    languages: {
      en: "/clean-copilot-text",
      es: "/es/clean-copilot-text",
      de: "/de/clean-copilot-text",
      fr: "/fr/clean-copilot-text",
      it: "/it/clean-copilot-text",
      pt: "/pt/clean-copilot-text",
      ar: "/ar/clean-copilot-text",
      ja: "/ja/clean-copilot-text",
      nl: "/nl/clean-copilot-text",
      tr: "/tr/clean-copilot-text",
      id: "/id/clean-copilot-text",
    },
  },
  openGraph: {
    title: "Clean Microsoft Copilot Text — Remove Copilot Formatting & Citations",
    description:
      "Remove Copilot's sidebar headers, citation links, and repeated source names from pasted text.",
    url: `${siteUrl}/clean-copilot-text`,
  },
};

const removedItems = [
  {
    character: "Citation Superscripts & Footnote Links",
    unicode: "[1] [2]",
    description: "Copilot's citation links point back to its own interface; pasted elsewhere, they're just dead superscript numbers.",
  },
  {
    character: "Sidebar Headers & Source Labels",
    unicode: "n/a",
    description: "Headers meant for Copilot's sidebar view that create clutter once pasted into a document.",
  },
  {
    character: "Repeated Source Names",
    unicode: "n/a",
    description: "The same reference name repeated multiple times through an answer.",
  },
  {
    character: "Invisible Characters & Smart Quotes",
    unicode: "U+200B / U+201C",
    description: "Typography marks and hidden unicode that cause syntax errors in developer tools.",
  },
];

const howToSteps = [
  {
    title: "Copy from Microsoft Copilot",
    description: "Copy your response or web summary directly from the Copilot interface.",
  },
  {
    title: "Paste into Cleaner",
    description: "Paste into the input box above to automatically activate optimal Copilot sanitization filters.",
  },
  {
    title: "Copy Clean Plain Text",
    description: "Click Clean Text to get publication-ready text free from citation brackets and Markdown.",
  },
];

const faqs = [
  {
    question: "Why do citation numbers break when I paste them?",
    answer:
      "Copilot's citation links point back to its own interface. Once pasted elsewhere, they're just dead superscript numbers, so removing them is usually the right call.",
  },
  {
    question: "Does it work with long answers?",
    answer: "Yes, there's no practical length limit for browser-based cleaning.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Microsoft Copilot Text Cleaner",
  url: `${siteUrl}/clean-copilot-text`,
  description: "Remove Copilot's sidebar headers, citation links, and repeated web references from pasted text.",
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
  name: "How to Clean Microsoft Copilot Text Formatting",
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

export default function CleanCopilotTextPage() {
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
        heading="Clean Text Copied From Microsoft Copilot"
        subheading="Remove Copilot's sidebar headers, citation links, and repeated web references from pasted text — free and browser-based."
        initialOptions={{
          removeMarkdown: true,
          normalizeQuotes: true,
          normalizeDashes: true,
          removeTrailingWhitespace: true,
          removeHiddenCharacters: true,
        }}
      />
      <SubToolContent
        title="Clean Microsoft Copilot Text"
        directAnswerTitle="Why Does Copilot Text Need Cleaning?"
        directAnswerText="Copilot answers often carry over citation links, numbered references, and headers meant for its sidebar view. Once that text is pasted into a document, those extras just create clutter and broken-looking links. This tool removes them, along with the general clean-up every AI tool's text needs."
        beforeExample={"**Copilot Report:**\n1. Search finding.\n2. “Smart quotes” & — em dashes."}
        afterExample={'Copilot Report:\n1. Search finding.\n2. "Smart quotes" & - em dashes.'}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
