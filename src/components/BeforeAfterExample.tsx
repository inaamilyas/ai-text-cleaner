import React from "react";
import { Check } from "lucide-react";

export default function BeforeAfterExample() {
  const exampleInput = `This   is copied text.

It contains     extra spaces and

unnecessary line breaks.`;

  const exampleOutput = `This is copied text. It contains extra spaces and unnecessary line breaks.`;

  return (
    <section className="w-full py-12 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D4A] mb-3">
            See how text cleaning works
          </h2>
          <p className="text-sm text-slate-600">
            A quick example of how unwanted spaces and line breaks can affect copied text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Before Panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Example Input
              </span>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono">
                Irregular formatting
              </span>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-slate-700 bg-[#F4F7FB]/70 p-4 rounded-lg flex-1 whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-100">
              {exampleInput}
            </pre>
          </div>

          {/* After Panel */}
          <div className="rounded-xl border border-blue-200 bg-white p-5 flex flex-col shadow-xs relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Cleaned Output</span>
              </span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                Normalized
              </span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-[#172D4A] bg-blue-50/40 p-4 rounded-lg flex-1 whitespace-pre-wrap leading-relaxed border border-blue-100">
              {exampleOutput}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
