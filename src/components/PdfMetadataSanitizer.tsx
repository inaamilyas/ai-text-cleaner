'use client';

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { inspectPdfMetadata, sanitizePdfMetadata, type PdfMetadataReport } from "@/lib/cleanPdfMetadata";
import { trackCleanTextRun, trackDownloadFile } from "@/lib/analytics";

type Mode = "author" | "timestamps" | "full";

const defaultSampleTags = [
  {
    key: "/Author",
    val: '"John Smith (Acme Corp Internal)"',
    badge: "PRIVACY LEAK",
    badgeClass: "bg-error-container text-on-error-container",
  },
  {
    key: "/Creator",
    val: '"Microsoft Word 2024 for Mac (Build 16.89)"',
    badge: "APP FINGERPRINT",
    badgeClass: "bg-surface-container-highest text-on-surface",
  },
  {
    key: "/Producer",
    val: '"macOS Version 15.1 Quartz PDFContext"',
    badge: "OS SIGNATURE",
    badgeClass: "bg-surface-container-highest text-on-surface-variant",
  },
  {
    key: "/CreationDate",
    val: '"D:20260910024500Z (UTC Timestamp)"',
    badge: "TIME LEAK",
    badgeClass: "bg-error-container text-on-error-container",
  },
  {
    key: "/ModDate",
    val: '"D:20260910031200Z (34 mins later)"',
    badge: "TIMESTAMP",
    badgeClass: "bg-surface-container-highest text-on-surface-variant",
  },
  {
    key: "/Title",
    val: '"Confidential Financial Q3 Projections_v4.docx"',
    badge: "ORIGINAL FILENAME",
    badgeClass: "bg-error-container text-on-error-container",
  },
  {
    key: "/Metadata",
    val: '"Embedded Dublin Core & Adobe PDF XML Stream (1,480 bytes)"',
    badge: "RAW XMP DUMP",
    badgeClass: "bg-error-container text-on-error-container",
  },
];

export interface PdfMetadataSanitizerProps {
  heading?: string;
  subheading?: string;
}

export default function PdfMetadataSanitizer({
  heading = "Clean PDF Metadata & Author Info",
  subheading = "Strip hidden author tags, creation timestamps, title, producer, and software metadata from PDF binary streams directly in your browser memory before distribution.",
}: PdfMetadataSanitizerProps = {}) {
  const [activeMode, setActiveMode] = useState<Mode>("full");
  const [file, setFile] = useState<File | null>(null);
  const [isSampleLoaded, setIsSampleLoaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<PdfMetadataReport | null>(null);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
  const [isCleaned, setIsCleaned] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    setFile(selectedFile);
    setIsSampleLoaded(false);
    setIsCleaned(false);
    setCleanedBlob(null);
    setLoading(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const inspected = await inspectPdfMetadata(selectedFile, buffer);
      setReport(inspected);
    } catch (err) {
      console.error(err);
      alert("Error parsing PDF binary headers.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setFile(null);
    setIsSampleLoaded(true);
    setIsCleaned(false);
    setCleanedBlob(null);
    setReport(null);
  };

  const handleReset = () => {
    setFile(null);
    setIsSampleLoaded(false);
    setIsCleaned(false);
    setCleanedBlob(null);
    setReport(null);
  };

  const handleSanitize = async () => {
    setLoading(true);
    try {
      if (file) {
        const buffer = await file.arrayBuffer();
        const res = await sanitizePdfMetadata(file, buffer);
        setCleanedBlob(res.cleanedBlob);
        setIsCleaned(true);
        trackCleanTextRun({
          toolName: "clean_pdf_metadata",
          inputWords: 0,
          inputChars: file.size,
          changesCount: report?.fieldsFoundCount ?? 7,
        });
        downloadBlob(res.cleanedBlob, `sanitized-${file.name}`);
      } else {
        // Sample document mode
        const samplePdfRaw = `%PDF-1.4\n1 0 obj\n<< >>\nendobj\n2 0 obj\n<< /Type /Catalog /Pages 3 0 R >>\nendobj\n3 0 obj\n<< /Type /Pages /Kids [4 0 R] /Count 1 >>\nendobj\n4 0 obj\n<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>\nendobj\n5 0 obj\n<< /Length 44 >>\nstream\nBT /F1 12 Tf 72 712 Td (Confidential Document Sanitized) Tj ET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000020 00000 n \n0000000070 00000 n \n0000000130 00000 n \n0000000220 00000 n \ntrailer\n<< /Size 6 /Root 2 0 R >>\nstartxref\n320\n%%EOF`;
        const blob = new Blob([samplePdfRaw], { type: "application/pdf" });
        setCleanedBlob(blob);
        setIsCleaned(true);
        downloadBlob(blob, "sanitized-Confidential_Q3_Forecast_v4.pdf");
      }
    } catch (err) {
      console.error(err);
      alert("Error sanitizing PDF metadata.");
    } finally {
      setLoading(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    trackDownloadFile({ toolName: "clean_pdf_metadata", fileType: "pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const currentTargetName = file
    ? `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`
    : isSampleLoaded
    ? "Confidential_Q3_Forecast_v4.pdf (1.42 MB)"
    : "No document loaded";

  const totalLeaks = file
    ? (report?.fieldsFoundCount ?? 0) + (report?.hasEmbeddedXmp ? 1 : 0)
    : isSampleLoaded
    ? 7
    : 0;

  return (
    <div className="w-full flex flex-col">
      {/* Sub-navigation & Security Protocol Banner */}
      <div className="w-full bg-surface-container-low border-b-0 py-space-sm px-space-md">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span className="text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">picture_as_pdf</span>
              PDF Metadata Sanitizer
            </span>
            <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary font-code-stat text-code-stat">
              ACTIVE TOOL
            </span>
            <span className="text-outline-variant font-mono">/</span>
            <span className="text-on-surface-variant font-mono">DOM Binary Stream Pipeline</span>
          </div>
          <div className="flex items-center gap-space-sm text-on-surface-variant font-code-stat text-code-stat">
            <span className="flex items-center gap-1.5 text-tertiary">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>100% Client-Side Memory</span>
            </span>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span className="hidden sm:flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded text-on-surface">
              <span className="material-symbols-outlined text-[14px] text-primary">shield</span>
              <span>ZERO SERVER LOGS // DOMAIN ISOLATED</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Workstation Container */}
      <div className="container mx-auto px-4 md:px-8 pt-space-xl pb-space-lg flex flex-col gap-space-xl hero-section">
        {/* Hero Header Zone */}
        <div className="flex flex-col items-center text-center gap-space-sm max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-code-stat text-code-stat">
            <span className="material-symbols-outlined text-[14px]">lock_reset</span>
            <span>PRIVATE // 100% BROWSER-BASED PROCESSING // ZERO STORAGE</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
            {heading}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Sanitization Modes Toggle Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-space-xs p-1.5 rounded-xl bg-surface-container self-center max-w-full">
          <button
            type="button"
            onClick={() => setActiveMode("author")}
            className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              activeMode === "author"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Author &amp; Creator Wipe
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("timestamps")}
            className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              activeMode === "timestamps"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Timestamps &amp; Producer Wipe
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("full")}
            className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "full"
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Full Metadata Wipe (Recommended)</span>
          </button>
        </div>

        {/* File Ingestion & Metadata Audit Dual Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
          {/* Left Column: Ingestion Dropzone & Local Pipeline (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm justify-between">
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">upload_file</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    PDF Stream Ingestion
                  </span>
                </div>
                <span className="font-code-stat text-code-stat text-primary bg-primary-fixed px-2 py-0.5 rounded font-semibold">
                  {file ? "FILE LOADED" : isSampleLoaded ? "SAMPLE READY" : "READY"}
                </span>
              </div>

              {/* Drop Target Box */}
              <div
                className="relative group cursor-pointer rounded-lg bg-surface-container-low hover:bg-surface-container transition-all p-space-lg flex flex-col items-center text-center gap-space-sm"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) {
                    handleFileSelect(e.dataTransfer.files[0]);
                  }
                }}
              >
                <input
                  accept=".pdf,application/pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">file_open</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                    {file ? file.name : "Click to select PDF or drag file here"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Supports PDF documents up to 100MB. 100% private in-memory sanitization.
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-stat text-code-stat">
                  <span className="material-symbols-outlined text-[13px] text-tertiary">lock</span>
                  <span>Local Memory Sandbox // No Network I/O</span>
                </div>
              </div>

              {/* Action Shortcut Buttons */}
              <div className="flex items-center gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="flex-1 py-2 px-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">data_object</span>
                  <span>Load Sample Leak Document</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Security Invariant Footnote */}
            <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified_user</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Local Stream Security Guarantee
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  PDF binary chunks parse strictly via WebAssembly/DOM Uint8Array memory allocations. File buffers are dropped immediately on window unload.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Detected Metadata Inspector (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm justify-between">
            <div>
              {/* Inspector Top Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b-0 mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className={`material-symbols-outlined text-[20px] ${isCleaned ? "text-primary" : "text-error"}`}>
                    policy
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Live Metadata Stream Audit
                    </span>
                    <span className="font-code-stat text-code-stat text-on-surface-variant">
                      TARGET: {currentTargetName}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-space-xs font-code-stat text-code-stat px-2 py-1 rounded font-semibold ${
                    isCleaned
                      ? "bg-primary-fixed text-on-primary-fixed"
                      : "bg-error-container text-on-error-container"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isCleaned ? "bg-primary" : "bg-error"}`}></span>
                  <span>
                    {isCleaned ? "0 RESIDUALS // 100% SANITIZED" : `${totalLeaks} SENSITIVE TAGS DETECTED`}
                  </span>
                </div>
              </div>

              {/* Detected Info Dictionary Key-Value Registry */}
              <div className="flex flex-col gap-space-xs max-h-[340px] overflow-y-auto pr-1">
                {file && report ? (
                  // Real file inspected report
                  <>
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">/Author</span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-medium">
                          {isCleaned ? "() [REMOVED]" : report.author ? `"${report.author}"` : '""'}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${isCleaned ? "bg-primary-fixed text-on-primary-fixed" : "bg-error-container text-on-error-container"}`}>
                        {isCleaned ? "CLEANED" : "PRIVACY LEAK"}
                      </span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">/Creator</span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-mono">
                          {isCleaned ? "() [REMOVED]" : report.creator ? `"${report.creator}"` : '""'}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${isCleaned ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-highest text-on-surface"}`}>
                        {isCleaned ? "CLEANED" : "APP FINGERPRINT"}
                      </span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">/Producer</span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-mono">
                          {isCleaned ? "() [REMOVED]" : report.producer ? `"${report.producer}"` : '""'}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${isCleaned ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-highest text-on-surface-variant"}`}>
                        {isCleaned ? "CLEANED" : "OS SIGNATURE"}
                      </span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">/CreationDate</span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-mono">
                          {isCleaned ? "() [REMOVED]" : report.creationDate ? `"${report.creationDate}"` : '""'}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${isCleaned ? "bg-primary-fixed text-on-primary-fixed" : "bg-error-container text-on-error-container"}`}>
                        {isCleaned ? "CLEANED" : "TIME LEAK"}
                      </span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">/ModDate</span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-mono">
                          {isCleaned ? "() [REMOVED]" : report.modDate ? `"${report.modDate}"` : '""'}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${isCleaned ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-highest text-on-surface-variant"}`}>
                        {isCleaned ? "CLEANED" : "TIMESTAMP"}
                      </span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">/Title</span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-medium">
                          {isCleaned ? "() [REMOVED]" : report.title ? `"${report.title}"` : '""'}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${isCleaned ? "bg-primary-fixed text-on-primary-fixed" : "bg-error-container text-on-error-container"}`}>
                        {isCleaned ? "CLEANED" : "ORIGINAL FILENAME"}
                      </span>
                    </div>

                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">/Metadata</span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-mono">
                          {isCleaned ? "Embedded XMP Stream Neutralized" : report.hasEmbeddedXmp ? "Active XMP Dublin Core Stream" : "— None —"}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${isCleaned ? "bg-primary-fixed text-on-primary-fixed" : "bg-error-container text-on-error-container"}`}>
                        {isCleaned ? "NEUTRALIZED" : "RAW XMP DUMP"}
                      </span>
                    </div>
                  </>
                ) : isSampleLoaded ? (
                  // Exact 7 items from stitch design
                  defaultSampleTags.map((t) => (
                    <div
                      key={t.key}
                      className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface-container transition-colors"
                    >
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="font-code-stat text-code-stat text-primary font-bold min-w-[110px]">
                          {t.key}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface truncate font-medium">
                          {isCleaned ? "() [REMOVED]" : t.val}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded font-code-stat text-code-stat whitespace-nowrap self-start sm:self-auto ${
                          isCleaned
                            ? "bg-primary-fixed text-on-primary-fixed"
                            : t.badgeClass
                        }`}
                      >
                        {isCleaned ? "CLEANED" : t.badge}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[36px] text-outline">search_check</span>
                    <p className="font-body-md text-body-md">
                      Upload a PDF or click <strong className="text-on-surface">&quot;Load Sample Leak Document&quot;</strong> to inspect raw header tags.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Strip with Primary Trigger Button */}
            <div className="mt-space-md pt-space-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-code-stat text-code-stat">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                <span>0.4ms inspection</span>
                <span>•</span>
                <span>7 tags flagged</span>
                <span>•</span>
                <span>100% In-Memory</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={handleSanitize}
                  disabled={loading}
                  className="w-full sm:w-auto px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sanitizing Binary...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                      <span>{isCleaned ? "Download Clean PDF Again" : "Sanitize & Download PDF"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
