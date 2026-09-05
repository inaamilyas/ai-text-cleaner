"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Share2, UserCheck, Code2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Question",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20">
      <div className="flex flex-col gap-3 text-center">
        <h1>Contact Us</h1>
        <p className="text-body-lg text-neutral-600 max-w-xl mx-auto">
          Have a question, feedback, or need help with AI text cleaning? Reach out directly to the founder via email, LinkedIn, or GitHub.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <Mail className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">Direct Email</h3>
          <a
            href="mailto:inaamilyas656@gmail.com"
            className="text-body-xs font-bold text-primary-700 underline break-all"
          >
            inaamilyas656@gmail.com
          </a>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <Share2 className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">LinkedIn</h3>
          <a
            href="https://www.linkedin.com/in/inam-ilyas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-xs font-bold text-primary-700 underline"
          >
            Inam Ilyas
          </a>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <Code2 className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">GitHub</h3>
          <a
            href="https://github.com/inaamilyas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-xs font-bold text-primary-700 underline"
          >
            @inaamilyas
          </a>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <UserCheck className="h-6 w-6 text-primary-600 mx-auto" />
          <h3 className="text-h6 text-neutral-900">Founder & Owner</h3>
          <p className="text-body-xs text-neutral-600">
            Inam Ilyas
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10 shadow-sm">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-primary-600" />
            <h2 className="text-h4 text-neutral-900">Message Received!</h2>
            <p className="text-body-md text-neutral-600 max-w-md">
              Thank you for contacting AI Text Cleaner. Inam Ilyas will review your message and reply back shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 rounded-lg bg-primary-600 px-6 py-3 text-button text-neutral-50 hover:bg-primary-700"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-h4 text-neutral-900">Send a Direct Message</h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-bold text-neutral-700">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg border border-neutral-300 bg-neutral-0 p-3 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-body-sm font-bold text-neutral-700">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-lg border border-neutral-300 bg-neutral-0 p-3 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-body-sm font-bold text-neutral-700">Subject Category</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="rounded-lg border border-neutral-300 bg-neutral-0 p-3 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none"
              >
                <option value="General Question">General Question</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="AdSense / Partnership">AdSense / Partnership</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-body-sm font-bold text-neutral-700">Your Message</label>
              <textarea
                required
                rows={5}
                placeholder="Describe your issue or feedback in detail..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-lg border border-neutral-300 bg-neutral-0 p-3 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 py-4 text-button font-bold text-neutral-50 transition-colors hover:bg-primary-700"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
