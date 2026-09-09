'use client';

import { useState } from "react";
import { FileText, ShieldCheck, Download, Trash2, AlertCircle, FileCheck, CheckCircle2 } from "lucide-react";
import { inspectPdfMetadata, sanitizePdfMetadata, PdfMetadataReport } from "@/lib/cleanPdfMetadata";

export default function PdfMetadataSanitizer() {
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
    } catch (err) {
      console.error(err);
      alert("Error reading PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob || !file) return;
    const url = URL.createObjectURL(cleanedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleaned-${file.name}`;
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Tool Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          PDF & Document Metadata Sanitizer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
          Strip hidden author tags, creation timestamps, title, producer, and software metadata from PDF files in your browser. 
          <span className="font-semibold text-emerald-600 block mt-1">100% Client-Side Privacy — Zero Server Uploads.</span>
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="bg-white border-2 border-dashed border-slate-300 hover:border-emerald-500 transition-colors rounded-2xl p-8 text-center shadow-sm">
        {!file ? (
          <label className="cursor-pointer flex flex-col items-center justify-center space-y-4 py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-800 hover:text-emerald-600">
                Click to upload PDF file
              </span>
              <p className="text-sm text-slate-500 mt-1">or drag and drop your PDF here</p>
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
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-3 text-left">
                <FileCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 truncate max-w-xs sm:max-w-md">{file.name}</h3>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-200 transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Metadata Audit Results */}
            {report && (
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" /> Detected Metadata Fields
                  </h4>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    report.fieldsFoundCount > 0
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {report.fieldsFoundCount > 0
                      ? `${report.fieldsFoundCount} Metadata Fields Found`
                      : "Clean PDF (No Hidden EXIF)"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">Author:</span>
                    <span className="font-medium text-slate-800">{report.author || "— Not Set —"}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">Creator / Application:</span>
                    <span className="font-medium text-slate-800">{report.creator || "— Not Set —"}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">Producer:</span>
                    <span className="font-medium text-slate-800">{report.producer || "— Not Set —"}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">Creation Date:</span>
                    <span className="font-medium text-slate-800">{report.creationDate || "— Not Set —"}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">Document Title:</span>
                    <span className="font-medium text-slate-800">{report.title || "— Not Set —"}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block">Keywords / Tags:</span>
                    <span className="font-medium text-slate-800">{report.keywords || "— Not Set —"}</span>
                  </div>
                </div>

                {/* Download Clean PDF Button */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Sanitized PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800">100% In-Browser Safety</h3>
          <p className="text-xs text-slate-600">Your PDF files never leave your computer. Parsing and metadata stripping are executed in memory.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800">Wipes Hidden Author Tags</h3>
          <p className="text-xs text-slate-600">Eliminates author names, computer usernames, application versions, and PDF creation timestamps.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800">Preserves Visual Quality</h3>
          <p className="text-xs text-slate-600">Only metadata header streams are neutralized. Page layouts, vector graphics, and fonts remain untouched.</p>
        </div>
      </div>
    </div>
  );
}
