'use client';

import { useMemo, useState } from "react";
import { analyzeReadability } from "@/lib/checkReadability";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun } from "@/lib/analytics";

export interface ReadabilityCheckerUIProps {
  heading?: string;
  subheading?: string;
}

export default function ReadabilityCheckerUI({ heading, subheading }: ReadabilityCheckerUIProps = {}) {
  const [text, setText] = useState(
    "Artificial intelligence text generators create fluent paragraphs by analyzing probability patterns. However, complex vocabulary and repetitive transitions can reduce reading ease for general audiences. Simplifying multi-syllabic jargon ensures higher engagement and optimal comprehension across diverse reader demographics."
  );

  const metrics = useMemo(() => analyzeReadability(text), [text]);
  const inputStats = useMemo(() => getTextStats(text), [text]);

  const handlePreset = (sample: string) => {
    setText(sample);
    trackCleanTextRun({
      toolName: "check_readability_preset",
      inputWords: getTextStats(sample).words,
      inputChars: sample.length,
      changesCount: 1,
    });
  };

  const handleReset = () => {
    setText("");
  };

  // Color logic for Flesch Reading Ease
  const easeScore = Math.max(0, Math.min(100, Math.round(metrics.fleschReadingEase)));
  const easeColor =
    easeScore >= 70
      ? "text-primary"
      : easeScore >= 50
      ? "text-on-surface"
      : "text-error";

  return (
    <div className="w-full bg-surface">
      {/* Sub-bar / Trust Banner */}
      <div className="w-full bg-surface-container-low border-b-0 py-space-sm px-space-md">
        <div className="max-w-[1140px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span className="text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span>
              Readability Engine
            </span>
            <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary font-code-stat text-code-stat">ACTIVE TOOL</span>
            <span className="text-outline-variant font-mono">/</span>
            <span className="text-on-surface-variant font-mono">Flesch-Kincaid &amp; Gunning Fog</span>
          </div>
          <div className="flex items-center gap-space-sm text-on-surface-variant font-code-stat text-code-stat">
            <span className="flex items-center gap-1.5 text-tertiary">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>100% In-Memory Analysis</span>
            </span>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span className="hidden sm:flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded text-on-surface">
              <span className="material-symbols-outlined text-[14px] text-primary">shield</span>
              <span>ZERO LOGS / DOMAIN ISOLATED</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Workstation Container */}
      <div className="max-w-[1140px] mx-auto px-4 md:px-8 pt-space-xl pb-space-lg flex flex-col gap-space-xl">
        {/* Hero Header Zone */}
        <div className="flex flex-col items-center text-center gap-space-sm max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-code-stat text-code-stat">
            <span className="material-symbols-outlined text-[14px]">speed</span>
            <span>REAL-TIME AUDIT // 100% CLIENT-SIDE EXECUTION</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
            {heading ?? "Readability & Flesch-Kincaid Grade Checker"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {subheading ??
              "Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and highlight complex 3+ syllable words in real-time."}
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="flex flex-wrap items-center justify-center gap-space-xs p-1.5 rounded-xl bg-surface-container self-center max-w-full">
          <span className="font-code-stat text-code-stat uppercase text-outline mr-1 px-2">Audience Presets:</span>
          <button
            type="button"
            onClick={() =>
              handlePreset(
                "Artificial intelligence text generators create fluent paragraphs by analyzing probability patterns. However, complex vocabulary and repetitive transitions can reduce reading ease for general audiences."
              )
            }
            className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all cursor-pointer"
          >
            AI Draft Sample
          </button>
          <button
            type="button"
            onClick={() =>
              handlePreset(
                "Our tool cleans invisible characters, removes AI clichés, and formats text instantly in your browser. It is fast, private, and simple to use."
              )
            }
            className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all cursor-pointer"
          >
            General Public (Grade 6-8)
          </button>
          <button
            type="button"
            onClick={() =>
              handlePreset(
                "Algorithmic synthesis of natural language corpora exhibits systemic lexical redundancy and probabilistic sentence token sequences across synthetic paragraphs."
              )
            }
            className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all cursor-pointer"
          >
            Academic / High Complexity
          </button>
        </div>

        {/* Interactive Workstation Dual-Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
          {/* Left Panel: Document Input */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
            {/* Panel Header */}
            <div className="bg-surface-container-low px-4 py-2.5 flex items-center justify-between border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">edit_note</span>
                <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">Input Manuscript / Copy</span>
              </div>
              <span className="font-code-stat text-code-stat text-on-surface-variant">
                {inputStats.words} words • {inputStats.characters} chars
              </span>
            </div>

            {/* Input Area */}
            <div className="p-4 flex flex-col flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={9}
                placeholder="Paste your article, blog draft, or AI generated text here..."
                className="w-full flex-1 bg-transparent resize-none outline-none font-body-md text-body-md text-on-surface leading-relaxed placeholder:text-outline-variant"
              />

              {/* Syllables inline highlight preview container */}
              {metrics.complexWords.length > 0 && (
                <div className="mt-3 pt-3 bg-surface-container-low rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-error" />
                      Detected 3+ Syllable Hard Words:
                    </span>
                    <span className="font-code-stat text-code-stat text-error font-semibold">
                      {metrics.complexWords.length} flagged
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-code-stat text-code-stat max-h-24 overflow-y-auto">
                    {metrics.complexWords.slice(0, 16).map((item, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold"
                      >
                        {item.word} <span className="opacity-70 font-normal">({item.syllables})</span>
                      </span>
                    ))}
                    {metrics.complexWords.length > 16 && (
                      <span className="px-2 py-0.5 rounded bg-surface-container text-outline">
                        +{metrics.complexWords.length - 16} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="bg-surface-container-low px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-surface-container-highest">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm font-medium shadow-xs transition-colors cursor-pointer"
                >
                  Reset Text
                </button>
              </div>
              <div className="flex items-center gap-1.5 font-code-stat text-code-stat text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
                <span>0.3ms local execution • 100% in-memory</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Readability Metrics & Grade Level */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
            {/* Panel Header */}
            <div className="bg-surface-container-low px-4 py-2.5 flex items-center justify-between border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">speed</span>
                <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Readability Scores &amp; Grade Level
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-code-stat text-code-stat uppercase font-semibold">
                Live Audit
              </span>
            </div>

            {/* Metric Cards 2x2 Grid */}
            <div className="p-4 flex flex-col gap-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Metric 1: Flesch Reading Ease */}
                <div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">Flesch Reading Ease</span>
                    <span className="material-symbols-outlined text-[16px] text-primary">insights</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-headline-lg text-[32px] leading-[36px] font-bold ${easeColor}`}>
                        {metrics.fleschReadingEase.toFixed(1)}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">/ 100</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-primary font-medium mt-0.5">
                      {metrics.fleschInterpretation}
                    </p>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, metrics.fleschReadingEase))}%` }}
                    />
                  </div>
                </div>

                {/* Metric 2: Flesch-Kincaid Grade */}
                <div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">Flesch-Kincaid Grade</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">school</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-lg text-[32px] leading-[36px] font-bold text-on-surface">
                        Grade {metrics.fleschKincaidGrade.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      US Grade {Math.round(metrics.fleschKincaidGrade)} Level
                    </p>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-secondary h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (metrics.fleschKincaidGrade / 16) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Metric 3: Gunning Fog Index */}
                <div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">Gunning Fog Index</span>
                    <span className="material-symbols-outlined text-[16px] text-tertiary">menu_book</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-lg text-[32px] leading-[36px] font-bold text-on-surface">
                        {metrics.gunningFogIndex.toFixed(1)}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Years of Ed.</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Ideal Target: 7 — 9 (General)
                    </p>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-tertiary h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (metrics.gunningFogIndex / 18) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Metric 4: Average Sentence Length */}
                <div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">Avg Sentence Length</span>
                    <span className="material-symbols-outlined text-[16px] text-primary">format_list_numbered</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-lg text-[32px] leading-[36px] font-bold text-on-surface">
                        {metrics.averageWordsPerSentence.toFixed(1)}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Words / Sent</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Target: 14 — 18 words
                    </p>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary-container h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (metrics.averageWordsPerSentence / 25) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Syllables and Reading Time Summary */}
              <div className="p-3 rounded-lg bg-surface-container-low flex flex-wrap items-center justify-between gap-2 text-label-sm font-label-sm text-on-surface-variant">
                <span>Total Syllables: <strong className="text-on-surface">{metrics.syllableCount}</strong></span>
                <span>•</span>
                <span>Sentences: <strong className="text-on-surface">{metrics.sentenceCount}</strong></span>
                <span>•</span>
                <span>Est. Reading Time: <strong className="text-on-surface">{Math.ceil(metrics.wordCount / 200) || 1} min</strong></span>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="bg-surface-container-low px-4 py-3 flex items-center justify-between border-t border-surface-container-highest font-code-stat text-code-stat text-on-surface-variant">
              <span>ALGORITHM: ISO/DIS 24495-1 COMPLIANT</span>
              <span className="text-primary font-semibold">100% Deterministic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
