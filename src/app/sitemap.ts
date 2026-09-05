import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://ai-text-cleaner.com";

const languages = ["es", "de", "fr", "it", "pt", "ar", "ja", "nl", "tr", "id"];

const baseSubRoutes = [
  "",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/remove-ai-words",
  "/remove-zero-width-space",
  "/clean-chatgpt-text",
  "/clean-claude-text",
  "/clean-gemini-text",
  "/clean-copilot-text",
  "/remove-invisible-characters",
  "/markdown-to-plain-text",
  "/smart-quotes-to-straight-quotes",
];

const blogRoutes = [
  "/blog",
  "/blog/why-ai-text-has-invisible-characters",
  "/blog/how-to-clean-chatgpt-text-for-publishing",
  "/blog/understanding-zero-width-spaces-and-unicode-artifacts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-05");

  // English base routes
  const englishEntries: MetadataRoute.Sitemap = baseSubRoutes.map((path) => ({
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

  // Localized entries for 10 target languages across all sub-routes
  const localizedEntries: MetadataRoute.Sitemap = [];
  languages.forEach((lang) => {
    baseSubRoutes.forEach((subRoute) => {
      localizedEntries.push({
        url: `${siteUrl}/${lang}${subRoute}`,
        lastModified,
        changeFrequency: subRoute === "" ? "daily" : "weekly",
        priority: subRoute === "" ? 0.9 : 0.7,
      });
    });
  });

  return [...englishEntries, ...blogEntries, ...localizedEntries];
}
