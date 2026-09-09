/**
 * Invisible Character Inspection & Visualization Utility.
 * Scans strings character by character and extracts hidden zero-width spaces (U+200B),
 * non-breaking spaces (U+00A0), soft hyphens (U+00AD), BOM markers (U+FEFF),
 * and directional Unicode controls.
 */

export interface InvisibleCharSegment {
  id: string;
  char: string;
  name: string;
  codePoint: string;
  isInvisible: boolean;
  colorClass: string;
}

export interface InvisibleInspectionResult {
  segments: InvisibleCharSegment[];
  counts: Record<string, number>;
  totalInvisibleCount: number;
  cleanedText: string;
}

const INVISIBLE_MAP: Record<string, { name: string; color: string }> = {
  "\u200B": { name: "Zero-Width Space", color: "bg-rose-500 text-white" },
  "\u200C": { name: "Zero-Width Non-Joiner", color: "bg-amber-500 text-white" },
  "\u200D": { name: "Zero-Width Joiner", color: "bg-purple-500 text-white" },
  "\uFEFF": { name: "Byte Order Mark (BOM)", color: "bg-red-600 text-white" },
  "\u00A0": { name: "Non-Breaking Space (NBSP)", color: "bg-blue-500 text-white" },
  "\u00AD": { name: "Soft Hyphen", color: "bg-yellow-500 text-white" },
  "\u2028": { name: "Line Separator", color: "bg-emerald-600 text-white" },
  "\u2029": { name: "Paragraph Separator", color: "bg-teal-600 text-white" },
  "\u200E": { name: "Left-To-Right Mark", color: "bg-indigo-500 text-white" },
  "\u200F": { name: "Right-To-Left Mark", color: "bg-pink-500 text-white" },
  "\u202A": { name: "LTR Embedding", color: "bg-cyan-600 text-white" },
  "\u202B": { name: "RTL Embedding", color: "bg-pink-600 text-white" },
  "\u202C": { name: "Pop Directional Format", color: "bg-neutral-600 text-white" },
  "\u202D": { name: "LTR Override", color: "bg-cyan-700 text-white" },
  "\u202E": { name: "RTL Override", color: "bg-pink-700 text-white" },
};

export function inspectInvisibleCharacters(text: string): InvisibleInspectionResult {
  const segments: InvisibleCharSegment[] = [];
  const counts: Record<string, number> = {};
  let totalInvisibleCount = 0;
  let currentVisibleStr = "";

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const info = INVISIBLE_MAP[ch];

    if (info) {
      if (currentVisibleStr) {
        segments.push({
          id: `vis-${i}-${Math.random()}`,
          char: currentVisibleStr,
          name: "Visible Text",
          codePoint: "",
          isInvisible: false,
          colorClass: "",
        });
        currentVisibleStr = "";
      }

      const hexCode = "U+" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
      counts[info.name] = (counts[info.name] || 0) + 1;
      totalInvisibleCount++;

      segments.push({
        id: `invis-${i}-${Math.random()}`,
        char: ch,
        name: info.name,
        codePoint: hexCode,
        isInvisible: true,
        colorClass: info.color,
      });
    } else {
      currentVisibleStr += ch;
    }
  }

  if (currentVisibleStr) {
    segments.push({
      id: `vis-end-${Math.random()}`,
      char: currentVisibleStr,
      name: "Visible Text",
      codePoint: "",
      isInvisible: false,
      colorClass: "",
    });
  }

  const cleanedText = text.replace(/[\u200B-\u200D\uFEFF\u00A0\u00AD\u2028\u2029\u200E\u200F\u202A-\u202E]/g, "");

  return {
    segments,
    counts,
    totalInvisibleCount,
    cleanedText,
  };
}

export function getSampleInvisibleText(): string {
  return "Here\u200Bis\u200Ba\u00A0sample\u200Ctext\uFEFFwith\u200Dhidden\u00ADunicode\u200Bspaces injected by ChatGPT!";
}
