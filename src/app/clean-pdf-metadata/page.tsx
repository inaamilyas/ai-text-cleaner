import type { Metadata } from "next";
import PdfMetadataSanitizer from "@/components/PdfMetadataSanitizer";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean PDF Metadata Online — Remove Author, Creator & Timestamp Tags",
  description:
    "Free online PDF metadata remover. Strip author names, creation dates, application producer tags, and document title EXIF info from PDF files in your browser.",
  keywords: [
    "clean pdf metadata",
    "remove author from pdf",
    "strip pdf creator tags",
    "pdf metadata remover online",
    "delete hidden pdf exif",
  ],
  alternates: {
    canonical: "/clean-pdf-metadata",
  },
  openGraph: {
    title: "Clean PDF Metadata Online — Remove Author & Timestamp Tags",
    description:
      "Wipe hidden PDF metadata, author names, creation dates, and producer tags 100% in your browser memory.",
    url: `${siteUrl}/clean-pdf-metadata`,
  },
};

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

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDF Metadata Sanitizer",
  url: `${siteUrl}/clean-pdf-metadata`,
  description: "Free online utility to strip author tags, creation dates, and producer metadata from PDF files.",
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

export default function CleanPdfMetadataPage() {
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
      <PdfMetadataSanitizer
        heading="Clean PDF Metadata & Author Info"
        subheading="Strip hidden author tags, creation timestamps, title, producer, and software metadata from PDF files in your browser."
      />
      <SubToolContent
        title="PDF Metadata Sanitizer"
        directAnswerTitle="Why Clean Hidden PDF Metadata & How to Do It?"
        directAnswerText="When you export a document to PDF, your software silently embeds metadata headers containing your name, computer username, software version, and exact creation timestamps. Our PDF Metadata Sanitizer parses PDF binary streams directly in your browser memory and wipes these hidden EXIF-style tags before you publish or share."
        beforeExample="PDF Header: /Author (John Smith) /Creator (Microsoft Word 2024) /CreationDate (D:20260910024500Z)"
        afterExample="PDF Header: /Author () /Creator () /CreationDate () [Metadata Sanitized]"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
