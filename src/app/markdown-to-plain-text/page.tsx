import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://aitextcleaner.com";

export const metadata: Metadata = {
  title: "AI Markdown to Plain Text Converter — Strip Formatting Online",
  description:
    "Convert AI-generated Markdown into clean plain text. Remove asterisks, hashtags, backticks, strikethroughs, and links instantly.",
  keywords: [
    "convert markdown to plain text",
    "strip markdown online",
    "remove markdown asterisks",
    "markdown stripper",
    "clean markdown text",
  ],
  alternates: {
    canonical: "/markdown-to-plain-text",
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
    question: "Why convert Markdown to plain text?",
    answer:
      "Many writing tools and web apps do not support Markdown syntax. Converting to plain text prevents raw symbols like **bold** and # Headers from appearing in final documents.",
  },
  {
    question: "Does this remove my actual content?",
    answer:
      "No! Only the Markdown syntax characters (asterisks, hashtags, brackets, backticks) are stripped. Your textual content remains 100% intact.",
  },
  {
    question: "How does it handle Markdown hyperlinks like [Title](url)?",
    answer:
      "The converter extracts the anchor text link title while stripping the brackets and underlying URL.",
  },
  {
    question: "Does it strip Markdown blockquotes (> Quote)?",
    answer:
      "Yes! Surrounding > angle brackets are stripped, leaving plain text quotes.",
  },
  {
    question: "Can I convert Markdown tables to plain text?",
    answer:
      "Yes. Table pipes (|) and dashes (-) are stripped to extract raw plain text column values.",
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
        heading="Markdown to Plain Text Converter"
        subheading="Strip Markdown syntax tags, bold asterisks, headers, backticks, and formatting symbols from AI-generated text."
        initialOptions={{
          removeMarkdown: true,
          removeTrailingWhitespace: true,
        }}
      />
      <SubToolContent
        title="Markdown to Plain Text Converter"
        directAnswerTitle="How to Strip Markdown Syntax Online?"
        directAnswerText="Markdown uses special symbols like asterisks (**bold**), hashtags (# Title), and backticks (`code`) to format text. Our converter strips raw Markdown syntax instantly, producing clean plain text ideal for email clients, word processors, and publishing platforms."
        beforeExample="# Title Header\n**Bold text** with `inline code` and [links](https://example.com)."
        afterExample="Title Header\nBold text with inline code and links."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
