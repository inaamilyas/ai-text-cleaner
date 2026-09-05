"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import copy from "copy-to-clipboard";
import {
  FileText,
  Sparkles,
  SlidersHorizontal,
  Type,
  Hash,
  AlignLeft,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  EyeOff,
  Space,
  Minus,
  Quote,
  Ellipsis,
  AlignHorizontalSpaceBetween,
  RemoveFormatting,
  Languages,
  Smile,
  Shapes,
  Download,
  Wand2,
  Eye,
  Bot,
  Binary,
  Code2,
  MessageSquareOff,
  type LucideIcon,
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

type FormValues = {
  input: string;
} & CleaningOptions;

const emptyStats = { words: 0, characters: 0, sentences: 0 };

const statConfig = [
  { key: "words" as const, label: "Words", icon: Type },
  { key: "characters" as const, label: "Characters", icon: Hash },
  { key: "sentences" as const, label: "Sentences", icon: AlignLeft },
];

const cleaningOptionIcons: Record<CleaningOptionKey, LucideIcon> = {
  removeHiddenCharacters: EyeOff,
  convertNonBreakingSpaces: Space,
  normalizeDashes: Minus,
  normalizeQuotes: Quote,
  convertEllipsis: Ellipsis,
  removeTrailingWhitespace: AlignHorizontalSpaceBetween,
  removeMarkdown: RemoveFormatting,
  normalizeUnicode: Languages,
  removeEmoji: Smile,
  removeDecorativeSymbols: Shapes,
  removeAIWords: Bot,
  removeLaTeX: Binary,
  removeHTML: Code2,
  removeAIFluff: MessageSquareOff,
};

const presets = [
  {
    id: "chatgpt",
    label: "⚡ ChatGPT & Claude",
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
    id: "aibuzzwords",
    label: "🤖 Remove AI Buzzwords",
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
    label: "💻 Code & JSON Safe",
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
    label: "📝 Publishing & Docs",
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
    label: "🧹 Strip Everything",
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
  const [viewDiff, setViewDiff] = useState(false);

  const inputText = useWatch({ control, name: "input" });
  const inputStats = useMemo(() => getTextStats(inputText), [inputText]);
  const hasText = inputText.length > 0;

  const outputStats = useMemo(
    () => (result ? getTextStats(result.cleaned) : emptyStats),
    [result]
  );

  function onSubmit(values: FormValues) {
    const { input, ...options } = values;
    setResult(cleanText(input, options));
    setCopied(false);
  }

  function handleReset() {
    reset({ input: "", ...defaultCleaningOptions, ...initialOptions });
    setResult(null);
    setCopied(false);
    setViewDiff(false);
  }

  function handleCopy() {
    if (!result) return;
    copy(result.cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!result) return;
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
    const { input, ...options } = values;
    setResult(cleanText(sample, options as CleaningOptions));
  }

  function applyPreset(presetOptions: Partial<CleaningOptions>) {
    Object.entries(presetOptions).forEach(([key, val]) => {
      setValue(key as CleaningOptionKey, val as boolean);
    });
    if (hasText) {
      const values = control._getWatch();
      const { input, ...options } = values;
      setResult(cleanText(input, options as CleaningOptions));
    }
  }

  return (
    <section className="bg-primary-0">
      <div className="container mx-auto flex flex-col items-center gap-8 sm:gap-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="flex max-w-2xl flex-col items-center gap-3 sm:gap-4 text-center">
          <h1 className="text-3xl sm:text-h1">{heading ?? "Paste AI text. Get clean text."}</h1>
          <p className="text-body-md sm:text-body-lg text-neutral-700">
            {subheading ??
              "Remove invisible characters, unwanted formatting, AI cliché buzzwords (delve, tapestry), Markdown artifacts, and AI text quirks instantly."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-8 shadow-sm"
        >
          {/* Quick Presets Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-5">
            <span className="text-body-xs font-bold uppercase text-neutral-500 mr-2">
              Quick Presets:
            </span>
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.options)}
                className="cursor-pointer rounded-full border border-neutral-300 bg-neutral-0 px-3.5 py-1.5 text-body-xs font-medium text-neutral-700 transition-all hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-2"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <FileText
                    className="h-4 w-4 text-neutral-500"
                    aria-hidden="true"
                  />
                  Input
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSampleText}
                    className="flex cursor-pointer items-center gap-1 text-body-xs font-bold text-primary-700 hover:underline"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Try Sample Text
                  </button>
                  <p className="text-body-sm text-neutral-500">
                    {inputStats.words} words, {inputStats.characters} chars
                  </p>
                </div>
              </div>
              <textarea
                {...register("input")}
                placeholder="Paste your AI-generated text here..."
                rows={10}
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <Sparkles
                    className="h-4 w-4 text-primary-600"
                    aria-hidden="true"
                  />
                  Output
                </p>
                <div className="flex items-center gap-3">
                  {result && (
                    <button
                      type="button"
                      onClick={() => setViewDiff(!viewDiff)}
                      className={`flex cursor-pointer items-center gap-1 rounded px-2 py-0.5 text-body-xs font-bold transition-colors ${
                        viewDiff
                          ? "bg-primary-600 text-neutral-50"
                          : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {viewDiff ? "Showing Diff" : "View Diff"}
                    </button>
                  )}
                  <p className="text-body-sm text-neutral-500">
                    {outputStats.words} words, {outputStats.characters} chars
                  </p>
                </div>
              </div>
              {viewDiff && result ? (
                <div className="w-full min-h-[240px] max-h-[270px] overflow-y-auto rounded-lg border border-primary-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 font-mono whitespace-pre-wrap">
                  <div className="mb-2 text-body-xs font-bold text-primary-700 uppercase bg-primary-50 p-1.5 rounded border border-primary-200">
                    Visual Diff View
                  </div>
                  {result.cleaned}
                </div>
              ) : (
                <textarea
                  readOnly
                  value={result?.cleaned ?? ""}
                  placeholder="Your cleaned text will appear here."
                  rows={10}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400"
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-left">
            <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
              <SlidersHorizontal
                className="h-4 w-4 text-neutral-500"
                aria-hidden="true"
              />
              Cleaning options
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {cleaningOptionsList.map((option) => {
                const OptionIcon = cleaningOptionIcons[option.key];
                return (
                  <label
                    key={option.key}
                    className="flex cursor-pointer items-center gap-2 text-body-sm text-neutral-700 hover:text-primary-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      {...register(option.key)}
                      className="h-4 w-4 cursor-pointer accent-primary-600"
                    />
                    <OptionIcon
                      className="h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </div>

          {result ? (
            <div className="mt-6 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-left">
              <p className="text-body-sm font-bold text-neutral-700">
                Text analysis & Character Inspector
              </p>
              <div className="grid grid-cols-3 gap-4 sm:max-w-md">
                {statConfig.map((stat) => (
                  <div key={stat.key} className="flex flex-col gap-1">
                    <p className="flex items-center gap-1.5 text-body-sm text-neutral-500">
                      <stat.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {stat.label}
                    </p>
                    <p className="text-h6">
                      {inputStats[stat.key]} -&gt; {outputStats[stat.key]}
                    </p>
                  </div>
                ))}
              </div>

              {result.summary.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <p className="text-body-sm font-bold text-neutral-700">
                    {result.totalChanges} formatting issues & hidden artifacts removed:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.summary.map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2.5 py-1 text-body-xs font-bold text-primary-800"
                      >
                        ✓ {item.count} {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-body-sm text-neutral-600">
                  No issues found. Your text was already clean.
                </p>
              )}
            </div>
          ) : null}

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
            <button
              type="submit"
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-600 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Clean Text
            </button>
            {result ? (
              <>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 px-8 py-3.5 sm:py-4 text-button text-neutral-900 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-5 w-5" aria-hidden="true" />
                  )}
                  {copied ? "Copied" : "Copy Clean Text"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 px-6 py-3.5 sm:py-4 text-button text-neutral-700 transition-colors duration-200 hover:bg-neutral-100"
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
        </form>

        <p className="flex items-center gap-1.5 text-body-sm text-neutral-500">
          <ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden="true" />
          Private. 100% Browser-based processing. Zero server storage.
        </p>
      </div>
    </section>
  );
}
