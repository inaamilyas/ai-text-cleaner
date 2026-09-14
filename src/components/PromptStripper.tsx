'use client';

import { useMemo, useState } from "react";
import {
  Scissors,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Wand2,
  FileText,
  SlidersHorizontal,
  Zap,
  Bot,
  Code2,
  Eraser,
} from "lucide-react";
import copy from "copy-to-clipboard";
import {
  stripAIPrompt,
  getSamplePromptText,
  defaultPromptOptions,
  type PromptStripperOptions,
  type PromptStripperResult,
} from "@/lib/stripPrompt";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun, trackCopyText, trackDownloadFile } from "@/lib/analytics";

const emptyStats = { words: 0, characters: 0, sentences: 0 };

const promptPresets = [
  {
    id: "midjourney",
    label: "Midjourney Flags (--ar, --v)",
    icon: Zap,
    options: {
      stripMidjourneyParams: true,
      stripLoRATags: false,
      stripNegativePrompts: false,
      stripWeights: false,
    },
  },
  {
    id: "lora",
    label: "LoRA & Network Tags",
    icon: Code2,
    options: {
      stripMidjourneyParams: false,
      stripLoRATags: true,
      stripNegativePrompts: false,
      stripWeights: false,
    },
  },
  {
    id: "sd",
    label: "Stable Diffusion & Negative",
    icon: Bot,
    options: {
      stripMidjourneyParams: true,
      stripLoRATags: true,
      stripNegativePrompts: true,
      stripWeights: true,
    },
  },
  {
    id: "all",
    label: "Strip All Prompt Parameters",
    icon: Eraser,
    options: defaultPromptOptions,
  },
];

import ToolDrawer from "@/components/ToolDrawer";

export interface PromptStripperProps {
  heading?: string;
  subheading?: string;
}

export default function PromptStripper({ heading, subheading }: PromptStripperProps = {}) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<PromptStripperOptions>(defaultPromptOptions);
  const [result, setResult] = useState<PromptStripperResult | null>(null);
  const [copied, setCopied] = useState(false);

  const inputStats = useMemo(() => getTextStats(input), [input]);
  const outputStats = useMemo(
    () => (result ? getTextStats(result.cleanedText) : emptyStats),
    [result]
  );
  const hasText = input.length > 0;

  function handleCleanPrompt() {
    if (!input.trim()) return;
    const res = stripAIPrompt(input, options);
    setResult(res);
    setCopied(false);
    trackCleanTextRun({
      toolName: "strip_ai_prompts",
      inputWords: inputStats.words,
      inputChars: inputStats.characters,
      changesCount: res.totalRemovedCount,
    });
  }

  function handleSampleText() {
    const sample = getSamplePromptText();
    setInput(sample);
    const res = stripAIPrompt(sample, options);
    setResult(res);
    trackCleanTextRun({
      toolName: "strip_ai_prompts_sample",
      inputWords: getTextStats(sample).words,
      inputChars: sample.length,
      changesCount: res.totalRemovedCount,
    });
  }

  function applyPreset(presetOptions: Partial<PromptStripperOptions>) {
    const updated = { ...options, ...presetOptions };
    setOptions(updated);
    if (hasText) {
      const res = stripAIPrompt(input, updated);
      setResult(res);
    }
  }

  function handleCopy() {
    if (!result) return;
    copy(result.cleanedText);
    setCopied(true);
    trackCopyText({ toolName: "strip_ai_prompts", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!result) return;
    trackDownloadFile({ toolName: "strip_ai_prompts", fileType: "txt" });
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
    <section className="bg-surface py-6 md:py-8">
      <div className="container mx-auto flex flex-col items-center gap-4 md:gap-5 px-4 md:px-6">
        {/* Top Header */}
        <div className="flex max-w-4xl md:max-w-5xl flex-col items-center gap-2 text-center">
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold">
            {heading ?? "Strip Midjourney, ChatGPT & SD Prompt Parameters"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-4xl mx-auto">
            {subheading ??
              "Remove Midjourney flags (--ar 16:9, --v 6.0), LoRA tags (<lora:...>), negative prompts, and weights instantly."}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCleanPrompt();
          }}
          className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-lowest shadow-md overflow-hidden"
        >
          {/* Top Tool Drawer Bar */}
          <ToolDrawer />

          <div className="p-6 sm:p-8">
            {/* Quick Presets Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-surface-container-highest/80 pb-4">
              <span className="font-code-stat text-code-stat uppercase text-outline mr-1">
                Quick Presets:
              </span>
              {promptPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.options)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-surface-container-highest/80 bg-surface-container-low px-3 py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <preset.icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Input Card */}
              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center justify-between pb-1">
                  <p className="flex items-center gap-1.5 font-headline-sm text-headline-sm text-on-surface font-medium">
                    <FileText className="h-4 w-4 text-secondary" aria-hidden="true" />
                    Raw AI Prompt Input
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSampleText}
                      className="flex cursor-pointer items-center gap-1 font-code-stat text-code-stat text-primary hover:underline"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      Try Sample Prompt
                    </button>
                    <p className="font-code-stat text-code-stat text-outline">
                      {inputStats.words} words, {inputStats.characters} chars
                    </p>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste raw AI prompt with --ar 16:9, <lora:...>, or Negative prompt parameters..."
                  rows={8}
                  className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-low p-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors leading-relaxed"
                />
              </div>

              {/* Output Card */}
              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center justify-between pb-1">
                  <p className="flex items-center gap-1.5 font-headline-sm text-headline-sm text-on-surface font-medium">
                    <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                    Cleaned Prompt Output
                  </p>
                  <div className="flex items-center gap-3">
                    {result && (
                      <span className="font-code-stat text-xs font-bold text-primary bg-primary-fixed/30 border border-primary-fixed px-2 py-0.5 rounded">
                        ✓ {result.totalRemovedCount} Parameters Stripped
                      </span>
                    )}
                    <p className="font-code-stat text-code-stat text-outline">
                      {outputStats.words} words, {outputStats.characters} chars
                    </p>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={result?.cleanedText ?? ""}
                  placeholder="Cleaned prompt text without flags or tags will appear here..."
                  rows={8}
                  className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-low p-4 font-body-md text-body-md text-on-surface placeholder:text-outline leading-relaxed"
                />
              </div>
            </div>

            {/* Options controls */}
            <div className="mt-6 flex flex-col gap-3 border-t border-surface-container-highest/80 pt-6 text-left">
              <p className="font-headline-sm text-sm font-semibold text-on-surface flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-secondary" aria-hidden="true" />
                Prompt Stripping Rules
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-body-md text-body-md text-on-surface">
                <label className="flex cursor-pointer items-center gap-2 hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={options.stripMidjourneyParams}
                    onChange={(e) => setOptions({ ...options, stripMidjourneyParams: e.target.checked })}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  Midjourney Flags (--ar, --v, --stylize, --seed)
                </label>
                <label className="flex cursor-pointer items-center gap-2 hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={options.stripLoRATags}
                    onChange={(e) => setOptions({ ...options, stripLoRATags: e.target.checked })}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  LoRA &amp; Network Tags (&lt;lora:...&gt;)
                </label>
                <label className="flex cursor-pointer items-center gap-2 hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={options.stripNegativePrompts}
                    onChange={(e) => setOptions({ ...options, stripNegativePrompts: e.target.checked })}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  Negative Prompt Chunks &amp; SD Parameters
                </label>
                <label className="flex cursor-pointer items-center gap-2 hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={options.stripWeights}
                    onChange={(e) => setOptions({ ...options, stripWeights: e.target.checked })}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  Prompt Weight Multipliers ((word:1.3))
                </label>
              </div>
            </div>

            {/* Parameter Summary Pill Bar */}
            {result && result.removedItems.length > 0 && (
              <div className="mt-6 flex flex-col gap-2 border-t border-surface-container-highest/80 pt-6 text-left">
                <p className="font-headline-sm text-sm font-semibold text-on-surface">
                  Stripped Parameters Summary ({result.removedItems.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.removedItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-lg bg-primary-fixed/20 border border-primary-fixed/60 px-2.5 py-1 font-code-stat text-xs text-primary"
                      title={item.item}
                    >
                      ✂️ {item.type}: {item.item.slice(0, 30)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Bar */}
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 border-t border-surface-container-highest/80 pt-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={!hasText}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Scissors className="h-4 w-4" aria-hidden="true" />
                  Strip Parameters &amp; Clean Prompt
                </button>
                {result ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all border border-surface-container-highest/80 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                      {copied ? "Copied" : "Copy Clean Prompt"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all border border-surface-container-highest/80 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download .txt
                    </button>
                  </>
                ) : null}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!hasText && !result}
                  className="flex cursor-pointer items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-error transition-colors disabled:cursor-not-allowed disabled:text-outline"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </button>

                <div className="hidden md:flex items-center gap-1.5 font-label-md text-label-md text-secondary">
                  <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>100% Client-Side</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
