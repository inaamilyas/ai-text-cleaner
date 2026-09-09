'use client';

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wand2,
  AlertTriangle,
} from "lucide-react";
import copy from "copy-to-clipboard";
import {
  inspectInvisibleCharacters,
  getSampleInvisibleText,
  type InvisibleInspectionResult,
} from "@/lib/inspectInvisible";

export default function InvisibleVisualizer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<InvisibleInspectionResult | null>(null);
  const [copied, setCopied] = useState(false);

  function handleInspect() {
    if (!input) return;
    const res = inspectInvisibleCharacters(input);
    setResult(res);
    setCopied(false);
  }

  function handleSampleText() {
    const sample = getSampleInvisibleText();
    setInput(sample);
    const res = inspectInvisibleCharacters(sample);
    setResult(res);
  }

  function handleCopyClean() {
    if (!result) return;
    copy(result.cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleReset() {
    setInput("");
    setResult(null);
    setCopied(false);
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-body-xs font-bold text-primary-700 border border-primary-200">
          <Eye className="h-3.5 w-3.5" /> 100% Client-Side Invisible Character Inspector
        </span>
        <h1 className="text-h3 text-neutral-900 font-bold">Zero-Width &amp; Invisible Character Visualizer</h1>
        <p className="text-body-md text-neutral-600 max-w-xl mx-auto">
          Highlight hidden zero-width spaces (U+200B), NBSPs (U+00A0), soft hyphens (U+00AD), and BOM markers with color-coded visual badges.
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-neutral-0 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Raw Text Input */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-body-sm font-bold text-neutral-700">Raw Text Input</label>
              <button
                type="button"
                onClick={handleSampleText}
                className="flex items-center gap-1 text-body-xs font-bold text-primary-700 hover:underline cursor-pointer"
              >
                <Wand2 className="h-3.5 w-3.5" /> Try Sample Text
              </button>
            </div>
            <textarea
              rows={9}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value) {
                  setResult(inspectInvisibleCharacters(e.target.value));
                } else {
                  setResult(null);
                }
              }}
              placeholder="Paste text containing zero-width spaces or hidden Unicode artifacts here..."
              className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Visualized Character Inspection View */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-body-sm font-bold text-neutral-700 flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-primary-600" /> Character Visualizer Output
              </label>
              {result && (
                <span className={`text-body-xs font-bold px-2.5 py-0.5 rounded ${result.totalInvisibleCount > 0 ? "bg-rose-100 text-rose-900 border border-rose-200" : "bg-emerald-100 text-emerald-900"}`}>
                  {result.totalInvisibleCount > 0 ? `⚠️ ${result.totalInvisibleCount} Invisible Characters` : "✓ 0 Invisible Characters"}
                </span>
              )}
            </div>

            <div className="w-full min-h-[220px] max-h-[260px] overflow-y-auto rounded-lg border border-neutral-300 bg-neutral-900 p-4 text-body-sm text-neutral-100 font-mono whitespace-pre-wrap leading-relaxed">
              {result ? (
                result.segments.map((seg) => (
                  seg.isInvisible ? (
                    <span
                      key={seg.id}
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold mx-0.5 select-all ${seg.colorClass}`}
                      title={`${seg.name} (${seg.codePoint})`}
                    >
                      [{seg.codePoint} {seg.name}]
                    </span>
                  ) : (
                    <span key={seg.id}>{seg.char}</span>
                  )
                ))
              ) : (
                <span className="text-neutral-500 italic">
                  Visual character badges will render here when you paste or inspect text...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Inspection Summary Stats Bar */}
        {result && Object.keys(result.counts).length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border border-rose-200 bg-rose-50/80 p-4">
            <p className="text-body-xs font-bold text-rose-950 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-600" /> Hidden Character Breakdown Detected:
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(result.counts).map(([name, count]) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1 rounded-md bg-rose-200/90 px-2.5 py-1 text-body-xs font-bold text-rose-950 border border-rose-300"
                >
                  🔴 {count} × {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-5">
          <button
            onClick={handleInspect}
            disabled={!input}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-button font-bold text-neutral-50 hover:bg-primary-700 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Eye className="h-5 w-5" /> Inspect Invisible Characters
          </button>

          {result && (
            <button
              onClick={handleCopyClean}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-button font-bold text-neutral-50 hover:bg-emerald-700 transition-colors shadow-md cursor-pointer"
            >
              {copied ? <Check className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              {copied ? "✓ Copied Clean Text!" : "🧼 Strip All & Copy Clean Text"}
            </button>
          )}

          <button
            onClick={handleReset}
            disabled={!input && !result}
            className="text-body-sm font-bold text-neutral-500 hover:text-danger-600 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-30"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-body-xs text-neutral-500">
        <ShieldCheck className="h-4 w-4 text-primary-600" />
        Zero Uploads. Character inspection runs 100% locally in browser memory.
      </p>
    </div>
  );
}
