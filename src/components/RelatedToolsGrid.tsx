import React from "react";
import Link from "next/link";
import {
  Bot,
  Scissors,
  Eye,
  Type,
  BookOpen,
  Lock,
  Sparkles,
  FileText,
  ShieldCheck,
} from "lucide-react";

export const toolsList = [
  {
    href: "/ai-text-detector",
    title: "AI Text Detector",
    desc: "Check AI score & highlight ChatGPT text",
    icon: Bot,
    color: "bg-primary-50 text-primary-700 border-primary-200",
  },
  {
    href: "/remove-ai-words",
    title: "Remove AI Buzzwords",
    desc: "Strip delve, tapestry, and LLM clichés",
    icon: Sparkles,
    color: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    href: "/strip-ai-prompts",
    title: "Strip AI Prompts",
    desc: "Clean Midjourney & SD flags (--ar, --v)",
    icon: Scissors,
    color: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
  {
    href: "/visualize-invisible-characters",
    title: "Invisible Visualizer",
    desc: "Inspect zero-width spaces with badges",
    icon: Eye,
    color: "bg-rose-50 text-rose-800 border-rose-200",
  },
  {
    href: "/check-readability-score",
    title: "Readability Score",
    desc: "Calculate Flesch-Kincaid grade level",
    icon: BookOpen,
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    href: "/case-converter",
    title: "Case Converter",
    desc: "Convert Title Case, camelCase & Slugs",
    icon: Type,
    color: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    href: "/clean-pdf-metadata",
    title: "PDF Metadata Cleaner",
    desc: "Wipe author, creator & timestamp EXIF",
    icon: Lock,
    color: "bg-purple-50 text-purple-800 border-purple-200",
  },
  {
    href: "/clean-unicode-homoglyphs",
    title: "Homoglyph Sanitizer",
    desc: "Sanitize Cyrillic/Greek look-alikes",
    icon: ShieldCheck,
    color: "bg-teal-50 text-teal-800 border-teal-200",
  },
];

export default function RelatedToolsGrid() {
  return (
    <section className="bg-surface-container-low border-y border-surface-container-highest/80 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-code-stat text-code-stat text-primary uppercase tracking-widest font-semibold block">
            ALL-IN-ONE TEXT SANITIZATION SUITE
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight mt-1">
            Stay ahead with our AI text processing tools
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {toolsList.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-surface-container-highest/80 bg-surface-container-lowest transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 group no-underline"
            >
              <div className="p-2.5 rounded-xl bg-primary-fixed/30 border border-primary-fixed text-primary flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <tool.icon className="h-4 w-4" />
              </div>
              <div className="text-left overflow-hidden">
                <h3 className="font-headline-sm text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                  {tool.title}
                </h3>
                <p className="font-body-sm text-[11px] text-on-surface-variant truncate leading-tight mt-0.5">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
