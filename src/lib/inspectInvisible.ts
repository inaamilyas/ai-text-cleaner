/**
 * Invisible Character Inspection & Visualization Utility.
 * Scans strings character by character and extracts hidden zero-width spaces (U+200B),
 * non-breaking spaces (U+00A0), soft hyphens (U+00AD), BOM markers (U+FEFF),
 * directional Unicode controls, C0 control characters, invisible math/word-joiner
 * operators, and Unicode Tag characters (U+E0000-U+E007F) — the mechanism behind
 * "ASCII smuggling" hidden-text/prompt-injection payloads.
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

// Ranges not covered by the named INVISIBLE_MAP above: C0 controls (tab/LF/CR
// excluded \u2014 those are legitimate formatting), invisible math/word-joiner
// operators, directional isolates, and the Unicode Tag block. Checked by code
// point rather than UTF-16 code unit, since Tag characters live outside the
// Basic Multilingual Plane and are encoded as surrogate pairs.
function classifyChar(ch: string): { name: string; color: string } | null {
  const named = INVISIBLE_MAP[ch];
  if (named) return named;

  const cp = ch.codePointAt(0) ?? 0;

  if (cp <= 0x08 || cp === 0x0b || cp === 0x0c || (cp >= 0x0e && cp <= 0x1f) || cp === 0x7f) {
    return { name: "Control Character", color: "bg-orange-600 text-white" };
  }

  if (cp >= 0x2060 && cp <= 0x2064) {
    return { name: "Invisible Math / Word-Joiner Operator", color: "bg-fuchsia-600 text-white" };
  }

  if (cp >= 0x2066 && cp <= 0x2069) {
    return { name: "Directional Isolate Control", color: "bg-cyan-800 text-white" };
  }

  if (cp >= 0xe0000 && cp <= 0xe007f) {
    return { name: "Unicode Tag Character (hidden text / prompt injection)", color: "bg-red-800 text-white" };
  }

  return null;
}

export function inspectInvisibleCharacters(text: string): InvisibleInspectionResult {
  const segments: InvisibleCharSegment[] = [];
  const counts: Record<string, number> = {};
  let totalInvisibleCount = 0;
  let currentVisibleStr = "";
  let idx = 0;

  for (const ch of text) {
    const info = classifyChar(ch);

    if (info) {
      if (currentVisibleStr) {
        segments.push({
          id: `vis-${idx}-${Math.random()}`,
          char: currentVisibleStr,
          name: "Visible Text",
          codePoint: "",
          isInvisible: false,
          colorClass: "",
        });
        currentVisibleStr = "";
      }

      const cp = ch.codePointAt(0) ?? 0;
      const hexCode = "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
      counts[info.name] = (counts[info.name] || 0) + 1;
      totalInvisibleCount++;

      segments.push({
        id: `invis-${idx}-${Math.random()}`,
        char: ch,
        name: info.name,
        codePoint: hexCode,
        isInvisible: true,
        colorClass: info.color,
      });
    } else {
      currentVisibleStr += ch;
    }
    idx++;
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

  const cleanedText = Array.from(text)
    .filter((ch) => !classifyChar(ch))
    .join("");

  return {
    segments,
    counts,
    totalInvisibleCount,
    cleanedText,
  };
}

export function getSampleInvisibleText(): string {
  return "Here\u200Bis\u200Ba\u00A0sample\u200Ctext\uFEFFwith\u200Dhidden\u00ADunicode\u200Bspaces\u2060and\u200Ba hidden \u{E0001}\u{E0074}\u{E0061}\u{E0067}\u{E007F} tag payload injected by ChatGPT!";
}
