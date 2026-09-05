import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Cpu, Zap, Lock, Sparkles, ArrowRight, Mail, Share2, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — AI Text Cleaner",
  description:
    "Learn about AI Text Cleaner, created by Inam Ilyas. Our mission is to sanitize AI text formatting with 100% client-side privacy.",
  alternates: {
    canonical: "/about",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Inam Ilyas",
  jobTitle: "Founder & Lead Engineer",
  url: "https://aitextcleaner.com/about",
  sameAs: [
    "https://www.linkedin.com/in/inam-ilyas/",
    "https://github.com/inaamilyas/",
  ],
  email: "mailto:inaamilyas656@gmail.com",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="container mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 text-body-xs font-bold text-primary-700 border border-primary-200">
            <Sparkles className="h-4 w-4" /> About AI Text Cleaner
          </span>
          <h1>Sanitizing AI Text for Writers, Developers & Creators</h1>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            AI Text Cleaner was built by <strong>Inam Ilyas</strong> to solve a universal problem in modern publishing: hidden unicode artifacts, zero-width spaces, and raw Markdown clutter in AI-generated text.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-neutral-50">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-h6 text-neutral-900">100% Private</h3>
            <p className="text-body-sm text-neutral-600">
              All text sanitization runs in your local browser JavaScript engine. No text is ever uploaded or stored on cloud servers.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-neutral-50">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-h6 text-neutral-900">Instant Performance</h3>
            <p className="text-body-sm text-neutral-600">
              Zero API latency or network calls. Clean 50,000+ words in under 10 milliseconds with 1-click preset filters.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-neutral-50">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-h6 text-neutral-900">Advanced Engine</h3>
            <p className="text-body-sm text-neutral-600">
              Strips zero-width spaces (U+200B), soft hyphens, smart quotes, Markdown asterisks, and overused AI buzzwords.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10">
          <h2>Our Story & Leadership</h2>
          <p className="text-body-md text-neutral-700 leading-relaxed">
            When copying text from OpenAI ChatGPT, Anthropic Claude, or Google Gemini into Microsoft Word, Google Docs, or CMS editors like WordPress, invisible formatting characters often tag along. These hidden unicode points cause broken line breaks, database syntax errors, and regex failures.
          </p>
          <p className="text-body-md text-neutral-700 leading-relaxed">
            AI Text Cleaner was created to give content creators, bloggers, software developers, and students a fast, free, and privacy-first tool to sanitize AI text with a single click.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-neutral-200 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-h6 font-bold text-neutral-50">
                II
              </div>
              <div>
                <p className="text-body-md font-bold text-neutral-900">Inam Ilyas</p>
                <p className="text-body-xs text-neutral-500">Founder & Lead Engineer</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 ml-auto">
              <a
                href="https://www.linkedin.com/in/inam-ilyas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-body-sm font-bold text-primary-700 no-underline hover:underline"
              >
                <Share2 className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/inaamilyas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-body-sm font-bold text-primary-700 no-underline hover:underline"
              >
                <Code2 className="h-4 w-4" /> GitHub
              </a>
              <a
                href="mailto:inaamilyas656@gmail.com"
                className="flex items-center gap-1.5 text-body-sm font-bold text-primary-700 no-underline hover:underline"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center rounded-2xl bg-primary-600 p-8 sm:p-12 text-neutral-50">
          <h2 className="text-neutral-50">Try AI Text Cleaner Now</h2>
          <p className="text-body-lg text-primary-100 max-w-xl">
            Clean your text from ChatGPT, Claude, and Gemini in 1-click. Free forever, no signup required.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-neutral-50 px-8 py-4 text-button font-bold text-primary-900 no-underline transition-transform hover:scale-105"
          >
            Open Tool Editor <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
