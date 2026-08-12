import "../index.css";
import { Analytics } from "@vercel/analytics/react";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const SITE_URL = "https://www.sunilkarki98.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sunil Karki | Computer Science Engineer",
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
    title: "Sunil Karki | Computer Science Engineer",
    description: "Portfolio of Sunil Karki, an expert in AI automation, AI Chatbot development, n8n low-code workflows, and Full Stack web applications.",
    images: [
      {
        url: "/mylogo.png",
        width: 800,
        height: 600,
        alt: "Sunil Karki - Computer Science Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunil Karki | Computer Science Engineer",
    description: "Portfolio of Sunil Karki, an expert in AI automation, AI Chatbot development, n8n low-code workflows, and Full Stack web applications.",
    images: ["/mylogo.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/mylogo.png",
    shortcut: "/mylogo.png",
    apple: "/mylogo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sunil Karki",
  url: SITE_URL,
  jobTitle: "Computer Science Engineer",
  description: "Full-stack software engineer and AI automation specialist based in Nepal. Expert in Next.js, n8n workflows, AI chatbot development, and Agentic AI solutions for businesses.",
  knowsAbout: ["AI Automation", "n8n Workflows", "Next.js", "Full Stack Development", "Agentic AI", "RAG Pipelines", "ChatGPT Integration"],
  sameAs: [
    "https://github.com/sunilkarki98",
    "https://linkedin.com/in/suneelkarkee",
    "https://facebook.com/suneelkarkee",
    "https://instagram.com/suneelkarkee"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-bg text-text-primary transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ScrollProgressBar />
          <div id="root">{children}</div>
          <Analytics />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
