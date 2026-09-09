/**
 * Comprehensive Case Converter & Accent / Diacritic Normalizer.
 * Supports Title Case, UPPERCASE, lowercase, camelCase, PascalCase, snake_case,
 * kebab-case, CONSTANT_CASE, Sentence case, URL Slugs, and ASCII normalization.
 */

export interface CaseConversionResults {
  original: string;
  uppercase: string;
  lowercase: string;
  titleCase: string;
  sentenceCase: string;
  camelCase: string;
  pascalCase: string;
  snakeCase: string;
  kebabCase: string;
  constantCase: string;
  slug: string;
  asciiNormalized: string;
  stats: {
    characters: number;
    words: number;
    sentences: number;
    lines: number;
  };
}

export function normalizeAscii(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Strip diacritics
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/ß/g, "ss")
    .replace(/ø/g, "o")
    .replace(/ð/g, "d")
    .replace(/þ/g, "th");
}

function extractWords(text: string): string[] {
  const normalized = normalizeAscii(text);
  return normalized
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function toTitleCase(text: string): string {
  const minorWords = new Set(["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "from", "by", "of", "in", "with"]);
  return text.replace(/\b[a-zA-Z]+\b/g, (word, index) => {
    const lower = word.toLowerCase();
    if (index > 0 && minorWords.has(lower)) {
      return lower;
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}

export function toSentenceCase(text: string): string {
  return text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (_match, prefix, char) => {
    return prefix + char.toUpperCase();
  });
}

export function convertCase(text: string): CaseConversionResults {
  const words = extractWords(text);

  const uppercase = text.toUpperCase();
  const lowercase = text.toLowerCase();
  const titleCase = toTitleCase(text);
  const sentenceCase = toSentenceCase(text);
  const asciiNormalized = normalizeAscii(text);

  const lowerWords = words.map((w) => w.toLowerCase());
  const capitalizedWords = lowerWords.map((w) => w.charAt(0).toUpperCase() + w.slice(1));

  const camelCase = lowerWords.length > 0
    ? lowerWords[0] + capitalizedWords.slice(1).join("")
    : "";

  const pascalCase = capitalizedWords.join("");
  const snakeCase = lowerWords.join("_");
  const kebabCase = lowerWords.join("-");
  const constantCase = lowerWords.join("_").toUpperCase();
  const slug = lowerWords.join("-").replace(/[^a-z0-9-]/g, "");

  const sentencesCount = (text.match(/[.!?]+(\s|$)/g) || []).length || (text.trim().length > 0 ? 1 : 0);
  const linesCount = text ? text.split("\n").length : 0;

  return {
    original: text,
    uppercase,
    lowercase,
    titleCase,
    sentenceCase,
    camelCase,
    pascalCase,
    snakeCase,
    kebabCase,
    constantCase,
    slug,
    asciiNormalized,
    stats: {
      characters: text.length,
      words: words.length,
      sentences: sentencesCount,
      lines: linesCount,
    },
  };
}
