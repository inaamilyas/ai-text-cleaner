import { Cpu, Zap, Lock, Mail, Share2, Code2 } from "lucide-react";
import { LANGUAGES } from "@/lib/i18n/dictionaries";

export function generateStaticParams() {
  return Object.keys(LANGUAGES)
    .filter((code) => code !== "en")
    .map((lang) => ({ lang }));
}

interface AboutContent {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;
  leadershipTitle: string;
  leadershipDesc: string;
  role: string;
}

const aboutTranslations: Record<string, AboutContent> = {
  en: {
    title: "About Us — Text Cleaner AI",
    description: "Learn about Text Cleaner AI, created by Inam Ilyas. Privacy-first browser tool.",
    h1: "Sanitizing AI Text for Writers & Developers",
    subtitle: "Text Cleaner AI was created by Inam Ilyas to remove hidden zero-width characters, AI clichés, and raw Markdown clutter in AI-generated text.",
    card1Title: "100% Private",
    card1Desc: "Runs 100% locally in your browser memory. Zero server uploads.",
    card2Title: "Instant Performance",
    card2Desc: "Runs locally, so there's no queue or upload wait even for long documents.",
    card3Title: "Advanced Engine",
    card3Desc: "Strips zero-width spaces (U+200B), smart quotes, and robotic AI words.",
    leadershipTitle: "Leadership & Vision",
    leadershipDesc: "Created by Inam Ilyas to give copywriters, developers, and creators a free, privacy-first tool to sanitize AI text with a single click.",
    role: "Founder & Lead Engineer",
  },
  es: {
    title: "Sobre Nosotros — Text Cleaner AI",
    description: "Conozca Text Cleaner AI, creada por Inam Ilyas. Herramienta privada en el navegador.",
    h1: "Sanitización de Texto IA para Escritores y Desarrolladores",
    subtitle: "Text Cleaner AI fue creada por Inam Ilyas para eliminar caracteres invisibles de ancho cero, clichés de IA y desorden de Markdown en textos generados por IA.",
    card1Title: "100% Privado",
    card1Desc: "Se ejecuta 100% localmente en la memoria de su navegador. Sin cargas a servidores.",
    card2Title: "Rendimiento Instantáneo",
    card2Desc: "Se ejecuta localmente, por lo que no hay colas ni esperas incluso con documentos largos.",
    card3Title: "Motor Avanzado",
    card3Desc: "Elimina espacios de ancho cero (U+200B), comillas tipográficas y palabras robóticas de IA.",
    leadershipTitle: "Liderazgo y Visión",
    leadershipDesc: "Creado por Inam Ilyas para brindar a redactores, desarrolladores y creadores una herramienta gratuita y privada para limpiar texto de IA con un solo clic.",
    role: "Fundador e Ingeniero Principal",
  },
  de: {
    title: "Über Uns — Text Cleaner AI",
    description: "Erfahren Sie mehr über Text Cleaner AI von Inam Ilyas. Privates Browser-Tool.",
    h1: "KI-Textbereinigung für Autoren & Entwickler",
    subtitle: "Text Cleaner AI wurde von Inam Ilyas entwickelt, um versteckte Nullbreite-Zeichen, KI-Floskeln und unformatiertes Markdown aus KI-Texten zu entfernen.",
    card1Title: "100% Privat",
    card1Desc: "Läuft zu 100% lokal im Speicher Ihres Browsers. Keine Server-Uploads.",
    card2Title: "Sofortige Leistung",
    card2Desc: "Läuft lokal, daher keine Warteschlangen oder Wartezeiten, selbst bei langen Dokumenten.",
    card3Title: "Fortschrittliche Engine",
    card3Desc: "Entfernt Nullbreite-Leerzeichen (U+200B), typografische Anführungszeichen und KI-Modewörter.",
    leadershipTitle: "Führung & Vision",
    leadershipDesc: "Entwickelt von Inam Ilyas, um Autoren, Entwicklern und Kreativen ein kostenloses, privates Tool zur Bereinigung von KI-Text mit einem Klick zu bieten.",
    role: "Gründer & Leitender Ingenieur",
  },
  fr: {
    title: "À Propos — Text Cleaner AI",
    description: "Découvrez Text Cleaner AI, créé par Inam Ilyas. Outil privé dans le navigateur.",
    h1: "Assainir le Texte IA pour les Rédacteurs & Développeurs",
    subtitle: "Text Cleaner AI a été créé par Inam Ilyas pour éliminer les caractères invisibles sans chasse, les clichés IA et les balises Markdown brutes.",
    card1Title: "100% Privé",
    card1Desc: "Fonctionne à 100% localement dans la mémoire de votre navigateur. Aucun envoi sur serveur.",
    card2Title: "Performances Immédiates",
    card2Desc: "Exécution locale sans file d'attente ni délai de téléversement, même pour de longs documents.",
    card3Title: "Moteur Avancé",
    card3Desc: "Supprime les espaces sans chasse (U+200B), les guillemets courbes et le vocabulaire robotique.",
    leadershipTitle: "Leadership & Vision",
    leadershipDesc: "Créé par Inam Ilyas pour offrir aux rédacteurs, développeurs et créateurs un outil gratuit et respectueux de la vie privée en un clic.",
    role: "Fondateur & Ingénieur Principal",
  },
  it: {
    title: "Chi Siamo — Text Cleaner AI",
    description: "Scopri Text Cleaner AI, creato da Inam Ilyas. Strumento privato nel browser.",
    h1: "Sanificazione di Testi IA per Scrittori e Sviluppatori",
    subtitle: "Text Cleaner AI è stato creato da Inam Ilyas per eliminare caratteri invisibili a larghezza zero, cliché IA e residui di Markdown nei testi generati da IA.",
    card1Title: "100% Privato",
    card1Desc: "Funziona al 100% in locale nella memoria del tuo browser. Nessun caricamento su server.",
    card2Title: "Prestazioni Istantanee",
    card2Desc: "Esecuzione locale: nessuna coda né attesa di caricamento anche per documenti lunghi.",
    card3Title: "Motore Avanzato",
    card3Desc: "Rimuove spazi a larghezza zero (U+200B), virgolette tipografiche e parole robotiche.",
    leadershipTitle: "Leadership e Visione",
    leadershipDesc: "Creato da Inam Ilyas per offrire a copywriter, programmatori e creatori uno strumento gratuito e privato per sanificare testi IA con un clic.",
    role: "Fondatore e Ingegnere Principale",
  },
  pt: {
    title: "Sobre Nós — Text Cleaner AI",
    description: "Conheça o Text Cleaner AI, criado por Inam Ilyas. Ferramenta privada no navegador.",
    h1: "Higienização de Texto IA para Redatores e Desenvolvedores",
    subtitle: "O Text Cleaner AI foi criado por Inam Ilyas para remover caracteres invisíveis de largura zero, clichês de IA e formatações indesejadas de Markdown.",
    card1Title: "100% Privado",
    card1Desc: "Executado 100% localmente na memória do seu navegador. Zero envios para servidores.",
    card2Title: "Desempenho Instantâneo",
    card2Desc: "Processamento local, sem filas ou espera de carregamento, mesmo em textos extensos.",
    card3Title: "Mecanismo Avançado",
    card3Desc: "Limpa espaços de largura zero (U+200B), aspas curvas e expressões robóticas de IA.",
    leadershipTitle: "Liderança e Visão",
    leadershipDesc: "Criado por Inam Ilyas para oferecer a redatores, desenvolvedores e criadores uma ferramenta gratuita e privada para limpar textos de IA com um clique.",
    role: "Fundador e Engenheiro Líder",
  },
  ar: {
    title: "من نحن — Text Cleaner AI",
    description: "تعرف على Text Cleaner AI، التي أنشأها إينام إلياس. أداة خاصة تعمل داخل المتصفح.",
    h1: "تطهير نصوص الذكاء الاصطناعي للكتاب والمطورين",
    subtitle: "تم إنشاء Text Cleaner AI بواسطة إينام إلياس لإزالة الأحرف المخفية صفرية العرض، وعبارات الذكاء الاصطناعي المبتذلة، ومخلفات تنسيق Markdown.",
    card1Title: "خصوصية 100%",
    card1Desc: "تعمل الأداة بالكامل محلياً داخل ذاكرة متصفحك. لا يتم رفع أي بيانات للخوادم.",
    card2Title: "أداء فوري",
    card2Desc: "معالجة محلية بدون قوائم انتظار أو فترات تحميل حتى مع المستندات الطويلة.",
    card3Title: "محرك متقدم",
    card3Desc: "يزيل المسافات صفرية العرض (U+200B)، وعلامات التنصيص المائلة، وكلمات الذكاء الاصطناعي المبتذلة.",
    leadershipTitle: "الرؤية والقيادة",
    leadershipDesc: "أنشأها إينام إلياس لمنح الكتاب والمطورين والمبدعين أداة مجانية تراعي الخصوصية لتطهير نصوص الذكاء الاصطناعي بنقرة واحدة.",
    role: "المؤسس وكبير المهندسين",
  },
  ja: {
    title: "当サイトについて — Text Cleaner AI",
    description: "Inam Ilyasによって開発されたプライバシー最優先のブラウザツール、Text Cleaner AIについて。",
    h1: "ライターと開発者のためのAIテキスト衛生化",
    subtitle: "Text Cleaner AIは、AI生成テキストに含まれる隠しゼロ幅文字、AI特有の決まり文句、生のMarkdown構文を除去するためにInam Ilyasによって開発されました。",
    card1Title: "100% プライベート",
    card1Desc: "ブラウザのメモリ内のみで100%ローカル実行。サーバーへのデータ送信は一切ありません。",
    card2Title: "瞬時のパフォーマンス",
    card2Desc: "端末上で直接処理されるため、長文ドキュメントでも待機時間なしで即座に完了します。",
    card3Title: "高度なクリーニング機能",
    card3Desc: "ゼロ幅スペース（U+200B）、曲がり引用符、機械的なAI定型表現を漏れなく除去。",
    leadershipTitle: "リーダーシップと理念",
    leadershipDesc: "コピーライター、開発者、クリエイターがワンクリックでAIテキストを安全に衛生化できる無料ツールとして設立されました。",
    role: "創業者＆リードエンジニア",
  },
  nl: {
    title: "Over Ons — Text Cleaner AI",
    description: "Lees meer over Text Cleaner AI, gemaakt door Inam Ilyas. Privacygerichte browsertool.",
    h1: "AI Tekst Saniteren voor Schrijvers & Ontwikkelaars",
    subtitle: "Text Cleaner AI is gemaakt door Inam Ilyas om verborgen zero-width tekens, AI-clichés en Markdown-rommel uit AI-tekst te verwijderen.",
    card1Title: "100% Privé",
    card1Desc: "Draait 100% lokaal in het geheugen van uw browser. Nul server-uploads.",
    card2Title: "Directe Snelheid",
    card2Desc: "Werkt lokaal, dus geen wachttijden of uploadtijd, zelfs niet voor grote documenten.",
    card3Title: "Geavanceerde Engine",
    card3Desc: "Verwijdert zero-width spaces (U+200B), krullende aanhalingstekens en robotachtige AI-woorden.",
    leadershipTitle: "Leiderschap & Visie",
    leadershipDesc: "Opgericht door Inam Ilyas om copywriters, ontwikkelaars en makers een gratis, privacygerichte tool te bieden om AI-tekst met één klik op te schonen.",
    role: "Oprichter & Hoofdontwikkelaar",
  },
  tr: {
    title: "Hakkımızda — Text Cleaner AI",
    description: "Inam Ilyas tarafından geliştirilen Text Cleaner AI hakkında bilgi edinin. Tarayıcı tabanlı gizlilik öncelikli araç.",
    h1: "Yazarlar ve Geliştiriciler İçin Yapay Zeka Metin Temizliği",
    subtitle: "Text Cleaner AI, yapay zeka metinlerindeki gizli sıfır genişlikli karakterleri, AI kalıplarını ve Markdown fazlalıklarını temizlemek için Inam Ilyas tarafından geliştirildi.",
    card1Title: "%100 Gizli",
    card1Desc: "%100 yerel olarak tarayıcı belleğinizde çalışır. Sıfır sunucu yüklemesi.",
    card2Title: "Anında Performans",
    card2Desc: "Yerel olarak çalıştığından uzun belgelerde bile sıra bekleme veya yükleme süresi yoktur.",
    card3Title: "Gelişmiş Motor",
    card3Desc: "Sıfır genişlikli boşlukları (U+200B), akıllı tırnakları ve robotik AI kelimelerini temizler.",
    leadershipTitle: "Liderlik ve Vizyon",
    leadershipDesc: "Metin yazarları, geliştiriciler ve içerik üreticilerine yapay zeka metinlerini tek tıkla temizleme imkanı sunmak üzere Inam Ilyas tarafından kuruldu.",
    role: "Kurucu ve Baş Mühendis",
  },
  id: {
    title: "Tentang Kami — Text Cleaner AI",
    description: "Pelajari tentang Text Cleaner AI, dibuat oleh Inam Ilyas. Alat peramban yang mengutamakan privasi.",
    h1: "Sanitasi Teks AI untuk Penulis & Pengembang",
    subtitle: "Text Cleaner AI diciptakan oleh Inam Ilyas untuk menghapus karakter nol-lebar tersembunyi, kata klise AI, dan format Markdown pada teks hasil AI.",
    card1Title: "100% Privat",
    card1Desc: "Berjalan 100% secara lokal di memori peramban Anda. Nol unggahan ke server.",
    card2Title: "Kinerja Instan",
    card2Desc: "Diproses secara lokal, sehingga tidak ada antrean atau waktu tunggu bahkan untuk dokumen panjang.",
    card3Title: "Mesin Canggih",
    card3Desc: "Menghapus spasi nol-lebar (U+200B), tanda petik lengkung, dan kata-kata robotik AI.",
    leadershipTitle: "Kepemimpinan & Visi",
    leadershipDesc: "Diciptakan oleh Inam Ilyas untuk memberi para penulis, pengembang, dan kreator alat gratis yang menjaga privasi untuk membersihkan teks AI dalam satu klik.",
    role: "Pendiri & Pengembang Utama",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const t = aboutTranslations[lang] || aboutTranslations.en;

  return {
    title: `${t.title} (${l.nativeName})`,
    description: t.description,
    alternates: {
      canonical: `https://www.text-cleaner-ai.com/${lang}/about`,
      languages: {
        en: "https://www.text-cleaner-ai.com/about",
        es: "https://www.text-cleaner-ai.com/es/about",
        de: "https://www.text-cleaner-ai.com/de/about",
        fr: "https://www.text-cleaner-ai.com/fr/about",
        it: "https://www.text-cleaner-ai.com/it/about",
        pt: "https://www.text-cleaner-ai.com/pt/about",
        ar: "https://www.text-cleaner-ai.com/ar/about",
        ja: "https://www.text-cleaner-ai.com/ja/about",
        nl: "https://www.text-cleaner-ai.com/nl/about",
        tr: "https://www.text-cleaner-ai.com/tr/about",
        id: "https://www.text-cleaner-ai.com/id/about",
      },
    },
  };
}

export default async function LocalizedAboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = LANGUAGES[lang] || LANGUAGES.en;
  const t = aboutTranslations[lang] || aboutTranslations.en;
  const isRtl = l.dir === "rtl";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={`container mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20 ${isRtl ? "font-arabic" : ""}`}>
      <div className="flex flex-col gap-4 text-center">
        <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold">{t.h1}</h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-neutral-50">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-h6 text-neutral-900">{t.card1Title}</h3>
          <p className="text-body-sm text-neutral-600">
            {t.card1Desc}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-neutral-50">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-h6 text-neutral-900">{t.card2Title}</h3>
          <p className="text-body-sm text-neutral-600">
            {t.card2Desc}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-neutral-50">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="text-h6 text-neutral-900">{t.card3Title}</h3>
          <p className="text-body-sm text-neutral-600">
            {t.card3Desc}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-8 sm:p-10">
        <h2>{t.leadershipTitle}</h2>
        <p className="text-body-md text-neutral-700 leading-relaxed">
          {t.leadershipDesc}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-neutral-200 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 text-h6 font-bold text-neutral-50">
              II
            </div>
            <div>
              <p className="text-body-md font-bold text-neutral-900">Inam Ilyas</p>
              <p className="text-body-xs text-neutral-500">{t.role}</p>
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
