export interface ImageCleaningResult {
  cleanedBlob: Blob;
  previewUrl: string;
  originalSize: number;
  cleanedSize: number;
  filename: string;
  metadataRemoved: boolean;
}

/**
 * Strips all hidden EXIF data, prompt parameters, C2PA provenance tags,
 * and software signatures from AI-generated images (PNG, JPEG, WEBP)
 * 100% locally in the browser using HTML5 Canvas.
 */
export interface CleanImageOptions {
  disruptPatterns?: boolean;
  format?: "original" | "jpeg" | "png";
}

/**
 * Strips all hidden EXIF data, prompt parameters, C2PA provenance tags,
 * and software signatures from AI-generated images (PNG, JPEG, WEBP)
 * 100% locally in the browser using HTML5 Canvas.
 * 
 * Optionally disrupts neural network AI detector pixel fingerprints via micro-noise
 * injection and DCT re-quantization.
 */
export async function cleanImageMetadata(
  file: File,
  options: CleanImageOptions = {}
): Promise<ImageCleaningResult> {
  const { disruptPatterns = false, format = "original" } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        
        // If disrupting patterns, apply sub-pixel dimensional shift (e.g. 99.6% crop/scale)
        // to break diffusion U-Net grid alignment
        const width = disruptPatterns ? Math.floor(img.width * 0.996) : img.width;
        const height = disruptPatterns ? Math.floor(img.height * 0.996) : img.height;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas 2d context"));
          return;
        }

        // Re-draw image onto clean canvas (erases all EXIF & metadata tags)
        ctx.drawImage(img, 0, 0, width, height);

        // Apply micro pixel noise jitter to disrupt neural network detector frequency analysis
        if (disruptPatterns) {
          try {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            // Inject subtle pseudo-random noise (-2 to +2 RGB delta) across pixels
            for (let i = 0; i < data.length; i += 4) {
              if (Math.random() < 0.3) {
                const noise = (Math.random() - 0.5) * 4; // -2 to +2 shift
                data[i] = Math.min(255, Math.max(0, data[i] + noise));     // Red
                data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise)); // Green
                data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise)); // Blue
              }
            }
            ctx.putImageData(imageData, 0, 0);
          } catch (e) {
            console.warn("Could not apply pixel noise adjustment:", e);
          }
        }

        // Output format selection:
        // JPEG re-quantization (0.92 quality) is superior at scrambling neural network feature maps
        let mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
        let ext = file.type === "image/png" ? ".png" : ".jpg";

        if (format === "jpeg" || (disruptPatterns && file.type === "image/png")) {
          mimeType = "image/jpeg";
          ext = ".jpg";
        } else if (format === "png") {
          mimeType = "image/png";
          ext = ".png";
        }

        const quality = disruptPatterns ? 0.91 : 0.95;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to generate cleaned image blob"));
              return;
            }

            const previewUrl = URL.createObjectURL(blob);
            resolve({
              cleanedBlob: blob,
              previewUrl,
              originalSize: file.size,
              cleanedSize: blob.size,
              filename: file.name.replace(/\.[^/.]+$/, "") + (disruptPatterns ? "-sanitized-disrupted" : "-sanitized") + ext,
              metadataRemoved: true,
            });
          },
          mimeType,
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image file"));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}
