import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Understanding Zero-Width Spaces (U+200B) & Developer Debugging Guide",
  description:
    "A deep technical breakdown of Unicode zero-width spaces (U+200B, ZWSP), non-breaking spaces (U+00A0), and byte order marks (U+FEFF).",
  alternates: {
    canonical: "/blog/understanding-zero-width-spaces-and-unicode-artifacts",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Understanding Zero-Width Spaces (U+200B) & Developer Debugging Guide",
  description:
    "A deep technical breakdown of Unicode zero-width spaces (U+200B, ZWSP), non-breaking spaces, and byte order marks.",
  datePublished: "2026-09-03",
  author: {
    "@type": "Organization",
    name: "AI Text Cleaner Developer Team",
  },
};

export default function ArticleThreePage() {
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
            Technical Deep-Dive
          </span>
          <h1>Understanding Zero-Width Spaces (U+200B) & Developer Debugging Guide</h1>
          <div className="flex items-center gap-4 text-body-sm text-neutral-500 border-b border-neutral-200 pb-6">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> AI Text Cleaner Developer Team
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> September 3, 2026
            </span>
          </div>
        </div>

        <div className="prose max-w-none flex flex-col gap-6 text-body-md text-neutral-700 leading-relaxed">
          <p className="text-body-lg text-neutral-800 font-medium">
            For software developers, database administrators, and DevOps engineers, invisible characters are notorious silent killers that break string comparisons and JSON parsing.
          </p>

          <h2>Unicode Hex Reference Table</h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-neutral-100 font-bold border-b border-neutral-200">
                <tr>
                  <th className="p-3">Character</th>
                  <th className="p-3">Hex</th>
                  <th className="p-3">Common Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-3 font-bold">Zero-Width Space</td>
                  <td className="p-3 font-mono text-primary-700">U+200B</td>
                  <td className="p-3">ChatGPT, Claude, HTML renderers</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Byte Order Mark</td>
                  <td className="p-3 font-mono text-primary-700">U+FEFF</td>
                  <td className="p-3">Windows Notepad, UTF-8 text streams</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Non-Breaking Space</td>
                  <td className="p-3 font-mono text-primary-700">U+00A0</td>
                  <td className="p-3">Web pages, Rich text editors</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>How to Strip Zero-Width Spaces in JavaScript & Python</h2>

          <h3>JavaScript / Node.js Regex:</h3>
          <pre className="bg-neutral-900 text-neutral-50 p-4 rounded-lg overflow-x-auto font-mono text-body-xs">
            {`const clean = dirtyText.replace(/\\u200B/g, '');`}
          </pre>

          <h3>Python 3 Regex:</h3>
          <pre className="bg-neutral-900 text-neutral-50 p-4 rounded-lg overflow-x-auto font-mono text-body-xs">
            {`import re\nclean_text = re.sub(r'\\u200b', '', dirty_text)`}
          </pre>

          <h2>Instant Online Debugger</h2>
          <p>
            Rather than writing custom regex scripts for every project, use our dedicated <Link href="/remove-zero-width-space" className="text-primary-700 font-bold underline">Zero-Width Space Remover</Link> utility for instant browser-based sanitization.
          </p>
        </div>
      </div>
    </>
  );
}
