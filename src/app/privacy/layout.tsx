import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Zero-Log Guarantee | Text Cleaner AI",
  description:
    "Text Cleaner AI operates 100% in-browser with zero server logging, zero data transmission, and complete client-side data isolation.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Zero-Log Guarantee | Text Cleaner AI",
    description:
      "Text Cleaner AI operates 100% in-browser with zero server logging, zero data transmission, and complete client-side data isolation.",
    url: "https://www.text-cleaner-ai.com/privacy",
    type: "website",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
