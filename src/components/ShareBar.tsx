'use client';

import { useState } from "react";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";

interface ShareBarProps {
  title: string;
  url: string;
}

export default function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      bg: "bg-neutral-900 text-neutral-50 hover:bg-neutral-800",
    },
    {
      name: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      bg: "bg-[#FF4500] text-neutral-50 hover:opacity-90",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bg: "bg-[#0A66C2] text-neutral-50 hover:opacity-90",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: "bg-[#1877F2] text-neutral-50 hover:opacity-90",
    },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-0 p-5 shadow-sm">
      <div className="flex items-center gap-2 text-neutral-800 font-bold text-body-sm">
        <Share2 className="h-5 w-5 text-primary-600 shrink-0" />
        <span>Share this free tool with other creators:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-body-xs font-bold transition-all ${link.bg}`}
          >
            <span>{link.name}</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        ))}

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-100 px-3.5 py-2 text-body-xs font-bold text-neutral-800 hover:bg-neutral-200 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-neutral-600" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
