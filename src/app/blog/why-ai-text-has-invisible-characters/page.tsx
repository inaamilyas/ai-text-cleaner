import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Why ChatGPT & LLMs Inject Invisible Unicode Characters into Output",
  description:
    "Discover why AI models like ChatGPT, Claude, and Gemini generate hidden zero-width spaces (U+200B) and unicode artifacts in text responses.",
  alternates: {
    canonical: "/blog/why-ai-text-has-invisible-characters",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why ChatGPT & LLMs Inject Invisible Unicode Characters into Output",
  description:
    "Discover why AI models like ChatGPT, Claude, and Gemini generate hidden zero-width spaces (U+200B) and unicode artifacts.",
  datePublished: "2026-09-05",
  author: {
    "@type": "Organization",
    name: "AI Text Cleaner Editorial Team",
  },
};

export default function ArticleOnePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-body-sm font-bold text-neutral-600 no-underline hover:text-primary-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Guides
        </Link>

        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-md bg-primary-100 px-3 py-1 text-body-xs font-bold text-primary-800">
            AI & Formatting
          </span>
          <h1>Why ChatGPT & LLMs Inject Invisible Unicode Characters into Output</h1>
          <div className="flex items-center gap-4 text-body-sm text-neutral-500 border-b border-neutral-200 pb-6">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> AI Text Cleaner Engineering Team
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> September 5, 2026
            </span>
          </div>
        </div>

        <div className="prose max-w-none flex flex-col gap-6 text-body-md text-neutral-700 leading-relaxed">
          <p className="text-body-lg text-neutral-800 font-medium">
            If you have ever copied an answer from ChatGPT, Claude, or Google Gemini and pasted it into a code editor, WordPress post, or SQL terminal, you may have encountered mysterious syntax errors or broken line breaks.
          </p>

          <h2>What Are Invisible Unicode Characters?</h2>
          <p>
            Invisible unicode characters are non-printable code points defined in the Unicode standard. They occupy no visible width on screen, but exist inside text strings as actual byte values.
          </p>
          <p>The most common hidden characters produced by Large Language Models include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Zero-Width Space (ZWSP - U+200B):</strong> Used in typesetting to indicate word breaks without forcing visual space.</li>
            <li><strong>Non-Breaking Space (NBSP - U+00A0):</strong> Prevents automatic line wrapping between adjacent words.</li>
            <li><strong>Byte Order Mark (BOM - U+FEFF):</strong> Inserted at text stream beginnings to indicate endianness.</li>
            <li><strong>Soft Hyphen (SHY - U+00AD):</strong> Indicates hyphenation points inside long words.</li>
          </ul>

          <h2>Why Do AI Models Generate Them?</h2>
          <p>AI models do not intentionally "secretly watermark" text in most consumer interfaces. Instead, hidden characters enter AI output through three main channels:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Training Data Artifacts:</strong> LLMs are trained on billions of scraped web pages, HTML documents, and e-books containing invisible layout formatting controls.
            </li>
            <li>
              <strong>Tokenization Mechanics:</strong> Byte-Pair Encoding (BPE) tokenizers group text into sub-word tokens. Certain token boundaries preserve non-standard unicode spaces.
            </li>
            <li>
              <strong>Web App Renderers:</strong> Modern chat UIs (like chatgpt.com or claude.ai) use rich-text React engines that insert non-breaking spaces and zero-width spaces for smooth CSS rendering.
            </li>
          </ol>

          <h2>How to Clean Invisible Characters</h2>
          <p>
            You can automatically sanitize text using client-side tool utilities like <Link href="/" className="text-primary-700 font-bold underline">AI Text Cleaner</Link> or dedicated single-purpose tools like our <Link href="/remove-zero-width-space" className="text-primary-700 font-bold underline">Zero-Width Space Remover</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
