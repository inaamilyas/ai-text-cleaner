/**
 * Client-Side PDF Metadata Sanitizer & Inspector.
 * 100% Private in-browser binary parser that extracts and strips hidden document EXIF/Metadata
 * (Author, Creator, Producer, CreationDate, ModDate, Keywords, Title) from PDF files.
 */

export interface PdfMetadataReport {
  fileName: string;
  fileSizeBytes: number;
  author?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modDate?: string;
  title?: string;
  subject?: string;
  keywords?: string;
  hasMetadata: boolean;
  fieldsFoundCount: number;
}

export interface PdfCleanResult {
  cleanedBlob: Blob;
  report: PdfMetadataReport;
  cleanedBytesCount: number;
}

/**
 * Inspects a PDF ArrayBuffer for standard metadata strings without modifying it.
 */
export function inspectPdfMetadata(file: File, buffer: ArrayBuffer): PdfMetadataReport {
  const bytes = new Uint8Array(buffer);
  const textDecoder = new TextDecoder("latin1");
  const pdfText = textDecoder.decode(bytes);

  const report: PdfMetadataReport = {
    fileName: file.name,
    fileSizeBytes: file.size,
    hasMetadata: false,
    fieldsFoundCount: 0,
  };

  // Helper regex to extract PDF literal string /Author (Name) or hex string /Author <4e616d65>
  const extractField = (key: string): string | undefined => {
    // Standard literal string pattern: /Key\s*\(([^)]*)\)
    const literalRegex = new RegExp(`/${key}\\s*\\(([^)]*)\\)`, "i");
    const literalMatch = pdfText.match(literalRegex);
    if (literalMatch && literalMatch[1]) {
      return literalMatch[1].trim();
    }

    // Hex string pattern: /Key\s*<([0-9a-fA-F]+)>
    const hexRegex = new RegExp(`/${key}\\s*<([0-9a-fA-F]+)>`, "i");
    const hexMatch = pdfText.match(hexRegex);
    if (hexMatch && hexMatch[1]) {
      try {
        const hex = hexMatch[1];
        let str = "";
        for (let i = 0; i < hex.length; i += 2) {
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str.trim();
      } catch {
        return hexMatch[1];
      }
    }

    return undefined;
  };

  report.author = extractField("Author");
  report.creator = extractField("Creator");
  report.producer = extractField("Producer");
  report.creationDate = extractField("CreationDate");
  report.modDate = extractField("ModDate");
  report.title = extractField("Title");
  report.subject = extractField("Subject");
  report.keywords = extractField("Keywords");

  let count = 0;
  if (report.author) count++;
  if (report.creator) count++;
  if (report.producer) count++;
  if (report.creationDate) count++;
  if (report.modDate) count++;
  if (report.title) count++;
  if (report.subject) count++;
  if (report.keywords) count++;

  report.fieldsFoundCount = count;
  report.hasMetadata = count > 0 || pdfText.includes("/Metadata") || pdfText.includes("http://ns.adobe.com/xap/");

  return report;
}

/**
 * Strips PDF metadata tags by sanitizing literal string definitions and XMP metadata streams
 * directly in the binary ArrayBuffer in memory.
 */
export function sanitizePdfMetadata(file: File, buffer: ArrayBuffer): PdfCleanResult {
  const report = inspectPdfMetadata(file, buffer);
  const bytes = new Uint8Array(buffer.slice(0)); // Copy buffer
  const encoder = new TextEncoder();
  const textDecoder = new TextDecoder("latin1");
  let pdfText = textDecoder.decode(bytes);
  let cleanedCount = 0;

  const targetKeys = ["Author", "Creator", "Producer", "CreationDate", "ModDate", "Title", "Subject", "Keywords"];

  // 1. Neutralize /Key (value) entries by replacing string content with spaces
  targetKeys.forEach((key) => {
    const literalRegex = new RegExp(`(/${key}\\s*\\()([^)]*)(\\))`, "gi");
    pdfText = pdfText.replace(literalRegex, (_match, p1, p2, p3) => {
      cleanedCount++;
      return `${p1}${" ".repeat(p2.length)}${p3}`;
    });

    const hexRegex = new RegExp(`(/${key}\\s*<)([0-9a-fA-F]+)(>)`, "gi");
    pdfText = pdfText.replace(hexRegex, (_match, p1, p2, p3) => {
      cleanedCount++;
      return `${p1}${"0".repeat(p2.length)}${p3}`;
    });
  });

  // 2. Neutralize XML XMP metadata streams (<x:xmpmeta ... </x:xmpmeta>)
  const xmpRegex = /<x:xmpmeta[\s\S]*?<\/x:xmpmeta>/gi;
  pdfText = pdfText.replace(xmpRegex, (match) => {
    cleanedCount++;
    return " ".repeat(match.length);
  });

  // Convert back to ArrayBuffer / Blob
  const resultBytes = new Uint8Array(pdfText.length);
  for (let i = 0; i < pdfText.length; i++) {
    resultBytes[i] = pdfText.charCodeAt(i) & 0xff;
  }

  const cleanedBlob = new Blob([resultBytes], { type: "application/pdf" });

  return {
    cleanedBlob,
    report,
    cleanedBytesCount: cleanedCount,
  };
}
