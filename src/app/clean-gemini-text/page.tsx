import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";
import RelatedGuides from "@/components/RelatedGuides";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean Gemini Text: Remove [1][2] Citations, Markdown & Hidden Spaces",
  description:
    "Paste text copied from Google Gemini and remove [1][2] citation numbers, markdown asterisks, chatty intros, curly quotes and hidden characters. Free, in your browser.",
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
    title: "Clean Gemini Text: Remove [1][2] Citations, Markdown & Hidden Spaces",
    description:
      "Remove [1][2] citation numbers, markdown and chatty intros from text copied out of Google Gemini.",
    url: `${siteUrl}/clean-gemini-text`,
  },
};

const removedItems = [
  {
    character: "Inline Search Citations",
    unicode: "[1], [2], [1][2]",
    description: "Bracketed source numbers from grounded answers, including [1], [2], [1][2] and [1, 2]. Any bracketed number is removed, so untick the option if your text uses [3]-style references on purpose.",
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
    description: "Paste into the box above. The Gemini preset is already on, including citation-number removal.",
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
      "No. It only removes surface formatting, bracketed citation numbers and typography. The wording is not rewritten. The links behind the citations are not copied with plain text, so keep your sources before cleaning if you need them.",
  },
  {
    question: "Is my Gemini text stored on your server?",
    answer:
      "Never. The cleaner runs 100% inside your local browser memory using client-side JavaScript. Zero server interaction.",
  },
];

const benchmarks = [
  { name: "Runs in your browser", time: "No upload" },
  { name: "Account required", time: "None" },
  { name: "Cost", time: "Free" },
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
          removeCitations: true,
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
              { href: "/clean-claude-text", label: "Clean Claude text", desc: "Markdown, XML-style tags and em dashes from Claude." },
              { href: "/remove-invisible-characters", label: "Remove invisible characters", desc: "Strip zero-width and other hidden characters." },
            ]}
          />
        }
      />
    </div>
  );
}
