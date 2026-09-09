import { Mail, Share2, Code2 } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  return {
    title: `Contact Us — AI Text Cleaner (${l.nativeName})`,
    description: `Get in touch with Inam Ilyas and the AI Text Cleaner team.`,
    alternates: {
      canonical: `https://www.text-cleaner-ai.com/${lang}/contact`,
      languages: {
        en: "https://www.text-cleaner-ai.com/contact",
        es: "https://www.text-cleaner-ai.com/es/contact",
        de: "https://www.text-cleaner-ai.com/de/contact",
        fr: "https://www.text-cleaner-ai.com/fr/contact",
        it: "https://www.text-cleaner-ai.com/it/contact",
        pt: "https://www.text-cleaner-ai.com/pt/contact",
        ar: "https://www.text-cleaner-ai.com/ar/contact",
        ja: "https://www.text-cleaner-ai.com/ja/contact",
        nl: "https://www.text-cleaner-ai.com/nl/contact",
        tr: "https://www.text-cleaner-ai.com/tr/contact",
        id: "https://www.text-cleaner-ai.com/id/contact",
      },
    },
  };
}

export default async function LocalizedContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === 'rtl';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="container mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20">
      <div className="flex flex-col gap-3 text-center">
        <h1>Contact AI Text Cleaner ({l.nativeName})</h1>
        <p className="text-body-lg text-neutral-600 max-w-xl mx-auto">
          Have questions, bug reports, or feature requests? Contact Founder & Developer <strong>Inam Ilyas</strong>.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-6 text-center">
          <Mail className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">Direct Email</h3>
          <a
            href="mailto:inaamilyas656@gmail.com"
            className="text-body-xs font-bold text-primary-700 underline break-all"
          >
            inaamilyas656@gmail.com
          </a>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-6 text-center">
          <Share2 className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">LinkedIn</h3>
          <a
            href="https://www.linkedin.com/in/inam-ilyas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-xs font-bold text-primary-700 underline"
          >
            Inam Ilyas
          </a>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-6 text-center">
          <Code2 className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">GitHub</h3>
          <a
            href="https://github.com/inaamilyas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-xs font-bold text-primary-700 underline"
          >
            @inaamilyas
          </a>
        </div>
      </div>
    </div>
  );
}
