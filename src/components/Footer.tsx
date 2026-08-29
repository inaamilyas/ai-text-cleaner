import Link from "next/link";

const footerLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <Link
              href="/"
              className="text-body-md font-bold text-primary-900 no-underline"
            >
              AI Text Cleaner
            </Link>
            <p className="text-body-sm text-neutral-600">
              Clean AI-generated text instantly.
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm font-bold text-neutral-700 no-underline hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-neutral-200 pt-6 text-center">
          <p className="text-body-sm text-neutral-400">
            Copyright 2026 AI Text Cleaner
          </p>
        </div>
      </div>
    </footer>
  );
}
