export default function WhatMakesDifferent() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md">
      <div className="space-y-space-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
          What makes this different
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Built to be trustworthy, not just functional.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* 1 */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            100% browser-based
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Your text is cleaned directly in your browser. Nothing is uploaded, stored, or sent to a server.
          </p>
        </div>
        {/* 2 */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">person_off</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            No signup required
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Paste, clean, and copy immediately. No account, no email.
          </p>
        </div>
        {/* 3 */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">visibility</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Transparent by default
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            See exactly what was changed, and how many issues were found, every time you clean.
          </p>
        </div>
        {/* 4 */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">lock_open</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Free to use
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            No paywall and no usage limits.
          </p>
        </div>
      </div>
    </section>
  );
}
