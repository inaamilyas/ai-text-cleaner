import type { Metadata } from "next";
import HomoglyphSanitizer from "@/components/HomoglyphSanitizer";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Metadata {
  return {
    title: "Unicode Homoglyph Cleaner — Detect & Replace Fake Cyrillic / Greek Letters",
    description: "Free online security tool to detect and replace Cyrillic or Greek look-alike characters disguised in text with standard ASCII Latin letters. 100% private in-browser tool.",
  };
}

export default async function LocalizedCleanHomoglyphsPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <div className="py-12 px-4 sm:px-6">
      <HomoglyphSanitizer />
    </div>
  );
}
