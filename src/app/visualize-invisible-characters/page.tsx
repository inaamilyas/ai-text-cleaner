import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InvisibleVisualizer from "@/components/InvisibleVisualizer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Invisible Character Visualizer — Highlight Zero-Width Spaces (U+200B) & NBSP",
  description: "Free online tool to highlight and see hidden zero-width spaces (U+200B), non-breaking spaces (U+00A0), soft hyphens, and BOM markers with visual color-coded badges.",
  alternates: {
    canonical: "/visualize-invisible-characters",
  },
};

export default function VisualizeInvisiblePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <InvisibleVisualizer />
      </main>
      <Footer />
    </>
  );
}
