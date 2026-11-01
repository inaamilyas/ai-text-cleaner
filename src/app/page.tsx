import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CommonProblems from "@/components/CommonProblems";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfterExample from "@/components/BeforeAfterExample";
import UseCases from "@/components/UseCases";
import ExploreOtherTools from "@/components/ExploreOtherTools";
import FAQ from "@/components/FAQ";
import { homepageFaqs } from "@/lib/faqData";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "AI Text Cleaner – Clean and Format Text Online",
  description:
    "Clean copied text online by removing unwanted spaces, formatting issues, and supported hidden characters. Paste your text and get a cleaner result in seconds.",
  alternates: {
    canonical: "/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="w-full bg-white flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="flex flex-col w-full">
            <Hero />
            <CommonProblems />
            <HowItWorks />
            <BeforeAfterExample />
            <UseCases />
            <ExploreOtherTools />
            <FAQ />
            <FinalCTA />
          </div>
        </div>
      </div>
    </>
  );
}
