import removeMarkdown from "remove-markdown";
import emojiRegex from "emoji-regex";

export type CleaningSummaryItem = {
  label: string;
  count: number;
};

export type CleaningResult = {
  cleaned: string;
  summary: CleaningSummaryItem[];
  totalChanges: number;
};

export const cleaningOptionsList = [
  { key: "removeHiddenCharacters", label: "Remove hidden characters" },
  { key: "convertNonBreakingSpaces", label: "Convert non-breaking spaces" },
  { key: "normalizeDashes", label: "Normalize dashes" },
  { key: "normalizeQuotes", label: "Normalize quotes" },
  { key: "convertEllipsis", label: "Convert ellipsis" },
  { key: "removeTrailingWhitespace", label: "Remove trailing whitespace" },
  { key: "removeMarkdown", label: "Remove markdown formatting" },
  { key: "normalizeUnicode", label: "Normalize Unicode forms" },
  { key: "removeEmoji", label: "Remove emoji" },
  { key: "removeDecorativeSymbols", label: "Remove decorative symbols" },
  { key: "removeAIWords", label: "Remove AI buzzwords (delve, tapestry...)" },
  { key: "removeLaTeX", label: "Remove LaTeX math markup" },
  { key: "removeHTML", label: "Strip HTML tags" },
  { key: "removeAIFluff", label: "Strip AI conversational intro/outro" },
] as const;

export type CleaningOptionKey = (typeof cleaningOptionsList)[number]["key"];
export type CleaningOptions = Record<CleaningOptionKey, boolean>;

export const defaultCleaningOptions: CleaningOptions = cleaningOptionsList.reduce(
  (options, { key }) => {
    options[key] = key !== "removeAIWords" && key !== "removeEmoji" && key !== "removeDecorativeSymbols" ? true : false;
    return options;
  },
  {} as CleaningOptions
);

// C0/C1 controls (keeping tab/LF/CR), soft hyphen, zero-width and
// directional-formatting characters, BOM, and Unicode tag characters.
const INVISIBLE_CHARS_REGEX = new RegExp(
  "[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F\\u00AD" +
    "\\u200B-\\u200F\\u202A-\\u202E\\u2060-\\u2064\\u2066-\\u2069\\uFEFF" +
    "\\u{E0000}-\\u{E007F}]",
  "gu"
);

// Fullwidth forms and alphabetic presentation form ligatures (e.g. "fi").
const COMPATIBILITY_CHARS_REGEX = new RegExp(
  "[\\uFF00-\\uFFEF\\uFB00-\\uFB4F]",
  "g"
);

const SMART_QUOTE_REGEX = new RegExp("[\\u201C\\u201D\\u201E\\u201F]", "g");
const SMART_APOSTROPHE_REGEX = new RegExp(
  "[\\u2018\\u2019\\u201A\\u201B]",
  "g"
);

const DASH_REGEX = new RegExp("[\\u2012\\u2013\\u2014\\u2015]", "g");

const ELLIPSIS_REGEX = new RegExp("\\u2026", "g");

// Bullets, arrows, geometric shapes, and dingbat/symbol blocks commonly
// used as decorative flourishes rather than language content.
const DECORATIVE_SYMBOL_REGEX = new RegExp(
  "[\\u2022\\u2190-\\u21FF\\u25A0-\\u25FF\\u2600-\\u27BF]",
  "g"
);

const MARKDOWN_HEADING_REGEX = /^ {0,3}#{1,6}[ \t]+/gm;
const MARKDOWN_BOLD_STAR_REGEX = /\*\*([^*\n]+)\*\*/g;
const MARKDOWN_BOLD_UNDERSCORE_REGEX = /__([^_\n]+)__/g;
const MARKDOWN_ITALIC_STAR_REGEX = /\*([^*\n]+)\*/g;
const MARKDOWN_ITALIC_UNDERSCORE_REGEX = /\b_([^_\n]+)_\b/g;
const MARKDOWN_CODE_REGEX = /`([^`\n]+)`/g;
const MARKDOWN_BLOCKQUOTE_REGEX = /^ {0,3}>[ \t]?/gm;
const MARKDOWN_HR_REGEX = /^ {0,3}([-*_])(?: *\1){2,} *$\n?/gm;

// NBSP and other Unicode space separators.
const NON_BREAKING_SPACE_REGEX = new RegExp(
  "[\\u00A0\\u1680\\u2000-\\u200A\\u202F\\u205F\\u3000]",
  "g"
);
const MULTI_SPACE_REGEX = / {2,}/g;
const TRAILING_SPACE_REGEX = /[ \t]+$/;
const EXCESS_BLANK_LINES_REGEX = /\n{3,}/g;

// AI Buzzwords heavily complained about on Reddit
const AI_WORDS_REGEX = /\b(?:delve into|delve|tapestry|testament|pivotal|beacon|foster|realm|crucial|seamless|bustling|harness|leverage|holistic|bespoke|cutting-edge|game-changer|paramount|unprecedented|embark|navigate|in today's digital landscape|it's important to note|it is important to note|furthermore|moreover|in conclusion)\b/gi;

// LaTeX & HTML regexes
const LATEX_DELIMITER_REGEX = /\\\(|\\\)|\\\[|\\\]|\$([^$\n]+)\$/g;
const HTML_TAG_REGEX = /<[^>]+>/g;
const AI_FLUFF_INTRO_REGEX = /^(?:Sure|Certainly|Here is|Here's|Of course)[!.,].*?\n+/gi;
const AI_FLUFF_OUTRO_REGEX = /\n+.*?(?:Hope this helps|Let me know if you need|Feel free to ask).*?$/gi;

function countMatches(text: string, regex: RegExp): number {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function countMarkdownArtifacts(text: string): number {
  return (
    countMatches(text, MARKDOWN_HEADING_REGEX) +
    countMatches(text, MARKDOWN_BOLD_STAR_REGEX) +
    countMatches(text, MARKDOWN_BOLD_UNDERSCORE_REGEX) +
    countMatches(text, MARKDOWN_ITALIC_STAR_REGEX) +
    countMatches(text, MARKDOWN_ITALIC_UNDERSCORE_REGEX) +
    countMatches(text, MARKDOWN_CODE_REGEX) +
    countMatches(text, MARKDOWN_BLOCKQUOTE_REGEX) +
    countMatches(text, MARKDOWN_HR_REGEX)
  );
}

function normalizeWhitespace(
  input: string,
  opts: { convertNonBreakingSpaces: boolean; removeTrailingWhitespace: boolean }
): { text: string; count: number } {
  let text = input.replace(/\r\n?/g, "\n");
  let count = 0;

  if (opts.convertNonBreakingSpaces) {
    count += countMatches(text, NON_BREAKING_SPACE_REGEX);
    text = text.replace(NON_BREAKING_SPACE_REGEX, " ");
  }

  if (opts.removeTrailingWhitespace) {
    const lines = text.split("\n").map((line) => {
      const leadingMatch = line.match(/^[ \t]*/);
      const leading = leadingMatch ? leadingMatch[0] : "";
      let rest = line.slice(leading.length);

      const multiSpaceMatches = rest.match(MULTI_SPACE_REGEX);
      if (multiSpaceMatches) count += multiSpaceMatches.length;
      rest = rest.replace(MULTI_SPACE_REGEX, " ");

      if (TRAILING_SPACE_REGEX.test(rest)) count += 1;
      rest = rest.replace(TRAILING_SPACE_REGEX, "");

      return leading + rest;
    });
    text = lines.join("\n");

    count += countMatches(text, EXCESS_BLANK_LINES_REGEX);
    text = text.replace(EXCESS_BLANK_LINES_REGEX, "\n\n");
  }

  text = text.trim();

  return { text, count };
}

export function cleanText(
  input: string,
  options: CleaningOptions = defaultCleaningOptions
): CleaningResult {
  let text = input;
  const summary: CleaningSummaryItem[] = [];

  if (options.removeAIFluff) {
    const introMatches = countMatches(text, AI_FLUFF_INTRO_REGEX);
    const outroMatches = countMatches(text, AI_FLUFF_OUTRO_REGEX);
    text = text.replace(AI_FLUFF_INTRO_REGEX, "").replace(AI_FLUFF_OUTRO_REGEX, "");
    if (introMatches + outroMatches > 0) {
      summary.push({ label: "AI conversational fluff removed", count: introMatches + outroMatches });
    }
  }

  if (options.removeHiddenCharacters) {
    const invisibleCount = countMatches(text, INVISIBLE_CHARS_REGEX);
    text = text.replace(INVISIBLE_CHARS_REGEX, "");
    if (invisibleCount > 0) {
      summary.push({ label: "invisible characters removed", count: invisibleCount });
    }
  }

  if (options.removeHTML) {
    const htmlCount = countMatches(text, HTML_TAG_REGEX);
    text = text.replace(HTML_TAG_REGEX, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    if (htmlCount > 0) {
      summary.push({ label: "HTML tags stripped", count: htmlCount });
    }
  }

  if (options.removeLaTeX) {
    const latexCount = countMatches(text, LATEX_DELIMITER_REGEX);
    text = text
      .replace(/\\\(|\\\)|\\\[|\\\]/g, "")
      .replace(/\$([^$\n]+)\$/g, "$1")
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
      .replace(/\\rightarrow/g, "→")
      .replace(/\\times/g, "×")
      .replace(/\\pm/g, "±");
    if (latexCount > 0) {
      summary.push({ label: "LaTeX math delimiters cleaned", count: latexCount });
    }
  }

  if (options.removeAIWords) {
    const aiWordCount = countMatches(text, AI_WORDS_REGEX);
    text = text.replace(AI_WORDS_REGEX, "").replace(/\s{2,}/g, " ");
    if (aiWordCount > 0) {
      summary.push({ label: "AI buzzwords (delve, tapestry, etc.) removed", count: aiWordCount });
    }
  }

  if (options.normalizeUnicode) {
    const unicodeCount = countMatches(text, COMPATIBILITY_CHARS_REGEX);
    if (unicodeCount > 0) {
      text = text.replace(COMPATIBILITY_CHARS_REGEX, (match) => match.normalize("NFKC"));
      summary.push({ label: "Unicode characters normalized", count: unicodeCount });
    }
  }

  if (options.normalizeQuotes) {
    const quoteCount =
      countMatches(text, SMART_QUOTE_REGEX) + countMatches(text, SMART_APOSTROPHE_REGEX);
    text = text.replace(SMART_QUOTE_REGEX, '"').replace(SMART_APOSTROPHE_REGEX, "'");
    if (quoteCount > 0) {
      summary.push({ label: "quotation marks normalized", count: quoteCount });
    }
  }

  if (options.normalizeDashes) {
    const dashCount = countMatches(text, DASH_REGEX);
    text = text.replace(DASH_REGEX, "-");
    if (dashCount > 0) {
      summary.push({ label: "dashes normalized", count: dashCount });
    }
  }

  if (options.convertEllipsis) {
    const ellipsisCount = countMatches(text, ELLIPSIS_REGEX);
    text = text.replace(ELLIPSIS_REGEX, "...");
    if (ellipsisCount > 0) {
      summary.push({ label: "ellipsis characters normalized", count: ellipsisCount });
    }
  }

  if (options.removeMarkdown) {
    const markdownCount = countMarkdownArtifacts(text);
    text = removeMarkdown(text, { stripListLeaders: false });
    if (markdownCount > 0) {
      summary.push({ label: "Markdown artifacts removed", count: markdownCount });
    }
  }

  if (options.removeEmoji) {
    const regex = emojiRegex();
    const emojiCount = countMatches(text, regex);
    text = text.replace(regex, "");
    if (emojiCount > 0) {
      summary.push({ label: "emoji removed", count: emojiCount });
    }
  }

  if (options.removeDecorativeSymbols) {
    const decorativeCount = countMatches(text, DECORATIVE_SYMBOL_REGEX);
    text = text.replace(DECORATIVE_SYMBOL_REGEX, "");
    if (decorativeCount > 0) {
      summary.push({ label: "decorative symbols removed", count: decorativeCount });
    }
  }

  const whitespaceResult = normalizeWhitespace(text, {
    convertNonBreakingSpaces: options.convertNonBreakingSpaces,
    removeTrailingWhitespace: options.removeTrailingWhitespace,
  });
  text = whitespaceResult.text;
  if (whitespaceResult.count > 0) {
    summary.push({ label: "extra whitespace normalized", count: whitespaceResult.count });
  }

  const totalChanges = summary.reduce((sum, item) => sum + item.count, 0);

  return { cleaned: text, summary, totalChanges };
}

export function getSampleText(): string {
  return (
    "Sure! Here is your AI generated analysis:\n\n" +
    "In today's digital landscape, we must delve into this rich tapestry of modern web tools.\u200B " +
    "It is a testament to how LLMs—such as ChatGPT, Claude, and Gemini—foster seamless innovation.\u200B " +
    "Notice how math formulas like \\(x^2 + y^2 = z^2\\) contain LaTeX markup, and code has <b>HTML tags</b>.\n\n" +
    "# Key Features:\n" +
    "* Instant 100% client-side\u200B cleaning.\n" +
    "* Remove overused AI words (delve, tapestry, realm).\n" +
    "* Remove zero-width\u200B spaces (U+200B) and Markdown bold **asterisks**.\n\n" +
    "Hope this helps! Let me know if you need anything else."
  );
}
