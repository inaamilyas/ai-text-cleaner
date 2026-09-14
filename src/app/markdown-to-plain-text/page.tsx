import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Markdown to Plain Text Converter — Remove Markdown Formatting",
  description:
    "Convert Markdown into clean plain text. Remove asterisks, hashes, and backticks left over from AI tools or note-taking apps. Free.",
  keywords: [
    "markdown to plain text",
  ],
  alternates: {
    canonical: "/markdown-to-plain-text",
    languages: {
      en: "/markdown-to-plain-text",
      es: "/es/markdown-to-plain-text",
      de: "/de/markdown-to-plain-text",
      fr: "/fr/markdown-to-plain-text",
      it: "/it/markdown-to-plain-text",
      pt: "/pt/markdown-to-plain-text",
      ar: "/ar/markdown-to-plain-text",
      ja: "/ja/markdown-to-plain-text",
      nl: "/nl/markdown-to-plain-text",
      tr: "/tr/markdown-to-plain-text",
      id: "/id/markdown-to-plain-text",
    },
  },
  openGraph: {
    title: "AI Markdown to Plain Text Converter — Strip Formatting Online",
    description:
      "Convert Markdown formatted AI responses into clean plain text with one click.",
    url: `${siteUrl}/markdown-to-plain-text`,
  },
};

const removedItems = [
  {
    character: "Bold & Italic Syntax",
    unicode: "** / * / __ / _",
    description: "Strips double and single asterisks or underscores used for emphasis in Markdown.",
  },
  {
    character: "Heading Symbols",
    unicode: "# / ## / ###",
    description: "Removes leading hashtag header symbols while keeping header title text intact.",
  },
  {
    character: "Inline Code Backticks",
    unicode: "`code`",
    description: "Removes surrounding backtick characters from code snippets and terms.",
  },
];

const howToSteps = [
  {
    title: "Paste Markdown Text",
    description: "Paste your Markdown formatted document or AI text into the input field.",
  },
  {
    title: "Strip Markdown",
    description: "The converter parses Markdown structures and removes syntax tags while preserving words.",
  },
  {
    title: "Copy Plain Text",
    description: "Copy unformatted plain text ready for email, Google Docs, or CMS platforms.",
  },
];

const faqs = [
  {
    question: "Why does my AI-generated text have asterisks and hash symbols in it?",
    answer:
      "AI chat tools write in Markdown by default. If you paste that text somewhere that doesn't render Markdown, you see the raw symbols instead of bold text or headings.",
  },
  {
    question: "Will this remove the actual list structure, or just the symbols?",
    answer:
      "It removes the Markdown symbols but keeps line breaks, so your list still reads as a list — just without the dashes or numbers.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Markdown to Plain Text Converter",
  url: `${siteUrl}/markdown-to-plain-text`,
  description: "Free online tool to strip Markdown formatting tags and convert AI output into plain text.",
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
  name: "How to Convert Markdown to Plain Text",
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

export default function MarkdownToPlainTextPage() {
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
        heading="Convert Markdown to Plain Text"
        subheading="Remove asterisks, hashes, and backticks left over from AI tools or note-taking apps — free."
        initialOptions={{
          removeMarkdown: true,
          removeTrailingWhitespace: true,
        }}
      />
      <SubToolContent
        title="Markdown to Plain Text Converter"
        directAnswerTitle="Why Markdown Symbols End Up in Your Text"
        directAnswerText="Markdown is a plain-text way of marking up formatting — **bold**, # Heading, `code`, - list item. It's common in AI chat tools, note-taking apps, and developer docs. The problem is that most places you'd paste that text — email, a CMS text box, a text message — don't read Markdown, so you end up with the raw symbols instead of actual formatting. This tool converts Markdown into clean, readable plain text: headings become plain lines, bold and italic markers are removed, and list symbols are replaced with something readable."
        beforeExample="# Title Header\n**Bold text** with `inline code` and [links](https://example.com)."
        afterExample="Title Header\nBold text with inline code and links."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
