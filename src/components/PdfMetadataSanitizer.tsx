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
} from "lucide-react";
import { inspectPdfMetadata, sanitizePdfMetadata, type PdfMetadataReport } from "@/lib/cleanPdfMetadata";
import { trackCleanTextRun, trackDownloadFile } from "@/lib/analytics";

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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const inspectedReport = inspectPdfMetadata(selectedFile, buffer);
      const cleanResult = sanitizePdfMetadata(selectedFile, buffer);

      setReport(inspectedReport);
      setCleanedBlob(cleanResult.cleanedBlob);

      trackCleanTextRun({
        toolName: "clean_pdf_metadata",
        inputWords: 0,
        inputChars: selectedFile.size,
        changesCount: inspectedReport.fieldsFoundCount,
      });
    } catch (err) {
      console.error(err);
      alert("Error reading PDF file.");
    } finally {
      setIsProcessing(false);
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
  };

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

              {/* Metadata Audit Results */}
              {report && (
                <div className="flex flex-col gap-4 text-left border-t border-neutral-200 pt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-body-sm font-bold text-neutral-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary-600" /> Detected Metadata Properties
                    </h4>
                    <span className={`px-2.5 py-0.5 text-body-xs font-bold rounded ${
                      report.fieldsFoundCount > 0
                        ? "bg-amber-100 text-amber-900 border border-amber-200"
                        : "bg-primary-100 text-primary-800"
                    }`}>
                      {report.fieldsFoundCount > 0
                        ? `${report.fieldsFoundCount} Hidden Metadata Fields`
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
                      <span className="text-body-xs text-neutral-500 block">Document Title:</span>
                      <span className="font-medium text-neutral-900">{report.title || "— Not Set —"}</span>
                    </div>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="text-body-xs text-neutral-500 block">Keywords / Subject:</span>
                      <span className="font-medium text-neutral-900">{report.keywords || "— Not Set —"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons Bar */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 border-t border-neutral-200 pt-6">
            {cleanedBlob ? (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-8 py-3.5 sm:py-4 text-button text-neutral-50 transition-colors duration-200 hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download Sanitized PDF
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleReset}
              disabled={!file}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 py-2 text-body-sm font-bold text-neutral-600 transition-colors duration-200 hover:text-primary-600 disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset PDF
            </button>
          </div>
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
