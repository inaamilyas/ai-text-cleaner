import LocalizedSubToolLayout, { generateSubToolMetadata } from '@/components/LocalizedSubToolLayout';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return generateSubToolMetadata(lang, 'smartQuotesToStraightQuotes', 'smart-quotes-to-straight-quotes');
}

export default async function LocalizedSmartQuotesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <LocalizedSubToolLayout
      langCode={lang}
      subToolKey="smartQuotesToStraightQuotes"
      initialOptions={{
        normalizeQuotes: true,
        normalizeDashes: true,
      }}
    />
  );
}
