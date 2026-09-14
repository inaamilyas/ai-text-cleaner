import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Smart Quotes to Straight Quotes Converter",
  description:
    "Convert curly smart quotes and em dashes into plain straight quotes and hyphens. Useful for code and forms that reject curly punctuation. Free.",
  keywords: [
    "smart quotes to straight quotes",
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
      "Paste text with curly quotes, smart apostrophes, or em dashes into the input box.",
  },
  {
    title: "Normalize Quotes",
    description:
      "The converter changes smart curly characters into standard ASCII quotes.",
  },
  {
    title: "Copy Code-Safe Output",
    description:
      "Copy plain text free from syntax-breaking curly characters directly into your compiler.",
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
    desc: "Your drafts never leave your device.",
    icon: "shield",
  },
  {
    title: "Instant Processing",
    desc: "No practical length limit for browser-based cleaning.",
    icon: "bolt",
  },
  {
    title: "Handles Extended Typography",
    desc: "Also normalizes em dashes, en dashes, and the ellipsis character.",
    icon: "translate",
  },
  {
    title: "Zero Account Required",
    desc: "No subscriptions, logins, or API tokens. Open the page and convert immediately.",
    icon: "no_accounts",
  },
];

const faqs = [
  {
    question: "Why do my quotes look different after pasting from Word or an AI chat tool?",
    answer:
      "Both tend to auto-convert straight quotes into curly ones as you type. That's fine for reading, but it isn't standard ASCII text, which some systems require.",
  },
  {
    question: "Does this affect the meaning of my text?",
    answer: "No, only the punctuation style.",
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
        Smart Quotes to Straight Quotes Converter — Normalize Typography Online | Text Cleaner AI
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
        heading="Convert Smart Quotes to Straight Quotes"
        subheading={"Convert curly smart quotes and em dashes into plain straight quotes and hyphens — free."}
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
