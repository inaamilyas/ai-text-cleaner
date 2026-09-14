"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrivacyPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("inaamilyas656@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | Text Cleaner AI",
    "url": "https://www.text-cleaner-ai.com/privacy",
    "description": "Privacy policy and client-side data isolation architecture for Text Cleaner AI.",
    "publisher": {
      "@type": "Organization",
      "name": "Text Cleaner AI",
      "url": "https://www.text-cleaner-ai.com",
    },
  };

  return (
    <div className="w-full bg-background flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <div className="container mx-auto px-4 md:px-8 py-space-lg">
        <div className="flex flex-col w-full">
          {/* Privacy Hero Section */}
          <section className="w-full pb-space-lg">
            <div className="w-full mx-auto">
              <div className="flex flex-col gap-space-xs">
                <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold">
                  Privacy Policy
                </h1>
                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-space-xs">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-high text-on-surface-variant font-code-stat text-code-stat shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-outline">schedule</span>
                    <span>Last updated: September 5, 2026</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container text-primary font-code-stat text-code-stat">
                    <span className="material-symbols-outlined text-[14px]">memory</span>
                    <span>100% In-Browser Memory</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container text-tertiary font-code-stat text-code-stat">
                    <span className="material-symbols-outlined text-[14px]">cloud_off</span>
                    <span>Zero Server Storage</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant font-code-stat text-code-stat">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span>
                    <span>AdSense &amp; Cookie Compliant</span>
                  </div>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-4xl pt-space-xs leading-relaxed">
                  Text Cleaner AI is committed to protecting your privacy. This Privacy Policy explains our data practices, local browser-based execution model, and disclosures regarding third-party advertising partners like Google AdSense.
                </p>
              </div>
            </div>
          </section>

          {/* Summary Guarantee Cards (3-column grid) */}
          <section className="w-full pb-space-xl">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* Card 1 */}
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">laptop_chromebook</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">100% Client-Side Execution</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    No text ever leaves your machine. Processing runs strictly in your local V8/JavaScript engine or WebAssembly heap, completely air-gapped from cloud APIs.
                  </p>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center gap-2 text-primary font-code-stat text-code-stat">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span>Zero transmission latency</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[22px]">folder_delete</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Zero Payload Logs</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Our origin servers never receive, parse, log, or persist input buffers, transformed outputs, or document payloads. What you clean remains solely in ephemeral RAM.
                  </p>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center gap-2 text-tertiary font-code-stat text-code-stat">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>No database, No raw telemetry</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">policy</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Transparent Disclosures</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Clear opt-out channels and third-party monetization terms are fully specified. We maintain an ethical boundary between functional tooling and general site analytics.
                  </p>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center gap-2 text-secondary font-code-stat text-code-stat">
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>Standard AdSense &amp; NAI guidelines</span>
                </div>
              </div>
            </div>
          </section>

          {/* Core Articles */}
          <section className="w-full pb-space-xl">
            <div className="max-w-[1440px] mx-auto gap-space-xl">
              <div className="flex flex-col gap-space-xl w-full">
                {/* Article 1 */}
                <article className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-lowest shadow-sm" id="article-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">1. Zero Server Text Processing</h2>
                    <span className="font-code-stat text-code-stat px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant">SANDBOXED V8</span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    We do not collect, upload, transmit, or store the text you paste into Text Cleaner AI. All text sanitization, zero-width space removal, and formatting normalization run 100% locally inside your web browser using client-side JavaScript. Your text never leaves your device.
                  </p>
                  {/* Technical Isolation Terminal Terminal / Callout */}
                  <div className="rounded-xl bg-inverse-surface text-inverse-on-surface p-space-md font-body-sm text-body-sm flex flex-col gap-space-xs shadow-md">
                    <div className="flex items-center justify-between pb-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        <span className="font-code-stat text-code-stat text-outline-variant pl-2">Client-Side Isolation Terminal // Verified Local Sandbox</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-code-stat text-primary-fixed px-1.5 py-0.5 rounded bg-surface-variant/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping" /> SECURE
                      </span>
                    </div>
                    <div className="font-code-stat text-code-stat space-y-1 text-surface-container-high">
                      <div className="flex items-center justify-between">
                        <span className="text-outline-variant">&gt; Execution target:</span>
                        <span className="text-primary-fixed font-medium">window.crypto &amp; in-memory ArrayBuffer</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-outline-variant">&gt; Outbound POST/Fetch payloads:</span>
                        <span className="text-primary-fixed font-medium">0 bytes (Blocked by Origin Policy)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-outline-variant">&gt; Network status:</span>
                        <span className="text-primary-fixed font-medium">Air-gapped clipboard manipulation</span>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Article 2 */}
                <article className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-lowest shadow-sm" id="article-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">2. Cookies and Advertising Disclosures</h2>
                    <span className="font-code-stat text-code-stat px-2 py-0.5 rounded bg-surface-container-high text-secondary">ADSENSE COMPLIANCE</span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Text Cleaner AI may display advertisements provided by Google AdSense and third-party advertising vendors to keep our utility tools free. The disclosures below apply whenever such advertising is active on the site.
                  </p>
                  <ul className="space-y-space-sm pl-2">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites on the Internet.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Users may opt out of personalized advertising by visiting Google Ads Settings or www.aboutads.info.</span>
                    </li>
                  </ul>
                  {/* Opt-out Links */}
                  <div className="pt-space-xs flex flex-wrap items-center gap-space-sm">
                    <a
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
                      href="https://adssettings.google.com"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">open_in_new</span>
                      <span>Google Ads Settings</span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
                      href="https://www.aboutads.info/choices/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">link</span>
                      <span>www.aboutads.info Choice Tool</span>
                    </a>
                  </div>
                </article>

                {/* Article 3 */}
                <article className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-lowest shadow-sm" id="article-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">3. Web Analytics</h2>
                    <span className="font-code-stat text-code-stat px-2 py-0.5 rounded bg-surface-container text-tertiary">AGGREGATE TELEMETRY</span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    We use Google Analytics to understand aggregate traffic patterns, such as which pages are visited and how long visitors stay. Google Analytics uses cookies and collects information such as your approximate location, browser type, device type, and referring pages. This data is used only to improve the site and is not linked to the text you clean, which is never transmitted anywhere. You can opt out of Google Analytics tracking using the Google Analytics Opt-out Browser Add-on.
                  </p>
                  <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px]">privacy_tip</span>
                    <div className="flex flex-col gap-1">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Clear Boundary Guarantee</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Analytics cookies NEVER inspect, log, or transmit clipboard text, paste buffers, or textarea contents under any circumstance.</span>
                    </div>
                  </div>
                </article>

                {/* Article 4 */}
                <article className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-lowest shadow-sm" id="article-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">4. Data Security</h2>
                    <span className="font-code-stat text-code-stat px-2 py-0.5 rounded bg-secondary-container text-secondary">AIR-GAPPED SECURITY</span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Because text processing is performed entirely within your browser memory, your confidential documents, code snippets, or personal text pastes are never exposed to cloud databases, third-party APIs, or external storage. When you close the browser tab, all runtime state is destroyed by your operating system&apos;s memory management.
                  </p>
                </article>

                {/* Article 5 */}
                <article className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-lowest shadow-sm" id="article-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">5. Contact &amp; Privacy Inquiries</h2>
                    <span className="font-code-stat text-code-stat px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">DIRECT INQUIRIES</span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    If you have questions regarding this Privacy Policy, our in-browser execution model, or advertising disclosures, please reach out directly:
                  </p>
                  <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-label-md shadow-sm cursor-pointer"
                      id="copy-email-btn"
                    >
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      <span id="copy-text-label">{copied ? "Copied to clipboard!" : "inaamilyas656@gmail.com"}</span>
                      <span className="material-symbols-outlined text-[14px]">{copied ? "check" : "content_copy"}</span>
                    </button>
                    <a
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
                      href="mailto:inaamilyas656@gmail.com?subject=[AI%20Text%20Cleaner]%20Privacy%20Inquiry"
                    >
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      <span>Contact Support Team</span>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* 3-Row Interactive Tools Showcase Section */}
          <section className="w-full pb-space-xl">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg">
              <div className="flex flex-col gap-1">
                <span className="font-code-stat text-code-stat text-primary uppercase tracking-wider">ECOSYSTEM SUITE</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">All In-Browser Client Tools</h2>
              </div>

              {/* Row 1: AI Platform Cleaners */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-2 font-code-stat text-code-stat text-outline uppercase">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                  <span>Row 1 // AI Platform Cleaners</span>
                </div>
                <div className="flex overflow-x-auto pb-2 gap-space-md no-scrollbar">
                  <Link
                    href="/clean-chatgpt-text"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-primary">CHATGPT</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Clean ChatGPT Text</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Removes robotic introductions, concluding disclaimers, and boilerplate markdown.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Local Regex Pipeline</span>
                  </Link>
                  <Link
                    href="/clean-claude-text"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-primary">CLAUDE</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Clean Claude Text</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Eliminates conversational framing, excessive hedges, and synthetic formatting.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Local Regex Pipeline</span>
                  </Link>
                  <Link
                    href="/clean-claude-code"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-primary">CLAUDE CODE</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Claude Code Output</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Purges CLI output logs, escape codes, and backtick code wrappers automatically.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">CLI Strip Engine</span>
                  </Link>
                  <Link
                    href="/clean-gemini-text"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-primary">GEMINI</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Clean Google Gemini</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Normalizes bold lists, redundant search tags, and synthetic preamble text.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Local Regex Pipeline</span>
                  </Link>
                  <Link
                    href="/clean-copilot-text"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-primary">COPILOT</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Clean Copilot Text</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Strips citation superscripts, footnote links, and conversational sign-offs.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Local Regex Pipeline</span>
                  </Link>
                </div>
              </div>

              {/* Row 2: Text Utilities */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-2 font-code-stat text-code-stat text-outline uppercase">
                  <span className="material-symbols-outlined text-[16px]">spellcheck</span>
                  <span>Row 2 // Text Utilities</span>
                </div>
                <div className="flex overflow-x-auto pb-2 gap-space-md no-scrollbar">
                  <Link
                    href="/remove-ai-words"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-tertiary">BUZZWORDS</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Remove AI Buzzwords</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Replaces &quot;delve&quot;, &quot;tapestry&quot;, &quot;crucial&quot;, and overused algorithmic synonyms.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Lexicon Dictionary</span>
                  </Link>
                  <Link
                    href="/remove-zero-width-space"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-tertiary">SPACES</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Zero-Width Remover</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Eliminates invisible \u200B, \uFEFF, and zero-width non-joiners instantly.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">UTF-16 Sanitizer</span>
                  </Link>
                  <Link
                    href="/visualize-invisible-characters"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-tertiary">VISUALIZE</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Invisible Visualizer</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Highlights invisible Unicode characters with interactive color tags.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Inspector Canvas</span>
                  </Link>
                  <Link
                    href="/markdown-to-plain-text"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-tertiary">MARKDOWN</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Markdown to Plain</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Converts markdown syntax to clean, unformatted plain copy for pasting.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Parser Pipeline</span>
                  </Link>
                  <Link
                    href="/smart-quotes-to-straight-quotes"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-tertiary">TYPOGRAPHY</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Smart Quotes Fixer</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Converts curly quotation marks and em-dashes into standard ASCII characters.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">ASCII Mapper</span>
                  </Link>
                </div>
              </div>

              {/* Row 3: Security & Detection Cleaners */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-2 font-code-stat text-code-stat text-outline uppercase">
                  <span className="material-symbols-outlined text-[16px]">security</span>
                  <span>Row 3 // Security Cleaners &amp; Analyzers</span>
                </div>
                <div className="flex overflow-x-auto pb-2 gap-space-md no-scrollbar">
                  <Link
                    href="/clean-unicode-homoglyphs"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-secondary">HOMOGLYPHS</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Unicode Homoglyphs</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Detects and neutralizes mixed-script Cyrillic or Greek spoofing characters.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">ICU Normalizer</span>
                  </Link>
                  <Link
                    href="/clean-pdf-metadata"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-secondary">METADATA</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">PDF Metadata Sanitizer</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Strips author tags, generation fingerprints, and creation dates locally.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Client Binary Engine</span>
                  </Link>
                  <Link
                    href="/remove-zero-width-space"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-secondary">WATERMARKS</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">AI Watermark Remover</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Neutralizes statistical token-pairing watermarks and hidden markers.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Frequency Engine</span>
                  </Link>
                  <Link
                    href="/check-readability-score"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-secondary">READABILITY</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">Readability &amp; Grade</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Calculates Flesch-Kincaid and Gunning fog indexes in real-time memory.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Formula Engine</span>
                  </Link>
                  <Link
                    href="/humanize-ai-text"
                    className="min-w-[280px] p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all border border-transparent"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-code-stat text-code-stat text-secondary">HUMANIZE</span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">AI Text Humanizer</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Varies sentence cadence and burstiness to mirror organic human prose.</p>
                    </div>
                    <span className="font-code-stat text-code-stat text-outline mt-3">Cadence Shifter</span>
                  </Link>
                </div>
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
