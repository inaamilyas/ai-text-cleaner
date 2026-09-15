import type { Metadata } from "next";
import CaseConverterUI from "@/components/CaseConverterUI";
import SubToolContent from "@/components/SubToolContent";
import { generateSubToolMetadata } from "@/components/LocalizedSubToolLayout";
import { LANGUAGES } from "@/lib/i18n/dictionaries";

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== "en")
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSubToolMetadata(lang, "caseConverter", "case-converter");
}

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

export default async function LocalizedCaseConverterPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === "rtl";
  const tool = l.subtools?.caseConverter || LANGUAGES.en.subtools.caseConverter!;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
      <CaseConverterUI
        heading={tool.heading}
        subheading={tool.subheading}
      />
      <SubToolContent
        title={tool.heading}
        directAnswerTitle={tool.heading}
        directAnswerText={tool.subheading}
        beforeExample="the quick brown fox jumps over the lazy dog"
        afterExample="Title Case: The Quick Brown Fox | camelCase: theQuickBrownFox | snake_case: the_quick_brown_fox"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
