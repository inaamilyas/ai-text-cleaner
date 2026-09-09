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
    <section className="bg-white">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 sm:px-6 py-6 sm:py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInspect();
          }}
          className="w-full rounded-lg border border-neutral-200 bg-white p-4 sm:p-8"
        >
          {/* Quick Presets Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 border-b border-neutral-200 pb-3">
            <span className="text-body-xs font-bold uppercase text-neutral-500 mr-1.5">
              Quick Presets:
            </span>
            {visualizerPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.sample)}
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
                  Raw Text Input
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
                rows={7}
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
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Visualizer Output Card */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <Eye className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  Character Visualizer Output
                </p>
                <div className="flex items-center gap-3">
                  {result && (
                    <span
                      className={`text-body-xs font-bold px-2.5 py-0.5 rounded ${
                        result.totalInvisibleCount > 0
                          ? "bg-rose-100 text-rose-900 border border-rose-200"
                          : "bg-primary-100 text-primary-800"
                      }`}
                    >
                      {result.totalInvisibleCount > 0
                        ? `⚠️ ${result.totalInvisibleCount} Invisible Characters`
                        : "✓ 0 Invisible Characters"}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full min-h-[200px] max-h-[240px] overflow-y-auto rounded-lg border border-neutral-300 bg-neutral-900 p-4 text-body-sm text-neutral-100 font-mono whitespace-pre-wrap leading-relaxed">
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
                    Visual character badges will render here when you paste or inspect text...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Breakdown pill bar */}
          {result && Object.keys(result.counts).length > 0 && (
            <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-left">
              <p className="text-body-sm font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-rose-600" /> Hidden Character Breakdown Detected:
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(result.counts).map(([name, count]) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2.5 py-1 text-body-xs font-bold text-rose-900 border border-rose-200"
                  >
                    🔴 {count} × {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Button Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
            <button
              type="submit"
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              <Eye className="h-5 w-5" aria-hidden="true" />
              Inspect Invisible Characters
            </button>
            {result ? (
              <button
                type="button"
                onClick={handleCopyClean}
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-8 py-3.5 sm:py-4 text-button text-neutral-800 transition-colors duration-200 hover:border-primary-600 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
                ) : (
                  <Sparkles className="h-5 w-5 text-primary-600" aria-hidden="true" />
                )}
                {copied ? "Copied Clean Text" : "Strip All & Copy Clean Text"}
              </button>
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

        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-bold text-primary-900 sm:text-xl">
            {heading ?? "Zero-Width & Invisible Character Visualizer"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Highlight hidden zero-width spaces (U+200B), NBSPs (U+00A0), soft hyphens (U+00AD), and BOM markers with color-coded visual badges."}
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
