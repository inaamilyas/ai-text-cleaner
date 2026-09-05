import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: `Privacy Policy — AI Text Cleaner (${lang.toUpperCase()})`,
    description: `Read our privacy policy. 100% browser-based text sanitization with zero server storage.`,
    alternates: {
      canonical: `https://aitextcleaner.com/${lang}/privacy`,
    },
  };
}

export default async function LocalizedPrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const isRtl = l.dir === 'rtl';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="container mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20">
      <h1>Privacy Policy ({l.nativeName})</h1>
      <p className="text-body-md text-neutral-600">Last updated: September 5, 2026</p>

      <section className="flex flex-col gap-4">
        <h2>1. 100% Local Browser Processing Guarantee</h2>
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner operates completely inside your browser using client-side JavaScript. Any text you paste into our tool is processed locally on your device. We do not transmit, copy, log, or store your text on any external servers.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2>2. Data Collection & Analytics</h2>
        <p className="text-body-md text-neutral-700">
          We may collect anonymous aggregate usage statistics (such as page views and browser types) to optimize site performance and ad delivery. No personally identifiable information (PII) is ever collected.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2>3. Third-Party Advertising & Cookies</h2>
        <p className="text-body-md text-neutral-700">
          We use Google AdSense to serve advertisements. Google may use cookies (such as the DART cookie) to serve ads based on users' visits to our site and other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2>4. Contact Information</h2>
        <p className="text-body-md text-neutral-700">
          For privacy inquiries, please contact Founder Inam Ilyas at <a href="mailto:inaamilyas656@gmail.com" className="font-bold text-primary-700 underline">inaamilyas656@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}
