import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Zero-Width Space Remover — Delete Invisible U+200B Characters",
  description:
    "Find and remove zero-width spaces and other invisible Unicode characters from your text. Free, instant, browser-based.",
  keywords: [
    "remove zero width space",
    "zero width space remover",
  ],
  alternates: {
    canonical: "/remove-zero-width-space",
    languages: {
      en: "/remove-zero-width-space",
      es: "/es/remove-zero-width-space",
      de: "/de/remove-zero-width-space",
      fr: "/fr/remove-zero-width-space",
      it: "/it/remove-zero-width-space",
      pt: "/pt/remove-zero-width-space",
      ar: "/ar/remove-zero-width-space",
      ja: "/ja/remove-zero-width-space",
      nl: "/nl/remove-zero-width-space",
      tr: "/tr/remove-zero-width-space",
      id: "/id/remove-zero-width-space",
    },
  },
  openGraph: {
    title: "Zero-Width Space Remover — Clean Hidden U+200B Characters Online",
    description:
      "Detect and remove zero-width spaces (U+200B) and hidden unicode characters instantly in your browser.",
    url: `${siteUrl}/remove-zero-width-space`,
  },
};

const removedItems = [
  {
    character: "Zero-Width Space (ZWSP)",
    unicode: "U+200B",
    description:
      "Invisible space added by AI models and rich text editors that causes regex crashes and code errors.",
  },
  {
    character: "Zero-Width Non-Joiner (ZWNJ)",
    unicode: "U+200C",
    description:
      "Used in script typesetting, often accidentally pasted into plain text input fields.",
  },
  {
    character: "Zero-Width Joiner (ZWJ)",
    unicode: "U+200D",
    description:
      "Used for combining emojis or characters, breaks character counts and string operations.",
  },
  {
    character: "Byte Order Mark (BOM)",
    unicode: "U+FEFF",
    description:
      "Unicode character inserted at the start of text streams that breaks web compilers and JSON parsers.",
  },
];

const howToSteps = [
  {
    title: "Paste Your Text",
    description:
      "Copy text containing suspected zero-width spaces or code errors and paste it into the editor above.",
  },
  {
    title: "Instant Detection",
    description:
      "The zero-width space remover automatically identifies hidden U+200B and unicode control marks.",
  },
  {
    title: "Copy Clean Output",
    description:
      "Click Clean Text and copy sanitized plain text free from invisible characters.",
  },
];

const benchmarks = [
  { name: "Chrome", time: "Instant" },
  { name: "Safari", time: "Instant" },
  { name: "Firefox", time: "Instant" },
];

const valueProps = [
  {
    title: "100% In-Browser Privacy",
    desc: "Text is processed entirely in your browser. Never sent to an external server.",
    icon: "verified_user",
  },
  {
    title: "No Practical Length Limit",
    desc: "Runs locally, so there's no queue or upload delay even for long documents.",
    icon: "bolt",
  },
  {
    title: "Catches the Related Characters Too",
    desc: "Also detects the zero-width joiner, non-joiner, and word joiner, not just U+200B.",
    icon: "psychology",
  },
  {
    title: "Zero Account Required",
    desc: "Free, open tooling for developers, researchers, and editors without registration or paywalls.",
    icon: "no_accounts",
  },
];

const faqs = [
  {
    question: "How do I know if my text has a zero-width space in it?",
    answer:
      "You usually can't tell by looking — that's the point of the character. If you're getting unexplained errors in code, search, or form validation, it's worth running your text through this tool as a check.",
  },
  {
    question: "Is this different from the general invisible character remover?",
    answer:
      "This page focuses specifically on zero-width characters. The invisible character remover covers a wider set, including non-breaking spaces and byte order marks.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Zero-Width Space Remover",
  url: `${siteUrl}/remove-zero-width-space`,
  description: "Free online tool to strip zero-width spaces (U+200B) and invisible unicode characters.",
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
  name: "How to Remove Zero-Width Spaces from Text",
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

export default function RemoveZeroWidthSpacePage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">
        Zero-Width Space Remover — Clean Hidden U+200B Characters Online | Text Cleaner AI
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
        heading="Remove Zero-Width Spaces From Text"
        subheading="Find and remove zero-width spaces and similar invisible characters from your text — free and instant."
        initialOptions={{
          removeHiddenCharacters: true,
          convertNonBreakingSpaces: true,
          normalizeUnicode: true,
        }}
      />
      <SubToolContent
        title="Zero-Width Space Remover"
        badgeLabel="Unicode Specification"
        badgeIcon="visibility"
        directAnswerTitle="What Is a Zero-Width Space?"
        directAnswerText="A zero-width space is a character that takes up no visible space on the screen but still counts as a real character in the text. The most common one has the code point U+200B. It shows up often in text copied from AI chat tools, PDFs, and some websites, usually left over from how the original text was rendered. You can't see it, but software can, and that causes real problems: a search for a word fails because there's an invisible character hiding inside it, a username or password gets rejected for no visible reason, or a JSON file fails to parse."
        beforeBadgeText="2 Flaws Detected"
        afterBadgeText="0 Artifacts"
        beforeExample={
          <p>
            Hello
            <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-bold mx-0.5">
              [U+200B ZWSP]
            </span>
            World! This text contains an invisible
            <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-bold mx-0.5">
              [U+200B ZWSP]
            </span>{" "}
            zero-width space.
          </p>
        }
        afterExample={
          <p>Hello World! This text contains an invisible zero-width space.</p>
        }
        beforeNote="Contains invisible Zero-Width Space (U+200B) causing regex and tokenization mismatch."
        afterNote="Canonical UTF-8 stream restored. Safe for indexing, relational databases, and copy-pasting."
        removedItems={removedItems}
        streamChart={false}
        activeSuiteToolHref="/visualize-invisible-characters"
        howToSteps={howToSteps}
        benchmarksTitle="Engine Latency Benchmark"
        benchmarks={benchmarks}
        valueProps={valueProps}
        faqs={faqs}
      />
    </div>
  );
}
