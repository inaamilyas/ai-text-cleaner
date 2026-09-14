import Hero from "@/components/Hero";
import WhyCleanAIText from "@/components/WhyCleanAIText";
import WhatMakesDifferent from "@/components/WhatMakesDifferent";
import CompetitorComparison from "@/components/CompetitorComparison";
import HowItWorks from "@/components/HowItWorks";
import WhatWeClean from "@/components/WhatWeClean";
import WhoItsFor, { audiences } from "@/components/WhoItsFor";
import ToolsSuiteShowcase from "@/components/ToolsSuiteShowcase";
import FAQ from "@/components/FAQ";
import { defaultFaqs } from "@/lib/faqData";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Text Cleaner",
  url: "https://www.text-cleaner-ai.com",
  description:
    "Paste AI-generated text and instantly remove hidden characters, formatting artifacts, and typography quirks, entirely in your browser.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  author: {
    "@type": "Person",
    name: "Inam Ilyas",
    url: "https://www.linkedin.com/in/inam-ilyas/",
    sameAs: [
      "https://www.linkedin.com/in/inam-ilyas/",
      "https://github.com/inaamilyas/",
    ],
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  audience: audiences.map((audience) => ({
    "@type": "Audience",
    audienceType: audience.title,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: defaultFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="w-full bg-background flex-1">
        <div className="container mx-auto px-4 md:px-8 py-space-lg">
          <div className="flex flex-col w-full">
            <Hero />
            <WhyCleanAIText />
            <WhatMakesDifferent />
            <CompetitorComparison />
            <HowItWorks />
            <WhatWeClean />
            <WhoItsFor />
            <ToolsSuiteShowcase />
            <FAQ />
          </div>
        </div>
      </div>
    </>
  );
}
