import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://aitextcleaner.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-05");

  const routes = [
    "/about",
    "/blog",
    "/blog/why-ai-text-has-invisible-characters",
    "/blog/how-to-clean-chatgpt-text-for-publishing",
    "/blog/understanding-zero-width-spaces-and-unicode-artifacts",
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

  const routeEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path.startsWith("/blog") || path === "/about" ? 0.8 : 0.9,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...routeEntries,
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
