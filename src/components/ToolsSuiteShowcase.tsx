import Link from "next/link";

export default function ToolsSuiteShowcase() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md" id="tools-suite-showcase">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
        <div className="space-y-space-xs">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed/30 text-primary font-code-stat text-code-stat">
            <span className="material-symbols-outlined text-[14px]">grid_view</span>
            <span>EXPANDED SUITE • 18 UTILITIES</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
            Explore All AI Sanitization & Cleaning Tools
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Specialized, 100% browser-based sanitizers engineered for exact AI runtime quirks and formats.
          </p>
        </div>
      </div>

      {/* ROW 1: AI Model Sanitizers */}
      <div className="flex flex-col space-y-space-xs bg-surface-container-low/60 p-space-md rounded-xl border border-surface-container-highest">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">AI Model Sanitizers</h3>
            <span className="font-code-stat text-[11px] text-outline ml-1">[MODEL-SPECIFIC]</span>
          </div>
          <span className="font-code-stat text-code-stat text-secondary">6 Tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm pt-1">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary-fixed text-on-primary-fixed font-semibold">
                  Popular
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                ChatGPT Text Cleaner
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Eliminates conversational filler, markdown fences, and OpenAI quote artifacts.
              </p>
            </div>
            <Link
              href="/clean-chatgpt-text"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">neurology</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Free
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Claude Text Cleaner
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Strips XML formatting tags, artifacts, and excessive conversational courtesies.
              </p>
            </div>
            <Link
              href="/clean-claude-text"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary/10 text-primary">
                  Client-Side
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Claude Code Cleaner
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Cleans ANSI terminal escape sequences and diff headers from CLI output.
              </p>
            </div>
            <Link
              href="/clean-claude-code-output"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">diamond</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Fast
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Gemini Sanitizer
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Removes Google Gemini citation anchors, bracketed numbers, and bold spam.
              </p>
            </div>
            <Link
              href="/clean-gemini-text"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 5 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">assistant</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Free
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Copilot Cleaner
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Strips Edge Copilot sidebar headers, prompt repeats, and web citations.
              </p>
            </div>
            <Link
              href="/clean-copilot-text"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 6 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary/10 text-primary">
                  New
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                DeepSeek Sanitizer
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Purges chain-of-thought blocks, reasoning tokens, and formula artifacts.
              </p>
            </div>
            <Link
              href="/clean-deepseek-text"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ROW 2: Unicode & Invisible Characters */}
      <div className="flex flex-col space-y-space-xs bg-surface-container-low/60 p-space-md rounded-xl border border-surface-container-highest">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Unicode & Invisible Characters
            </h3>
            <span className="font-code-stat text-[11px] text-outline ml-1">[BYTE-HYGIENE]</span>
          </div>
          <span className="font-code-stat text-code-stat text-secondary">6 Tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm pt-1">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">space_bar</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary-fixed text-on-primary-fixed font-semibold">
                  Popular
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Zero-Width Remover
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Finds and eradicates U+200B, U+200C, U+200D, and invisible zero-width spaces.
              </p>
            </div>
            <Link
              href="/remove-zero-width-space"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Universal
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Invisible Char Remover
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Clears non-breaking spaces (U+00A0), soft hyphens, and byte-order marks.
              </p>
            </div>
            <Link
              href="/remove-invisible-characters"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">spellcheck</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary/10 text-primary">
                  Security
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Homoglyph Normalizer
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Maps Cyrillic and lookalike Latin characters back to true ASCII standards.
              </p>
            </div>
            <Link
              href="/homoglyph-remover"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">manage_search</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Visual
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Invisible Visualizer
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Inspects text in real-time, highlighting hidden Unicode glyphs in vivid red badges.
              </p>
            </div>
            <Link
              href="/invisible-character-detector"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 5 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">format_quote</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Free
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Smart Quotes Fixer
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Replaces curly quotes, primes, and em/en dashes with clean standard syntax.
              </p>
            </div>
            <Link
              href="/smart-quotes-to-straight-quotes-converter"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 6 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">ink_eraser</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary/10 text-primary">
                  Clean
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Prompt Boundary Eraser
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Removes system prompt leakages, &apos;Human:&apos;, &apos;Assistant:&apos; prefixes cleanly.
              </p>
            </div>
            <Link
              href="/strip-ai-prompts-parameters"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ROW 3: Forensics, Documents & Tone */}
      <div className="flex flex-col space-y-space-xs bg-surface-container-low/60 p-space-md rounded-xl border border-surface-container-highest">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary"></div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Forensics, Documents & Tone
            </h3>
            <span className="font-code-stat text-[11px] text-outline ml-1">[ANALYSIS & METADATA]</span>
          </div>
          <span className="font-code-stat text-code-stat text-secondary">6 Tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm pt-1">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">find_replace</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary-fixed text-on-primary-fixed font-semibold">
                  Popular
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                AI Buzzwords Remover
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Strips overrepresented LLM clichés like &apos;delve&apos;, &apos;tapestry&apos;, and &apos;testament&apos;.
              </p>
            </div>
            <Link
              href="/remove-ai-words"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">face</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary/10 text-primary">
                  Natural
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Humanize AI Text
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Breaks robotic syntax into organic, rhythmically varied human sentences.
              </p>
            </div>
            <Link
              href="/humanize-ai-text-online"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Privacy
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                PDF Metadata Stripper
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Removes creator info, revision stamps, and watermarks from PDF binaries.
              </p>
            </div>
            <Link
              href="/clean-pdf-metadata"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">hide_image</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Client-Side
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                AI EXIF & Meta Purge
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Strips Midjourney, DALL-E, and Stable Diffusion generation parameters.
              </p>
            </div>
            <Link
              href="/remove-ai-image-metadata"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 5 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Analytics
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Readability &amp; Grade
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Calculates Flesch-Kincaid grade, lexical complexity, and burstiness index.
              </p>
            </div>
            <Link
              href="/readability-flesch-kincaid-grade-checker"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          {/* Card 6 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container-highest shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between space-y-space-sm group">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">text_fields</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-surface-container-high text-secondary">
                  Free
                </span>
              </div>
              <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Case Converter Engine
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Instant conversion between camelCase, snake_case, Title Case, and UPPERCASE.
              </p>
            </div>
            <Link
              href="/case-converter"
              className="inline-flex items-center justify-between text-primary font-label-sm text-label-sm font-semibold pt-2 border-t border-surface-container hover:underline"
            >
              <span>Launch Tool</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
