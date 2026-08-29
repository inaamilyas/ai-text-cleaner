import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AI Text Cleaner team.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center">
      <h1>Contact</h1>
      <p className="text-body-lg text-neutral-700">
        Have a question, found a bug, or want to share feedback? We would
        like to hear from you.
      </p>
      <a href="mailto:hello@aitextcleaner.com" className="text-h5">
        hello@aitextcleaner.com
      </a>
      <p className="text-body-sm text-neutral-500">
        We aim to respond within a few business days.
      </p>
    </div>
  );
}
