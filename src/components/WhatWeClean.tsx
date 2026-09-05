import { CircleCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const items = [
  "Invisible characters",
  "Zero-width spaces",
  "Non-breaking spaces",
  "Smart quotes",
  "Em dashes",
  "Ellipsis characters",
  "Markdown formatting",
  "Extra whitespace",
  "Unicode formatting",
  "Decorative symbols",
  "Emoji",
];

export default function WhatWeClean() {
  return (
    <section className="bg-neutral-0">
      <div className="container mx-auto flex flex-col gap-10 px-6 py-20">
        <SectionHeading
          title="What we remove"
          subtitle="A quick look at the artifacts we catch by default."
        />
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-body-sm text-neutral-700"
            >
              <CircleCheck
                className="h-4 w-4 text-primary-600"
                strokeWidth={2}
                aria-hidden="true"
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
