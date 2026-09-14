'use client';

import { useMemo, useState } from "react";
import {
  Eye,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wand2,
  AlertTriangle,
  FileText,
  Zap,
  Space,
  Minus,
  Eraser,
} from "lucide-react";
import copy from "copy-to-clipboard";
import {
  inspectInvisibleCharacters,
  getSampleInvisibleText,
  type InvisibleInspectionResult,
} from "@/lib/inspectInvisible";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun, trackCopyText } from "@/lib/analytics";

const visualizerPresets = [
  {
    id: "zwsp",
    label: "Zero-Width Space (U+200B)",
    icon: Zap,
    sample: "Clean\u200Btext with hidden\u200Bzero-width spaces.",
  },
  {
    id: "shy",
    label: "Soft Hyphen (U+00AD)",
    icon: Minus,
    sample: "Multi\u00ADline formatted\u00ADdocument with soft hyphens.",
  },
  {
    id: "nbsp",
    label: "Non-Breaking Spaces (U+00A0)",
    icon: Space,
    sample: "Words\u00A0separated\u00A0by non-breaking spaces.",
  },
  {
    id: "sample",
    label: "Full Invisible Scan",
    icon: Eraser,
    sample: null,
  },
];

export interface InvisibleVisualizerProps {
  heading?: string;
  subheading?: string;
}

export default function InvisibleVisualizer({ heading, subheading }: InvisibleVisualizerProps = {}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<InvisibleInspectionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const inputStats = useMemo(() => getTextStats(input), [input]);
  const hasText = input.length > 0;

  function handleInspect() {
    if (!input) return;
    const res = inspectInvisibleCharacters(input);
    setResult(res);
    setCopied(false);
    trackCleanTextRun({
      toolName: "visualize_invisible_characters",
      inputWords: inputStats.words,
      inputChars: inputStats.characters,
      changesCount: res.totalInvisibleCount,
    });
  }

  function handleSampleText() {
    const sample = getSampleInvisibleText();
    setInput(sample);
    const res = inspectInvisibleCharacters(sample);
    setResult(res);
    trackCleanTextRun({
      toolName: "visualize_invisible_sample",
      inputWords: getTextStats(sample).words,
      inputChars: sample.length,
      changesCount: res.totalInvisibleCount,
    });
  }

  function applyPreset(presetSample: string | null) {
    const textToScan = presetSample ?? getSampleInvisibleText();
    setInput(textToScan);
    const res = inspectInvisibleCharacters(textToScan);
    setResult(res);
  }

  function handleCopyClean() {
    if (!result) return;
    copy(result.cleanedText);
    setCopied(true);
    trackCopyText({ toolName: "visualize_invisible_characters", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 1500);
  }

  function handleReset() {
    setInput("");
    setResult(null);
    setCopied(false);
  }

  return (
    <section className="bg-surface py-8 md:py-12">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 md:px-6">
        {/* Top Header */}
        <div className="flex max-w-3xl flex-col items-center gap-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-code-stat text-code-stat shadow-sm mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>CLIENT RUNTIME • 100% PRIVATE</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold">
            {heading ?? "Zero-Width & Invisible Character Visualizer"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {subheading ??
              "Highlight hidden zero-width spaces (U+200B), NBSPs (U+00A0), soft hyphens (U+00AD), and BOM markers with color-coded visual badges."}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInspect();
          }}
          className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-lowest p-6 sm:p-8 shadow-md"
        >
          {/* Quick Presets Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-surface-container-highest/80 pb-4">
            <span className="font-code-stat text-code-stat uppercase text-outline mr-1">
              Quick Presets:
            </span>
            {visualizerPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.sample)}
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
                  Raw Text Input
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSampleText}
                    className="flex cursor-pointer items-center gap-1 font-code-stat text-code-stat text-primary hover:underline"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Try Sample Text
                  </button>
                  <p className="font-code-stat text-code-stat text-outline">
                    {inputStats.words} words, {inputStats.characters} chars
                  </p>
                </div>
              </div>
              <textarea
                rows={8}
                value={input}
                onChange={(e) => {
                  const val = e.target.value;
                  setInput(val);
                  if (val) {
                    setResult(inspectInvisibleCharacters(val));
                  } else {
                    setResult(null);
                  }
                }}
                placeholder="Paste text containing zero-width spaces or hidden Unicode artifacts here..."
                className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-low p-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors leading-relaxed"
              />
            </div>

            {/* Visualizer Output Card */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between pb-1">
                <p className="flex items-center gap-1.5 font-headline-sm text-headline-sm text-on-surface font-medium">
                  <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
                  Character Visualizer Output
                </p>
                <div className="flex items-center gap-3">
                  {result && (
                    <span
                      className={`font-code-stat text-xs font-bold px-2.5 py-0.5 rounded ${
                        result.totalInvisibleCount > 0
                          ? "bg-error/10 text-error border border-error/30"
                          : "bg-primary-fixed/30 text-primary border border-primary-fixed"
                      }`}
                    >
                      {result.totalInvisibleCount > 0
                        ? `⚠️ ${result.totalInvisibleCount} Invisible Characters`
                        : "✓ 0 Invisible Characters"}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full min-h-[210px] max-h-[250px] overflow-y-auto rounded-xl border border-surface-container-highest/80 bg-[#121316] p-4 text-body-md text-neutral-100 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                {result ? (
                  result.segments.map((seg) =>
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
                  )
                ) : (
                  <span className="text-neutral-500 italic">
                    Type or paste text on the left to highlight hidden zero-width and invisible control codes...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Breakdown pill bar */}
          {result && Object.keys(result.counts).length > 0 && (
            <div className="mt-6 flex flex-col gap-2 border-t border-surface-container-highest/80 pt-6 text-left">
              <p className="font-headline-sm text-headline-sm text-error flex items-center gap-1.5 font-medium">
                <AlertTriangle className="h-4 w-4 text-error" /> Hidden Character Breakdown Detected:
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(result.counts).map(([name, count]) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1 rounded-md bg-error/10 px-2.5 py-1 font-label-sm text-label-sm text-error border border-error/30"
                  >
                    🔴 {count} × {name}
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
                <Eye className="h-4 w-4" aria-hidden="true" />
                Inspect Invisible Characters
              </button>
              {result ? (
                <button
                  type="button"
                  onClick={handleCopyClean}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all border border-surface-container-highest/80 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  )}
                  {copied ? "Copied Clean Text" : "Strip All & Copy Clean Text"}
                </button>
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
        </form>
      </div>
    </section>
  );
}
