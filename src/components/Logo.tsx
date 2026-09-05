export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Text Clean AI logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tcai-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="tcai-sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <filter id="tcai-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#064E3B" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer Squircle Container */}
      <rect width="40" height="40" rx="10" fill="url(#tcai-bg-grad)" />

      {/* Subtle Inner Glow Border */}
      <rect x="1" y="1" width="38" height="38" rx="9" fill="none" stroke="#A7F3D0" strokeOpacity="0.4" strokeWidth="1" />

      {/* Clean Document Page Icon */}
      <g filter="url(#tcai-shadow)">
        {/* Document Page Backdrop */}
        <path
          d="M9 10C9 8.89543 9.89543 8 11 8H21L27 14V28C27 29.1046 26.1046 30 25 30H11C9.89543 30 9 29.1046 9 28V10Z"
          fill="#064E3B"
          fillOpacity="0.4"
        />
        <path
          d="M10 11C10 9.89543 10.8954 9 12 9H20L26 15V27C26 28.1046 25.1046 29 24 29H12C10.8954 29 10 28.1046 10 27V11Z"
          fill="#FFFFFF"
        />
        {/* Folded Corner */}
        <path d="M20 9V14C20 14.5523 20.4477 15 21 15H26L20 9Z" fill="#D1FAE5" />

        {/* Clean Lines */}
        <rect x="13" y="13" width="5" height="1.5" rx="0.75" fill="#10B981" />
        <rect x="13" y="16" width="9" height="1.5" rx="0.75" fill="#A7F3D0" />

        {/* Crisp Bold AI Text Badge inside document */}
        <text
          x="18"
          y="25"
          textAnchor="middle"
          fill="#047857"
          fontWeight="900"
          fontSize="9"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5px"
        >
          AI
        </text>
      </g>

      {/* AI Sparkle 1 (Top Right Starburst) */}
      <path
        d="M28 6C28 8.76142 25.7614 11 23 11C25.7614 11 28 13.2386 28 16C28 13.2386 30.2386 11 33 11C30.2386 11 28 8.76142 28 6Z"
        fill="url(#tcai-sparkle-grad)"
      />

      {/* AI Sparkle 2 (Small Bottom Left Star) */}
      <path
        d="M8 24C8 25.6569 6.65685 27 5 27C6.65685 27 8 28.3431 8 30C8 28.3431 9.3431 27 11 27C9.3431 27 8 25.6569 8 24Z"
        fill="#ECFDF5"
      />
    </svg>
  );
}
