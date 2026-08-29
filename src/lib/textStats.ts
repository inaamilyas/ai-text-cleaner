export type TextStats = {
  words: number;
  characters: number;
  sentences: number;
};

const wordSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("en", { granularity: "word" })
    : null;

const sentenceSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("en", { granularity: "sentence" })
    : null;

function countWords(text: string): number {
  if (!text.trim()) return 0;

  if (wordSegmenter) {
    let count = 0;
    for (const segment of wordSegmenter.segment(text)) {
      if (segment.isWordLike) count += 1;
    }
    return count;
  }

  return text.trim().split(/\s+/).length;
}

function countSentences(text: string): number {
  if (!text.trim()) return 0;

  if (sentenceSegmenter) {
    let count = 0;
    for (const segment of sentenceSegmenter.segment(text)) {
      if (segment.segment.trim()) count += 1;
    }
    return count;
  }

  const matches = text.match(/[^.!?]+[.!?]+|\S+$/g);
  return matches ? matches.length : 0;
}

export function getTextStats(text: string): TextStats {
  return {
    words: countWords(text),
    characters: [...text].length,
    sentences: countSentences(text),
  };
}
