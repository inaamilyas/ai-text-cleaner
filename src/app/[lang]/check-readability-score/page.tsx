import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  const { lang } = await params;
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <ReadabilityCheckerUI />
      </main>
      <Footer />
    </>
  );
}
