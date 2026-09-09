import type { Metadata } from "next";
import HumanizeTextUI from "@/components/HumanizeTextUI";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Metadata {
  return {
    title: "AI Text Humanizer & Structure Optimizer — Clean Robotic Patterns",
    description: "Free online AI text humanizer. Detect and replace repetitive AI transitions, robotic clichés (delve, realm, tapestry), and monotonous sentence structures.",
  };
}

export default async function LocalizedHumanizeAITextPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <div className="py-12 px-4 sm:px-6">
      <HumanizeTextUI />
    </div>
  );
}
