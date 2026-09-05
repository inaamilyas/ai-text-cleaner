import type { Metadata } from "next";
import ImageSanitizer from "@/components/ImageSanitizer";
import FAQ from "@/components/FAQ";
import {
  Shield,
  Lock,
  EyeOff,
  Sparkles,
  Zap,
  CheckCircle2,
  FileCode,
  Layers,
  Cpu,
  Share2,
} from "lucide-react";
import ShareBar from "@/components/ShareBar";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "AI Image Metadata & EXIF Remover — Strip Prompts, C2PA & Provenance",
  description:
    "Free online tool to strip EXIF metadata, prompt text, seed parameters, and C2PA provenance headers from AI images (ChatGPT, Midjourney, DALL-E 3, Gemini, Stable Diffusion). 100% private in-browser canvas sanitizer.",
  keywords: [
    "remove ai image metadata",
    "strip midjourney prompt metadata",
    "remove dalle 3 exif data",
    "clean ai image metadata",
    "remove c2pa provenance header",
    "image exif stripper free",
    "strip chatgpt image watermark header",
  ],
  alternates: {
    canonical: "/remove-ai-image-metadata",
  },
  openGraph: {
    title: "AI Image Metadata & EXIF Remover — Strip Prompts & Provenance",
    description:
      "Clean hidden prompt metadata, EXIF tags, C2PA tracking, and AI software signatures from generated images.",
    url: `${siteUrl}/remove-ai-image-metadata`,
  },
};

const supportedGenerators = [
  {
    name: "ChatGPT / DALL-E 3",
    description: "Strips embedded C2PA Content Credentials headers, creation assertions, and prompt metadata.",
    badge: "OpenAI C2PA",
  },
  {
    name: "Midjourney (v5 & v6)",
    description: "Wipes raw /imagine prompt parameters, seed numbers, aspect ratio tags, and Job IDs.",
    badge: "Midjourney EXIF",
  },
  {
    name: "Google Gemini & Imagen 3",
    description: "Cleans Google Generative AI watermark headers, resize metadata, and IPTC digital source tags.",
    badge: "Google C2PA",
  },
  {
    name: "Stable Diffusion & ComfyUI",
    description: "Erases positive/negative prompt text, sampler settings, steps, CFG scale, and node workflow JSON.",
    badge: "A1111 & Comfy",
  },
  {
    name: "Flux.1 (Black Forest Labs)",
    description: "Strips generation parameters, model hashes, and API metadata from Fal.ai / Replicate outputs.",
    badge: "BFL Flux",
  },
  {
    name: "Adobe Firefly & Photoshop AI",
    description: "Removes Adobe Content Credentials, software signatures, and edit history headers.",
    badge: "Adobe C2PA",
  },
];

const useCases = [
  {
    icon: Lock,
    title: "Protect Commercial Prompt Privacy",
    description:
      "AI image generators embed your full prompt string into image file chunks. Strip metadata so competitors cannot steal your secret prompt engineering techniques.",
  },
  {
    icon: Shield,
    title: "Remove C2PA & Digital Tracking Headers",
    description:
      "Platforms like OpenAI, Google, and Adobe attach C2PA provenance headers. Our tool wipes all tracking manifests from PNG and JPEG files.",
  },
  {
    icon: Zap,
    title: "Disrupt Neural AI Detectors",
    description:
      "Enable our pattern disruption engine to inject micro sub-pixel noise and DCT re-quantization, breaking high-frequency AI visual signatures for Hive and Illuminarty.",
  },
  {
    icon: EyeOff,
    title: "Safe for Stock & E-Commerce Platforms",
    description:
      "Clean your AI artwork before selling on Etsy, Amazon, or stock photo platforms to avoid automated metadata flags and rejection.",
  },
];

const faqs = [
  {
    question: "What hidden metadata is stored inside AI-generated images?",
    answer:
      "Generators like DALL-E 3, ChatGPT, Midjourney, and Stable Diffusion embed prompt text, seed numbers, sampler settings, software signatures, and C2PA provenance manifests directly inside PNG/JPEG byte chunks (such as tEXt, iTXt, and EXIF APP1 headers).",
  },
  {
    question: "How does this tool strip AI image metadata?",
    answer:
      "Our tool loads your image into an HTML5 browser canvas and re-renders the visual pixels onto a fresh, uncompressed image buffer. This process discards 100% of non-visual file chunks, headers, EXIF tags, and C2PA manifests.",
  },
  {
    question: "How does the Enhanced AI Pattern Disruption feature work?",
    answer:
      "While metadata stripping erases file headers, AI image detectors (Hive, Illuminarty) analyze visual pixels for mathematical patterns. Our optional pattern disruption feature applies a 99.6% sub-pixel scale shift, micro-noise jitter, and DCT frequency re-quantization to break neural network detector fingerprints.",
  },
  {
    question: "Are my images uploaded to any cloud server?",
    answer:
      "No! 100% of the image inspection and sanitization runs locally inside your browser's JavaScript memory. No image is ever uploaded to any server or third-party storage.",
  },
  {
    question: "Does stripping metadata affect image quality?",
    answer:
      "No! Visual pixel quality is preserved at high resolution (95%+ quality encoding) while completely removing hidden text and tracking headers.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Image Metadata Remover",
  url: `${siteUrl}/remove-ai-image-metadata`,
  description: "Free online tool to strip EXIF metadata, prompt parameters, and C2PA provenance headers from AI images.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
};

import { IMAGE_METADATA_TRANSLATIONS } from "@/lib/i18n/imageMetadataTranslations";

export default function RemoveAIImageMetadataPage({ langCode = "en" }: { langCode?: string }) {
  const t = IMAGE_METADATA_TRANSLATIONS[langCode] || IMAGE_METADATA_TRANSLATIONS.en;
  const isRtl = langCode === "ar";

  const canonicalUrl = langCode === "en" ? `${siteUrl}/remove-ai-image-metadata` : `${siteUrl}/${langCode}/remove-ai-image-metadata`;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col gap-20">
        
        {/* Interactive Tool Section */}
        <section>
          <ImageSanitizer langCode={langCode} />
        </section>

        {/* Share Bar Section */}
        <section className="w-full max-w-4xl mx-auto text-center">
          <ShareBar
            title={t.title}
            url={canonicalUrl}
          />
        </section>

        {/* Supported AI Generators Grid */}
        <section className="w-full max-w-5xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col gap-3">
            <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-body-xs font-bold text-primary-700 border border-primary-200">
              <Layers className="h-3.5 w-3.5" /> {t.platformsBadge}
            </span>
            <h2 className="text-h3 text-neutral-900 font-bold">{t.platformsTitle}</h2>
            <p className="text-body-md text-neutral-600 max-w-2xl mx-auto">
              {t.platformsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedGenerators.map((gen) => (
              <div
                key={gen.name}
                className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-0 p-6 shadow-sm hover:border-primary-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-h6 text-neutral-900 font-bold">{gen.name}</h3>
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-body-xs font-bold text-neutral-700 border border-neutral-200">
                    {gen.badge}
                  </span>
                </div>
                <p className="text-body-sm text-neutral-600 leading-relaxed">
                  {gen.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Strip AI Image Metadata Section */}
        <section className="w-full max-w-5xl mx-auto flex flex-col gap-10 bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200">
          <div className="text-center flex flex-col gap-3">
            <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-body-xs font-bold text-primary-800">
              <Shield className="h-3.5 w-3.5" /> {t.whyBadge}
            </span>
            <h2 className="text-h3 text-neutral-900 font-bold">{t.whyTitle}</h2>
            <p className="text-body-md text-neutral-600 max-w-2xl mx-auto">
              {t.whySub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-neutral-50 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`flex flex-col gap-1 ${isRtl ? "text-right" : "text-left"}`}>
                    <h3 className="text-h6 text-neutral-900 font-bold">{uc.title}</h3>
                    <p className="text-body-sm text-neutral-600 leading-relaxed">
                      {uc.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full max-w-4xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col gap-3">
            <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-body-xs font-bold text-primary-700 border border-primary-200">
              <Cpu className="h-3.5 w-3.5" /> {t.workflowBadge}
            </span>
            <h2 className="text-h3 text-neutral-900 font-bold">{t.workflowTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-0 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                1
              </div>
              <h3 className="text-h6 text-neutral-900 font-bold">{t.step1Title}</h3>
              <p className="text-body-xs text-neutral-600">
                {t.step1Desc}
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-0 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                2
              </div>
              <h3 className="text-h6 text-neutral-900 font-bold">{t.step2Title}</h3>
              <p className="text-body-xs text-neutral-600">
                {t.step2Desc}
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-0 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                3
              </div>
              <h3 className="text-h6 text-neutral-900 font-bold">{t.step3Title}</h3>
              <p className="text-body-xs text-neutral-600">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <FAQ
          customFaqs={faqs}
          customTitle="Frequently Asked Questions"
          customSubtitle="Everything you need to know about AI image metadata, C2PA headers, and prompt privacy."
        />

      </div>
    </div>
  );
}
