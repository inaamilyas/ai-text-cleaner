import type { Metadata } from "next";
import InvisibleVisualizer from "@/components/InvisibleVisualizer";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Visualize Invisible Characters Online — Zero-Width Space & Unicode Inspector",
  description:
    "Detect and visualize hidden zero-width spaces (U+200B), soft hyphens (U+00AD), non-breaking spaces (U+00A0), and directional marks with color-coded badges.",
  keywords: [
    "visualize invisible characters",
    "zero width space visualizer",
    "inspect unicode control characters",
    "hidden character highlighter",
    "show invisible text",
  ],
  alternates: {
    canonical: "/visualize-invisible-characters",
  },
  openGraph: {
    title: "Visualize Invisible Characters Online — Zero-Width Space Inspector",
    description:
      "Inspect and highlight hidden zero-width spaces and non-printable unicode control marks in real-time.",
    url: `${siteUrl}/visualize-invisible-characters`,
  },
};

const removedItems = [
  {
    character: "Zero-Width Space (ZWSP)",
    unicode: "U+200B",
    description: "Invisible space character used in AI text signatures and hidden tracking watermarks.",
  },
  {
    character: "Soft Hyphen (SHY)",
    unicode: "U+00AD",
    description: "Invisible line-breaking control mark that causes search engine indexing errors.",
  },
  {
    character: "Non-Breaking Space (NBSP)",
    unicode: "U+00A0",
    description: "Fixed space character that prevents line wrapping and causes layout misalignment.",
  },
  {
    character: "Byte Order Mark (BOM)",
    unicode: "U+FEFF",
    description: "Invisible character at document headers causing JSON parse and script syntax errors.",
  },
];

const howToSteps = [
  {
    title: "Paste Raw Text",
    description: "Paste text copied from PDFs, websites, or LLM AI chats into the input textarea.",
  },
  {
    title: "Inspect Visual Badges",
    description: "Look at the dark visualizer window to see color-coded badges highlighting every hidden control code.",
  },
  {
    title: "Strip & Copy Clean Text",
    description: "Click 'Strip All & Copy Clean Text' to get pristine plain text with zero invisible characters remaining.",
  },
];

const faqs = [
  {
    question: "What are invisible characters?",
    answer:
      "Invisible characters are non-printable Unicode code points (like U+200B or U+00AD) that do not take up visual horizontal space, but exist in string memory.",
  },
  {
    question: "Why do AI text generators insert zero-width spaces?",
    answer:
      "AI models and formatting engines use zero-width spaces or non-breaking spaces as hidden layout markers or subtle digital watermarks.",
  },
  {
    question: "Will visualizing characters modify my text?",
    answer:
      "No. Visualization highlights characters with visual badges in the output pane without altering your input text until you click clean.",
  },
  {
    question: "Is this tool free and private?",
    answer:
      "Yes! 100% free and client-side. Character scanning runs strictly inside your local browser memory.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Invisible Character Visualizer",
  url: `${siteUrl}/visualize-invisible-characters`,
  description: "Detect and visualize zero-width spaces, soft hyphens, and hidden unicode control marks.",
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

export default function VisualizeInvisibleCharactersPage() {
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
      <InvisibleVisualizer
        heading="Zero-Width & Invisible Character Visualizer"
        subheading="Highlight hidden zero-width spaces (U+200B), NBSPs (U+00A0), soft hyphens (U+00AD), and BOM markers with color-coded visual badges."
      />
      <SubToolContent
        title="Zero-Width & Invisible Character Visualizer"
        directAnswerTitle="How to Find & Visualize Hidden Unicode Characters"
        directAnswerText="Our Invisible Character Visualizer scans raw text strings character-by-character and renders color-coded badges for non-printable control marks (U+200B zero-width space, U+00AD soft hyphen, U+00A0 non-breaking space, U+FEFF BOM). This lets you visually identify hidden artifacts before they break code or search rankings."
        beforeExample={"Text\u200B containing\u00AD hidden\u200E zero-width characters."}
        afterExample="[U+200B ZWSP] Text [U+00AD SHY] containing [U+200E LTR] hidden zero-width characters."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
