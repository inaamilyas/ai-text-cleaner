import type { Metadata } from "next";
import AIDetectorUI from "@/components/AIDetectorUI";
import AIDetectorArticle from "@/components/AIDetectorArticle";
import SubToolContent from "@/components/SubToolContent";
import { generateBreadcrumbSchema } from "@/lib/schema";

const siteUrl = "https://www.text-cleaner-ai.com";
const pageUrl = `${siteUrl}/ai-text-detector`;

const pageTitle = "Free AI Text Detector & AI Text Checker";
const pageDescription =
  "Free AI text detector and checker. Paste text from ChatGPT, Claude or Gemini and see which sentences look like AI. No sign-up, and nothing is uploaded.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/ai-text-detector",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
  },
};

const removedItems = [
  {
    character: "Common AI Words and Phrases",
    unicode: "delve, tapestry, furthermore",
    description: "25 words and phrases that AI tools use much more often than people do.",
  },
  {
    character: "Sentence Length Variation",
    unicode: "Burstiness",
    description: "How much sentence length changes across the text. Flat, even rhythm is a common sign of AI.",
  },
  {
    character: "Same-Length Sentences",
    unicode: "Uniform length",
    description: "Long sentences that are all close to the average length.",
  },
  {
    character: "Passive Voice",
    unicode: "was created by",
    description: "Passive phrases such as \"was created by\" or \"are used to\".",
  },
];

const howToSteps = [
  {
    title: "Paste or Upload Your Text",
    description: "Paste text from ChatGPT, Claude, Gemini, Word, or Google Docs. You can also upload a .docx, .txt, or .md file.",
  },
  {
    title: "Click Check AI Text",
    description: "The checker looks at common AI words, sentence length, and passive voice. It runs in your browser.",
  },
  {
    title: "Read the Score and Highlights",
    description: "See your Human and AI score, and check the reason next to each flagged sentence. Then edit or click Humanize & Copy.",
  },
];

const faqs = [
  {
    question: "Is this AI text detector free?",
    answer: "Yes. It is free to use, and you do not need an account or a sign-up.",
  },
  {
    question: "How does this AI text checker work?",
    answer:
      "It runs four simple checks: 25 common AI words and phrases, how much your sentence length changes, sentences that are all about the same length, and passive voice. Each flagged sentence shows the reason.",
  },
  {
    question: "Does it store or upload my text?",
    answer: "No. The check runs in your browser. Your text is not sent to a server and we do not save it.",
  },
  {
    question: "Can it tell if text came from ChatGPT, Claude, or Gemini?",
    answer:
      "It checks writing patterns, not the source. It cannot tell you which AI tool wrote a text, but you can paste text from any of them.",
  },
  {
    question: "How accurate is this AI text detector?",
    answer:
      "No AI detector is fully accurate, and this one uses simple rules. It can miss AI text and it can flag human text. Use the score as a hint, not as proof.",
  },
  {
    question: "Why was my own writing flagged as AI?",
    answer:
      "Plain or formal writing, sentences of the same length, and words like \"furthermore\" can all raise the score. This happens to many people, including non-native English writers. A high score does not mean you used AI.",
  },
  {
    question: "What is a good AI score?",
    answer:
      "There is no pass or fail number. A lower AI score means fewer AI signs were found. Read the highlighted sentences to see what caused the score.",
  },
  {
    question: "Can I check a Word document for AI text?",
    answer:
      "Yes. Copy the text from Word or Google Docs and paste it into the box, or upload a .docx, .txt, or .md file. Older .doc files are not supported, so save them as .docx first. The file is read in your browser and is not uploaded.",
  },
  {
    question: "Is an AI detector the same as a plagiarism checker?",
    answer:
      "No. A plagiarism checker compares your text with other sources. An AI detector looks at how the text is written. This tool does not check for plagiarism.",
  },
  {
    question: "How can I make AI text sound more human?",
    answer:
      "Remove common AI words, mix short and long sentences, and add your own examples and voice. Our AI word remover and humanizer can help with the first step.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Text Detector",
  url: pageUrl,
  description: pageDescription,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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

const breadcrumbJsonLd = generateBreadcrumbSchema([
  { name: "Home", url: siteUrl },
  { name: "AI Text Detector", url: pageUrl },
]);

export default function AITextDetectorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AIDetectorUI
        heading="Free AI Text Detector & Checker"
        subheading="Paste your text to check if it looks like it was written by AI. See which sentences are flagged and why. Free, no sign-up, and nothing leaves your browser."
      />
      <SubToolContent
        title="AI Text Detector"
        directAnswerTitle="Check AI Text: What This Tool Does and Its Limits"
        directAnswerText="This free AI text checker looks for common signs of AI writing: words that AI tools use a lot, sentences that are all the same length, and passive voice. It then gives you a Human score, an AI score, and a reason for each flagged sentence. Please keep the limits in mind. No AI detector can prove who wrote a text, and all of them sometimes flag real human writing, especially plain writing or writing by non-native English speakers. Use the result as one hint, not as a final answer."
        beforeExample="In today's fast-paced world, artificial intelligence serves as a testament to human innovation. Furthermore, delving into this digital realm allows us to foster pivotal advancements."
        afterExample="Flagged: low sentence-length variation, 3 common AI words and phrases"
        removedItems={removedItems}
        howToSteps={howToSteps}
        faqs={faqs}
        extraContent={<AIDetectorArticle />}
        hideSections={["beforeAfter", "featureTable", "mobileCallout", "valueProps"]}
      />
    </>
  );
}
