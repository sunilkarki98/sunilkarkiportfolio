import "../index.css";
import { Analytics } from "@vercel/analytics/react";
import ScrollProgressBar from "../components/ScrollProgressBar";

const SITE_URL = "https://sunilkarki.vercel.app";

export const metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunil Karki | AI & Full Stack Developer",
    description: "Portfolio of Sunil Karki, an expert in AI automation, AI Chatbot development, n8n low-code workflows, and Full Stack web applications.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <ScrollProgressBar />
        <div id="root">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
