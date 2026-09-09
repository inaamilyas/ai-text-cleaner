import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadabilityCheckerUI from "@/components/ReadabilityCheckerUI";

export const metadata: Metadata = {
  title: "Readability & Flesch-Kincaid Grade Checker — Free Online Text Analyzer",
  description: "Calculate Flesch Reading Ease score, Flesch-Kincaid Grade Level, Gunning Fog Index, and highlight complex words in real-time.",
};

export default function CheckReadabilityScorePage() {
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
