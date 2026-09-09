import type { Metadata } from "next";
import ReadabilityCheckerUI from "@/components/ReadabilityCheckerUI";

export const metadata: Metadata = {
  title: "Readability & Flesch-Kincaid Grade Checker — Free Online Text Analyzer",
  description: "Calculate Flesch Reading Ease score, Flesch-Kincaid Grade Level, Gunning Fog Index, and highlight complex words in real-time.",
};

export default function CheckReadabilityScorePage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <ReadabilityCheckerUI />
    </div>
  );
}
