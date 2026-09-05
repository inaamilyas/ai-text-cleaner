import LocalizedPageLayout, { generateLocalizedMetadata } from '@/components/LocalizedPageLayout';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return generateLocalizedMetadata(lang);
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <LocalizedPageLayout langCode={lang} />;
}
