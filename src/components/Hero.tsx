"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import copy from "copy-to-clipboard";
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
    icon: "auto_fix_high",
    iconColor: "text-primary",
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
    icon: "spellcheck",
    iconColor: "text-secondary",
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
    icon: "code",
    iconColor: "text-tertiary",
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
    icon: "description",
    iconColor: "text-primary",
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
    icon: "layers_clear",
    iconColor: "text-error",
    options: defaultCleaningOptions,
  },
];

export interface HeroProps {
  heading?: string;
  subheading?: string;
  initialOptions?: Partial<CleaningOptions>;
}

export default function Hero({ heading, subheading, initialOptions }: HeroProps = {}) {
  const { register, handleSubmit, control, reset, setValue } = useForm<FormValues>({
    defaultValues: { input: "", ...defaultCleaningOptions, ...initialOptions },
  });

  const [result, setResult] = useState<CleaningResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(true);
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
    const t0 = performance.now();
    const { input, ...options } = values;
    const cleanResult = cleanText(input, options);
    const inStats = getTextStats(input);
    const duration = Math.round(performance.now() - t0);
    setExecTime(duration);
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
  }

  function handleCopy() {
    if (!result) return;
    copy(result.cleaned);
    setCopied(true);
    trackCopyText({ toolName: "homepage_cleaner", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!result) return;
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
    const t0 = performance.now();
    const cleanResult = cleanText(sample, options as CleaningOptions);
    const duration = Math.round(performance.now() - t0);
    setExecTime(duration);
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
      const t0 = performance.now();
      const cleanResult = cleanText(input, options as CleaningOptions);
      const duration = Math.round(performance.now() - t0);
      setExecTime(duration);
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

  return (
    <div className="w-full">
      {/* SECTION 1: HERO & WORKSPACE HUB */}
      <section className="flex flex-col items-center text-center space-y-space-md mb-space-xl relative">
        {/* Main Headline & Copy */}
        <div className="space-y-space-xs max-w-3xl">
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold">
            {heading ?? "Paste AI text. Get clean text."}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {subheading ??
              "Remove invisible characters, unwanted formatting, AI cliché buzzwords (delve, tapestry), Markdown artifacts, and AI text quirks instantly."}
          </p>
        </div>

        {/* Trust / Privacy Indicator */}
        <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-xl bg-surface-container-low text-secondary font-label-md text-label-md shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
          <span>Private. 100% Browser-based processing. Zero server storage.</span>
        </div>

        {/* Quick Presets Filter Track */}
        <div className="w-full max-w-4xl pt-space-sm flex flex-wrap items-center justify-center gap-space-xs font-label-sm text-label-sm">
          <span className="font-code-stat text-code-stat text-outline uppercase tracking-wider mr-space-xs">
            QUICK PRESETS:
          </span>
          {presets.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id, preset.options, preset.label)}
                className={`preset-btn px-3 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-on-primary font-semibold"
                    : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <span className={`material-symbols-outlined text-[14px] ${isSelected ? "text-on-primary" : preset.iconColor}`}>
                  {preset.icon}
                </span>
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: DUAL-PANEL EDITOR WORKSPACE (CENTERPIECE) */}
      <section className="w-full flex flex-col space-y-space-md mb-space-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Editor Frame */}
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Workspace Split (Left Input / Right Output) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 relative">
              {/* LEFT PANEL: INPUT */}
              <div className="flex flex-col bg-surface-container-lowest p-space-md">
                <div className="flex items-center justify-between pb-space-sm mb-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Input</span>
                    <button
                      type="button"
                      onClick={handleSampleText}
                      className="ml-2 font-code-stat text-code-stat text-primary hover:underline flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[12px]">play_arrow</span>
                      <span>Try Sample Text</span>
                    </button>
                  </div>
                  <span className="font-code-stat text-code-stat text-outline" id="input-stats">
                    {inputStats.words} words, {inputStats.characters} chars
                  </span>
                </div>
                <textarea
                  {...register("input")}
                  className="w-full bg-transparent resize-none font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none leading-relaxed"
                  id="raw-input"
                  placeholder='Paste messy AI text here (e.g. smart quotes, em dashes, zero-width chars, "delve", markdown artifacts)...'
                  rows={12}
                ></textarea>
                <div className="pt-space-sm flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>Raw Text Buffer</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleClearInput}
                    className="hover:text-error transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">delete_sweep</span> Clear
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL: OUTPUT */}
              <div className="flex flex-col bg-surface-container-low p-space-md">
                <div className="flex items-center justify-between pb-space-sm mb-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed-variant"></span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Output</span>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <span className="font-code-stat text-code-stat text-outline" id="output-stats">
                      {outputStats.words} words, {outputStats.characters} chars
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      id="copy-btn"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copied ? "check" : "content_copy"}
                      </span>
                      <span id="copy-text">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={result?.cleaned ?? ""}
                  className="w-full bg-transparent resize-none font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none leading-relaxed"
                  id="clean-output"
                  placeholder="Cleaned results will materialize here"
                  rows={12}
                ></textarea>
                <div className="pt-space-sm flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Sanitized Output Stream</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">download</span> Export .txt
                  </button>
                </div>
              </div>
            </div>

            {/* CENTRAL ACTION STRIP */}
            <div className="bg-surface-container px-space-md py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm">
              <div className="flex items-center gap-2 font-code-stat text-code-stat text-secondary">
                <span className="material-symbols-outlined text-[15px] text-primary">sync_alt</span>
                <span>Input → Output</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Clean Text</span>
                </button>
              </div>
              {/* Processing Status Bar */}
              <div className="font-code-stat text-code-stat text-outline" id="execution-status">
                • {execTime}ms • {result ? result.totalChanges : 0} issues fixed • UTF-8 NFC Verified
              </div>
            </div>
          </div>

          {/* EXPANDABLE CLEANING OPTIONS PANEL */}
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all duration-200 mt-space-md">
            <button
              type="button"
              onClick={() => setOptionsOpen(!optionsOpen)}
              className="w-full px-space-md py-3 flex items-center justify-between bg-surface-container-low hover:bg-surface-container text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                  Cleaning options (14 rules)
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-secondary transition-transform duration-200 ${
                  optionsOpen ? "rotate-180" : ""
                }`}
                id="options-chevron"
              >
                expand_more
              </span>
            </button>
            {optionsOpen && (
              <div className="p-space-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm" id="options-grid">
                {cleaningOptionsList.map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center gap-space-sm p-2 rounded-lg hover:bg-surface-container-low cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      {...register(opt.key)}
                      className="w-4 h-4 rounded text-primary accent-primary"
                    />
                    <span className="font-label-sm text-label-sm text-on-surface">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
