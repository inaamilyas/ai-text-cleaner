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
    <section className="bg-white">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 sm:px-6 py-6 sm:py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSanitize();
          }}
          className="w-full rounded-lg border border-neutral-200 bg-white p-4 sm:p-8"
        >
          {/* Quick Presets Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 border-b border-neutral-200 pb-3">
            <span className="text-body-xs font-bold uppercase text-neutral-500 mr-1.5">
              Quick Presets:
            </span>
            {homoglyphPresets.map((preset) => (
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
                    Try Sample Homoglyphs
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
                    setResult(cleanHomoglyphs(val));
                  } else {
                    setResult(null);
                  }
                }}
                placeholder="Paste text to scan for fake Cyrillic or Greek look-alike letters..."
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Output Card */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <Sparkles className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  Sanitized ASCII Output
                </p>
                <div className="flex items-center gap-3">
                  {result && (
                    <span
                      className={`text-body-xs font-bold px-2.5 py-0.5 rounded ${
                        result.totalHomoglyphsCount > 0
                          ? "bg-rose-100 text-rose-900 border border-rose-200"
                          : "bg-primary-100 text-primary-800"
                      }`}
                    >
                      {result.totalHomoglyphsCount > 0
                        ? `⚠️ ${result.totalHomoglyphsCount} Homoglyphs Replaced`
                        : "✓ Clean Text (0 Homoglyphs)"}
                    </span>
                  )}
                  <p className="text-body-sm text-neutral-500">
                    {outputStats.words} words, {outputStats.characters} chars
                  </p>
                </div>
              </div>
              <textarea
                readOnly
                rows={7}
                value={result?.cleanedText ?? ""}
                placeholder="Sanitized standard ASCII Latin text will appear here..."
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Replacement Summary pill bar */}
          {result && result.replacements.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-left">
              <p className="text-body-sm font-bold text-rose-900 flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-rose-600" /> Confusable Homoglyph Replacements Summary:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-xs">
                {result.replacements.slice(0, 8).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-md bg-rose-50 px-3 py-1.5 text-rose-950 border border-rose-200 font-mono"
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

          {/* Bottom Button Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
            <button
              type="submit"
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              <Lock className="h-5 w-5" aria-hidden="true" />
              Sanitize Homoglyphs
            </button>
            {result ? (
              <>
                <button
                  type="button"
                  onClick={handleCopyClean}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-8 py-3.5 sm:py-4 text-button text-neutral-800 transition-colors duration-200 hover:border-primary-600 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-5 w-5" aria-hidden="true" />
                  )}
                  {copied ? "Copied" : "Copy Clean ASCII"}
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
        </form>

        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-bold text-primary-900 sm:text-xl">
            {heading ?? "Unicode Homoglyph & Confusable Character Cleaner"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Detect and replace Cyrillic, Greek, or Latin look-alike characters disguised inside text to bypass AI detectors or phishing filters."}
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
