'use client';

import { useState } from "react";
import { Sparkles, Copy, Check, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import { humanizeText } from "@/lib/humanizeText";

export default function HumanizeTextUI() {
  const [inputText, setInputText] = useState(
    "In conclusion, it is important to note that artificial intelligence serves as a testament to human innovation. Furthermore, delving into this digital realm allows us to foster pivotal advancements in today's fast-paced world."
  );
  const [copied, setCopied] = useState(false);

  const results = humanizeText(inputText);

  const copyHumanizedText = () => {
    navigator.clipboard.writeText(results.humanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Text Humanizer & Structure Optimizer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
          Detect and remove repetitive AI transitions, robotic clichés (delve, tapestry, realm), and monotonous sentence structures for natural human flow.
        </p>
      </div>

      {/* Input / Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Draft / Raw Input</span>
            <span className="text-xs text-slate-400">{inputText.split(/\s+/).filter(Boolean).length} Words</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste text here to humanize..."
            className="w-full h-56 p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm leading-relaxed"
          />
        </div>

        {/* Output */}
        <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Humanized Natural Output
            </span>
            <button
              onClick={copyHumanizedText}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                copied
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Humanized</span>
                </>
              )}
            </button>
          </div>
          <div className="w-full h-56 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed overflow-y-auto">
            {results.humanizedText || <span className="text-slate-400 italic">Cleaned text will appear here...</span>}
          </div>
        </div>
      </div>

      {/* AI Score & Detected Issues */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-4 border-slate-200">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" /> AI Structural Pattern Score
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Based on transition density, cliché frequency, and sentence rhythm.</p>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-extrabold ${results.aiLikelihoodScore > 40 ? "text-amber-600" : "text-emerald-600"}`}>
              {results.aiLikelihoodScore}% AI Pattern
            </span>
          </div>
        </div>

        {/* Issue Cards */}
        <div className="space-y-3">
          {results.issues.length === 0 ? (
            <p className="text-sm text-emerald-700 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No robotic AI patterns or transition clichés detected!
            </p>
          ) : (
            results.issues.map((iss, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 block">{iss.description}</span>
                  <span className="text-slate-500">Snippet: <code className="bg-slate-200 px-1 rounded text-slate-700">{iss.originalSnippet}</code></span>
                </div>
                <span className="text-emerald-600 font-semibold flex items-center gap-1 flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" /> {iss.suggestedFix}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
