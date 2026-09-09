import type { Metadata } from "next";
import ReadabilityCheckerUI from "@/components/ReadabilityCheckerUI";
import SubToolContent from "@/components/SubToolContent";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata(): Metadata {
  return {
    title: "Readability & Flesch-Kincaid Grade Checker — Free Online Text Analyzer",
    description:
      "Calculate Flesch Reading Ease score, Flesch-Kincaid Grade Level, Gunning Fog Index, and Coleman-Liau index in real-time. Free online readability checker.",
  };
}

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

export default async function LocalizedCheckReadabilityScorePage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <>
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
