import type { Metadata } from "next";
import ReadabilityCheckerUI from "@/components/ReadabilityCheckerUI";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Readability & Flesch-Kincaid Grade Checker — Free Online Text Analyzer",
  description:
    "Calculate Flesch Reading Ease score, Flesch-Kincaid Grade Level, Gunning Fog Index, and Coleman-Liau index in real-time. Free online readability checker.",
  keywords: [
    "flesch kincaid readability checker",
    "flesch reading ease calculator",
    "check text grade level online",
    "gunning fog index tool",
    "article readability score analyzer",
  ],
  alternates: {
    canonical: "/check-readability-score",
  },
  openGraph: {
    title: "Readability & Flesch-Kincaid Grade Checker Online",
    description:
      "Analyze article readability scores, US grade levels, and 3+ syllable complex words instantly.",
    url: `${siteUrl}/check-readability-score`,
  },
};

const removedItems = [
  {
    character: "Flesch Reading Ease (0–100)",
    unicode: "Score: 60-70",
    description: "Measures sentence length and syllable count. Higher scores mean easier reading (60-70 is ideal for web).",
  },
  {
    character: "Flesch-Kincaid Grade Level",
    unicode: "Grade 8",
    description: "Calculates the US school grade required to easily understand the text.",
  },
  {
    character: "Gunning Fog Index",
    unicode: "Fog Score",
    description: "Estimates formal education years needed to comprehend complex academic prose.",
  },
  {
    character: "Complex Words Count",
    unicode: "3+ Syllables",
    description: "Highlights long vocabulary words that reduce reader engagement.",
  },
];

const howToSteps = [
  {
    title: "Paste Document or Essay Text",
    description: "Paste your draft, article, or blog post into the text area.",
  },
  {
    title: "Instant Score Calculation",
    description: "Our algorithm evaluates word count, sentence length, and syllable counts live.",
  },
  {
    title: "Optimize Complexity",
    description: "Review highlighted 3+ syllable complex words to simplify your writing for higher engagement.",
  },
];

const faqs = [
  {
    question: "What is a good Flesch Reading Ease score for web articles?",
    answer:
      "A Flesch Reading Ease score between 60.0 and 70.0 (Grade 8 level) is recommended for general web audiences and blog content.",
  },
  {
    question: "How is the Flesch-Kincaid Grade Level calculated?",
    answer:
      "It combines average sentence length (words divided by sentences) and average syllables per word to compute a standard US school grade.",
  },
  {
    question: "Why should I simplify complex words?",
    answer:
      "Replacing 3+ syllable jargon words with simpler alternatives increases reader retention, lowers bounce rates, and improves SEO performance.",
  },
  {
    question: "Is my document stored during analysis?",
    answer:
      "No. Readability analysis is computed 100% in-browser. Zero text is uploaded or stored.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Readability & Flesch-Kincaid Grade Checker",
  url: `${siteUrl}/check-readability-score`,
  description: "Free online utility to calculate Flesch Reading Ease, Grade Level, and Gunning Fog Index.",
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

export default function CheckReadabilityScorePage() {
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
      <ReadabilityCheckerUI
        heading="Readability & Flesch-Kincaid Grade Checker"
        subheading="Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and highlight complex 3+ syllable words in real-time."
      />
      <SubToolContent
        title="Readability & Flesch-Kincaid Grade Checker"
        directAnswerTitle="How Readability Scores Improve Content Ranking & Conversions"
        directAnswerText="Readability metrics quantify how accessible your writing is to readers. The Flesch Reading Ease test rates text on a 0-100 scale, while the Flesch-Kincaid Grade Level indicates the US grade level required for comprehension. Lowering grade levels to Grade 7-8 significantly increases time-on-page and organic search rankings."
        beforeExample="Artificial intelligence text generators create fluent paragraphs by analyzing probability patterns. However, complex vocabulary and repetitive transitions can reduce reading ease."
        afterExample="Flesch Ease: 65.4 (Plain English) | Grade Level: 8.2 | Complex Words: 2"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
