import type { LucideIcon } from "lucide-react";

const colorClasses = {
  primary: "bg-primary-100 text-primary-700",
  secondary: "bg-secondary-100 text-secondary-700",
} as const;

export default function IconBadge({
  icon: Icon,
  color = "primary",
}: {
  icon: LucideIcon;
  color?: keyof typeof colorClasses;
}) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClasses[color]}`}
    >
      <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}
