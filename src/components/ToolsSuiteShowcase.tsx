import Link from "next/link";

interface ToolCard {
  href: string;
  title: string;
  desc: string;
  icon: string;
  badge: string;
  badgeClass?: string;
}

const toolSections: {
  title: string;
  tag: string;
  dotColor: string;
  tools: ToolCard[];
}[] = [
  {
    title: "AI Analysis & Tone",
    tag: "[LLM-DETECTION & POLISH]",
    dotColor: "bg-primary",
    tools: [
      {
        href: "/clean-chatgpt-text",
        title: "ChatGPT Text Cleaner",
        desc: "Strips markdown fences, asterisks, conversational courtesies, and em-dashes from ChatGPT outputs.",
        icon: "smart_toy",
        badge: "Popular",
        badgeClass: "bg-primary-fixed text-on-primary-fixed font-semibold",
      },
      {
        href: "/clean-claude-text",
        title: "Claude AI Text Cleaner",
        desc: "Purges thinking blocks, XML tags, conversational preambles, and formatting from Anthropic Claude.",
        icon: "face",
        badge: "New",
        badgeClass: "bg-primary/10 text-primary font-semibold",
      },
      {
        href: "/clean-gemini-text",
        title: "Google Gemini Cleaner",
        desc: "Strips inline search citation markers [1][2], web grounding brackets, and formatting from Gemini.",
        icon: "search_spark",
        badge: "New",
        badgeClass: "bg-primary/10 text-primary font-semibold",
      },
      {
        href: "/ai-text-detector",
        title: "AI Text Detector",
        desc: "Analyzes sentence burstiness, perplexity, and statistical markers to highlight AI-generated phrasing.",
        icon: "find_in_page",
        badge: "Flagship",
        badgeClass: "bg-primary/10 text-primary font-semibold",
      },
      {
        href: "/humanize-ai-text",
        title: "AI Text Humanizer",
        desc: "Breaks robotic syntax into varied sentence structures that sound organic and conversational.",
        icon: "face",
        badge: "Natural",
        badgeClass: "bg-surface-container-high text-secondary",
      },
      {
        href: "/remove-ai-words",
        title: "AI Buzzword Remover",
        desc: "Flags and replaces overused LLM clichés like 'delve', 'tapestry', and 'testament'.",
        icon: "spellcheck",
        badge: "Clean",
        badgeClass: "bg-surface-container-high text-secondary",
      },
    ],
  },
  {
    title: "Unicode & Text Sanitization",
    tag: "[BYTE-HYGIENE]",
    dotColor: "bg-secondary",
    tools: [
      {
        href: "/remove-invisible-characters",
        title: "Invisible Character Remover",
        desc: "Cleans zero-width spaces (U+200B), non-breaking spaces (U+00A0), soft hyphens, and byte-order marks.",
        icon: "visibility_off",
        badge: "Essential",
        badgeClass: "bg-primary-fixed text-on-primary-fixed font-semibold",
      },
      {
        href: "/visualize-invisible-characters",
        title: "Invisible Character Visualizer",
        desc: "Inspects text in real-time, highlighting hidden Unicode glyphs in red badges with hex codepoints.",
        icon: "manage_search",
        badge: "Visual",
        badgeClass: "bg-surface-container-high text-secondary",
      },
      {
        href: "/clean-unicode-homoglyphs",
        title: "Homoglyph Normalizer",
        desc: "Maps Cyrillic, Greek, and confusable lookalike characters disguised in text back to standard ASCII.",
        icon: "g_translate",
        badge: "Security",
        badgeClass: "bg-primary/10 text-primary",
      },
      {
        href: "/check-readability-score",
        title: "Readability Score Checker",
        desc: "Calculates Flesch-Kincaid grade level, reading ease, sentence complexity, and lexical density.",
        icon: "analytics",
        badge: "Analytics",
        badgeClass: "bg-surface-container-high text-secondary",
      },
    ],
  },
  {
    title: "Files, Prompts & Metadata",
    tag: "[PRIVACY & FORMATTING]",
    dotColor: "bg-tertiary",
    tools: [
      {
        href: "/clean-pdf-metadata",
        title: "PDF Metadata Cleaner",
        desc: "Purges author identity, creation software, revision timestamps, and hidden binary stamps from PDFs.",
        icon: "picture_as_pdf",
        badge: "Privacy",
        badgeClass: "bg-surface-container-high text-secondary",
      },
      {
        href: "/remove-ai-image-metadata",
        title: "AI Image Metadata Remover",
        desc: "Strips Midjourney, DALL-E, Stable Diffusion prompt parameters, EXIF tags, and C2PA credentials.",
        icon: "hide_image",
        badge: "Client-Side",
        badgeClass: "bg-surface-container-high text-secondary",
      },
      {
        href: "/strip-ai-prompts",
        title: "Strip AI Image Prompts",
        desc: "Cleans Midjourney parameter flags (--ar, --v, --s), prompt meta prefixes, and seed numbers.",
        icon: "terminal",
        badge: "Prompts",
        badgeClass: "bg-surface-container-high text-secondary",
      },
      {
        href: "/markdown-to-plain-text",
        title: "Markdown to Plain Text",
        desc: "Converts Markdown syntax, asterisks, hash headers, and code backticks into clean, readable plain text.",
        icon: "description",
        badge: "Fast",
        badgeClass: "bg-surface-container-high text-secondary",
      },
    ],
  },
];

export default function ToolsSuiteShowcase() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md" id="tools-suite-showcase">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
        <div className="space-y-space-xs">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed/30 text-primary font-code-stat text-code-stat">
            <span className="material-symbols-outlined text-[14px]">grid_view</span>
            <span>CLEANING SUITE • 12 TOOLS</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
            Explore All AI Sanitization &amp; Cleaning Tools
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Specialized, 100% browser-based tools engineered for AI text sanitization, Unicode byte hygiene, and document privacy.
          </p>
        </div>
      </div>

      {toolSections.map((section) => (
        <div
          key={section.title}
          className="flex flex-col space-y-space-xs bg-surface-container-low/60 p-space-md rounded-xl border border-surface-container-highest"
        >
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${section.dotColor}`}></div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{section.title}</h3>
              <span className="font-code-stat text-[11px] text-outline ml-1">{section.tag}</span>
            </div>
            <span className="font-code-stat text-code-stat text-secondary">{section.tools.length} Tools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm pt-1">
            {section.tools.map((tool) => (
              <div
                key={tool.href}
                className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group"
              >
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">{tool.icon}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-code-stat ${tool.badgeClass}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {tool.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline no-underline"
                >
                  <span>Launch Tool</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
