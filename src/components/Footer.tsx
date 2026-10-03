import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f9fafb] border-t border-neutral-200">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-neutral-200">
          {/* Column 1: AI Analysis & Content Tools */}
          <div>
            <h4 className="font-code-stat text-xs text-neutral-900 uppercase tracking-wider mb-3 font-semibold">
              AI Analysis &amp; Tone
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/ai-text-detector">
                  AI / GPT Detector
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/humanize-ai-text">
                  AI Text Humanizer
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/remove-ai-words">
                  Remove AI Words
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/check-readability-score">
                  Readability Score
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Text Sanitization */}
          <div>
            <h4 className="font-code-stat text-xs text-neutral-900 uppercase tracking-wider mb-3 font-semibold">
              Text Sanitization
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/clean-chatgpt-text">
                  Clean ChatGPT &amp; AI Text
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/remove-invisible-characters">
                  Remove Invisible Chars
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/visualize-invisible-characters">
                  Invisible Visualizer
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/clean-unicode-homoglyphs">
                  Unicode Homoglyphs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Files & Prompts */}
          <div>
            <h4 className="font-code-stat text-xs text-neutral-900 uppercase tracking-wider mb-3 font-semibold">
              Files &amp; Prompts
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/clean-pdf-metadata">
                  PDF Metadata Cleaner
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/remove-ai-image-metadata">
                  AI Image Metadata &amp; C2PA
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/strip-ai-prompts">
                  Strip AI Prompts
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/markdown-to-plain-text">
                  Markdown to Plain Text
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 className="font-code-stat text-xs text-neutral-900 uppercase tracking-wider mb-3 font-semibold">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/about">
                  Architecture &amp; Privacy
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/blog">
                  Engineering Guides
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/contact">
                  Developer Contact
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/privacy">
                  Zero-Log Guarantee
                </Link>
              </li>
              <li>
                <Link className="text-neutral-600 hover:text-primary transition-colors no-underline" href="/terms">
                  Terms of Utility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <Link href="/" className="flex items-center gap-1.5 no-underline text-neutral-800">
              <Image
                src="/logo.png"
                alt="Text Cleaner AI"
                width={20}
                height={20}
                className="w-5 h-5 rounded object-contain"
              />
              <span className="font-semibold text-neutral-800">Text Cleaner AI</span>
            </Link>
            <span>© 2026.</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-neutral-200/60 font-code-stat text-neutral-600 border border-neutral-300/60">
              100% Client-Side &amp; Privacy-First
            </span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 flex-wrap justify-center">
            <span>
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/inam-ilyas/"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-700 font-medium hover:text-primary hover:underline"
              >
                Inam Ilyas
              </a>
            </span>
            <span className="text-neutral-300">•</span>
            <a
              className="text-neutral-500 hover:text-primary transition-colors no-underline"
              href="https://github.com/inaamilyas/"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <span className="text-neutral-300">•</span>
            <a
              className="text-neutral-500 hover:text-primary transition-colors no-underline"
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
