import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://www.text-cleaner-ai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
