import type { Metadata } from "next";
import RemoveAIImageMetadataPage from "@/app/remove-ai-image-metadata/page";
import { LANGUAGES } from "@/lib/i18n/dictionaries";

const siteUrl = "https://www.text-cleaner-ai.com";

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== "en")
    .map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;

  const title = `AI Image Metadata Remover (${l.name}) — Strip Prompts & C2PA Headers`;
  const description = `Free online AI image EXIF & metadata stripper (${l.name}). Remove hidden prompts, DALL-E/Midjourney tags, and C2PA provenance headers 100% in-browser.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/remove-ai-image-metadata`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}/remove-ai-image-metadata`,
    },
  };
}

export default async function LocalizedImageMetadataPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <RemoveAIImageMetadataPage langCode={lang} />;
}
