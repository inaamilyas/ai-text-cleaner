import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";
import RelatedGuides from "@/components/RelatedGuides";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean Claude Text: Remove Markdown, Em Dashes & XML Tags",
  description:
    "Paste text copied from Claude (Anthropic) and remove markdown symbols, em dashes, curly quotes, XML-style tags, chatty intros and hidden characters. Free, in your browser.",
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
    title: "Clean Claude Text: Remove Markdown, Em Dashes & XML Tags",
    description:
      "Remove markdown, em dashes, curly quotes, XML-style tags and chatty intros from text copied out of Claude.",
    url: `${siteUrl}/clean-claude-text`,
  },
};

const removedItems = [
  {
    character: "Conversational Openers",
    unicode: "\"Here is a comprehensive breakdown...\"",
    description: "Polite lead-ins such as \"Certainly! Here is...\" and closing offers to help, removed before you publish.",
  },
  {
    character: "Thinking & XML Tags",
    unicode: "<thinking>, <antThinking>, ```tags",
    description: "Angle-bracket tags such as <thinking> are stripped. Text between the tags is kept, so delete any reasoning section you do not want before cleaning.",
  },
  {
    character: "Markdown Syntax",
    unicode: "**bold**, # headers, *lists*",
    description: "Formatting characters that corrupt layout when pasted into plain text fields, Word, or CMSs.",
  },
  {
    character: "Em-Dashes & Smart Quotes",
    unicode: "U+2014 (—), U+201C (“), U+201D (”)",
    description: "Typographic punctuation that breaks code, CSVs and strict style guides, converted to plain hyphens and straight quotes.",
  },
];

const howToSteps = [
  {
    title: "Copy Claude Output",
    description: "Copy the response from claude.ai, the mobile app, Claude Code or API output.",
  },
  {
    title: "Paste into Claude Cleaner",
    description: "Paste into the box above. The Claude preset is already on: markdown, tags, em dashes, quotes and hidden characters.",
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
      "Claude answers often open with a polite preamble, use Markdown formatting, include XML-style tags when asked to structure output, and use em dashes. Pasted into Word, email or a CMS, those show up as raw symbols. This cleaner removes them.",
  },
  {
    question: "Does this remove Claude code blocks?",
    answer:
      "Inline backticks are removed as markdown, but your code text itself is not rewritten. If you are pasting a lot of code, untick \"Remove markdown formatting\" and \"Strip HTML tags\" first so angle brackets in your code are kept.",
  },
  {
    question: "Is my text sent to Anthropic or any other server?",
    answer:
      "Never. All sanitization is performed locally inside your browser's JavaScript engine. Nothing is sent to any server.",
  },
];

const benchmarks = [
  { name: "Runs in your browser", time: "No upload" },
  { name: "Account required", time: "None" },
  { name: "Cost", time: "Free" },
];

export default function CleanClaudePage() {
  return (
    <div className="w-full">
      <Hero
        heading="Clean Anthropic Claude AI Text"
        subheading="Paste text copied from Claude. Strip chatty intros, XML-style tags, markdown symbols, em dashes and curly quotes in your browser."
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
        directAnswerText="Claude writes clean, coherent prose, but copying it out of the chat brings some baggage: polite conversational intros ('I'd be glad to assist with this analysis:'), repetitive em-dashes, and markdown formatting that breaks when pasted into email clients or Word documents. This cleaner removes them while leaving your wording untouched."
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
        benchmarksTitle="At a glance"
        benchmarks={benchmarks}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
        extraContent={
          <RelatedGuides
            title="Related cleanup tools"
            links={[
              { href: "/clean-chatgpt-text", label: "Clean ChatGPT text", desc: "Em dashes, LaTeX markers and hidden spaces from ChatGPT." },
              { href: "/clean-gemini-text", label: "Clean Gemini text", desc: "Remove [1][2] citation numbers and markdown from Gemini." },
              { href: "/blog/how-to-stop-chatgpt-using-em-dashes", label: "Stop AI em dashes", desc: "Prompts that cut em dashes before you paste." },
            ]}
          />
        }
      />
    </div>
  );
}
