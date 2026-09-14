import type { Metadata } from "next";
import InvisibleVisualizer from "@/components/InvisibleVisualizer";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Invisible Character Visualizer — See Hidden Unicode in Your Text",
  description:
    "See exactly where invisible characters are hiding in your text, highlighted and labeled. Free, useful for debugging text problems.",
  keywords: [
    "invisible character visualizer",
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
  {
    character: "Unicode Tag Characters",
    unicode: "U+E0000-U+E007F",
    description: "The mechanism behind \"ASCII smuggling\" — invisible characters used to hide instructions inside text that look blank to a human reader.",
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
    question: "How is this different from the invisible character remover?",
    answer:
      "This tool only shows you what's there — it doesn't change your text. Use the remove invisible characters tool once you're ready to clean it up.",
  },
  {
    question: "Does it work on very long documents?",
    answer:
      "Yes, though for very large files you may notice a short delay while it scans and highlights everything.",
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
        heading="Visualize Invisible Characters in Text"
        subheading="See exactly where invisible characters are hiding in your text, highlighted and labeled — free."
      />
      <SubToolContent
        title="Invisible Character Visualizer"
        directAnswerTitle="See Hidden Characters Before You Remove Them"
        directAnswerText="Sometimes you don't want to remove invisible characters yet — you want to see where they are first, especially if you're debugging a text-processing bug or trying to understand why a file won't parse. Paste your text in and this tool highlights every invisible or unusual character in place, labelled with its name and Unicode code point (like U+200B for a zero-width space), so you can see exactly what's there before deciding what to do about it."
        beforeExample={"Text\u200B containing\u00AD hidden\u200E zero-width characters."}
        afterExample="[U+200B ZWSP] Text [U+00AD SHY] containing [U+200E LTR] hidden zero-width characters."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
