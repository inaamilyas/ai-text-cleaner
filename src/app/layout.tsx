import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanguageDetector from "@/components/LanguageDetector";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-V235VSWPT4";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "700"],
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
  return (
    <html lang="en" className={`${mulish.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
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
