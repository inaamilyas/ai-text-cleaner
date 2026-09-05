import { TriangleAlert, CircleX, CircleCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const points = [
  {
    icon: TriangleAlert,
    color: "text-alert-600",
    title: "AI tools leave more behind than words",
    description:
      "Text copied from ChatGPT, Claude, Gemini, and other AI tools often carries hidden characters, smart quotes, em dashes, and leftover Markdown syntax that were never meant to leave the chat window.",
  },
  {
    icon: CircleX,
    color: "text-danger-600",
    title: "These artifacts break things downstream",
    description:
      "They can break search and find-and-replace, cause formatting problems when pasted into another document, and make plain text behave unpredictably.",
  },
  {
    icon: CircleCheck,
    color: "text-success-600",
    title: "Cleaning removes the quirks",
    description:
      "The result reads and behaves like text you typed yourself.",
  },
];

export default function WhyCleanAIText() {
  return (
    <section className="bg-neutral-50">
      <div className="container mx-auto flex flex-col gap-10 px-6 py-20">
        <SectionHeading title="Why clean AI text" />
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
          {points.map((point) => (
            <div key={point.title} className="flex gap-4">
              <point.icon
                className={`h-6 w-6 shrink-0 ${point.color}`}
                strokeWidth={2}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <h6>{point.title}</h6>
                <p className="text-body-md text-neutral-700">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
