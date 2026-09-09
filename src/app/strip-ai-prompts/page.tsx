import type { Metadata } from "next";
import PromptStripper from "@/components/PromptStripper";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI Prompt & Parameter Stripper — Midjourney, DALL-E & SD Flags Remover",
  description: "Free online tool to strip Midjourney parameters (--ar 16:9, --v 6.0), LoRA tags (<lora:...>), negative prompts, and weights from AI prompt text. 100% private in-browser tool.",
  alternates: {
    canonical: "/strip-ai-prompts",
  },
};

export default function StripAIPromptsPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <PromptStripper />
    </div>
  );
}
