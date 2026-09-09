import type { Metadata } from "next";
import ReadabilityCheckerUI from "@/components/ReadabilityCheckerUI";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Metadata {
  return {
    title: "Readability & Flesch-Kincaid Grade Checker — Free Online Text Analyzer",
    description: "Calculate Flesch Reading Ease score, Flesch-Kincaid Grade Level, Gunning Fog Index, and highlight complex words in real-time.",
  };
}

export default async function LocalizedCheckReadabilityPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <div className="py-12 px-4 sm:px-6">
      <ReadabilityCheckerUI />
    </div>
  );
}
