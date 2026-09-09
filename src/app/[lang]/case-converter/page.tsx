import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseConverterUI from "@/components/CaseConverterUI";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Metadata {
  return {
    title: "Text Case Converter & ASCII Normalizer — Title Case, camelCase, Slugs",
    description: "Free online case converter tool. Convert text to Title Case, UPPERCASE, lowercase, camelCase, snake_case, kebab-case, URL Slugs, and strip accents.",
  };
}

export default async function LocalizedCaseConverterPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
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
