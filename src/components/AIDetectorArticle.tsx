import Link from "next/link";

const h2 = "font-headline-lg text-headline-lg text-on-surface font-semibold";
const h3 = "font-headline-sm text-headline-sm text-on-surface font-semibold";
const p = "font-body-md text-body-md text-on-surface-variant leading-relaxed";
const link = "text-primary font-semibold hover:underline";

export default function AIDetectorArticle() {
  return (
    <article className="w-full bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-highest/60 flex flex-col gap-space-lg">
      <section className="flex flex-col gap-space-xs">
        <h2 className={h2}>What Is an AI Text Detector?</h2>
        <p className={p}>
          An AI text detector is a tool that checks if a piece of writing looks like it was made by an AI tool such as
          ChatGPT. It looks for patterns that AI often leaves behind, like repeated phrases and sentences that are all
          the same length, and then gives you a score.
        </p>
        <p className={p}>
          People search for this tool in many ways: an AI text checker, an AI checker for text, or a way to check AI
          text before they publish or submit it. They all mean the same thing. You paste your writing, click check, and
          see which parts look like AI.
        </p>
      </section>

      <section className="flex flex-col gap-space-sm">
        <h2 className={h2}>How Our Free AI Text Checker Works</h2>
        <p className={p}>
          This is a simple, rule-based checker. It is not a trained AI model. It runs four clear checks on your text,
          and it shows you the reason for each flag so you can decide for yourself.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
          <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex flex-col gap-1">
            <h3 className={h3}>1. Common AI words and phrases</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              AI tools use some words far more than people do. We look for 25 of them, such as &quot;delve&quot;,
              &quot;tapestry&quot;, &quot;realm&quot;, &quot;pivotal&quot;, &quot;furthermore&quot;, and &quot;in
              conclusion&quot;. Each one adds to the AI score of that sentence.
            </p>
          </div>
          <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex flex-col gap-1">
            <h3 className={h3}>2. Sentence length variation</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              People mix short and long sentences. AI writing is often flat, with every sentence about the same size.
              If your text has very little variation, the score goes up. This is often called burstiness.
            </p>
          </div>
          <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex flex-col gap-1">
            <h3 className={h3}>3. Sentences of the same length</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              A long sentence that is close to the average length of the whole text gets a small penalty. One like this
              is normal. Many of them in a row make the text feel robotic.
            </p>
          </div>
          <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex flex-col gap-1">
            <h3 className={h3}>4. Passive voice</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Phrases like &quot;was created by&quot; or &quot;are used to&quot; show up a lot in AI text. We flag this
              pattern when we find it.
            </p>
          </div>
        </div>
        <p className={p}>
          Everything runs in your browser. Your text is not sent to any server, and we do not store it.
        </p>
      </section>

      <section className="flex flex-col gap-space-xs">
        <h2 className={h2}>How to Read Your AI Score</h2>
        <p className={p}>
          You get two numbers, a Human score and an AI score, that add up to 100. You also get one of five labels:
        </p>
        <ul className="list-disc pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant">
          <li>
            <strong className="text-on-surface">Highly Likely Human</strong> and{" "}
            <strong className="text-on-surface">Likely Human</strong>: few or no AI signs were found.
          </li>
          <li>
            <strong className="text-on-surface">Mixed / Uncertain</strong>: some signs were found, but not enough to
            say much. Read the highlighted sentences.
          </li>
          <li>
            <strong className="text-on-surface">Likely AI Generated</strong> and{" "}
            <strong className="text-on-surface">Highly Likely AI Generated</strong>: many AI signs were found.
          </li>
        </ul>
        <p className={p}>
          Each sentence is also marked on its own, with the reason next to it. That is the most useful part. You can
          see exactly which sentence looks like AI and why, then rewrite it.
        </p>
      </section>

      <section className="flex flex-col gap-space-xs">
        <h2 className={h2}>Check Text From ChatGPT, Claude, Gemini and Copilot</h2>
        <p className={p}>
          The checker looks at the writing itself, so it works the same way no matter which tool wrote the text. You can
          paste a draft from ChatGPT, Claude, Gemini, or Copilot.
        </p>
        <p className={p}>
          If the text also has hidden characters or messy formatting from the AI chat, clean it first with our{" "}
          <Link href="/clean-chatgpt-text" className={link}>ChatGPT text cleaner</Link>,{" "}
          <Link href="/clean-claude-text" className={link}>Claude text cleaner</Link>,{" "}
          <Link href="/clean-gemini-text" className={link}>Gemini text cleaner</Link>, or{" "}
          <Link href="/clean-copilot-text" className={link}>Copilot text cleaner</Link>.
        </p>
      </section>

      <section className="flex flex-col gap-space-xs">
        <h2 className={h2}>How to Check a Word or Google Docs Text for AI</h2>
        <p className={p}>
          The easiest way is to open your file in Word or Google Docs, select the text, copy it, and paste it into the
          box above. You can also upload a .docx, .txt, or .md file and we will read the text for you. Older .doc files
          are not supported, so save them as .docx first. The file is read in your browser and is not uploaded.
        </p>
      </section>

      <section className="flex flex-col gap-space-xs">
        <h2 className={h2}>How Accurate Is an AI Text Detector?</h2>
        <p className={p}>
          No AI detector is fully accurate, and ours is no exception. Because this tool uses simple rules, it can miss AI
          text that avoids the usual words. It can also flag real human writing, especially writing that is plain,
          formal, or written by someone who is learning English.
        </p>
        <p className={p}>
          So use the result as a hint, not proof. Never accuse someone of using AI because of one score. If you want to
          reduce the AI feel of a draft, try our{" "}
          <Link href="/remove-ai-words" className={link}>AI word remover</Link> or read about{" "}
          <Link href="/blog/overused-llm-cliches-delve-tapestry" className={link}>overused AI clichés</Link>.
        </p>
      </section>

      <section className="flex flex-col gap-space-xs">
        <h2 className={h2}>Who Uses an AI Text Checker?</h2>
        <ul className="list-disc pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant">
          <li>Writers and bloggers who want their drafts to sound more natural before they publish.</li>
          <li>Editors and SEO teams who review content from many writers.</li>
          <li>Students who want to see if a draft reads like a robot wrote it.</li>
          <li>Teachers who want a quick first look, followed by a real conversation, never a final verdict.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-space-sm">
        <h2 className={h2}>AI Detector vs. AI Humanizer vs. AI Text Cleaner</h2>
        <p className={p}>These three tools sound alike, but each one does a different job.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-code-stat text-code-stat">
                <th className="py-3 px-4 rounded-l">Tool</th>
                <th className="py-3 px-4">What it does</th>
                <th className="py-3 px-4 rounded-r">Use it when</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              <tr>
                <td className="py-3 px-4 font-medium text-on-surface">AI text detector</td>
                <td className="py-3 px-4 text-on-surface-variant">Checks text and shows AI signs</td>
                <td className="py-3 px-4 text-on-surface-variant">You want to know how AI-like a draft looks</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-on-surface">
                  <Link href="/humanize-ai-text" className={link}>AI humanizer</Link>
                </td>
                <td className="py-3 px-4 text-on-surface-variant">Rewrites AI-style wording</td>
                <td className="py-3 px-4 text-on-surface-variant">You want to remove robotic phrases</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-on-surface">
                  <Link href="/remove-invisible-characters" className={link}>AI text cleaner</Link>
                </td>
                <td className="py-3 px-4 text-on-surface-variant">Removes hidden characters and formatting</td>
                <td className="py-3 px-4 text-on-surface-variant">Text pasted from AI looks or behaves strangely</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={p}>
          Want to check how easy your text is to read too? Try the{" "}
          <Link href="/check-readability-score" className={link}>readability score checker</Link>.
        </p>
      </section>

      <section className="flex flex-col gap-space-xs">
        <h2 className={h2}>Learn More About AI Detection</h2>
        <ul className="list-disc pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant">
          <li>
            <Link href="/blog/how-ai-text-detectors-work-burstiness-perplexity" className={link}>
              How AI text detectors work: perplexity and burstiness
            </Link>
          </li>
          <li>
            <Link href="/blog/why-ai-detectors-flag-human-writing" className={link}>
              Why AI detectors flag human writing
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-tell-if-text-is-written-by-chatgpt" className={link}>
              How to tell if text was written by ChatGPT: 10 signs
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
