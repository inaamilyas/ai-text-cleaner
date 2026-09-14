import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean ChatGPT Text — Remove Formatting From Pasted ChatGPT Text",
  description:
    "Clean text copied from ChatGPT. Remove Markdown symbols, conversational filler, and hidden characters before you paste it anywhere. Free.",
  keywords: [
    "clean chatgpt text",
    "clean pasted text",
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
    title: "Clean ChatGPT Text — Remove Formatting From Pasted ChatGPT Text",
    description:
      "Remove Markdown symbols, conversational filler, and hidden characters from text copied out of ChatGPT.",
    url: `${siteUrl}/clean-chatgpt-text`,
  },
};

const removedItems = [
  {
    character: "Markdown Symbols",
    unicode: "**bold**, # heading, `code`",
    description: "ChatGPT adds double asterisks, hashes, and backticks for formatting that doesn't survive pasting elsewhere.",
  },
  {
    character: "Conversational Openers & Sign-Offs",
    unicode: "\"Certainly! Here's...\"",
    description: "Opening lines and closing offers to help that read fine in chat but not in a finished document.",
  },
  {
    character: "List Symbols That Don't Survive Pasting",
    unicode: "1. / - ",
    description: "Numbered and bulleted list markers that turn into stray characters once pasted outside ChatGPT.",
  },
  {
    character: "Smart Quotes & Invisible Characters",
    unicode: "U+201C / U+200B",
    description: "Curly quotes and hidden unicode spacers that break code syntax and CMS publishing software.",
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
    question: "Why does pasted ChatGPT text look different in Word than it did in the chat?",
    answer:
      "ChatGPT formats its answers in Markdown, a plain-text style of formatting. Word and most editors don't read Markdown, so you end up with the raw symbols instead of actual bold text or headings. Cleaning converts it to plain text instead.",
  },
  {
    question: "Will this remove code blocks I want to keep?",
    answer:
      "Use the \"Code & JSON Safe\" preset if you're pasting a mix of prose and code — it skips characters that matter inside code.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ChatGPT Text Cleaner",
  url: `${siteUrl}/clean-chatgpt-text`,
  description: "Remove Markdown symbols, conversational filler, and hidden characters from pasted ChatGPT text.",
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
  { name: "Google Chrome", time: "Instant" },
  { name: "Apple Safari", time: "Instant" },
  { name: "Mozilla Firefox", time: "Instant" },
];

export default function CleanChatGPTTextPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">ChatGPT Text Cleaner | Text Cleaner AI</span>
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
        heading="Clean Text Copied From ChatGPT"
        subheading="Remove Markdown symbols, conversational filler, and hidden characters before you paste it anywhere — free."
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
        directAnswerTitle="Why Does ChatGPT Text Need Cleaning?"
        directAnswerText="When you copy an answer out of ChatGPT and paste it into Word, WordPress, or an email, some things come along that you didn't ask for: double asterisks around bold text, numbered lists that don't format properly, opening lines like &quot;Certainly! Here's a breakdown:&quot;, and sign-offs like &quot;Let me know if you'd like me to adjust this.&quot; This tool strips all of that out, so you're left with clean pasted text — just the words, formatted the way you'd type them yourself."
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
