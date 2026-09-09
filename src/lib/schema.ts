/**
 * Schema.org Structured Data (JSON-LD) Generators for Google Rich Snippets.
 * Generates WebApplication, FAQPage, and BreadcrumbList schemas.
 */

export interface WebApplicationSchemaOptions {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  ratingValue?: string;
  ratingCount?: string;
  inLanguage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates WebApplication / SoftwareApplication JSON-LD schema with rating and free offer tags.
 */
export function generateWebApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "UtilitiesApplication",
  ratingValue = "4.9",
  ratingCount = "1420",
  inLanguage = "en",
}: WebApplicationSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: "Any / Web Browser",
    inLanguage,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "AI Text Cleaner",
      url: "https://www.text-cleaner-ai.com",
    },
  };
}

/**
 * Generates FAQPage JSON-LD schema for Google PAA (People Also Ask) rich accordions.
 */
export function generateFAQPageSchema(faqs: FAQItem[]) {
  return {
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
}

/**
 * Generates BreadcrumbList JSON-LD schema for Google breadcrumb path snippets.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
