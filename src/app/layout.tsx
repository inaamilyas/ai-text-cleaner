import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://aitextcleaner.com";
const siteName = "AI Text Cleaner";
const siteDescription =
  "Paste AI-generated text and instantly remove hidden characters, formatting artifacts, and typography quirks, entirely in your browser.";

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
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: `${siteName} - Clean AI Text Instantly`,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
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
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
