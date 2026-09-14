"use client";

import { useState } from "react";
import Link from "next/link";

interface KeyTakeaway {
  title: string;
  desc: string;
}

interface OtherGuide {
  title: string;
  category: string;
  readTime: string;
  slug: string;
}

interface BlogDetailTemplateProps {
  title: string;
  subtitle: string;
  category: string;
  categoryTag: string;
  date: string;
  readTime: string;
  authorName?: string;
  authorHandle?: string;
  tldrSummary: string;
  tldrPoints: KeyTakeaway[];
  children: React.ReactNode;
  currentSlug: string;
  articleJsonLd?: Record<string, unknown>;
}

const allGuides: OtherGuide[] = [
  {
    slug: "why-ai-text-has-invisible-characters",
    title: "Why ChatGPT & LLMs Inject Invisible Unicode Characters into Output",
    category: "AI & Formatting",
    readTime: "6 min read",
  },
  {
    slug: "how-to-clean-chatgpt-text-for-publishing",
    title: "The Complete Guide to Cleaning ChatGPT Text for WordPress & Google Docs",
    category: "Content Publishing",
    readTime: "8 min read",
  },
  {
    slug: "understanding-zero-width-spaces-and-unicode-artifacts",
    title: "Understanding Zero-Width Spaces (U+200B) & Developer Debugging Guide",
    category: "Technical Deep-Dive",
    readTime: "11 min read",
  },
  {
    slug: "how-pdf-metadata-exposes-identity",
    title: "How PDF Metadata Exposes Your Real Identity & Location",
    category: "Security & Forensics",
    readTime: "5 min read",
  },
  {
    slug: "overused-llm-cliches-delve-tapestry",
    title: "Overused LLM Clichés: Why AI Models Love Delve, Tapestry, and Testament",
    category: "AI Writing & Tone",
    readTime: "7 min read",
  },
];

export default function BlogDetailTemplate({
  title,
  subtitle,
  category,
  categoryTag,
  date,
  readTime,
  authorName = "Inam Ilyas",
  authorHandle = "github.com/inaamilyas",
  tldrSummary,
  tldrPoints,
  children,
  currentSlug,
  articleJsonLd,
}: BlogDetailTemplateProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [quickInput, setQuickInput] = useState("");
  const [quickCleanStatus, setQuickCleanStatus] = useState<"idle" | "cleaned">("idle");

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleQuickClean = () => {
    const textToClean = quickInput.trim()
      ? quickInput
      : "In modern digital pipelines\u200B, it is pivotal to delve into the core infrastructure\uFEFF.";
    const cleaned = textToClean
      .replace(/[\u200B-\u200D\uFEFF\u00AD\u2060]/g, "")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\bdelve into\b/gi, "examine");
    setQuickInput(cleaned);
    setQuickCleanStatus("cleaned");
    setTimeout(() => setQuickCleanStatus("idle"), 2200);
  };

  const otherGuides = allGuides.filter((g) => g.slug !== currentSlug);

  return (
    <div className="w-full bg-background flex-1">
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}

      {/* Blog Article Hero / Header Area */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant/30">
        <div className="container mx-auto px-4 md:px-8 pt-8 pb-10">
          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-4 font-label-md">
            <Link
              href="/blog"
              className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              Guides &amp; Articles
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/blog" className="hover:text-primary transition-colors font-medium">
              {category}
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold truncate max-w-[240px] sm:max-w-md">
              {categoryTag}
            </span>
          </nav>

          {/* Main Headline & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="font-display-lg text-display-lg font-semibold text-on-surface tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed mb-6 font-normal">
              {subtitle}
            </p>
          </div>

          {/* Metadata & Social Sharing Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-surface-container">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-on-surface-variant">
              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                  II
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-on-surface flex items-center gap-1 text-xs">
                    {authorName}
                    <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-code-stat">{authorHandle}</span>
                </div>
              </div>
              <div className="h-4 w-[1px] bg-outline-variant/40 hidden sm:block" />

              {/* Published Date */}
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-outline">calendar_today</span>
                <span>{date}</span>
              </div>
              <div className="h-4 w-[1px] bg-outline-variant/40 hidden sm:block" />

              {/* Read Time */}
              <div className="flex items-center gap-1 font-code-stat text-code-stat">
                <span className="material-symbols-outlined text-[15px] text-outline">schedule</span>
                <span>{readTime.toUpperCase()}</span>
              </div>
              <div className="h-4 w-[1px] bg-outline-variant/40 hidden sm:block" />

              {/* Category Tag */}
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-code-stat text-[11px] font-semibold tracking-wide">
                {categoryTag.toUpperCase()}
              </span>
            </div>

            {/* Share & Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-medium transition-colors flex items-center gap-1.5 border border-outline-variant/40 cursor-pointer"
                id="copyLinkBtn"
              >
                <span className="material-symbols-outlined text-[15px]">{copiedLink ? "check" : "link"}</span>
                <span id="copyLinkText">{copiedLink ? "Link Copied!" : "Copy Link"}</span>
              </button>
              <button
                type="button"
                onClick={() => setBookmarked(!bookmarked)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-outline-variant/40 cursor-pointer ${
                  bookmarked
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {bookmarked ? "bookmark" : "bookmark_border"}
                </span>
                <span>{bookmarked ? "Saved" : "Bookmark"}</span>
              </button>
            </div>
          </div>

          {/* Quick Summary / TL;DR Box */}
          <div className="mt-8 bg-surface-container-low border-l-4 border-primary rounded-xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <span className="font-code-stat text-xs uppercase tracking-wider text-primary font-bold">
                Quick Summary &amp; Key Takeaways (TL;DR)
              </span>
            </div>
            <p className="text-sm text-on-surface leading-relaxed mb-3">{tldrSummary}</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-on-surface-variant font-medium">
              {tldrPoints.map((pt, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>{pt.title}:</strong> {pt.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Main Two-Column Editorial Grid */}
      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Article Content (8 cols) */}
          <article className="lg:col-span-8 space-y-10 text-on-surface">{children}</article>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Try AI Text Cleaner Quick Widget */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                </div>
                <h3 className="font-bold text-sm text-on-surface">Instant Text Cleaner</h3>
              </div>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Test your text right now. Remove zero-width spaces, strip AI markers, and normalize formatting in 1-click.
              </p>
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/30 mb-3">
                <textarea
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="Paste suspected AI text here..."
                  className="w-full bg-transparent border-0 resize-none text-xs font-code-stat text-on-surface focus:outline-none focus:ring-0 p-0 h-16 placeholder:text-outline"
                  id="quickInput"
                />
              </div>
              <button
                type="button"
                onClick={handleQuickClean}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer ${
                  quickCleanStatus === "cleaned"
                    ? "bg-emerald-600 text-white"
                    : "bg-primary hover:bg-primary-container text-on-primary"
                }`}
                id="quickCleanBtn"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {quickCleanStatus === "cleaned" ? "check" : "cleaning_services"}
                </span>
                <span>{quickCleanStatus === "cleaned" ? "Sanitized In-Memory!" : "Sanitize In-Browser"}</span>
              </button>
              <div className="flex items-center justify-center gap-1 mt-2.5 text-[11px] font-code-stat text-outline">
                <span className="material-symbols-outlined text-[12px] text-emerald-600">lock</span>
                <span>Zero server logs • 100% private</span>
              </div>
            </div>

            {/* Other Blogs & Recommended Reads Widget */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
                <h3 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">library_books</span>
                  Other Blogs &amp; Guides
                </h3>
                <Link href="/blog" className="text-xs font-semibold text-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="space-y-3.5">
                {otherGuides.map((guide, idx) => (
                  <div key={guide.slug}>
                    <Link href={`/blog/${guide.slug}`} className="group block space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-code-stat text-outline">
                        <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                          {guide.category}
                        </span>
                        <span>• {guide.readTime}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug">
                        {guide.title}
                      </h4>
                    </Link>
                    {idx < otherGuides.length - 1 && <div className="h-[1px] bg-surface-container mt-3.5" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Topics Tags / Chips */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-wider text-outline mb-3 font-code-stat">
                Popular Topics
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "#Unicode",
                  "#ClientSidePrivacy",
                  "#ChatGPT Formatting",
                  "#ZeroWidthSpace",
                  "#Sanitization",
                  "#PDFMetadata",
                  "#LLMPrompts",
                  "#CleanCopy",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href="/blog"
                    className="px-2.5 py-1 rounded-md bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-medium transition-colors border border-outline-variant/30"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Featured Cleaners & Core Tools Section */}
      <section className="w-full bg-surface-container-lowest py-12 border-t border-outline-variant/30" id="interactive-suite">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <span className="font-code-stat text-xs font-bold text-primary tracking-wider uppercase">
                Our Recommended Solutions
              </span>
              <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                Featured Cleaners &amp; Sanitization Tools
              </h2>
            </div>
            <p className="text-xs text-on-surface-variant font-code-stat">ALL TOOLS FREE • NO SIGNUP REQUIRED</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tool 1 */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors mb-1.5">
                  Clean ChatGPT Text
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Instantly strips ChatGPT markdown blocks, repetitive transitional phrases, zero-width characters, and curled quotes.
                </p>
              </div>
              <Link
                href="/clean-chatgpt-text"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
              >
                <span>Launch Tool</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors mb-1.5">
                  Clean Claude Text
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Removes artifact delimiters, XML framing tags, and conversational preambles from Anthropic Claude prompts.
                </p>
              </div>
              <Link
                href="/clean-claude-text"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
              >
                <span>Launch Tool</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">space_bar</span>
                </div>
                <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors mb-1.5">
                  Zero-Width Space Remover
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Surgically purges U+200B, U+200C, U+200D, and U+FEFF markers that cause terminal script crashes and broken JSON strings.
                </p>
              </div>
              <Link
                href="/remove-zero-width-space"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
              >
                <span>Launch Tool</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Tool 4 */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                </div>
                <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors mb-1.5">
                  Invisible Character Remover
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Visually highlights unseen unicode glyphs and removes control codes, soft hyphens, and zero-width spaces in 1 click.
                </p>
              </div>
              <Link
                href="/remove-invisible-characters"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
              >
                <span>Launch Tool</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Tool 5 */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                </div>
                <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors mb-1.5">
                  PDF Metadata Sanitizer
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Scans and clears author name fields, generation timestamps, software stamps, and hidden XMP tags from exported documents.
                </p>
              </div>
              <Link
                href="/clean-pdf-metadata"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
              >
                <span>Launch Tool</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Tool 6 */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors mb-1.5">
                  AI Text Humanizer
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Removes boilerplate AI terminology, eliminates robotic sentence symmetry, and restores natural conversational cadence.
                </p>
              </div>
              <Link
                href="/humanize-ai-text"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
              >
                <span>Launch Tool</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Row Interactive Tools Ecosystem Directory */}
      <section className="w-full bg-surface py-12 border-t border-outline-variant/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-3 border-b border-surface-container">
            <div>
              <span className="font-code-stat text-xs font-bold text-primary uppercase tracking-wider">
                Ecosystem Suite
              </span>
              <h2 className="text-xl font-bold text-on-surface">All In-Browser Client Tools</h2>
            </div>
            <Link href="/" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              Explore All 20+ Utilities <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
          <div className="space-y-6">
            {/* Row 1: Dedicated AI Platform Cleaners */}
            <div className="space-y-2">
              <span className="font-code-stat text-[11px] text-outline uppercase font-semibold">
                Row 01 // Dedicated AI Platform Cleaners
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link
                  href="/clean-chatgpt-text"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Clean ChatGPT Text
                  </span>
                </Link>
                <Link
                  href="/clean-claude-text"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Clean Claude Text
                  </span>
                </Link>
                <Link
                  href="/clean-claude-code"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">terminal</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Clean Claude Code
                  </span>
                </Link>
                <Link
                  href="/clean-gemini-text"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Clean Gemini Text
                  </span>
                </Link>
                <Link
                  href="/clean-copilot-text"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">code_blocks</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Clean Copilot Text
                  </span>
                </Link>
              </div>
            </div>

            {/* Row 2: Precision Text Utilities */}
            <div className="space-y-2">
              <span className="font-code-stat text-[11px] text-outline uppercase font-semibold">
                Row 02 // Precision Text Utilities
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  href="/remove-ai-words"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">delete_sweep</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Remove AI Buzzwords
                  </span>
                </Link>
                <Link
                  href="/remove-zero-width-space"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">space_bar</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Zero-Width Space Remover
                  </span>
                </Link>
                <Link
                  href="/remove-invisible-characters"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">visibility_off</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Invisible Character Remover
                  </span>
                </Link>
                <Link
                  href="/markdown-to-plain-text"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">markdown</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Markdown to Plain Text
                  </span>
                </Link>
              </div>
            </div>

            {/* Row 3: Security & Analyzers */}
            <div className="space-y-2">
              <span className="font-code-stat text-[11px] text-outline uppercase font-semibold">
                Row 03 // Security Sanitizers &amp; Analyzers
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  href="/clean-unicode-homoglyphs"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Unicode Homoglyphs
                  </span>
                </Link>
                <Link
                  href="/clean-pdf-metadata"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">picture_as_pdf</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    PDF Metadata Sanitizer
                  </span>
                </Link>
                <Link
                  href="/remove-zero-width-space"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">water_drop</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    AI Watermark Remover
                  </span>
                </Link>
                <Link
                  href="/check-readability-score"
                  className="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-lg flex items-center gap-2.5 transition-colors group border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">analytics</span>
                  <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">
                    Readability &amp; Grade Checker
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Signature Micro-bar */}
      <div className="w-full bg-surface-container py-space-sm">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between text-on-surface-variant font-code-stat text-code-stat">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Engineered by Inam Ilyas</span>
          </div>
          <a
            className="hover:text-on-surface transition-colors flex items-center gap-1"
            href="https://github.com/inaamilyas/ai-text-cleaner"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>GitHub Repository</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}
