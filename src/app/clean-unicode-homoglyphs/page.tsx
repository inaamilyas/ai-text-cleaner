import type { Metadata } from "next";
import HomoglyphSanitizer from "@/components/HomoglyphSanitizer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Unicode Homoglyph Cleaner — Detect & Replace Fake Cyrillic / Greek Letters",
  description: "Free online security tool to detect and replace Cyrillic or Greek look-alike characters disguised in text with standard ASCII Latin letters. 100% private in-browser tool.",
  alternates: {
    canonical: "/clean-unicode-homoglyphs",
  },
};

export default function CleanHomoglyphsPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <HomoglyphSanitizer />
    </div>
  );
}
