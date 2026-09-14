export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center mb-8">
      <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
