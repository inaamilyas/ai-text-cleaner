'use client';

import { useMemo, useState } from "react";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Type,
  Code2,
  Zap,
} from "lucide-react";
import copy from "copy-to-clipboard";
import { convertCase } from "@/lib/convertCase";
import { getTextStats } from "@/lib/textStats";
import { trackCleanTextRun, trackCopyText } from "@/lib/analytics";

const defaultSampleText = "The quick brown fox jumps over the lazy dog. AI text cleaning & formatting tool!";

export interface CaseConverterUIProps {
  heading?: string;
  subheading?: string;
}

export default function CaseConverterUI({ heading, subheading }: CaseConverterUIProps = {}) {
  const [text, setText] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const results = convertCase(text);
  const inputStats = useMemo(() => getTextStats(text), [text]);
  const hasText = text.length > 0;

  const copyToClipboard = (content: string, key: string) => {
    copy(content);
    setCopiedKey(key);
    trackCopyText({ toolName: `case_converter_${key}`, copyFormat: "plain_text" });
    setTimeout(() => setCopiedKey(null), 1500);
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
    { key: "asciiNormalized", label: "ASCII Normalized", value: results.asciiNormalized },
  ];

  function handleReset() {
    setText("");
    setCopiedKey(null);
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
            <button
              type="button"
              onClick={() => setText("convert this text to title case")}
              className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
            >
              <Type className="h-3 w-3 text-primary-600" />
              Title Case
            </button>
            <button
              type="button"
              onClick={() => setText("user account registration form component")}
              className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
            >
              <Code2 className="h-3 w-3 text-primary-600" />
              camelCase
            </button>
            <button
              type="button"
              onClick={() => setText("api response error handler status code")}
              className="flex cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-body-xs font-medium text-neutral-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
            >
              <Zap className="h-3 w-3 text-primary-600" />
              snake_case
            </button>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-700">
                <FileText className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                Raw Text Input
              </p>
              <p className="text-body-sm text-neutral-500">
                {inputStats.words} words, {inputStats.characters} chars
              </p>
            </div>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (e.target.value) {
                  trackCleanTextRun({
                    toolName: "case_converter",
                    inputWords: getTextStats(e.target.value).words,
                    inputChars: e.target.value.length,
                    changesCount: 1,
                  });
                }
              }}
              placeholder="Paste text here to convert between case styles..."
              className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Converted Case Cards Grid */}
          <div className="mt-6 border-t border-neutral-200 pt-6 text-left">
            <p className="text-body-sm font-bold text-neutral-700 mb-4 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary-600" />
              Converted Case Outputs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseOptions.map((opt) => (
                <div
                  key={opt.key}
                  className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-body-xs font-bold uppercase tracking-wider text-neutral-600">
                      {opt.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(opt.value, opt.key)}
                      className={`px-3 py-1 rounded-md border text-body-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                        copiedKey === opt.key
                          ? "bg-primary-100 border-primary-300 text-primary-800"
                          : "bg-white border-neutral-300 text-neutral-700 hover:border-primary-500 hover:text-primary-700"
                      }`}
                    >
                      {copiedKey === opt.key ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-primary-700" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded border border-neutral-200 text-neutral-900 font-mono text-body-xs overflow-x-auto truncate">
                    {opt.value || <span className="text-neutral-400 italic">Empty text</span>}
                  </div>
                </div>
              ))}
            </div>
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
              Reset Input Text
            </button>
          </div>
        </form>

        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-bold text-primary-900 sm:text-xl">
            {heading ?? "Text Case Converter & ASCII Normalizer"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Convert text between Title Case, camelCase, snake_case, UPPERCASE, lowercase, URL Slugs, and strip non-ASCII diacritics instantly in your browser."}
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
