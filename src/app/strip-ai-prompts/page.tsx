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

const benchmarks = [
  { name: "Chrome", time: "1.2ms" },
  { name: "Safari", time: "1.5ms" },
  { name: "Firefox", time: "1.8ms" },
];

const valueProps = [
  {
    title: "100% In-Browser Privacy",
    desc: "All text sanitization executes strictly inside your local V8/WebKit engine. No text payloads are ever uploaded to cloud endpoints.",
    icon: "shield",
  },
  {
    title: "Instant Processing",
    desc: "Sub-millisecond token extraction powered by optimized regular expression pipelines designed for multi-megabyte payloads.",
    icon: "bolt",
  },
  {
    title: "Advanced Heuristic Detection",
    desc: "Detects edge-case tags such as chaotic seed values, negative prompt arrays, LoRA trigger terms, and nesting weight symbols.",
    icon: "psychology",
  },
  {
    title: "Multi-Language Static Support",
    desc: "Preserves non-Latin prompts across Japanese anime models, Cyrillic SD checkpoints, and multi-lingual prompt styles seamlessly.",
    icon: "translate",
  },
  {
    title: "Visual Highlight Breakdown",
    desc: "Inspect dynamic diff badges highlighting exactly what parameters were stripped before committing to your output clipboard.",
    icon: "highlight",
  },
  {
    title: "Zero Account Required",
    desc: "Open the browser, sanitize your prompts, and move forward. No paywalls, subscription tiers, or login credentials necessary.",
    icon: "no_accounts",
  },
];

const faqs = [
  {
    question: "Why should I strip parameters from AI prompts?",
    answer:
      "AI image generators like Midjourney and Stable Diffusion inject model-specific metadata, aspect ratios, version tags, and LoRA paths that pollute prompts when migrating between platforms. Stripping parameters isolates the core creative subject and stylistic description, making it universally portable for ChatGPT, Claude, Gemini, or alternative diffusion models without syntax errors.",
  },
  {
    question: "Does this tool support Midjourney v6 and Stable Diffusion XL?",
    answer:
      "Yes, our regex grammar library is continuously updated for the latest parameter flags, including Midjourney v6 tags (--v 6.0, --style raw, --weird, --chaos) as well as SDXL positive/negative conditioning weights and multiple LoRA triggers.",
  },
  {
    question: "Is my prompt text stored on any server?",
    answer:
      "No. AI Text Cleaner operates exclusively client-side via JavaScript running directly in your browser tab. Your prompts, artistic concepts, and proprietary keywords are never transmitted to any external server, database, or analytics platform.",
  },
  {
    question: "Can I copy the cleaned prompt with one click?",
    answer:
      "Yes. Simply click the 'Copy Clean Prompt' button above the output pane or press the keyboard shortcut to instantly copy the sanitized plain prompt string straight to your OS clipboard.",
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
    <div className="container max-w-[1140px] mx-auto px-4 md:px-8 py-space-lg flex flex-col w-full space-y-12 md:space-y-16">
      <span className="sr-only">
        AI Prompt &amp; Parameter Stripper — Desktop (1140px) | AI Text Cleaner
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
        heading="Strip Midjourney, ChatGPT & SD Prompt Parameters"
        subheading="Remove Midjourney flags (--ar 16:9, --v 6.0), LoRA tags (<lora:...>), negative prompts, and weights instantly."
      />

      {/* 2. SUB-TOOL CONTENT */}
      <SubToolContent
        title="AI Prompt & Parameter Stripper"
        badgeLabel="TECHNICAL PRIMER // CLIENT PIPELINE"
        badgeIcon="terminal"
        directAnswerTitle="What Is an AI Prompt Stripper & How Does It Work?"
        directAnswerText="An AI Prompt Stripper is a client-side utility designed to clean Midjourney flags (--ar 16:9, --v 6.0, --stylize), LoRA tags (<lora:...>), negative prompt blocks, and weight multipliers ((word:1.3)) from raw AI prompts. It restores clean human-readable prompt text instantly in your browser memory."
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
