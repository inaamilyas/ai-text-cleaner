'use client';

import { useState } from "react";
import { BookOpen, BarChart2, AlertCircle, CheckCircle } from "lucide-react";
import { analyzeReadability } from "@/lib/checkReadability";

export default function ReadabilityCheckerUI() {
  const [text, setText] = useState(
    "Artificial intelligence text generators create fluent paragraphs by analyzing probability patterns. However, complex vocabulary and repetitive transitions can reduce reading ease for general audiences."
  );

  const metrics = analyzeReadability(text);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Readability & Flesch-Kincaid Grade Checker
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
          Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and highlight complex 3+ syllable words in real-time.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" /> Enter Article or Document Text
          </label>
          <span className="text-xs font-semibold text-slate-500">{metrics.wordCount} Words</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here to analyze readability..."
          className="w-full h-44 p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 text-sm leading-relaxed"
        />
      </div>

      {/* Metrics Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Flesch Reading Ease</span>
          <div className="text-3xl font-extrabold text-emerald-600">{metrics.fleschReadingEase}</div>
          <span className="text-xs font-semibold text-slate-600 block">{metrics.fleschInterpretation}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Flesch-Kincaid Grade</span>
          <div className="text-3xl font-extrabold text-indigo-600">Grade {metrics.fleschKincaidGrade}</div>
          <span className="text-xs font-semibold text-slate-600 block">US School Grade Level</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Gunning Fog Index</span>
          <div className="text-3xl font-extrabold text-amber-600">{metrics.gunningFogIndex}</div>
          <span className="text-xs font-semibold text-slate-600 block">Years of Education Needed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Coleman-Liau Index</span>
          <div className="text-3xl font-extrabold text-teal-600">{metrics.colemanLiauIndex}</div>
          <span className="text-xs font-semibold text-slate-600 block">Letter / Sentence Ratio</span>
        </div>
      </div>

      {/* Complex Words Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-emerald-600" />
          Complex Words Breakdown ({metrics.complexWordCount} Found)
        </h3>
        {metrics.complexWords.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No complex 3+ syllable words detected. Great readability!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {metrics.complexWords.map((w, idx) => (
              <span key={idx} className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <span>{w.word}</span>
                <span className="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded text-[10px]">{w.syllables} syl</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
