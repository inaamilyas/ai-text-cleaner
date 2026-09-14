import type { Metadata } from "next";
import ImageSanitizer from "@/components/ImageSanitizer";

const siteUrl = "https://www.text-cleaner-ai.com";

export const metadata: Metadata = {
  title: "AI Image Metadata Remover — Strip EXIF, Prompts & C2PA Tags",
  description:
    "Remove AI generation metadata from images, including prompt text, model name, and C2PA content credentials. Free, runs in your browser.",
  keywords: [
    "ai image metadata remover",
  ],
  alternates: {
    canonical: "/remove-ai-image-metadata",
    languages: {
      en: "/remove-ai-image-metadata",
      es: "/es/remove-ai-image-metadata",
      de: "/de/remove-ai-image-metadata",
      fr: "/fr/remove-ai-image-metadata",
      it: "/it/remove-ai-image-metadata",
      pt: "/pt/remove-ai-image-metadata",
      ar: "/ar/remove-ai-image-metadata",
      ja: "/ja/remove-ai-image-metadata",
      nl: "/nl/remove-ai-image-metadata",
      tr: "/tr/remove-ai-image-metadata",
      id: "/id/remove-ai-image-metadata",
    },
  },
  openGraph: {
    title: "AI Image Metadata Remover — Strip EXIF, Prompts & C2PA Tags",
    description:
      "Remove prompt text, model name, and C2PA content credentials from AI-generated images.",
    url: `${siteUrl}/remove-ai-image-metadata`,
  },
};

const supportedGenerators = [
  {
    name: "ChatGPT / DALL-E 3",
    badge: "OPENAI C2PA",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
    description:
      "Strips embedded C2PA Content Credentials headers, creation assertions, provenance manifest records, and auto-generated system prompt metadata.",
    payload: "Payload: PNG tEXt & JPEG APP11",
  },
  {
    name: "Midjourney (v5 & v6)",
    badge: "MIDJOURNEY EXIF",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed",
    description:
      "Wipes raw /imagine prompt parameters, seed numbers, aspect ratio tags, version flags, sampler variations, and sensitive commercial Job IDs.",
    payload: "Payload: UserComment / Software",
  },
  {
    name: "Google Gemini & Imagen 3",
    badge: "GOOGLE C2PA",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    description:
      "Cleans Google Generative AI watermark headers, SynthID tracking markers, image resize metadata, and IPTC digital source asset tags.",
    payload: "Payload: IPTC & XMP DublinCore",
  },
  {
    name: "Stable Diffusion & ComfyUI",
    badge: "A1111 & COMFY",
    badgeClass: "bg-surface-container-highest text-on-surface",
    description:
      "Erases positive/negative prompt text, sampler settings, steps, CFG scale, seed matrices, checkpoint hashes, and full multi-node workflow JSON.",
    payload: "Payload: parameters / prompt chunk",
  },
  {
    name: "Flux.1 (Black Forest Labs)",
    badge: "BFL FLUX",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
    description:
      "Strips generation parameters, guidance steps, model hashes, and embedded API metadata injected by Fal.ai, Together.ai, and Replicate endpoints.",
    payload: "Payload: iTXt / API Signatures",
  },
  {
    name: "Adobe Firefly & Photoshop AI",
    badge: "ADOBE C2PA",
    badgeClass: "bg-error-container text-on-error-container",
    description:
      "Removes Adobe Content Credentials, certified cloud signing certificates, software edit history headers, and generative fill layer histories.",
    payload: "Payload: XMP / JUMBF Container",
  },
];

const whyStripPillars = [
  {
    icon: "vpn_key",
    title: "Protect Commercial Prompt Privacy",
    description:
      "AI image generators embed your full prompt string into image file chunks. Strip metadata so competitors cannot steal your secret prompt engineering techniques.",
    tag: "#ZERO_PROMPT_LEAK",
  },
  {
    icon: "fingerprint_off",
    title: "Remove C2PA & Tracking Headers",
    description:
      "Platforms like OpenAI, Google, and Adobe attach C2PA provenance headers. Our tool wipes all tracking manifests and certificates from PNG and JPEG files.",
    tag: "#NO_C2PA_TRACE",
  },
  {
    icon: "storefront",
    title: "A Clean File for Sharing",
    description:
      "Strip prompt text and provenance metadata before uploading to a marketplace, portfolio, or client, so the file carries only what you intend to share.",
    tag: "#CLEAN_EXPORT",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    num: "1",
    title: "Header Inspection",
    description:
      "ArrayBuffer parses PNG text chunks (tEXt/iTXt) and JPEG APP1/EXIF headers to extract prompt text, model weights, and C2PA manifests for preview.",
    code: "DataView.getUint32(0x89504E47)",
  },
  {
    step: "02",
    num: "2",
    title: "Canvas Re-rendering",
    description:
      "HTML5 Image decodes raw visual RGB pixels onto an off-screen HTML5 canvas element, automatically dropping all non-visual metadata tags.",
    code: "ctx.drawImage(img, 0, 0, w, h)",
  },
  {
    step: "03",
    num: "3",
    title: "Clean Export",
    description:
      "Generates a fresh JPEG or PNG file blob containing 100% visual resolution and 0% tracking headers for instant local download to your storage.",
    code: "canvas.toBlob('image/png', 1.0)",
  },
];

const benchmarks = [
  { name: "Chrome (4K PNG)", time: "Instant" },
  { name: "Safari (4K JPEG)", time: "Instant" },
  { name: "Firefox (4K WEBP)", time: "Instant" },
  { name: "Multi-Page PDF (12 Pages)", time: "Instant" },
];

const faqs = [
  {
    question: "What hidden metadata is stored inside AI-generated images?",
    answer:
      "AI generators embed extensive metadata chunks into files. Midjourney stores your complete raw /imagine prompt, seed numbers, and Job UUIDs inside PNG text chunks or EXIF UserComments. DALL-E 3 and Adobe Firefly embed cryptographic C2PA Content Credentials that permanently record the originating software model and timestamp. Stable Diffusion/ComfyUI attach the full workflow JSON graph.",
  },
  {
    question: "How does this tool strip AI image metadata?",
    answer:
      "Instead of simply parsing and deleting text bytes (which can leave dangling binary signatures), our tool utilizes an offscreen browser canvas re-encoding architecture. The browser decodes only the pure visual RGBA pixel buffer into client memory. Auxiliary non-visual metadata chunks, ICC tags, and provenance manifests are completely dropped upon export.",
  },
  {
    question: "Does this change the image itself?",
    answer:
      "No, only the metadata attached to the file. The visible image is untouched.",
  },
  {
    question: "Is it legal to remove this metadata?",
    answer:
      "Generally yes, for images you created or have the rights to use. This isn't legal advice — if you're handling images for a business or publication, check your organization's own policy on content credentials.",
  },
  {
    question: "Are my images uploaded to any cloud server?",
    answer:
      "Never. The application is completely client-side. Your images and documents are processed entirely within your browser's volatile memory using standard HTML5 Canvas and WebAssembly. You can inspect our code, monitor your network tab, or even disconnect from Wi-Fi after loading the page—the tool will function identically offline.",
  },
  {
    question: "Does stripping metadata affect image quality?",
    answer:
      "No. By default, lossless visual re-encoding is applied for PNG and WebP files, preserving 100% of pixel resolution, color fidelity, and aspect ratio. For JPEG exports, we use maximum quality settings (1.0 canvas quality) to eliminate visible artifacting.",
  },
  {
    question: "Can this also clean multi-page PDF files and embedded raster EXIF?",
    answer:
      "Yes. When switching to PDF Mode, the cleaner parses PDF Document Object Streams, stripping Dublin Core XMP descriptors, author UUIDs, creation timestamps, and embedded image chunks within pages, flattening incremental save trails to produce a clean, zero-history PDF.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Image Metadata Remover",
  url: `${siteUrl}/remove-ai-image-metadata`,
  description:
    "Remove AI generation metadata from images, including prompt text, model name, and C2PA content credentials.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function RemoveAIImageMetadataPage({
  langCode = "en",
}: {
  langCode?: string;
} = {}) {
  return (
    <div className="flex flex-col w-full">
      <span className="sr-only">
        AI Image Metadata &amp; EXIF Remover | Text Cleaner AI
      </span>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1 & 2: TOP HERO SECTION + INTERACTIVE WORKSTATION + SOCIAL BAR */}
      <ImageSanitizer langCode={langCode} />

      {/* 3. FULL PLATFORM SUPPORT SECTION (6-CARD GRID) */}
      <section className="w-full bg-surface py-space-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col mb-space-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-code-stat text-code-stat uppercase text-primary font-semibold tracking-wider">
                Comprehensive Compatibility
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Supported AI Image Generators
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
              Our binary header scanner automatically detects and strips hidden metadata from all major diffusion models and generator tools.
            </p>
          </div>

          {/* 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {supportedGenerators.map((card) => (
              <div
                key={card.name}
                className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {card.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-code-stat text-code-stat ${card.badgeClass}`}>
                      {card.badge}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between font-code-stat text-code-stat text-on-surface-variant">
                  <span>{card.payload}</span>
                  <span className="text-primary font-semibold">100% STRIPPED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CLEAN YOUR IMAGES SECTION (4-COLUMN BENTO) */}
      <section className="w-full bg-surface-container-low/50 py-space-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col mb-space-lg">
            <span className="font-code-stat text-code-stat uppercase text-primary font-semibold tracking-wider">
              Privacy &amp; Commercial Protection
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Why Strip AI Image Metadata?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
              Every image generated by ChatGPT, Midjourney, or Gemini carries hidden tracking data. Here is why creators clean their files.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {whyStripPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-sm">
                    <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-xs">
                    {pillar.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-space-md font-code-stat text-code-stat text-primary font-medium">
                  {pillar.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-highest/60">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-xs">
              A Note on Responsible Use
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Removing this metadata is a normal privacy step, similar to stripping EXIF data from a phone photo before posting it. It&apos;s worth knowing that C2PA tags exist specifically to help people tell AI-generated images apart from real photos — for example, in news or evidence contexts. Stripping that tag to pass an AI image off as an authentic photograph, rather than for ordinary privacy reasons, can be misleading to whoever views it.
            </p>
          </div>
        </div>
      </section>

      {/* 5. DEEP DOCUMENT & PDF METADATA SANITIZER (ENHANCED MODULE) */}
      <section className="w-full bg-surface py-space-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col gap-space-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="max-w-2xl">
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-code-stat text-code-stat uppercase font-semibold">
                  Deep Document &amp; PDF Sanitizer
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
                  Multi-Page PDF &amp; Document Object Sanitization
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Multi-page PDF documents generated or scanned from AI tools leak hidden prompt chains, OCR metadata, author UUIDs, and embedded raster EXIFs.
                </p>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[32px] text-primary">picture_as_pdf</span>
                <div className="flex flex-col font-code-stat text-code-stat">
                  <span className="text-on-surface font-semibold">PDF Object Engine</span>
                  <span className="text-on-surface-variant">Stream FlateDecode Purge</span>
                </div>
              </div>
            </div>

            {/* Comparison Table: Image vs PDF Metadata */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container text-on-surface font-headline-sm text-headline-sm">
                    <th className="p-space-sm rounded-l">Vulnerability Vector</th>
                    <th className="p-space-sm">Raster Images (PNG / JPG / WEBP)</th>
                    <th className="p-space-sm rounded-r">PDF Documents &amp; Portfolios</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 text-on-surface-variant">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-space-sm font-medium text-on-surface">Tracking Header Containers</td>
                    <td className="p-space-sm font-mono text-code-stat">C2PA Manifest, EXIF APP1, tEXt Chunks</td>
                    <td className="p-space-sm font-mono text-code-stat">XMP Metadata Stream, Info Dictionary (/Author, /Creator)</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-space-sm font-medium text-on-surface">Prompt &amp; Generation Trails</td>
                    <td className="p-space-sm font-mono text-code-stat">Direct prompt string, seed number, CFG</td>
                    <td className="p-space-sm font-mono text-code-stat">Embedded workflow attachments, incremental revision trees</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-space-sm font-medium text-on-surface">Embedded File Elements</td>
                    <td className="p-space-sm font-mono text-code-stat">ICC Profile, IPTC Digital Asset Source</td>
                    <td className="p-space-sm font-mono text-code-stat">Embedded raster thumbnail EXIFs, private font descriptor tables</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-space-sm font-medium text-on-surface">Sanitization Technique</td>
                    <td className="p-space-sm text-primary font-semibold">Offscreen Canvas RGB decode &amp; clean blob export</td>
                    <td className="p-space-sm text-primary font-semibold">Object stream reconstructor dropping trailer updates</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL WORKFLOW (HOW IN-BROWSER CANVAS SANITIZATION WORKS) */}
      <section className="w-full bg-surface-container-low/40 py-space-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col mb-space-lg text-center items-center">
            <span className="font-code-stat text-code-stat uppercase text-primary font-semibold tracking-wider">
              Under The Hood
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              How In-Browser Canvas Sanitization Works
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
              Mechanical purity. Zero server dependencies. Every byte is parsed directly within browser volatile heap space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {howItWorksSteps.map((item) => (
              <div
                key={item.step}
                className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex flex-col relative overflow-hidden"
              >
                <div className="font-display-lg text-display-lg font-bold text-surface-container-highest/70 absolute -top-2 -right-1 select-none">
                  {item.step}
                </div>
                <div className="w-8 h-8 rounded bg-primary text-on-primary font-code-stat text-code-stat flex items-center justify-center font-bold mb-space-sm">
                  {item.num}
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-xs">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-auto pt-space-md font-code-stat text-code-stat text-on-surface-variant font-mono">
                  {item.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CREATOR PROTECTION & CLIENT-SIDE PRIVACY TERMINAL */}
      <section className="w-full bg-surface py-space-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
            {/* Local Heuristic Terminal */}
            <div className="lg:col-span-7 rounded-xl bg-inverse-surface text-inverse-on-surface p-space-md flex flex-col justify-between font-code-stat text-code-stat shadow-md">
              <div className="flex items-center justify-between pb-space-sm text-on-surface-variant border-b border-surface-variant/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-error inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                  <span className="ml-2 text-inverse-on-surface font-semibold font-mono">
                    bash — image-sanitizer worker
                  </span>
                </div>
                <span className="text-on-secondary-fixed-variant font-mono text-[10px]">CLIENT_HEAP_OK</span>
              </div>

              <div className="space-y-1 text-on-primary-container leading-relaxed my-space-sm font-mono text-[12px]">
                <p className="text-primary-fixed-dim font-bold">$ ./cleaner-core --inspect input_image.png</p>
                <p className="">Scanning chunks: [IHDR, sRGB, pHYs, tEXt(prompt), iTXt(c2pa), IDAT, IEND]</p>
                <p className="text-error font-semibold">&gt;&gt; Found C2PA Manifest Container: JUMBF Box (4,290 bytes)</p>
                <p className="text-error font-semibold">&gt;&gt; Found Text Prompt: &quot;/imagine architectural render...&quot;</p>
                <p className="text-primary-fixed-dim font-bold pt-1">$ ./cleaner-core --strip --disrupt-subpixel</p>
                <p className="">&gt; Drawing raster to OffscreenCanvas (3840x2160, RGBA8)</p>
                <p className="">&gt; Re-encoding clean binary stream: 0 remote API calls made.</p>
                <p className="text-on-secondary-container font-semibold pt-1">
                  &gt;&gt; Output: sanitized_midjourney_art.png (Visual Hash: Retained)
                </p>
              </div>

              <div className="pt-space-sm border-t border-surface-variant/20 flex items-center justify-between text-inverse-on-surface text-[11px] font-mono">
                <span>SANDBOX: WebAssembly / HTML5 Canvas API</span>
                <span className="text-primary-fixed-dim">0 Telemetry Ping</span>
              </div>
            </div>

            {/* Runtime Benchmarks Table */}
            <div className="lg:col-span-5 p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Runtime Benchmarks
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-code-stat text-code-stat text-on-surface-variant font-bold">
                    100% LOCAL
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Average client-side processing speeds across major browser rendering engines on 4K files.
                </p>
                <div className="space-y-space-sm font-body-sm text-body-sm">
                  {benchmarks.map((bm) => (
                    <div key={bm.name} className="flex items-center justify-between p-2 rounded bg-surface-container-low">
                      <span className="font-medium text-on-surface">{bm.name}</span>
                      <span className="font-code-stat text-code-stat text-primary font-semibold">{bm.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-2 font-code-stat text-code-stat text-on-surface-variant border-t border-surface-container-highest/60">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>All operations execute on user CPU/GPU threads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col mb-space-lg text-center items-center">
            <span className="font-code-stat text-code-stat uppercase text-primary font-semibold tracking-wider">
              Clear Answers
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Frequently Asked Questions
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
              Everything you need to know about AI image metadata, C2PA headers, and prompt privacy.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-3xl mx-auto space-y-space-xs font-body-sm text-body-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-surface-container-low p-space-md">
                <details className="group">
                  <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-on-surface font-semibold cursor-pointer list-none select-none">
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined text-[20px] group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-space-sm text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. AUTHOR SIGNATURE MICRO-BAR */}
      <div className="w-full bg-surface-container py-space-sm">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between text-on-surface-variant font-code-stat text-code-stat">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>Engineered by Inam Ilyas</span>
          </div>
          <a
            className="hover:text-on-surface transition-colors flex items-center gap-1"
            href="https://github.com/inaamilyas/ai-text-cleaner"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>GitHub Repository</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}
