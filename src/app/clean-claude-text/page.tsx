import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean Claude Text — Remove Anthropic Claude Formatting & Filler",
  description:
    "Clean text copied from Claude. Remove leftover tags, extra politeness, and formatting artifacts in one click. Free and private.",
  keywords: [
    "clean claude",
    "clean claude text",
  ],
  alternates: {
    canonical: "/clean-claude-text",
    languages: {
      en: "/clean-claude-text",
      es: "/es/clean-claude-text",
      de: "/de/clean-claude-text",
      fr: "/fr/clean-claude-text",
      it: "/it/clean-claude-text",
      pt: "/pt/clean-claude-text",
      ar: "/ar/clean-claude-text",
      ja: "/ja/clean-claude-text",
      nl: "/nl/clean-claude-text",
      tr: "/tr/clean-claude-text",
      id: "/id/clean-claude-text",
    },
  },
  openGraph: {
    title: "Clean Claude Text — Remove Anthropic Claude Formatting & Filler",
    description:
      "Remove leftover XML-style tags, conversational filler, and formatting artifacts from text copied out of Claude.",
    url: `${siteUrl}/clean-claude-text`,
  },
};

const removedItems = [
  {
    character: "Leftover XML-Style Tags",
    unicode: "<tag>...</tag>",
    description:
      "Claude sometimes carries over formatting meant for its own internal structure, not for you.",
  },
  {
    character: "Conversational Openers & Closers",
    unicode: "\"Sure, here's...\"",
    description:
      "Phrases like \"I'd be happy to help with that\" read fine in a chat but not in a finished document.",
  },
  {
    character: "Excess Hedging Language",
    unicode: "n/a",
    description: "Extra qualifiers and caveats that add length without adding meaning.",
  },
  {
    character: "Smart Quotes, Em Dashes & Invisible Characters",
    unicode: "U+201C / U+2014 / U+200B",
    description:
      "Curly quotes, long dashes, and hidden unicode spacers that cause formatting glitches elsewhere.",
  },
];

const howToSteps = [
  {
    title: "Copy from Claude.ai",
    description:
      "Copy your text response or generated article directly from the Anthropic Claude interface.",
  },
  {
    title: "Paste into Cleaner",
    description:
      "Paste into the editor above. Our engine applies optimal Claude text sanitization presets.",
  },
  {
    title: "Copy Clean Plain Text",
    description:
      "Click Clean Text to get publication-ready plain text with zero formatting quirks.",
  },
];

const benchmarks = [
  { name: "Google Chrome", time: "Instant" },
  { name: "Apple Safari", time: "Instant" },
  { name: "Mozilla Firefox", time: "Instant" },
];

const faqs = [
  {
    question: "What does \"clean Claude text\" actually mean?",
    answer:
      "It means removing the formatting and stock phrasing Claude adds automatically, so what's left is just your content — ready to paste into a document, email, or article.",
  },
  {
    question: "Does this work for Claude Code output too?",
    answer:
      "For terminal output and code, use the separate Claude Code cleaner below — it's built for colour codes and diff formatting rather than prose.",
  },
  {
    question: "Is this an official Anthropic tool?",
    answer:
      "No. This is an independent tool built to clean text copied from Claude's chat interface. It isn't affiliated with Anthropic.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Clean Claude Text",
  url: `${siteUrl}/clean-claude-text`,
  description: "Remove leftover XML-style tags, conversational filler, and formatting artifacts from Claude text.",
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
  name: "How to Clean Claude AI Text Formatting",
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

export default function CleanClaudeTextPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">
        Clean Claude AI Text | Text Cleaner AI
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
        heading="Clean Text Copied From Claude"
        subheading="Remove leftover tags, extra politeness, and formatting artifacts from Claude text — free and private."
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
        title="Clean Claude Text"
        badgeLabel="Claude Sanitization"
        badgeIcon="auto_awesome"
        directAnswerTitle="Why Does Claude Text Need Cleaning?"
        directAnswerText="Claude, made by Anthropic, sometimes carries over formatting meant for its own internal structure rather than for you — leftover XML-style tags, phrases like &quot;I'd be happy to help with that,&quot; or extra hedging that reads fine in a chat but not in a finished document. This tool strips that out, along with the general clean-up every AI tool's text needs: smart quotes, em dashes, and invisible characters."
        beforeBadgeText="BEFORE (Raw Text with Hidden Artifacts)"
        afterBadgeText="AFTER (Cleaned & Sanitized Output)"
        beforeExample={
          <div className="space-y-1 leading-loose">
            <div className="text-error font-semibold mb-1">**Claude Summary:**</div>
            <div>
              - Here is a point with{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                *italic*
              </span>{" "}
              words.
            </div>
            <div>
              -{" "}
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
          <div className="space-y-1 leading-loose">
            <div className="text-on-surface font-medium mb-1">Claude Summary:</div>
            <div>
              - Here is a point with{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                italic
              </span>{" "}
              words.
            </div>
            <div>
              -{" "}
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
