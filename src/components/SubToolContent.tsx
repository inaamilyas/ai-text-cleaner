import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Sparkles, HelpCircle } from "lucide-react";

export interface SubToolContentProps {
  title: string;
  directAnswerTitle: string;
  directAnswerText: string;
  beforeExample: string;
  afterExample: string;
  removedItems: { character: string; unicode: string; description: string }[];
  howToSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export default function SubToolContent({
  title,
  directAnswerTitle,
  directAnswerText,
  beforeExample,
  afterExample,
  removedItems,
  howToSteps,
  faqs,
}: SubToolContentProps) {
  return (
    <div className="flex flex-col gap-20 py-16 bg-neutral-0">
      {/* Direct Answer & Geo Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-2xl border border-primary-200 bg-primary-50/50 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-neutral-50">
              <Sparkles className="h-5 w-5" />
            </span>
            <h2 className="text-h4 text-neutral-900">{directAnswerTitle}</h2>
          </div>
          <p className="text-body-lg text-neutral-700 leading-relaxed">
            {directAnswerText}
          </p>
        </div>
      </section>

      {/* Before / After Comparison */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="See the Difference Before & After Cleaning"
            subtitle="Hidden artifacts and zero-width characters cause unexpected layout shifts, regex crashes, and AI detector flags. Here is how clean text compares."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-neutral-300 bg-neutral-50 p-6">
              <span className="inline-flex w-fit items-center rounded-md bg-neutral-200 px-3 py-1 text-body-xs font-bold text-neutral-700">
                BEFORE (Raw Text with Hidden Artifacts)
              </span>
              <pre className="whitespace-pre-wrap font-mono text-body-sm text-neutral-800 bg-neutral-100 p-4 rounded-lg border border-neutral-200 overflow-x-auto">
                {beforeExample}
              </pre>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-primary-300 bg-primary-50 p-6">
              <span className="inline-flex w-fit items-center rounded-md bg-primary-600 px-3 py-1 text-body-xs font-bold text-neutral-50">
                AFTER (Cleaned & Sanitized Output)
              </span>
              <pre className="whitespace-pre-wrap font-mono text-body-sm text-neutral-900 bg-neutral-0 p-4 rounded-lg border border-primary-200 overflow-x-auto">
                {afterExample}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Unicode Hex Breakdown Table */}
      {removedItems.length > 0 && (
        <section className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              title="Unicode Characters Removed & Filtered"
              subtitle="Our browser engine detects and strips invisible formatting controls and non-printable unicode points automatically."
            />
            <div className="mt-10 overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
              <table className="w-full text-left text-body-sm text-neutral-700">
                <thead className="bg-neutral-100 text-body-xs uppercase font-bold text-neutral-600 border-b border-neutral-200">
                  <tr>
                    <th scope="col" className="px-6 py-4">Character Name</th>
                    <th scope="col" className="px-6 py-4">Unicode Hex</th>
                    <th scope="col" className="px-6 py-4">Impact & Behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-neutral-0">
                  {removedItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 font-bold text-neutral-900">{item.character}</td>
                      <td className="px-6 py-4 font-mono text-primary-700 bg-primary-50/50 rounded inline-block my-2 px-2 py-0.5">
                        {item.unicode}
                      </td>
                      <td className="px-6 py-4">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* How To Steps */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title={`3 Simple Steps to Use ${title}`}
            subtitle="No software installation, account registration, or cloud API keys required. Processed entirely inside your local browser."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {howToSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-primary-300 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-button text-neutral-50 font-bold">
                  {index + 1}
                </div>
                <h3 className="text-h6 text-neutral-900">{step.title}</h3>
                <p className="text-body-sm text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      {faqs.length > 0 && (
        <section className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Got questions about zero-width characters, AI formatting, or privacy? We have answers."
            />
            <div className="mt-10 flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-neutral-200 bg-neutral-50 p-6"
                >
                  <h3 className="flex items-center gap-2 text-h6 text-neutral-900 mb-2">
                    <HelpCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-body-sm text-neutral-600 pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
