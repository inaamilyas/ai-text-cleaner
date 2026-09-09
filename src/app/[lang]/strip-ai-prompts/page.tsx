import type { Metadata } from "next";
import PromptStripper from "@/components/PromptStripper";

export const dynamic = "force-static";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Metadata {
  return {
    title: "AI Prompt & Parameter Stripper — Midjourney, DALL-E & SD Flags Remover",
    description: "Free online tool to strip Midjourney parameters (--ar 16:9, --v 6.0), LoRA tags (<lora:...>), negative prompts, and weights from AI prompt text. 100% private in-browser tool.",
  };
}

export default async function LocalizedStripAIPromptsPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <div className="py-12 px-4 sm:px-6">
      <PromptStripper />
    </div>
  );
}
