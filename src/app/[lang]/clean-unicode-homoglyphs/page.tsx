import type { Metadata } from "next";
import HomoglyphSanitizer from "@/components/HomoglyphSanitizer";
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
  return generateSubToolMetadata(lang, "cleanUnicodeHomoglyphs", "clean-unicode-homoglyphs");
}

const removedItems = [
  {
    character: "Cyrillic Small Letter a",
    unicode: "U+0430 ('а')",
    description: "Looks identical to Latin 'a' (U+0061) but breaks keyword searches and tricks AI detectors.",
  },
  {
    character: "Cyrillic Small Letter e",
    unicode: "U+0435 ('е')",
    description: "Confusable character replacing Latin 'e' (U+0065) causing secret character watermarks.",
  },
  {
    character: "Cyrillic Small Letter o",
    unicode: "U+043E ('о')",
    description: "Cyrillic look-alike for Latin 'o' (U+006F) used in homoglyph domain phishing attacks.",
  },
  {
    character: "Full-Width Latin Letters",
    unicode: "U+FF01-U+FF5E",
    description: "Wide unicode symbols replacing standard ASCII characters that break database constraints.",
  },
];

const howToSteps = [
  {
    title: "Paste Text with Confusables",
    description: "Paste text suspected of containing fake Cyrillic, Greek, or full-width look-alike letters.",
  },
  {
    title: "Detect & Replace",
    description: "Our engine maps non-standard homoglyph code points directly back to clean Latin ASCII equivalents.",
  },
  {
    title: "Copy Clean ASCII",
    description: "Copy sanitized plain ASCII text with 100% standard Latin letters.",
  },
];

const faqs = [
  {
    question: "What is a homoglyph character?",
    answer:
      "A homoglyph (or confusable) is a character from another alphabet (like Cyrillic 'а' U+0430) that looks visually identical to a Latin letter ('a' U+0061), but has a completely different digital code point.",
  },
  {
    question: "Why are homoglyphs used in text?",
    answer:
      "Homoglyphs are used to bypass keyword filters, evade AI plagiarism detectors, or create look-alike phishing domain names.",
  },
  {
    question: "Does this tool change the meaning of my text?",
    answer:
      "No! It normalizes all look-alike non-Latin characters back to standard Latin ASCII letters so humans and search engines read it identically.",
  },
  {
    question: "Is this homoglyph cleaner free?",
    answer:
      "Yes. It is 100% free and runs entirely inside your browser memory without uploading text to any server.",
  },
];

export default async function LocalizedCleanUnicodeHomoglyphsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === "rtl";
  const tool = l.subtools?.cleanUnicodeHomoglyphs || LANGUAGES.en.subtools.cleanUnicodeHomoglyphs!;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
      <HomoglyphSanitizer
        heading={tool.heading}
        subheading={tool.subheading}
      />
      <SubToolContent
        title={tool.heading}
        directAnswerTitle={tool.heading}
        directAnswerText={tool.subheading}
        beforeExample="Tеstаng text wіth fаkе Cyrіllіc letters."
        afterExample="Testing text with fake Cyrillic letters."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
