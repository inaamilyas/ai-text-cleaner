export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="AI Text Cleaner logo"
    >
      <rect width="32" height="32" rx="8" fill="#016F4A" />
      <path
        d="M9 17 H13 L16 21 L23 10"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
