import type { Metadata } from "next";
import Link from "next/link";
import PdfMetadataSanitizer from "@/components/PdfMetadataSanitizer";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "Clean PDF Metadata & Author Info — Strip EXIF & XMP Streams",
  description:
    "Strip hidden author tags, creation timestamps, title, producer, and software metadata from PDF binary streams directly in your browser memory before distribution.",
  keywords: [
    "clean pdf metadata",
    "remove author from pdf",
    "strip pdf creator tags",
    "pdf metadata remover online",
    "delete hidden pdf exif",
    "remove xmp from pdf",
    "pdf author info cleaner",
  ],
  alternates: {
    canonical: "/clean-pdf-metadata",
  },
  openGraph: {
    title: "Clean PDF Metadata & Author Info — Strip EXIF & XMP Streams",
    description:
      "Wipe hidden PDF metadata, author names, creation dates, and producer tags 100% in your browser memory.",
    url: `${siteUrl}/clean-pdf-metadata`,
  },
};

const suiteTools = [
  {
    href: "/ai-text-detector",
    title: "AI Text Detector",
    desc: "Detect artificial cadence, token bursts, and perplexity patterns.",
    icon: "troubleshoot",
  },
  {
    href: "/remove-ai-words",
    title: "Remove AI Buzzwords",
    desc: "Eliminate clichés like \"delve\", \"testament\", and \"tapestry\".",
    icon: "speaker_notes_off",
  },
  {
    href: "/strip-ai-prompts",
    title: "Strip AI Prompts",
    desc: "Wipe system preamble, \"Certainly, here is...\", and role markers.",
    icon: "terminal",
  },
  {
    href: "/visualize-invisible-characters",
    title: "Invisible Visualizer",
    desc: "Reveal zero-width spaces, joiners, and soft hyphens visually.",
    icon: "visibility",
  },
  {
    href: "/check-readability-score",
    title: "Readability Score",
    desc: "Evaluate Flesch-Kincaid grade levels and sentence variance in realtime.",
    icon: "speed",
  },
  {
    href: "/case-converter",
    title: "Case Converter",
    desc: "Switch instantly between snake_case, camelCase, Title Case and UPPER.",
    icon: "title",
  },
  {
    href: "/clean-pdf-metadata",
    title: "PDF Metadata Cleaner",
    desc: "Neutralize hidden author tags, software footprints, and time headers.",
    icon: "picture_as_pdf",
    active: true,
  },
  {
    href: "/clean-unicode-homoglyphs",
    title: "Homoglyph Sanitizer",
    desc: "Convert Cyrillic and Greek look-alike unicode letters into pure Latin.",
    icon: "translate",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Clean PDF Metadata & Author Info",
  url: `${siteUrl}/clean-pdf-metadata`,
  description:
    "Free online utility to strip author tags, creation dates, and producer metadata from PDF files.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I clean PDF metadata before sharing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PDF files silently store author names, company affiliations, computer usernames, software version fingerprints, and exact edit timestamps. When sharing documents with clients, competitors, or public repositories, this hidden metadata can disclose sensitive business intelligence or compromise personal privacy.",
      },
    },
    {
      "@type": "Question",
      name: "Are my PDF files uploaded to a remote server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No! Processing is 100% client-side. The file is read via JavaScript ArrayBuffer into local browser heap memory. PDF parsing, metadata neutralizations, and blob reconstructions happen exclusively on your CPU without any network transport.",
      },
    },
    {
      "@type": "Question",
      name: "Will sanitizing metadata alter the visible text or layout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Our sanitizer only targets the PDF /Info object dictionary and unlinked XMP metadata streams. The visual page content stream, embedded typography, vector graphics, and image rasters remain completely untouched.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit on PDF file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because processing uses your computer's local memory rather than congested cloud queues, our tool easily handles documents up to 100MB instantly without rate limits or timeouts.",
      },
    },
  ],
};

export default function CleanPdfMetadataPage() {
  return (
    <div className="flex flex-col w-full">
      <span className="sr-only">
        Clean PDF Metadata &amp; Author Info | AI Text Cleaner
      </span>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* WORKSTATION (HERO + DUAL INGESTION/INSPECTOR) */}
      <PdfMetadataSanitizer />

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-4 md:px-8 py-space-xl flex flex-col gap-space-xl">
        {/* Technical Primer / Explanatory Section */}
        <section className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg shadow-sm">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-primary">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
              <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                Binary Architecture Primer
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Why Clean Hidden PDF Metadata &amp; How Does It Work?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              When you export a document to PDF, your office suite silently embeds metadata dictionary headers containing your legal name, workstation user account, software build numbers, and precise creation timestamps. Our PDF Metadata Sanitizer parses PDF binary streams directly in your browser memory, zeroing out the <code className="font-mono bg-surface-container px-1 py-0.5 rounded text-on-surface">/Info</code> dictionary pointers and truncating embedded XMP packets before any download occurs.
            </p>
          </div>

          {/* Telemetry Dashboard Pill Box */}
          <div className="grid grid-cols-2 gap-space-sm w-full lg:w-auto shrink-0 font-code-stat text-code-stat">
            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1">
              <span className="text-on-surface-variant">Pipeline State</span>
              <span className="text-primary font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> ACTIVE SANDBOX
              </span>
            </div>
            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1">
              <span className="text-on-surface-variant">Tag Precision</span>
              <span className="text-on-surface font-bold">100% BYTE MATCH</span>
            </div>
            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1">
              <span className="text-on-surface-variant">Visual Layout Loss</span>
              <span className="text-on-surface font-bold">0.00% (ZERO LOSS)</span>
            </div>
            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1">
              <span className="text-on-surface-variant">Server Payload Leak</span>
              <span className="text-primary font-bold">0 BYTES TRANSMITTED</span>
            </div>
          </div>
        </section>

        {/* Before & After Diff Inspection Card */}
        <section className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-primary font-code-stat text-code-stat">
              <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
              <span>OBJECT STREAM COMPARATOR</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              See the Difference Before &amp; After Cleaning
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Hidden metadata dictionary attributes expose author identification, client organizations, and local compilation paths. Here is how clean PDF stream objects compare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Before Panel */}
            <div className="flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-error text-[18px]">warning</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    BEFORE: Raw PDF Header Stream
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-code-stat text-code-stat">
                  3 Sensitive Leaks
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low font-mono text-body-sm text-on-surface-variant flex flex-col gap-2 overflow-x-auto">
                <div className="text-on-surface-variant">3 0 obj &lt;&lt;</div>
                <div className="pl-4 bg-error-container/50 text-on-error-container px-1 rounded">
                  /Author (John Smith)
                </div>
                <div className="pl-4 bg-error-container/50 text-on-error-container px-1 rounded">
                  /Creator (Microsoft Word 2024 Build 16.89)
                </div>
                <div className="pl-4 bg-error-container/50 text-on-error-container px-1 rounded">
                  /CreationDate (D:20260910024500Z)
                </div>
                <div className="pl-4 text-on-surface-variant">/Producer (Quartz PDFContext)</div>
                <div className="text-on-surface-variant">&gt;&gt; endobj</div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                Software leaves traceable user profiles, enterprise tenant signatures, and hardware revision stamps inside the unencrypted outer dictionary envelope.
              </p>
            </div>

            {/* After Panel */}
            <div className="flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    AFTER: Sanitized PDF Stream
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-code-stat text-code-stat">
                  100% Sanitized
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low font-mono text-body-sm text-on-surface-variant flex flex-col gap-2 overflow-x-auto">
                <div className="text-on-surface-variant">3 0 obj &lt;&lt;</div>
                <div className="pl-4 bg-primary-fixed text-on-primary-fixed px-1 rounded">
                  /Author () [REMOVED]
                </div>
                <div className="pl-4 bg-primary-fixed text-on-primary-fixed px-1 rounded">
                  /Creator () [REMOVED]
                </div>
                <div className="pl-4 bg-primary-fixed text-on-primary-fixed px-1 rounded">
                  /CreationDate () [REMOVED]
                </div>
                <div className="pl-4 bg-primary-fixed text-on-primary-fixed px-1 rounded">
                  /Producer () [REMOVED]
                </div>
                <div className="text-on-surface-variant">&gt;&gt; endobj</div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                All descriptive keys are cleanly truncated, replaced with empty literal streams, and verified without breaking xref object offsets or page tree layouts.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Character & Feature Breakdown Table */}
        <section className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1">
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Technical Character &amp; Feature Breakdown
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our browser engine detects and neutralizes non-printable metadata streams, software fingerprints, and hardware revisions automatically.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container text-on-surface font-label-md text-label-md">
                    <th className="py-3 px-space-md font-semibold">Metadata Category</th>
                    <th className="py-3 px-space-md font-semibold font-mono">PDF Key Identifier</th>
                    <th className="py-3 px-space-md font-semibold">Privacy Risk &amp; Exposure</th>
                    <th className="py-3 px-space-md font-semibold text-right">Sanitization Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 text-on-surface-variant font-mono">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-space-md font-medium text-on-surface font-sans">
                      Author &amp; Owner Name
                    </td>
                    <td className="py-3 px-space-md text-primary font-bold">/Author Tag</td>
                    <td className="py-3 px-space-md font-sans">
                      Contains personal name, corporate directory handle, or OS login alias.
                    </td>
                    <td className="py-3 px-space-md text-right">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-stat text-code-stat">
                        NULL BYTE OVERWRITE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-space-md font-medium text-on-surface font-sans">
                      Creation &amp; Modification Date
                    </td>
                    <td className="py-3 px-space-md text-primary font-bold">/CreationDate /ModDate</td>
                    <td className="py-3 px-space-md font-sans">
                      Exposes exact timestamp down to the second, including local UTC timezone offset.
                    </td>
                    <td className="py-3 px-space-md text-right">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-stat text-code-stat">
                        DATE STREAM ERASED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-space-md font-medium text-on-surface font-sans">
                      Creator &amp; Producer Software
                    </td>
                    <td className="py-3 px-space-md text-primary font-bold">/Producer /Creator</td>
                    <td className="py-3 px-space-md font-sans">
                      Reveals specific host operating systems, PDF generators, and patch versions.
                    </td>
                    <td className="py-3 px-space-md text-right">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-stat text-code-stat">
                        SIGNATURE STRIPPED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-space-md font-medium text-on-surface font-sans">
                      Keywords &amp; Subject Metadata
                    </td>
                    <td className="py-3 px-space-md text-primary font-bold">/Keywords /Subject</td>
                    <td className="py-3 px-space-md font-sans">
                      Contains sensitive internal project tags, classification codes, or confidential drafts.
                    </td>
                    <td className="py-3 px-space-md text-right">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-stat text-code-stat">
                        ZERO DICTIONARY
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Deep In-Browser AI Analysis & Telemetry Terminal */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center p-space-lg rounded-2xl bg-surface-container shadow-sm">
          <div className="lg:col-span-6 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs text-primary">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
              <span className="font-label-md text-label-md font-semibold uppercase tracking-wider">
                Zero-Leak Philosophy
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Deep In-Browser AI Analysis
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Unlike cloud-based document cleaners that upload your PDFs to remote processing queues, our sanitizer initializes an isolated binary parser directly inside your browser’s V8 JavaScript engine. Your drafts, legal contracts, and financial spreadsheets remain strictly confidential, completely protected from external telemetry and accidental cloud retention.
            </p>
            <div className="flex flex-wrap gap-space-xs pt-space-xs">
              <span className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-code-stat text-code-stat flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">memory</span>
                <span>Local Heuristic Parsing</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-code-stat text-code-stat flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">security</span>
                <span>100% Private Client Memory</span>
              </span>
            </div>
          </div>

          {/* Terminal Graphic Mockup */}
          <div className="lg:col-span-6 flex flex-col rounded-xl bg-inverse-surface text-inverse-on-surface p-space-md font-mono text-body-sm shadow-md">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b-0 border-outline">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-secondary-fixed"></div>
                <div className="w-3 h-3 rounded-full bg-primary-fixed"></div>
                <span className="font-code-stat text-code-stat text-outline ml-2">
                  pdf_sanitizer_core::v2.6
                </span>
              </div>
              <span className="font-code-stat text-code-stat text-inverse-primary">RAM ISOLATED</span>
            </div>
            <div className="flex flex-col gap-1 text-surface-container-high leading-relaxed">
              <span className="text-tertiary-fixed font-semibold">// Instant local inspection</span>
              <span>&gt; Scanning byte ranges: 0x00000000 - 0x0016B840</span>
              <span>&gt; Evaluating cross-reference table (/XRef) ... OK</span>
              <span className="text-inverse-primary font-semibold">✓ 0 Invisible Characters</span>
              <span className="text-inverse-primary font-semibold">✓ 7 PDF Metadata Leaks Stripped</span>
              <span className="text-inverse-primary font-semibold">✓ 100% Visual Integrity Verified</span>
              <span className="text-on-secondary-fixed font-bold mt-1">
                &gt; Zero server logs. Zero cloud uploads.
              </span>
            </div>
          </div>
        </section>

        {/* All-In-One Text Sanitization Suite (8-tool ecosystem grid) */}
        <section className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1 text-center max-w-xl mx-auto">
            <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wider">
              Ecosystem Architecture
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              All-In-One Text Sanitization Suite
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Explore specialized client-side cleaners tuned for language model outputs and confidential publishing workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {suiteTools.map((tool) =>
              tool.active ? (
                <div
                  key={tool.href}
                  className="p-space-md rounded-xl bg-primary-fixed text-on-primary-fixed shadow-md flex flex-col gap-space-xs relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-primary text-[24px]">
                      {tool.icon}
                    </span>
                    <span className="font-code-stat text-code-stat bg-primary text-on-primary px-1.5 py-0.5 rounded">
                      ACTIVE TOOL
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm font-semibold">{tool.title}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{tool.desc}</span>
                </div>
              ) : (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-all shadow-sm flex flex-col gap-space-xs no-underline"
                >
                  <span className="material-symbols-outlined text-primary text-[24px] group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {tool.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {tool.desc}
                  </span>
                </Link>
              )
            )}
          </div>
        </section>

        {/* 3 Simple Steps to Use PDF Metadata Sanitizer */}
        <section className="p-space-xl rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-lg">
          <div className="flex flex-col text-center max-w-xl mx-auto gap-1">
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              3 Simple Steps to Use PDF Metadata Sanitizer
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              No software installation, account registration, or cloud API keys required. Processed entirely inside your local browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Step 1 */}
            <div className="flex flex-col gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary font-code-stat text-code-stat font-bold flex items-center justify-center">
                01
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Upload PDF Document
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Drag and drop your file or select it locally. The binary stream is mapped directly into browser heap memory with zero outbound network calls.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary font-code-stat text-code-stat font-bold flex items-center justify-center">
                02
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Inspect Metadata Audit
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Review all discovered tags, including <code className="font-mono text-primary">/Author</code>, <code className="font-mono text-primary">/Creator</code>, creation dates, and embedded XMP schemas flagged as privacy leaks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary font-code-stat text-code-stat font-bold flex items-center justify-center">
                03
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Download Sanitized PDF
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Click &quot;Sanitize &amp; Download PDF&quot;. The engine generates a clean binary blob locally, ready to publish with zero identifiable footprint.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile & Desktop Ready / Privacy Benchmark Callout */}
        <section className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col lg:flex-row items-center justify-between gap-space-lg shadow-sm">
          <div className="flex flex-col gap-space-sm max-w-xl">
            <div className="flex items-center gap-space-xs text-primary font-code-stat text-code-stat">
              <span className="material-symbols-outlined text-[18px]">devices</span>
              <span>UNIVERSAL RUNTIME COMPATIBILITY</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Clean and check AI content anywhere — 100% Client-Side Privacy
            </h3>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                <span>Instant local processing — no queue times or upload throttles</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                <span>Zero server storage — your files and content never leave your device</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                <span>Fully optimized for iOS Safari, Chrome, Edge, and desktop Firefox</span>
              </div>
            </div>
          </div>

          {/* Latency Benchmarks Widget */}
          <div className="w-full lg:w-72 flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container-lowest shadow-sm font-code-stat text-code-stat">
            <span className="text-on-surface font-semibold flex items-center justify-between">
              <span>In-Memory Parse Benchmarks</span>
              <span className="text-primary font-mono">1.4 MB PDF</span>
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Google Chrome</span>
                <span className="text-primary font-bold">1.2ms</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "25%" }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Apple Safari</span>
                <span className="text-primary font-bold">1.5ms</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "32%" }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Mozilla Firefox</span>
                <span className="text-primary font-bold">1.8ms</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose AI Text Cleaner (6-card grid) */}
        <section className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1 text-center max-w-xl mx-auto">
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Why Choose AI Text Cleaner
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Engineered from the ground up for strict confidentiality, forensic cleanliness, and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                100% In-Browser Privacy
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                No data packets leave your browser sandbox. Ideal for NDAs and internal documents.
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">bolt</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Instant Processing
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Parse and rebuild binary xref tables in milliseconds with zero server wait times.
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">neurology</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Advanced Heuristic Detection
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Inspect both legacy /Info dictionaries and Dublin Core XMP metadata streams.
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">language</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Multi-Language Static Support
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Compatible with international document encodings, CJK fonts, and UTF-16 strings.
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">layers</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Visual Highlight Breakdown
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Audit exact metadata values prior to cleaning with color-coded severity tags.
              </span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">no_accounts</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Zero Account Required
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                No email captures, logins, or paid subscription tiers. Pure open-access utility.
              </span>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (Accordion) */}
        <section className="flex flex-col gap-space-md max-w-3xl mx-auto w-full">
          <div className="flex flex-col gap-1 text-center">
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Your Questions, Answered
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Everything you need to know about our browser-based PDF sanitization security model.
            </p>
          </div>

          <div className="flex flex-col gap-space-sm">
            {/* FAQ 1 */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
              <details className="group">
                <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-on-surface font-medium cursor-pointer list-none select-none">
                  <span>Why should I clean PDF metadata before sharing?</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform duration-200">
                    expand_more
                  </span>
                </summary>
                <div className="pt-space-sm font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  PDF files silently store author names, company affiliations, computer usernames, software version fingerprints, and exact edit timestamps. When sharing documents with clients, competitors, or public repositories, this hidden metadata can disclose sensitive business intelligence or compromise personal privacy.
                </div>
              </details>
            </div>

            {/* FAQ 2 */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
              <details className="group" open>
                <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-on-surface font-semibold text-primary cursor-pointer list-none select-none">
                  <span>Are my PDF files uploaded to a remote server?</span>
                  <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform duration-200">
                    expand_more
                  </span>
                </summary>
                <div className="pt-space-sm font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  No! Processing is 100% client-side. The file is read via JavaScript ArrayBuffer into local browser heap memory. PDF parsing, metadata neutralizations, and blob reconstructions happen exclusively on your CPU without any network transport.
                </div>
              </details>
            </div>

            {/* FAQ 3 */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
              <details className="group">
                <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-on-surface font-medium cursor-pointer list-none select-none">
                  <span>Will sanitizing metadata alter the visible text or layout?</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform duration-200">
                    expand_more
                  </span>
                </summary>
                <div className="pt-space-sm font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  No. Our sanitizer only targets the PDF <code className="font-mono bg-surface-container px-1 py-0.5 rounded text-on-surface">/Info</code> object dictionary and unlinked XMP metadata streams. The visual page content stream, embedded typography, vector graphics, and image rasters remain completely untouched.
                </div>
              </details>
            </div>

            {/* FAQ 4 */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
              <details className="group">
                <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-on-surface font-medium cursor-pointer list-none select-none">
                  <span>Is there a limit on PDF file size?</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform duration-200">
                    expand_more
                  </span>
                </summary>
                <div className="pt-space-sm font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Because processing uses your computer&apos;s local memory rather than congested cloud queues, our tool easily handles documents up to 100MB instantly without rate limits or timeouts.
                </div>
              </details>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
