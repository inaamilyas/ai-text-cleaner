import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const faqs = [
  {
    question: "Does AI Text Cleaner upload or store my text on any server?",
    answer:
      "No, absolutely not. AI Text Cleaner operates 100% locally inside your web browser using client-side JavaScript. Your text is never sent over the internet to cloud servers, databases, or third-party APIs. Your data remains completely private on your device.",
  },
  {
    question: "Why does text copied from ChatGPT, Claude, or Gemini have invisible characters?",
    answer:
      "Large Language Models (LLMs) and modern web chat interfaces insert non-printable unicode control characters (such as zero-width spaces U+200B and non-breaking spaces U+00A0) for layout rendering. When copied into code editors, Word, or Google Docs, these hidden characters cause unexpected syntax errors, regex failures, and formatting bugs.",
  },
  {
    question: "How does the AI Buzzword Stripper work?",
    answer:
      "Our AI Buzzword Stripper scans your text for overused, repetitive AI vocabulary heavily flagged by readers and AI detectors (such as 'delve', 'tapestry', 'testament', 'pivotal', 'foster', 'realm', 'in today's digital landscape'). It strips or normalizes these cliché phrases so your writing sounds authentic and human.",
  },
  {
    question: "Will using AI Text Cleaner change the meaning of my content?",
    answer:
      "No. AI Text Cleaner is a technical formatting sanitizer, not an AI rewriter or spinner. It removes hidden unicode control codes, raw Markdown tags, smart quotes, and optional cliché buzzwords while preserving your core ideas and message.",
  },
  {
    question: "Does AI Text Cleaner help bypass AI detectors?",
    answer:
      "While AI Text Cleaner is not an AI humanizer or evasion tool, removing invisible unicode tracking marks, raw Markdown formatting, and predictable AI buzzwords ('delve', 'tapestry') significantly reduces the structural and vocabulary patterns that AI detectors look for.",
  },
  {
    question: "Does it work with code snippets and JSON data?",
    answer:
      "Yes! Our 'Code & JSON Safe' preset normalizes curly smart quotes (“ ” ‘ ’) into ASCII straight quotes (\" ') and converts non-breaking spaces while keeping code syntax and backtick structures intact.",
  },
  {
    question: "How does it handle LaTeX math formulas from ChatGPT?",
    answer:
      "Our cleaner strips raw LaTeX math delimiters (\\[...\\], \\(...\\), $...$) and converts common mathematical symbols (such as \\rightarrow to →, \\times to ×) into clean plain text math unicode.",
  },
  {
    question: "Is AI Text Cleaner free to use for commercial projects?",
    answer:
      "Yes. AI Text Cleaner is 100% free for writers, developers, agencies, and students. There are no usage limits, word caps, or forced paid tiers.",
  },
  {
    question: "How do I use the Quick Presets?",
    answer:
      "Click any preset chip at the top of the editor ('⚡ ChatGPT & Claude', '🤖 Remove AI Buzzwords', '💻 Code & JSON Safe', '📝 Publishing & Docs') to automatically enable the optimal cleaning toggles for your specific text type.",
  },
  {
    question: "What is the maximum word or character limit?",
    answer:
      "Because processing runs in your local browser memory, there is no fixed word limit. You can paste and clean documents containing 50,000+ words in under 10 milliseconds.",
  },
];

interface FAQProps {
  customFaqs?: Array<{ question: string; answer: string }>;
  customTitle?: string;
  customSubtitle?: string;
}

export default function FAQ({ customFaqs, customTitle, customSubtitle }: FAQProps = {}) {
  const items = customFaqs || faqs;
  const title = customTitle || "Frequently Asked Questions";
  const subtitle = customSubtitle || "Everything you need to know about AI text formatting, invisible unicode characters, and privacy.";

  return (
    <section className="bg-neutral-0">
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
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
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
