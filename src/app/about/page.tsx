import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — AI Text Cleaner",
  description:
    "Learn about AI Text Cleaner, created by Inam Ilyas. Our mission is to sanitize AI text formatting with 100% client-side privacy.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      es: "/es/about",
      de: "/de/about",
      fr: "/fr/about",
      it: "/it/about",
      pt: "/pt/about",
      ar: "/ar/about",
      ja: "/ja/about",
      nl: "/nl/about",
      tr: "/tr/about",
      id: "/id/about",
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Inam Ilyas",
  jobTitle: "Founder & Lead Engineer",
  url: "https://www.text-cleaner-ai.com/about",
  sameAs: [
    "https://www.linkedin.com/in/inam-ilyas/",
    "https://github.com/inaamilyas/",
    "https://x.com/inaamilyas",
  ],
  email: "mailto:inaamilyas656@gmail.com",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="w-full flex flex-col">
        <span className="sr-only">
          About Us | AI Text Cleaner
        </span>
        <div className="container mx-auto px-4 md:px-8 py-space-xl flex flex-col gap-space-xl">
          {/*  1. Hero Section  */}
          <section className="flex flex-col items-center text-center gap-space-sm relative overflow-hidden py-space-sm">
          <div className="flex flex-col gap-space-xs max-w-4xl md:max-w-5xl">
          <h1 className="font-headline-lg text-display-lg text-on-surface tracking-tight">
                    About AI Text Cleaner
                  </h1>
          <p className="font-headline-md text-headline-md text-primary font-medium">
                    Sanitizing AI Text for Writers, Developers &amp; Creators
                  </p>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl md:max-w-4xl text-center leading-relaxed">
                  AI Text Cleaner was built by <span className="text-on-surface font-semibold">Inam Ilyas</span> to solve a universal problem in modern publishing: hidden unicode artifacts, zero-width spaces, and raw Markdown clutter in AI-generated text.
                </p>
          <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-primary">memory</span>
          <span className="">100% In-Browser Memory</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-primary">speed</span>
          <span className="">Zero Server Latency</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-primary">lock_open</span>
          <span className="">Free Forever &amp; Open Access</span>
          </div>
          </div>
          </section>
          {/*  2. Core Architectural Pillars (3-Card Bento Grid)  */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/*  Card 1  */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">100% Private Execution</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      All text sanitization executes entirely in your local browser runtime. Text payloads never traverse network sockets, avoiding cloud serialization or server logs.
                    </p>
          </div>
          <div className="flex flex-wrap gap-space-xs pt-space-xs">
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">SOC2 Type II Aligned</span>
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">Zero Telemetry Payloads</span>
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">Offline Capable</span>
          </div>
          </div>
          {/*  Card 2  */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[24px]">bolt</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Instant Local Performance</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Eliminates API round-trip latencies. Clean up to 50,000+ words in under 10 milliseconds using hardware-accelerated regex and non-blocking pipeline routines.
                    </p>
          </div>
          <div className="flex flex-wrap gap-space-xs pt-space-xs">
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">&lt;10ms Engine</span>
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">Multi-core Regex Worker</span>
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">0.28ms V8 Latency</span>
          </div>
          </div>
          {/*  Card 3  */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[24px]">cleaning_services</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Advanced Engine</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Strips zero-width spaces (U+200B), soft hyphens, curly quotes, mismatched Markdown delimiters, and robotic generative markers with surgically configured filters.
                    </p>
          </div>
          <div className="flex flex-wrap gap-space-xs pt-space-xs">
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">14+ Sanitizers</span>
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">UTF-8 Normalization</span>
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant">Binary Stream Parsing</span>
          </div>
          </div>
          </section>
          {/*  3. Our Story & Purpose (Editorial Split Grid)  */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-space-lg bg-surface-container-lowest p-space-xl rounded-xl shadow-sm">
          <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs text-error">
          <span className="material-symbols-outlined text-[20px]">error_outline</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">The Problem We Discovered</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Silent unicode anomalies sabotage production copy.
                  </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    When copying text from OpenAI ChatGPT, Anthropic Claude, or Google Gemini into Microsoft Word, Google Docs, or CMS editors like WordPress, invisible formatting characters tag along unnoticed.
                  </p>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    These hidden unicode points cause broken line wraps, serialization failures, and build errors in software workflows. Furthermore, overused AI transitions (<span className="text-on-surface font-mono">delve</span>, <span className="text-on-surface font-mono">tapestry</span>, <span className="text-on-surface font-mono">testament to</span>) trigger algorithmic fatigue and diminish authentic reader engagement.
                  </p>
          </div>
          <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs text-primary">
          <span className="material-symbols-outlined text-[20px]">shield</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">The Privacy-First Solution</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Architectural sovereignty for modern content pipelines.
                  </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    AI Text Cleaner was created to give content creators, technical writers, software engineers, and researchers a rapid, cost-free, and privacy-first tool to sanitize AI text with a single click.
                  </p>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Unlike cloud SaaS providers that store and run training pipelines against submitted payloads, our browser-native model guarantees proprietary manuscripts and internal codebases remain quarantined on your physical machine.
                  </p>
          </div>
          </section>
          {/*  4. Technical Architecture: Zero-Leak Sandbox & Terminal  */}
          <section className="flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs">
          <div className="font-code-stat text-code-stat text-primary uppercase tracking-wider">Architecture Deep Dive</div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Client-Side Quarantine Pipeline</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/*  Interactive Steps  */}
          <div className="lg:col-span-7 flex flex-col gap-space-sm">
          {/*  Step 1  */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-code-stat text-code-stat shrink-0 font-bold">
                        01
                      </div>
          <div className="flex flex-col gap-space-xs">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">DOM Stream Ingestion</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          Raw payloads stream from the clipboard or textarea straight into an in-memory V8 TypedArray. No intermediary caches, service worker mirrors, or local IndexedDB stores are initialized.
                        </p>
          </div>
          </div>
          {/*  Step 2  */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md">
          <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-code-stat text-code-stat shrink-0 font-bold">
                        02
                      </div>
          <div className="flex flex-col gap-space-xs">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">WebAssembly &amp; Regex Heuristic Engine</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          Token sequences run through isolated regex filters, UTF-8 unicode code-point sanitizers, and Flesch-Kincaid grade evaluation modules without UI thread blocking.
                        </p>
          </div>
          </div>
          {/*  Step 3  */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md">
          <div className="w-8 h-8 rounded-lg bg-tertiary-container text-on-tertiary flex items-center justify-center font-code-stat text-code-stat shrink-0 font-bold">
                        03
                      </div>
          <div className="flex flex-col gap-space-xs">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Zero-Leak Sandbox Guarantee</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          Network sockets remain closed during string manipulation. Our Content Security Policy prevents outbound POST, fetch, beacon, or analytical payloads.
                        </p>
          </div>
          </div>
          </div>
          {/*  Live Terminal View  */}
          <div className="lg:col-span-5 flex flex-col rounded-xl bg-inverse-surface text-inverse-on-surface p-space-md shadow-md justify-between font-code-stat text-code-stat gap-space-md">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-highest/20">
          <div className="flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-surface-variant"></span>
          <span className="ml-space-xs text-outline-variant font-code-stat">inspect-network-sandbox.sh</span>
          </div>
          <span className="text-outline-variant text-[10px] tracking-wider uppercase">V8 SECURE CONTEXT</span>
          </div>
          <div className="flex flex-col gap-space-xs text-inverse-on-surface font-body-sm">
          <div className="flex items-center gap-space-xs text-primary-fixed-dim">
          <span className="">$</span>
          <span className="">./verify-network-activity --target aitextcleaner.com</span>
          </div>
          <div className="text-outline-variant">Scanning active XHR, Fetch &amp; WebSocket sockets...</div>
          <div className="flex items-center gap-space-xs text-surface-bright">
          <span className="material-symbols-outlined text-[14px] text-primary-fixed-dim">check_circle</span>
          <span className="">[OK] 0 outbound network requests detected</span>
          </div>
          <div className="flex items-center gap-space-xs text-surface-bright">
          <span className="material-symbols-outlined text-[14px] text-primary-fixed-dim">check_circle</span>
          <span className="">[OK] 100% Client-side heap allocation</span>
          </div>
          <div className="flex items-center gap-space-xs text-surface-bright">
          <span className="material-symbols-outlined text-[14px] text-primary-fixed-dim">check_circle</span>
          <span className="">[OK] Zero telemetry, cookies, or tracking beacons</span>
          </div>
          <div className="text-outline-variant mt-space-xs">// Runtime integrity check: PASS</div>
          </div>
          <div className="p-space-xs rounded bg-surface-container-highest/10 flex items-center justify-between text-outline-variant font-label-sm">
          <span className="">Isolation Layer: ENABLED</span>
          <span className="">DOM Caching: OFF</span>
          </div>
          </div>
          </div>
          </section>
          {/*  5. Product Values & Principles (4-Card Grid)  */}
          <section className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-space-xs">
          <div className="font-code-stat text-code-stat text-primary uppercase tracking-wider">Engineering Philosophies</div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Our Operating Principles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-xs">
          <span className="material-symbols-outlined text-[20px]">privacy_tip</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Uncompromising Privacy</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Your drafts belong to you. We do not inspect, log, or profit from your text data, guaranteeing complete confidentiality.
                    </p>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-xs">
          <span className="material-symbols-outlined text-[20px]">timer</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Sub-Millisecond Speed</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      No spin wheels, no queues, and no cloud processing wait times. Operations run locally in sub-millisecond cycles.
                    </p>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-xs">
          <span className="material-symbols-outlined text-[20px]">public</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Universal Access</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      No subscription tiers, credit cards, or accounts required. Built to serve as a reliable, permanent public web utility.
                    </p>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-xs">
          <span className="material-symbols-outlined text-[20px]">code</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Algorithmic Clarity</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Every heuristic routine, regular expression, and unicode code-point filter is cleanly structured and publicly verifiable.
                    </p>
          </div>
          </div>
          </section>
          {/*  6. Founder & Leadership Profile  */}
          <section className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center gap-space-lg">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-lg text-headline-lg shrink-0 select-none shadow-md">
                  II
                </div>
          <div className="flex flex-col gap-space-xs flex-1 text-left">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div>
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Inam Ilyas</h3>
          <p className="font-label-md text-label-md text-primary font-mono">Founder &amp; Lead Engineer</p>
          </div>
          <div className="flex items-center gap-space-xs">
          <a className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-code-stat text-code-stat flex items-center gap-1 transition-colors" href="https://github.com/inaamilyas" target="_blank" rel="noreferrer"><span className="">GitHub</span></a>
          <a className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-code-stat text-code-stat flex items-center gap-1 transition-colors" href="https://www.linkedin.com/in/inam-ilyas/" target="_blank" rel="noreferrer"><span className="">LinkedIn</span></a>
          <a className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-code-stat text-code-stat flex items-center gap-1 transition-colors" href="https://x.com/inaamilyas" target="_blank" rel="noreferrer"><span className="">X.com</span></a>
          </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-space-xs">
                    Full-stack engineer and open-source advocate specializing in browser sandboxing, text heuristics, and client-side performance engineering.
                  </p>
          <div className="p-space-sm rounded-lg bg-surface-container-low border-l-2 border-primary mt-space-xs">
          <p className="font-body-sm text-body-sm text-on-surface italic">
                      &ldquo;Software should respect user sovereignty. In an era where web apps continually upload personal data to the cloud, building high-utility tools that execute 100% locally is our ongoing commitment to digital privacy.&rdquo;
                    </p>
          </div>
          </div>
          </section>
          {/*  7. Project Milestones & Journey  */}
          <section className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-space-xs">
          <div className="font-code-stat text-code-stat text-primary uppercase tracking-wider">Historical Progress</div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Project Milestones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <span className="font-code-stat text-code-stat text-primary font-bold">2024</span>
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">The Foundations</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Initial release of the Zero-Width Space Remover and Invisible Character Sanitizer for clean copy-paste into corporate CMS setups.
                    </p>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
          <span className="font-code-stat text-code-stat text-primary font-bold">2025</span>
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Multi-Model Expansion</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Added support for Claude Code terminals, ChatGPT Markdown cleaner presets, and local PDF metadata stripping routines.
                    </p>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-secondary-container/20">
          <span className="font-code-stat text-code-stat text-primary font-bold">2026 // CURRENT</span>
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">v2.6 Release</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Delivers Image EXIF/C2PA stripping, deterministic AI Humanizer heuristics, and real-time Flesch-Kincaid readability scoring.
                    </p>
          </div>
          </div>
          </section>
          {/*  8. Global Impact Metrics  */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-space-xs">
          <span className="font-headline-lg text-display-lg text-primary font-bold">500k+</span>
          <span className="font-label-md text-label-md text-on-surface-variant">Words Sanitized Daily</span>
          </div>
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-space-xs">
          <span className="font-headline-lg text-display-lg text-primary font-bold">0 Bytes</span>
          <span className="font-label-md text-label-md text-on-surface-variant">Server Storage Logged</span>
          </div>
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-space-xs">
          <span className="font-headline-lg text-display-lg text-primary font-bold">11</span>
          <span className="font-label-md text-label-md text-on-surface-variant">Languages Supported</span>
          </div>
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-space-xs">
          <span className="font-headline-lg text-display-lg text-primary font-bold">100%</span>
          <span className="font-label-md text-label-md text-on-surface-variant">Client Transparency</span>
          </div>
          </section>
          {/*  9. High-Conversion CTA Banner  */}
          <section className="p-space-xl rounded-xl bg-primary text-on-primary shadow-md flex flex-col items-center text-center gap-space-md">
          <div className="flex flex-col items-center gap-space-xs max-w-xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-container text-on-primary font-code-stat text-code-stat uppercase">
          <span className="material-symbols-outlined text-[14px]">bolt</span>
          <span className="">Zero Configuration Needed</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-bold">Try AI Text Cleaner Now</h2>
          <p className="font-body-md text-body-md text-on-primary-container">
                    Sanitize copy from ChatGPT, Claude, and Gemini in one click. Free forever, with no registration or credit card required.
                  </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-sm">
          <Link href="/" className="px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined text-[18px]">auto_fix</span>
          <span className="">Open Tool Editor</span>
          </Link>
          <Link href="/#all-tools" className="px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container/80 transition-colors">
                    Explore All Tools
                  </Link>
          </div>
          </section>
        </div>
      </div>
    </>
  );
}
