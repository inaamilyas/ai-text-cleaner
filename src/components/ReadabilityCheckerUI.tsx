'use client';

import { useMemo, useState } from "react";
import {
  FileText,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  BookOpen,
  BarChart2,
  Wand2,
  Zap,
} from "lucide-react";
import { analyzeReadability } from "@/lib/checkReadability";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun } from "@/lib/analytics";

const defaultSampleText =
  "Artificial intelligence text generators create fluent paragraphs by analyzing probability patterns. However, complex vocabulary and repetitive transitions can reduce reading ease for general audiences.";

export interface ReadabilityCheckerUIProps {
  heading?: string;
  subheading?: string;
}

export default function ReadabilityCheckerUI({ heading, subheading }: ReadabilityCheckerUIProps = {}) {
  const [text, setText] = useState("");

  const metrics = useMemo(() => analyzeReadability(text), [text]);
  const inputStats = useMemo(() => getTextStats(text), [text]);
  const hasText = text.length > 0;

  function handleSampleText() {
    const sample =
      "Clear content engages readers. Simple sentence structure makes technical ideas easy to understand for everyone on the internet.";
    setText(sample);
    trackCleanTextRun({
      toolName: "check_readability_sample",
      inputWords: getTextStats(sample).words,
      inputChars: sample.length,
      changesCount: 1,
    });
  }

  function handleReset() {
    setText("");
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
              Target Audience Presets:
            </span>
            <button
              type="button"
              onClick={() =>
                setText(
                  "Our tool cleans invisible characters, removes AI clichés, and formats text instantly in your browser."
                )
              }
              className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
            >
              <Zap className="h-3 w-3 text-primary-600" />
              General Public (Grade 7-8)
            </button>
            <button
              type="button"
              onClick={() =>
                setText(
                  "Algorithmic synthesis of natural language corpora exhibits systemic lexical redundancy across synthetic paragraphs."
                )
              }
              className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
            >
              <BookOpen className="h-3 w-3 text-primary-600" />
              Academic / Technical
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Input Card */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                  <FileText className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                  Article or Document Input
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
                rows={8}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (e.target.value) {
                    trackCleanTextRun({
                      toolName: "check_readability_score",
                      inputWords: getTextStats(e.target.value).words,
                      inputChars: e.target.value.length,
                      changesCount: 1,
                    });
                  }
                }}
                placeholder="Paste text here to analyze readability scores in real-time..."
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Readability Score Metrics Cards */}
            <div className="flex flex-col gap-2 text-left">
              <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                <Sparkles className="h-4 w-4 text-primary-600" aria-hidden="true" />
                Readability Scores &amp; Grade Level
              </p>
              <div className="grid grid-cols-2 gap-3 min-h-[220px]">
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-200 text-center flex flex-col justify-center gap-1">
                  <span className="text-body-xs font-bold text-neutral-600 uppercase">Flesch Reading Ease</span>
                  <div className="text-h3 font-extrabold text-primary-900">{metrics.fleschReadingEase}</div>
                  <span className="text-body-xs font-bold text-primary-700">{metrics.fleschInterpretation}</span>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-center flex flex-col justify-center gap-1">
                  <span className="text-body-xs font-bold text-neutral-600 uppercase">Flesch-Kincaid Grade</span>
                  <div className="text-h3 font-extrabold text-primary-800">Grade {metrics.fleschKincaidGrade}</div>
                  <span className="text-body-xs text-neutral-500">US Grade Level</span>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-center flex flex-col justify-center gap-1">
                  <span className="text-body-xs font-bold text-neutral-600 uppercase">Gunning Fog Index</span>
                  <div className="text-h3 font-extrabold text-primary-800">{metrics.gunningFogIndex}</div>
                  <span className="text-body-xs text-neutral-500">Years of Education</span>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-center flex flex-col justify-center gap-1">
                  <span className="text-body-xs font-bold text-neutral-600 uppercase">Coleman-Liau Index</span>
                  <div className="text-h3 font-extrabold text-primary-800">{metrics.colemanLiauIndex}</div>
                  <span className="text-body-xs text-neutral-500">Sentence Ratio</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complex Words Breakdown */}
          <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-left">
            <p className="text-body-sm font-bold text-neutral-700 flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-neutral-500" />
              Complex Words Breakdown ({metrics.complexWordCount} Found)
            </p>
            {metrics.complexWords.length === 0 ? (
              <p className="text-body-sm text-neutral-600 italic">
                No complex 3+ syllable words detected. Excellent readability!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {metrics.complexWords.map((w, idx) => (
                  <span
                    key={idx}
                    className="bg-primary-100 border border-primary-200 text-primary-900 px-2.5 py-1 rounded-md text-body-xs font-bold flex items-center gap-1.5"
                  >
                    <span>{w.word}</span>
                    <span className="bg-primary-200 text-primary-900 px-1.5 py-0.5 rounded text-[10px]">
                      {w.syllables} syl
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 py-2 text-body-sm font-bold text-neutral-600 transition-colors duration-200 hover:text-primary-600 disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset Text
            </button>
          </div>
        </form>

        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-bold text-primary-900 sm:text-xl">
            {heading ?? "Readability & Flesch-Kincaid Grade Checker"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and highlight complex 3+ syllable words in real-time."}
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
