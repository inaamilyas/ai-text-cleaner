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
    <section className="bg-surface py-6 md:py-8 border-b border-surface-container-highest/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl md:max-w-5xl mx-auto mb-6">
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold mb-2">
            {heading ?? "Text Case Converter & ASCII Normalizer"}
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-4xl mx-auto">
            {subheading ??
              "Convert text between Title Case, camelCase, snake_case, UPPERCASE, lowercase, URL Slugs, and strip non-ASCII diacritics instantly in your browser."}
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full rounded-2xl border border-surface-container-highest/80 bg-surface-container-lowest p-5 sm:p-8 shadow-xs"
        >
          {/* Quick Presets Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-surface-container-highest/80 pb-4">
            <span className="text-code-stat font-bold uppercase tracking-wider text-on-surface-variant mr-1">
              Quick Presets:
            </span>
            <button
              type="button"
              onClick={() => setText("convert this text to title case")}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-surface-container-highest/80 bg-surface-container-low px-3 py-1 text-code-stat font-semibold text-on-surface hover:border-primary hover:bg-surface-container hover:text-primary transition-all"
            >
              <Type className="h-3 w-3 text-primary" />
              Title Case
            </button>
            <button
              type="button"
              onClick={() => setText("user account registration form component")}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-surface-container-highest/80 bg-surface-container-low px-3 py-1 text-code-stat font-semibold text-on-surface hover:border-primary hover:bg-surface-container hover:text-primary transition-all"
            >
              <Code2 className="h-3 w-3 text-primary" />
              camelCase
            </button>
            <button
              type="button"
              onClick={() => setText("api response error handler status code")}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-surface-container-highest/80 bg-surface-container-low px-3 py-1 text-code-stat font-semibold text-on-surface hover:border-primary hover:bg-surface-container hover:text-primary transition-all"
            >
              <Zap className="h-3 w-3 text-primary" />
              snake_case
            </button>
          </div>

          <div className="flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-body-sm font-bold text-on-surface">
                <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                Raw Text Input
              </p>
              <p className="text-code-stat text-on-surface-variant font-mono">
                {inputStats.words} words • {inputStats.characters} chars
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
              className="w-full rounded-xl border border-surface-container-highest/80 bg-surface-container-lowest p-4 text-body-sm text-on-surface placeholder-outline transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 font-mono"
            />
          </div>

          {/* Converted Case Cards Grid */}
          <div className="mt-6 border-t border-surface-container-highest/80 pt-6 text-left">
            <p className="text-body-sm font-bold text-on-surface mb-4 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              Converted Case Outputs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseOptions.map((opt) => (
                <div
                  key={opt.key}
                  className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest/80 flex flex-col justify-between gap-3 hover:border-outline-variant/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-code-stat font-bold uppercase tracking-wider text-on-surface-variant">
                      {opt.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(opt.value, opt.key)}
                      className={`px-3 py-1 rounded-lg border text-code-stat font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedKey === opt.key
                          ? "bg-secondary-container/50 border-secondary/40 text-on-secondary-container"
                          : "bg-surface-container-lowest border-surface-container-highest/80 text-on-surface hover:border-primary hover:text-primary"
                      }`}
                    >
                      {copiedKey === opt.key ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-secondary" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-on-surface-variant" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container-highest/80 text-on-surface font-mono text-code-stat overflow-x-auto truncate">
                    {opt.value || <span className="text-outline italic">Empty text</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-surface-container-highest/80 pt-6">
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasText}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 py-2 text-body-sm font-semibold text-on-surface-variant transition-colors duration-200 hover:text-primary disabled:cursor-not-allowed disabled:text-outline-variant"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset Input Text
            </button>
          </div>
        </form>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-body-sm text-on-surface-variant">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
          Private. 100% Browser-based processing. Zero server storage.
        </p>
      </div>
    </section>
  );
}
