import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://www.text-cleaner-ai.com";

// Core precision tools (primary landing pages)
const coreTools = [
  "/clean-chatgpt-text",
  "/ai-text-detector",
  "/remove-invisible-characters",
  "/humanize-ai-text",
  "/remove-ai-words",
  "/visualize-invisible-characters",
  "/clean-unicode-homoglyphs",
  "/clean-pdf-metadata",
  "/remove-ai-image-metadata",
  "/strip-ai-prompts",
  "/check-readability-score",
  "/markdown-to-plain-text",
];

// Long-form educational articles
const blogArticles = [
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
  // Tier 1: Homepage (Primary Category Anchor)
  const homeEntry: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-10-10T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Tier 2: Core Utility Tools (High search-volume programmatic pages)
  const toolEntries: MetadataRoute.Sitemap = coreTools.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-10-08T00:00:00.000Z"),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Tier 3: Blog Index (Hub for guide content)
  const blogIndexEntry: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date("2026-10-06T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Tier 4: Blog Articles (Topical authority & long-tail search)
  const blogEntries: MetadataRoute.Sitemap = blogArticles.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-09-25T00:00:00.000Z"),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Tier 5: Company & Support
  const companyEntries: MetadataRoute.Sitemap = ["/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-09-20T00:00:00.000Z"),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Tier 6: Legal & Compliance
  const legalEntries: MetadataRoute.Sitemap = ["/privacy", "/terms"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-09-15T00:00:00.000Z"),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...homeEntry,
    ...toolEntries,
    ...blogIndexEntry,
    ...blogEntries,
    ...companyEntries,
    ...legalEntries,
  ];
}
