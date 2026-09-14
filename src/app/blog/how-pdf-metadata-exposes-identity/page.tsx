import type { Metadata } from "next";
import Link from "next/link";
import BlogDetailTemplate from "@/components/BlogDetailTemplate";

export const metadata: Metadata = {
  title: "How PDF Metadata Exposes Your Real Identity & Location — AI Text Cleaner Blog",
  description:
    "Learn how PDF exports embed operating system usernames, author stamps, print queues, and Adobe XMP schema logs, and how client-side scrubbing eliminates forensic footprints.",
  alternates: {
    canonical: "/blog/how-pdf-metadata-exposes-identity",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How PDF Metadata Exposes Your Real Identity & Location",
  description:
    "Learn how PDF exports embed operating system usernames, author stamps, print queues, and Adobe XMP schema logs.",
  datePublished: "2026-08-28",
  dateModified: "2026-09-14",
  author: {
    "@type": "Person",
    name: "Inam Ilyas",
    url: "https://github.com/inaamilyas",
  },
  publisher: {
    "@type": "Organization",
    name: "AI Text Cleaner",
    url: "https://aitextcleaner.com",
  },
};

export default function PdfMetadataArticlePage() {
  return (
    <BlogDetailTemplate
      currentSlug="how-pdf-metadata-exposes-identity"
      title="How PDF Metadata Exposes Your Real Identity & Location"
      subtitle="A forensic breakdown of hidden /Info dictionaries, Adobe XMP packets, creation timestamps, and how client-side binary scrubbing protects author privacy."
      category="Security & Forensics"
      categoryTag="Forensic Privacy"
      date="August 28, 2026"
      readTime="5 min read"
      authorName="Inam Ilyas"
      authorHandle="github.com/inaamilyas"
      articleJsonLd={articleJsonLd}
      tldrSummary="PDF exports silently retain system usernames, local machine paths, PDF generator build numbers, and precise timezone offsets. Sanitizing the PDF xref table and binary headers client-side prevents unintended identity leakage."
      tldrPoints={[
        {
          title: "Hidden Dictionaries",
          desc: "The /Info and XMP metadata trees log local usernames and software engines.",
        },
        {
          title: "Timezone Offsets",
          desc: "Creation timestamps reveal physical geographic work timezones down to minutes.",
        },
        {
          title: "In-Browser Scrubbing",
          desc: "Strip metadata directly in WebAssembly/JS memory without server uploads.",
        },
      ]}
    >
      {/* Section 1 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold tracking-widest uppercase">
          <span>Section 01</span>
          <span>//</span>
          <span>Binary Forensic Footprints</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          What Your PDF Silently Leaks
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          When you export a document from Microsoft Word, Google Docs, Apple Pages, LibreOffice, or LaTeX to PDF format, the rendering compiler silently embeds extensive metadata tags directly into the binary header and trailer dictionaries.
        </p>
        <p className="text-base text-on-surface-variant leading-relaxed">
          These tags are invisible when viewing the document in standard PDF readers like Preview or Adobe Acrobat Reader, but can be extracted instantly with command-line tools like <code>pdfinfo</code> or <code>exiftool</code>.
        </p>

        {/* Illustrated Leak Table */}
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40 space-y-3">
          <span className="font-mono text-xs font-semibold text-outline uppercase tracking-wider block">
            Common Forensic Metadata Disclosures
          </span>
          <div className="overflow-x-auto rounded-lg border border-outline-variant/30 bg-surface-container-lowest">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-container font-bold border-b border-outline-variant/20 text-on-surface">
                <tr>
                  <th className="p-3">Dictionary Key</th>
                  <th className="p-3">Data Exposed</th>
                  <th className="p-3">Privacy Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                <tr>
                  <td className="p-3 font-semibold text-primary">/Author</td>
                  <td className="p-3">Local OS username or domain account</td>
                  <td className="p-3 font-sans text-red-600 font-medium">De-anonymizes pseudonymous writers</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">/Producer &amp; /Creator</td>
                  <td className="p-3">Exact software name, OS version, printer queue</td>
                  <td className="p-3 font-sans">Fingerprints local machine environment</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">/CreationDate</td>
                  <td className="p-3 font-sans">UTC timestamp + timezone offset (e.g. +05&apos;00&apos;)</td>
                  <td className="p-3 font-sans text-red-600 font-medium">Reveals geographic location &amp; working hours</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">Adobe XMP Stream</td>
                  <td className="p-3">XML document revision history &amp; UUIDs</td>
                  <td className="p-3 font-sans">Enables correlation across disparate files</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4 pt-4 border-t border-surface-container">
        <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold tracking-widest uppercase">
          <span>Section 02</span>
          <span>//</span>
          <span>Sanitization Mechanics</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          How to Sanitize PDF Metadata Client-Side
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Traditional web PDF cleaners require uploading your confidential contracts, legal filings, or research whitepapers to a remote server. This creates severe regulatory compliance and data breach exposure.
        </p>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Our <Link href="/clean-pdf-metadata" className="text-primary font-bold hover:underline">PDF Metadata Sanitizer</Link> executes entirely in your browser. It parses the binary array buffer, rebuilds the cross-reference (xref) table, nullifies the <code>/Info</code> catalog object, and wipes the Adobe XMP byte stream in pure JavaScript memory.
        </p>

        {/* Key Takeaway Callout */}
        <div className="p-6 rounded-xl bg-primary text-white relative overflow-hidden shadow-sm mt-6">
          <div className="relative z-10 flex items-start gap-3">
            <span className="material-symbols-outlined text-[28px] shrink-0 text-white/90">format_quote</span>
            <div>
              <p className="text-base font-semibold text-white leading-snug mb-2">
                &quot;Redacting the visible visual canvas does not protect you. True anonymity requires forensic scrubbing of the underlying binary metadata dictionaries.&quot;
              </p>
              <span className="font-mono text-xs text-white/80 block font-medium">
                — Privacy Engineering Team, AI Text Cleaner
              </span>
            </div>
          </div>
        </div>
      </section>
    </BlogDetailTemplate>
  );
}
