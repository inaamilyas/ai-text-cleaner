import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseConverterUI from "@/components/CaseConverterUI";

export const metadata: Metadata = {
  title: "Text Case Converter & ASCII Normalizer — Title Case, camelCase, Slugs",
  description: "Free online case converter tool. Convert text to Title Case, UPPERCASE, lowercase, camelCase, snake_case, kebab-case, URL Slugs, and strip accents.",
};

export default function CaseConverterPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <CaseConverterUI />
      </main>
      <Footer />
    </>
  );
}
