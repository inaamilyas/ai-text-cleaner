import type { Metadata } from "next";
import InvisibleVisualizer from "@/components/InvisibleVisualizer";
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
  return generateSubToolMetadata(lang, "visualizeInvisibleCharacters", "visualize-invisible-characters");
}

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

export default async function LocalizedVisualizeInvisibleCharactersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === "rtl";
  const tool = l.subtools?.visualizeInvisibleCharacters || LANGUAGES.en.subtools.visualizeInvisibleCharacters!;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
      <InvisibleVisualizer
        heading={tool.heading}
        subheading={tool.subheading}
      />
      <SubToolContent
        title={tool.heading}
        directAnswerTitle={tool.heading}
        directAnswerText={tool.subheading}
        beforeExample={"Text\u200B containing\u00AD hidden\u200E zero-width characters."}
        afterExample="[U+200B ZWSP] Text [U+00AD SHY] containing [U+200E LTR] hidden zero-width characters."
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
