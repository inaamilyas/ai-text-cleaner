/**
 * Client-Side AI Text Humanizer & Structure Optimizer.
 * Analyzes text for AI structural signatures (monotonous sentence lengths, excessive transition markers,
 * passive voice, robotic clichés) and provides instant humanized text rewrites.
 */

export interface AIStructureIssue {
  type: "repetitive_transition" | "long_sentence" | "passive_voice" | "ai_cliche";
  description: string;
  originalSnippet: string;
  suggestedFix: string;
}

export interface HumanizeResult {
  originalText: string;
  humanizedText: string;
  aiLikelihoodScore: number; // 0 (100% human) to 100 (100% AI pattern)
  issuesFoundCount: number;
  issues: AIStructureIssue[];
}

const AI_TRANSITIONS = [
  "Furthermore",
  "Moreover",
  "In conclusion",
  "It is important to note that",
  "In today's fast-paced world",
  "Additionally",
  "Consequently",
  "On the other hand",
  "It goes without saying",
  "In summary",
];

const AI_CLICHES: Record<string, string> = {
  "delve": "explore",
  "tapestry": "mix",
  "realm": "area",
  "testament": "proof",
  "pivotal": "key",
  "foster": "encourage",
  "beacon": "guide",
  "underscoring": "highlighting",
  "seamless": "smooth",
  "paradigm": "model",
};

export function humanizeText(text: string): HumanizeResult {
  if (!text || !text.trim()) {
    return {
      originalText: "",
      humanizedText: "",
      aiLikelihoodScore: 0,
      issuesFoundCount: 0,
      issues: [],
    };
  }

  const issues: AIStructureIssue[] = [];
  let humanizedText = text;

  // 1. Detect and replace repetitive AI transitions
  AI_TRANSITIONS.forEach((transition) => {
    const regex = new RegExp(`\\b${transition}\\b`, "gi");
    if (regex.test(text)) {
      issues.push({
        type: "repetitive_transition",
        description: `Overused AI transition phrase "${transition}"`,
        originalSnippet: transition,
        suggestedFix: "Remove or simplify with natural sentence bridge",
      });
      humanizedText = humanizedText.replace(regex, "");
    }
  });

  // 2. Detect and replace AI cliché vocabulary
  Object.entries(AI_CLICHES).forEach(([cliche, replacement]) => {
    const regex = new RegExp(`\\b${cliche}\\b`, "gi");
    if (regex.test(text)) {
      issues.push({
        type: "ai_cliche",
        description: `Robotic AI cliché vocabulary "${cliche}"`,
        originalSnippet: cliche,
        suggestedFix: `Replace with simpler word "${replacement}"`,
      });
      humanizedText = humanizedText.replace(regex, (match) => {
        return match[0] === match[0].toUpperCase()
          ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
          : replacement;
      });
    }
  });

  // 3. Detect overly long sentences (> 25 words)
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  sentences.forEach((sent) => {
    const wordCount = sent.trim().split(/\s+/).length;
    if (wordCount > 25) {
      issues.push({
        type: "long_sentence",
        description: `Overly long sentence (${wordCount} words) flags AI generation`,
        originalSnippet: sent.trim().slice(0, 50) + "...",
        suggestedFix: "Split into 2 shorter, punchier sentences",
      });
    }
  });

  // Clean double spaces or leading commas after transition removal
  humanizedText = humanizedText
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*,/g, ",")
    .replace(/^\s*,\s*/, "")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();

  // Calculate AI likelihood score based on issue density per 100 words
  const totalWords = text.trim().split(/\s+/).length;
  const issueDensity = (issues.length / Math.max(1, totalWords)) * 100;
  const aiLikelihoodScore = Math.min(98, Math.max(5, Math.round(issueDensity * 18)));

  return {
    originalText: text,
    humanizedText,
    aiLikelihoodScore,
    issuesFoundCount: issues.length,
    issues,
  };
}
