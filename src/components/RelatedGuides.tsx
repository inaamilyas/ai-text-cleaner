import Link from "next/link";

type RelatedGuidesProps = {
  title: string;
  links: { href: string; label: string; desc: string }[];
};

export default function RelatedGuides({ title, links }: RelatedGuidesProps) {
  return (
    <section className="w-full flex flex-col gap-space-sm">
      <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex flex-col gap-1 hover:border-primary transition-colors"
          >
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
              {link.label}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {link.desc}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
