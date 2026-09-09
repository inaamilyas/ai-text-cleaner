import type { Metadata } from "next";
import InvisibleVisualizer from "@/components/InvisibleVisualizer";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Metadata {
  return {
    title: "Invisible Character Visualizer — Highlight Zero-Width Spaces (U+200B) & NBSP",
    description: "Free online tool to highlight and see hidden zero-width spaces (U+200B), non-breaking spaces (U+00A0), soft hyphens, and BOM markers with visual color-coded badges.",
  };
}

export default async function LocalizedVisualizeInvisiblePage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <div className="py-12 px-4 sm:px-6">
      <InvisibleVisualizer />
    </div>
  );
}
