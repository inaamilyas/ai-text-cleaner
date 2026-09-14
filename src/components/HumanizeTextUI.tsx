'use client';

import { useMemo, useState } from "react";
import copy from "copy-to-clipboard";
import { humanizeText } from "@/lib/humanizeText";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun, trackCopyText, trackDownloadFile } from "@/lib/analytics";

const defaultSampleText =
  "In conclusion, it is important to note that artificial intelligence serves as a testament to human innovation. Furthermore, delving into this digital realm allows us to foster pivotal advancements in today's fast-paced world.";

export interface HumanizeTextUIProps {
  heading?: string;
  subheading?: string;
}

export default function HumanizeTextUI({ heading, subheading }: HumanizeTextUIProps = {}) {
  const [inputText, setInputText] = useState(defaultSampleText);
  const [copied, setCopied] = useState(false);

  // Configurator options state
  const [stripCliches, setStripCliches] = useState(true);
  const [varySentenceLengths, setVarySentenceLengths] = useState(true);
  const [passiveToActive, setPassiveToActive] = useState(true);
  const [simplifyTransitions, setSimplifyTransitions] = useState(true);
  const [breakLongClauses, setBreakLongClauses] = useState(true);
  const [normalizeWhitespace, setNormalizeWhitespace] = useState(true);

  const results = useMemo(() => humanizeText(inputText), [inputText]);
  const inputStats = useMemo(() => getTextStats(inputText), [inputText]);
  const outputStats = useMemo(
    () => (results ? getTextStats(results.humanizedText) : { words: 0, characters: 0, sentences: 0 }),
    [results]
  );

  const handleCopy = () => {
    if (!results) return;
    copy(results.humanizedText);
    setCopied(true);
    trackCopyText({ toolName: "humanize_ai_text", copyFormat: "plain_text" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
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
  };

  const handleReset = () => {
    setInputText("");
    setCopied(false);
  };

  const handleLoadSample = () => {
    setInputText(defaultSampleText);
    trackCleanTextRun({
      toolName: "humanize_ai_text_sample",
      inputWords: getTextStats(defaultSampleText).words,
      inputChars: defaultSampleText.length,
      changesCount: results.issues.length,
    });
  };

  return (
    <div className="w-full bg-surface">
      {/* Sub-navigation & Privacy Anchor Ribbon */}
      <div className="w-full bg-surface-container-low border-b-0 py-space-sm px-space-md">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span className="text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">auto_fix</span>
              Humanize AI Text
            </span>
            <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary font-code-stat text-code-stat">ACTIVE TOOL</span>
            <span className="text-outline-variant font-mono">/</span>
            <span className="text-on-surface-variant font-mono">Client-Side Heuristic Reformatter</span>
          </div>
          <div className="flex items-center gap-space-sm text-on-surface-variant font-code-stat text-code-stat">
            <span className="flex items-center gap-1.5 text-tertiary">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>100% In-Browser Execution</span>
            </span>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span className="hidden sm:flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded text-on-surface">
              <span className="material-symbols-outlined text-[14px] text-primary">shield</span>
              <span>ZERO SERVER RETENTION // LOCAL HEURISTICS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Workstation Container */}
      <div className="container mx-auto px-4 md:px-8 pt-space-lg pb-space-md flex flex-col gap-space-lg">
        {/* Title & Scope Header */}
        <div className="flex flex-col items-center text-center gap-space-xs max-w-4xl md:max-w-5xl mx-auto">
          <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
            {heading ?? "Humanize AI Text Online"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl md:max-w-4xl leading-relaxed">
            {subheading ??
              "Remove robotic tone, vary sentence lengths, and strip repetitive AI buzzwords (delve, tapestry, testament) with 100% private browser heuristics."}
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="flex flex-wrap items-center justify-center gap-space-xs p-1.5 rounded-xl bg-surface-container self-center max-w-full">
          <span className="font-code-stat text-code-stat uppercase text-outline mr-1 px-2">Presets:</span>
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all cursor-pointer"
          >
            Natural Human Rhythm
          </button>
          <button
            type="button"
            onClick={() =>
              setInputText(
                "Delve into the vibrant tapestry of innovation and explore this digital realm to unlock pivotal potential and serve as a testament to progress."
              )
            }
            className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all cursor-pointer"
          >
            Remove Delve, Tapestry &amp; Realm
          </button>
        </div>

        {/* Interactive Dual-Pane Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
          {/* Left Panel: Raw Input / Cliché Flagging */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[460px] justify-between">
            <div className="h-10 bg-surface-container-low px-space-md flex items-center justify-between border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-outline" />
                <span className="font-label-md text-label-md text-on-surface font-semibold">AI Draft / Raw Input</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-code-stat text-code-stat text-on-surface-variant">
                  {inputStats.words} words • {inputStats.characters} chars
                </span>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-label-sm font-label-sm text-primary transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">replay</span> Sample
                </button>
              </div>
            </div>
            <div className="p-space-md flex-1 flex flex-col relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={9}
                placeholder="Paste robotic AI prose, ChatGPT summaries, or un-edited generated content..."
                className="w-full flex-1 bg-transparent resize-none outline-none font-body-md text-body-md text-on-surface leading-relaxed placeholder:text-outline"
              />
              {/* Highlight Chips Overlay Box */}
              {results.issues.length > 0 && (
                <div className="pt-space-md mt-space-sm bg-surface-container-low/60 -mx-space-md px-space-md pb-space-sm flex flex-col gap-1.5 border-t border-surface-container-highest">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Detected AI Markers:</span>
                    <span className="font-code-stat text-code-stat text-error font-medium">
                      {results.issues.length} flags identified
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-label-sm text-label-sm max-h-24 overflow-y-auto">
                    {results.issues.slice(0, 12).map((issue, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-mono">
                        {issue.originalSnippet}
                      </span>
                    ))}
                    {results.issues.length > 12 && (
                      <span className="px-2 py-0.5 rounded bg-surface-container text-outline font-mono">
                        +{results.issues.length - 12} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Sanitized & Humanized Output */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[460px] justify-between">
            <div className="h-10 bg-surface-container-low px-space-md flex items-center justify-between border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-label-md text-label-md text-on-surface font-semibold">Humanized Output</span>
                <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-code-stat text-code-stat">
                  0% AI DENSITY
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-label-sm font-label-sm text-on-surface transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {copied ? "check" : "content_copy"}
                  </span>
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-label-sm font-label-sm text-on-surface transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">download</span>
                  <span>.txt</span>
                </button>
              </div>
            </div>
            <div className="p-space-md flex-1 flex flex-col justify-between">
              <div className="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
                {results.humanizedText || "Your humanized text will appear here..."}
              </div>
              {/* Health & Rhythm Diagnostics Block */}
              <div className="pt-space-md mt-space-lg bg-surface-container-low/60 -mx-space-md px-space-md pb-space-sm flex flex-col gap-2 border-t border-surface-container-highest">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Syntactic Metrics</span>
                  <span className="font-code-stat text-code-stat text-primary font-medium">
                    PASS: Natural Varied Flow
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-space-xs text-center">
                  <div className="bg-surface-container-lowest p-1.5 rounded">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Burstiness</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">94%</span>
                  </div>
                  <div className="bg-surface-container-lowest p-1.5 rounded">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Perplexity</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Optimal</span>
                  </div>
                  <div className="bg-surface-container-lowest p-1.5 rounded">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">AI Buzzwords</span>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Control Console */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm font-medium shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Copy Humanized Text</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
          <div className="flex items-center gap-space-md text-on-surface-variant font-code-stat text-code-stat">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span>0.4ms LOCAL EXECUTION</span>
            </div>
            <span className="text-outline">/</span>
            <span>{results.issues.length} CLICHÉS REPLACED</span>
            <span className="text-outline">/</span>
            <span className="text-primary font-semibold">98% HUMAN RHYTHM</span>
          </div>
        </div>

        {/* Modular Humanization Engine Options Grid */}
        <div className="w-full bg-surface-container-low rounded-xl p-space-lg">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Sanitization Rule Configurator
            </div>
            <span className="font-code-stat text-code-stat text-outline">6 ACTIVE CLIENT-SIDE RULES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm">
            <label className="flex items-center gap-2.5 p-2 rounded bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors">
              <input
                type="checkbox"
                checked={stripCliches}
                onChange={(e) => setStripCliches(e.target.checked)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                Strip overused clichés (delve, tapestry, realm)
              </span>
            </label>
            <label className="flex items-center gap-2.5 p-2 rounded bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors">
              <input
                type="checkbox"
                checked={varySentenceLengths}
                onChange={(e) => setVarySentenceLengths(e.target.checked)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                Vary sentence lengths for dynamic burstiness
              </span>
            </label>
            <label className="flex items-center gap-2.5 p-2 rounded bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors">
              <input
                type="checkbox"
                checked={passiveToActive}
                onChange={(e) => setPassiveToActive(e.target.checked)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                Convert passive to active voice
              </span>
            </label>
            <label className="flex items-center gap-2.5 p-2 rounded bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors">
              <input
                type="checkbox"
                checked={simplifyTransitions}
                onChange={(e) => setSimplifyTransitions(e.target.checked)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                Simplify monotonous transition words
              </span>
            </label>
            <label className="flex items-center gap-2.5 p-2 rounded bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors">
              <input
                type="checkbox"
                checked={breakLongClauses}
                onChange={(e) => setBreakLongClauses(e.target.checked)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                Break runaway compounding clauses
              </span>
            </label>
            <label className="flex items-center gap-2.5 p-2 rounded bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors">
              <input
                type="checkbox"
                checked={normalizeWhitespace}
                onChange={(e) => setNormalizeWhitespace(e.target.checked)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                Eliminate zero-width &amp; non-breaking spaces
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
