import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Freelance web development, AI automation, and strategic technical consulting services by Sunil Karki.",
  openGraph: {
    title: "Services & Pricing | Sunil Karki",
    description: "Freelance web development, AI automation, and strategic technical consulting services by Sunil Karki.",
    url: "/services",
    images: [{ url: "/mylogo.png", width: 800, height: 600, alt: "Sunil Karki - Services & Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing | Sunil Karki",
    description: "Freelance web development, AI automation, and strategic technical consulting services by Sunil Karki.",
    images: ["/mylogo.png"],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
