import { Metadata } from "next";
import UsesClient from "./UsesClient";

export const metadata: Metadata = {
  title: "My Arsenal & Setup",
  description: "A detailed list of the hardware, software, and tools I use daily as a Computer Science Engineer.",
  openGraph: {
    title: "My Arsenal & Setup | Sunil Karki",
    description: "A detailed list of the hardware, software, and tools I use daily as a Computer Science Engineer.",
    url: "/uses",
    images: [{ url: "/mylogo.png", width: 800, height: 600, alt: "Sunil Karki - My Arsenal & Setup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Arsenal & Setup | Sunil Karki",
    description: "A detailed list of the hardware, software, and tools I use daily as a Computer Science Engineer.",
    images: ["/mylogo.png"],
  },
  alternates: {
    canonical: "/uses",
  },
};

export default function UsesPage() {
  return <UsesClient />;
}
