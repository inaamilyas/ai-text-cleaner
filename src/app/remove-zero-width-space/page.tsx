import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://aitextcleaner.com";

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
    description: "Invisible space added by AI models and rich text editors that causes regex crashes and code errors.",
  },
  {
    character: "Zero-Width Non-Joiner (ZWNJ)",
    unicode: "U+200C",
    description: "Used in script typesetting, often accidentally pasted into plain text input fields.",
  },
  {
    character: "Zero-Width Joiner (ZWJ)",
    unicode: "U+200D",
    description: "Used for combining emojis or characters, breaks character counts and string operations.",
  },
  {
    character: "Byte Order Mark (BOM)",
    unicode: "U+FEFF",
    description: "Unicode character inserted at the start of text streams that breaks web compilers and JSON parsers.",
  },
];

const howToSteps = [
  {
    title: "Paste Your Text",
    description: "Copy text containing suspected zero-width spaces or code errors and paste it into the editor above.",
  },
  {
    title: "Instant Detection",
    description: "The zero-width space remover automatically identifies hidden U+200B and unicode control marks.",
  },
  {
    title: "Copy Clean Output",
    description: "Click Clean Text and copy sanitized plain text free from invisible characters.",
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
    <>
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
        directAnswerTitle="What is a Zero-Width Space & How to Remove It?"
        directAnswerText="A zero-width space (ZWSP, Unicode U+200B) is an invisible character that occupies no visual space on screen. AI tools like ChatGPT and rich text editors frequently introduce ZWSPs, causing code crashes, broken searches, and formatting glitches. Our tool strips them instantly in your browser."
        beforeExample={"Hello\u200BWorld! This text contains an invisible\u200B zero-width space."}
        afterExample="Hello World! This text contains an invisible zero-width space."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
