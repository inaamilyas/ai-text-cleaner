'use client';

import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
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
  const subtitle = customSubtitle || "Everything you need to know about AI text formatting, invisible unicode characters, and privacy.";

  const faqSchema = generateFAQPageSchema(items);

  return (
    <section className="bg-neutral-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto flex flex-col gap-12 px-6 py-20">
        <SectionHeading
          title={title}
          subtitle={subtitle}
        />
        <div className="mx-auto flex w-full max-w-3xl flex-col">
          {items.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-neutral-200 py-5 first:pt-0 last:border-b-0"
            >
              <summary
                onClick={() => trackFAQExpand(faq.question)}
                className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden"
              >
                <h3 className="text-h6 text-neutral-900">{faq.question}</h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pt-3 text-body-md text-neutral-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
