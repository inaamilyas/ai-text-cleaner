'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { trackFAQExpand } from "@/lib/analytics";
import { homepageFaqs } from "@/lib/faqData";

export { homepageFaqs };

interface FAQProps {
  customFaqs?: Array<{ question: string; answer: string }>;
  customTitle?: string;
  customSubtitle?: string;
}

export default function FAQ({ customFaqs, customTitle, customSubtitle }: FAQProps = {}) {
  const items = customFaqs || homepageFaqs;
  const title = customTitle || "Frequently asked questions";
  const subtitle =
    customSubtitle ||
    "Common questions about how Text Cleaner AI works, supported formatting, and privacy.";

  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number, question: string) => {
    setOpenIndices((prev) => {
      const nextState = !prev[index];
      if (nextState) {
        trackFAQExpand(question);
      }
      return { ...prev, [index]: nextState };
    });
  };

  return (
    <section className="w-full py-12 border-t border-slate-200" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D4A] mb-3">
            {title}
          </h2>
          <p className="text-sm text-slate-600">
            {subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((faq, index) => {
            const isOpen = !!openIndices[index];
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index, faq.question)}
                  className="w-full px-5 py-4 text-left font-semibold text-sm text-[#172D4A] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F4F7FB]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
