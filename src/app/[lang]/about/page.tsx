import Link from "next/link";
import { ShieldCheck, Cpu, Zap, Lock, Sparkles, ArrowRight, Mail, Share2, Code2 } from "lucide-react";
import { LANGUAGES } from "@/lib/i18n/dictionaries";

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== "en")
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  return {
    title: `About Us — AI Text Cleaner (${l.nativeName})`,
    description: `Learn about AI Text Cleaner, created by Inam Ilyas. Privacy-first browser tool.`,
    alternates: {
      canonical: `https://aitextcleaner.com/${lang}/about`,
    },
  };
}

export default async function LocalizedAboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === 'rtl';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="container mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20">
      <div className="flex flex-col gap-4 text-center">
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 text-body-xs font-bold text-primary-700 border border-primary-200">
          <Sparkles className="h-4 w-4" /> About AI Text Cleaner ({l.nativeName})
        </span>
        <h1>Sanitizing AI Text for Writers & Developers</h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
          AI Text Cleaner was created by <strong>Inam Ilyas</strong> to remove hidden zero-width characters, AI clichés, and raw Markdown clutter in AI-generated text.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-neutral-50">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-h6 text-neutral-900">100% Private</h3>
          <p className="text-body-sm text-neutral-600">
            Runs 100% locally in your browser memory. Zero server uploads.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-neutral-50">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-h6 text-neutral-900">Instant Performance</h3>
          <p className="text-body-sm text-neutral-600">
            Clean 50,000+ words in milliseconds with 1-click preset filters.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-neutral-50">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="text-h6 text-neutral-900">Advanced Engine</h3>
          <p className="text-body-sm text-neutral-600">
            Strips zero-width spaces (U+200B), smart quotes, and robotic AI words.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10">
        <h2>Leadership & Vision</h2>
        <p className="text-body-md text-neutral-700 leading-relaxed">
          Created by <strong>Inam Ilyas</strong> to give copywriters, developers, and creators a free, privacy-first tool to sanitize AI text with a single click.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-neutral-200 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-h6 font-bold text-neutral-50">
              II
            </div>
            <div>
              <p className="text-body-md font-bold text-neutral-900">Inam Ilyas</p>
              <p className="text-body-xs text-neutral-500">Founder & Lead Engineer</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 ml-auto">
            <a
              href="https://www.linkedin.com/in/inam-ilyas/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-body-sm font-bold text-primary-700 no-underline hover:underline"
            >
              <Share2 className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="https://github.com/inaamilyas/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-body-sm font-bold text-primary-700 no-underline hover:underline"
            >
              <Code2 className="h-4 w-4" /> GitHub
            </a>
            <a
              href="mailto:inaamilyas656@gmail.com"
              className="flex items-center gap-1.5 text-body-sm font-bold text-primary-700 no-underline hover:underline"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
