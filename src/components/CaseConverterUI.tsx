'use client';

import { useState } from "react";
import { Copy, Check, Type, Sparkles, RefreshCw } from "lucide-react";
import { convertCase } from "@/lib/convertCase";

export default function CaseConverterUI() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. AI text cleaning & formatting tool!");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const results = convertCase(text);

  const copyToClipboard = (content: string, key: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const caseOptions = [
    { key: "titleCase", label: "Title Case", value: results.titleCase },
    { key: "uppercase", label: "UPPERCASE", value: results.uppercase },
    { key: "lowercase", label: "lowercase", value: results.lowercase },
    { key: "sentenceCase", label: "Sentence case", value: results.sentenceCase },
    { key: "camelCase", label: "camelCase", value: results.camelCase },
    { key: "pascalCase", label: "PascalCase", value: results.pascalCase },
    { key: "snakeCase", label: "snake_case", value: results.snakeCase },
    { key: "kebabCase", label: "kebab-case", value: results.kebabCase },
    { key: "constantCase", label: "CONSTANT_CASE", value: results.constantCase },
    { key: "slug", label: "URL Slug (slugify)", value: results.slug },
    { key: "asciiNormalized", label: "ASCII Normalized (No Accents)", value: results.asciiNormalized },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Text Case Converter & ASCII Normalizer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
          Convert text between Title Case, camelCase, snake_case, UPPERCASE, lowercase, URL Slugs, and strip non-ASCII diacritics instantly in your browser.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Type className="w-4 h-4 text-emerald-600" /> Enter or Paste Text
          </label>
          <button
            onClick={() => setText("")}
            className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
          >
            Clear Text
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here to convert..."
          className="w-full h-36 p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-mono text-sm leading-relaxed"
        />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-500 block">Characters</span>
            <span className="font-bold text-slate-800">{results.stats.characters}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-500 block">Words</span>
            <span className="font-bold text-slate-800">{results.stats.words}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-500 block">Sentences</span>
            <span className="font-bold text-slate-800">{results.stats.sentences}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-500 block">Lines</span>
            <span className="font-bold text-slate-800">{results.stats.lines}</span>
          </div>
        </div>
      </div>

      {/* Conversion Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caseOptions.map((opt) => (
          <div key={opt.key} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{opt.label}</span>
              <button
                onClick={() => copyToClipboard(opt.value, opt.key)}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                  copiedKey === opt.key
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {copiedKey === opt.key ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-800 font-mono text-xs overflow-x-auto truncate">
              {opt.value || <span className="text-slate-400 italic">Empty text</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
