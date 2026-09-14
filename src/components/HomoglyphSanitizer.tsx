'use client';

import { useMemo, useState } from "react";
import {
  ShieldAlert,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wand2,
  Lock,
  FileText,
  Zap,
  Languages,
  Code2,
  Eraser,
  Download,
} from "lucide-react";
import copy from "copy-to-clipboard";
import {
  cleanHomoglyphs,
  getSampleHomoglyphText,
  type HomoglyphResult,
} from "@/lib/cleanHomoglyphs";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun, trackCopyText, trackDownloadFile } from "@/lib/analytics";

const emptyStats = { words: 0, characters: 0, sentences: 0 };

const homoglyphPresets = [
  {
    id: "cyrillic",
    label: "Cyrillic & Greek Look-Alikes",
    icon: Zap,
    sample: "T\u0435st\u0430ng text w\u0456th f\u0430k\u0435 Cyr\u0456ll\u0456c letters.",
  },
  {
    id: "fullwidth",
    label: "Full-Width ASCII Characters",
    icon: Languages,
    sample: "Ｔｅｓｔｉｎｇ  ｆｕｌｌ－ｗｉｄｔｈ  ｔｅｘｔ.",
  },
  {
    id: "math",
    label: "Math Alphanumeric Symbols",
    icon: Code2,
    sample: "𝔗𝔢𝔰𝔱𝔦𝔫𝔤 𝔪𝔞𝔱𝔥 𝔞𝔩𝔭𝔠𝔞𝔫𝔲𝔪𝔢𝔯𝔦𝔠 𝔰𝔶𝔪𝔟𝔬𝔩𝔰.",
  },
  {
    id: "sample",
    label: "Full Homoglyph Scan",
    icon: Eraser,
    sample: null,
  },
];

export interface HomoglyphSanitizerProps {
  heading?: string;
  subheading?: string;
}

export default function HomoglyphSanitizer({ heading, subheading }: HomoglyphSanitizerProps = {}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<HomoglyphResult | null>(null);
  const [copied, setCopied] = useState(false);

  const inputStats = useMemo(() => getTextStats(input), [input]);
  const outputStats = useMemo(
    () => (result ? getTextStats(result.cleanedText) : emptyStats),
    [result]
  );
  const hasText = input.length > 0;

  function handleSanitize() {
    if (!input) return;
    const res = cleanHomoglyphs(input);
    setResult(res);
    setCopied(false);
    trackCleanTextRun({
      toolName: "clean_unicode_homoglyphs",
      inputWords: inputStats.words,
      inputChars: inputStats.characters,
      changesCount: res.totalHomoglyphsCount,
    });
  }

  function handleSampleText() {
    const sample = getSampleHomoglyphText();
    setInput(sample);
    const res = cleanHomoglyphs(sample);
    setResult(res);
    trackCleanTextRun({
      toolName: "clean_homoglyphs_sample",
      inputWords: getTextStats(sample).words,
      inputChars: sample.length,
      changesCount: res.totalHomoglyphsCount,
    });
  }

  function applyPreset(presetSample: string | null) {
    const textToSanitize = presetSample ?? getSampleHomoglyphText();
    setInput(textToSanitize);
    const res = cleanHomoglyphs(textToSanitize);
    setResult(res);
  }

  function handleCopyClean() {
    if (!result) return;
    copy(result.cleanedText);
    setCopied(true);
    trackCopyText({ toolName: "clean_unicode_homoglyphs", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!result) return;
    trackDownloadFile({ toolName: "clean_unicode_homoglyphs", fileType: "txt" });
    const blob = new Blob([result.cleanedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sanitized-ascii.txt";
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
    <section className="bg-surface py-6 md:py-8 border-b border-surface-container-highest/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl md:max-w-5xl mx-auto mb-6">
          <h1 className="text-headline-lg md:text-display-lg font-bold text-on-surface tracking-tight mb-2">
            {heading ?? "Unicode Homoglyph & Confusable Character Cleaner"}
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-4xl mx-auto">
            {subheading ??
              "Detect and replace Cyrillic, Greek, or Latin look-alike characters disguised inside text to bypass AI detectors or phishing filters."}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSanitize();
          }}
          className="w-full rounded-2xl border border-surface-container-highest/80 bg-surface-container-lowest p-5 sm:p-8 shadow-xs"
        >
          {/* Quick Presets Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-surface-container-highest/80 pb-4">
            <span className="text-code-stat font-bold uppercase tracking-wider text-on-surface-variant mr-1">
              Quick Presets:
            </span>
            {homoglyphPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.sample)}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-surface-container-highest/80 bg-surface-container-low px-3 py-1 text-code-stat font-semibold text-on-surface transition-all hover:border-primary hover:bg-surface-container hover:text-primary"
              >
                <preset.icon className="h-3 w-3 text-primary" aria-hidden="true" />
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Input Card */}
            <div className="flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-on-surface">
                  <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                  Raw Text Input
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSampleText}
                    className="flex cursor-pointer items-center gap-1 text-code-stat font-bold text-primary hover:underline"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Try Sample
                  </button>
                  <p className="text-code-stat text-on-surface-variant font-mono">
                    {inputStats.words}w • {inputStats.characters}c
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
                    setResult(cleanHomoglyphs(val));
                  } else {
                    setResult(null);
                  }
                }}
                placeholder="Paste text to scan for fake Cyrillic or Greek look-alike letters..."
                className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-lowest p-4 text-body-sm text-on-surface placeholder-outline transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 font-mono"
              />
            </div>

            {/* Output Card */}
            <div className="flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-on-surface">
                  <Sparkles className="h-4 w-4 text-secondary" aria-hidden="true" />
                  Sanitized ASCII Output
                </p>
                <div className="flex items-center gap-3">
                  {result && (
                    <span
                      className={`text-code-stat font-bold px-2.5 py-0.5 rounded-lg ${
                        result.totalHomoglyphsCount > 0
                          ? "bg-error/10 text-error border border-error/20"
                          : "bg-secondary-container/50 text-on-secondary-container border border-secondary/30"
                      }`}
                    >
                      {result.totalHomoglyphsCount > 0
                        ? `⚠️ ${result.totalHomoglyphsCount} Replaced`
                        : "✓ Clean ASCII"}
                    </span>
                  )}
                  <p className="text-code-stat text-on-surface-variant font-mono">
                    {outputStats.words}w • {outputStats.characters}c
                  </p>
                </div>
              </div>
              <textarea
                readOnly
                rows={7}
                value={result?.cleanedText ?? ""}
                placeholder="Sanitized standard ASCII Latin text will appear here..."
                className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-low p-4 text-body-sm text-on-surface placeholder-outline font-mono"
              />
            </div>
          </div>

          {/* Replacement Summary pill bar */}
          {result && result.replacements.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t border-surface-container-highest/80 pt-6 text-left">
              <p className="text-body-sm font-bold text-error flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-error" /> Confusable Homoglyph Replacements Summary:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-code-stat font-mono">
                {result.replacements.slice(0, 8).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-surface-container-low px-3 py-1.5 text-on-surface border border-surface-container-highest/80"
                  >
                    <span>
                      Original: <strong className="text-error">&apos;{item.originalChar}&apos;</strong> ({item.codePoint})
                    </span>
                    <span>-&gt; ASCII: <strong className="text-secondary">&apos;{item.replacedChar}&apos;</strong></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Button Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-surface-container-highest/80 pt-6">
            <button
              type="submit"
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-body-sm font-semibold text-on-primary hover:bg-primary-hover shadow-sm transition-all disabled:cursor-not-allowed disabled:bg-surface-container-highest disabled:text-on-surface-variant"
            >
              <Lock className="h-5 w-5" aria-hidden="true" />
              Sanitize Homoglyphs
            </button>
            {result ? (
              <>
                <button
                  type="button"
                  onClick={handleCopyClean}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-container-highest/80 bg-surface-container-low px-8 py-3.5 text-body-sm font-semibold text-on-surface hover:border-outline hover:bg-surface-container transition-all"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-secondary" aria-hidden="true" />
                  ) : (
                    <Copy className="h-5 w-5 text-on-surface-variant" aria-hidden="true" />
                  )}
                  {copied ? "Copied" : "Copy Clean ASCII"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-container-highest/80 bg-surface-container-low px-6 py-3.5 text-body-sm font-semibold text-on-surface hover:border-outline hover:bg-surface-container transition-all"
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
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 py-2 text-body-sm font-semibold text-on-surface-variant hover:text-primary transition-colors disabled:cursor-not-allowed disabled:text-outline-variant"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </form>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-body-sm text-on-surface-variant">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
          Private. 100% Browser-based processing. Zero server storage.
        </p>
      </div>
    </section>
  );
}
