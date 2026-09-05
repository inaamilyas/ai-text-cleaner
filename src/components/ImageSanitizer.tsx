'use client';

import { useState } from "react";
import {
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Download,
  Sparkles,
  Trash2,
  AlertTriangle,
  FileText,
  Info,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { cleanImageMetadata, type ImageCleaningResult } from "@/lib/cleanImage";
import { readImageMetadata, type DetectedMetadata } from "@/lib/readImageMetadata";
import { IMAGE_METADATA_TRANSLATIONS } from "@/lib/i18n/imageMetadataTranslations";

export default function ImageSanitizer({ langCode = "en" }: { langCode?: string }) {
  const t = IMAGE_METADATA_TRANSLATIONS[langCode] || IMAGE_METADATA_TRANSLATIONS.en;
  const isRtl = langCode === "ar";

  const [loading, setLoading] = useState(false);
  const [inspecting, setInspecting] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<DetectedMetadata | null>(null);
  const [result, setResult] = useState<ImageCleaningResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [disruptPatterns, setDisruptPatterns] = useState(true);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPEG, WEBP).");
      return;
    }

    try {
      setInspecting(true);
      setError(null);
      setResult(null);
      setCurrentFile(file);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const meta = await readImageMetadata(file);
      setMetadata(meta);
    } catch (err) {
      setError("Failed to read image headers. Please try another file.");
    } finally {
      setInspecting(false);
    }
  }

  async function handleSanitizeNow() {
    if (!currentFile) return;
    try {
      setLoading(true);
      setError(null);
      const res = await cleanImageMetadata(currentFile, { disruptPatterns });
      setResult(res);
    } catch (err) {
      setError("Failed to clean image metadata. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result.previewUrl;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleReset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (result) URL.revokeObjectURL(result.previewUrl);
    setPreviewUrl(null);
    setCurrentFile(null);
    setMetadata(null);
    setResult(null);
    setError(null);
  }

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={`w-full max-w-4xl mx-auto rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 shadow-sm flex flex-col gap-6 ${isRtl ? "font-arabic" : ""}`}>
      <div className="flex flex-col gap-2 text-center">
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-body-xs font-bold text-primary-700 border border-primary-200">
          <Sparkles className="h-3.5 w-3.5" /> {t.badge}
        </span>
        <h1 className="text-h3 text-neutral-900 font-bold">{t.heading}</h1>
        <p className="text-body-md text-neutral-600 max-w-xl mx-auto">
          {t.subheading}
        </p>
      </div>

      {/* STEP 1: Upload Drop Area */}
      {!currentFile && !result && (
        <label className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-0 p-8 sm:p-12 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <UploadCloud className="h-7 w-7" />
          </div>
          <div>
            <p className="text-body-md font-bold text-neutral-800">
              {inspecting ? t.inspectingText : t.dropTitle}
            </p>
            <p className="text-body-xs text-neutral-500 mt-1">
              {t.dropSubtitle}
            </p>
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            disabled={inspecting}
            className="hidden"
          />
        </label>
      )}

      {/* STEP 2: Detected Metadata & Confirmation View (Pre-Sanitization) */}
      {currentFile && metadata && !result && (
        <div className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-neutral-0 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0 mx-auto md:mx-0">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            <div className={`flex flex-col gap-4 flex-1 ${isRtl ? "text-right" : "text-left"}`}>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <h3 className="text-h6 text-neutral-900 font-bold">{metadata.filename}</h3>
                  <p className="text-body-xs text-neutral-500">
                    {metadata.width} × {metadata.height} px • {formatBytes(metadata.fileSize)} • {metadata.mimeType}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-neutral-400 hover:text-danger-600 transition-colors p-1"
                  title="Remove image"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              {/* Detected Headers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <Info className="h-4 w-4 text-primary-600 shrink-0" />
                  <div>
                    <p className="text-body-xs font-bold text-neutral-500">{t.softwareLabel}</p>
                    <p className="text-body-sm font-bold text-neutral-800">
                      {metadata.software || "Standard / Unknown EXIF"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-body-xs font-bold text-neutral-500">{t.c2paLabel}</p>
                    <p className="text-body-sm font-bold text-neutral-800">
                      {metadata.hasC2PA ? "⚠️ Header Detected" : "None Detected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <FileText className="h-4 w-4 text-primary-600 shrink-0" />
                  <div>
                    <p className="text-body-xs font-bold text-neutral-500">{t.exifLabel}</p>
                    <p className="text-body-sm font-bold text-neutral-800">
                      {metadata.hasExif ? "EXIF Headers Present" : "Clean Header"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-danger-600 shrink-0" />
                  <div>
                    <p className="text-body-xs font-bold text-neutral-500">{t.promptLabel}</p>
                    <p className="text-body-sm font-bold text-neutral-800">
                      {metadata.promptText ? "⚠️ Hidden Prompt Embedded" : "No Direct Text Chunk"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Display prompt string if detected */}
              {metadata.promptText && (
                <div className={`rounded-lg border border-amber-200 bg-amber-50 p-3 ${isRtl ? "text-right" : "text-left"}`}>
                  <p className="text-body-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-700" /> {t.promptFoundWarning}
                  </p>
                  <p className="text-body-xs text-amber-950 font-mono break-all line-clamp-3 bg-amber-100/60 p-2 rounded border border-amber-200">
                    "{metadata.promptText}"
                  </p>
                </div>
              )}

              {/* Pattern Disruption Option */}
              <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 mt-1">
                <input
                  type="checkbox"
                  id="disrupt-toggle"
                  checked={disruptPatterns}
                  onChange={(e) => setDisruptPatterns(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <label htmlFor="disrupt-toggle" className={`cursor-pointer flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <span className="block text-body-xs font-bold text-neutral-900 flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-amber-500" /> {t.disruptTitle}
                  </span>
                  <span className="block text-body-xs text-neutral-500">
                    {t.disruptSubtitle}
                  </span>
                </label>
              </div>

              {/* Sanitize Action Button */}
              <button
                onClick={handleSanitizeNow}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-button font-bold text-neutral-50 hover:bg-primary-700 transition-colors shadow-md mt-2 disabled:opacity-50"
              >
                <Sparkles className="h-5 w-5" />
                {loading ? t.sanitizingText : t.sanitizeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Cleaned Image Success View */}
      {result && (
        <div className="flex flex-col gap-6 rounded-xl border border-primary-200 bg-neutral-0 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-44 w-44 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
              <img
                src={result.previewUrl}
                alt="Sanitized preview"
                className="h-full w-full object-contain"
              />
            </div>
            <div className={`flex flex-col gap-3 flex-1 ${isRtl ? "text-right" : "text-left"}`}>
              <div className="flex items-center gap-2 text-primary-700 font-bold text-h6">
                <CheckCircle2 className="h-6 w-6 text-primary-600" /> {t.successTitle}
              </div>
              <p className="text-body-sm text-neutral-600">
                {t.successDesc}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2.5 py-1 text-body-xs font-bold text-primary-800">
                  ✓ EXIF Wiped
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2.5 py-1 text-body-xs font-bold text-primary-800">
                  ✓ Prompts Erased
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2.5 py-1 text-body-xs font-bold text-primary-800">
                  ✓ Clean Canvas Re-render
                </span>
                {disruptPatterns && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-1 text-body-xs font-bold text-amber-900 border border-amber-300">
                    ⚡ AI Pattern Disrupted
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-button font-bold text-neutral-50 hover:bg-primary-700 transition-colors shadow-md"
            >
              <Download className="h-5 w-5" /> {t.downloadBtn}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-body-sm font-bold text-neutral-600 hover:text-danger-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" /> {t.cleanAnotherBtn}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-body-sm text-danger-600 font-bold text-center">{error}</p>
      )}

      <p className="flex items-center justify-center gap-1.5 text-body-xs text-neutral-500">
        <ShieldCheck className="h-4 w-4 text-primary-600" />
        {t.zeroUploads}
      </p>
    </div>
  );
}
