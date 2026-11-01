"use client";

import { useMemo, useState, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import copy from "copy-to-clipboard";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Download,
  Trash2,
  Play,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  cleanText,
  cleaningOptionsList,
  defaultCleaningOptions,
  getSampleText,
  type CleaningOptions,
  type CleaningOptionKey,
  type CleaningResult,
} from "@/lib/cleanText";
import { getTextStats } from "@/lib/textStats";
import {
  trackCleanTextRun,
  trackCopyText,
  trackDownloadFile,
  trackPresetSelect,
} from "@/lib/analytics";

type FormValues = {
  input: string;
} & CleaningOptions;

const emptyStats = { words: 0, characters: 0, sentences: 0 };

const presets = [
  {
    id: "chatgpt",
    label: "ChatGPT & Claude",
    options: {
      removeMarkdown: true,
      normalizeQuotes: true,
      normalizeDashes: true,
      removeTrailingWhitespace: true,
      removeHiddenCharacters: true,
      removeAIFluff: true,
    },
  },
  {
    id: "buzzwords",
    label: "Remove AI Buzzwords",
    options: {
      removeAIWords: true,
      removeMarkdown: true,
      removeTrailingWhitespace: true,
      removeHiddenCharacters: true,
      removeAIFluff: true,
    },
  },
  {
    id: "code",
    label: "Code & JSON Safe",
    options: {
      normalizeQuotes: true,
      normalizeDashes: true,
      convertNonBreakingSpaces: true,
      removeHiddenCharacters: true,
      normalizeUnicode: true,
      removeMarkdown: false,
    },
  },
  {
    id: "docs",
    label: "Publishing & Docs",
    options: {
      normalizeQuotes: true,
      normalizeDashes: true,
      convertEllipsis: true,
      removeTrailingWhitespace: true,
      removeHiddenCharacters: true,
      removeMarkdown: false,
    },
  },
  {
    id: "all",
    label: "Strip Everything",
    options: defaultCleaningOptions,
  },
];

function runTimedCleaning(input: string, options: CleaningOptions): { cleanResult: CleaningResult; durationMs: number } {
  const start = Date.now();
  const cleanResult = cleanText(input, options);
  const durationMs = Date.now() - start;
  return { cleanResult, durationMs };
}

export interface HeroProps {
  heading?: string;
  subheading?: string;
  initialOptions?: Partial<CleaningOptions>;
}

export default function Hero({ heading, subheading, initialOptions }: HeroProps = {}) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { register, handleSubmit, control, reset, setValue } = useForm<FormValues>({
    defaultValues: { input: "", ...defaultCleaningOptions, ...initialOptions },
  });

  const [result, setResult] = useState<CleaningResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("chatgpt");
  const [execTime, setExecTime] = useState<number>(0);

  const inputText = useWatch({ control, name: "input" }) || "";
  const inputStats = useMemo(() => getTextStats(inputText), [inputText]);
  const hasText = inputText.length > 0;

  const outputStats = useMemo(
    () => (result ? getTextStats(result.cleaned) : emptyStats),
    [result]
  );

  function onSubmit(values: FormValues) {
    const { input, ...options } = values;
    const { cleanResult, durationMs } = runTimedCleaning(input, options);
    const inStats = getTextStats(input);
    setExecTime(durationMs);
    setResult(cleanResult);
    setCopied(false);
    trackCleanTextRun({
      toolName: "homepage_cleaner",
      inputWords: inStats.words,
      inputChars: inStats.characters,
      changesCount: cleanResult.totalChanges,
    });
  }

  function handleReset() {
    reset({ input: "", ...defaultCleaningOptions, ...initialOptions });
    setResult(null);
    setCopied(false);
    setExecTime(0);
  }

  function handleClearInput() {
    setValue("input", "");
    setResult(null);
    setExecTime(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleCopy() {
    if (!result || !result.cleaned) return;
    copy(result.cleaned);
    setCopied(true);
    trackCopyText({ toolName: "homepage_cleaner", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!result || !result.cleaned) return;
    trackDownloadFile({ toolName: "homepage_cleaner", fileType: "txt" });
    const blob = new Blob([result.cleaned], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cleaned-text.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleSampleText() {
    const sample = getSampleText();
    setValue("input", sample);
    const values = control._getWatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { input: _input, ...options } = values;
    const { cleanResult, durationMs } = runTimedCleaning(sample, options as CleaningOptions);
    setExecTime(durationMs);
    const sampleStats = getTextStats(sample);
    setResult(cleanResult);
    trackCleanTextRun({
      toolName: "homepage_sample_text",
      inputWords: sampleStats.words,
      inputChars: sampleStats.characters,
      changesCount: cleanResult.totalChanges,
    });
  }

  function applyPreset(presetId: string, presetOptions: Partial<CleaningOptions>, presetLabel?: string) {
    setActivePreset(presetId);
    if (presetLabel) {
      trackPresetSelect(presetLabel);
    }
    Object.entries(presetOptions).forEach(([key, val]) => {
      setValue(key as CleaningOptionKey, val as boolean);
    });
    if (hasText) {
      const values = control._getWatch();
      const { input, ...options } = values;
      const { cleanResult, durationMs } = runTimedCleaning(input, options as CleaningOptions);
      setExecTime(durationMs);
      const inStats = getTextStats(input);
      setResult(cleanResult);
      trackCleanTextRun({
        toolName: `preset_${presetLabel || "custom"}`,
        inputWords: inStats.words,
        inputChars: inStats.characters,
        changesCount: cleanResult.totalChanges,
      });
    }
  }

  function scrollToWorkspace() {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current.focus();
    }
  }

  const { ref: registerRef, ...registerInputRest } = register("input");

  return (
    <div className="w-full" id="workspace">
      {/* 1. HERO HEADER */}
      <section className="flex flex-col items-center text-center pt-4 pb-8 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#172D4A] mb-4">
          {heading ?? "Clean up your text in seconds"}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-3xl">
          {subheading ??
            "Remove unwanted formatting, extra spaces, unnecessary line breaks, and hidden characters from copied text. Paste your content, clean it up, and get text that's easier to read and use."}
        </p>

        {/* Action Triggers & Supporting Line */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <button
            type="button"
            onClick={scrollToWorkspace}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Clean My Text</span>
          </button>
          <a
            href="#other-tools"
            className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors flex items-center gap-1.5 no-underline"
          >
            <span>Explore All Tools</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>
        <p className="text-xs text-slate-500 font-normal">
          A simple online workspace for cleaning and formatting text.
        </p>

        {/* Presets Bar */}
        <div className="w-full pt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] mr-1">
            Presets:
          </span>
          {presets.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id, preset.options, preset.label)}
                className={`px-3 py-1.5 rounded-md transition-all text-xs font-medium cursor-pointer border ${
                  isSelected
                    ? "bg-blue-50 border-blue-600 text-blue-700 font-semibold"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. MAIN TEXT-CLEANING WORKSPACE */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            {/* Split Grid: Left Input / Right Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* LEFT PANEL: INPUT */}
              <div className="flex flex-col p-4 sm:p-5 bg-white">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <label htmlFor="raw-input" className="text-sm font-semibold text-[#172D4A] cursor-pointer">
                      Your text
                    </label>
                    <button
                      type="button"
                      onClick={handleSampleText}
                      className="ml-2 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Try sample text</span>
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 font-mono" id="input-stats">
                    {inputStats.words} words, {inputStats.characters} chars
                  </span>
                </div>

                <textarea
                  {...registerInputRest}
                  ref={(e) => {
                    registerRef(e);
                    inputRef.current = e;
                  }}
                  id="raw-input"
                  className="w-full bg-transparent resize-none text-sm text-[#172D4A] placeholder:text-slate-400 focus:outline-none leading-relaxed min-h-[220px] font-sans"
                  placeholder="Paste or type the text you want to clean…"
                  rows={9}
                ></textarea>

                <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Processed locally in browser</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleClearInput}
                    className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-500 font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL: OUTPUT */}
              <div className="flex flex-col p-4 sm:p-5 bg-[#F4F7FB]/50">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                    <label htmlFor="clean-output" className="text-sm font-semibold text-[#172D4A]">
                      Cleaned text
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono" id="output-stats">
                      {outputStats.words} words, {outputStats.characters} chars
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={!result?.cleaned}
                      className={`px-3 py-1 rounded text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        copied
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                      id="copy-btn"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Result</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  value={result?.cleaned ?? ""}
                  id="clean-output"
                  className="w-full bg-transparent resize-none text-sm text-[#172D4A] placeholder:text-slate-400 focus:outline-none leading-relaxed min-h-[220px] font-sans"
                  placeholder="Cleaned text will appear here…"
                  rows={9}
                ></textarea>

                <div className="pt-3 mt-auto border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-slate-500 font-mono">
                    {result ? `${result.totalChanges} supported issues fixed` : "Ready to clean"}
                  </span>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!result?.cleaned}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1 text-slate-500 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .txt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ACTION STRIP */}
            <div className="bg-slate-50 px-4 sm:px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-mono">
                {execTime > 0 ? `Completed in ${execTime}ms` : "Fast, in-browser processing"}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset</span>
                  </span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clean Text</span>
                </button>
              </div>
            </div>
          </div>

          {/* EXPANDABLE CLEANING OPTIONS */}
          <div className="mt-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <button
              type="button"
              onClick={() => setOptionsOpen(!optionsOpen)}
              className="w-full px-4 sm:px-5 py-3 flex items-center justify-between bg-white hover:bg-slate-50 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-[#172D4A]">
                  Cleaning Options ({cleaningOptionsList.length} verified rules)
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  optionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {optionsOpen && (
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-[#F4F7FB]/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {cleaningOptionsList.map((opt) => (
                    <label
                      key={opt.key}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-slate-300 hover:bg-white text-xs cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        {...register(opt.key)}
                        className="mt-0.5 w-4 h-4 rounded text-blue-600 accent-blue-600 border-slate-300"
                      />
                      <span className="text-slate-700 leading-snug">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
