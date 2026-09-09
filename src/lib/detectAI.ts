export interface AISentenceSegment {
  id: number;
  text: string;
  isAI: boolean;
  score: number; // 0 to 100
  reason?: string;
}

export interface AIDetectionResult {
  humanScore: number; // 0 to 100
  aiScore: number; // 0 to 100
  classification: "Highly Likely Human" | "Likely Human" | "Mixed / Uncertain" | "Likely AI Generated" | "Highly Likely AI Generated";
  segments: AISentenceSegment[];
  aiWordsFound: string[];
  totalWords: number;
  totalSentences: number;
  avgSentenceLength: number;
}

const aiClicheWords = [
  "delve", "delving", "tapestry", "realm", "testament", "pivotal",
  "furthermore", "moreover", "indispensable", "beacon", "synergy",
  "foster", "fostering", "paramount", "underscores", "multifaceted",
  "in conclusion", "it is worth noting", "serves as a", "in today's fast-paced world",
  "game-changer", "unwavering", "resonate", "intertwined", "nestled"
];

export function detectAIText(text: string): AIDetectionResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      humanScore: 100,
      aiScore: 0,
      classification: "Highly Likely Human",
      segments: [],
      aiWordsFound: [],
      totalWords: 0,
      totalSentences: 0,
      avgSentenceLength: 0,
    };
  }

  // Split into sentences
  const rawSentences = trimmed.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [trimmed];
  const words = trimmed.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  let totalAIScoreAccumulator = 0;
  const foundAiWords = new Set<string>();
  const segments: AISentenceSegment[] = [];

  // Calculate burstiness (variation in sentence lengths)
  const sentenceLengths = rawSentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / (sentenceLengths.length || 1);
  const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgLen, 2), 0) / (sentenceLengths.length || 1);
  const stdDev = Math.sqrt(variance);

  // Monotonous sentence length (low stdDev) is typical of AI
  const lowBurstinessPenalty = stdDev < 3 ? 15 : stdDev < 5 ? 8 : 0;

  rawSentences.forEach((sentenceText, idx) => {
    const sLower = sentenceText.toLowerCase();
    let sentenceAIScore = 10; // baseline
    const Reasons: string[] = [];

    // Check for AI cliché words
    aiClicheWords.forEach((word) => {
      if (sLower.includes(word)) {
        sentenceAIScore += 35;
        foundAiWords.add(word);
        Reasons.push(`Contains AI cliché phrase "${word}"`);
      }
    });

    // Check length monotony
    const sLen = sentenceText.split(/\s+/).filter(Boolean).length;
    if (Math.abs(sLen - avgLen) < 2 && sLen > 12) {
      sentenceAIScore += 15;
      Reasons.push("Monotonous sentence structure & uniform length");
    }

    // Passive voice structure check ("is/are/was/were + verb + by/to")
    if (/\b(is|are|was|were|has been|have been)\s+\w+ed\s+(by|to)\b/i.test(sentenceText)) {
      sentenceAIScore += 15;
      Reasons.push("Passive AI sentence construction");
    }

    // Clamp sentence score 0..100
    const finalSentenceAIScore = Math.min(100, Math.max(0, sentenceAIScore + lowBurstinessPenalty));
    const isAI = finalSentenceAIScore >= 40;

    totalAIScoreAccumulator += finalSentenceAIScore;

    segments.push({
      id: idx,
      text: sentenceText,
      isAI,
      score: finalSentenceAIScore,
      reason: Reasons.length > 0 ? Reasons.join(" • ") : isAI ? "High probability AI pattern" : "Natural human sentence variation",
    });
  });

  const rawAiScore = Math.round(totalAIScoreAccumulator / (rawSentences.length || 1));
  const aiScore = Math.min(98, Math.max(2, rawAiScore));
  const humanScore = 100 - aiScore;

  let classification: AIDetectionResult["classification"] = "Mixed / Uncertain";
  if (humanScore >= 85) classification = "Highly Likely Human";
  else if (humanScore >= 65) classification = "Likely Human";
  else if (aiScore >= 75) classification = "Highly Likely AI Generated";
  else if (aiScore >= 50) classification = "Likely AI Generated";

  return {
    humanScore,
    aiScore,
    classification,
    segments,
    aiWordsFound: Array.from(foundAiWords),
    totalWords,
    totalSentences: rawSentences.length,
    avgSentenceLength: Math.round(avgLen),
  };
}

export function getSampleAIDetectionText(): string {
  return "In today's fast-paced world, artificial intelligence serves as a testament to human innovation. Furthermore, delving into this digital realm allows us to foster pivotal advancements across multifaceted industries. Moreover, the tapestry of technology is intertwined with unwavering progress.";
}
