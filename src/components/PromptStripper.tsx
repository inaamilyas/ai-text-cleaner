'use client';

import { useState } from "react";
import {
  Scissors,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Trash2,
  Zap,
  Info,
  Wand2,
} from "lucide-react";
import copy from "copy-to-clipboard";
import {
  stripAIPrompt,
  getSamplePromptText,
  defaultPromptOptions,
  type PromptStripperOptions,
  type PromptStripperResult,
} from "@/lib/stripPrompt";

export default function PromptStripper() {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<PromptStripperOptions>(defaultPromptOptions);
  const [result, setResult] = useState<PromptStripperResult | null>(null);
  const [copied, setCopied] = useState(false);

  function handleCleanPrompt() {
    if (!input.trim()) return;
    const res = stripAIPrompt(input, options);
    setResult(res);
    setCopied(false);
  }

  function handleSampleText() {
    const sample = getSamplePromptText();
    setInput(sample);
    const res = stripAIPrompt(sample, options);
    setResult(res);
  }

  function handleCopy() {
    if (!result) return;
    copy(result.cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!result) return;
    const blob = new Blob([result.cleanedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "clean-prompt.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          <Scissors className="h-3.5 w-3.5" /> 100% Client-Side AI Prompt Stripper
        </span>
        <h1 className="text-h3 text-neutral-900 font-bold">Strip Midjourney, ChatGPT &amp; SD Prompt Parameters</h1>
        <p className="text-body-md text-neutral-600 max-w-xl mx-auto">
          Remove Midjourney flags (--ar 16:9, --v 6.0), LoRA tags (&lt;lora:...&gt;), negative prompts, and weights instantly.
        </p>
      </div>

      {/* Input / Output Form */}
      <div className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-neutral-0 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Textarea */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-body-sm font-bold text-neutral-700">Raw AI Prompt Input</label>
              <button
                type="button"
                onClick={handleSampleText}
                className="flex items-center gap-1 text-body-xs font-bold text-primary-700 hover:underline cursor-pointer"
              >
                <Wand2 className="h-3.5 w-3.5" /> Try Sample Prompt
              </button>
            </div>
            <textarea
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste raw AI prompt with --ar 16:9, <lora:...>, or Negative prompt parameters..."
              className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Cleaned Output Textarea */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-body-sm font-bold text-neutral-700 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary-600" /> Cleaned Prompt Output
              </label>
              {result && (
                <span className="text-body-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ✓ {result.totalRemovedCount} Parameters Stripped
                </span>
              )}
            </div>
            <textarea
              readOnly
              rows={8}
              value={result?.cleanedText || ""}
              placeholder="Cleaned prompt text without flags or tags will appear here..."
              className="w-full rounded-lg border border-neutral-300 bg-neutral-100 p-4 text-body-sm text-neutral-900"
            />
          </div>
        </div>

        {/* Stripping Controls Options */}
        <div className="flex flex-col gap-3 border-t border-neutral-200 pt-5">
          <label className="text-body-xs font-bold uppercase text-neutral-500">Stripping Rules:</label>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-body-xs text-neutral-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.stripMidjourneyParams}
                onChange={(e) => setOptions({ ...options, stripMidjourneyParams: e.target.checked })}
                className="accent-primary-600 h-4 w-4"
              />
              Midjourney Flags (--ar, --v, --stylize, --seed)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.stripLoRATags}
                onChange={(e) => setOptions({ ...options, stripLoRATags: e.target.checked })}
                className="accent-primary-600 h-4 w-4"
              />
              LoRA &amp; Network Tags (&lt;lora:...&gt;)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.stripNegativePrompts}
                onChange={(e) => setOptions({ ...options, stripNegativePrompts: e.target.checked })}
                className="accent-primary-600 h-4 w-4"
              />
              Negative Prompt Chunks &amp; SD Parameters
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.stripWeights}
                onChange={(e) => setOptions({ ...options, stripWeights: e.target.checked })}
                className="accent-primary-600 h-4 w-4"
              />
              Prompt Weight Multipliers ((word:1.3))
            </label>
          </div>
        </div>

        {/* Removed Items Inspector Pill Bar */}
        {result && result.removedItems.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 border-t border-neutral-200">
            <p className="text-body-xs font-bold text-neutral-700">
              Removed Parameter Summary ({result.removedItems.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {result.removedItems.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-900 border border-amber-300 max-w-xs truncate"
                  title={item.item}
                >
                  ✂️ {item.type}: {item.item.slice(0, 30)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-5">
          <button
            onClick={handleCleanPrompt}
            disabled={!input.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-button font-bold text-neutral-50 hover:bg-primary-700 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Scissors className="h-5 w-5" /> Strip Parameters &amp; Clean Prompt
          </button>

          {result && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-neutral-0 px-5 py-3 text-body-sm font-bold text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Clean Prompt"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-neutral-0 px-4 py-3 text-body-sm font-bold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4" /> Download .txt
              </button>
            </div>
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
        Zero Uploads. AI prompt processing runs 100% locally inside browser memory.
      </p>
    </div>
  );
}
