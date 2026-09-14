"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolsSuiteShowcase from "@/components/ToolsSuiteShowcase";

interface Article {
  slug: string;
  title: string;
  category: string;
  categoryKey: "ai-formatting" | "content-ops" | "deep-dive" | "security";
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  keywords: string;
}

const articlesData: Article[] = [
  {
    slug: "why-ai-text-has-invisible-characters",
    title: "Why ChatGPT & LLMs Inject Invisible Unicode Characters into Output",
    category: "AI & Formatting",
    categoryKey: "ai-formatting",
    date: "September 5, 2026",
    readTime: "6 min read",
    excerpt:
      "Ever copied text from ChatGPT, Claude, or DeepSeek into Google Docs or VS Code and noticed erratic line breaks, backspace stuttering, or regex parsing failures? We deconstruct the exact tokenization mechanics that introduce byte-level invisible artifacts into everyday AI outputs.",
    tags: ["#Unicode", "#ChatGPT", "#ZeroWidthSpace", "#LLMArtifacts"],
    keywords: "chatgpt claude unicode zero width space u200b artifacts llm formatting deepseek tokens",
  },
  {
    slug: "how-to-clean-chatgpt-text-for-publishing",
    title: "The Complete Guide to Cleaning ChatGPT Text for WordPress & Google Docs",
    category: "Content Publishing",
    categoryKey: "content-ops",
    date: "September 4, 2026",
    readTime: "8 min read",
    excerpt:
      "Learn how to strip raw Markdown tags, double bold asterisks, curly quote mismatches, and AI buzzword transitions before publishing to CMS platforms or submitting corporate documentation.",
    tags: ["#WordPress", "#GoogleDocs", "#MarkdownStripper", "#ContentOps"],
    keywords: "wordpress google docs markdown asterisks smart quotes cms content operations",
  },
  {
    slug: "understanding-zero-width-spaces-and-unicode-artifacts",
    title: "Understanding Zero-Width Spaces (U+200B) & Developer Debugging Guide",
    category: "Technical Deep-Dive",
    categoryKey: "deep-dive",
    date: "September 3, 2026",
    readTime: "11 min read",
    excerpt:
      "A deep technical breakdown of Unicode zero-width spaces (U+200B, ZWSP), non-breaking spaces (U+00A0), and byte order marks (U+FEFF) in web dev, database indexing, and V8 string engines.",
    tags: ["#U200B", "#UTF8", "#V8Engine", "#WebDev"],
    keywords: "zero width space u200b utf8 v8 byte order mark ufeff debugging developer zwsp regex",
  },
  {
    slug: "how-pdf-metadata-exposes-identity",
    title: "How PDF Metadata Exposes Your Real Identity & Location",
    category: "Security & Forensics",
    categoryKey: "security",
    date: "August 28, 2026",
    readTime: "5 min read",
    excerpt:
      "Discover how standard PDF exports embed operating system usernames, author stamps, print queues, and Adobe XMP schema logs, and how client-side scrubbing eliminates forensic footprints.",
    tags: ["#PDFSanitizer", "#PrivacyFirst", "#Metadata", "#EXIF"],
    keywords: "pdf metadata security forensics privacy exif xmp username redaction gps author",
  },
  {
    slug: "overused-llm-cliches-delve-tapestry",
    title: "Overused LLM Clichés: Why AI Models Love Delve, Tapestry, and Testament",
    category: "AI Writing & Tone",
    categoryKey: "ai-formatting",
    date: "August 20, 2026",
    readTime: "7 min read",
    excerpt:
      "An empirical analysis of RLHF reward models and frequency optimization biases that lead Claude and ChatGPT to generate predictable transitional structures and decorative filler phrases.",
    tags: ["#AIHumanizer", "#Buzzwords", "#RLHF", "#WritingTips"],
    keywords: "cliches delve tapestry testament rlhf writing tone ai humanizer buzzwords",
  },
];

const referenceCharacters = [
  {
    name: "Zero-Width Space (ZWSP)",
    codepoint: "U+200B",
    hex: "E2 80 8B",
    source: "ChatGPT, Claude markdown blocks",
    action: "Stripped (0-byte)",
    char: "\u200B",
  },
  {
    name: "Byte Order Mark (BOM)",
    codepoint: "U+FEFF",
    hex: "EF BB BF",
    source: "API responses & Copilot streams",
    action: "Stripped (0-byte)",
    char: "\uFEFF",
  },
  {
    name: "Non-Breaking Space (NBSP)",
    codepoint: "U+00A0",
    hex: "C2 A0",
    source: "Google Gemini line wraps",
    action: "Normalized (0x20 Space)",
    char: "\u00A0",
  },
  {
    name: "Zero-Width Non-Joiner (ZWNJ)",
    codepoint: "U+200C",
    hex: "E2 80 8C",
    source: "Persian / Arabic AI scripts",
    action: "Context-Stripped",
    char: "\u200C",
  },
  {
    name: "Soft Hyphen (SHY)",
    codepoint: "U+00AD",
    hex: "C2 AD",
    source: "PDF extract & web scraping LLMs",
    action: "Stripped (0-byte)",
    char: "\u00AD",
  },
  {
    name: "Left/Right Double Quotes",
    codepoint: "U+201C / U+201D",
    hex: "E2 80 9C / 9D",
    source: "All conversational models",
    action: "Converted to straight (\")",
    char: "\"",
  },
];

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchesFilter =
        selectedFilter === "all" || article.categoryKey === selectedFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.keywords.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const handleCopyChar = (char: string, codepoint: string) => {
    navigator.clipboard.writeText(char);
    setCopiedChar(codepoint);
    setTimeout(() => setCopiedChar(null), 2000);
  };

  const heroArticle = filteredArticles[0] || articlesData[0];
  const gridArticles = filteredArticles.length > 1
    ? filteredArticles.slice(1)
    : filteredArticles.length === 1 && searchQuery
    ? []
    : articlesData.slice(1);

  return (
    <div className="w-full bg-background min-h-screen py-space-lg">
      <span className="sr-only">
        Guides &amp; Articles — AI Text Cleaner Blog (1140px Centered) | AI Text Cleaner
      </span>
      <div className="max-w-[1140px] mx-auto px-4 md:px-8 flex flex-col w-full">
        {/* Sub-nav Context Ribbon */}
        <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary-fixed text-on-primary-fixed">
              <span className="material-symbols-outlined text-[15px]">terminal</span>
            </span>
            <span className="font-code-stat text-code-stat uppercase tracking-wider text-primary">
              KNOWLEDGE BASE // TECHNICAL RESOURCE LIBRARY
            </span>
          </div>
          <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Verified Engineering Guides
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-tertiary">100% Free &amp; Open Access</span>
            <span className="text-outline-variant">•</span>
            <span className="font-code-stat text-code-stat text-outline">SPEC v2.6.4</span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="w-full mb-space-xl">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed font-code-stat text-code-stat uppercase tracking-wider mb-space-sm">
                <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                ENGINEERING &amp; CONTENT GUIDES
              </div>
              <h1 className="font-headline-lg text-headline-lg md:text-display-lg md:font-display-lg text-on-surface tracking-tight mb-space-xs">
                Guides &amp; Resource Library
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-lg max-w-2xl">
                Educational guides on AI formatting artifacts, unicode control characters, markdown parsing idiosyncrasies, and privacy-first content sanitization.
              </p>
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-space-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[16px]">menu_book</span>
                  <span className="font-medium">5 Technical Whitepapers</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[16px]">lock_open</span>
                  <span className="font-medium">Zero Paywalls / No Gating</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[16px]">update</span>
                  <span className="font-medium">Updated Weekly for LLM Releases</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Controls Bar */}
        <section className="w-full mb-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, error codes, unicode points (e.g. U+200B, markdown, CMS)..."
                className="w-full pl-9 pr-14 py-2 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-code-stat text-code-stat px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary pointer-events-none">⌘K</span>
            </div>
            {/* Filter Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-code-stat text-code-stat tracking-normal transition-colors whitespace-nowrap ${
                  selectedFilter === "all"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                All Resources (5)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("ai-formatting")}
                className={`px-3 py-1.5 rounded-lg font-code-stat text-code-stat tracking-normal transition-colors whitespace-nowrap ${
                  selectedFilter === "ai-formatting"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                AI &amp; Formatting
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("content-ops")}
                className={`px-3 py-1.5 rounded-lg font-code-stat text-code-stat tracking-normal transition-colors whitespace-nowrap ${
                  selectedFilter === "content-ops"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                Content Publishing
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("deep-dive")}
                className={`px-3 py-1.5 rounded-lg font-code-stat text-code-stat tracking-normal transition-colors whitespace-nowrap ${
                  selectedFilter === "deep-dive"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                Technical Deep-Dive
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("security")}
                className={`px-3 py-1.5 rounded-lg font-code-stat text-code-stat tracking-normal transition-colors whitespace-nowrap ${
                  selectedFilter === "security"
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                Security &amp; Forensics
              </button>
            </div>
          </div>
        </section>

        {/* Featured / Hero Article Spotlight */}
        {heroArticle && (
          <section className="w-full mb-space-lg">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                {/* Left Column: Details */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-space-sm">
                      <span className="px-2.5 py-0.5 rounded-lg bg-primary text-on-primary font-code-stat text-code-stat uppercase tracking-wider">
                        MOST POPULAR
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-code-stat text-code-stat">
                        {heroArticle.category}
                      </span>
                      <span className="text-outline-variant">•</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{heroArticle.date}</span>
                      <span className="text-outline-variant">•</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">schedule</span> {heroArticle.readTime}
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface hover:text-primary transition-colors mb-space-sm">
                      <Link href={`/blog/${heroArticle.slug}`}>
                        {heroArticle.title}
                      </Link>
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                      {heroArticle.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-space-lg font-code-stat text-code-stat text-secondary">
                      {heroArticle.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-surface-container">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-code-stat text-code-stat font-bold">
                        II
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-medium">Inam Ilyas</p>
                        <p className="font-code-stat text-code-stat text-outline">Lead Systems Engineer</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${heroArticle.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary !text-white hover:bg-primary-container font-medium text-xs tracking-normal transition-all shadow-sm shrink-0 cursor-pointer"
                    >
                      <span className="!text-white font-medium">Read Full Article</span>
                      <span className="material-symbols-outlined text-[15px] !text-white">arrow_forward</span>
                    </Link>

                  </div>
                </div>

                {/* Right Column: Diagnostic Sandbox Diff Box */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl bg-surface-container p-space-md">
                    <div className="flex items-center justify-between pb-space-xs mb-space-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-error" />
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="font-code-stat text-code-stat text-secondary ml-1">byte-inspector.raw</span>
                      </div>
                      <span className="font-code-stat text-code-stat px-2 py-0.5 rounded bg-surface-container-highest text-primary">UTF-8 HEX</span>
                    </div>
                    <div className="space-y-space-xs font-code-stat text-code-stat">
                      <div className="p-2.5 rounded-lg bg-surface-container-lowest">
                        <p className="text-outline uppercase text-[10px] mb-1">// LLM Raw Clipboard Stream</p>
                        <p className="text-on-surface break-all leading-relaxed">
                          &quot;The<span className="bg-error-container text-error px-1 py-0.5 rounded font-bold">\u200B</span>future<span className="bg-error-container text-error px-1 py-0.5 rounded font-bold">\uFEFF</span>of<span className="bg-error-container text-error px-1 py-0.5 rounded font-bold">\u00A0</span>technology&quot;
                        </p>
                      </div>
                      <div className="flex justify-center py-0.5">
                        <span className="material-symbols-outlined text-outline text-[16px]">expand_more</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-lowest">
                        <p className="text-outline uppercase text-[10px] mb-1">// Sanitized V8 String (Client-Side)</p>
                        <p className="text-on-surface break-all leading-relaxed">
                          &quot;The<span className="bg-secondary-container text-secondary px-1 py-0.5 rounded font-medium"> </span>future<span className="bg-secondary-container text-secondary px-1 py-0.5 rounded font-medium"> </span>of<span className="bg-secondary-container text-secondary px-1 py-0.5 rounded font-medium"> </span>technology&quot;
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-surface-container-high flex items-center justify-between text-on-surface-variant">
                        <span>Stripped: 3 Invisible Bytes</span>
                        <span className="text-primary font-semibold">0ms Latency</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Guides & Articles 2-Column Responsive Grid */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-xl">
          {gridArticles.map((post) => (
            <article
              key={post.slug}
              className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-space-sm">
                  <span className="px-2 py-0.5 rounded-lg bg-surface-container-high text-on-surface-variant font-code-stat text-code-stat">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                    <span>{post.date}</span>
                    <span className="text-outline-variant">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Visual Graphics specific to each card */}
                {post.slug === "how-to-clean-chatgpt-text-for-publishing" && (
                  <div className="h-32 w-full rounded-lg bg-surface-container mb-space-md flex items-center justify-center overflow-hidden relative">
                    <div className="flex items-center gap-4 text-secondary">
                      <div className="flex flex-col items-center gap-1 p-2 rounded bg-surface-container-lowest shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">terminal</span>
                        <span className="font-code-stat text-[10px]">Markdown</span>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[20px]">trending_flat</span>
                      <div className="flex flex-col items-center gap-1 p-2 rounded bg-primary-fixed text-on-primary-fixed shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">auto_fix_high</span>
                        <span className="font-code-stat text-[10px]">Sanitizer</span>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[20px]">trending_flat</span>
                      <div className="flex flex-col items-center gap-1 p-2 rounded bg-surface-container-lowest shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">article</span>
                        <span className="font-code-stat text-[10px]">Clean CMS</span>
                      </div>
                    </div>
                  </div>
                )}

                {post.slug === "understanding-zero-width-spaces-and-unicode-artifacts" && (
                  <div className="h-32 w-full rounded-lg bg-surface-container mb-space-md p-space-sm flex flex-col justify-center font-code-stat text-code-stat">
                    <div className="flex items-center justify-between text-outline text-[11px] mb-1">
                      <span>Codepoint: U+200B</span>
                      <span>UTF-8: 3 Bytes</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-1.5 rounded bg-surface-container-lowest shadow-sm">
                        <span className="text-[10px] text-outline block">BYTE 0</span>
                        <span className="font-bold text-primary">0xE2</span>
                      </div>
                      <div className="p-1.5 rounded bg-surface-container-lowest shadow-sm">
                        <span className="text-[10px] text-outline block">BYTE 1</span>
                        <span className="font-bold text-primary">0x80</span>
                      </div>
                      <div className="p-1.5 rounded bg-surface-container-lowest shadow-sm">
                        <span className="text-[10px] text-outline block">BYTE 2</span>
                        <span className="font-bold text-primary">0x8B</span>
                      </div>
                    </div>
                  </div>
                )}

                {post.slug === "how-pdf-metadata-exposes-identity" && (
                  <div className="h-32 w-full rounded-lg bg-surface-container mb-space-md p-space-sm flex items-center justify-around">
                    <div className="w-16 h-20 rounded bg-surface-container-lowest shadow-sm p-1.5 flex flex-col justify-between">
                      <span className="font-code-stat text-[10px] text-error font-bold">.PDF</span>
                      <div className="space-y-1">
                        <div className="h-1 bg-surface-container-highest rounded" />
                        <div className="h-1 bg-surface-container-highest rounded w-2/3" />
                      </div>
                      <span className="material-symbols-outlined text-[14px] text-error">badge</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">verified_user</span>
                    <div className="w-16 h-20 rounded bg-primary-fixed shadow-sm p-1.5 flex flex-col justify-between">
                      <span className="font-code-stat text-[10px] text-on-primary-fixed font-bold">ANON</span>
                      <div className="space-y-1">
                        <div className="h-1 bg-on-primary-fixed/20 rounded" />
                        <div className="h-1 bg-on-primary-fixed/20 rounded w-1/2" />
                      </div>
                      <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                    </div>
                  </div>
                )}

                {post.slug === "overused-llm-cliches-delve-tapestry" && (
                  <div className="h-32 w-full rounded-lg bg-surface-container mb-space-md p-space-sm flex items-center justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xs font-code-stat text-code-stat">
                      <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container line-through text-[11px]">&quot;delve&quot;</span>
                      <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container line-through text-[11px]">&quot;tapestry&quot;</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-secondary text-[11px]">&quot;testament&quot;</span>
                      <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container line-through text-[11px]">&quot;beacon&quot;</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-secondary text-[11px]">&quot;pivotal&quot;</span>
                      <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold text-[11px]">Concise Direct Prose</span>
                    </div>
                  </div>
                )}

                <h3 className="font-headline-md text-headline-md text-on-surface hover:text-primary transition-colors mb-space-xs">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-space-md font-code-stat text-code-stat text-secondary">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-surface-container">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-sm">
                <span className="font-label-sm text-label-sm text-on-surface">By <strong className="font-medium">Inam Ilyas</strong></span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-primary font-label-md text-label-md hover:underline"
                >
                  <span>Read Full Article</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Technical Diagnostic Cheat Sheet / Quick Reference Section */}
        <section className="w-full mb-space-xl">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md pb-space-sm border-b border-surface-container-highest">
              <div>
                <div className="inline-flex items-center gap-1.5 font-code-stat text-code-stat text-primary uppercase mb-1">
                  <span className="material-symbols-outlined text-[15px]">table_chart</span>
                  QUICK REFERENCE SHEET
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Unicode &amp; LLM Artifact Quick Lookup Table
                </h3>
              </div>
              <div className="text-outline font-label-sm text-label-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">info</span>
                Direct regex replacements applied during cleansing
              </div>
            </div>
            {/* Reference Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant font-code-stat text-code-stat uppercase tracking-wider">
                    <th className="p-space-sm rounded-l-lg">Character Name</th>
                    <th className="p-space-sm">Codepoint</th>
                    <th className="p-space-sm">UTF-8 Hex</th>
                    <th className="p-space-sm">Common AI Source</th>
                    <th className="p-space-sm">Cleaner Action</th>
                    <th className="p-space-sm text-right rounded-r-lg">Live Test</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {referenceCharacters.map((char) => (
                    <tr key={char.codepoint} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-sm font-medium text-on-surface">{char.name}</td>
                      <td className="p-space-sm font-code-stat text-primary">{char.codepoint}</td>
                      <td className="p-space-sm font-code-stat text-secondary">{char.hex}</td>
                      <td className="p-space-sm text-on-surface-variant">{char.source}</td>
                      <td className="p-space-sm">
                        <span className="px-2 py-0.5 rounded bg-error-container text-error font-code-stat text-code-stat">
                          {char.action}
                        </span>
                      </td>
                      <td className="p-space-sm text-right">
                        <button
                          type="button"
                          onClick={() => handleCopyChar(char.char, char.codepoint)}
                          className="px-2.5 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary transition-colors font-code-stat text-code-stat cursor-pointer"
                        >
                          {copiedChar === char.codepoint ? "Copied!" : "Copy Artifact"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 7: Engineering Bulletins Newsletter */}
        <section className="w-full mb-space-xl">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-code-stat text-code-stat mb-space-xs">
                  <span className="material-symbols-outlined text-[13px]">notifications_active</span>
                  ENGINEERING BULLETINS
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs font-semibold">
                  Stay Updated on New LLM Sanitization Rules
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-xs">
                  Receive technical notifications whenever OpenAI, Anthropic, or Google roll out tokenizer updates that alter unicode representations or inject novel control sequences.
                </p>
                <div className="flex items-center gap-space-sm text-outline font-label-sm text-label-sm">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">shield</span> Zero marketing trackers
                  </span>
                  <span>•</span>
                  <span>1 bulletin per month max</span>
                  <span>•</span>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
              <div className="md:col-span-5">
                <form
                  className="space-y-space-xs"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-space-xs">
                    <input
                      type="email"
                      required
                      placeholder="developer@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md transition-colors whitespace-nowrap shadow-sm cursor-pointer font-medium"
                    >
                      Subscribe
                    </button>
                  </div>
                  {subscribed && (
                    <div className="p-2 rounded bg-surface-container font-code-stat text-code-stat text-primary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      Subscribed to technical changelog feed.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Platform Directory & Client-Side Tooling */}
        <section className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-md">
          <div className="border-b border-surface-container-highest pb-space-sm mb-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Platform Directory &amp; Client-Side Tooling
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              All text sanitization runs in browser memory via WebAssembly and Web Workers with absolute zero data transmission.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg">
            <div>
              <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-space-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                Model Cleaners
              </h4>
              <ul className="space-y-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <li><Link href="/clean-chatgpt-text" className="hover:text-primary transition-colors">Clean ChatGPT Text</Link></li>
                <li><Link href="/clean-claude-text" className="hover:text-primary transition-colors">Clean Claude Text</Link></li>
                <li><Link href="/clean-claude-code" className="hover:text-primary transition-colors">Clean Claude Code Output</Link></li>
                <li><Link href="/clean-gemini-text" className="hover:text-primary transition-colors">Clean Google Gemini Text</Link></li>
                <li><Link href="/clean-copilot-text" className="hover:text-primary transition-colors">Clean Copilot Text</Link></li>
                <li><Link href="/clean-chatgpt-text" className="hover:text-primary transition-colors">Clean DeepSeek Reasoning</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-space-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">tune</span>
                Syntax &amp; Unicode
              </h4>
              <ul className="space-y-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <li><Link href="/zero-width-space-remover" className="hover:text-primary transition-colors">Zero-Width Space Remover</Link></li>
                <li><Link href="/visualize-invisible-characters" className="hover:text-primary transition-colors">Invisible Character Visualizer</Link></li>
                <li><Link href="/clean-unicode-homoglyphs" className="hover:text-primary transition-colors">Unicode Homoglyph Normalizer</Link></li>
                <li><Link href="/markdown-to-plain-text" className="hover:text-primary transition-colors">Markdown to Plain Text</Link></li>
                <li><Link href="/smart-quotes-to-straight-quotes" className="hover:text-primary transition-colors">Smart Quotes Fixer</Link></li>
                <li><Link href="/strip-ai-prompts" className="hover:text-primary transition-colors">Prompt Parameter Eraser</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-space-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">security</span>
                Forensics &amp; Guardrails
              </h4>
              <ul className="space-y-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <li><Link href="/clean-pdf-metadata" className="hover:text-primary transition-colors">PDF Metadata Sanitizer</Link></li>
                <li><Link href="/remove-ai-image-metadata" className="hover:text-primary transition-colors">AI Image Metadata Purge</Link></li>
                <li><Link href="/remove-ai-words" className="hover:text-primary transition-colors">Remove AI Words &amp; Fillers</Link></li>
                <li><Link href="/check-readability-score" className="hover:text-primary transition-colors">Readability &amp; Grade Checker</Link></li>
                <li><Link href="/case-converter" className="hover:text-primary transition-colors">Case Converter Engine</Link></li>
                <li><Link href="/humanize-ai-text" className="hover:text-primary transition-colors">AI Text Humanizer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-space-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Privacy Architecture
              </h4>
              <div className="space-y-space-xs font-label-sm text-label-sm text-on-surface-variant">
                <div className="p-space-xs rounded bg-surface-container text-on-surface">
                  <span className="font-code-stat text-code-stat text-primary font-bold block">SOC2 Type II Aligned</span>
                  <span className="text-[11px] text-outline">Zero telemetry, local DOM execution only.</span>
                </div>
                <div className="p-space-xs rounded bg-surface-container text-on-surface">
                  <span className="font-code-stat text-code-stat text-primary font-bold block">Air-Gapped Ready</span>
                  <span className="text-[11px] text-outline">Functions 100% offline via PWA workers.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Tools Suite Showcase */}
        <ToolsSuiteShowcase />
      </div>
    </div>
  );
}
