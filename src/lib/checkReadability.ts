/**
 * Client-Side Readability & Flesch-Kincaid Metric Analyzer.
 * Computes Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index,
 * Coleman-Liau Index, sentence metrics, and highlights complex words.
 */

export interface ComplexWord {
  word: string;
  syllables: number;
}

export interface ReadabilityMetrics {
  fleschReadingEase: number;
  fleschInterpretation: string;
  fleschKincaidGrade: number;
  gunningFogIndex: number;
  colemanLiauIndex: number;
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  complexWordCount: number;
  averageWordsPerSentence: number;
  averageSyllablesPerWord: number;
  complexWords: ComplexWord[];
}

export function countSyllablesInWord(word: string): number {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleanWord) return 0;
  if (cleanWord.length <= 3) return 1;

  // Syllable counting rules
  let count = cleanWord
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g)?.length || 1;

  return Math.max(1, count);
}

export function analyzeReadability(text: string): ReadabilityMetrics {
  if (!text || !text.trim()) {
    return {
      fleschReadingEase: 0,
      fleschInterpretation: "No text provided",
      fleschKincaidGrade: 0,
      gunningFogIndex: 0,
      colemanLiauIndex: 0,
      wordCount: 0,
      sentenceCount: 0,
      syllableCount: 0,
      complexWordCount: 0,
      averageWordsPerSentence: 0,
      averageSyllablesPerWord: 0,
      complexWords: [],
    };
  }

  // 1. Sentences
  const sentenceMatches = text.match(/[^.!?]+[.!?]+/g) || [text];
  const sentenceCount = Math.max(1, sentenceMatches.length);

  // 2. Words
  const wordTokens = text
    .replace(/[^a-zA-Z0-9\s'-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = Math.max(1, wordTokens.length);

  // 3. Letters
  const letterCount = text.replace(/[^a-zA-Z0-9]/g, "").length;

  // 4. Syllables & Complex Words (3+ syllables)
  let totalSyllables = 0;
  const complexWords: ComplexWord[] = [];
  const seenComplex = new Set<string>();

  wordTokens.forEach((w) => {
    const syl = countSyllablesInWord(w);
    totalSyllables += syl;
    if (syl >= 3 && !seenComplex.has(w.toLowerCase())) {
      seenComplex.add(w.toLowerCase());
      complexWords.push({ word: w, syllables: syl });
    }
  });

  const complexWordCount = complexWords.length;
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = totalSyllables / wordCount;

  // Flesch Reading Ease = 206.835 - (1.015 * ASL) - (84.6 * ASW)
  const fleschReadingEase = Math.max(
    0,
    Math.min(100, Math.round((206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord) * 10) / 10)
  );

  let fleschInterpretation = "Standard / 8th-9th Grade";
  if (fleschReadingEase >= 90) fleschInterpretation = "Very Easy (5th Grade)";
  else if (fleschReadingEase >= 80) fleschInterpretation = "Easy (6th Grade)";
  else if (fleschReadingEase >= 70) fleschInterpretation = "Fairly Easy (7th Grade)";
  else if (fleschReadingEase >= 60) fleschInterpretation = "Standard (8th-9th Grade)";
  else if (fleschReadingEase >= 50) fleschInterpretation = "Fairly Difficult (High School)";
  else if (fleschReadingEase >= 30) fleschInterpretation = "Difficult (College Level)";
  else fleschInterpretation = "Very Professional / Academic";

  // Flesch-Kincaid Grade Level = 0.39 * ASL + 11.8 * ASW - 15.59
  const fleschKincaidGrade = Math.max(
    0,
    Math.round((0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59) * 10) / 10
  );

  // Gunning Fog Index = 0.4 * ( (words/sentences) + 100 * (complexWords/words) )
  const gunningFogIndex = Math.max(
    0,
    Math.round(0.4 * (avgWordsPerSentence + 100 * (complexWordCount / wordCount)) * 10) / 10
  );

  // Coleman-Liau Index = 0.0588 * L - 0.296 * S - 15.8
  const L = (letterCount / wordCount) * 100;
  const S = (sentenceCount / wordCount) * 100;
  const colemanLiauIndex = Math.max(0, Math.round((0.0588 * L - 0.296 * S - 15.8) * 10) / 10);

  return {
    fleschReadingEase,
    fleschInterpretation,
    fleschKincaidGrade,
    gunningFogIndex,
    colemanLiauIndex,
    wordCount,
    sentenceCount,
    syllableCount: totalSyllables,
    complexWordCount,
    averageWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    averageSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    complexWords,
  };
}
