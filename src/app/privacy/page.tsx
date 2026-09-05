import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Text Cleaner",
  description:
    "How AI Text Cleaner handles your data and respects your privacy. All text cleaning runs 100% locally inside your browser.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-2 border-b border-neutral-200 pb-6">
        <h1>Privacy Policy</h1>
        <p className="text-body-sm text-neutral-500">
          Last updated: September 5, 2026
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-body-md text-neutral-700 leading-relaxed">
          AI Text Cleaner is committed to protecting your privacy. This Privacy Policy explains our data practices, local browser-based execution model, and disclosures regarding third-party advertising partners like Google AdSense.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>1. Zero Server Text Processing</h2>
        <p className="text-body-md text-neutral-700 leading-relaxed">
          We do not collect, upload, transmit, or store the text you paste into AI Text Cleaner. All text sanitization, zero-width space removal, and formatting normalization run 100% locally inside your web browser using client-side JavaScript. Your text never leaves your device.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>2. Cookies and Advertising Disclosures</h2>
        <p className="text-body-md text-neutral-700 leading-relaxed">
          AI Text Cleaner displays advertisements provided by Google AdSense and third-party advertising vendors to keep our utility tools free.
        </p>
        <ul className="list-disc pl-6 text-body-md text-neutral-700 space-y-2">
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites on the Internet.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
          </li>
          <li>
            Users may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 underline"
            >
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 underline"
            >
              www.aboutads.info
            </a>
            .
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h2>3. Log Files & Web Analytics</h2>
        <p className="text-body-md text-neutral-700 leading-relaxed">
          Like most web applications, standard web server log files automatically record IP addresses, browser types, internet service providers (ISPs), referring/exit pages, and timestamps. This information is used strictly for server diagnostics, security monitoring, and maintaining site performance.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>4. Data Security</h2>
        <p className="text-body-md text-neutral-700 leading-relaxed">
          Because text processing is performed entirely within your browser memory, your confidential documents, code snippets, or personal text pastes are never exposed to cloud databases, third-party APIs, or external storage.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>5. Contact & Privacy Inquiries</h2>
        <p className="text-body-md text-neutral-700 leading-relaxed">
          If you have questions regarding this Privacy Policy or advertising disclosures, please email us at{" "}
          <a href="mailto:support@aitextcleaner.com" className="text-primary-700 underline">
            support@aitextcleaner.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
