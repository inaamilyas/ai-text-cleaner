import type { Metadata } from "next";
import PdfMetadataSanitizer from "@/components/PdfMetadataSanitizer";

export const metadata: Metadata = {
  title: "PDF & Document Metadata Sanitizer — Wipe Hidden EXIF & Author Tags",
  description: "Free online tool to strip author names, creation timestamps, title, and producer metadata from PDF documents. 100% private in-browser processing.",
};

export default function CleanPdfMetadataPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <PdfMetadataSanitizer />
    </div>
  );
}
