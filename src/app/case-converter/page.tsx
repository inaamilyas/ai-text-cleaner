import type { Metadata } from "next";
import CaseConverterUI from "@/components/CaseConverterUI";

export const metadata: Metadata = {
  title: "Text Case Converter & ASCII Normalizer — Title Case, camelCase, Slugs",
  description: "Free online case converter tool. Convert text to Title Case, UPPERCASE, lowercase, camelCase, snake_case, kebab-case, URL Slugs, and strip accents.",
};

export default function CaseConverterPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <CaseConverterUI />
    </div>
  );
}
