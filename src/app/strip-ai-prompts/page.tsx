import type { Metadata } from "next";
import PromptStripper from "@/components/PromptStripper";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "AI Prompt & Parameter Stripper — Midjourney, DALL-E & SD Flags Remover",
  description:
    "Free online tool to strip Midjourney parameters (--ar 16:9, --v 6.0), LoRA tags (<lora:...>), negative prompts, and weights from AI prompt text. 100% private in-browser tool.",
  keywords: [
    "strip ai prompt parameters",
    "midjourney parameter remover",
    "clean lora tags",
    "remove negative prompt flags",
    "ai prompt cleaner",
  ],
  alternates: {
    canonical: "/strip-ai-prompts",
  },
  openGraph: {
    title: "AI Prompt & Parameter Stripper — Midjourney & SD Flags Remover",
    description:
      "Strip Midjourney flags (--ar, --v), LoRA tags (<lora:...>), negative prompts, and weights instantly in your browser.",
    url: `${siteUrl}/strip-ai-prompts`,
  },
};

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

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Prompt Parameter Stripper",
  url: `${siteUrl}/strip-ai-prompts`,
  description: "Free online tool to strip Midjourney parameters, LoRA tags, negative prompts, and weights.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function StripAIPromptsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PromptStripper
        heading="Strip Midjourney, ChatGPT & SD Prompt Parameters"
        subheading="Remove Midjourney flags (--ar 16:9, --v 6.0), LoRA tags (<lora:...>), negative prompts, and weights instantly."
      />
      <SubToolContent
        title="AI Prompt & Parameter Stripper"
        directAnswerTitle="What Is an AI Prompt Stripper & How Does It Work?"
        directAnswerText="An AI Prompt Stripper is a client-side utility designed to clean Midjourney flags (--ar 16:9, --v 6.0, --stylize), LoRA tags (<lora:...>), negative prompt blocks, and weight multipliers ((word:1.3)) from raw AI prompts. It restores clean human-readable prompt text instantly in your browser memory."
        beforeExample="a futuristic cyberpunk neon city street at night --ar 16:9 --v 6.0 --stylize 250 <lora:cyberpunk_v2:0.8> (hyperrealistic:1.2) --no rain, cars, crowd"
        afterExample="a futuristic cyberpunk neon city street at night hyperrealistic"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
      />
    </>
  );
}
