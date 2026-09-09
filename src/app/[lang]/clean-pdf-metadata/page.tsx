import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PdfMetadataSanitizer from "@/components/PdfMetadataSanitizer";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Metadata {
  return {
    title: "PDF & Document Metadata Sanitizer — Wipe Hidden EXIF & Author Tags",
    description: "Free online tool to strip author names, creation timestamps, title, and producer metadata from PDF documents. 100% private in-browser processing.",
  };
}

export default async function LocalizedCleanPdfMetadataPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <PdfMetadataSanitizer />
      </main>
      <Footer />
    </>
  );
}
