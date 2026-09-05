import LocalizedSubToolLayout, { generateSubToolMetadata } from '@/components/LocalizedSubToolLayout';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return generateSubToolMetadata(lang, 'cleanCopilot', 'clean-copilot-text');
}

export default async function LocalizedCleanCopilotPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <LocalizedSubToolLayout
      langCode={lang}
      subToolKey="cleanCopilot"
      initialOptions={{
        removeMarkdown: true,
        removeHiddenCharacters: true,
        normalizeQuotes: true,
      }}
    />
  );
}
