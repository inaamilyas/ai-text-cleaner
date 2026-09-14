import type { Metadata } from "next";
import ReadabilityCheckerUI from "@/components/ReadabilityCheckerUI";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Free Flesch-Kincaid Readability Test — Check Your Text's Grade Level",
  description:
    "Run a free Flesch-Kincaid readability test on your text. See grade level, reading ease, and average sentence length instantly in your browser.",
  keywords: [
    "flesch kincaid test",
    "readability score",
  ],
  alternates: {
    canonical: "/check-readability-score",
  },
  openGraph: {
    title: "Free Flesch-Kincaid Readability Test — Check Your Text's Grade Level",
    description:
      "See grade level, reading ease, and average sentence length instantly, entirely in your browser.",
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
    question: "What is a good Flesch-Kincaid score for a website?",
    answer:
      "Somewhere between grade 6 and grade 9 works for most general content. Aim lower if your audience includes non-native English readers.",
  },
  {
    question: "What is Flesch Reading Ease?",
    answer:
      "A 0–100 scale where higher numbers mean easier text. A score of 60–70 is considered plain English.",
  },
  {
    question: "Does sentence length matter more than word choice?",
    answer:
      "Both matter, but long sentences are usually the bigger problem. Breaking one 40-word sentence into two shorter ones often improves the score more than swapping a few words.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Flesch-Kincaid Readability Test",
  url: `${siteUrl}/check-readability-score`,
  description: "See grade level, reading ease, and average sentence length instantly.",
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
  name: "How to Check Readability & Flesch-Kincaid Grade Level",
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
  { name: "Readability calculation", time: "Instant" },
  { name: "Syllable counting", time: "Instant" },
  { name: "Grade level scoring", time: "Instant" },
];

export default function CheckReadabilityScorePage() {
  return (
    <div className="w-full flex flex-col">
      <span className="sr-only">
        Readability &amp; Flesch-Kincaid Grade Checker | Text Cleaner AI
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
      <ReadabilityCheckerUI
        heading="Flesch-Kincaid Readability Test"
        subheading="Paste your text and get its Flesch-Kincaid grade level and reading ease score right away."
      />
      <div className="container mx-auto px-4 md:px-8 pb-16">
        <SubToolContent
          title="Readability & Flesch-Kincaid Grade Checker"
          badgeLabel="Clarity Analyzer"
          badgeIcon="auto_stories"
          directAnswerTitle="What Do These Scores Actually Mean?"
          directAnswerText="Flesch-Kincaid Grade Level estimates the US school grade a reader would need to understand your text on a first read. Lower numbers mean simpler writing. Flesch Reading Ease is a 0–100 scale — higher numbers mean easier text, and a score in the 60s or 70s is considered easy for most adults to read. Most general web content reads best between grade 6 and grade 9, roughly the level of a national newspaper."
          beforeBadgeText="BEFORE (Raw Complex Draft)"
          afterBadgeText="AFTER (Optimized & Sanitized)"
          beforeExample={
            <div className="space-y-2 leading-relaxed">
              <div className="flex items-center justify-between text-code-stat font-code-stat text-error font-semibold">
                <span>COMPLEXITY SPIKE</span>
                <span>Grade 12.8 • Ease 38.2</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Artificial intelligence text generators create fluent paragraphs by analyzing{" "}
                <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                  probability
                </span>{" "}
                patterns. However,{" "}
                <span className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono">
                  vocabulary
                </span>{" "}
                and repetitive transitions reduce reading ease.
              </p>
            </div>
          }
          afterExample={
            <div className="space-y-2 leading-relaxed">
              <div className="flex items-center justify-between text-code-stat font-code-stat text-primary font-semibold">
                <span>CLEAR & ACCESSIBLE</span>
                <span>Grade 8.2 • Ease 65.4</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                AI text tools generate smooth paragraphs by studying likelihood patterns. Yet, simpler words and crisp transitions make the writing much clearer for everyone.
              </p>
            </div>
          }
          beforeNote="Complex Syllables: 7 • Audience: University level"
          afterNote="Flesch Ease: 65.4 (Plain English) • Complex Words: 2"
          streamChart={true}
          benchmarksTitle="Readability Compute Latency"
          benchmarks={benchmarks}
          removedItems={removedItems}
          howToSteps={howToSteps}
          faqs={faqs}
        />
      </div>
    </div>
  );
}
