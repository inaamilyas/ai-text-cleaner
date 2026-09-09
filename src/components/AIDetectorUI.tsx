'use client';

import { useMemo, useState } from "react";
import {
  Bot,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wand2,
  FileText,
  AlertTriangle,
  Zap,
  Download,
  Upload,
} from "lucide-react";
import copy from "copy-to-clipboard";
import ToolDrawer from "@/components/ToolDrawer";
import { detectAIText, getSampleAIDetectionText, type AIDetectionResult } from "@/lib/detectAI";
import { humanizeText } from "@/lib/humanizeText";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun, trackCopyText, trackDownloadFile } from "@/lib/analytics";

const defaultSample = getSampleAIDetectionText();

export interface AIDetectorUIProps {
  heading?: string;
  subheading?: string;
}

export default function AIDetectorUI({ heading, subheading }: AIDetectorUIProps = {}) {
  const [input, setInput] = useState(defaultSample);
  const [result, setResult] = useState<AIDetectionResult | null>(detectAIText(defaultSample));
  const [copied, setCopied] = useState(false);

  const inputStats = useMemo(() => getTextStats(input), [input]);
  const hasText = input.trim().length > 0;

  function handleAnalyze() {
    if (!input.trim()) return;
    const res = detectAIText(input);
    setResult(res);
    setCopied(false);
    trackCleanTextRun({
      toolName: "ai_text_detector",
      inputWords: inputStats.words,
      inputChars: inputStats.characters,
      changesCount: res.aiWordsFound.length,
    });
  }

  function handleSampleText() {
    const sample = getSampleAIDetectionText();
    setInput(sample);
    const res = detectAIText(sample);
    setResult(res);
    trackCleanTextRun({
      toolName: "ai_text_detector_sample",
      inputWords: getTextStats(sample).words,
      inputChars: sample.length,
      changesCount: res.aiWordsFound.length,
    });
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const textContent = evt.target?.result as string;
      if (textContent) {
        setInput(textContent);
        setResult(detectAIText(textContent));
      }
    };
    reader.readAsText(uploadedFile);
  }

  function handleHumanizeAndCopy() {
    if (!input.trim()) return;
    const hum = humanizeText(input);
    copy(hum.humanizedText);
    setCopied(true);
    trackCopyText({ toolName: "ai_text_detector_humanize", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownloadReport() {
    if (!result) return;
    trackDownloadFile({ toolName: "ai_text_detector", fileType: "txt" });
    const content = `AI TEXT DETECTION REPORT
=========================
Human Score: ${result.humanScore}%
AI Generated Score: ${result.aiScore}%
Classification: ${result.classification}
Total Words: ${result.totalWords}
Total Sentences: ${result.totalSentences}

AI Clichés Found: ${result.aiWordsFound.join(", ") || "None"}

FULL INPUT TEXT:
${input}
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-detection-report.txt";
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
            handleAnalyze();
          }}
          className="w-full rounded-lg border border-neutral-200 bg-white shadow-xs overflow-hidden"
        >
          {/* Top Tool Drawer Bar */}
          <ToolDrawer />

          <div className="p-4 sm:p-8">
            {/* Quick Action Presets Bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-body-xs font-bold uppercase text-neutral-500 mr-1.5">
                  Sample Drafts:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const sample = getSampleAIDetectionText();
                    setInput(sample);
                    setResult(detectAIText(sample));
                  }}
                  className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 transition-colors duration-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
                >
                  <Bot className="h-3 w-3 text-primary-600" />
                  ChatGPT Draft (High AI %)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const sample =
                      "I walked down to the local hardware store this morning to buy a new wrench. The cashier was helpful and recommended a sturdy brand.";
                    setInput(sample);
                    setResult(detectAIText(sample));
                  }}
                  className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 transition-colors duration-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
                >
                  <Zap className="h-3 w-3 text-emerald-600" />
                  Human Essay (100% Human)
                </button>
              </div>

              {/* Upload File */}
              <label className="flex cursor-pointer items-center gap-1 text-body-xs font-bold text-primary-700 hover:underline">
                <Upload className="h-3.5 w-3.5" />
                Upload .txt file
                <input type="file" accept=".txt,.md,.doc,.docx" className="hidden" onChange={handleFileUpload} />
              </label>
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
                      Try Sample AI Text
                    </button>
                    <p className="text-body-sm text-neutral-500">
                      {inputStats.words} words, {inputStats.characters} chars
                    </p>
                  </div>
                </div>
                <textarea
                  rows={9}
                  value={input}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInput(val);
                    if (val.trim()) {
                      setResult(detectAIText(val));
                    } else {
                      setResult(null);
                    }
                  }}
                  placeholder="Paste text here to check for AI probability, sentence perplexity, and cliché patterns..."
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
                />
              </div>

              {/* AI Score & Highlighted Visualizer Output */}
              <div className="flex flex-col gap-3 text-left">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                    <Sparkles className="h-4 w-4 text-primary-600" aria-hidden="true" />
                    AI Probability &amp; Highlighted Analysis
                  </p>
                  {result && (
                    <span
                      className={`text-body-xs font-bold px-2.5 py-0.5 rounded ${
                        result.aiScore > 40
                          ? "bg-amber-100 text-amber-900 border border-amber-200"
                          : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      }`}
                    >
                      {result.classification}
                    </span>
                  )}
                </div>

                {/* Speedometer Radial Gauge Meter */}
                {result && (
                  <div className="flex items-center justify-around bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                    {/* Radial Gauge SVG */}
                    <div className="relative flex flex-col items-center justify-center">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-neutral-200"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={result.humanScore >= 60 ? "text-emerald-500" : "text-amber-500"}
                          strokeDasharray={`${result.humanScore}, 100`}
                          strokeWidth="3.8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center text-center">
                        <span className="text-h4 font-extrabold text-neutral-900 leading-none">
                          {result.humanScore}%
                        </span>
                        <span className="text-[10px] font-bold uppercase text-neutral-500 mt-0.5">
                          Human
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block"></span>
                        <span className="text-body-xs text-neutral-700">
                          Human Score: <strong className="text-neutral-900">{result.humanScore}%</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-amber-500 inline-block"></span>
                        <span className="text-body-xs text-neutral-700">
                          AI Probability: <strong className="text-neutral-900">{result.aiScore}%</strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1 max-w-[180px] leading-tight">
                        {result.aiWordsFound.length > 0
                          ? `${result.aiWordsFound.length} AI clichés detected.`
                          : "Natural human rhythm pattern."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Highlighted Sentence Breakdown View */}
                <div className="w-full min-h-[160px] max-h-[200px] overflow-y-auto rounded-lg border border-neutral-300 bg-white p-4 text-body-sm text-neutral-900 leading-relaxed">
                  {result && result.segments.length > 0 ? (
                    result.segments.map((seg) => (
                      <span
                        key={seg.id}
                        className={`inline transition-colors rounded px-1 py-0.5 mx-0.5 cursor-help ${
                          seg.isAI
                            ? "bg-amber-100 text-amber-950 border-b-2 border-amber-400 hover:bg-amber-200"
                            : "bg-emerald-50/80 text-emerald-950 hover:bg-emerald-100"
                        }`}
                        title={seg.reason}
                      >
                        {seg.text}{" "}
                      </span>
                    ))
                  ) : (
                    <span className="text-neutral-400 italic">
                      Sentence breakdown with color-coded AI highlights will render here...
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* AI Cliché Summary Pill Bar */}
            {result && result.aiWordsFound.length > 0 && (
              <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-left">
                <p className="text-body-sm font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Suspected AI Cliché Vocabulary Found:
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.aiWordsFound.map((word) => (
                    <span
                      key={word}
                      className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-1 text-body-xs font-bold text-amber-900 border border-amber-200"
                    >
                      ⚠️ {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Action Buttons Bar */}
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
              <button
                type="submit"
                disabled={!hasText}
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
              >
                <Bot className="h-5 w-5" aria-hidden="true" />
                Check AI Probability
              </button>
              {result ? (
                <>
                  <button
                    type="button"
                    onClick={handleHumanizeAndCopy}
                    className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-8 py-3.5 sm:py-4 text-button text-neutral-800 transition-colors duration-200 hover:border-primary-600 hover:text-primary-700"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    )}
                    {copied ? "Copied Clean Human Text" : "Humanize & Copy Text"}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadReport}
                    className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3.5 sm:py-4 text-button text-neutral-700 transition-colors duration-200 hover:border-primary-600 hover:text-primary-700"
                  >
                    <Download className="h-5 w-5" aria-hidden="true" />
                    Download Report
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
            {heading ?? "Free AI Text Detector (ChatGPT, GPT-4, Claude & Gemini)"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Check if your text was generated by AI models in seconds. Highlight overused clichés, sentence monotony, and perplexity patterns."}
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
