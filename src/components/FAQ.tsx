import SectionHeading from "@/components/SectionHeading";

export const faqs = [
  {
    question: "Does my text get uploaded?",
    answer: "No. Cleaning happens directly in your browser.",
  },
  {
    question: "Does it work with ChatGPT?",
    answer:
      "Yes. It can clean text copied from ChatGPT and other AI assistants.",
  },
  {
    question: "Does it remove the meaning of my text?",
    answer:
      "No. The cleaner is designed to modify formatting and text artifacts rather than rewrite your content.",
  },
  {
    question: "Does it detect AI-generated text?",
    answer: "No. The product cleans text; it is not an AI detector.",
  },
  {
    question: "Is it free?",
    answer: "Yes. V1 is completely free to use.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-neutral-0">
      <div className="container mx-auto flex flex-col gap-12 px-6 py-20">
        <SectionHeading title="Frequently asked questions" />
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="flex flex-col gap-1">
              <h6>{faq.question}</h6>
              <p className="text-body-md text-neutral-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
