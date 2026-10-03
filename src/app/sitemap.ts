import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://www.text-cleaner-ai.com";

const baseSubRoutes = [
  "",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/ai-text-detector",
  "/humanize-ai-text",
  "/remove-ai-words",
  "/clean-chatgpt-text",
  "/remove-invisible-characters",
  "/visualize-invisible-characters",
  "/clean-unicode-homoglyphs",
  "/clean-pdf-metadata",
  "/remove-ai-image-metadata",
  "/strip-ai-prompts",
  "/check-readability-score",
  "/markdown-to-plain-text",
];

const blogRoutes = [
  "/blog",
  "/blog/why-ai-text-has-invisible-characters",
  "/blog/how-to-clean-chatgpt-text-for-publishing",
  "/blog/understanding-zero-width-spaces-and-unicode-artifacts",
  "/blog/how-pdf-metadata-exposes-identity",
  "/blog/overused-llm-cliches-delve-tapestry",
  "/blog/how-ai-text-detectors-work-burstiness-perplexity",
  "/blog/why-ai-detectors-flag-human-writing",
  "/blog/how-to-tell-if-text-is-written-by-chatgpt",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Core base routes
  const mainEntries: MetadataRoute.Sitemap = baseSubRoutes.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Blog entries
  const blogEntries: MetadataRoute.Sitemap = blogRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...mainEntries, ...blogEntries];
}
