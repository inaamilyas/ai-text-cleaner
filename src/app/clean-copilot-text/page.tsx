import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://aitextcleaner.com";

export const metadata: Metadata = {
  title: "Clean Microsoft Copilot Text — Remove Copilot AI Formatting & Quirks",
  description:
    "Clean text copied from Microsoft Copilot (Bing AI). Remove footnote numbers [1], Markdown formatting, smart quotes, and hidden spacers.",
  keywords: [
    "clean copilot text",
    "clean microsoft copilot text",
    "remove bing ai formatting",
    "copilot text cleaner",
    "remove copilot citation numbers",
  ],
  alternates: {
    canonical: "/clean-copilot-text",
  },
  openGraph: {
    title: "Clean Microsoft Copilot Text — Remove Copilot AI Formatting & Quirks",
    description:
      "Paste Microsoft Copilot outputs to instantly strip citation numbers, bold asterisks, and hidden AI artifacts.",
    url: `${siteUrl}/clean-copilot-text`,
  },
};

const removedItems = [
  {
    character: "Copilot Citation & Footnote Numbers",
    unicode: "[1] [2]",
    description: "Microsoft Copilot inserts bracketed web citations into generated text that clutter clean documents.",
  },
  {
    character: "Markdown Bold & Headers",
    unicode: "U+002A (*)",
    description: "Formatting symbols used in Copilot chat windows that persist when copied to external software.",
  },
  {
    character: "Smart Quotes & Em Dashes",
    unicode: "U+201C / U+2014",
    description: "Typography marks that cause code syntax errors in developers tools.",
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
    question: "Why does Copilot text have bracketed numbers like [1]?",
    answer:
      "Copilot includes web search citations as numbers in brackets. Our text cleaner strips Markdown formatting and cleans up AI output.",
  },
  {
    question: "Does this work on mobile and desktop?",
    answer:
      "Yes! AI Text Cleaner runs in any web browser on desktop, tablet, or smartphone.",
  },
  {
    question: "How do I remove conversational fluff from Copilot output?",
    answer:
      "Select the 'Strip AI conversational intro/outro' checkbox to automatically remove conversational opening lines and closing statements.",
  },
  {
    question: "Does Copilot text contain zero-width spaces?",
    answer:
      "Yes. The web view for Microsoft Copilot inserts zero-width spaces (U+200B) for line wrapping, which our cleaner automatically strips.",
  },
  {
    question: "Is my pasted Copilot text saved anywhere?",
    answer:
      "No. All sanitization happens 100% in your browser memory. We never store or upload your text.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Microsoft Copilot Text Cleaner",
  url: `${siteUrl}/clean-copilot-text`,
  description: "Free tool to sanitize text copied from Microsoft Copilot AI.",
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
        heading="Clean Microsoft Copilot Text"
        subheading="Sanitize text from Microsoft Copilot. Strip Markdown asterisks, smart quotes, em dashes, and AI formatting quirks instantly."
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
        directAnswerTitle="How to Clean Microsoft Copilot Text Formatting?"
        directAnswerText="Text copied from Microsoft Copilot (Bing AI) contains Markdown formatting (**asterisks**), smart quotes, and hidden non-breaking spaces. Our tool strips these formatting artifacts instantly in your browser."
        beforeExample={"**Copilot Report:**\n1. Search finding.\n2. “Smart quotes” & — em dashes."}
        afterExample={'Copilot Report:\n1. Search finding.\n2. "Smart quotes" & - em dashes.'}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
