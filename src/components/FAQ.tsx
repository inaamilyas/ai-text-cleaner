'use client';

import { useState } from "react";
import { generateFAQPageSchema } from "@/lib/schema";
import { trackFAQExpand } from "@/lib/analytics";
import { defaultFaqs } from "@/lib/faqData";

export const faqs = defaultFaqs;

interface FAQProps {
  customFaqs?: Array<{ question: string; answer: string }>;
  customTitle?: string;
  customSubtitle?: string;
}

export default function FAQ({ customFaqs, customTitle, customSubtitle }: FAQProps = {}) {
  const items = customFaqs || faqs;
  const title = customTitle || "Frequently Asked Questions";
  const subtitle =
    customSubtitle ||
    "Everything you need to know about AI text formatting, invisible unicode characters, and privacy.";

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

  const faqSchema = generateFAQPageSchema(items);

  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="space-y-space-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
          {title}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {subtitle}
        </p>
      </div>

      {/* Accordion Items */}
      <div className="space-y-space-xs">
        {items.map((faq, index) => {
          const isOpen = !!openIndices[index];
          return (
            <div
              key={faq.question}
              className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index, faq.question)}
                className="w-full px-space-md py-4 text-left font-headline-sm text-headline-sm text-on-surface font-medium flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <span
                  className={`material-symbols-outlined text-outline transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="px-space-md pb-4 pt-1 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
