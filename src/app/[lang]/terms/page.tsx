import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: `Terms of Service — AI Text Cleaner (${lang.toUpperCase()})`,
    description: `Terms of service and usage conditions for AI Text Cleaner.`,
    alternates: {
      canonical: `https://aitextcleaner.com/${lang}/terms`,
    },
  };
}

export default async function LocalizedTermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === 'rtl';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="container mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20">
      <h1>Terms of Service ({l.nativeName})</h1>
      <p className="text-body-md text-neutral-600">Last updated: September 5, 2026</p>

      <section className="flex flex-col gap-4">
        <h2>1. Acceptance of Terms</h2>
        <p className="text-body-md text-neutral-700">
          By accessing AI Text Cleaner, you agree to comply with these terms of service. Our tool is provided free of charge for personal and commercial use.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2>2. Disclaimer of Warranties</h2>
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner is provided "as is" without warranty of any kind. While we strive for 100% accuracy in text sanitization, we are not liable for any unintended modification of input text.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2>3. Intellectual Property</h2>
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner is created and owned by Inam Ilyas. You retain full ownership of all text processed through the utility.
        </p>
      </section>
    </div>
  );
}
