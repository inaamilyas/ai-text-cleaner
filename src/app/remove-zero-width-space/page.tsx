import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Zero-Width Space Remover — Clean Hidden U+200B Characters Online",
  description:
    "Free tool to detect and remove zero-width spaces (U+200B), non-breaking spaces, and hidden unicode control characters from AI text and code. 100% private & client-side.",
  keywords: [
    "zero width space remover",
    "remove U+200B",
    "invisible character remover",
    "clean hidden unicode characters",
    "zero width space checker",
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
  { name: "Chrome 122+", time: "1.8ms" },
  { name: "Safari 17.4+", time: "2.1ms" },
  { name: "Firefox 123+", time: "2.4ms" },
];

const valueProps = [
  {
    title: "100% In-Browser Privacy",
    desc: "Text strings and clipboard transfers are calculated entirely in browser JS execution threads. Never sent to an external API.",
    icon: "verified_user",
  },
  {
    title: "Instant Processing",
    desc: "Sub-millisecond sanitization handles 50,000+ words with zero lag, providing immediate diff updates.",
    icon: "bolt",
  },
  {
    title: "Advanced Heuristic Detection",
    desc: "Combines regex Unicode blocks with token entropy models to detect subtle LLM formatting signatures.",
    icon: "psychology",
  },
  {
    title: "Multi-Language Static Support",
    desc: "Full Unicode 15 support preserves valid accent ligatures and diacritics across global alphabets.",
    icon: "translate",
  },
  {
    title: "Visual Highlight Breakdown",
    desc: "Detailed preview identifies each exact codepoint location before stripping to avoid unintended layout destruction.",
    icon: "layers",
  },
  {
    title: "Zero Account Required",
    desc: "Free, open precision tooling for developers, researchers, and editors without registration or paywalls.",
    icon: "no_accounts",
  },
];

const faqs = [
  {
    question: "What is a Zero-Width Space (U+200B)?",
    answer:
      "A zero-width space is an invisible character used in digital typesetting to indicate word boundaries without introducing a visible gap. Large Language Models like ChatGPT frequently include them in output text.",
  },
  {
    question: "Why do zero-width spaces break code and databases?",
    answer:
      "Because zero-width spaces are non-printable, developers cannot see them. However, compilers, database queries, and regex engine treat them as actual characters, causing syntax errors or string mismatch bugs.",
  },
  {
    question: "Is my text uploaded to a server when cleaning?",
    answer:
      "No. AI Text Cleaner processes all text entirely within your local browser JavaScript engine. No data is transmitted to external servers.",
  },
  {
    question: "How can I detect if text contains U+200B zero-width spaces?",
    answer:
      "Paste your text into the editor above and click 'Clean Text'. Our character inspector automatically highlights U+200B occurrences and displays exact counts.",
  },
  {
    question: "Does this tool also strip Byte Order Marks (U+FEFF)?",
    answer:
      "Yes! It strips Byte Order Marks (BOM), soft hyphens (U+00AD), and all C0/C1 invisible control codes.",
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
        Zero-Width Space Remover — Clean Hidden U+200B Characters Online | AI Text Cleaner
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
        heading="Zero-Width Space Remover"
        subheading="Instantly detect and strip hidden zero-width spaces (U+200B), non-breaking spaces, and invisible unicode control marks from text."
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
        directAnswerTitle="What is a Zero-Width Space & How to Remove It?"
        directAnswerText="A zero-width space (ZWSP, Unicode U+200B) is an invisible character that occupies no visual space on screen. AI tools like ChatGPT and rich text editors frequently introduce ZWSPs, causing code crashes, broken searches, and formatting glitches. Our tool strips them instantly in your browser."
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
