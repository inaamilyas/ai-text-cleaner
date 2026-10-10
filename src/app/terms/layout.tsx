import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Usage Rights | Text Cleaner AI",
  description:
    "Terms of service, usage guidelines, and free commercial rights for Text Cleaner AI browser-based text sanitation tools.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service & Usage Rights | Text Cleaner AI",
    description:
      "Terms of service, usage guidelines, and free commercial rights for Text Cleaner AI browser-based text sanitation tools.",
    url: "https://www.text-cleaner-ai.com/terms",
    type: "website",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
