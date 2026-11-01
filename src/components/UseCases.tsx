import React from "react";
import { GraduationCap, PenLine, Briefcase, Terminal } from "lucide-react";

export default function UseCases() {
  const cases = [
    {
      title: "Students",
      desc: "Clean copied notes, study material, and text from online resources.",
      icon: GraduationCap,
    },
    {
      title: "Writers",
      desc: "Fix inconsistent spacing and formatting before editing or publishing.",
      icon: PenLine,
    },
    {
      title: "Professionals",
      desc: "Prepare copied text for emails, reports, and documents.",
      icon: Briefcase,
    },
    {
      title: "Developers",
      desc: "Clean text snippets and formatting before using them in code editors or other tools.",
      icon: Terminal,
    },
  ];

  return (
    <section className="w-full py-12 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D4A] mb-3">
            When do you need a text cleaner?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you&apos;re working with documents, online content, or copied text, cleaning formatting can save time and make your content easier to work with.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((c) => (
            <div
              key={c.title}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#F4F7FB] border border-slate-200/60 flex items-center justify-center text-blue-600 mb-3.5">
                  <c.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#172D4A] mb-1.5">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
