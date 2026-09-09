/**
 * Unicode Homoglyph & Confusable Character Sanitizer.
 * Detects Cyrillic, Greek, or Latin look-alike characters (e.g. Cyrillic 'а' U+0430 vs Latin 'a' U+0061)
 * that are injected into text to confuse search engines, AI detectors, or bypass filters.
 */

export interface HomoglyphReplacement {
  index: number;
  originalChar: string;
  codePoint: string;
  replacedChar: string;
  scriptName: string;
}

export interface HomoglyphResult {
  originalText: string;
  cleanedText: string;
  replacements: HomoglyphReplacement[];
  totalHomoglyphsCount: number;
}

// Map of common Cyrillic, Greek, and Unicode confusables to standard ASCII Latin equivalents
const HOMOGLYPH_MAP: Record<string, { ascii: string; script: string }> = {
  // Lowercase Cyrillic
  "\u0430": { ascii: "a", script: "Cyrillic Small Letter A" },
  "\u0441": { ascii: "c", script: "Cyrillic Small Letter ES" },
  "\u0435": { ascii: "e", script: "Cyrillic Small Letter IE" },
  "\u0456": { ascii: "i", script: "Cyrillic Small Letter BYELORUSSIAN-UKRAINIAN I" },
  "\u0455": { ascii: "s", script: "Cyrillic Small Letter DZE" },
  "\u043E": { ascii: "o", script: "Cyrillic Small Letter O" },
  "\u0440": { ascii: "p", script: "Cyrillic Small Letter ER" },
  "\u0445": { ascii: "x", script: "Cyrillic Small Letter HA" },
  "\u0443": { ascii: "y", script: "Cyrillic Small Letter U" },
  "\u0453": { ascii: "g", script: "Cyrillic Small Letter GJE" },
  "\u0458": { ascii: "j", script: "Cyrillic Small Letter JE" },

  // Uppercase Cyrillic
  "\u0410": { ascii: "A", script: "Cyrillic Capital Letter A" },
  "\u0412": { ascii: "B", script: "Cyrillic Capital Letter VE" },
  "\u0421": { ascii: "C", script: "Cyrillic Capital Letter ES" },
  "\u0415": { ascii: "E", script: "Cyrillic Capital Letter IE" },
  "\u041D": { ascii: "H", script: "Cyrillic Capital Letter EN" },
  "\u041A": { ascii: "K", script: "Cyrillic Capital Letter KA" },
  "\u041C": { ascii: "M", script: "Cyrillic Capital Letter EM" },
  "\u041E": { ascii: "O", script: "Cyrillic Capital Letter O" },
  "\u0420": { ascii: "P", script: "Cyrillic Capital Letter ER" },
  "\u0422": { ascii: "T", script: "Cyrillic Capital Letter TE" },
  "\u0425": { ascii: "X", script: "Cyrillic Capital Letter HA" },
  "\u042F": { ascii: "R", script: "Cyrillic Capital Letter YA" },

  // Greek
  "\u03B1": { ascii: "a", script: "Greek Small Letter Alpha" },
  "\u03BF": { ascii: "o", script: "Greek Small Letter Omicron" },
  "\u03C1": { ascii: "p", script: "Greek Small Letter Rho" },
  "\u03C5": { ascii: "y", script: "Greek Small Letter Upsilon" },
  "\u03BD": { ascii: "v", script: "Greek Small Letter Nu" },
};

export function cleanHomoglyphs(text: string): HomoglyphResult {
  const replacements: HomoglyphReplacement[] = [];
  let cleaned = "";

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const match = HOMOGLYPH_MAP[ch];

    if (match) {
      const codePoint = "U+" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
      replacements.push({
        index: i,
        originalChar: ch,
        codePoint,
        replacedChar: match.ascii,
        scriptName: match.script,
      });
      cleaned += match.ascii;
    } else {
      cleaned += ch;
    }
  }

  return {
    originalText: text,
    cleanedText: cleaned,
    replacements,
    totalHomoglyphsCount: replacements.length,
  };
}

export function getSampleHomoglyphText(): string {
  // Contains Cyrillic 'а', 'е', 'о', 'р' mixed into English words
  return "Th\u0435 quick br\u043Ewn f\u043Ex jumps \u043Ev\u0435r th\u0435 l\u0430zy d\u043Eg.";
}
