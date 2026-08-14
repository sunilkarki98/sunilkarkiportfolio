import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Freelance web development, AI automation, and strategic technical consulting services by Sunil Karki.",
  openGraph: {
    title: "Services & Pricing | Sunil Karki",
    description: "Freelance web development, AI automation, and strategic technical consulting services by Sunil Karki.",
    url: "/services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sunil Karki - Services & Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing | Sunil Karki",
    description: "Freelance web development, AI automation, and strategic technical consulting services by Sunil Karki.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/services",
  },
};
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sunil Karki — AI & Full-Stack Engineering",
  url: "https://www.sunilkarki98.com.np/services",
  description: "Freelance web development, AI automation, and strategic technical consulting services by Sunil Karki.",
  provider: {
    "@type": "Person",
    name: "Sunil Karki",
    url: "https://www.sunilkarki98.com.np",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "AI Automation & Workflow Development", description: "Custom AI agents, n8n workflow automation, and business process automation pipelines." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "AI Chatbot Development", description: "Custom chatbots with RAG pipelines, ChatGPT integrations, and conversational AI solutions." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Full-Stack Web Development", description: "High-performance web applications built with Next.js, React, Node.js, and TypeScript." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Technical Consulting", description: "Architecture reviews, AI strategy, and implementation planning for businesses." },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
