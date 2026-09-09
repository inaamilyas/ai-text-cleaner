/**
 * AI Prompt & Parameter Stripper Utility.
 * Strips Midjourney parameters (--ar, --v, --stylize, --seed, --sref),
 * Stable Diffusion LoRA tags (<lora:...>), negative prompt blocks,
 * Automatic1111 parameter chunks, system instructions, and prompt weights.
 */

export interface PromptStripperOptions {
  stripMidjourneyParams?: boolean; // --ar 16:9 --v 6 --stylize 250
  stripLoRATags?: boolean;        // <lora:detailer:0.8>
  stripNegativePrompts?: boolean;  // Negative prompt: ...
  stripWeights?: boolean;         // (masterpiece:1.2), [word:0.8]
  stripSystemPrompts?: boolean;   // System: You are an AI...
  cleanCommas?: boolean;          // normalize extra commas and whitespace
}

export interface PromptStripperResult {
  originalText: string;
  cleanedText: string;
  removedItems: Array<{ type: string; item: string }>;
  totalRemovedCount: number;
}

export const defaultPromptOptions: PromptStripperOptions = {
  stripMidjourneyParams: true,
  stripLoRATags: true,
  stripNegativePrompts: true,
  stripWeights: true,
  stripSystemPrompts: true,
  cleanCommas: true,
};

export function stripAIPrompt(
  input: string,
  options: PromptStripperOptions = defaultPromptOptions
): PromptStripperResult {
  const {
    stripMidjourneyParams = true,
    stripLoRATags = true,
    stripNegativePrompts = true,
    stripWeights = true,
    stripSystemPrompts = true,
    cleanCommas = true,
  } = options;

  let text = input;
  const removedItems: Array<{ type: string; item: string }> = [];

  // 1. Strip Negative Prompt Chunks (Stable Diffusion / Automatic1111)
  if (stripNegativePrompts) {
    const negMatch = text.match(/(?:negative prompt|negative|neg prompt)\s*:\s*([\s\S]*?)(?=(?:steps:|sampler:|$))/i);
    if (negMatch) {
      removedItems.push({ type: "Negative Prompt Block", item: negMatch[0].trim() });
      text = text.replace(negMatch[0], "");
    }
  }

  // 2. Strip Automatic1111 / ComfyUI Parameter Chunks (Steps: 20, Sampler: DPM++ 2M, CFG scale: 7...)
  const paramsMatch = text.match(/Steps:\s*\d+,\s*Sampler:[\s\S]*/i);
  if (paramsMatch) {
    removedItems.push({ type: "SD Generation Parameters", item: paramsMatch[0].trim() });
    text = text.replace(paramsMatch[0], "");
  }

  // 3. Strip System Prompt Prefixes ([System prompt: ...], System: ...)
  if (stripSystemPrompts) {
    text = text.replace(/^(?:\[?system prompt:?\]?|system:?|instruction:?|you are an ai[^\n]*)\s*/gi, (match) => {
      removedItems.push({ type: "System Prompt Header", item: match.trim() });
      return "";
    });
  }

  // 4. Strip LoRA and Embedding Tags (<lora:name:weight>, <hypernet:...>, <embedding:...>)
  if (stripLoRATags) {
    text = text.replace(/<(?:lora|hypernet|embedding):[^>]+>/gi, (match) => {
      removedItems.push({ type: "LoRA / Network Tag", item: match });
      return "";
    });
  }

  // 5. Strip Midjourney Parameters (--ar 16:9, --v 6.0, --stylize 250, --sref ..., --cref ..., --no ..., --seed \d+)
  if (stripMidjourneyParams) {
    const mjRegex = /--(?:ar|aspect|v|version|s|stylize|c|chaos|w|weird|seed|tile|fast|relax|turbo|cw|sref|cref|no|stop|iw|q|quality|profile)\b(?:\s+\S+)?/gi;
    text = text.replace(mjRegex, (match) => {
      removedItems.push({ type: "Midjourney Flag", item: match });
      return "";
    });
  }

  // 6. Strip Prompt Weights (e.g. (masterpiece:1.3) -> masterpiece, [photorealistic:1.1] -> photorealistic)
  if (stripWeights) {
    // Replace (word:1.2) or (word:0.8)
    text = text.replace(/\(([^:()]+):[0-9.]+\)/g, (_, word) => {
      removedItems.push({ type: "Weight Multiplier", item: `(${word}:weight)` });
      return word;
    });
    // Replace [word:1.2]
    text = text.replace(/\[([^:\[\]]+):[0-9.]+\]/g, (_, word) => {
      removedItems.push({ type: "Weight Multiplier", item: `[${word}:weight]` });
      return word;
    });
  }

  // 7. Clean up commas, extra spaces, and trailing punctuation
  if (cleanCommas) {
    text = text
      .replace(/,\s*,+/g, ",")           // duplicate commas
      .replace(/^\s*,\s*/g, "")          // leading comma
      .replace(/\s*,\s*$/g, "")          // trailing comma
      .replace(/\s+/g, " ")             // multiple spaces
      .replace(/\n\s*\n\s*\n/g, "\n\n")  // multiple blank lines
      .trim();
  }

  return {
    originalText: input,
    cleanedText: text,
    removedItems,
    totalRemovedCount: removedItems.length,
  };
}

export function getSamplePromptText(): string {
  return `A futuristic neon cyberpunk hacker girl standing in rain, highly detailed, photorealistic, 8k resolution, (masterpiece:1.3), (cinematic lighting:1.2), <lora:cyberpunk_style:0.8>, <lora:add_detail:0.5> --ar 16:9 --v 6.0 --stylize 250 --seed 84920491 --no blur, low quality

Negative prompt: ugly, deformed, blurry, low resolution, bad anatomy, extra limbs, watermark, signature
Steps: 30, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 84920491, Size: 1024x576, Model: SDXL_v1.0`;
}
