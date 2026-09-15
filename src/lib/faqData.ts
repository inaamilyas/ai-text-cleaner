export const defaultFaqs = [
  {
    question: "Is this really free?",
    answer: "Yes. No sign-up, no word limit, no paywall.",
  },
  {
    question: "Does it upload or store my text?",
    answer:
      "No. Everything runs in your browser and nothing is sent to a server.",
  },
  {
    question: "Will it change the meaning of my writing?",
    answer:
      "No. It only removes formatting and hidden characters. Your words stay the same, unless you turn on buzzword removal, which swaps a small number of overused AI phrases for plainer ones.",
  },
  {
    question: "Does this work for ChatGPT, Claude, and Gemini text?",
    answer:
      "Yes — and Copilot and DeepSeek too. Each has its own quirks, and there are dedicated presets for each one below.",
  },
];

export const localizedFaqs: Record<string, typeof defaultFaqs> = {
  es: [
    {
      question: "¿Es realmente gratis?",
      answer: "Sí. Sin registro, sin límite de palabras, sin muros de pago.",
    },
    {
      question: "¿Sube o almacena mi texto?",
      answer: "No. Todo se ejecuta en su navegador y nada se envía a ningún servidor.",
    },
    {
      question: "¿Cambiará el significado de lo que escribí?",
      answer: "No. Solo elimina el formato y los caracteres ocultos. Sus palabras permanecen iguales, a menos que active la eliminación de palabras cliché, que reemplaza un pequeño número de frases sobreutilizadas de IA por otras más sencillas.",
    },
    {
      question: "¿Funciona para textos de ChatGPT, Claude y Gemini?",
      answer: "Sí, y también para Copilot y DeepSeek. Cada uno tiene sus propias particularidades, y abajo encontrará ajustes preestablecidos para cada uno.",
    },
  ],
  de: [
    {
      question: "Ist das wirklich kostenlos?",
      answer: "Ja. Keine Registrierung, kein Wortlimit, keine Paywall.",
    },
    {
      question: "Wird mein Text hochgeladen oder gespeichert?",
      answer: "Nein. Alles läuft in Ihrem Browser und nichts wird an einen Server gesendet.",
    },
    {
      question: "Wird die Bedeutung meines Textes verändert?",
      answer: "Nein. Es entfernt nur Formatierungen und versteckte Zeichen. Ihre Worte bleiben unverändert, es sei denn, Sie aktivieren die Modewort-Entfernung, die einige überstrapazierte KI-Floskeln durch einfachere Ausdrücke ersetzt.",
    },
    {
      question: "Funktioniert das für Texte von ChatGPT, Claude und Gemini?",
      answer: "Ja — und auch für Copilot und DeepSeek. Jedes Modell hat seine Eigenheiten, und unten gibt es dedizierte Voreinstellungen für jedes davon.",
    },
  ],
  fr: [
    {
      question: "Est-ce vraiment gratuit ?",
      answer: "Oui. Pas d'inscription, pas de limite de mots, pas d'accès payant.",
    },
    {
      question: "Mon texte est-il téléversé ou stocké ?",
      answer: "Non. Tout fonctionne dans votre navigateur et rien n'est envoyé à un serveur.",
    },
    {
      question: "Cela changera-t-il le sens de mon texte ?",
      answer: "Non. L'outil supprime uniquement le formatage et les caractères cachés. Vos mots restent inchangés, sauf si vous activez la suppression des clichés IA, qui remplace quelques phrases surutilisées par des termes plus simples.",
    },
    {
      question: "Est-ce que cela fonctionne pour les textes de ChatGPT, Claude et Gemini ?",
      answer: "Oui — ainsi que pour Copilot et DeepSeek. Chacun a ses spécificités, et des préréglages dédiés sont disponibles ci-dessous pour chacun d'eux.",
    },
  ],
  it: [
    {
      question: "È davvero gratuito?",
      answer: "Sì. Nessuna registrazione, nessun limite di parole, nessun paywall.",
    },
    {
      question: "Il mio testo viene caricato o salvato?",
      answer: "No. Tutto viene elaborato nel tuo browser e nulla viene inviato a un server.",
    },
    {
      question: "Modificherà il significato del mio testo?",
      answer: "No. Rimuove solo la formattazione e i caratteri nascosti. Le tue parole rimangono invariate, a meno che tu non attivi la rimozione delle frasi fatte, che sostituisce alcune espressioni IA troppo usate con termini più semplici.",
    },
    {
      question: "Funziona per i testi di ChatGPT, Claude e Gemini?",
      answer: "Sì, e anche per Copilot e DeepSeek. Ognuno ha le proprie caratteristiche, e qui sotto trovi impostazioni predefinite dedicate per ciascuno.",
    },
  ],
  pt: [
    {
      question: "É realmente gratuito?",
      answer: "Sim. Sem cadastro, sem limite de palavras, sem barreiras de pagamento.",
    },
    {
      question: "Meu texto é enviado ou armazenado em algum servidor?",
      answer: "Não. Tudo é executado no seu navegador e nada é enviado para um servidor.",
    },
    {
      question: "Isso mudará o significado do meu texto?",
      answer: "Não. Apenas remove a formatação e caracteres ocultos. Suas palavras continuam as mesmas, a não ser que você ative a remoção de clichês, que troca um pequeno número de frases comuns de IA por alternativas mais simples.",
    },
    {
      question: "Funciona para textos do ChatGPT, Claude e Gemini?",
      answer: "Sim — e também para Copilot e DeepSeek. Cada um tem suas próprias peculiaridades, e há predefinições dedicadas para cada um abaixo.",
    },
  ],
  ar: [
    {
      question: "هل هذه الأداة مجانية حقاً؟",
      answer: "نعم. بدون تسجيل، بدون حدود لعدد الكلمات، وبدون أي رسوم.",
    },
    {
      question: "هل يتم رفع أو تخزين نصوصي؟",
      answer: "لا. يتم تشغيل كل شيء داخل متصفحك ولا يتم إرسال أي بيانات إلى أي خادم.",
    },
    {
      question: "هل سيغير هذا معنى ما كتبته؟",
      answer: "لا. الأداة تزيل التنسيقات والأحرف المخفية فقط. تبقى كلماتك كما هي تماماً، ما لم تفعل خيار إزالة الكلمات المبتذلة، والذي يستبدل عدداً قليلاً من عبارات الذكاء الاصطناعي المكررة بكلمات أبسط.",
    },
    {
      question: "هل تعمل الأداة مع نصوص ChatGPT وClaude وGemini؟",
      answer: "نعم — ومع Copilot وDeepSeek أيضاً. لكل منها سماته الخاصة، وتتوفر إعدادات مسبقة مخصصة لكل منها أدناه.",
    },
  ],
  ja: [
    {
      question: "本当に無料ですか？",
      answer: "はい。登録不要、文字数制限なし、課金要素もありません。",
    },
    {
      question: "入力したテキストがアップロードまたは保存されることはありますか？",
      answer: "いいえ。すべての処理はお使いのブラウザ内で実行され、サーバーに送信されることは一切ありません。",
    },
    {
      question: "文章の意味が変わってしまうことはありますか？",
      answer: "いいえ。書式設定と隠し文字のみを削除します。過剰に使われるAIの決まり文句を簡潔な表現に置き換える「バズワード削除」をオンにしない限り、元の言葉はそのまま保持されます。",
    },
    {
      question: "ChatGPT、Claude、Geminiのテキストに対応していますか？",
      answer: "はい — CopilotやDeepSeekにも対応しています。各モデルに特有の癖があり、それぞれに最適なプリセットが用意されています。",
    },
  ],
  nl: [
    {
      question: "Is dit echt gratis?",
      answer: "Ja. Geen registratie, geen woordlimiet, geen betaalmuur.",
    },
    {
      question: "Wordt mijn tekst geüpload of opgeslagen?",
      answer: "Nee. Alles draait in uw browser en er wordt niets naar een server verzonden.",
    },
    {
      question: "Verandert dit de betekenis van mijn tekst?",
      answer: "Nee. Het verwijdert alleen opmaak en verborgen tekens. Uw woorden blijven hetzelfde, tenzij u de verwijdering van clichés inschakelt, die een klein aantal overmatig gebruikte AI-zinnen vervangt door eenvoudigere bewoordingen.",
    },
    {
      question: "Werkt dit voor teksten van ChatGPT, Claude en Gemini?",
      answer: "Ja — en ook voor Copilot en DeepSeek. Elk model heeft zijn eigen eigenaardigheden, en hieronder vindt u speciale voorinstellingen voor elk van hen.",
    },
  ],
  tr: [
    {
      question: "Bu araç gerçekten ücretsiz mi?",
      answer: "Evet. Kayıt yok, kelime sınırı yok, ödeme duvarı yok.",
    },
    {
      question: "Metnim herhangi bir sunucuya yükleniyor veya kaydediliyor mu?",
      answer: "Hayır. Her şey doğrudan tarayıcınızda çalışır ve hiçbir veri sunucuya gönderilmez.",
    },
    {
      question: "Yazdıklarımın anlamı değişir mi?",
      answer: "Hayır. Yalnızca biçimlendirmeyi ve gizli karakterleri temizler. Çok sık kullanılan birkaç yapay zeka kalıbını daha sade sözcüklerle değiştiren kalıp sözcük temizleme seçeneğini açmadığınız sürece sözcükleriniz aynı kalır.",
    },
    {
      question: "ChatGPT, Claude ve Gemini metinlerinde çalışır mı?",
      answer: "Evet — ayrıca Copilot ve DeepSeek için de geçerlidir. Her modelin kendine has özellikleri vardır ve aşağıda her biri için özel hazır ayarlar bulunmaktadır.",
    },
  ],
  id: [
    {
      question: "Apakah ini benar-benar gratis?",
      answer: "Ya. Tanpa pendaftaran, tanpa batas kata, tanpa paywall.",
    },
    {
      question: "Apakah teks saya diunggah atau disimpan?",
      answer: "Tidak. Semuanya berjalan langsung di peramban Anda dan tidak ada yang dikirim ke server.",
    },
    {
      question: "Apakah ini akan mengubah makna tulisan saya?",
      answer: "Tidak. Alat ini hanya menghapus format dan karakter tersembunyi. Kata-kata Anda tetap sama, kecuali jika Anda mengaktifkan penghapus kata klise, yang mengganti beberapa frasa umum AI dengan kata yang lebih lugas.",
    },
    {
      question: "Apakah ini berfungsi untuk teks ChatGPT, Claude, dan Gemini?",
      answer: "Ya — termasuk Copilot dan DeepSeek. Masing-masing memiliki ciri khas tersendiri, dan tersedia pengaturan siap pakai untuk masing-masing alat di bawah.",
    },
  ],
};

export const localizedFaqTitles: Record<string, { title: string; subtitle: string }> = {
  es: {
    title: "Preguntas Frecuentes",
    subtitle: "Todo lo que necesita saber sobre el formato de texto de IA, caracteres Unicode invisibles y privacidad.",
  },
  de: {
    title: "Häufig Gestellte Fragen",
    subtitle: "Alles, was Sie über KI-Textformatierung, unsichtbare Unicode-Zeichen und Privatsphäre wissen müssen.",
  },
  fr: {
    title: "Foire Aux Questions",
    subtitle: "Tout ce que vous devez savoir sur le formatage du texte IA, les caractères Unicode invisibles et la confidentialité.",
  },
  it: {
    title: "Domande Frequenti",
    subtitle: "Tutto quello che c'è da sapere sulla formattazione del testo IA, caratteri Unicode invisibili e privacy.",
  },
  pt: {
    title: "Perguntas Frequentes",
    subtitle: "Tudo o que você precisa saber sobre formatação de texto de IA, caracteres Unicode invisíveis e privacidade.",
  },
  ar: {
    title: "الأسئلة الشائعة",
    subtitle: "كل ما تحتاج لمعرفته حول تنسيقات نصوص الذكاء الاصطناعي، والأحرف غير المرئية، والخصوصية.",
  },
  ja: {
    title: "よくある質問",
    subtitle: "AIテキストのフォーマット、不可視Unicode文字、およびプライバシーについての詳細。",
  },
  nl: {
    title: "Veelgestelde Vragen",
    subtitle: "Alles wat u moet weten over AI-tekstopmaak, onzichtbare Unicode-tekens en privacy.",
  },
  tr: {
    title: "Sıkça Sorulan Sorular",
    subtitle: "Yapay zeka metin biçimlendirmesi, görünmez Unicode karakterleri ve gizlilik hakkında bilmeniz gereken her şey.",
  },
  id: {
    title: "Pertanyaan yang Sering Diajukan",
    subtitle: "Semua hal yang perlu Anda ketahui tentang format teks AI, karakter Unicode tak terlihat, dan privasi.",
  },
};
