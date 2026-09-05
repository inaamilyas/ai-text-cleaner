import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides & Articles — AI Text Cleaner Blog",
  description:
    "Explore in-depth technical guides on AI text formatting, invisible unicode characters, zero-width spaces, and content publishing workflows.",
  alternates: {
    canonical: "/blog",
  },
};

export const blogPosts = [
  {
    slug: "why-ai-text-has-invisible-characters",
    title: "Why ChatGPT & LLMs Inject Invisible Unicode Characters into Output",
    excerpt:
      "Ever copied text from ChatGPT or Claude into Google Docs or code editors and noticed weird formatting errors? Learn why AI models inject hidden zero-width spaces and control marks.",
    date: "September 5, 2026",
    category: "AI & Formatting",
  },
  {
    slug: "how-to-clean-chatgpt-text-for-publishing",
    title: "The Complete Guide to Cleaning ChatGPT Text for WordPress & Google Docs",
    excerpt:
      "Learn how to strip raw Markdown tags, bold asterisks, smart quotes, and AI buzzwords before publishing content to CMS platforms or submitting assignments.",
    date: "September 4, 2026",
    category: "Content Publishing",
  },
  {
    slug: "understanding-zero-width-spaces-and-unicode-artifacts",
    title: "Understanding Zero-Width Spaces (U+200B) & Developer Debugging Guide",
    excerpt:
      "A deep technical breakdown of Unicode zero-width spaces (U+200B, ZWSP), non-breaking spaces (U+00A0), and byte order marks (U+FEFF) in web development.",
    date: "September 3, 2026",
    category: "Technical Deep-Dive",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto flex max-w-4xl flex-col gap-12 px-6 py-20">
      <SectionHeading
        title="Guides & Resource Library"
        subtitle="Educational guides on AI formatting artifacts, unicode control characters, and content sanitization."
      />

      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 transition-all hover:border-primary-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3 text-body-xs font-bold text-neutral-500">
              <span className="rounded-md bg-primary-100 px-2.5 py-1 text-primary-800">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </span>
            </div>

            <h2 className="text-h4 text-neutral-900">
              <Link href={`/blog/${post.slug}`} className="no-underline hover:text-primary-600">
                {post.title}
              </Link>
            </h2>

            <p className="text-body-md text-neutral-600 leading-relaxed">
              {post.excerpt}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-2 inline-flex items-center gap-1.5 text-body-sm font-bold text-primary-700 no-underline hover:gap-2 transition-all"
            >
              Read Full Article <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
