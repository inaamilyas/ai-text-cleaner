import Link from "next/link";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog & Guides" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-4 z-20 px-4">
      <div className="container mx-auto flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50/95 px-6 py-4 backdrop-blur-sm shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-2 text-body-md font-bold text-primary-900 no-underline"
        >
          <Logo className="h-8 w-8" />
          AI Text Cleaner
        </Link>
        <nav className="flex items-center gap-6 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-sm font-bold text-neutral-700 no-underline transition-colors duration-200 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
