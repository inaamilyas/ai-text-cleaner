import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean Claude AI Text — Remove Formatting, Thinking Tags & XML Artifacts",
  description:
    "Clean text copied from Anthropic Claude 3.5 Sonnet & Claude Haiku. Instantly strip conversational fluff, thinking blocks, markdown symbols, and smart quotes.",
  keywords: [
    "clean claude text",
    "clean claude",
    "claude text cleaner",
    "remove claude formatting",
    "clean anthropic text",
    "clean ai text",
  ],
  alternates: {
    canonical: "/clean-claude-text",
  },
  openGraph: {
    title: "Clean Claude AI Text — Remove Formatting, Thinking Tags & XML Artifacts",
    description:
      "Clean text copied from Anthropic Claude 3.5 Sonnet & Claude Haiku. Instantly strip conversational fluff, thinking blocks, and markdown symbols.",
    url: `${siteUrl}/clean-claude-text`,
  },
};

const removedItems = [
  {
    character: "Conversational Openers",
    unicode: "\"Here is a comprehensive breakdown...\"",
    description: "Claude's signature polite conversational greetings that should be removed before publishing.",
  },
  {
    character: "Thinking & XML Tags",
    unicode: "<thinking>, <antThinking>, ```tags",
    description: "Internal reasoning artifacts and prompt markers Claude outputs during complex analysis.",
  },
  {
    character: "Markdown Syntax",
    unicode: "**bold**, # headers, *lists*",
    description: "Formatting characters that corrupt layout when pasted into plain text fields, Word, or CMSs.",
  },
  {
    character: "Em-Dashes & Smart Quotes",
    unicode: "U+2014 (—), U+201C (“), U+201D (”)",
    description: "Typographic punctuation Claude heavily defaults to, normalized to standard hyphens and quotes.",
  },
];

const howToSteps = [
  {
    title: "Copy Claude Output",
    description: "Copy your response or draft directly from the Claude.ai web interface or Anthropic API.",
  },
  {
    title: "Paste into Claude Cleaner",
    description: "Paste your text into the input box above. Pre-configured filters automatically activate.",
  },
  {
    title: "Click Clean & Copy",
    description: "Click Clean Text to strip conversational fluff and formatting, then copy clean prose.",
  },
];

const faqs = [
  {
    question: "Why does Claude text need dedicated cleaning?",
    answer:
      "Anthropic's Claude models have unique linguistic patterns: they frequently start answers with elaborate polite preambles ('Certainly, I would be happy to help with that'), insert XML tag structures, and overuse parenthetical em-dashes. This cleaner strips those quirks automatically.",
  },
  {
    question: "Does this remove Claude code blocks?",
    answer:
      "No. It strips stray markdown fences if you choose, but your actual code and logic remain intact and uncorrupted.",
  },
  {
    question: "Is my text sent to Anthropic or any other server?",
    answer:
      "Never. All sanitization is performed locally inside your browser's JavaScript engine. Nothing is sent to any server.",
  },
];

const benchmarks = [
  { name: "Google Chrome", time: "Instant" },
  { name: "Apple Safari", time: "Instant" },
  { name: "Mozilla Firefox", time: "Instant" },
];

export default function CleanClaudePage() {
  return (
    <div className="w-full">
      <Hero
        heading="Clean Anthropic Claude AI Text"
        subheading="Paste text copied from Claude 3.5 Sonnet or Haiku. Instantly strip conversational fluff, reasoning tags, markdown artifacts, and curly quotes in your browser."
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
        title="Claude AI Text Cleaner"
        badgeLabel="Anthropic Sanitization"
        badgeIcon="face"
        directAnswerTitle="Why Does Claude AI Output Need Specialized Cleaning?"
        directAnswerText="Claude 3.5 Sonnet produces exceptionally coherent prose, but it carries distinctive platform artifacts: polite conversational intros ('I'd be glad to assist with this analysis:'), repetitive em-dashes, and markdown formatting that breaks when pasted into email clients or Word documents. This specialized cleaner eliminates these cues in under 10 milliseconds."
        beforeBadgeText="BEFORE: Raw Claude Chat Output"
        afterBadgeText="AFTER: Sanitized Clean Text"
        beforeExample={
          <div className="space-y-2 leading-relaxed">
            <div className="text-error font-semibold">Certainly! Here is an analysis of the topic:</div>
            <div>
              Claude&apos;s output contains{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                **bold markdown**
              </span>{" "}
              and{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                —
              </span>{" "}
              frequent em-dashes.
            </div>
          </div>
        }
        afterExample={
          <div className="space-y-2 leading-relaxed">
            <div>
              Claude&apos;s output contains{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                bold markdown
              </span>{" "}
              and{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                -
              </span>{" "}
              clean standardized hyphens.
            </div>
          </div>
        }
        beforeNote="Contains: Conversational fluff intro, ** markdown, em-dash U+2014"
        afterNote="Purged: Fluff stripped, plain text ASCII formatting restored"
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
