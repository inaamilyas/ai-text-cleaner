import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean Google Gemini Text — Remove Citations, Markdown & Search Artifacts",
  description:
    "Clean text copied from Google Gemini 1.5 & 2.0. Instantly remove inline citation brackets [1][2], conversational intros, markdown asterisks, and smart quotes.",
  keywords: [
    "clean gemini text",
    "gemini cleaner",
    "gemini clean",
    "remove gemini citations",
    "clean google gemini",
    "clean ai text",
  ],
  alternates: {
    canonical: "/clean-gemini-text",
  },
  openGraph: {
    title: "Clean Google Gemini Text — Remove Citations, Markdown & Search Artifacts",
    description:
      "Clean text copied from Google Gemini 1.5 & 2.0. Instantly remove inline citation brackets, conversational intros, and markdown asterisks.",
    url: `${siteUrl}/clean-gemini-text`,
  },
};

const removedItems = [
  {
    character: "Inline Search Citations",
    unicode: "[1], [2], [1][2]",
    description: "Gemini's automatic web search grounding citation numbers that clutter pasted text.",
  },
  {
    character: "Conversational Openers & Sign-Offs",
    unicode: "\"Sure, here is what you need to know...\"",
    description: "Conversational chat padding that should be removed prior to publishing in documents or blogs.",
  },
  {
    character: "Markdown Asterisks & Tables",
    unicode: "**bold**, ## headers, | tables |",
    description: "Markdown formatting characters that disrupt styling when pasted into Word or email clients.",
  },
  {
    character: "Smart Quotes & Unicode Control Spaces",
    unicode: "U+201C, U+201D, U+00A0",
    description: "Curly quotes and non-breaking spaces that cause formatting glitches in CMS databases.",
  },
];

const howToSteps = [
  {
    title: "Copy Gemini Text",
    description: "Copy your output directly from Google Gemini or Google AI Studio.",
  },
  {
    title: "Paste into Gemini Cleaner",
    description: "Paste your text into the input field above. Citation and markdown rules activate automatically.",
  },
  {
    title: "Click Clean & Copy",
    description: "Click Clean Text to sanitize in milliseconds, then copy clean, citation-free prose.",
  },
];

const faqs = [
  {
    question: "Why does Gemini text have bracketed numbers like [1] or [2]?",
    answer:
      "Google Gemini automatically grounds responses with Google Search and inserts bracketed footnote numbers linking to web sources. When copied into plain text, these numbers remain stuck in the middle of sentences. This tool cleans them up effortlessly.",
  },
  {
    question: "Does cleaning affect the accuracy of the information?",
    answer:
      "No. It strictly cleans surface formatting, bracketed citations, and typography without rewriting or altering your factual content.",
  },
  {
    question: "Is my Gemini text stored on your server?",
    answer:
      "Never. The cleaner runs 100% inside your local browser memory using client-side JavaScript. Zero server interaction.",
  },
];

const benchmarks = [
  { name: "Google Chrome", time: "Instant" },
  { name: "Apple Safari", time: "Instant" },
  { name: "Mozilla Firefox", time: "Instant" },
];

export default function CleanGeminiPage() {
  return (
    <div className="w-full">
      <Hero
        heading="Clean Google Gemini AI Text"
        subheading="Paste text copied from Google Gemini. Instantly strip inline citation numbers [1][2], conversational intros, markdown artifacts, and smart quotes in your browser."
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
        title="Google Gemini Text Cleaner"
        badgeLabel="Gemini Sanitization"
        badgeIcon="search_spark"
        directAnswerTitle="Why Does Google Gemini Text Require Cleaning?"
        directAnswerText="When copying responses from Google Gemini, the text frequently includes bracketed web citation markers (like [1], [2]), conversational preambles ('Here is a clear explanation:'), and heavy markdown asterisks. This utility automatically strips citation noise, removes markdown, and normalizes typography for seamless publishing."
        beforeBadgeText="BEFORE: Raw Gemini Output with Citations"
        afterBadgeText="AFTER: Sanitized Clean Text"
        beforeExample={
          <div className="space-y-2 leading-relaxed">
            <div className="text-error font-semibold">Sure, here is the information:</div>
            <div>
              Gemini provides grounded answers{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                [1][2]
              </span>{" "}
              with{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                **bold headers**
              </span>
              .
            </div>
          </div>
        }
        afterExample={
          <div className="space-y-2 leading-relaxed">
            <div>
              Gemini provides grounded answers with{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                bold headers
              </span>
              .
            </div>
          </div>
        }
        beforeNote="Contains: Conversational intro, citation brackets [1][2], ** markdown"
        afterNote="Purged: Citations removed, plain text clean formatting restored"
        streamChart={false}
        benchmarksTitle="Browser Execution Latency"
        benchmarks={benchmarks}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
