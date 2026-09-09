import React from "react";
import {
  ShieldCheck,
  Zap,
  Lock,
  Globe,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export default function FeatureSixGrid() {
  const features = [
    {
      title: "100% In-Browser Privacy",
      description: "Your text is processed locally in browser memory. Nothing is sent to external servers or logged in databases.",
      icon: Lock,
    },
    {
      title: "Instant Processing",
      description: "Zero network latency, zero API rate limits, and zero queues. Analysis runs immediately as you type or paste.",
      icon: Zap,
    },
    {
      title: "Advanced Heuristic Detection",
      description: "Scans sentence length burstiness, perplexity variance, and overused LLM transition phrase clichés.",
      icon: Cpu,
    },
    {
      title: "Multi-Language Static Support",
      description: "Supports 11 static language routes ensuring seamless user experience across international audiences.",
      icon: Globe,
    },
    {
      title: "Visual Highlight Breakdown",
      description: "Color-coded inline sentence markers reveal exact locations of suspected AI phrases and formatting quirks.",
      icon: CheckCircle2,
    },
    {
      title: "Zero Account Required",
      description: "No signups, no subscriptions, and no credit card required. Free, open, and accessible to everyone.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-white py-16 border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-body-xs font-bold uppercase tracking-wider text-primary-700">
            Why Choose AI Text Cleaner
          </p>
          <h2 className="text-h3 text-neutral-900 font-bold mt-1">
            Built for security, speed, and clean text output
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6 text-left transition-all duration-200 hover:border-primary-300 hover:shadow-xs"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 border border-primary-200">
                <feat.icon className="h-5 w-5" />
              </div>
              <h3 className="text-h6 text-neutral-900 font-bold">{feat.title}</h3>
              <p className="text-body-sm text-neutral-600 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
