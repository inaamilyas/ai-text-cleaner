import SectionHeading from "@/components/SectionHeading";

const differentiators = [
  {
    title: "100% browser-based",
    description:
      "Your text is cleaned directly in your browser. Nothing is uploaded, stored, or sent to a server.",
  },
  {
    title: "No signup required",
    description: "Paste, clean, and copy immediately. No account, no email.",
  },
  {
    title: "Transparent by default",
    description:
      "See exactly what was changed, and how many issues were found, every time you clean.",
  },
  {
    title: "Free to use",
    description: "No paywall and no usage limits.",
  },
];

export default function WhatMakesDifferent() {
  return (
    <section id="privacy" className="bg-neutral-0">
      <div className="container mx-auto flex flex-col gap-10 px-6 py-20">
        <SectionHeading
          title="What makes this different"
          subtitle="Built to be trustworthy, not just functional."
        />
        <div className="mx-auto grid w-full max-w-4xl gap-8 sm:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h5>{item.title}</h5>
              <p className="text-body-sm text-neutral-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
