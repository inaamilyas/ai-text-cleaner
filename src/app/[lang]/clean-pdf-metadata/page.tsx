import type { Metadata } from "next";
import PdfMetadataSanitizer from "@/components/PdfMetadataSanitizer";
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
  return generateSubToolMetadata(lang, "cleanPdfMetadata", "clean-pdf-metadata");
}

const removedItems = [
  {
    character: "Author & Owner Name",
    unicode: "/Author Tag",
    description: "Contains personal name or computer username attached during document saving.",
  },
  {
    character: "Creation & Modification Date",
    unicode: "/CreationDate Tag",
    description: "Exposes exact timestamp and timezone of document creation.",
  },
  {
    character: "Creator & Producer Software",
    unicode: "/Producer /Creator",
    description: "Reveals exact PDF software version (Adobe Acrobat, Canva, MS Word).",
  },
  {
    character: "Keywords & Subject Metadata",
    unicode: "/Keywords /Subject",
    description: "Contains internal project codes or hidden categorizations.",
  },
];

const howToSteps = [
  {
    title: "Upload PDF Document",
    description: "Click or drag your PDF file into the browser sanitization area.",
  },
  {
    title: "Inspect Metadata Audit",
    description: "Review detected hidden fields (Author, Creator, Creation Date, Producer).",
  },
  {
    title: "Download Sanitized PDF",
    description: "Download your clean PDF file with all hidden metadata fields neutralized.",
  },
];

const faqs = [
  {
    question: "Why should I clean PDF metadata?",
    answer:
      "PDF metadata contains sensitive hidden information like your name, company software version, document creation dates, and local file paths.",
  },
  {
    question: "Are my PDF files uploaded to a remote server?",
    answer:
      "No! 100% client-side processing. PDF parsing and metadata neutralization occur strictly inside your device's browser memory.",
  },
  {
    question: "Will sanitizing metadata alter the visible text or formatting of my PDF?",
    answer:
      "No. Only hidden binary header tags (/Author, /CreationDate, /Producer) are neutralized. Visual layouts, images, and text remain untouched.",
  },
  {
    question: "Is there a limit on PDF file size?",
    answer:
      "Because processing occurs locally in browser memory, you can sanitize documents of almost any size instantly without queue times.",
  },
];

export default async function LocalizedCleanPdfMetadataPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === "rtl";
  const tool = l.subtools?.cleanPdfMetadata || LANGUAGES.en.subtools.cleanPdfMetadata!;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
      <PdfMetadataSanitizer
        heading={tool.heading}
        subheading={tool.subheading}
      />
      <SubToolContent
        title={tool.heading}
        directAnswerTitle={tool.heading}
        directAnswerText={tool.subheading}
        beforeExample="PDF Header: /Author (John Smith) /Creator (Microsoft Word 2024) /CreationDate (D:20260910024500Z)"
        afterExample="PDF Header: /Author () /Creator () /CreationDate () [Metadata Sanitized]"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
