import SectionHeading from "@/components/SectionHeading";

export const audiences = [
  {
    title: "Writers",
    description: "Clean AI-generated drafts before publishing.",
  },
  {
    title: "Developers",
    description: "Clean AI-generated code snippets and text.",
  },
  {
    title: "Students",
    description:
      "Remove unwanted formatting when moving AI-generated content into documents.",
  },
  {
    title: "Content creators",
    description:
      "Clean AI output before moving it into CMSs and social platforms.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="bg-neutral-50">
      <div className="container mx-auto flex flex-col gap-12 px-6 py-20">
        <SectionHeading
          title="Who it's for"
          subtitle="If you work with AI-generated text, this is for you."
        />
        <div className="mx-auto grid w-full max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div key={audience.title} className="flex flex-col gap-2">
              <h5>{audience.title}</h5>
              <p className="text-body-sm text-neutral-700">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
