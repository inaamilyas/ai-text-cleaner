import React from "react";
import { ShieldCheck, Smartphone, Check, Sparkles } from "lucide-react";

export default function DarkCalloutBanner() {
  return (
    <section className="bg-neutral-900 text-neutral-50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column: Mockup Graphic */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-neutral-700 bg-neutral-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
                <span className="flex items-center gap-1.5 text-body-xs font-bold text-primary-400">
                  <Sparkles className="h-4 w-4" /> AI Text Sanitizer
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  100% In-Browser
                </span>
              </div>
              <div className="space-y-2 text-left font-mono text-body-xs text-neutral-300 bg-neutral-900 p-4 rounded-lg border border-neutral-700">
                <p className="text-neutral-500">// Instant local inspection</p>
                <p className="text-emerald-400">✓ 0 Invisible Characters</p>
                <p className="text-primary-300">✓ AI Buzzwords Stripped</p>
                <p className="text-amber-400">✓ 94% Human Rhythm</p>
              </div>
              <div className="flex items-center gap-2 text-body-xs text-neutral-400 pt-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Zero server logs. Zero cloud uploads.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Features */}
          <div className="flex flex-col gap-4 text-left">
            <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-primary-950 px-3 py-1 text-body-xs font-bold text-primary-300 border border-primary-800">
              <Smartphone className="h-3.5 w-3.5" /> Mobile &amp; Desktop Ready
            </span>
            <h2 className="text-h3 font-bold text-white leading-tight">
              Clean and check AI content anywhere — 100% Client-Side Privacy
            </h2>
            <p className="text-body-sm text-neutral-300 leading-relaxed">
              Whether you are drafting articles on mobile, writing academic papers on laptop, or sanitizing code comments, our browser engine runs locally with zero installation and zero cloud data retention.
            </p>

            <ul className="space-y-2 text-body-sm text-neutral-200 pt-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span>Instant local processing — no network latency or queues</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span>Zero server storage — your content never leaves your device</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span>Compatible with all modern web browsers &amp; mobile devices</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
