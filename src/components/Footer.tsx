import Link from "next/link";
import Logo from "@/components/Logo";

const aiToolLinks = [
  { href: "/clean-chatgpt-text", label: "Clean ChatGPT Text" },
  { href: "/clean-claude-text", label: "Clean Claude Text" },
  { href: "/clean-gemini-text", label: "Clean Google Gemini Text" },
  { href: "/clean-copilot-text", label: "Clean Copilot Text" },
];

const utilityLinks = [
  { href: "/remove-ai-words", label: "Remove AI Buzzwords" },
  { href: "/remove-zero-width-space", label: "Zero-Width Space Remover" },
  { href: "/remove-invisible-characters", label: "Invisible Character Remover" },
  { href: "/markdown-to-plain-text", label: "Markdown to Plain Text" },
  { href: "/smart-quotes-to-straight-quotes", label: "Smart Quotes Fixer" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog & Guides" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container mx-auto flex flex-col gap-10 px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-body-md font-bold text-primary-900 no-underline"
            >
              <Logo className="h-7 w-7" />
              AI Text Cleaner
            </Link>
            <p className="text-body-sm text-neutral-600">
              Clean AI-generated text instantly. Remove overused AI words, hidden unicode control marks, zero-width spaces, and markdown artifacts completely in your browser.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-body-sm font-bold text-neutral-900">AI Platform Cleaners</p>
            <ul className="flex flex-col gap-2 text-body-sm">
              {aiToolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 no-underline transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-body-sm font-bold text-neutral-900">Text Utilities</p>
            <ul className="flex flex-col gap-2 text-body-sm">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 no-underline transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-body-sm font-bold text-neutral-900">Company & Legal</p>
            <ul className="flex flex-col gap-2 text-body-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 no-underline transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row text-center sm:text-left">
          <p className="text-body-sm text-neutral-500">
            © 2026 AI Text Cleaner. 100% Client-Side & Privacy-First.
          </p>
          <p className="text-body-sm text-neutral-600">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/inam-ilyas/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary-700 underline"
            >
              Inam Ilyas
            </a>{" "}
            (
            <a
              href="https://github.com/inaamilyas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-primary-600 underline"
            >
              GitHub
            </a>
            )
          </p>
        </div>
      </div>
    </footer>
  );
}
