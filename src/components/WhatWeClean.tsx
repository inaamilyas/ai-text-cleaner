export default function WhatWeClean() {
  const items = [
    { label: "Invisible characters", dotClass: "bg-error" },
    { label: "Zero-width spaces", dotClass: "bg-error" },
    { label: "Non-breaking spaces", dotClass: "bg-primary" },
    { label: "Smart quotes", dotClass: "bg-primary" },
    { label: "Em dashes", dotClass: "bg-primary" },
    { label: "Ellipsis characters", dotClass: "bg-primary" },
    { label: "Markdown formatting", dotClass: "bg-secondary" },
    { label: "Extra whitespace", dotClass: "bg-secondary" },
    { label: "Unicode formatting", dotClass: "bg-primary" },
    { label: "Decorative symbols", dotClass: "bg-error" },
    { label: "Emoji", dotClass: "bg-secondary" },
  ];

  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md">
      <div className="space-y-space-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
          What we remove
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          A quick look at the artifacts we catch by default.
        </p>
      </div>
      <div className="flex flex-wrap gap-space-xs">
        {items.map((item) => (
          <div
            key={item.label}
            className="px-3 py-2 rounded-lg bg-surface-container-lowest shadow-sm flex items-center gap-2"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${item.dotClass}`}></span>
            <span className="font-body-md text-body-md text-on-surface font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
