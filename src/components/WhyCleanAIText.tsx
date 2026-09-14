export default function WhyCleanAIText() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md">
      <div className="space-y-space-xs">
        <span className="font-code-stat text-code-stat text-primary uppercase tracking-widest">
          DIAGNOSTIC ARCHITECTURE
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
          Why clean AI text
        </h2>
      </div>

      {/* 3-Column Progression */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Card 1 */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md group hover:shadow-md transition-shadow">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between text-outline font-code-stat text-code-stat">
              <span>STAGE 01</span>
              <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
              AI tools leave more behind than words
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Text copied from ChatGPT, Claude, Gemini, and other AI tools often carries hidden characters, smart quotes, em dashes, and leftover Markdown syntax that were never meant to leave the chat window.
            </p>
          </div>
          <div className="p-2 rounded bg-surface-container-low font-code-stat text-[10px] text-secondary flex items-center justify-between">
            <span>U+200B • U+00A0 • “Smart Quotes”</span>
            <span className="material-symbols-outlined text-[14px]">fingerprint</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md group hover:shadow-md transition-shadow">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between text-outline font-code-stat text-code-stat">
              <span>STAGE 02</span>
              <span className="material-symbols-outlined text-[18px] text-error">warning</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
              These artifacts break things downstream
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              They can break search and find-and-replace, cause formatting problems when pasted into another document, and make plain text behave unpredictably.
            </p>
          </div>
          <div className="p-2 rounded bg-surface-container-low font-code-stat text-[10px] text-error flex items-center justify-between">
            <span>Crash • Broken Regex • Malformed JSON</span>
            <span className="material-symbols-outlined text-[14px]">bug_report</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-space-md group hover:shadow-md transition-shadow">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between text-outline font-code-stat text-code-stat">
              <span>STAGE 03</span>
              <span className="material-symbols-outlined text-[18px] text-primary">task_alt</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Cleaning removes the quirks
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              The result reads and behaves like text you typed yourself.
            </p>
          </div>
          <div className="p-2 rounded bg-surface-container-low font-code-stat text-[10px] text-primary flex items-center justify-between">
            <span>Standard ASCII • Pure Typography • Clean</span>
            <span className="material-symbols-outlined text-[14px]">check</span>
          </div>
        </div>
      </div>
    </section>
  );
}
