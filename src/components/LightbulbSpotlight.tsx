import React from "react";
import { Lightbulb, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function LightbulbSpotlight() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto rounded-xl border border-surface-container-highest/80 bg-surface-container-lowest p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600">
            <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
          </div>

          <div className="flex flex-col gap-3 text-left">
            <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-amber-500/10 px-3 py-1 font-code-stat text-[11px] font-bold text-amber-800 border border-amber-500/20">
              <Zap className="h-3.5 w-3.5" /> Deep In-Browser AI Analysis
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
              Understand how our AI detection &amp; text sanitization engine works
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Unlike cloud-based checkers that upload your documents to external databases, our detection engine analyzes sentence length variance, passive voice structure, and transition density 100% inside your browser memory. Your drafts remain confidential, safe from unauthorized data logging.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 font-code-stat text-xs font-semibold text-secondary">
              <span className="flex items-center gap-1.5 text-primary">
                <Cpu className="h-4 w-4" /> Local Heuristic Analysis
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck className="h-4 w-4" /> 100% Private Client Memory
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
