import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Sparkles,
  Scissors,
  Eye,
  BookOpen,
  Type,
  Lock,
  ShieldCheck,
} from "lucide-react";

export const drawerTools = [
  { href: "/ai-text-detector", label: "AI/GPT Detector", icon: Bot },
  { href: "/humanize-ai-text", label: "AI Humanizer", icon: Sparkles },
  { href: "/remove-ai-words", label: "Remove AI Words", icon: Bot },
  { href: "/strip-ai-prompts", label: "Strip AI Prompts", icon: Scissors },
  { href: "/visualize-invisible-characters", label: "Invisible Visualizer", icon: Eye },
  { href: "/check-readability-score", label: "Readability Score", icon: BookOpen },
  { href: "/case-converter", label: "Case Converter", icon: Type },
  { href: "/clean-pdf-metadata", label: "PDF Metadata", icon: Lock },
  { href: "/clean-unicode-homoglyphs", label: "Homoglyphs", icon: ShieldCheck },
];

export default function ToolDrawer() {
  const pathname = usePathname();

  return (
    <div className="w-full overflow-x-auto no-scrollbar border-b border-neutral-200 bg-neutral-50 px-2 py-2 rounded-t-lg">
      <div className="flex items-center gap-1.5 min-w-max">
        {drawerTools.map((tool) => {
          const isActive = pathname === tool.href || (pathname === "/" && tool.href === "/ai-text-detector");
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-body-xs font-bold transition-all duration-150 ${
                isActive
                  ? "bg-primary-700 text-neutral-50 shadow-xs"
                  : "bg-white text-neutral-700 border border-neutral-300 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{tool.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
