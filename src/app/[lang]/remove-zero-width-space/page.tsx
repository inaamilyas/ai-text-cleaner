import LocalizedSubToolLayout, { generateSubToolMetadata } from '@/components/LocalizedSubToolLayout';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return generateSubToolMetadata(lang, 'removeZeroWidthSpace', 'remove-zero-width-space');
}

export default async function LocalizedRemoveZeroWidthSpacePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <LocalizedSubToolLayout
      langCode={lang}
      subToolKey="removeZeroWidthSpace"
      initialOptions={{
        removeHiddenCharacters: true,
        convertNonBreakingSpaces: true,
      }}
    />
  );
}
