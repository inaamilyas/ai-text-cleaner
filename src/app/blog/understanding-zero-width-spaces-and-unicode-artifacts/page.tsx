import type { Metadata } from "next";
import Link from "next/link";
import BlogDetailTemplate from "@/components/BlogDetailTemplate";

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
    "A deep technical breakdown of Unicode zero-width spaces (U+200B, ZWSP), non-breaking spaces (U+00A0), and byte order marks (U+FEFF).",
  datePublished: "2026-09-03",
  dateModified: "2026-09-14",
  author: {
    "@type": "Person",
    name: "Inam Ilyas",
    url: "https://github.com/inaamilyas",
  },
  publisher: {
    "@type": "Organization",
    name: "AI Text Cleaner",
    url: "https://aitextcleaner.com",
  },
};

export default function ArticleThreePage() {
  return (
    <BlogDetailTemplate
      currentSlug="understanding-zero-width-spaces-and-unicode-artifacts"
      title="Understanding Zero-Width Spaces (U+200B) & Developer Debugging Guide"
      subtitle="A deep technical breakdown of Unicode zero-width spaces (U+200B, ZWSP), non-breaking spaces (U+00A0), byte order marks (U+FEFF), and automated developer triage."
      category="Technical Deep-Dive"
      categoryTag="Developer Guide"
      date="September 3, 2026"
      readTime="11 min read"
      authorName="Inam Ilyas"
      authorHandle="github.com/inaamilyas"
      articleJsonLd={articleJsonLd}
      tldrSummary="Zero-width unicode code points occupy 0 visual width on screen while injecting invisible 3-byte sequences into raw strings. They frequently break JSON parsers, database string matching, and terminal scripts."
      tldrPoints={[
        {
          title: "Zero-Width Spaces",
          desc: "U+200B and U+FEFF are silent culprits behind invalid token syntax bugs.",
        },
        {
          title: "Regex Filters",
          desc: "Target character range [\\u200B-\\u200D\\uFEFF] in JavaScript and Python.",
        },
        {
          title: "Client-Side Tools",
          desc: "Sanitize megabyte-scale files in browser memory without API dependencies.",
        },
      ]}
    >
      {/* Section 1 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold tracking-widest uppercase">
          <span>Section 01</span>
          <span>//</span>
          <span>Unicode Anatomy</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          What Are Zero-Width Characters?
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          For software developers, database administrators, and DevOps engineers, invisible characters are notorious silent killers that break string equality checks, crash JSON parsers, and produce mysterious compiler syntax errors.
        </p>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Unicode defines several control characters intended for word wrapping, bidirectional text shaping, or document byte-order identification. When these slip into copy-pasted code or serialized payloads, traditional ASCII assumptions fail catastrophically.
        </p>

        {/* Reference Table */}
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40 space-y-3">
          <span className="font-mono text-xs font-semibold text-outline uppercase tracking-wider block">
            Unicode Hex &amp; Source Reference Table
          </span>
          <div className="overflow-x-auto rounded-lg border border-outline-variant/30 bg-surface-container-lowest">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-container font-bold border-b border-outline-variant/20 text-on-surface">
                <tr>
                  <th className="p-3">Character Name</th>
                  <th className="p-3">Codepoint</th>
                  <th className="p-3">UTF-8 Bytes</th>
                  <th className="p-3">Common Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                <tr>
                  <td className="p-3 font-semibold text-on-surface">Zero-Width Space (ZWSP)</td>
                  <td className="p-3 font-bold text-primary">U+200B</td>
                  <td className="p-3">E2 80 8B</td>
                  <td className="p-3 font-sans">ChatGPT, Claude, HTML renderers</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-on-surface">Byte Order Mark (BOM)</td>
                  <td className="p-3 font-bold text-primary">U+FEFF</td>
                  <td className="p-3">EF BB BF</td>
                  <td className="p-3 font-sans">Windows Notepad, UTF-8 text streams</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-on-surface">Non-Breaking Space (NBSP)</td>
                  <td className="p-3 font-bold text-primary">U+00A0</td>
                  <td className="p-3">C2 A0</td>
                  <td className="p-3 font-sans">Rich-text editors, Web browsers</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-on-surface">Zero-Width Non-Joiner (ZWNJ)</td>
                  <td className="p-3 font-bold text-primary">U+200C</td>
                  <td className="p-3">E2 80 8C</td>
                  <td className="p-3 font-sans">Complex script ligatures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4 pt-4 border-t border-surface-container">
        <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold tracking-widest uppercase">
          <span>Section 02</span>
          <span>//</span>
          <span>Developer Remediation</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          How to Strip Zero-Width Spaces in Production Code
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          If you are building backend APIs, sanitizing customer form submissions, or preprocessing training datasets, here are production-ready snippets in JavaScript/TypeScript and Python:
        </p>

        {/* JS Code Box */}
        <div className="bg-[#1e1e24] rounded-xl overflow-hidden shadow-sm text-slate-200">
          <div className="flex items-center justify-between px-4 py-2 bg-[#16161a] border-b border-white/10 text-xs font-mono">
            <span className="text-slate-400">cleanseUnicode.ts (Node.js &amp; Browser)</span>
            <span className="text-emerald-400">TypeScript</span>
          </div>
          <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-200">
            <code>
              <span className="text-purple-400">export const</span> <span className="text-blue-400">stripInvisibleChars</span> = (str: <span className="text-emerald-400">string</span>): <span className="text-emerald-400">string</span> =&gt; {"{\n"}
              {"  "}return str.replace(<span className="text-amber-300">/[\u200B-\u200D\uFEFF\u00AD\u2060]/g</span>, <span className="text-amber-300">&quot;&quot;</span>);{"\n"}
              {"}"};
            </code>
          </pre>
        </div>

        {/* Python Code Box */}
        <div className="bg-[#1e1e24] rounded-xl overflow-hidden shadow-sm text-slate-200 mt-4">
          <div className="flex items-center justify-between px-4 py-2 bg-[#16161a] border-b border-white/10 text-xs font-mono">
            <span className="text-slate-400">cleanse_unicode.py</span>
            <span className="text-emerald-400">Python 3</span>
          </div>
          <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-200">
            <code>
              <span className="text-purple-400">import</span> re{"\n\n"}
              <span className="text-purple-400">def</span> <span className="text-blue-400">strip_invisible_chars</span>(raw_text: <span className="text-emerald-400">str</span>) -&gt; <span className="text-emerald-400">str</span>:{"\n"}
              {"    "}<span className="text-slate-500"># Strip ZWSP, ZWNJ, ZWJ, BOM, and soft hyphens</span>{"\n"}
              {"    "}pattern = re.compile(<span className="text-amber-300">r&quot;[\u200b-\u200d\ufeff\u00ad\u2060]&quot;</span>){"\n"}
              {"    "}return pattern.sub(<span className="text-amber-300">&quot;&quot;</span>, raw_text){"\n"}
            </code>
          </pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4 pt-4 border-t border-surface-container">
        <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold tracking-widest uppercase">
          <span>Section 03</span>
          <span>//</span>
          <span>In-Browser Tooling</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          Instant Zero-Setup Debugging
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Rather than writing custom one-off scripts for ad-hoc debugging, use our dedicated in-browser <Link href="/remove-zero-width-space" className="text-primary font-bold hover:underline">Zero-Width Space Remover</Link> utility. It highlights invisible codepoints with high-contrast colored badges and calculates precise byte-level overhead.
        </p>

        {/* Key Takeaway Callout */}
        <div className="p-6 rounded-xl bg-primary text-white relative overflow-hidden shadow-sm mt-6">
          <div className="relative z-10 flex items-start gap-3">
            <span className="material-symbols-outlined text-[28px] shrink-0 text-white/90">format_quote</span>
            <div>
              <p className="text-base font-semibold text-white leading-snug mb-2">
                &quot;What you cannot see in your editor can still break your parser. Explicit byte-level inspection is the only true defense against phantom unicode bugs.&quot;
              </p>
              <span className="font-mono text-xs text-white/80 block font-medium">
                — Developer Tools Team, AI Text Cleaner
              </span>
            </div>
          </div>
        </div>
      </section>
    </BlogDetailTemplate>
  );
}
