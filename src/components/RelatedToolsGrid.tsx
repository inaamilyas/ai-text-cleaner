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
    <section className="bg-neutral-50 border-y border-neutral-200 py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <p className="text-body-xs font-bold uppercase tracking-wider text-neutral-500">
            All-In-One Text Sanitization Suite
          </p>
          <h2 className="text-h5 text-neutral-900 font-bold mt-1">
            Stay ahead with our AI text processing tools
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {toolsList.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`flex items-center gap-3 p-3.5 rounded-lg border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:border-primary-400 group`}
            >
              <div className={`p-2 rounded-md ${tool.color} flex-shrink-0`}>
                <tool.icon className="h-4 w-4" />
              </div>
              <div className="text-left overflow-hidden">
                <h3 className="text-body-xs font-bold text-neutral-900 group-hover:text-primary-700 truncate">
                  {tool.title}
                </h3>
                <p className="text-[11px] text-neutral-500 truncate leading-tight mt-0.5">
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
