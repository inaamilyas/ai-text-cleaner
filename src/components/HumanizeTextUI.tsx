'use client';

import { useMemo, useState } from "react";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Wand2,
  AlertTriangle,
  Bot,
  Zap,
  Download,
} from "lucide-react";
import copy from "copy-to-clipboard";
import { humanizeText } from "@/lib/humanizeText";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun, trackCopyText, trackDownloadFile } from "@/lib/analytics";

const emptyStats = { words: 0, characters: 0, sentences: 0 };

const defaultSampleText =
  "In conclusion, it is important to note that artificial intelligence serves as a testament to human innovation. Furthermore, delving into this digital realm allows us to foster pivotal advancements in today's fast-paced world.";

const humanizePresets = [
  {
    id: "natural",
    label: "Natural Human Rhythm",
    icon: Zap,
    sample: defaultSampleText,
  },
  {
    id: "buzzwords",
    label: "Remove Delve, Tapestry & Realm",
    icon: Bot,
    sample: "Delve into the vibrant tapestry of innovation and explore this digital realm to unlock pivotal potential.",
  },
];

export interface HumanizeTextUIProps {
  heading?: string;
  subheading?: string;
}

export default function HumanizeTextUI({ heading, subheading }: HumanizeTextUIProps = {}) {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => humanizeText(inputText), [inputText]);
  const inputStats = useMemo(() => getTextStats(inputText), [inputText]);
  const outputStats = useMemo(
    () => (results ? getTextStats(results.humanizedText) : emptyStats),
    [results]
  );
  const hasText = inputText.length > 0;

  function handleSampleText() {
    setInputText(defaultSampleText);
    trackCleanTextRun({
      toolName: "humanize_ai_text_sample",
      inputWords: getTextStats(defaultSampleText).words,
      inputChars: defaultSampleText.length,
      changesCount: results.issues.length,
    });
  }

  function applyPreset(presetSample: string) {
    setInputText(presetSample);
  }

  function handleCopy() {
    if (!results) return;
    copy(results.humanizedText);
    setCopied(true);
    trackCopyText({ toolName: "humanize_ai_text", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!results) return;
    trackDownloadFile({ toolName: "humanize_ai_text", fileType: "txt" });
    const blob = new Blob([results.humanizedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "humanized-text.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    setInputText("");
    setCopied(false);
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 sm:px-6 py-6 sm:py-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full rounded-lg border border-neutral-200 bg-white p-4 sm:p-8"
        >
          {/* Quick Presets Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 border-b border-neutral-200 pb-3">
            <span className="text-body-xs font-bold uppercase text-neutral-500 mr-1.5">
              Quick Presets:
            </span>
            {humanizePresets.map((preset) => (
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
                  AI Draft / Raw Input
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSampleText}
                    className="flex cursor-pointer items-center gap-1 text-body-xs font-bold text-primary-700 hover:underline"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Try Sample AI Text
                  </button>
                  <p className="text-body-sm text-neutral-500">
                    {inputStats.words} words, {inputStats.characters} chars
                  </p>
                </div>
              </div>
              <textarea
                rows={7}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (e.target.value) {
                    trackCleanTextRun({
                      toolName: "humanize_ai_text",
                      inputWords: getTextStats(e.target.value).words,
                      inputChars: e.target.value.length,
                      changesCount: 1,
                    });
                  }
                }}
                placeholder="Paste AI-generated text here to humanize structure and remove clichés..."
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Output Card */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <Sparkles className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  Humanized Output
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-body-xs font-bold px-2 py-0.5 rounded ${
                      results.aiLikelihoodScore > 40
                        ? "bg-amber-100 text-amber-900 border border-amber-200"
                        : "bg-primary-100 text-primary-800"
                    }`}
                  >
                    {results.aiLikelihoodScore}% AI Pattern Density
                  </span>
                  <p className="text-body-sm text-neutral-500">
                    {outputStats.words} words, {outputStats.characters} chars
                  </p>
                </div>
              </div>
              <textarea
                readOnly
                rows={7}
                value={results.humanizedText}
                placeholder="Humanized text with natural human flow will appear here..."
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400"
              />
            </div>
          </div>

          {/* AI Pattern Breakdown pill bar */}
          {results.issues.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-left">
              <p className="text-body-sm font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Removed AI Clichés &amp; Transition Phrases:
              </p>
              <div className="flex flex-wrap gap-2 text-body-xs">
                {results.issues.map((iss, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-1 text-body-xs font-bold text-amber-900 border border-amber-200"
                  >
                    ⚡ {iss.description}: &quot;{iss.originalSnippet}&quot; -&gt; &quot;{iss.suggestedFix}&quot;
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              {copied ? (
                <Check className="h-5 w-5 text-neutral-50" aria-hidden="true" />
              ) : (
                <Copy className="h-5 w-5" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy Humanized Text"}
            </button>
            {hasText && (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3.5 sm:py-4 text-button text-neutral-700 transition-colors duration-200 hover:border-primary-600 hover:text-primary-700"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download .txt
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 py-2 text-body-sm font-bold text-neutral-600 transition-colors duration-200 hover:text-primary-600 disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </form>

        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-bold text-primary-900 sm:text-xl">
            {heading ?? "AI Text Humanizer & Structure Optimizer"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Detect and remove repetitive AI transitions, robotic clichés (delve, tapestry, realm), and monotonous sentence structures for natural human flow."}
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
