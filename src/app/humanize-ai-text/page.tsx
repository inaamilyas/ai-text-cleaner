import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HumanizeTextUI from "@/components/HumanizeTextUI";

export const metadata: Metadata = {
  title: "AI Text Humanizer & Structure Optimizer — Clean Robotic Patterns",
  description: "Free online AI text humanizer. Detect and replace repetitive AI transitions, robotic clichés (delve, realm, tapestry), and monotonous sentence structures.",
};

export default function HumanizeAITextPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <HumanizeTextUI />
      </main>
      <Footer />
    </>
  );
}
