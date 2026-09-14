import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Smart Quotes to Straight Quotes Converter — Normalize Typography Online",
  description:
    "Convert curly smart quotes (“ ” ‘ ’) to straight quotes (\" ') and em dashes (—) to standard hyphens. Prevent syntax errors in code & SQL.",
  keywords: [
    "smart quotes to straight quotes",
    "curly quotes to straight quotes",
    "convert em dash to hyphen",
    "normalize smart quotes online",
    "straight quote converter",
  ],
  alternates: {
    canonical: "/smart-quotes-to-straight-quotes",
    languages: {
      en: "/smart-quotes-to-straight-quotes",
      es: "/es/smart-quotes-to-straight-quotes",
      de: "/de/smart-quotes-to-straight-quotes",
      fr: "/fr/smart-quotes-to-straight-quotes",
      it: "/it/smart-quotes-to-straight-quotes",
      pt: "/pt/smart-quotes-to-straight-quotes",
      ar: "/ar/smart-quotes-to-straight-quotes",
      ja: "/ja/smart-quotes-to-straight-quotes",
      nl: "/nl/smart-quotes-to-straight-quotes",
      tr: "/tr/smart-quotes-to-straight-quotes",
      id: "/id/smart-quotes-to-straight-quotes",
    },
  },
  openGraph: {
    title: "Smart Quotes to Straight Quotes Converter — Normalize Typography Online",
    description:
      "Normalize curly quotes and em dashes to straight quotes and standard hyphens instantly.",
    url: `${siteUrl}/smart-quotes-to-straight-quotes`,
  },
};

const removedItems = [
  {
    character: "Curly Double Quotes",
    unicode: "U+201C / U+201D (“ ”)",
    description: 'Replaced with standard straight double quote (").',
  },
  {
    character: "Curly Single Quotes & Apostrophes",
    unicode: "U+2018 / U+2019 (‘ ’)",
    description: "Replaced with standard straight single quote (').",
  },
  {
    character: "Em Dash & En Dash",
    unicode: "U+2013 / U+2014 (– —)",
    description: "Replaced with standard ASCII hyphen (-).",
  },
];

const howToSteps = [
  {
    title: "Paste Typography Text",
    description:
      "Paste text with curly quotes, smart apostrophes, or em dashes into the raw input buffer.",
  },
  {
    title: "Normalize Quotes",
    description:
      "Our typography engine converts smart curly characters into standard ASCII quotes in under 2ms.",
  },
  {
    title: "Copy Code-Safe Output",
    description:
      "Copy code-safe plain text free from syntax-breaking curly characters directly into your compiler.",
  },
];

const benchmarks = [
  { name: "CHROME V8", time: "1.8ms" },
  { name: "SAFARI JSC", time: "2.1ms" },
  { name: "FIREFOX SM", time: "2.4ms" },
];

const valueProps = [
  {
    title: "100% In-Browser Privacy",
    desc: "Zero telemetry, zero uploads, zero storage. Your drafts never leave your device.",
    icon: "shield",
  },
  {
    title: "Instant Processing",
    desc: "Sub-millisecond typography normalizations designed for high-throughput workflows.",
    icon: "bolt",
  },
  {
    title: "Advanced Heuristic Detection",
    desc: "Detect subtle AI phrasing fingerprints without false-flagging human syntax.",
    icon: "psychology_alt",
  },
  {
    title: "Multi-Language Static Support",
    desc: "Guillemets (« »), German low quotes („ “), and Japanese brackets handled seamlessly.",
    icon: "translate",
  },
  {
    title: "Visual Highlight Breakdown",
    desc: "Inspect altered characters with color-coded diff overlays and unicode points.",
    icon: "highlight",
  },
  {
    title: "Zero Account Required",
    desc: "No subscriptions, logins, or API tokens. Open the workspace and clean immediately.",
    icon: "no_accounts",
  },
];

const faqs = [
  {
    question: "Why do smart quotes cause programming errors?",
    answer:
      'Compilers, SQL query engines, and JSON parsers only recognize ASCII straight quotes (" and \'). Curly smart quotes generate syntax error exceptions because they are distinct unicode symbols.',
  },
  {
    question: "Will this fix em dashes and ellipsis?",
    answer:
      "Yes! When option toggles are enabled, long em dashes (—) are converted into standard hyphens (-) and ellipsis symbols (...) into three dots.",
  },
  {
    question: "How do curly smart quotes get into code snippets?",
    answer:
      "Word processors (like Microsoft Word or Apple Pages) and web chat interfaces automatically convert typed straight quotes into curly typographical 'smart quotes'.",
  },
  {
    question: "What is the ASCII hex code for straight double quotes?",
    answer:
      "ASCII straight double quote is U+0022 (\"), whereas smart left double quote is U+201C and smart right double quote is U+201D.",
  },
  {
    question: "Can I convert smart quotes in SQL or JSON files?",
    answer:
      "Yes! Use our 'Code & JSON Safe' quick preset to normalize all smart quotes and dashes instantly.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Smart Quotes Converter",
  url: `${siteUrl}/smart-quotes-to-straight-quotes`,
  description:
    "Free online utility to convert smart curly quotes and em dashes to standard ASCII straight quotes.",
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
  name: "How to Convert Smart Quotes to Straight Quotes",
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

export default function SmartQuotesToStraightQuotesPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">
        Smart Quotes to Straight Quotes Converter — Normalize Typography Online | AI Text Cleaner
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
        heading="Smart Quotes to Straight Quotes Converter"
        subheading={"Instantly convert curly smart quotes (“ ” ‘ ’), apostrophes, and em dashes into code-safe ASCII straight quotes (\" and ')."}
        initialOptions={{
          normalizeQuotes: true,
          normalizeDashes: true,
          convertEllipsis: true,
        }}
      />
      <SubToolContent
        title="Smart Quotes to Straight Quotes Converter"
        badgeLabel="Diff Inspection"
        badgeIcon="difference"
        directAnswerTitle="How to Convert Smart Curly Quotes to Straight Quotes?"
        directAnswerText={"Smart quotes (curly quotes like “ ” and ‘ ’) look nice in print but cause fatal syntax errors in code, SQL queries, and web forms. Our tool converts smart quotes into code-safe straight quotes (\" and ') and converts em dashes (—) into standard hyphens instantly."}
        beforeBadgeText="3 Flaws Detected"
        afterBadgeText="0 Artifacts / Code-Safe"
        beforeExample={
          <div className="space-y-2">
            <p className="text-on-surface leading-relaxed font-body-md text-body-md">
              <span
                className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold"
                title="Smart Left Quote"
              >
                “
              </span>
              Hello World,
              <span
                className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold"
                title="Smart Right Quote"
              >
                ”
              </span>{" "}
              said John
              <span
                className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold"
                title="Smart Apostrophe"
              >
                ’
              </span>
              s bot{" "}
              <span
                className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold"
                title="Em Dash"
              >
                —
              </span>{" "}
              it works
              <span
                className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold"
                title="Ellipsis Symbol"
              >
                …
              </span>
              .
            </p>
            <div className="flex flex-wrap gap-space-xs font-code-stat text-[11px] pt-1">
              <span className="px-1.5 py-0.5 rounded bg-surface-container text-outline">
                [“ ”] Curly Double
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container text-outline">
                [’] Smart Apostrophe
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container text-outline">
                [—] Em Dash
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container text-outline">
                […] Ellipsis
              </span>
            </div>
          </div>
        }
        afterExample={
          <div className="space-y-2">
            <p className="text-on-surface leading-relaxed font-body-md text-body-md">
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-1 py-0.5 rounded font-mono font-semibold">
                &quot;
              </span>
              Hello World,
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-1 py-0.5 rounded font-mono font-semibold">
                &quot;
              </span>{" "}
              said John
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-1 py-0.5 rounded font-mono font-semibold">
                &#39;
              </span>
              s bot{" "}
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-1 py-0.5 rounded font-mono font-semibold">
                -
              </span>{" "}
              it works
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-1 py-0.5 rounded font-mono font-semibold">
                ...
              </span>
            </p>
            <p className="font-code-stat text-[11px] text-secondary pt-1">
              Canonical ASCII stream restored. Safe for SQL, JSON parsers, compilers, and copy-pasting.
            </p>
          </div>
        }
        beforeNote="Contains smart typographical glyphs that crash compilers and JSON parsers"
        afterNote="Canonical ASCII stream restored. Safe for SQL, JSON parsers, compilers, and copy-pasting."
        removedItems={removedItems}
        streamChart={false}
        activeSuiteToolHref="/case-converter"
        howToSteps={howToSteps}
        benchmarksTitle="Browser Latency Benchmarks (10k chars)"
        benchmarks={benchmarks}
        valueProps={valueProps}
        faqs={faqs}
      />
    </div>
  );
}
