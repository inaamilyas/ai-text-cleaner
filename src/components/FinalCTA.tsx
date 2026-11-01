'use client';

import React from "react";
import { Sparkles } from "lucide-react";

export default function FinalCTA() {
  function handleScrollToEditor() {
    const el = document.getElementById("raw-input") || document.getElementById("workspace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  }

  return (
    <section className="w-full py-16 border-t border-slate-200">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D4A] mb-3">
          Ready to clean up your text?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-xl mx-auto leading-relaxed">
          Paste your text into the cleaner and fix unwanted formatting in a few simple steps.
        </p>
        <button
          type="button"
          onClick={handleScrollToEditor}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Clean Your Text</span>
        </button>
      </div>
    </section>
  );
}
