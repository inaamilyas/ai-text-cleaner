import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Writing & Formatting Guides — Text Cleaner AI Blog",
  description:
    "Engineering insights, guides, and research on invisible Unicode characters, AI detector mechanics (burstiness and perplexity), and cleaning AI text.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "AI Writing & Formatting Guides — Text Cleaner AI Blog",
    description:
      "Engineering insights and practical guides on how LLMs generate invisible characters, how AI detectors work, and how to sanitize text for publishing.",
    url: "https://www.text-cleaner-ai.com/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
