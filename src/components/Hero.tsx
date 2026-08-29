"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import copy from "copy-to-clipboard";
import {
  cleanText,
  cleaningOptionsList,
  defaultCleaningOptions,
  type CleaningOptions,
  type CleaningResult,
} from "@/lib/cleanText";
import { getTextStats } from "@/lib/textStats";

type FormValues = {
  input: string;
} & CleaningOptions;

const emptyStats = { words: 0, characters: 0, sentences: 0 };

export default function Hero() {
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { input: "", ...defaultCleaningOptions },
  });

  const [result, setResult] = useState<CleaningResult | null>(null);
  const [copied, setCopied] = useState(false);

  const inputText = useWatch({ control, name: "input" });
  const inputStats = useMemo(() => getTextStats(inputText), [inputText]);
  const hasText = inputText.length > 0;

  const outputStats = useMemo(
    () => (result ? getTextStats(result.cleaned) : emptyStats),
    [result]
  );

  function onSubmit(values: FormValues) {
    const { input, ...options } = values;
    setResult(cleanText(input, options));
    setCopied(false);
  }

  function handleReset() {
    reset({ input: "", ...defaultCleaningOptions });
    setResult(null);
    setCopied(false);
  }

  function handleCopy() {
    if (!result) return;
    copy(result.cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="bg-primary-0">
      <div className="container mx-auto flex flex-col items-center gap-10 px-6 py-20">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1>Paste AI text. Get clean text.</h1>
          <p className="text-body-lg text-neutral-700">
            Remove invisible characters, unwanted formatting, Markdown
            artifacts, and other AI text quirks, instantly in your browser.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="text-body-sm font-bold text-neutral-700">
                  Input
                </p>
                <p className="text-body-sm text-neutral-500">
                  {inputStats.words} words, {inputStats.characters} characters
                </p>
              </div>
              <textarea
                {...register("input")}
                placeholder="Paste your AI-generated text here..."
                rows={10}
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <p className="text-body-sm font-bold text-neutral-700">
                  Output
                </p>
                <p className="text-body-sm text-neutral-500">
                  {outputStats.words} words, {outputStats.characters}{" "}
                  characters
                </p>
              </div>
              <textarea
                readOnly
                value={result?.cleaned ?? ""}
                placeholder="Your cleaned text will appear here."
                rows={10}
                className="w-full rounded-lg border border-neutral-300 bg-neutral-0 p-4 text-body-sm text-neutral-900 placeholder-neutral-400"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-left">
            <p className="text-body-sm font-bold text-neutral-700">
              Cleaning options
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {cleaningOptionsList.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center gap-2 text-body-sm text-neutral-700"
                >
                  <input
                    type="checkbox"
                    {...register(option.key)}
                    className="h-4 w-4 accent-primary-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {result ? (
            <div className="mt-6 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-left">
              <p className="text-body-sm font-bold text-neutral-700">
                Text analysis
              </p>
              <div className="grid grid-cols-3 gap-4 sm:max-w-md">
                <div className="flex flex-col gap-1">
                  <p className="text-body-sm text-neutral-500">Words</p>
                  <p className="text-h6">
                    {inputStats.words} -&gt; {outputStats.words}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-body-sm text-neutral-500">Characters</p>
                  <p className="text-h6">
                    {inputStats.characters} -&gt; {outputStats.characters}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-body-sm text-neutral-500">Sentences</p>
                  <p className="text-h6">
                    {inputStats.sentences} -&gt; {outputStats.sentences}
                  </p>
                </div>
              </div>

              {result.summary.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <p className="text-body-sm font-bold text-neutral-700">
                    {result.totalChanges} formatting issues removed
                  </p>
                  <ul className="flex flex-col gap-1">
                    {result.summary.map((item) => (
                      <li
                        key={item.label}
                        className="text-body-sm text-neutral-600"
                      >
                        {item.count} {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-body-sm text-neutral-600">
                  No issues found. Your text was already clean.
                </p>
              )}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-6">
            <button
              type="submit"
              disabled={!hasText}
              className="text-button rounded-lg bg-primary-600 px-8 py-4 text-neutral-50 disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              Clean Text
            </button>
            {result ? (
              <button
                type="button"
                onClick={handleCopy}
                className="text-button rounded-lg border border-neutral-300 px-8 py-4 text-neutral-900"
              >
                {copied ? "Copied" : "Copy Clean Text"}
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasText && !result}
              className="text-body-sm font-bold text-neutral-600 hover:text-primary-600 disabled:text-neutral-300"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="text-body-sm text-neutral-500">
          Private. Browser-based. No signup required.
        </p>
      </div>
    </section>
  );
}
