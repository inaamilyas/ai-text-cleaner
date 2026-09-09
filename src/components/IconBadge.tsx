import type { LucideIcon } from "lucide-react";

// `color` is kept for call-site compatibility, but the Swiss Minimal design
// uses a single neutral-bordered badge treatment regardless of variant --
// the brand green is reserved as the one accent color, not spread across
// alternating badge fills.
const colorClasses = {
  primary: "border border-neutral-200 bg-white text-primary-700",
  secondary: "border border-neutral-200 bg-white text-primary-700",
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
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${colorClasses[color]}`}
    >
      <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}
