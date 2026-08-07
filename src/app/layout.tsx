import "../index.css";
import { Analytics } from "@vercel/analytics/react";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { Metadata } from "next";

const SITE_URL = "https://www.sunilkarki98.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sunil Karki | AI & Full Stack Developer",
    template: "%s | Sunil Karki",
  },
  description: "Portfolio of Sunil Karki, an expert in AI automation, AI Chatbot development, n8n low-code workflows, and Full Stack web applications.",
  keywords: [
    "AI developer", "full stack developer", "n8n automation", "AI chatbot",
    "Next.js developer", "React developer", "Sunil Karki",
  ],
  authors: [{ name: "Sunil Karki", url: SITE_URL }],
  creator: "Sunil Karki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sunil Karki",
    title: "Sunil Karki | AI & Full Stack Developer",
    description: "Portfolio of Sunil Karki, an expert in AI automation, AI Chatbot development, n8n low-code workflows, and Full Stack web applications.",
    images: [
      {
        url: "/logo.webp",
        width: 800,
        height: 600,
        alt: "Sunil Karki - AI & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunil Karki | AI & Full Stack Developer",
    description: "Portfolio of Sunil Karki, an expert in AI automation, AI Chatbot development, n8n low-code workflows, and Full Stack web applications.",
    images: ["/logo.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/titlelogo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sunil Karki",
  url: SITE_URL,
  jobTitle: "AI & Full Stack Developer",
  sameAs: [
    "https://github.com/sunilkarki98",
    "https://linkedin.com/in/suneelkarkee",
    "https://facebook.com/suneelkarkee",
    "https://instagram.com/suneelkarkee"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-primary">
        <ScrollProgressBar />
        <div id="root">{children}</div>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
