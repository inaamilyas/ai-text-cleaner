export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="AI Text Cleaner logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aitc-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="aitc-sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <filter id="aitc-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#064E3B" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer Squircle Container */}
      <rect width="40" height="40" rx="10" fill="url(#aitc-bg-grad)" />

      {/* Subtle Inner Glow Accent */}
      <rect x="1" y="1" width="38" height="38" rx="9" fill="none" stroke="#A7F3D0" strokeOpacity="0.4" strokeWidth="1" />

      {/* Clean Document Page Icon */}
      <g filter="url(#aitc-shadow)">
        {/* Document Page Backdrop */}
        <path
          d="M10 10C10 8.89543 10.8954 8 12 8H22L28 14V28C28 29.1046 27.1046 30 26 30H12C10.8954 30 10 29.1046 10 28V10Z"
          fill="#064E3B"
          fillOpacity="0.45"
        />
        <path
          d="M11 11C11 9.89543 11.8954 9 13 9H21L27 15V27C27 28.1046 26.1046 29 25 29H13C11.8954 29 11 28.1046 11 27V11Z"
          fill="#FFFFFF"
        />
        {/* Folded Corner */}
        <path d="M21 9V14C21 14.5523 21.4477 15 22 15H27L21 9Z" fill="#D1FAE5" />

        {/* Text Lines Being Sanitized */}
        <rect x="14" y="14" width="5" height="2" rx="1" fill="#10B981" />
        <rect x="14" y="18" width="9" height="2" rx="1" fill="#6EE7B7" />
        <rect x="14" y="22" width="7" height="2" rx="1" fill="#6EE7B7" />
      </g>

      {/* AI Cleaning Sparkle 1 (Large Top Right) */}
      <path
        d="M28 6C28 8.76142 25.7614 11 23 11C25.7614 11 28 13.2386 28 16C28 13.2386 30.2386 11 33 11C30.2386 11 28 8.76142 28 6Z"
        fill="url(#aitc-sparkle-grad)"
      />

      {/* AI Cleaning Sparkle 2 (Small Bottom Left) */}
      <path
        d="M9 24C9 25.6569 7.65685 27 6 27C7.65685 27 9 28.3431 9 30C9 28.3431 10.3431 27 12 27C10.3431 27 9 25.6569 9 24Z"
        fill="#ECFDF5"
      />
    </svg>
  );
}
