import React from "react";
import { Space, CornerDownLeft, EyeOff, FileText } from "lucide-react";

export default function CommonProblems() {
  const problems = [
    {
      title: "Extra spaces",
      desc: "Remove unnecessary spaces that make sentences and paragraphs look inconsistent.",
      icon: Space,
    },
    {
      title: "Unwanted line breaks",
      desc: "Fix supported line-break issues that interrupt the flow of copied text.",
      icon: CornerDownLeft,
    },
    {
      title: "Hidden characters",
      desc: "Remove supported invisible or unwanted characters that can affect text formatting.",
      icon: EyeOff,
    },
    {
      title: "Unwanted formatting",
      desc: "Make copied text easier to reuse using the cleaning options available in the tool.",
      icon: FileText,
    },
  ];

  return (
    <section className="w-full py-12 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D4A] mb-3">
            What can you clean from your text?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Copied text doesn&apos;t always look the way you expect. Extra spaces, broken line breaks, hidden characters, and unwanted formatting can make text difficult to read or reuse. Use Text Cleaner AI to fix supported text issues in a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#F4F7FB] border border-slate-200/60 flex items-center justify-center text-blue-600 mb-3.5">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#172D4A] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
