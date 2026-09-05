import LocalizedSubToolLayout, { generateSubToolMetadata } from '@/components/LocalizedSubToolLayout';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return generateSubToolMetadata(lang, 'cleanChatGPT', 'clean-chatgpt-text');
}

export default async function LocalizedCleanChatGPTPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <LocalizedSubToolLayout
      langCode={lang}
      subToolKey="cleanChatGPT"
      initialOptions={{
        removeMarkdown: true,
        normalizeQuotes: true,
        normalizeDashes: true,
        removeTrailingWhitespace: true,
        removeHiddenCharacters: true,
      }}
    />
  );
}
