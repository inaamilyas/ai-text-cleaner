'use client';

import { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Wand2,
  AlertTriangle,
  Lock,
} from "lucide-react";
import copy from "copy-to-clipboard";
import {
  cleanHomoglyphs,
  getSampleHomoglyphText,
  type HomoglyphResult,
} from "@/lib/cleanHomoglyphs";

export default function HomoglyphSanitizer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<HomoglyphResult | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSanitize() {
    if (!input) return;
    const res = cleanHomoglyphs(input);
    setResult(res);
    setCopied(false);
  }

  function handleSampleText() {
    const sample = getSampleHomoglyphText();
    setInput(sample);
    const res = cleanHomoglyphs(sample);
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
          <Lock className="h-3.5 w-3.5" /> 100% In-Browser Homoglyph Security Sanitizer
        </span>
        <h1 className="text-h3 text-neutral-900 font-bold">Unicode Homoglyph &amp; Confusable Character Cleaner</h1>
        <p className="text-body-md text-neutral-600 max-w-xl mx-auto">
          Detect and replace Cyrillic, Greek, or Latin look-alike characters disguised inside text to bypass AI detectors or phishing filters.
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-neutral-0 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Textarea */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-body-sm font-bold text-neutral-700">Raw Text Input</label>
              <button
                type="button"
                onClick={handleSampleText}
                className="flex items-center gap-1 text-body-xs font-bold text-primary-700 hover:underline cursor-pointer"
              >
                <Wand2 className="h-3.5 w-3.5" /> Try Sample Homoglyphs
              </button>
            </div>
            <textarea
              rows={8}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value) {
                  setResult(cleanHomoglyphs(e.target.value));
                } else {
                  setResult(null);
                }
              }}
              placeholder="Paste text to scan for fake Cyrillic or Greek look-alike letters..."
              className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Cleaned ASCII Output */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-body-sm font-bold text-neutral-700 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Sanitized ASCII Output
              </label>
              {result && (
                <span className={`text-body-xs font-bold px-2.5 py-0.5 rounded ${result.totalHomoglyphsCount > 0 ? "bg-rose-100 text-rose-900 border border-rose-200" : "bg-emerald-100 text-emerald-900"}`}>
                  {result.totalHomoglyphsCount > 0 ? `⚠️ ${result.totalHomoglyphsCount} Homoglyphs Replaced` : "✓ Clean Text (0 Homoglyphs)"}
                </span>
              )}
            </div>
            <textarea
              readOnly
              rows={8}
              value={result?.cleanedText || ""}
              placeholder="Sanitized standard ASCII Latin text will appear here..."
              className="w-full rounded-lg border border-neutral-300 bg-neutral-100 p-4 text-body-sm text-neutral-900"
            />
          </div>
        </div>

        {/* Security Warning & Replacement Table */}
        {result && result.replacements.length > 0 && (
          <div className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50/80 p-4">
            <p className="text-body-xs font-bold text-rose-950 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-rose-600" /> Confusable Homoglyph Replacements Summary:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-xs">
              {result.replacements.slice(0, 8).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md bg-rose-100/90 px-3 py-1.5 text-rose-950 border border-rose-300 font-mono"
                >
                  <span>
                    Original: <strong className="text-rose-700">'{item.originalChar}'</strong> ({item.codePoint})
                  </span>
                  <span>-&gt; ASCII: <strong className="text-emerald-700">'{item.replacedChar}'</strong></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-5">
          <button
            onClick={handleSanitize}
            disabled={!input}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-button font-bold text-neutral-50 hover:bg-primary-700 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Lock className="h-5 w-5" /> Sanitize Homoglyphs
          </button>

          {result && (
            <button
              onClick={handleCopyClean}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-button font-bold text-neutral-50 hover:bg-emerald-700 transition-colors shadow-md cursor-pointer"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? "✓ Copied Sanitized Text!" : "📋 Copy Clean ASCII Text"}
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
        Zero Uploads. Homoglyph inspection and replacement run 100% locally in browser memory.
      </p>
    </div>
  );
}
