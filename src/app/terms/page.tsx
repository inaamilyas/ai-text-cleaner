"use client";

import { useState } from "react";
import Link from "next/link";

export default function TermsPage() {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("inaamilyas656@gmail.com");
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2200);
    setTimeout(() => setShowToast(false), 2500);
  };

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service | AI Text Cleaner",
    "url": "https://www.text-cleaner-ai.com/terms",
    "description": "User agreement, acceptable use terms, and commercial rights for AI Text Cleaner.",
    "publisher": {
      "@type": "Organization",
      "name": "AI Text Cleaner",
      "url": "https://www.text-cleaner-ai.com",
    },
  };

  return (
    <div className="w-full bg-background flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />

      {/* Interactive Feedback Toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out flex items-center gap-space-sm px-4 py-3 bg-inverse-surface text-inverse-on-surface rounded-lg shadow-xl ${
          showToast
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
        id="copy-toast"
      >
        <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
        <span className="font-label-md text-label-md">Legal address copied to clipboard</span>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-space-lg">
        <div className="flex flex-col w-full gap-space-xl">
          {/* 1. Hero Header Section */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs font-code-stat text-code-stat uppercase text-primary font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
              <span>LEGAL // USER AGREEMENT &amp; ACCEPTABLE USE TERMS</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold">
              Terms of Service
            </h1>

            {/* Metadata Badges Row */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <div className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                <span>Last updated: August 29, 2026</span>
              </div>
              <div className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                <span>100% Client-Side Processing</span>
              </div>
              <div className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                <span>Commercial Use Permitted</span>
              </div>
              <div className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-outline">terminal</span>
                <span>No Account Required</span>
              </div>
            </div>

            {/* Intro Callout Banner */}
            <div className="mt-space-sm p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-md">
              <div className="p-2 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  By using <span className="font-semibold text-primary">AI Text Cleaner</span>, you agree to the terms below. If you do not agree, please do not use the service. All tools operate fully inside your browser engine with absolute privacy.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Core Highlights / Key Principles Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Card 1 */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">laptop_chromebook</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Free &amp; Local Execution</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  AI Text Cleaner is a free, browser-based utility. All text processing and sanitization happen 100% locally in your web browser memory without account signups.
                </p>
              </div>
              <div className="pt-space-xs">
                <span className="font-code-stat text-code-stat uppercase px-2.5 py-1 rounded bg-surface-container-high text-primary font-semibold">
                  Zero Server Uploads
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Commercial Use Allowed</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  You may use AI Text Cleaner for any lawful purpose, including commercial use of the cleaned output. You retain complete, unrestricted ownership of your content.
                </p>
              </div>
              <div className="pt-space-xs">
                <span className="font-code-stat text-code-stat uppercase px-2.5 py-1 rounded bg-surface-container-high text-emerald-700 font-semibold">
                  Full Output Freedom
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[22px]">gavel</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Plain &amp; Transparent Terms</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Clear acceptable use boundaries prohibiting bot spam, code extraction, and resale, with standard as-is disclaimers formulated for simple reading.
                </p>
              </div>
              <div className="pt-space-xs">
                <span className="font-code-stat text-code-stat uppercase px-2.5 py-1 rounded bg-surface-container-high text-outline font-semibold">
                  Standard Legal Framework
                </span>
              </div>
            </div>
          </section>

          {/* 3. Full Legal Documentation Articles */}
          <div className="flex flex-col gap-space-lg">
            {/* Section 1 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-1">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">1. Description of the service</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">BROWSER UTILITY</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                AI Text Cleaner is a free, browser-based tool that removes invisible characters, formatting artifacts, markdown cruft, and other text quirks from pasted content. All processing happens locally in your browser; no account is required.
              </p>
              <div className="flex flex-wrap gap-space-xs pt-space-xs">
                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant">Zero-Width Removal</span>
                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant">Markdown Sanitization</span>
                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant">Invisible Unicode Purge</span>
                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant">No Registration</span>
              </div>
            </article>

            {/* Section 2 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-2">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">2. Use of the service</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">PERMITTED USAGE</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                You may use AI Text Cleaner for any lawful purpose, including commercial use of the cleaned output. You are solely responsible for the content you paste into and process with the tool, and for how you use the cleaned output.
              </p>
              <div className="p-space-md rounded-lg bg-surface-container-low text-on-surface flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">assignment_turned_in</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  You maintain full responsibility for verifying output accuracy prior to deployment in production code, legal filings, or sensitive editorial publications.
                </p>
              </div>
            </article>

            {/* Section 3 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-3">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">3. Acceptable use</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-error font-semibold">PROHIBITED ACTIVITIES</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                You agree not to misuse the interface or bypass system operational intents. Specifically, you agree not to use AI Text Cleaner to:
              </p>
              <div className="grid grid-cols-1 gap-2 pt-space-xs">
                <div className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px] text-error">block</span>
                  <span className="font-body-md text-body-md text-on-surface">Engage in illegal activity or process unlawful materials.</span>
                </div>
                <div className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px] text-error">block</span>
                  <span className="font-body-md text-body-md text-on-surface">Attack, overload, or disrupt the infrastructure that runs and serves the web application.</span>
                </div>
                <div className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px] text-error">block</span>
                  <span className="font-body-md text-body-md text-on-surface">Send automated or bot traffic at a volume that is unreasonable for normal client browsing.</span>
                </div>
                <div className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px] text-error">block</span>
                  <span className="font-body-md text-body-md text-on-surface">Attempt to extract, reverse engineer, or copy the underlying proprietary source algorithms without permission.</span>
                </div>
                <div className="flex items-center gap-space-sm p-3 rounded-lg bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px] text-error">block</span>
                  <span className="font-body-md text-body-md text-on-surface">Repackage, resell, or offer the service itself as your own commercial utility.</span>
                </div>
              </div>
            </article>

            {/* Section 4 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-4">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">4. Your text and content</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">CLIENT-SIDE PRIVACY</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                The text you paste into AI Text Cleaner stays on your device and is never uploaded to a server. We make no ownership claim over your content, and cleaning it does not transfer any rights to us. You are responsible for reviewing the cleaned output before relying on it.
              </p>
              {/* Memory Isolation Diagram */}
              <div className="p-space-md rounded-xl bg-surface-container-high flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-code-stat text-code-stat text-outline uppercase font-semibold">Data Lifecycle &amp; Network Quarantine</span>
                  <span className="font-code-stat text-code-stat text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> 0 BYTES TRANSMITTED
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center font-code-stat text-code-stat pt-1">
                  <div className="p-3 bg-surface-container-lowest rounded-lg shadow-sm flex flex-col items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[18px] text-primary">content_paste</span>
                    <span className="font-semibold text-on-surface">1. User Clipboard</span>
                    <span className="text-[10px] text-on-surface-variant">Local Memory State</span>
                  </div>
                  <div className="p-3 bg-primary-fixed rounded-lg shadow-sm flex flex-col items-center justify-center gap-1 text-on-primary-fixed">
                    <span className="material-symbols-outlined text-[18px]">memory</span>
                    <span className="font-semibold">2. V8 Web Engine</span>
                    <span className="text-[10px] opacity-80">Regex String Processing</span>
                  </div>
                  <div className="p-3 bg-surface-container-lowest rounded-lg shadow-sm flex flex-col items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">output</span>
                    <span className="font-semibold text-on-surface">3. Output Viewport</span>
                    <span className="text-[10px] text-on-surface-variant">Cleaned Text Diff</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 5 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-5">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">5. No warranty</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-outline font-semibold">DISCLAIMER</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                AI Text Cleaner is provided <span className="font-semibold text-on-surface">&quot;as is&quot;</span> and <span className="font-semibold text-on-surface">&quot;as available,&quot;</span> without warranties of any kind, express or implied. We do not guarantee that the service will be error-free, uninterrupted, or fit for any particular purpose.
              </p>
            </article>

            {/* Section 6 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-6">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">6. Limitation of liability</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-outline font-semibold">LIABILITY EXCLUSION</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                To the fullest extent permitted by law, AI Text Cleaner and its operator are not liable for any direct, indirect, incidental, special, consequential, or punitive damages or losses arising from your use of, or inability to use, the service or any cleaned text generated through the application.
              </p>
            </article>

            {/* Section 7 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-7">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">7. Intellectual property</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-outline font-semibold">OWNERSHIP</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                The AI Text Cleaner name, trademarks, graphic interface design, logos, and underlying source code belong exclusively to their respective owners. Content submitted by users remains strictly the intellectual property of the respective submitters.
              </p>
            </article>

            {/* Section 8 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-8">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">8. Changes to the service and these terms</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">POLICY REVISIONS</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                We may modify, upgrade, or discontinue the service, or revise these terms at any time. Continued use of the service following the posting of updated terms constitutes acceptance of those revisions.
              </p>
            </article>

            {/* Section 9 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-9">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">9. Governing law</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-outline font-semibold">JURISDICTION</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                These terms are governed by the laws applicable in the jurisdiction where the service operator is based, without regard to conflict of law principles.
              </p>
            </article>

            {/* Section 10 */}
            <article className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md scroll-mt-24" id="section-10">
              <div className="flex items-center justify-between gap-space-sm flex-wrap">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">10. Contact us</h2>
                <span className="font-code-stat text-code-stat uppercase px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">LEGAL INQUIRIES</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Questions regarding these Terms of Service or commercial permissions can be sent directly to our legal contact desk:
              </p>
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <div className="flex items-center gap-space-xs px-3 py-2 rounded-lg bg-surface-container font-body-md text-body-md text-on-surface select-all">
                  <span className="material-symbols-outlined text-[16px] text-outline">mail</span>
                  <span id="contact-email">inaamilyas656@gmail.com</span>
                </div>
                <button
                  type="button"
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-space-xs px-3 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">{copied ? "check" : "content_copy"}</span>
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-space-xs px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
                >
                  <span>Contact Support Team</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </article>
          </div>

          {/* 4. Interactive Tools Showcase Section (Ecosystem Suite) */}
          <section className="mt-space-xl pt-space-xl flex flex-col gap-space-lg">
            <div className="flex items-center justify-between gap-space-sm flex-wrap">
              <div className="flex flex-col gap-1">
                <div className="font-code-stat text-code-stat uppercase text-primary font-semibold tracking-wider">ECOSYSTEM SUITE // ALL IN-BROWSER CLIENT TOOLS</div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">Instant In-Memory Sanitization Tools</h2>
              </div>
              <Link
                href="/#tools-suite-showcase"
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary hover:underline"
              >
                <span>Explore All 20+ Utilities</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>

            {/* Row 1: AI Platform Cleaners */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs font-label-md text-label-md uppercase text-on-surface-variant font-semibold tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">psychology</span>
                <span>Row 1: AI Platform Cleaners</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-space-sm">
                <Link
                  href="/clean-chatgpt-text"
                  className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">smart_toy</span>
                    <span className="font-code-stat text-code-stat px-1.5 py-0.5 rounded bg-surface-container text-outline">GPT-4o</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Clean ChatGPT</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Strips markdown headings &amp; AI prose tags</span>
                </Link>
                <Link
                  href="/clean-claude-text"
                  className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">neurology</span>
                    <span className="font-code-stat text-code-stat px-1.5 py-0.5 rounded bg-surface-container text-outline">Sonnet</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Clean Claude Text</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Removes XML wrappers &amp; thinking tags</span>
                </Link>
                <Link
                  href="/clean-claude-code"
                  className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">terminal</span>
                    <span className="font-code-stat text-code-stat px-1.5 py-0.5 rounded bg-surface-container text-outline">CLI</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Claude Code Output</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Purges ANSI color codes &amp; prompt lines</span>
                </Link>
                <Link
                  href="/clean-gemini-text"
                  className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">cognition</span>
                    <span className="font-code-stat text-code-stat px-1.5 py-0.5 rounded bg-surface-container text-outline">Pro 1.5</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Google Gemini</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Cleans conversational fillers</span>
                </Link>
                <Link
                  href="/clean-copilot-text"
                  className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">support_agent</span>
                    <span className="font-code-stat text-code-stat px-1.5 py-0.5 rounded bg-surface-container text-outline">Office</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Clean Copilot</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Extracts inline notes &amp; source citations</span>
                </Link>
              </div>
            </div>

            {/* Row 2: Text Utilities */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs font-label-md text-label-md uppercase text-on-surface-variant font-semibold tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">fact_check</span>
                <span>Row 2: Formatting &amp; Text Utilities</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
                <Link
                  href="/remove-ai-words"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">format_strikethrough</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Remove Buzzwords</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Delve, tapestry, seamlessly</span>
                  </div>
                </Link>
                <Link
                  href="/remove-zero-width-space"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">space_bar</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Zero-Width Remover</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Strips U+200B, U+FEFF, U+200D</span>
                  </div>
                </Link>
                <Link
                  href="/remove-invisible-characters"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Invisible Characters</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Purges rogue unicode tags</span>
                  </div>
                </Link>
                <Link
                  href="/markdown-to-plain-text"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">text_format</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Markdown to Plain Text</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Converts AST nodes to clean lines</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Row 3: Security Cleaners & Analyzers */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs font-label-md text-label-md uppercase text-on-surface-variant font-semibold tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                <span>Row 3: Security Sanitizers &amp; Document Analyzers</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
                <Link
                  href="/clean-unicode-homoglyphs"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[20px]">spellcheck</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Homoglyph Cleaner</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Detects spoofed lookalikes</span>
                  </div>
                </Link>
                <Link
                  href="/clean-pdf-metadata"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">PDF Sanitizer</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Strips author tags &amp; AI origins</span>
                  </div>
                </Link>
                <Link
                  href="/remove-zero-width-space"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[20px]">filter_vintage</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">AI Watermark Remover</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Zero frequency synthetic artifacts</span>
                  </div>
                </Link>
                <Link
                  href="/check-readability-score"
                  className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm group"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[20px]">analytics</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Readability Checker</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Flesch-Kincaid &amp; Gunning Fog</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* AUTHOR SIGNATURE MICRO-BAR */}
      <div className="w-full bg-surface-container py-space-sm">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between text-on-surface-variant font-code-stat text-code-stat">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>Engineered by Inam Ilyas</span>
          </div>
          <a
            className="hover:text-on-surface transition-colors flex items-center gap-1"
            href="https://github.com/inaamilyas/ai-text-cleaner"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>GitHub Repository</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}
