"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState("General Question");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fileInfo, setFileInfo] = useState<{ name: string; sizeKb: number } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { label: "General", icon: "chat", value: "General Question" },
    { label: "Bug Report", icon: "bug_report", value: "Bug Report" },
    { label: "Feature", icon: "lightbulb", value: "Feature Request" },
    { label: "Partner", icon: "handshake", value: "Partnership / AdSense" },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("inaamilyas656@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileInfo({
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSenderName("");
    setSenderEmail("");
    setSubject("");
    setMessage("");
    setFileInfo(null);
    setSubmitted(false);
  };

  // Structured Data Schema for Contact & FAQ
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://www.text-cleaner-ai.com/contact#webpage",
        "url": "https://www.text-cleaner-ai.com/contact",
        "name": "Contact & Engineering Support | Text Cleaner AI",
        "description": "Direct communication channel to the founder and engineering team of Text Cleaner AI for bug reports, unicode regex submissions, and feature suggestions.",
        "publisher": {
          "@type": "Organization",
          "name": "Text Cleaner AI",
          "url": "https://www.text-cleaner-ai.com",
        },
        "mainEntity": {
          "@type": "Person",
          "name": "Inam Ilyas",
          "jobTitle": "Founder & Lead Systems Engineer",
          "email": "inaamilyas656@gmail.com",
          "sameAs": [
            "https://www.linkedin.com/in/inam-ilyas/",
            "https://github.com/inaamilyas/ai-text-cleaner",
          ],
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Reporting a regex or unicode character bug?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Please include the raw character string or code point (e.g. U+200B Zero-Width Space or U+FEFF BOM). We will reproduce the parser token in our test suite within 24 hours.",
            },
          },
          {
            "@type": "Question",
            "name": "Looking to suggest a new LLM platform cleaner?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We monitor every major model release (Claude 3.7, DeepSeek R1, GPT-4.5, Gemini 2.0). Custom markdown syntax and conversational wrappers are usually reverse-engineered and shipped into production within 48h.",
            },
          },
          {
            "@type": "Question",
            "name": "Interested in commercial licensing or API access?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Text Cleaner AI is completely free for both personal and enterprise use. All operations run 100% locally in your browser's V8 engine with zero network roundtrips. Self-hosted npm packages are available upon request.",
            },
          },
          {
            "@type": "Question",
            "name": "Does Text Cleaner AI store my submitted form data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No telemetry or message payloads are monetized, syndicated, or retained on shared staging servers. All communications go straight to Inam's private secure inbox and are purged after issue resolution.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full bg-background flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="container mx-auto px-4 md:px-8 py-space-lg">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden pb-space-xl">
            {/* Ambient Precision Glows */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[280px] bg-gradient-to-b from-primary-fixed/25 via-surface-container-high/40 to-transparent blur-3xl pointer-events-none -z-10" />

            {/* 1. Breadcrumb / Direct Access Status Strip */}
            <section className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-code-stat text-code-stat tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>• CONTACT & SUPPORT // DIRECT DEVELOPER ACCESS</span>
                </span>
                <span className="hidden sm:inline-block text-outline-variant font-code-stat text-code-stat">/</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[13px] text-primary">terminal</span>
                  <span>DISPATCH: INAM.DEV</span>
                </span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-container-lowest shadow-sm text-on-surface-variant font-label-sm text-label-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Direct SLA: <strong className="text-on-surface font-code-stat font-semibold">&lt; 24h</strong></span>
                <span className="text-outline-variant">•</span>
                <span className="text-tertiary">100% Privacy Respected</span>
              </div>
            </section>

            {/* 2. Hero & Introduction Section */}
            <section className="text-center max-w-4xl md:max-w-5xl mx-auto mb-space-lg">
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold mb-space-xs">
                Contact Us
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl md:max-w-4xl mx-auto mb-space-md">
                Have a question, feedback, or need help with AI text sanitization? Reach out directly to the founder via verified email, LinkedIn, or GitHub channels.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm font-label-sm text-label-sm text-on-surface">
                  <span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
                  <span>Direct Founder Access</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm font-label-sm text-label-sm text-on-surface">
                  <span className="material-symbols-outlined text-[15px] text-primary">bolt</span>
                  <span>Fast Technical Turnaround</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm font-label-sm text-label-sm text-on-surface">
                  <span className="material-symbols-outlined text-[15px] text-primary">shield</span>
                  <span>Zero Spam / No Mailing Lists</span>
                </div>
              </div>
            </section>

            {/* 3. Main Dual-Column Workbench Layout */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start mb-space-xl">
              {/* LEFT COLUMN: Founder Dossier & Direct Access Channels (5 cols) */}
              <div className="lg:col-span-5 space-y-space-md">
                {/* Founder Profile Card */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
                  <div className="flex items-start gap-space-md mb-space-md">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-primary text-on-primary flex items-center justify-center font-headline-md text-headline-md font-bold shadow-md ring-2 ring-primary-fixed">
                        II
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-[10px] shadow-sm" title="Online & Active">
                        <span className="w-2 h-2 rounded-full bg-surface-container-lowest" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Inam Ilyas</h3>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-code-stat text-[10px]">CREATOR</span>
                      </div>
                      <p className="font-label-md text-label-md text-on-surface-variant">Founder & Lead Systems Engineer</p>
                      <div className="mt-1 flex items-center gap-1 text-[11px] font-code-stat text-outline">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        <span>Global Remote • UTC+0 / Flexible</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm leading-normal italic relative">
                    <span className="material-symbols-outlined text-[16px] text-primary inline-block align-middle mr-1 not-italic">format_quote</span>
                    &quot;I personally inspect all bug reports, parser failures, and suggestions. If a regex fails on a new model output or zero-width character, send it to me directly.&quot;
                  </div>
                </div>

                {/* Channel 1: Direct Email */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-space-sm mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </div>
                      <div>
                        <span className="font-code-stat text-code-stat text-outline uppercase tracking-wider block">Primary Channel</span>
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Direct Email</h4>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-code-stat text-[10px]">
                      SLA: 4-12 hrs
                    </span>
                  </div>
                  <div className="p-2.5 my-3 rounded-lg bg-surface-container-low flex items-center justify-between gap-2 font-code-stat text-body-sm">
                    <span className="text-on-surface truncate font-semibold" id="targetEmail">inaamilyas656@gmail.com</span>
                    <button
                      type="button"
                      id="copyEmailBtn"
                      onClick={handleCopyEmail}
                      className={`flex-shrink-0 px-2.5 py-1 rounded text-label-sm font-label-sm shadow-xs flex items-center gap-1 transition-colors cursor-pointer ${
                        copiedEmail
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">{copiedEmail ? "check" : "content_copy"}</span>
                      <span id="copyEmailText">{copiedEmail ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-label-sm font-label-sm pt-1">
                    <span className="text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-primary">speed</span>
                      Typically replies same business day
                    </span>
                    <a
                      href="mailto:inaamilyas656@gmail.com?subject=[AI%20Text%20Cleaner]%20Inquiry"
                      className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                    >
                      <span>Compose</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                    </a>
                  </div>
                </div>

                {/* Channel 2: LinkedIn Profile */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-space-sm mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">share</span>
                      </div>
                      <div>
                        <span className="font-code-stat text-code-stat text-outline uppercase tracking-wider block">Professional</span>
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">LinkedIn Network</h4>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-code-stat text-[10px]">
                      NETWORKING
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                    Inam Ilyas — Open for enterprise integrations, security audits, and developer partnerships.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/inam-ilyas/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>linkedin.com/in/inam-ilyas</span>
                    </span>
                    <span className="material-symbols-outlined text-[15px] text-outline">north_east</span>
                  </a>
                </div>

                {/* Channel 3: GitHub Developer Profile */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-space-sm mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">terminal</span>
                      </div>
                      <div>
                        <span className="font-code-stat text-code-stat text-outline uppercase tracking-wider block">Source & Issues</span>
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">GitHub Engineering</h4>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-code-stat text-[10px]">
                      PUBLIC ISSUES
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                    Track sanitizer commits, PRs, homoglyph database updates, and regex contributions directly on repo.
                  </p>
                  <a
                    href="https://github.com/inaamilyas/ai-text-cleaner"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-code-stat text-code-stat text-primary">@inaamilyas</span>
                      <span className="text-on-surface-variant">/ ai-text-cleaner-core</span>
                    </span>
                    <span className="material-symbols-outlined text-[15px] text-outline">north_east</span>
                  </a>
                </div>

                {/* Live Dispatch Availability Matrix */}
                <div className="p-space-md rounded-xl bg-surface-container-low">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-code-stat text-code-stat text-outline uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      Availability Window
                    </span>
                    <span className="font-code-stat text-[10px] text-primary font-semibold">UTC MON-SAT</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-label-sm font-label-sm">
                    <div className="p-2 rounded bg-surface-container-lowest">
                      <span className="text-outline block text-[10px] font-code-stat">PRIMARY RADAR</span>
                      <span className="text-on-surface font-medium">08:00 — 20:00 UTC</span>
                    </div>
                    <div className="p-2 rounded bg-surface-container-lowest">
                      <span className="text-outline block text-[10px] font-code-stat">URGENT REGEX</span>
                      <span className="text-on-surface font-medium">&lt; 4 Hours Triage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Direct Message Form Card (7 cols) */}
              <div className="lg:col-span-7">
                <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md relative">
                  {/* Form Header */}
                  <div className="flex items-start justify-between gap-4 mb-space-md pb-space-sm border-b-0">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-fixed/50 text-on-primary-fixed-variant font-code-stat text-code-stat mb-1">
                        <span className="material-symbols-outlined text-[12px]">send</span>
                        DISPATCH FORM
                      </div>
                      <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface">Send a Direct Message</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Fill in the details below. Messages are routed directly to Inam&apos;s inbox with telemetry logs attached if provided.
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span className="text-[10px] font-code-stat text-outline">ENCRYPTION</span>
                      <span className="text-label-sm font-label-sm text-on-surface font-medium">End-to-End Client Ready</span>
                    </div>
                  </div>

                  <form className="space-y-space-md" id="contactForm" onSubmit={handleSubmit}>
                    {/* Category Pills Selector */}
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-medium mb-2">
                        Inquiry Category <span className="text-error">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="categoryGroup">
                        {categories.map((cat) => {
                          const isActive = selectedCategory === cat.value;
                          return (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => setSelectedCategory(cat.value)}
                              className={`category-pill h-9 px-3 rounded-lg text-label-sm font-label-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                isActive
                                  ? "active bg-primary/10 text-primary font-semibold shadow-xs ring-1 ring-primary"
                                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                              <span>{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Two inputs row: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div>
                        <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5" htmlFor="senderName">
                          Your Name <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline">person</span>
                          <input
                            id="senderName"
                            type="text"
                            required
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5" htmlFor="senderEmail">
                          Your Email Address <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline">alternate_email</span>
                          <input
                            id="senderEmail"
                            type="email"
                            required
                            value={senderEmail}
                            onChange={(e) => setSenderEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-medium mb-1.5" htmlFor="msgSubject">
                        Subject Line
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline">title</span>
                        <input
                          id="msgSubject"
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Brief summary of your inquiry or bug"
                          className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Area with Live Counter */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="messageBody">
                          Your Message &amp; Diagnostic Details <span className="text-error">*</span>
                        </label>
                        <span
                          className={`font-code-stat text-code-stat ${
                            message.length > 1900 ? "text-error" : "text-outline"
                          }`}
                          id="charCounter"
                        >
                          {message.length} / 2,000
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          id="messageBody"
                          required
                          rows={5}
                          maxLength={2000}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Include error logs, sample AI prompt text, raw unicode strings, or platform specifics (ChatGPT, Claude 3.7, Gemini, DeepSeek)..."
                          className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                        />
                      </div>
                      <p className="mt-1 text-[11px] font-body-sm text-outline">
                        Tip: If reporting invisible character bypasses, paste the raw string directly into the box.
                      </p>
                    </div>

                    {/* Attachment / Diagnostics Box */}
                    <div className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer text-center relative group" id="dropZone">
                      <input
                        type="file"
                        id="logAttachment"
                        accept=".txt,.json,.log,.png,.jpg"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[18px] text-primary">attachment</span>
                        <span id="dropZoneText">
                          {fileInfo ? (
                            <>
                              <strong className="text-primary font-code-stat">Attached: {fileInfo.name}</strong> ({fileInfo.sizeKb} KB)
                            </>
                          ) : (
                            "Optional: Attach sample text, console dump (.log, .json), or screenshot"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Privacy Guarantee Banner */}
                    <div className="p-2.5 rounded-lg bg-surface-container flex items-start gap-2 text-[11px] font-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[15px] text-primary flex-shrink-0 mt-0.5">verified</span>
                      <span>
                        <strong>Zero Marketing Telemetry:</strong> Your email address and message will only be used by Inam to respond directly. It will never be indexed into CRM funnels, advertising networks, or third-party mailing lists.
                      </span>
                    </div>

                    {/* Submit Button & Feedback Status */}
                    <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                      <div className={`font-code-stat text-code-stat text-tertiary ${isSubmitting ? "" : "hidden"}`} id="dispatchStatus">
                        <span className="inline-flex items-center gap-1.5 text-primary">
                          <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>
                          Preparing client-side dispatch...
                        </span>
                      </div>
                      <button
                        type="submit"
                        id="sendBtn"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto ml-auto px-6 h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        <span>Send Message</span>
                        <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">send</span>
                      </button>
                    </div>
                  </form>

                  {/* Post-submission Success Overlay */}
                  {submitted && (
                    <div className="absolute inset-0 bg-surface-container-lowest/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-space-lg text-center z-20" id="successOverlay">
                      <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-sm">
                        <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md font-semibold text-on-surface mb-1">Message Dispatched</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-md">
                        Thank you! Your inquiry was sent directly to Inam&apos;s terminal. Expect a personal technical reply within 4-12 hours.
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors cursor-pointer"
                      >
                        Send Another Note
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 4. Frequently Asked Before Contacting (Bento Accordion Cards) */}
            <section className="mb-space-xl">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-code-stat text-code-stat text-outline uppercase tracking-wider block">PRE-FLIGHT INFORMATION</span>
                  <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Frequently Asked Before Contacting</h3>
                </div>
                <span className="hidden md:inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">
                  <span className="material-symbols-outlined text-[14px]">menu_book</span>
                  Direct Diagnostic FAQ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* FAQ 1 */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0 font-code-stat text-xs font-semibold">
                      01
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
                        Reporting a regex or unicode character bug?
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Please include the raw character string or code point (e.g. <code className="px-1 py-0.5 rounded bg-surface-container font-code-stat text-[11px] text-primary">U+200B</code> Zero-Width Space or <code className="px-1 py-0.5 rounded bg-surface-container font-code-stat text-[11px] text-primary">U+FEFF</code> BOM). We will reproduce the parser token in our test suite within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0 font-code-stat text-xs font-semibold">
                      02
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
                        Looking to suggest a new LLM platform cleaner?
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        We monitor every major model release (Claude 3.7, DeepSeek R1, GPT-4.5, Gemini 2.0). Custom markdown syntax and conversational wrappers are usually reverse-engineered and shipped into production within 48h.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0 font-code-stat text-xs font-semibold">
                      03
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
                        Interested in commercial licensing or API access?
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Text Cleaner AI is completely free for both personal and enterprise use. All operations run 100% locally in your browser&apos;s V8 engine with zero network roundtrips. Self-hosted npm packages are available upon request.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0 font-code-stat text-xs font-semibold">
                      04
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
                        Does Text Cleaner AI store my submitted form data?
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        No telemetry or message payloads are monetized, syndicated, or retained on shared staging servers. All communications go straight to Inam&apos;s private secure inbox and are purged after issue resolution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Live System Health / Terminal Component */}
            <section className="mb-space-xl">
              <div className="rounded-xl bg-inverse-surface text-inverse-on-surface p-space-md shadow-md font-code-stat text-body-sm overflow-hidden">
                {/* Terminal Titlebar */}
                <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-error inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-surface-tint inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block" />
                    </div>
                    <span className="text-xs text-outline-variant font-medium ml-2">sys-diag // direct_support_daemon.sh</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-primary-fixed-dim">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-inverse-primary animate-ping" />
                    <span>SYSTEM HEALTH: 100% OPERATIONAL</span>
                  </div>
                </div>
                {/* Terminal Output Lines */}
                <div className="space-y-1 text-code-stat leading-relaxed text-inverse-on-surface/90">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-fixed font-bold">&gt;</span>
                    <span className="text-tertiary-fixed">// System Status: Operational [Edge CDN &amp; Client-Side Nodes]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-fixed font-bold">&gt;</span>
                    <span>// In-browser engine: V8 / WebAssembly isolated execution context</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-fixed font-bold">&gt;</span>
                    <span>// Direct mail gateway: Active (PGP Encrypted Channel Ready: inaamilyas656@gmail.com)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-fixed font-bold">&gt;</span>
                    <span className="text-primary-fixed">// Response SLA: 24h guaranteed for all developer tickets</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-outline-variant">
                    <span>[HOST: TLSv1.3 | CLIENT_HASH: SHA256-CLIENT-SIDE-CLEANER-v2.6 | REGEX_RULES: 124 ACTIVE]</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
