import type { Metadata } from "next";
import Link from "next/link";
import BlogDetailTemplate from "@/components/BlogDetailTemplate";

const slug = "how-to-tell-if-text-is-written-by-chatgpt";
const title = "How to Tell If Text Was Written by ChatGPT: 10 Signs to Look For";
const description =
  "10 simple signs that text may be written by ChatGPT or another AI, from overused words to flat sentence rhythm. Plus how to check text with a free AI text checker.";

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
  datePublished: "2026-09-23",
  dateModified: "2026-09-23",
  author: { "@type": "Person", name: "Inam Ilyas", url: "https://github.com/inaamilyas" },
  publisher: { "@type": "Organization", name: "Text Cleaner AI", url: "https://www.text-cleaner-ai.com" },
  mainEntityOfPage: `https://www.text-cleaner-ai.com/blog/${slug}`,
};

const h2 = "text-2xl font-bold text-on-surface tracking-tight";
const p = "text-base text-on-surface-variant leading-relaxed";
const link = "text-primary font-bold hover:underline";

const signs = [
  {
    title: "Overused AI words",
    desc: "Words like \"delve\", \"tapestry\", \"realm\", \"testament\", \"pivotal\", and \"multifaceted\" show up far more often than in normal writing.",
  },
  {
    title: "Stiff transition words",
    desc: "Many sentences start with \"Furthermore\", \"Moreover\", or \"In conclusion\", even in casual text.",
  },
  {
    title: "Flat sentence rhythm",
    desc: "Almost every sentence has about the same length and shape, so the text reads like a metronome.",
  },
  {
    title: "Lists of three",
    desc: "Ideas often come in neat groups of three, such as \"fast, simple, and reliable\".",
  },
  {
    title: "It repeats your question",
    desc: "The first sentence often restates the topic instead of getting to the point.",
  },
  {
    title: "Hedging phrases",
    desc: "Lines like \"it is important to note\" and \"it is worth noting\" add words but no information.",
  },
  {
    title: "No real details",
    desc: "The text sounds right but has no names, dates, numbers, or personal stories.",
  },
  {
    title: "A generic ending",
    desc: "The last paragraph repeats the points and ends with a tidy, general summary.",
  },
  {
    title: "Perfect but bland tone",
    desc: "The grammar is flawless, yet there is no opinion, humor, or voice.",
  },
  {
    title: "Messy formatting from the chat",
    desc: "Stray asterisks, pound signs, curly quotes, or invisible characters can be left over from pasting a chat reply.",
  },
];

export default function Page() {
  return (
    <BlogDetailTemplate
      currentSlug={slug}
      title={title}
      subtitle="There is no sure way to know, but there are clear patterns. Here are 10 signs, and how to check text quickly."
      category="AI Writing & Tone"
      categoryTag="Spot AI Text"
      date="September 23, 2026"
      readTime="5 min read"
      articleJsonLd={articleJsonLd}
      tldrSummary="ChatGPT text often has overused words, stiff transitions, and an even rhythm. One sign proves nothing, but several together are a good clue."
      tldrPoints={[
        { title: "Look for groups", desc: "One sign is normal. Many signs together are worth a closer look." },
        { title: "Use a checker", desc: "A free AI text checker can highlight the patterns for you." },
        { title: "Stay fair", desc: "Real people write like this too, so never treat it as proof." },
      ]}
    >
      <section className="space-y-4">
        <h2 className={h2}>The Short Answer</h2>
        <p className={p}>
          You cannot be 100% sure that a text was written by ChatGPT. But AI writing leaves habits, and once you know
          them they are easy to spot. Here are ten of the most common signs.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>10 Signs Text May Be Written by AI</h2>
        <ol className="space-y-4">
          {signs.map((sign, idx) => (
            <li key={sign.title} className="flex gap-3">
              <span className="w-7 h-7 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-on-surface">{sign.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{sign.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>Check It Quickly With a Free AI Text Checker</h2>
        <p className={p}>
          Reading text by eye takes time. Paste it into our free{" "}
          <Link href="/ai-text-detector" className={link}>AI text detector</Link> and it will highlight AI words, flat
          sentence rhythm, and passive voice, with a reason next to every flagged sentence. It runs in your browser, so
          your text stays private.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>Be Careful: These Signs Are Not Proof</h2>
        <p className={p}>
          People write like this too, especially in formal or business writing. Read{" "}
          <Link href="/blog/why-ai-detectors-flag-human-writing" className={link}>why detectors flag human writing</Link>{" "}
          before you judge anyone by a score.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-surface-container">
        <h2 className={h2}>How to Make AI Text Sound More Human</h2>
        <p className={p}>
          If you use AI to draft, edit it. Replace the overused words with the{" "}
          <Link href="/remove-ai-words" className={link}>AI word remover</Link>, clean pasted formatting with the{" "}
          <Link href="/clean-chatgpt-text" className={link}>ChatGPT text cleaner</Link>, then add your own examples,
          numbers, and opinions. Mix short and long sentences. That does more than any tool.
        </p>
      </section>
    </BlogDetailTemplate>
  );
}
