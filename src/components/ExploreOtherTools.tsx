import React from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, Cpu, Sparkles, EyeOff, Search, FileCode } from "lucide-react";

export default function ExploreOtherTools() {
  const tools = [
    {
      title: "ChatGPT Text Cleaner",
      desc: "Clean formatting, markdown asterisks, and conversational courtesies from ChatGPT outputs.",
      href: "/clean-chatgpt-text",
      icon: Bot,
    },
    {
      title: "Claude AI Text Cleaner",
      desc: "Remove thinking blocks, XML tags, and formatting artifacts from Anthropic Claude.",
      href: "/clean-claude-text",
      icon: Cpu,
    },
    {
      title: "Google Gemini Cleaner",
      desc: "Strip search citation brackets and web grounding markers from Gemini outputs.",
      href: "/clean-gemini-text",
      icon: Sparkles,
    },
    {
      title: "Invisible Character Remover",
      desc: "Detect and eliminate zero-width spaces, soft hyphens, and hidden Unicode codes.",
      href: "/remove-invisible-characters",
      icon: EyeOff,
    },
    {
      title: "AI Text Detector",
      desc: "Analyze sentence burstiness and perplexity to check for potential AI phrasing.",
      href: "/ai-text-detector",
      icon: Search,
    },
    {
      title: "PDF Metadata Cleaner",
      desc: "Strip author identity, creation timestamps, and software stamps from PDF files.",
      href: "/clean-pdf-metadata",
      icon: FileCode,
    },
  ];

  return (
    <section className="w-full py-12 border-t border-slate-200" id="other-tools">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D4A] mb-3">
            More tools to help with your text
          </h2>
          <p className="text-sm text-slate-600">
            Need something more specific? Explore our other tools designed for different text-cleaning and text-analysis tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all group flex flex-col justify-between no-underline"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F4F7FB] border border-slate-200/60 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <tool.icon className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-[#172D4A] group-hover:text-blue-700 transition-colors mb-1.5">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
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
