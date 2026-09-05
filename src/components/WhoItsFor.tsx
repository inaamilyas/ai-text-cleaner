import { PenLine, Code2, GraduationCap, Megaphone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import IconBadge from "@/components/IconBadge";

export const audiences = [
  {
    icon: PenLine,
    color: "primary" as const,
    title: "Writers",
    description: "Clean AI-generated drafts before publishing.",
  },
  {
    icon: Code2,
    color: "secondary" as const,
    title: "Developers",
    description: "Clean AI-generated code snippets and text.",
  },
  {
    icon: GraduationCap,
    color: "primary" as const,
    title: "Students",
    description:
      "Remove unwanted formatting when moving AI-generated content into documents.",
  },
  {
    icon: Megaphone,
    color: "secondary" as const,
    title: "Content creators",
    description:
      "Clean AI output before moving it into CMSs and social platforms.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="bg-neutral-0">
      <div className="container mx-auto flex flex-col gap-12 px-6 py-20">
        <SectionHeading
          title="Who it's for"
          subtitle="If you work with AI-generated text, this is for you."
        />
        <div className="mx-auto grid w-full max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div key={audience.title} className="flex flex-col gap-3">
              <IconBadge icon={audience.icon} color={audience.color} />
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
