export default function CompetitorComparison() {
  return (
    <section className="w-full py-12 md:py-16 flex flex-col space-y-space-md">
      <div className="space-y-space-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
          Why Choose Text Cleaner AI?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Compare Text Cleaner AI with AITextClean, CleanPaste, and basic unicode utility tools.
        </p>
      </div>

      {/* Table Wrapper */}
      <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left font-body-md text-body-md">
          <thead>
            <tr className="bg-surface-container-low text-on-surface">
              <th className="py-3 px-space-md font-headline-sm text-headline-sm font-semibold">
                Feature / Capability
              </th>
              <th className="py-3 px-space-md font-headline-sm text-headline-sm font-semibold bg-primary-fixed/30 text-primary">
                <div className="flex items-center gap-1.5">
                  <span>Text Cleaner AI</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-code-stat bg-primary text-on-primary">
                    ACTIVE
                  </span>
                </div>
              </th>
              <th className="py-3 px-space-md font-headline-sm text-headline-sm font-semibold text-secondary">
                AITextClean
              </th>
              <th className="py-3 px-space-md font-headline-sm text-headline-sm font-semibold text-secondary">
                CleanPaste
              </th>
              <th className="py-3 px-space-md font-headline-sm text-headline-sm font-semibold text-secondary">
                Generic Tools
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {/* Row 1 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                100% Client-Side Privacy (Zero Server Storage)
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> Yes
                </span>
              </td>
              <td className="py-3 px-space-md text-secondary">Partial (API)</td>
              <td className="py-3 px-space-md text-secondary">No (Server)</td>
              <td className="py-3 px-space-md text-outline">Unverified</td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                1-Click Preset Chips (ChatGPT, Code, Docs)
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-outline">—</td>
              <td className="py-3 px-space-md text-outline">—</td>
              <td className="py-3 px-space-md text-outline">—</td>
            </tr>
            {/* Row 3 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                Interactive 1-Click Sample Text Demo
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-outline">—</td>
              <td className="py-3 px-space-md text-outline">—</td>
              <td className="py-3 px-space-md text-outline">—</td>
            </tr>
            {/* Row 4 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                Visual Diff View &amp; Character Inspector
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-outline">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </td>
              <td className="py-3 px-space-md text-outline">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </td>
              <td className="py-3 px-space-md text-outline">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </td>
            </tr>
            {/* Row 5 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                Zero Ad Clutter &amp; Popups
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-secondary">Ads</td>
              <td className="py-3 px-space-md text-secondary">Ads</td>
              <td className="py-3 px-space-md text-secondary">Ads</td>
            </tr>
            {/* Row 6 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                Download Clean Output as .txt File
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-secondary">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-outline">—</td>
              <td className="py-3 px-space-md text-outline">—</td>
            </tr>
            {/* Row 7 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                Zero-Width Space &amp; Unicode Hex Filter
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-secondary">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-secondary">Partial</td>
              <td className="py-3 px-space-md text-secondary">Partial</td>
            </tr>
            {/* Row 8 */}
            <tr className="hover:bg-surface-container-lowest transition-colors">
              <td className="py-3 px-space-md text-on-surface font-medium">
                Markdown &amp; Smart Quote Normalizer
              </td>
              <td className="py-3 px-space-md bg-primary-fixed/10 text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-secondary">Partial</td>
              <td className="py-3 px-space-md text-secondary">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </td>
              <td className="py-3 px-space-md text-secondary">Partial</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
