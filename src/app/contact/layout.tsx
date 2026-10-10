import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Developer & Support | Text Cleaner AI",
  description:
    "Get in touch with Inam Ilyas for technical support, bug reports, feature requests, or partnership inquiries regarding Text Cleaner AI.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Developer & Support | Text Cleaner AI",
    description:
      "Get in touch with Inam Ilyas for technical support, bug reports, feature requests, or partnership inquiries.",
    url: "https://www.text-cleaner-ai.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
