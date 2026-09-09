import React from "react";
import { Lightbulb, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function LightbulbSpotlight() {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-amber-100 border border-amber-300 text-amber-600">
            <Lightbulb className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.5]" />
          </div>

          <div className="flex flex-col gap-3 text-left">
            <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-amber-100 px-3 py-1 text-body-xs font-bold text-amber-900 border border-amber-200">
              <Zap className="h-3.5 w-3.5" /> Deep In-Browser AI Analysis
            </span>
            <h3 className="text-h4 text-neutral-900 font-bold">
              Understand how our AI detection &amp; text sanitization engine works
            </h3>
            <p className="text-body-sm text-neutral-600 leading-relaxed">
              Unlike cloud-based checkers that upload your documents to external databases, our detection engine analyzes string perplexity, sentence length variance, and transition density 100% inside your browser memory. Your drafts remain confidential, safe from unauthorized data logging.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-body-xs font-bold text-neutral-700">
              <span className="flex items-center gap-1.5 text-primary-700">
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
