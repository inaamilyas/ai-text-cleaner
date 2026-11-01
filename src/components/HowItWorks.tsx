import React from "react";
import { ClipboardPaste, Sliders, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Paste your text",
      desc: "Copy text from a document, website, AI chat, or another source and paste it into the editor.",
      icon: ClipboardPaste,
    },
    {
      num: "2",
      title: "Choose what to clean",
      desc: "Select the available cleaning options based on the problem you want to fix.",
      icon: Sliders,
    },
    {
      num: "3",
      title: "Copy your result",
      desc: "Review the cleaned output and copy it wherever you need it.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="w-full py-12 border-t border-slate-200" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D4A] mb-3">
            Clean your text in three simple steps
          </h2>
          <p className="text-sm text-slate-600">
            A fast, straightforward workflow with no registration required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center font-mono">
                    {step.num}
                  </span>
                  <step.icon className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-[#172D4A] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
