/**
 * Client-Side PDF Metadata Sanitizer & Inspector.
 * 100% Private in-browser parser that extracts and strips hidden document
 * metadata (Author, Creator, Producer, CreationDate, ModDate, Keywords,
 * Title, the embedded XMP metadata stream, and embedded file attachments
 * such as C2PA "Content Credentials" manifests) from PDF files.
 *
 * Uses pdf-lib's structured PDF parser, which decompresses object streams
 * as part of loading the document — a naive byte-level regex scan (the
 * previous approach here) cannot see metadata stored inside a compressed
 * object stream, which is how most PDFs from Word, Google Docs, and many
 * Adobe/browser "print to PDF" workflows store the Info dictionary. If
 * structured parsing fails (e.g. a malformed or exotic PDF), we fall back
 * to the old text-scan approach and mark the result accordingly so the UI
 * can be honest about reduced confidence instead of silently claiming a
 * complete clean.
 *
 * Embedded file attachments deserve special attention: tools that stamp
 * C2PA content-provenance data (e.g. ChatGPT's PDF export) don't put it in
 * the Info dictionary or XMP stream at all — they attach it as a separate
 * file via the catalog's /AF array and /Names/EmbeddedFiles tree, often as
 * an incremental update appended after the original file. That attachment
 * can carry an explicit, cryptographically-signed "created by ChatGPT"
 * claim, so it must be found and removed just like the standard fields.
 */

import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef, PDFString, PDFHexString } from "pdf-lib";

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
  hasEmbeddedXmp: boolean;
  attachmentsFoundCount: number;
  attachmentNames: string[];
  parseMethod: "structured" | "fallback-text-scan";
}

export interface PdfCleanResult {
  cleanedBlob: Blob;
  report: PdfMetadataReport;
  cleanedBytesCount: number;
  fullyCleaned: boolean;
}

const METADATA_KEYS = [
  "Title",
  "Author",
  "Subject",
  "Keywords",
  "Creator",
  "Producer",
  "CreationDate",
  "ModDate",
] as const;

async function loadPdfDocument(buffer: ArrayBuffer): Promise<PDFDocument> {
  return PDFDocument.load(buffer, {
    ignoreEncryption: true,
    updateMetadata: false,
    throwOnInvalidObject: false,
  });
}

/**
 * Finds every Filespec attached via the catalog's /AF array and/or its
 * /Names/EmbeddedFiles name tree (the standard PDF "associated file"
 * mechanism — how C2PA Content Credentials, and any other file
 * attachment, get embedded). Read-only: used by both the inspector and
 * the sanitizer so they agree on what's present.
 */
function findAssociatedFileSpecs(pdfDoc: PDFDocument): { fileSpecRefs: Set<PDFRef>; names: string[] } {
  const { context, catalog } = pdfDoc;
  const fileSpecRefs = new Set<PDFRef>();

  const afArray = context.lookupMaybe(catalog.get(PDFName.of("AF")), PDFArray);
  afArray?.asArray().forEach((item) => {
    if (item instanceof PDFRef) fileSpecRefs.add(item);
  });

  const namesDict = context.lookupMaybe(catalog.get(PDFName.of("Names")), PDFDict);
  const embeddedFilesDict = context.lookupMaybe(namesDict?.get(PDFName.of("EmbeddedFiles")), PDFDict);
  const efNamesArray = context.lookupMaybe(embeddedFilesDict?.get(PDFName.of("Names")), PDFArray);
  const efNameItems = efNamesArray?.asArray() ?? [];
  for (let i = 1; i < efNameItems.length; i += 2) {
    const item = efNameItems[i];
    if (item instanceof PDFRef) fileSpecRefs.add(item);
  }

  const names: string[] = [];
  fileSpecRefs.forEach((ref) => {
    const fileSpecDict = context.lookupMaybe(ref, PDFDict);
    const desc =
      fileSpecDict?.lookupMaybe(PDFName.of("Desc"), PDFString, PDFHexString) ??
      fileSpecDict?.lookupMaybe(PDFName.of("F"), PDFString, PDFHexString) ??
      fileSpecDict?.lookupMaybe(PDFName.of("UF"), PDFString, PDFHexString);
    names.push(desc?.decodeText() || "Embedded file");
  });

  return { fileSpecRefs, names };
}

function extractReportFromDoc(file: File, pdfDoc: PDFDocument): PdfMetadataReport {
  const title = pdfDoc.getTitle();
  const author = pdfDoc.getAuthor();
  const subject = pdfDoc.getSubject();
  const keywords = pdfDoc.getKeywords();
  const creator = pdfDoc.getCreator();
  const producer = pdfDoc.getProducer();
  const creationDate = pdfDoc.getCreationDate()?.toISOString();
  const modDate = pdfDoc.getModificationDate()?.toISOString();
  const hasEmbeddedXmp = pdfDoc.catalog.get(PDFName.of("Metadata")) !== undefined;
  const { fileSpecRefs, names } = findAssociatedFileSpecs(pdfDoc);

  const fieldsFoundCount = [title, author, subject, keywords, creator, producer, creationDate, modDate].filter(
    (v) => !!v
  ).length;

  return {
    fileName: file.name,
    fileSizeBytes: file.size,
    title,
    author,
    subject,
    keywords,
    creator,
    producer,
    creationDate,
    modDate,
    hasMetadata: fieldsFoundCount > 0 || hasEmbeddedXmp || fileSpecRefs.size > 0,
    fieldsFoundCount,
    hasEmbeddedXmp,
    attachmentsFoundCount: fileSpecRefs.size,
    attachmentNames: names,
    parseMethod: "structured",
  };
}

/**
 * Inspects a PDF for standard metadata fields without modifying it.
 */
export async function inspectPdfMetadata(file: File, buffer: ArrayBuffer): Promise<PdfMetadataReport> {
  try {
    const pdfDoc = await loadPdfDocument(buffer);
    return extractReportFromDoc(file, pdfDoc);
  } catch (err) {
    console.warn("Structured PDF parse failed, falling back to text scan:", err);
    return inspectPdfMetadataFallback(file, buffer);
  }
}

/**
 * Strips PDF metadata: deletes the Info dictionary's standard fields and
 * removes the embedded XMP metadata stream object entirely (not just the
 * catalog reference to it — pdf-lib serializes every indirect object it
 * still holds regardless of reachability, so an unlinked-but-undeleted
 * stream would still ship in the output file).
 */
export async function sanitizePdfMetadata(file: File, buffer: ArrayBuffer): Promise<PdfCleanResult> {
  try {
    const pdfDoc = await loadPdfDocument(buffer);
    const report = extractReportFromDoc(file, pdfDoc);

    const infoDict = pdfDoc.context.lookupMaybe(pdfDoc.context.trailerInfo.Info, PDFDict);
    if (infoDict) {
      METADATA_KEYS.forEach((key) => infoDict.delete(PDFName.of(key)));
    }

    const metadataEntry = pdfDoc.catalog.get(PDFName.of("Metadata"));
    if (metadataEntry instanceof PDFRef) {
      pdfDoc.context.delete(metadataEntry);
    }
    pdfDoc.catalog.delete(PDFName.of("Metadata"));

    // Remove associated-file attachments (C2PA Content Credentials and any
    // other embedded file reachable from /AF or /Names/EmbeddedFiles). Each
    // Filespec's /EF entries point to the actual embedded-file stream —
    // those must be deleted too, not just the Filespec, for the same reason
    // as the XMP stream above: pdf-lib serializes every indirect object it
    // still holds regardless of reachability.
    const { fileSpecRefs } = findAssociatedFileSpecs(pdfDoc);
    fileSpecRefs.forEach((fileSpecRef) => {
      const fileSpecDict = pdfDoc.context.lookupMaybe(fileSpecRef, PDFDict);
      const efDict = pdfDoc.context.lookupMaybe(fileSpecDict?.get(PDFName.of("EF")), PDFDict);
      efDict?.entries().forEach(([, value]) => {
        if (value instanceof PDFRef) pdfDoc.context.delete(value);
      });
      pdfDoc.context.delete(fileSpecRef);
    });
    if (fileSpecRefs.size > 0) {
      pdfDoc.catalog.delete(PDFName.of("AF"));
      const namesDict = pdfDoc.context.lookupMaybe(pdfDoc.catalog.get(PDFName.of("Names")), PDFDict);
      namesDict?.delete(PDFName.of("EmbeddedFiles"));
      if (namesDict && namesDict.keys().length === 0) {
        pdfDoc.catalog.delete(PDFName.of("Names"));
      }
    }

    const cleanedBytes = await pdfDoc.save();
    const cleanedBlob = new Blob([cleanedBytes as BlobPart], { type: "application/pdf" });

    return {
      cleanedBlob,
      report,
      cleanedBytesCount:
        report.fieldsFoundCount + (report.hasEmbeddedXmp ? 1 : 0) + report.attachmentsFoundCount,
      fullyCleaned: true,
    };
  } catch (err) {
    console.warn("Structured PDF sanitize failed, falling back to raw byte scan:", err);
    return sanitizePdfMetadataFallback(file, buffer);
  }
}

// ---------------------------------------------------------------------------
// Fallback path: naive byte-level regex scan, used only when pdf-lib cannot
// parse the file. This cannot see metadata inside compressed object streams,
// so results from this path are marked `fullyCleaned: false` / a
// `fallback-text-scan` parse method rather than presented as guaranteed.
// ---------------------------------------------------------------------------

function inspectPdfMetadataFallback(file: File, buffer: ArrayBuffer): PdfMetadataReport {
  const bytes = new Uint8Array(buffer);
  const textDecoder = new TextDecoder("latin1");
  const pdfText = textDecoder.decode(bytes);

  const extractField = (key: string): string | undefined => {
    const literalRegex = new RegExp(`/${key}\\s*\\(([^)]*)\\)`, "i");
    const literalMatch = pdfText.match(literalRegex);
    if (literalMatch && literalMatch[1]) {
      return literalMatch[1].trim();
    }

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

  const title = extractField("Title");
  const author = extractField("Author");
  const subject = extractField("Subject");
  const keywords = extractField("Keywords");
  const creator = extractField("Creator");
  const producer = extractField("Producer");
  const creationDate = extractField("CreationDate");
  const modDate = extractField("ModDate");

  const fieldsFoundCount = [title, author, subject, keywords, creator, producer, creationDate, modDate].filter(
    (v) => !!v
  ).length;
  const hasEmbeddedXmp = pdfText.includes("/Metadata") || pdfText.includes("http://ns.adobe.com/xap/");
  // The fallback scan can't safely walk /AF or /Names/EmbeddedFiles (they're
  // indirect-object trees, not a flat pattern), but a raw "/AF" occurrence
  // is still a reliable signal that an attachment exists so the UI can warn
  // instead of silently missing it.
  const hasAssociatedFileMarker = /\/AF\s*[\[R]/.test(pdfText) || pdfText.includes("/EmbeddedFile");

  return {
    fileName: file.name,
    fileSizeBytes: file.size,
    title,
    author,
    subject,
    keywords,
    creator,
    producer,
    creationDate,
    modDate,
    hasMetadata: fieldsFoundCount > 0 || hasEmbeddedXmp || hasAssociatedFileMarker,
    fieldsFoundCount,
    hasEmbeddedXmp,
    attachmentsFoundCount: hasAssociatedFileMarker ? 1 : 0,
    attachmentNames: hasAssociatedFileMarker ? ["Embedded file (unable to parse — see warning above)"] : [],
    parseMethod: "fallback-text-scan",
  };
}

function sanitizePdfMetadataFallback(file: File, buffer: ArrayBuffer): PdfCleanResult {
  const report = inspectPdfMetadataFallback(file, buffer);
  const bytes = new Uint8Array(buffer.slice(0));
  const textDecoder = new TextDecoder("latin1");
  let pdfText = textDecoder.decode(bytes);
  let cleanedCount = 0;

  METADATA_KEYS.forEach((key) => {
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

  const xmpRegex = /<x:xmpmeta[\s\S]*?<\/x:xmpmeta>/gi;
  pdfText = pdfText.replace(xmpRegex, (match) => {
    cleanedCount++;
    return " ".repeat(match.length);
  });

  const resultBytes = new Uint8Array(pdfText.length);
  for (let i = 0; i < pdfText.length; i++) {
    resultBytes[i] = pdfText.charCodeAt(i) & 0xff;
  }

  const cleanedBlob = new Blob([resultBytes], { type: "application/pdf" });

  return {
    cleanedBlob,
    report,
    cleanedBytesCount: cleanedCount,
    fullyCleaned: false,
  };
}
