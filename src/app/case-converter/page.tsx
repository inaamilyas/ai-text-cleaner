import type { Metadata } from "next";
import CaseConverterUI from "@/components/CaseConverterUI";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Text Case Converter Online — Title Case, camelCase, snake_case & Slugify",
  description:
    "Convert text between Title Case, UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, and clean URL slugs instantly in your browser.",
  keywords: [
    "text case converter",
    "title case generator",
    "convert camelcase to snake case",
    "slugify online tool",
    "uppercase lowercase converter",
  ],
  alternates: {
    canonical: "/case-converter",
  },
  openGraph: {
    title: "Text Case Converter Online — Title Case & Developer Formats",
    description:
      "Transform text between Title Case, camelCase, snake_case, kebab-case, and URL slugs instantly.",
    url: `${siteUrl}/case-converter`,
  },
};

const removedItems = [
  {
    character: "Title Case",
    unicode: "The Quick Brown Fox",
    description: "Capitalizes the first letter of major words for titles, blog posts, and headings.",
  },
  {
    character: "camelCase",
    unicode: "theQuickBrownFox",
    description: "Standard variable naming format for JavaScript, TypeScript, and Java developers.",
  },
  {
    character: "snake_case",
    unicode: "the_quick_brown_fox",
    description: "Lowercased words separated by underscores for Python variables and database columns.",
  },
  {
    character: "kebab-case & URL Slug",
    unicode: "the-quick-brown-fox",
    description: "Hyphen-separated lowercase string ideal for clean, SEO-friendly web page URLs.",
  },
];

const howToSteps = [
  {
    title: "Paste Raw Text",
    description: "Paste string, code snippet, or article headline into the input box.",
  },
  {
    title: "Instant Case Conversion",
    description: "Our engine computes Title Case, camelCase, snake_case, kebab-case, and ASCII normalized outputs live.",
  },
  {
    title: "Copy Desired Format",
    description: "Click 'Copy' next to any converted format box to copy to your clipboard.",
  },
];

const faqs = [
  {
    question: "What is Title Case?",
    answer:
      "Title Case capitalizes the principal words in a title (nouns, verbs, adjectives), while leaving short conjunctions and prepositions in lowercase.",
  },
  {
    question: "What is the difference between camelCase and PascalCase?",
    answer:
      "In camelCase, the very first letter is lowercase (e.g. userFirstName). In PascalCase, the first letter is capitalized (e.g. UserFirstName).",
  },
  {
    question: "What is a URL Slug?",
    answer:
      "A URL Slug converts text into a clean, lowercase hyphen-separated string with accents and special characters removed (e.g. /my-new-post).",
  },
  {
    question: "Is this case converter browser-based?",
    answer:
      "Yes. All string manipulation takes place locally inside your browser with zero latency or cloud API dependencies.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text Case Converter & Normalizer",
  url: `${siteUrl}/case-converter`,
  description: "Free online utility to convert text between Title Case, camelCase, snake_case, and URL slugs.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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

export default function CaseConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CaseConverterUI
        heading="Text Case Converter & ASCII Normalizer"
        subheading="Convert text between Title Case, camelCase, snake_case, UPPERCASE, lowercase, URL Slugs, and strip non-ASCII diacritics instantly in your browser."
      />
      <SubToolContent
        title="Text Case Converter & ASCII Normalizer"
        directAnswerTitle="Online Text Case Converter for Writers & Developers"
        directAnswerText="Our Text Case Converter enables instant transformation between 11 standard text capitalization and code identifier styles: Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE, PascalCase, Sentence case, and URL Slugs. It also strips non-ASCII accents and diacritics."
        beforeExample="the quick brown fox jumps over the lazy dog"
        afterExample="Title Case: The Quick Brown Fox | camelCase: theQuickBrownFox | snake_case: the_quick_brown_fox"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
