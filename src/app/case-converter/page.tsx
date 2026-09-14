import type { Metadata } from "next";
import CaseConverterUI from "@/components/CaseConverterUI";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Free Text Case Converter — Title Case, camelCase, snake_case & More",
  description:
    "Convert text between Title Case, camelCase, snake_case, kebab-case, and more. Free, instant, works in your browser.",
  keywords: [
    "case converter",
    "camelcase converter",
  ],
  alternates: {
    canonical: "/case-converter",
  },
  openGraph: {
    title: "Free Text Case Converter — Title Case, camelCase, snake_case & More",
    description:
      "Convert text between every common case style at once, entirely in your browser.",
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
      "Capitalizing the main words in a heading or title, while leaving small connecting words (like \"a,\" \"the,\" \"of\") lowercase unless they start the sentence.",
  },
  {
    question: "What's the difference between camelCase and PascalCase?",
    answer:
      "camelCase starts with a lowercase letter (firstName). PascalCase starts with a capital letter (FirstName). Both are otherwise the same pattern.",
  },
  {
    question: "What is a URL slug?",
    answer:
      "The part of a web address after the domain that identifies a specific page, usually written in lowercase with hyphens between words — for example, /case-converter.",
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
        heading="Text Case Converter"
        subheading="Paste in a phrase and get it converted into every common case style at once — free and instant."
      />
      <SubToolContent
        title="Text Case Converter"
        directAnswerTitle="Every Common Case Style, At Once"
        directAnswerText="Paste in a phrase and get it converted into every common case style at once: Title Case for headings, camelCase and snake_case for code, kebab-case for URLs, and a few others."
        beforeExample="the quick brown fox jumps over the lazy dog"
        afterExample="Title Case: The Quick Brown Fox | camelCase: theQuickBrownFox | snake_case: the_quick_brown_fox"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
