import type { Metadata } from "next";
import PromptStripper from "@/components/PromptStripper";
import SubToolContent from "@/components/SubToolContent";
import { generateSubToolMetadata } from "@/components/LocalizedSubToolLayout";
import { LANGUAGES } from "@/lib/i18n/dictionaries";

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== "en")
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSubToolMetadata(lang, "stripAIPrompts", "strip-ai-prompts");
}

const removedItems = [
  {
    character: "Midjourney Flags",
    unicode: "--ar 16:9 --v 6.0 --stylize",
    description: "Removes aspect ratio, version, seed, stylize, and chaos parameter flags.",
  },
  {
    character: "LoRA & Network Tags",
    unicode: "<lora:name:0.8>",
    description: "Strips Stable Diffusion network model weights and LoRA trigger tags.",
  },
  {
    character: "Negative Prompt Blocks",
    unicode: "--no rain, cars, text",
    description: "Extracts and removes negative exclusion parameter chunks.",
  },
  {
    character: "Weight Multipliers",
    unicode: "(word:1.3)",
    description: "Normalizes weighted emphasis syntax back to clean plain text words.",
  },
];

const howToSteps = [
  {
    title: "Paste Raw AI Prompt",
    description: "Paste raw Midjourney, Stable Diffusion, or DALL-E prompt strings into the raw input box.",
  },
  {
    title: "Select Stripping Rules",
    description: "Toggle which parameters to filter (Midjourney flags, LoRA tags, negative prompts, weights).",
  },
  {
    title: "Copy Clean Output",
    description: "Copy sanitized plain prompt text with all generation parameters stripped.",
  },
];

const faqs = [
  {
    question: "Why should I strip parameters from AI prompts?",
    answer:
      "Stripping parameters cleans raw generation flags so you can reuse the core prompt text across different AI tools like ChatGPT, Claude, DALL-E 3, or Midjourney without syntax errors.",
  },
  {
    question: "Does this tool support Midjourney v6 and Stable Diffusion XL?",
    answer:
      "Yes! Our stripper handles Midjourney v5/v6 parameters (--v, --ar, --stylize, --chaos, --weird, --seed, --no) and SD XL LoRA tags (<lora:...>).",
  },
  {
    question: "Is my prompt text stored on any server?",
    answer:
      "No. Prompt stripping is executed 100% locally inside your browser memory. Zero prompt data is logged or uploaded to external servers.",
  },
  {
    question: "Can I copy the cleaned prompt with one click?",
    answer:
      "Yes. Click 'Copy Clean Prompt' or download the text file directly to your device.",
  },
];

export default async function LocalizedStripAIPromptsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === "rtl";
  const tool = l.subtools?.stripAIPrompts || LANGUAGES.en.subtools.stripAIPrompts!;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
      <PromptStripper
        heading={tool.heading}
        subheading={tool.subheading}
      />
      <SubToolContent
        title={tool.heading}
        directAnswerTitle={tool.heading}
        directAnswerText={tool.subheading}
        beforeExample="a futuristic cyberpunk neon city street at night --ar 16:9 --v 6.0 --stylize 250 <lora:cyberpunk_v2:0.8> (hyperrealistic:1.2) --no rain, cars, crowd"
        afterExample="a futuristic cyberpunk neon city street at night hyperrealistic"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}
