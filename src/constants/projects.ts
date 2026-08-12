import { Project } from "@/types";

import web from "@/assets/web.webp";
import tripguide from "@/assets/tripguide.webp";
import jobit from "@/assets/jobit.webp";
import moviepic1 from "@/assets/site/movisite1.webp";
import moviepic2 from "@/assets/site/moviesite2.webp";
import moviepic3 from "@/assets/site/moviesite3.webp";

export const projects: Project[] = [
  {
    name: "Diva IT Solutions",
    description:
      "Built an end-to-end platform for an IT agency and skill development academy. The site showcases digital products, manages client inquiries, and hosts live project-based training - serving as the company's primary digital storefront.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "typescript", color: "green-text-gradient" },
      { name: "agency", color: "pink-text-gradient" },
    ],
    images: [web],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://www.divaitsolutions.com/",
  },
  {
    name: "StaySewa",
    description:
      "Developed a full-featured property booking marketplace connecting hosts with travelers. Owners list hotels, flats, and hostels while customers browse, compare, and book seamlessly - handling the full lifecycle from discovery to reservation.",
    tags: [
      { name: "marketplace", color: "blue-text-gradient" },
      { name: "booking", color: "green-text-gradient" },
      { name: "real-estate", color: "pink-text-gradient" },
    ],
    images: [tripguide],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://staysewa.vercel.app/",
  },
  {
    name: "MovieVerse",
    description:
      "Engineered a movie ticket booking platform where users browse films, select showtimes, choose seats, and pay - reducing the cinema's manual booking overhead and giving customers a smooth, self-service experience.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    images: [moviepic1, moviepic2, moviepic3],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://movieticketbooking-nine.vercel.app/",
  },
  {
    name: "eBizMate",
    description:
      "Architected an AI-powered social media automation SaaS for e-commerce SMEs. The platform uses RAG and intent detection to auto-reply to DMs/comments, score leads, and close orders - helping businesses scale their online presence hands-free.",
    tags: [
      { name: "ai-automation", color: "blue-text-gradient" },
      { name: "social-media", color: "green-text-gradient" },
      { name: "saas", color: "pink-text-gradient" },
    ],
    images: [jobit],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://ebizmate-web.vercel.app/",
  },
  {
    name: "EEVS Group",
    description:
      "Delivered a cross-platform website for an educational and migration consultancy, giving students access to university information, appointment scheduling, and critical resources - streamlining the consultation process end-to-end.",
    tags: [
      { name: "consultancy", color: "blue-text-gradient" },
      { name: "nextjs", color: "green-text-gradient" },
      { name: "education", color: "pink-text-gradient" },
    ],
    images: [web],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://eevsgroup.com/",
  },
  {
    name: "Namaste Nepal Belgium",
    description:
      "Built a content-driven WordPress blog for the Nepalese diaspora in Belgium, featuring community news, event galleries, and cultural stories - becoming a central hub for the community's online presence.",
    tags: [
      { name: "wordpress", color: "blue-text-gradient" },
      { name: "blog", color: "green-text-gradient" },
      { name: "community", color: "pink-text-gradient" },
    ],
    images: [web],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://namastenepalbelgium.com/",
  },
];
