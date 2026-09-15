import { Mail, Share2, Code2 } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== 'en')
    .map((lang) => ({ lang }));
}

interface ContactContent {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  founderLabel: string;
  directEmail: string;
  linkedIn: string;
  gitHub: string;
}

const contactTranslations: Record<string, ContactContent> = {
  en: {
    title: "Contact Us — Text Cleaner AI",
    description: "Get in touch with Inam Ilyas and the Text Cleaner AI team.",
    h1: "Contact Text Cleaner AI",
    subtitle: "Have questions, bug reports, or feature requests? Contact Founder & Developer Inam Ilyas.",
    founderLabel: "Founder & Developer",
    directEmail: "Direct Email",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  es: {
    title: "Contáctenos — Text Cleaner AI",
    description: "Póngase en contacto con Inam Ilyas y el equipo de Text Cleaner AI.",
    h1: "Contactar a Text Cleaner AI",
    subtitle: "¿Tiene preguntas, informes de errores o solicitudes de funciones? Póngase en contacto con el fundador y desarrollador Inam Ilyas.",
    founderLabel: "Fundador y Desarrollador",
    directEmail: "Correo Directo",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  de: {
    title: "Kontakt — Text Cleaner AI",
    description: "Treten Sie mit Inam Ilyas und dem Team von Text Cleaner AI in Kontakt.",
    h1: "Kontaktieren Sie Text Cleaner AI",
    subtitle: "Haben Sie Fragen, Fehlerberichte oder Feature-Anfragen? Kontaktieren Sie Gründer & Entwickler Inam Ilyas.",
    founderLabel: "Gründer & Entwickler",
    directEmail: "Direkte E-Mail",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  fr: {
    title: "Contactez-nous — Text Cleaner AI",
    description: "Contactez Inam Ilyas et l'équipe de Text Cleaner AI.",
    h1: "Contacter Text Cleaner AI",
    subtitle: "Des questions, des signalements de bugs ou des demandes de fonctionnalités ? Contactez le fondateur et développeur Inam Ilyas.",
    founderLabel: "Fondateur & Développeur",
    directEmail: "E-mail Direct",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  it: {
    title: "Contatti — Text Cleaner AI",
    description: "Mettiti in contatto con Inam Ilyas e il team di Text Cleaner AI.",
    h1: "Contatta Text Cleaner AI",
    subtitle: "Hai domande, segnalazioni di bug o richieste di nuove funzionalità? Contatta il fondatore e sviluppatore Inam Ilyas.",
    founderLabel: "Fondatore e Sviluppatore",
    directEmail: "Email Diretta",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  pt: {
    title: "Fale Conosco — Text Cleaner AI",
    description: "Entre em contato com Inam Ilyas e a equipe do Text Cleaner AI.",
    h1: "Contato Text Cleaner AI",
    subtitle: "Tem dúvidas, relatórios de bugs ou sugestões de recursos? Entre em contato com o fundador e desenvolvedor Inam Ilyas.",
    founderLabel: "Fundador e Desenvolvedor",
    directEmail: "E-mail Direto",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  ar: {
    title: "اتصل بنا — Text Cleaner AI",
    description: "تواصل مع إينام إلياس وفريق Text Cleaner AI.",
    h1: "الاتصال بـ Text Cleaner AI",
    subtitle: "هل لديك أسئلة، أو بلاغات عن أخطاء، أو طلبات لميزات جديدة؟ تواصل مع المؤسس والمطور إينام إلياس.",
    founderLabel: "المؤسس والمطور",
    directEmail: "البريد الإلكتروني المباشر",
    linkedIn: "لينكد إن (LinkedIn)",
    gitHub: "جيت هاب (GitHub)",
  },
  ja: {
    title: "お問い合わせ — Text Cleaner AI",
    description: "Inam IlyasおよびText Cleaner AIチームへのお問い合わせはこちら。",
    h1: "Text Cleaner AI へのお問い合わせ",
    subtitle: "ご質問、バグの報告、機能のご要望などがございましたら、創業者兼開発者の Inam Ilyas までお気軽にご連絡ください。",
    founderLabel: "創業者兼開発者",
    directEmail: "ダイレクトメール",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  nl: {
    title: "Contact — Text Cleaner AI",
    description: "Neem contact op met Inam Ilyas en het Text Cleaner AI-team.",
    h1: "Contact opnemen met Text Cleaner AI",
    subtitle: "Heeft u vragen, bugmeldingen of functieverzoeken? Neem contact op met oprichter & ontwikkelaar Inam Ilyas.",
    founderLabel: "Oprichter & Ontwikkelaar",
    directEmail: "Directe E-mail",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  tr: {
    title: "İletişim — Text Cleaner AI",
    description: "Inam Ilyas ve Text Cleaner AI ekibiyle iletişime geçin.",
    h1: "Text Cleaner AI ile İletişime Geçin",
    subtitle: "Sorularınız, hata bildirimleriniz veya özellik talepleriniz mi var? Kurucu ve Geliştirici Inam Ilyas ile iletişime geçin.",
    founderLabel: "Kurucu ve Geliştirici",
    directEmail: "Doğrudan E-posta",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
  id: {
    title: "Hubungi Kami — Text Cleaner AI",
    description: "Hubungi Inam Ilyas dan tim Text Cleaner AI.",
    h1: "Hubungi Text Cleaner AI",
    subtitle: "Punya pertanyaan, laporan bug, atau permintaan fitur? Hubungi Pendiri & Pengembang Inam Ilyas.",
    founderLabel: "Pendiri & Pengembang",
    directEmail: "Email Langsung",
    linkedIn: "LinkedIn",
    gitHub: "GitHub",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const t = contactTranslations[lang] || contactTranslations.en;

  return {
    title: `${t.title} (${l.nativeName})`,
    description: t.description,
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
  const t = contactTranslations[lang] || contactTranslations.en;
  const isRtl = l.dir === 'rtl';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`container mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20 ${isRtl ? 'font-arabic' : ''}`}>
      <div className="flex flex-col gap-3 text-center">
        <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold">
          {t.h1} ({l.nativeName})
        </h1>
        <p className="text-body-lg text-neutral-600 max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-6 text-center">
          <Mail className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">{t.directEmail}</h3>
          <a
            href="mailto:inaamilyas656@gmail.com"
            className="text-body-xs font-bold text-primary-700 underline break-all"
          >
            inaamilyas656@gmail.com
          </a>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-6 text-center">
          <Share2 className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">{t.linkedIn}</h3>
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
          <h3 className="text-h6 text-neutral-900">{t.gitHub}</h3>
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
