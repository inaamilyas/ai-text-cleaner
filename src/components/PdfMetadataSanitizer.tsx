'use client';

import { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Download,
  RotateCcw,
  Sparkles,
  FileCheck,
  Trash2,
  Lock,
  AlertTriangle,
  Paperclip,
  Loader2,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { inspectPdfMetadata, sanitizePdfMetadata, type PdfMetadataReport } from "@/lib/cleanPdfMetadata";
import { trackCleanTextRun, trackDownloadFile } from "@/lib/analytics";

type Phase = "analyzing" | "analyzed" | "cleaning" | "cleaned";

/** Keeps the "Analyzing.../Cleaning..." state on screen long enough to read, even though the actual work is near-instant. */
function minDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const pdfPresets = [
  {
    id: "author",
    label: "Author & Creator Wipe",
  },
  {
    id: "timestamps",
    label: "Timestamps & Producer Wipe",
  },
  {
    id: "full",
    label: "Full Metadata Wipe",
  },
];

export interface PdfMetadataSanitizerProps {
  heading?: string;
  subheading?: string;
}

export default function PdfMetadataSanitizer({ heading, subheading }: PdfMetadataSanitizerProps = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<PdfMetadataReport | null>(null);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
  const [phase, setPhase] = useState<Phase>("analyzing");

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    setFile(selectedFile);
    setReport(null);
    setCleanedBlob(null);
    setPhase("analyzing");

    try {
      const buffer = await selectedFile.arrayBuffer();
      const [inspectedReport] = await Promise.all([inspectPdfMetadata(selectedFile, buffer), minDelay(700)]);
      setReport(inspectedReport);
      setPhase("analyzed");
    } catch (err) {
      console.error(err);
      alert("Error reading PDF file.");
      setFile(null);
    }
  };

  const handleClean = async () => {
    if (!file) return;
    setPhase("cleaning");

    try {
      const buffer = await file.arrayBuffer();
      const [cleanResult] = await Promise.all([sanitizePdfMetadata(file, buffer), minDelay(900)]);
      setCleanedBlob(cleanResult.cleanedBlob);
      setPhase("cleaned");

      trackCleanTextRun({
        toolName: "clean_pdf_metadata",
        inputWords: 0,
        inputChars: file.size,
        changesCount: report?.fieldsFoundCount ?? 0,
      });
    } catch (err) {
      console.error(err);
      alert("Error cleaning PDF file.");
      setPhase("analyzed");
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob || !file) return;
    trackDownloadFile({ toolName: "clean_pdf_metadata", fileType: "pdf" });
    const url = URL.createObjectURL(cleanedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sanitized-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setReport(null);
    setCleanedBlob(null);
    setPhase("analyzing");
  };

  const reducedConfidence = report?.parseMethod === "fallback-text-scan";

  return (
    <section className="bg-white">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 sm:px-6 py-6 sm:py-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full rounded-lg border border-neutral-200 bg-white p-4 sm:p-8"
        >
          {/* Quick Presets Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 border-b border-neutral-200 pb-3">
            <span className="text-body-xs font-bold uppercase text-neutral-500 mr-1.5">
              Sanitization Modes:
            </span>
            {pdfPresets.map((preset) => (
              <span
                key={preset.id}
                className="flex items-center gap-1 rounded-md border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-body-xs font-medium text-neutral-700"
              >
                <Lock className="h-3 w-3 text-primary-600" aria-hidden="true" />
                {preset.label}
              </span>
            ))}
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-neutral-300 hover:border-primary-500 transition-colors rounded-lg p-8 sm:p-12 text-center bg-neutral-0">
              <label className="cursor-pointer flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 border border-primary-200">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-body-md font-bold text-neutral-900 hover:text-primary-700">
                    Click to select PDF file
                  </span>
                  <p className="text-body-sm text-neutral-500 mt-1">or drag and drop your PDF here</p>
                </div>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center gap-3 text-left">
                  <FileCheck className="w-8 h-8 text-primary-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-neutral-900 truncate max-w-xs sm:max-w-md text-body-sm">{file.name}</h3>
                    <p className="text-body-xs text-neutral-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 text-neutral-400 hover:text-danger-600 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {phase === "analyzing" && (
                <div className="flex flex-col items-center justify-center gap-3 border-t border-neutral-200 py-10 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-hidden="true" />
                  <p className="text-body-sm font-bold text-neutral-900">Analyzing PDF for hidden metadata&hellip;</p>
                  <p className="text-body-xs text-neutral-500">
                    Scanning the Info dictionary, XMP stream, and embedded attachments — all in your browser.
                  </p>
                </div>
              )}

              {phase === "cleaning" && (
                <div className="flex flex-col items-center justify-center gap-3 border-t border-neutral-200 py-10 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-hidden="true" />
                  <p className="text-body-sm font-bold text-neutral-900">Cleaning detected metadata&hellip;</p>
                  <p className="text-body-xs text-neutral-500">
                    Rewriting the PDF without the fields found above.
                  </p>
                </div>
              )}

              {reducedConfidence && phase !== "analyzing" && (
                <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-3.5 text-left">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600" aria-hidden="true" />
                  <p className="text-body-xs text-amber-900">
                    <span className="font-bold">This file couldn&apos;t be fully parsed.</span> We fell back to a
                    basic text scan, which can miss metadata stored inside compressed PDF streams. Fields shown
                    below were found{phase === "cleaned" ? " and removed" : ""}, but we can&apos;t guarantee
                    nothing else remains — check the downloaded file&apos;s properties before sharing it if that
                    matters for your use case.
                  </p>
                </div>
              )}

              {/* Metadata Audit Results */}
              {report && (() => {
                const totalFieldsFound =
                  report.fieldsFoundCount + (report.hasEmbeddedXmp ? 1 : 0) + report.attachmentsFoundCount;
                return (
                <div className="flex flex-col gap-4 text-left border-t border-neutral-200 pt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-body-sm font-bold text-neutral-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary-600" /> Detected Metadata Properties
                    </h4>
                    <span className={`px-2.5 py-0.5 text-body-xs font-bold rounded ${
                      totalFieldsFound > 0
                        ? "bg-amber-100 text-amber-900 border border-amber-200"
                        : "bg-primary-100 text-primary-800"
                    }`}>
                      {totalFieldsFound > 0
                        ? `${totalFieldsFound} Hidden Metadata Fields`
                        : "Clean PDF (No Hidden Metadata)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-body-sm">
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Author Tag:</span>
                      <span className="font-medium text-neutral-900">{report.author || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Creator App:</span>
                      <span className="font-medium text-neutral-900">{report.creator || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">PDF Producer:</span>
                      <span className="font-medium text-neutral-900">{report.producer || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Creation Timestamp:</span>
                      <span className="font-medium text-neutral-900">{report.creationDate || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Modification Timestamp:</span>
                      <span className="font-medium text-neutral-900">{report.modDate || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Document Title:</span>
                      <span className="font-medium text-neutral-900">{report.title || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Subject:</span>
                      <span className="font-medium text-neutral-900">{report.subject || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Keywords:</span>
                      <span className="font-medium text-neutral-900">{report.keywords || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">XMP Metadata Stream:</span>
                      <span className="font-medium text-neutral-900">
                        {report.hasEmbeddedXmp ? "Present" : "Not Present"}
                      </span>
                    </div>
                  </div>

                  {report.attachmentsFoundCount > 0 && (
                    <div className="flex items-start gap-2.5 rounded-lg border border-danger-200 bg-danger-0 p-3.5">
                      <Paperclip className="h-5 w-5 flex-shrink-0 text-danger-600" aria-hidden="true" />
                      <div className="flex flex-col gap-2 text-body-xs text-danger-900">
                        <p>
                          <span className="font-bold">
                            {report.attachmentsFoundCount} Embedded Attachment
                            {report.attachmentsFoundCount > 1 ? "s" : ""} Found:
                          </span>{" "}
                          {report.attachmentNames.join(", ")}. This is a C2PA &quot;Content
                          Credentials&quot; manifest — a signed record some AI tools embed that
                          names the generating app/model. Removed on download.
                        </p>
                        {report.aiProvenance && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-md border border-danger-200 bg-white p-2.5">
                            {report.aiProvenance.generatorName && (
                              <div>
                                <span className="text-neutral-500 block">Declared Generator App:</span>
                                <span className="font-bold text-danger-900">{report.aiProvenance.generatorName}</span>
                              </div>
                            )}
                            {report.aiProvenance.softwareAgentName && (
                              <div>
                                <span className="text-neutral-500 block">Declared Model / Software Agent:</span>
                                <span className="font-bold text-danger-900">
                                  {report.aiProvenance.softwareAgentName}
                                </span>
                              </div>
                            )}
                            {report.aiProvenance.digitalSourceType && (
                              <div>
                                <span className="text-neutral-500 block">Declared Source Type:</span>
                                <span className="font-bold text-danger-900">
                                  {report.aiProvenance.digitalSourceType}
                                </span>
                              </div>
                            )}
                            {report.aiProvenance.createdAt && (
                              <div>
                                <span className="text-neutral-500 block">Signed At:</span>
                                <span className="font-bold text-danger-900">{report.aiProvenance.createdAt}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                );
              })()}

              {phase === "cleaned" && (
                <div className="flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 p-3.5 text-left">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary-700" aria-hidden="true" />
                  <p className="text-body-sm font-bold text-primary-900">
                    Cleaned — the fields above have been stripped from the file below.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons Bar */}
          {file && (
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
              {phase === "analyzed" && (
                <button
                  type="button"
                  onClick={handleClean}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <Wand2 className="h-5 w-5" aria-hidden="true" />
                  Clean PDF
                </button>
              )}
              {phase === "cleaning" && (
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-neutral-300 px-8 py-3.5 sm:py-4 text-button text-neutral-500 cursor-not-allowed"
                >
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Cleaning&hellip;
                </button>
              )}
              {phase === "cleaned" && cleanedBlob && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Download Sanitized PDF
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 py-2 text-body-sm font-bold text-neutral-600 transition-colors duration-200 hover:text-primary-600"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset PDF
              </button>
            </div>
          )}
        </form>

        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-bold text-primary-900 sm:text-xl">
            {heading ?? "Clean PDF Metadata & Author Info"}
          </h1>
          <p className="text-body-sm text-neutral-600">
            {subheading ??
              "Strip hidden author tags, creation timestamps, title, producer, and software metadata from PDF files in your browser."}
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-body-sm text-neutral-500">
          <ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden="true" />
          Private. 100% Browser-based processing. Zero server storage.
        </p>
      </div>
    </section>
  );
}
