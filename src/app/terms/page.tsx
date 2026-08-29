import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using AI Text Cleaner, a free, browser-based text cleaning tool.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-2">
        <h1>Terms of Service</h1>
        <p className="text-body-sm text-neutral-500">
          Last updated: August 29, 2026
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-body-md text-neutral-700">
          By using AI Text Cleaner, you agree to the terms below. If you do
          not agree, please do not use the service.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Description of the service</h2>
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner is a free, browser-based tool that removes
          invisible characters, formatting artifacts, and other text quirks
          from pasted content. All processing happens locally in your
          browser; no account is required.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Use of the service</h2>
        <p className="text-body-md text-neutral-700">
          You may use AI Text Cleaner for any lawful purpose, including
          commercial use of the cleaned output. You are solely responsible
          for the content you paste into and process with the tool, and for
          how you use the cleaned output.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Acceptable use</h2>
        <p className="text-body-md text-neutral-700">
          You agree not to use AI Text Cleaner to: engage in illegal
          activity; attack, overload, or disrupt the infrastructure that
          runs the service; send automated or bot traffic at a volume that
          is unreasonable for normal use; attempt to extract, reverse
          engineer, or copy the underlying source code; or repackage,
          resell, or offer the service itself as your own product.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Your text and content</h2>
        <p className="text-body-md text-neutral-700">
          The text you paste into AI Text Cleaner stays on your device and
          is never uploaded to a server. We make no ownership claim over
          your content, and cleaning it does not transfer any rights to us.
          You are responsible for reviewing the cleaned output before
          relying on it.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>No warranty</h2>
        <p className="text-body-md text-neutral-700">
          AI Text Cleaner is provided &quot;as is&quot; and &quot;as
          available,&quot; without warranties of any kind, express or
          implied. We do not guarantee that the service will be
          error-free, uninterrupted, or fit for any particular purpose.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Limitation of liability</h2>
        <p className="text-body-md text-neutral-700">
          To the fullest extent permitted by law, AI Text Cleaner and its
          operator are not liable for any damages or losses arising from
          your use of, or inability to use, the service.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Intellectual property</h2>
        <p className="text-body-md text-neutral-700">
          The AI Text Cleaner name, design, and underlying code belong to
          their respective owners.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Changes to the service and these terms</h2>
        <p className="text-body-md text-neutral-700">
          We may modify or discontinue the service, or update these terms,
          at any time. Continued use of the service after changes take
          effect constitutes acceptance of the updated terms.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Governing law</h2>
        <p className="text-body-md text-neutral-700">
          These terms are governed by the laws applicable in the
          jurisdiction where the service operator is based, without regard
          to conflict of law principles.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2>Contact us</h2>
        <p className="text-body-md text-neutral-700">
          Questions about these terms can be sent to{" "}
          <a href="mailto:hello@aitextcleaner.com">
            hello@aitextcleaner.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
