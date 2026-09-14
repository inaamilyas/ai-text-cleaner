import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Free ChatGPT Text Cleaner — Remove AI Formatting & Markdown",
  description:
    "Clean text copied from ChatGPT, Claude, or Gemini. Remove unwanted asterisks, smart quotes, em dashes, and AI formatting quirks instantly.",
  keywords: [
    "clean chatgpt text",
    "remove chatgpt formatting",
    "remove chatgpt asterisks bold",
    "clean ai text",
    "chatgpt text sanitizer",
  ],
  alternates: {
    canonical: "/clean-chatgpt-text",
    languages: {
      en: "/clean-chatgpt-text",
      es: "/es/clean-chatgpt-text",
      de: "/de/clean-chatgpt-text",
      fr: "/fr/clean-chatgpt-text",
      it: "/it/clean-chatgpt-text",
      pt: "/pt/clean-chatgpt-text",
      ar: "/ar/clean-chatgpt-text",
      ja: "/ja/clean-chatgpt-text",
      nl: "/nl/clean-chatgpt-text",
      tr: "/tr/clean-chatgpt-text",
      id: "/id/clean-chatgpt-text",
    },
  },
  openGraph: {
    title: "Free ChatGPT Text Cleaner — Remove AI Formatting & Markdown",
    description:
      "Paste your ChatGPT responses to instantly strip unwanted markdown, bold asterisks, and hidden AI artifacts.",
    url: `${siteUrl}/clean-chatgpt-text`,
  },
};

const removedItems = [
  {
    character: "Markdown Bold/Italic Asterisks",
    unicode: "U+002A (*)",
    description: "ChatGPT adds double asterisks **like this** for emphasis, which clutter plain text emails and documents.",
  },
  {
    character: "Smart Curly Quotes",
    unicode: "U+201C / U+201D",
    description: "Curly quotes substituted by ChatGPT that break code syntax and CMS publishing software.",
  },
  {
    character: "Non-Breaking Spaces & Trailing Gaps",
    unicode: "U+00A0",
    description: "Extra whitespace inserted between paragraphs when copying text from OpenAI ChatGPT interface.",
  },
];

const howToSteps = [
  {
    title: "Copy from ChatGPT",
    description: "Copy your response or article directly from the ChatGPT, Claude, or Gemini chat interface.",
  },
  {
    title: "Paste into Cleaner",
    description: "Paste into the input box above. The cleaner automatically applies optimal ChatGPT cleaning presets.",
  },
  {
    title: "Copy Clean Plain Text",
    description: "Click Clean Text to get sanitized, publication-ready plain text with 1 click.",
  },
];

const faqs = [
  {
    question: "Why does text copied from ChatGPT have weird formatting?",
    answer:
      "ChatGPT formats output using Markdown (asterisks, hashes, backticks) and rich web styling. When copied into Google Docs, WordPress, or email clients, these tags remain behind as unwanted symbols.",
  },
  {
    question: "Does this remove AI detection watermarks?",
    answer:
      "Yes! AI Text Cleaner removes invisible unicode control characters (such as zero-width spaces and non-breaking spaces) that some AI interfaces insert into generated text.",
  },
  {
    question: "How do I strip bold double asterisks (**text**) from ChatGPT?",
    answer:
      "Ensure the 'Remove markdown formatting' checkbox is selected. Our cleaner automatically strips surrounding asterisks and hashtags while leaving the actual text intact.",
  },
  {
    question: "Can I clean ChatGPT code responses without breaking syntax?",
    answer:
      "Yes! Use our 'Code & JSON Safe' quick preset. It normalizes curly smart quotes and non-breaking spaces into ASCII characters without stripping code block structures.",
  },
  {
    question: "Is there any word limit for ChatGPT text cleaning?",
    answer:
      "No. All sanitization is executed locally in your browser memory, so you can clean multi-page articles or long ChatGPT conversations instantly.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ChatGPT Text Cleaner",
  url: `${siteUrl}/clean-chatgpt-text`,
  description: "Free tool to sanitize ChatGPT text, remove bold asterisks, and fix AI formatting quirks.",
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
  name: "How to Clean ChatGPT Text Formatting",
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

const benchmarks = [
  { name: "Google Chrome", time: "1.1 ms" },
  { name: "Apple Safari", time: "1.4 ms" },
  { name: "Mozilla Firefox", time: "1.7 ms" },
];

export default function CleanChatGPTTextPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">ChatGPT Text Cleaner | AI Text Cleaner</span>
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
        heading="ChatGPT Text Cleaner"
        subheading="Sanitize text from ChatGPT, Claude, and Gemini. Strip unwanted Markdown asterisks, smart quotes, em dashes, and AI whitespace instantly."
        initialOptions={{
          removeMarkdown: true,
          normalizeQuotes: true,
          normalizeDashes: true,
          removeTrailingWhitespace: true,
          removeHiddenCharacters: true,
          removeAIFluff: true,
        }}
      />
      <SubToolContent
        title="ChatGPT Text Cleaner"
        badgeLabel="OpenAI Sanitization"
        badgeIcon="smart_toy"
        directAnswerTitle="How to Clean ChatGPT Text Formatting Fast?"
        directAnswerText="Text copied from ChatGPT often contains Markdown artifacts (such as **bold asterisks**, # headers, and `code backticks`), smart quotes, and hidden whitespace. Our ChatGPT Text Cleaner strips these formatting quirks instantly, giving you clean plain text ready for Google Docs, WordPress, or email."
        beforeBadgeText="BEFORE: Raw Text with Hidden Artifacts"
        afterBadgeText="AFTER: Cleaned & Sanitized Plain Text"
        beforeExample={
          <div className="space-y-2 leading-relaxed">
            <div className="text-error font-semibold">**Here is a summary:**</div>
            <div>
              1. ChatGPT output has{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                *asterisks*
              </span>
              .
            </div>
            <div>
              2.{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                “Smart quotes”
              </span>{" "}
              &amp;{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                —
              </span>{" "}
              em dashes.
            </div>
          </div>
        }
        afterExample={
          <div className="space-y-2 leading-relaxed">
            <div className="text-on-surface font-medium">Here is a summary:</div>
            <div>
              1. ChatGPT output has{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                asterisks
              </span>
              .
            </div>
            <div>
              2.{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                &quot;Smart quotes&quot;
              </span>{" "}
              &amp;{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                -
              </span>{" "}
              em dashes.
            </div>
          </div>
        }
        beforeNote="Contains: ** markdown, curly “ ”, U+2014 em dash"
        afterNote="Purged: Plain text ASCII quotes & standardized hyphen"
        streamChart={false}
        benchmarksTitle="Browser Engine Latency"
        benchmarks={benchmarks}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
