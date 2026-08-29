import Link from "next/link";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#privacy", label: "Privacy" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-body-md font-bold text-primary-900 no-underline"
        >
          AI Text Cleaner
        </Link>
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
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
    </header>
  );
}
