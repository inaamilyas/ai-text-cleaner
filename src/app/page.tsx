import Hero from "@/components/Hero";
import WhyCleanAIText from "@/components/WhyCleanAIText";
import WhatMakesDifferent from "@/components/WhatMakesDifferent";
import HowItWorks from "@/components/HowItWorks";
import WhatWeClean from "@/components/WhatWeClean";
import WhoItsFor, { audiences } from "@/components/WhoItsFor";
import FAQ, { faqs } from "@/components/FAQ";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Text Cleaner",
  url: "https://aitextcleaner.com",
  description:
    "Paste AI-generated text and instantly remove hidden characters, formatting artifacts, and typography quirks, entirely in your browser.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
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
  mainEntity: faqs.map((faq) => ({
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
      <Hero />
      <WhyCleanAIText />
      <WhatMakesDifferent />
      <HowItWorks />
      <WhatWeClean />
      <WhoItsFor />
      <FAQ />
    </>
  );
}
