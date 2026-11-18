import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";
import RelatedGuides from "@/components/RelatedGuides";

const siteUrl = "https://www.text-cleaner-ai.com";
const pageTitle = "Clean ChatGPT Text: Remove Em Dashes, Markdown & Hidden Spaces";
const pageDescription =
  "Paste ChatGPT output and remove em dashes, markdown asterisks, \"Certainly!\" intros, LaTeX markup, citation markers and invisible spaces. Free, runs in your browser.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "clean chatgpt text",
    "chatgpt text cleaner",
    "remove chatgpt formatting",
    "remove em dashes from chatgpt",
    "remove markdown from chatgpt",
    "chatgpt cleaner",
    "clean pasted chatgpt text",
  ],
  alternates: {
    canonical: "/clean-chatgpt-text",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/clean-chatgpt-text`,
  },
};

const removedItems = [
  {
    character: "Em Dashes",
    unicode: "U+2014",
    description:
      "ChatGPT uses em dashes for almost every aside. They are converted to plain hyphens so the text reads like your own writing.",
  },
  {
    character: "Narrow & Non-Breaking Spaces",
    unicode: "U+202F, U+00A0",
    description:
      "They look like normal spaces but block line wrapping and break exact-match search and find-and-replace. Converted to regular spaces.",
  },
  {
    character: "LaTeX Math Delimiters",
    unicode: "\\( x^2 \\), \\[ ... \\]",
    description:
      "ChatGPT wraps math in LaTeX markers that show up as raw backslashes when pasted into Word, Docs or email.",
  },
  {
    character: "Markdown Symbols",
    unicode: "**bold**, ## heading, `code`",
    description:
      "Asterisks, hashes, backticks and blockquote arrows that show up as literal characters outside the chat window. List numbers and bullets are kept.",
  },
  {
    character: "Chat Openers & Sign-Offs",
    unicode: "\"Certainly! Here's...\"",
    description:
      "Opening lines like \"Certainly! Here's a breakdown:\" and closers like \"Let me know if you need anything else.\"",
  },
  {
    character: "Search Citation Markers",
    unicode: "[1], 【4:0†source】",
    description:
      "Source markers ChatGPT adds to web-search answers. Enabled on this page; untick the option if you want to keep bracketed numbers.",
  },
];

const technicalGuidePoints = [
  {
    title: "Typography it favors",
    desc: "Em dashes, curly quotes and ellipsis characters. Fine in a chat bubble, but they break code, CSV files, templates and strict style guides.",
  },
  {
    title: "Invisible characters",
    desc: "Zero-width spaces and narrow no-break spaces can be pasted along with the visible text. You can't see them, but search, diff tools and word counters can.",
  },
  {
    title: "Formatting that doesn't travel",
    desc: "ChatGPT writes in Markdown. Word, Google Docs and most CMS editors don't render it, so ** and ## appear as literal characters.",
  },
];

const howToSteps = [
  {
    title: "Copy from ChatGPT",
    description: "Use the copy button under the ChatGPT answer, or select the text manually.",
  },
  {
    title: "Paste into the box above",
    description:
      "The ChatGPT preset is already on: em dashes, quotes, markdown, hidden characters, LaTeX markers, citations and chat filler.",
  },
  {
    title: "Click Clean Text and copy",
    description:
      "Review the summary of what changed, then copy the plain text into Word, Docs, WordPress or email.",
  },
];

const faqs = [
  {
    question: "Why does pasted ChatGPT text show ** and ## in Word or Google Docs?",
    answer:
      "ChatGPT formats answers in Markdown. Word, Google Docs and most editors don't render Markdown, so the raw symbols appear. Cleaning removes the markdown symbols and leaves plain text you can format yourself.",
  },
  {
    question: "Why does ChatGPT use so many em dashes, and does this remove them?",
    answer:
      "Em dashes are a common habit in model-written prose, so they stand out in a finished document. This tool converts em and en dashes (U+2014, U+2013) to a plain hyphen. For ways to reduce them at the source, see our guide on stopping ChatGPT from using em dashes.",
  },
  {
    question: "Why can't I search for text I pasted from ChatGPT, or why are there odd gaps?",
    answer:
      "Copied text can contain narrow no-break spaces (U+202F), non-breaking spaces (U+00A0) or zero-width characters. They look like normal spaces but don't match a typed space. The cleaner converts or removes them.",
  },
  {
    question: "Why do my math formulas show \\( and \\) around them?",
    answer:
      "ChatGPT writes math as LaTeX, wrapped in \\( \\) or \\[ \\]. The LaTeX option removes those delimiters so the formula is readable in a plain document.",
  },
  {
    question: "Does this remove numbered lists or bullet points?",
    answer:
      "No. Markdown symbols like ** and ## are removed, but list numbers and bullets are kept so your structure stays intact.",
  },
  {
    question: "Will cleaning stop AI detectors from flagging my text?",
    answer:
      "No. Cleaning removes formatting and hidden characters, not writing style. If you need to rework phrasing, use the AI Text Detector or Humanize AI Text tools.",
  },
  {
    question: "Is my text uploaded anywhere?",
    answer: "No. Cleaning runs entirely in your browser. Your text is never sent to a server.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ChatGPT Text Cleaner",
  url: `${siteUrl}/clean-chatgpt-text`,
  description:
    "Remove em dashes, Markdown symbols, LaTeX markers, citation markers, hidden spaces and chat filler from pasted ChatGPT text.",
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
  { name: "Runs in your browser", time: "No upload" },
  { name: "Account required", time: "None" },
  { name: "Cost", time: "Free" },
];

export default function CleanChatGPTTextPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
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
        subheading="Fix what ChatGPT adds when you paste into Word, Google Docs, WordPress or email: em dashes, asterisks, math markup and hidden spaces."
        initialOptions={{
          removeMarkdown: true,
          normalizeQuotes: true,
          normalizeDashes: true,
          convertNonBreakingSpaces: true,
          removeTrailingWhitespace: true,
          removeHiddenCharacters: true,
          removeAIFluff: true,
          removeLaTeX: true,
          removeCitations: true,
        }}
      />
      <SubToolContent
        title="ChatGPT Text Cleaner"
        badgeLabel="ChatGPT Cleanup"
        badgeIcon="smart_toy"
        directAnswerTitle="What ChatGPT leaves in your text"
        directAnswerText="ChatGPT writes in Markdown and favors certain typography. Paste its output into Word, Docs or a CMS and you get literal ** and ## symbols, em dashes (U+2014) used for nearly every aside, and curly quotes that break code and templates. Some answers also carry narrow no-break spaces (U+202F) that look like normal spaces but stop lines wrapping and fail exact-match searches, and math answers add \( \) LaTeX delimiters that show up as raw text. This cleaner removes each of these and leaves your wording untouched."
        technicalGuidePoints={technicalGuidePoints}
        beforeBadgeText="BEFORE: Pasted from ChatGPT"
        afterBadgeText="AFTER: Clean plain text"
        beforeExample={
          <div className="space-y-2 leading-relaxed">
            <div className="text-error font-semibold">Certainly! Here&apos;s a quick breakdown:</div>
            <div>
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                **Key idea**
              </span>{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                {"—"}
              </span>{" "}
              speed matters, but so does {"“"}accuracy{"”"}.
            </div>
            <div>
              Area:{" "}
              <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                {"\\( A = \\pi r^2 \\)"}
              </span>
            </div>
          </div>
        }
        afterExample={
          <div className="space-y-2 leading-relaxed">
            <div>
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                Key idea
              </span>{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                -
              </span>{" "}
              speed matters, but so does &quot;accuracy&quot;.
            </div>
            <div>
              Area:{" "}
              <span className="bg-surface-container-lowest px-1 py-0.5 rounded text-primary font-mono font-semibold">
                A = \pi r^2
              </span>
            </div>
          </div>
        }
        beforeNote="Contains: chat opener, ** markdown, em dash U+2014, curly quotes, LaTeX delimiters"
        afterNote="Result: plain text with straight quotes, a hyphen and no markup"
        streamChart={false}
        benchmarksTitle="At a glance"
        benchmarks={benchmarks}
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
        extraContent={
          <RelatedGuides
            title="Related ChatGPT cleanup guides"
            links={[
              {
                href: "/blog/how-to-stop-chatgpt-using-em-dashes",
                label: "How to stop ChatGPT using em dashes",
                desc: "Prompts and settings that reduce em dashes before you paste.",
              },
              {
                href: "/blog/how-to-clean-chatgpt-text-for-publishing",
                label: "Clean ChatGPT text for publishing",
                desc: "A checklist for getting AI drafts ready for a CMS.",
              },
              {
                href: "/remove-invisible-characters",
                label: "Remove invisible characters",
                desc: "Find and strip zero-width spaces and other hidden characters.",
              },
            ]}
          />
        }
      />
    </div>
  );
}
