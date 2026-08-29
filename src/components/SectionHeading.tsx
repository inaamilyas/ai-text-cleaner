export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
      <h2>{title}</h2>
      {subtitle ? (
        <p className="text-body-md text-neutral-600">{subtitle}</p>
      ) : null}
    </div>
  );
}
