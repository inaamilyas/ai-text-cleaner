export const audiences = [
  {
    title: "Writers",
    icon: "edit_note",
    description: "Clean AI-generated drafts before publishing.",
  },
  {
    title: "Developers",
    icon: "terminal",
    description: "Clean AI-generated code snippets and text.",
  },
  {
    title: "Students",
    icon: "school",
    description: "Remove unwanted formatting when moving AI-generated content into documents.",
  },
  {
    title: "Content creators",
    icon: "hub",
    description: "Clean AI output before moving it into CMSs and social platforms.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md">
      <div className="space-y-space-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
          Who it&apos;s for
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          If you work with AI-generated text, this is for you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {audiences.map((audience) => (
          <div
            key={audience.title}
            className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col space-y-space-xs hover:shadow-md transition-shadow"
          >
            <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[18px]">{audience.icon}</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {audience.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {audience.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
