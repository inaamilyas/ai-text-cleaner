import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container-highest/80">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-surface-container-highest/80">
          {/* Column 1: AI & Content Tools */}
          <div>
            <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-3 font-semibold">
              AI Content Tools
            </h4>
            <ul className="space-y-2 font-label-sm text-label-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/ai-text-detector">
                  AI / GPT Detector
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/humanize-ai-text">
                  AI Text Humanizer
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/remove-ai-words">
                  Remove AI Words
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/strip-ai-prompts">
                  Strip AI Prompts
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/check-readability-score">
                  Readability Score
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/remove-ai-image-metadata">
                  AI Image Metadata & C2PA
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Text & Formatting Cleaners */}
          <div>
            <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-3 font-semibold">
              Text & Formatting
            </h4>
            <ul className="space-y-2 font-label-sm text-label-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/visualize-invisible-characters">
                  Invisible Visualizer
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/remove-invisible-characters">
                  Remove Invisible Chars
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/remove-zero-width-space">
                  Remove Zero-Width Space
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/clean-unicode-homoglyphs">
                  Unicode Homoglyphs
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/smart-quotes-to-straight-quotes">
                  Smart Quotes to Straight
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/case-converter">
                  Case Converter
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/markdown-to-plain-text">
                  Markdown to Plain Text
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Cleaners */}
          <div>
            <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-3 font-semibold">
              Platform Cleaners
            </h4>
            <ul className="space-y-2 font-label-sm text-label-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/clean-pdf-metadata">
                  PDF Metadata Cleaner
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/clean-chatgpt-text">
                  Clean ChatGPT Text
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/clean-claude-text">
                  Clean Claude Text
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/clean-claude-code">
                  Clean Claude Code
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/clean-gemini-text">
                  Clean Gemini Text
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/clean-copilot-text">
                  Clean Copilot Text
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-3 font-semibold">
              Company & Legal
            </h4>
            <ul className="space-y-2 font-label-sm text-label-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/about">
                  Architecture & Privacy
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/blog">
                  Engineering Guides
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/contact">
                  Developer Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/privacy">
                  Zero-Log Guarantee
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/terms">
                  Terms of Utility
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Global Languages */}
          <div>
            <h4 className="font-code-stat text-code-stat text-outline uppercase tracking-wider mb-3 font-semibold">
              Global Languages
            </h4>
            <ul className="space-y-2 font-label-sm text-label-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/">
                  English (US / UK)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/es">
                  Español (ES / LATAM)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/de">
                  Deutsch (DACH)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/fr">
                  Français (FR / CA)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/ja">
                  日本語 (CJK UTF-8)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/pt">
                  Português (PT / BR)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/it">
                  Italiano (IT)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/ar">
                  العربية (RTL)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/nl">
                  Nederlands (NL)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/tr">
                  Türkçe (TR)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors no-underline" href="/id">
                  Bahasa Indonesia (ID)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-label-sm text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <Link href="/" className="flex items-center gap-1.5 no-underline text-on-surface">
              <Image
                src="/logo.png"
                alt="AI Text Cleaner"
                width={20}
                height={20}
                className="w-5 h-5 rounded object-contain"
              />
              <span className="font-semibold text-on-surface">AI Text Cleaner</span>
            </Link>
            <span>© 2026.</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container font-code-stat text-code-stat text-secondary border border-surface-container-highest">
              100% Client-Side & Privacy-First
            </span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant flex-wrap justify-center">
            <span>
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/inam-ilyas/"
                target="_blank"
                rel="noreferrer"
                className="text-on-surface font-medium hover:underline"
              >
                Inam Ilyas
              </a>
            </span>
            <span className="text-outline">•</span>
            <a
              className="hover:text-primary transition-colors"
              href="https://github.com/inaamilyas/"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <span className="text-outline">•</span>
            <a
              className="hover:text-primary transition-colors"
              href="https://www.linkedin.com/in/inam-ilyas/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
