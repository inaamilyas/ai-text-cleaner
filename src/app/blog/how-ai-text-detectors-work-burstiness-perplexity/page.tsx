import type { Metadata } from "next";
import Link from "next/link";
import BlogDetailTemplate from "@/components/BlogDetailTemplate";

const slug = "how-ai-text-detectors-work-burstiness-perplexity";
const title = "How AI Text Detectors Work: Perplexity and Burstiness Explained";
const description =
  "Learn how an AI text detector decides if writing looks like AI. Simple explanations of perplexity, burstiness, and word patterns, plus why no detector is ever certain.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `/blog/${slug}` },
  openGraph: { title, description, url: `https://www.text-cleaner-ai.com/blog/${slug}` },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: "2026-09-25",
  dateModified: "2026-09-25",
  author: { "@type": "Person", name: "Inam Ilyas", url: "https://github.com/inaamilyas" },
  publisher: { "@type": "Organization", name: "Text Cleaner AI", url: "https://www.text-cleaner-ai.com" },
  mainEntityOfPage: `https://www.text-cleaner-ai.com/blog/${slug}`,
};

const h2 = "text-2xl font-bold text-on-surface tracking-tight";
const p = "text-base text-on-surface-variant leading-relaxed";
const link = "text-primary font-bold hover:underline";

export default function Page() {
  return (
    <BlogDetailTemplate
      currentSlug={slug}
      title={title}
      subtitle="An AI text detector does not read your mind, and it does not know who wrote your text. Here is what it really measures, in plain English."
      category="AI Writing & Tone"
      categoryTag="How It Works"
      date="September 25, 2026"
      readTime="6 min read"
      articleJsonLd={articleJsonLd}
      tldrSummary="AI text detectors look for patterns, mainly how predictable the words are (perplexity) and how much the sentence length changes (burstiness). These are clues, not proof."
      tldrPoints={[
        { title: "Perplexity", desc: "How surprising the word choices are. Very predictable text can look like AI." },
        { title: "Burstiness", desc: "How much sentence length varies. Flat, even rhythm is a common AI sign." },
        { title: "Not proof", desc: "Every detector makes mistakes, so treat the score as a hint." },
      ]}
    >
      <section className="space-y-4">
        <h2 className={h2}>What Is an AI Text Detector Trying to Do?</h2>
        <p className={p}>
          An AI text detector looks at a piece of writing and guesses if a person or an AI tool wrote it. It cannot see
          how the text was made. It can only look at the words on the page and compare them with patterns it knows.
        </p>
        <p className={p}>
          That is why the answer is always a guess, often shown as a percentage. A high number means the text has many
          AI-like patterns. It does not mean the text was definitely written by AI.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>Perplexity: How Predictable Is the Text?</h2>
        <p className={p}>
          Perplexity is a way to measure how surprised a language model is by the next word. Take the sentence &quot;The
          cat sat on the ...&quot;. Almost any model expects the word &quot;mat&quot;. That is low perplexity. If the next
          word is &quot;submarine&quot;, the model is surprised. That is high perplexity.
        </p>
        <p className={p}>
          AI tools write by picking likely words, so their text often has low perplexity. People are less predictable.
          We use odd words, jokes, and half-finished thoughts. So some detectors treat very predictable text as a sign
          of AI.
        </p>
        <p className={p}>
          The catch is that some human writing is also very predictable, such as legal text, simple instructions, or
          writing by someone who is still learning English.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>Burstiness: How Much Does Sentence Length Change?</h2>
        <p className={p}>
          Burstiness is about rhythm. People often write a short sentence. Then a longer one that adds detail and
          explains the idea. Then short again. AI text tends to keep sentences closer to the same length, so the rhythm
          feels flat.
        </p>
        <p className={p}>
          Detectors measure this by counting the words in each sentence and checking how much the numbers vary. Little
          variation gives a higher AI score. The term became popular through detectors such as GPTZero.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>Other Signals: Word Lists and Trained Models</h2>
        <p className={p}>
          Some detectors also look for words that AI tools use too often, like &quot;delve&quot;, &quot;tapestry&quot;,
          and &quot;furthermore&quot;. Read more in our guide to{" "}
          <Link href="/blog/overused-llm-cliches-delve-tapestry" className={link}>overused AI clichés</Link>.
        </p>
        <p className={p}>
          Bigger detectors use a trained classifier. Its makers show it many human texts and many AI texts, and it
          learns to tell them apart. That can work better on the kind of text it learned from, but it can fail on new
          AI models, edited text, or writing styles it has not seen.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>What Our Detector Does</h2>
        <p className={p}>
          Our free <Link href="/ai-text-detector" className={link}>AI text detector</Link> is simple on purpose. It does
          not measure perplexity. It checks 25 common AI words and phrases, sentence length variation, sentences of the
          same length, and passive voice. It shows the reason for every flagged sentence, so you can judge it yourself.
          Everything runs in your browser and your text is not uploaded.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>Why No Detector Is Ever Certain</h2>
        <p className={p}>
          AI models change fast, people edit AI drafts, and many people write in a plain style. All of this blurs the
          line. In 2023, OpenAI closed its own AI text classifier because of its low accuracy. So use any score as one
          clue, and check it against what you know about the writer and the draft. Our next guide explains{" "}
          <Link href="/blog/why-ai-detectors-flag-human-writing" className={link}>why detectors flag human writing</Link>.
        </p>
      </section>
    </BlogDetailTemplate>
  );
}
