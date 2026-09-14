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
      description: "Scans sentence length burstiness, passive voice structure, and overused LLM transition phrase clichés.",
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
    <section className="bg-surface py-12 md:py-16 border-t border-surface-container-highest/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-code-stat text-code-stat text-primary uppercase tracking-widest font-semibold block">
            WHY CHOOSE AI TEXT CLEANER
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight mt-1">
            Built for security, speed, and clean text output
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3.5 rounded-xl border border-surface-container-highest/80 bg-surface-container-lowest p-6 text-left transition-all duration-200 hover:shadow-md hover:border-primary/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed/30 text-primary border border-primary-fixed shadow-xs">
                <feat.icon className="h-5 w-5" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {feat.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
