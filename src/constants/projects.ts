import { Project } from "@/types";
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiSupabase, SiPostgresql, SiRedis, SiSocketdotio,
  SiStripe, SiPrisma, SiVercel, SiNodedotjs, SiExpress, SiWordpress, SiFigma,
  SiMongodb, SiPython
} from "react-icons/si";
import { VscOpenai } from "react-icons/vsc";

import web from "@/assets/web.webp";
import tripguide from "@/assets/tripguide.webp";
import jobit from "@/assets/jobit.webp";
import moviepic1 from "@/assets/site/movisite1.webp";
import moviepic2 from "@/assets/site/moviesite2.webp";

export const projects: Project[] = [
  {
    name: "RESTROOPS",
    description: "A complete restaurant management system with QR menu, waiter approval, kitchen workflow, and owner dashboard.",
    tags: ["QR Menu", "Kitchen Flow", "Dashboard"],
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "Socket.io", icon: SiSocketdotio },
    ],
    images: [web],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://github.com/sunilkarki98",
  },
  {
    name: "PAYNUDGE",
    description: "An automated invoice tracking and payment reminder system designed to help freelancers and agencies get paid faster.",
    tags: ["Invoicing", "Stripe API", "Automation"],
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Prisma", icon: SiPrisma },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Stripe", icon: SiStripe },
    ],
    images: [jobit],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://github.com/sunilkarki98",
  },
  {
    name: "ALLINBOX",
    description: "An AI-powered unified inbox for customer support teams, aggregating emails, DMs, and live chat into a single triage interface.",
    tags: ["Unified Inbox", "AI Triage", "WebSockets"],
    stack: [
      { name: "React", icon: SiReact },
      { name: "Node JS", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "OpenAI", icon: VscOpenai },
      { name: "Redis", icon: SiRedis },
    ],
    images: [moviepic1],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://github.com/sunilkarki98",
  },
  {
    name: "DIVAITSOLUTIONS",
    description: "Built an end-to-end platform for an IT agency and skill development academy. Showcases digital products and hosts live project-based training.",
    tags: ["Agency", "Course Portal", "CMS"],
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Vercel", icon: SiVercel },
    ],
    images: [tripguide],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://www.divaitsolutions.com/",
  },
  {
    name: "OTHERS",
    description: "A collection of various freelance projects, community blogs, and small scripts ranging from WordPress themes to Python automation bots.",
    tags: ["Freelance", "Scripts", "Community"],
    stack: [
      { name: "WordPress", icon: SiWordpress },
      { name: "Python", icon: SiPython },
      { name: "Node JS", icon: SiNodedotjs },
      { name: "Figma", icon: SiFigma },
    ],
    images: [moviepic2],
    github_link: "https://github.com/sunilkarki98",
    live_link: "https://github.com/sunilkarki98",
  },
];
