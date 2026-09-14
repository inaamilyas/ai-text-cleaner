import type { Metadata } from "next";
import PromptStripper from "@/components/PromptStripper";
import SubToolContent from "@/components/SubToolContent";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Strip AI Image Prompts — Remove Midjourney & Stable Diffusion Parameters",
  description:
    "Remove leftover prompt text like --ar, --v, and negative prompts from AI image captions and filenames. Free and browser-based.",
  keywords: [
    "strip ai prompts",
  ],
  alternates: {
    canonical: "/strip-ai-prompts",
    languages: {
      en: "/strip-ai-prompts",
      es: "/es/strip-ai-prompts",
      de: "/de/strip-ai-prompts",
      fr: "/fr/strip-ai-prompts",
      it: "/it/strip-ai-prompts",
      pt: "/pt/strip-ai-prompts",
      ar: "/ar/strip-ai-prompts",
      ja: "/ja/strip-ai-prompts",
      nl: "/nl/strip-ai-prompts",
      tr: "/tr/strip-ai-prompts",
      id: "/id/strip-ai-prompts",
    },
  },
  openGraph: {
    title: "Strip AI Image Prompts — Remove Midjourney & Stable Diffusion Parameters",
    description:
      "Remove leftover prompt flags from AI image captions and filenames.",
    url: `${siteUrl}/strip-ai-prompts`,
  },
};

const removedItems = [
  {
    character: "Aspect Ratio, Version & Style Flags",
    unicode: "--ar 16:9 --v 6.0 --style",
    description: "Parameter flags meant only for the generator, not for a finished caption or filename.",
  },
  {
    character: "Negative Prompt Blocks",
    unicode: "--no rain, cars, text",
    description: "Blocks describing what to exclude, left over from the original prompt.",
  },
  {
    character: "Seed Numbers & Generator Parameters",
    unicode: "--seed 12345",
    description: "Generator-specific numbers that mean nothing outside the tool that produced them.",
  },
  {
    character: "Weighting Syntax",
    unicode: "(word:1.3)",
    description: "Stray emphasis syntax that reads as a typo once removed from the generator's context.",
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

const benchmarks = [
  { name: "Chrome", time: "Instant" },
  { name: "Safari", time: "Instant" },
  { name: "Firefox", time: "Instant" },
];

const valueProps = [
  {
    title: "100% In-Browser Privacy",
    desc: "Your prompt text is processed locally. Nothing is uploaded to a server.",
    icon: "shield",
  },
  {
    title: "Instant Processing",
    desc: "No queues or upload delay, even for long prompt strings.",
    icon: "bolt",
  },
  {
    title: "Covers Common Flag Formats",
    desc: "Built around Midjourney and Stable Diffusion's common parameter conventions.",
    icon: "psychology",
  },
  {
    title: "Zero Account Required",
    desc: "No sign-up, no paywall — open the page and clean your prompt text.",
    icon: "no_accounts",
  },
];

const faqs = [
  {
    question: "Does this work for prompts from any image generator?",
    answer:
      "It's built around Midjourney and Stable Diffusion's common flag formats, which cover most tools built on similar conventions. Some newer or less common tools may use flags it doesn't yet recognize.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Prompt Parameter Stripper",
  url: `${siteUrl}/strip-ai-prompts`,
  description: "Remove leftover prompt text like --ar, --v, and negative prompts from AI image captions and filenames.",
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
    <div className="container mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">
        AI Prompt &amp; Parameter Stripper | Text Cleaner AI
      </span>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. WORKSPACE: INTERACTIVE PROMPT STRIPPER */}
      <PromptStripper
        heading="Strip AI Image Prompts"
        subheading="Remove leftover Midjourney and Stable Diffusion parameter flags from image captions and filenames — free and browser-based."
      />

      {/* 2. SUB-TOOL CONTENT */}
      <SubToolContent
        title="Strip AI Image Prompts"
        badgeLabel="Prompt Cleanup"
        badgeIcon="terminal"
        directAnswerTitle="Why Prompt Flags End Up in Filenames and Captions"
        directAnswerText="If you generate images with Midjourney or Stable Diffusion, the prompt text sometimes ends up stuck in a filename, a caption, or a description — including the parameter flags that were only meant for the generator, like --ar 16:9, --v 6, --no text, or a full negative-prompt block. This tool removes those flags and leftover prompt fragments, so what's left is a clean caption or filename instead of a string of generation parameters."
        beforeBadgeText="BEFORE (RAW PROMPT WITH ARTIFACTS)"
        afterBadgeText="AFTER (CLEANED PROMPT OUTPUT)"
        beforeExample={
          <div className="space-y-2">
            <p className="font-mono text-sm leading-relaxed text-on-surface">
              a futuristic cyberpunk neon city street at night{" "}
              <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold">
                --ar 16:9
              </mark>{" "}
              <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold">
                --v 6.0
              </mark>{" "}
              <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold">
                --stylize 250
              </mark>{" "}
              <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold">
                &lt;lora:cyberpunk_v2:0.8&gt;
              </mark>{" "}
              <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold">
                (hyperrealistic:1.2)
              </mark>{" "}
              <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-mono font-semibold">
                --no rain, cars, crowd
              </mark>
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] font-code-stat text-on-surface-variant">
              <span className="px-1.5 py-0.5 rounded bg-surface-container">[--ar 16:9] Aspect Ratio</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container">[--v 6.0] Engine Version</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container">[&lt;lora:...&gt;] Model Weight</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container">[(...:1.2)] Token Multiplier</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container">[--no ...] Negative Exclusion</span>
            </div>
          </div>
        }
        afterExample={
          <div className="space-y-2 font-mono text-sm leading-relaxed">
            <p className="text-on-surface">
              a futuristic cyberpunk neon city street at night hyperrealistic
            </p>
            <p className="text-[11px] font-code-stat text-emerald-700 pt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Canonical portable text restored. Ready for direct injection into ChatGPT, Claude 3.5, or Midjourney.
            </p>
          </div>
        }
        beforeNote="28 Parameters & Artifacts Removed"
        afterNote="100% Reusable Plain Text"
        removedItems={removedItems}
        streamChart={false}
        activeSuiteToolHref="/strip-ai-prompts"
        howToSteps={howToSteps}
        benchmarksTitle="Client-Side Runtime Latency"
        benchmarks={benchmarks}
        valueProps={valueProps}
        faqs={faqs}
      />
    </div>
  );
}
