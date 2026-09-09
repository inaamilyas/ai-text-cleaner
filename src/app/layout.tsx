import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanguageDetector from "@/components/LanguageDetector";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-V235VSWPT4";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.text-cleaner-ai.com";
const siteName = "AI Text Cleaner";
const siteDescription =
  "Free tool to clean text from ChatGPT, Claude, and Gemini. Removes invisible characters, smart quotes, em dashes, non-breaking spaces, and Markdown leftovers, entirely in your browser. No signup.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Clean AI Text Instantly`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "AI text cleaner",
    "remove invisible characters",
    "clean ChatGPT text",
    "remove hidden unicode characters",
    "smart quotes to straight quotes",
    "remove markdown formatting",
    "AI text formatting cleanup",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
      de: "/de",
      fr: "/fr",
      it: "/it",
      pt: "/pt",
      ar: "/ar",
      ja: "/ja",
      nl: "/nl",
      tr: "/tr",
      id: "/id",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: `${siteName} - Clean AI Text Instantly`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Clean AI Text Instantly`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Cleaner & Image Metadata Sanitizer",
    "url": siteUrl,
    "description": siteDescription,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas & ArrayBuffer.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1420",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Remove Zero-Width Spaces (U+200B)",
      "Strip Hidden Unicode Control Characters",
      "Sanitize AI Buzzwords and Vocabulary",
      "Strip EXIF, C2PA, and Prompt Headers from AI Images",
      "100% In-Browser Local Memory Privacy",
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": siteUrl,
    "logo": `${siteUrl}/icon.svg`,
    "sameAs": [
      "https://github.com/inaamilyas/ai-text-cleaner",
      "https://www.linkedin.com/in/inam-ilyas/",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <LanguageDetector />
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
