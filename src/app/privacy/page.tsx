import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AI Text Cleaner handles your data. In short: it doesn't collect any, because cleaning happens entirely in your browser.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-2">
        <h1>Privacy Policy</h1>
        <p className="text-body-sm text-neutral-500">
          Last updated: August 29, 2026
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner is designed to work entirely inside your browser.
          This policy explains what that means for your data.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Information we collect</h2>
        <p className="text-body-md text-neutral-700">
          We do not collect, upload, or store the text you paste into AI
          Text Cleaner. Cleaning happens locally in your browser using
          JavaScript; the text you paste is never sent to a server. Using
          the service does not require an account, an email address, or any
          other personal information.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Local processing</h2>
        <p className="text-body-md text-neutral-700">
          All cleaning rules run on your device. If you close the tab or
          clear the page, the text you pasted is gone. We have no record of
          it, because we never received it in the first place.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Cookies and tracking</h2>
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner does not currently use cookies or third-party
          analytics or tracking scripts. If this changes in the future, we
          will update this policy to describe what is used and why.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Third-party services</h2>
        <p className="text-body-md text-neutral-700">
          We do not share data with third parties, because we do not
          collect any data to share.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Children&apos;s privacy</h2>
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner does not knowingly collect personal information
          from anyone, including children, since no personal information is
          collected at all.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Changes to this policy</h2>
        <p className="text-body-md text-neutral-700">
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with an updated &quot;Last updated&quot;
          date.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Contact us</h2>
        <p className="text-body-md text-neutral-700">
          Questions about this policy can be sent to{" "}
          <a href="mailto:hello@aitextcleaner.com">
            hello@aitextcleaner.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
