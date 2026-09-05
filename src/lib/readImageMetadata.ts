  export interface DetectedMetadata {
  filename: string;
  fileSize: number;
  mimeType: string;
  width: number;
  height: number;
  software?: string;
  promptText?: string;
  hasExif: boolean;
  hasC2PA: boolean;
  rawChunksFound: string[];
}

/**
 * Parses raw array buffer bytes of PNG/JPEG files in browser memory
 * to detect hidden EXIF tags, AI prompt parameters, software signatures,
 * and C2PA provenance headers before sanitization.
 */
export async function readImageMetadata(file: File): Promise<DetectedMetadata> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  let width = 0;
  let height = 0;
  let software: string | undefined;
  let promptText: string | undefined;
  let hasExif = false;
  let hasC2PA = false;
  const rawChunksFound: string[] = [];

  // Get dimensions using Image object
  const dimensions = await getImageDimensions(file);
  width = dimensions.width;
  height = dimensions.height;

  // Check PNG Magic bytes: 89 50 4E 47 0D 0A 1A 0A
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    parsePngChunks(bytes, rawChunksFound, (key, value) => {
      if (key.toLowerCase().includes("software") || key.toLowerCase().includes("generator")) {
        software = value;
      }
      if (
        key === "parameters" ||
        key === "prompt" ||
        key === "Comment" ||
        key === "Description" ||
        key === "workflow"
      ) {
        promptText = value;
      }
    });
  }

  // Check JPEG Magic bytes: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    parseJpegMarkers(bytes, rawChunksFound, (tag, content) => {
      if (tag === "EXIF") hasExif = true;
      if (tag === "C2PA") hasC2PA = true;
      if (tag === "Software" && !software) software = content;
      if (tag === "Prompt" && !promptText) promptText = content;
    });
  }

  // General text search in binary for common AI generator markers
  const decoder = new TextDecoder("ascii");
  const fullText = decoder.decode(bytes.subarray(0, Math.min(bytes.length, 128 * 1024)));

  if (!software) {
    const text = fullText.toLowerCase();
    const fn = file.name.toLowerCase();

    if (text.includes("openai") || text.includes("chatgpt") || text.includes("dall-e") || fn.includes("chatgpt") || fn.includes("dalle")) {
      software = "ChatGPT / DALL-E 3 (OpenAI)";
    } else if (text.includes("google generative ai") || text.includes("gemini") || text.includes("imagen") || fn.includes("gemini")) {
      software = "Google Gemini / Imagen 3";
    } else if (text.includes("midjourney") || text.includes("job_id") || text.includes("--v 6") || text.includes("--v 5") || text.includes("--ar ") || fn.includes("midjourney")) {
      software = "Midjourney (v5/v6)";
    } else if (text.includes("comfyui") || text.includes("workflow") || text.includes("prompt_id")) {
      software = "Stable Diffusion (ComfyUI)";
    } else if (text.includes("automatic1111") || text.includes("negative prompt") || text.includes("steps:") || text.includes("sampler:")) {
      software = "Stable Diffusion (Automatic1111 WebUI)";
    } else if (text.includes("stable diffusion") || text.includes("stablediffusion")) {
      software = "Stable Diffusion (SDXL)";
    } else if (text.includes("fooocus")) {
      software = "Fooocus AI Generator";
    } else if (text.includes("blackforestlabs") || text.includes("flux.1") || text.includes("fal.ai")) {
      software = "Flux.1 AI (Black Forest Labs)";
    } else if (text.includes("adobe firefly") || text.includes("photoshop ai")) {
      software = "Adobe Firefly";
    } else if (text.includes("imagine.meta") || text.includes("meta ai")) {
      software = "Meta AI Imagine";
    } else if (text.includes("bing image creator") || text.includes("copilot designer") || text.includes("microsoft designer")) {
      software = "Microsoft Copilot / Bing Image Creator";
    } else if (text.includes("ideogram")) {
      software = "Ideogram AI";
    } else if (text.includes("leonardo.ai") || text.includes("leonardoai")) {
      software = "Leonardo.Ai";
    } else if (text.includes("canva magic") || text.includes("canva")) {
      software = "Canva Magic Media";
    } else if (text.includes("playgroundai") || text.includes("playground.ai")) {
      software = "Playground AI";
    } else if (text.includes("nightcafe")) {
      software = "NightCafe Creator";
    } else if (text.includes("seaart")) {
      software = "SeaArt AI";
    } else if (text.includes("krea")) {
      software = "Krea.ai";
    } else if (text.includes("recraft")) {
      software = "Recraft AI";
    } else if (hasC2PA || text.includes("c2pa")) {
      software = "C2PA Provenance AI Signature";
    }
  }

  if (fullText.includes("Exif") || fullText.includes("EXIF")) hasExif = true;
  if (fullText.includes("c2pa") || fullText.includes("C2PA") || fullText.includes("urn:c2pa") || fullText.includes("trainedAlgorithmicMedia")) hasC2PA = true;

  if (!promptText && (hasC2PA || fullText.includes("trainedAlgorithmicMedia"))) {
    if (fullText.includes("Google Generative AI")) {
      promptText = "C2PA Provenance Manifest: Resized & Generated by Google Generative AI (trainedAlgorithmicMedia)";
    } else if (fullText.includes("c2pa.created") || fullText.includes("c2pa.action") || fullText.includes("actionlc2pa")) {
      promptText = "C2PA Digital Provenance Manifest: Digital Creation Assertion (c2pa.action / c2pa.created)";
    } else {
      const c2paMatch = fullText.match(/(?:description|action|digitalSourceType)[^\w]*([A-Za-z0-9\s.,:\/_-]{10,200})/i);
      if (c2paMatch && c2paMatch[1]) {
        promptText = c2paMatch[0].replace(/[^\x20-\x7E]/g, " ").trim();
      }
    }
  } else if (!promptText) {
    // Try regex scan for parameters or prompt keywords
    const promptMatch = fullText.match(/(?:prompt|parameters|Steps:|Sampler:)\s*[:=]?\s*([^\r\n]{10,300})/i);
    if (promptMatch && promptMatch[1]) {
      promptText = promptMatch[1].replace(/[^\x20-\x7E]/g, " ").trim();
    }
  }

  if (promptText) {
    // Sanitize non-printable binary characters
    promptText = promptText.replace(/[^\x20-\x7E\s]/g, "").replace(/\s+/g, " ").trim();
  }

  return {
    filename: file.name,
    fileSize: file.size,
    mimeType: file.type,
    width,
    height,
    software,
    promptText,
    hasExif,
    hasC2PA,
    rawChunksFound,
  };
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function parsePngChunks(
  bytes: Uint8Array,
  rawChunksFound: string[],
  onTextChunk: (key: string, value: string) => void
) {
  let offset = 8; // skip PNG header
  const decoder = new TextDecoder("utf-8");

  while (offset < bytes.length - 8) {
    const length = (bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
    const type = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);

    if (length < 0 || offset + 8 + length > bytes.length) break;

    if (type === "tEXt" || type === "iTXt") {
      rawChunksFound.push(type);
      const data = bytes.subarray(offset + 8, offset + 8 + length);
      const nullIdx = data.indexOf(0);
      if (nullIdx > 0) {
        const keyword = decoder.decode(data.subarray(0, nullIdx));
        const textVal = decoder.decode(data.subarray(nullIdx + 1));
        onTextChunk(keyword, textVal);
      }
    } else if (type === "eXIf") {
      rawChunksFound.push("eXIf");
    }

    offset += 12 + length;
    if (type === "IEND") break;
  }
}

function parseJpegMarkers(
  bytes: Uint8Array,
  rawChunksFound: string[],
  onFound: (tag: string, content?: string) => void
) {
  let offset = 2;
  const decoder = new TextDecoder("utf-8");

  while (offset < bytes.length - 4) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1];

    if (marker === 0xd9) break; // EOI
    if (marker === 0xd8) {
      offset += 2;
      continue;
    }

    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (offset + 2 + length > bytes.length) break;

    // APP1 (0xE1) - EXIF / XMP / C2PA
    if (marker === 0xe1) {
      rawChunksFound.push("APP1");
      const appData = bytes.subarray(offset + 4, offset + 2 + length);
      const headerStr = decoder.decode(appData.subarray(0, 20));
      if (headerStr.includes("Exif")) onFound("EXIF");
      if (headerStr.includes("c2pa") || headerStr.includes("C2PA")) onFound("C2PA");
    }
    // APP2 (0xE2) - ICC / C2PA
    if (marker === 0xe2) {
      rawChunksFound.push("APP2");
      const appData = bytes.subarray(offset + 4, offset + 2 + length);
      const headerStr = decoder.decode(appData.subarray(0, 20));
      if (headerStr.includes("c2pa") || headerStr.includes("C2PA")) onFound("C2PA");
    }

    offset += 2 + length;
  }
}
