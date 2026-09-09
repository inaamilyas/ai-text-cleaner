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
    <section className="bg-white">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 sm:px-6 py-6 sm:py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCleanPrompt();
          }}
          className="w-full rounded-lg border border-neutral-200 bg-white shadow-xs overflow-hidden"
        >
          {/* Top Tool Drawer Bar */}
          <ToolDrawer />

          <div className="p-4 sm:p-8">
          {/* Quick Presets Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 border-b border-neutral-200 pb-3">
            <span className="text-body-xs font-bold uppercase text-neutral-500 mr-1.5">
              Quick Presets:
            </span>
            {promptPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.options)}
                className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 transition-colors duration-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-2"
              >
                <preset.icon className="h-3 w-3" aria-hidden="true" />
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Input Card */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <FileText className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                  Raw AI Prompt Input
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSampleText}
                    className="flex cursor-pointer items-center gap-1 text-body-xs font-bold text-primary-700 hover:underline"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Try Sample Prompt
                  </button>
                  <p className="text-body-sm text-neutral-500">
                    {inputStats.words} words, {inputStats.characters} chars
                  </p>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste raw AI prompt with --ar 16:9, <lora:...>, or Negative prompt parameters..."
                rows={7}
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Output Card */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <Sparkles className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  Cleaned Prompt Output
                </p>
                <div className="flex items-center gap-3">
                  {result && (
                    <span className="text-body-xs font-bold text-primary-800 bg-primary-100 px-2 py-0.5 rounded">
                      ✓ {result.totalRemovedCount} Parameters Stripped
                    </span>
                  )}
                  <p className="text-body-sm text-neutral-500">
                    {outputStats.words} words, {outputStats.characters} chars
                  </p>
                </div>
              </div>
              <textarea
                readOnly
                value={result?.cleanedText ?? ""}
                placeholder="Cleaned prompt text without flags or tags will appear here..."
                rows={7}
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Options controls */}
          <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-left">
            <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
              <SlidersHorizontal className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              Prompt Stripping Rules
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <label className="flex cursor-pointer items-center gap-2 text-body-sm text-neutral-700 hover:text-primary-700 transition-colors">
                <input
                  type="checkbox"
                  checked={options.stripMidjourneyParams}
                  onChange={(e) => setOptions({ ...options, stripMidjourneyParams: e.target.checked })}
                  className="h-4 w-4 cursor-pointer accent-primary-600"
                />
                Midjourney Flags (--ar, --v, --stylize, --seed)
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-body-sm text-neutral-700 hover:text-primary-700 transition-colors">
                <input
                  type="checkbox"
                  checked={options.stripLoRATags}
                  onChange={(e) => setOptions({ ...options, stripLoRATags: e.target.checked })}
                  className="h-4 w-4 cursor-pointer accent-primary-600"
                />
                LoRA &amp; Network Tags (&lt;lora:...&gt;)
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-body-sm text-neutral-700 hover:text-primary-700 transition-colors">
                <input
                  type="checkbox"
                  checked={options.stripNegativePrompts}
                  onChange={(e) => setOptions({ ...options, stripNegativePrompts: e.target.checked })}
                  className="h-4 w-4 cursor-pointer accent-primary-600"
                />
                Negative Prompt Chunks &amp; SD Parameters
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-body-sm text-neutral-700 hover:text-primary-700 transition-colors">
                <input
                  type="checkbox"
                  checked={options.stripWeights}
                  onChange={(e) => setOptions({ ...options, stripWeights: e.target.checked })}
                  className="h-4 w-4 cursor-pointer accent-primary-600"
                />
                Prompt Weight Multipliers ((word:1.3))
              </label>
            </div>
          </div>

          {/* Parameter Summary Pill Bar */}
          {result && result.removedItems.length > 0 && (
            <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-left">
              <p className="text-body-sm font-bold text-neutral-700">
                Stripped Parameters Summary ({result.removedItems.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {result.removedItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2.5 py-1 text-body-xs font-bold text-primary-800"
                    title={item.item}
                  >
                    ✂️ {item.type}: {item.item.slice(0, 30)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
            <button
              type="submit"
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              <Scissors className="h-5 w-5" aria-hidden="true" />
              Strip Parameters &amp; Clean Prompt
            </button>
            {result ? (
              <>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-8 py-3.5 sm:py-4 text-button text-neutral-800 transition-colors duration-200 hover:border-primary-600 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-5 w-5" aria-hidden="true" />
                  )}
                  {copied ? "Copied" : "Copy Clean Prompt"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3.5 sm:py-4 text-button text-neutral-700 transition-colors duration-200 hover:border-primary-600 hover:text-primary-700"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Download .txt
                </button>
              </>
            ) : null}
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasText && !result}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 py-2 text-body-sm font-bold text-neutral-600 transition-colors duration-200 hover:text-primary-600 disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
          </div>
        </form>

        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-bold text-primary-900 sm:text-xl">
            {heading ?? "Strip Midjourney, ChatGPT & SD Prompt Parameters"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Remove Midjourney flags (--ar 16:9, --v 6.0), LoRA tags (<lora:...>), negative prompts, and weights instantly."}
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-body-sm text-neutral-500">
          <ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden="true" />
          Private. 100% Browser-based processing. Zero server storage.
        </p>
      </div>
    </section>
  );
}
