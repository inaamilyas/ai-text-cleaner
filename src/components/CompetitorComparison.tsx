import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Check, X, Sparkles } from "lucide-react";

export default function CompetitorComparison() {
  const comparisonMatrix = [
    {
      feature: "100% Client-Side Privacy (Zero Server Storage)",
      us: true,
      aiTextClean: true,
      cleanPaste: true,
      generic: false,
    },
    {
      feature: "1-Click Preset Chips (ChatGPT, Code, Docs)",
      us: true,
      aiTextClean: false,
      cleanPaste: false,
      generic: false,
    },
    {
      feature: "Interactive 1-Click Sample Text Demo",
      us: true,
      aiTextClean: false,
      cleanPaste: false,
      generic: false,
    },
    {
      feature: "Visual Diff View & Character Inspector",
      us: true,
      aiTextClean: false,
      cleanPaste: false,
      generic: false,
    },
    {
      feature: "Zero Ad Clutter & Popups",
      us: true,
      aiTextClean: true,
      cleanPaste: false,
      generic: false,
    },
    {
      feature: "Download Clean Output as .txt File",
      us: true,
      aiTextClean: false,
      cleanPaste: false,
      generic: false,
    },
    {
      feature: "Zero-Width Space & Unicode Hex Filter",
      us: true,
      aiTextClean: true,
      cleanPaste: true,
      generic: true,
    },
    {
      feature: "Markdown & Smart Quote Normalizer",
      us: true,
      aiTextClean: true,
      cleanPaste: false,
      generic: false,
    },
  ];

  return (
    <section className="bg-neutral-50 py-20 border-t border-neutral-200">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Why Choose AI Text Cleaner?"
          subtitle="Compare AI Text Cleaner with AITextClean, CleanPaste, and basic unicode utility tools."
        />

        <div className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200 bg-neutral-0 shadow-sm">
          <table className="w-full text-left text-body-sm text-neutral-700">
            <thead className="bg-neutral-100 text-body-xs uppercase font-bold text-neutral-600 border-b border-neutral-200">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Feature / Capability
                </th>
                <th scope="col" className="px-6 py-5 text-center font-extrabold text-primary-700 bg-primary-50/50">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary-600" />
                    AI Text Cleaner
                  </div>
                </th>
                <th scope="col" className="px-6 py-5 text-center text-neutral-600">
                  AITextClean
                </th>
                <th scope="col" className="px-6 py-5 text-center text-neutral-600">
                  CleanPaste
                </th>
                <th scope="col" className="px-6 py-5 text-center text-neutral-600">
                  Generic Tools
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {comparisonMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center bg-primary-50/30 font-bold">
                    {row.us ? (
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary-600 text-neutral-50 mx-auto">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : (
                      <X className="h-5 w-5 text-neutral-300 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.aiTextClean ? (
                      <Check className="h-5 w-5 text-primary-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-neutral-300 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.cleanPaste ? (
                      <Check className="h-5 w-5 text-primary-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-neutral-300 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.generic ? (
                      <Check className="h-5 w-5 text-primary-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-neutral-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
