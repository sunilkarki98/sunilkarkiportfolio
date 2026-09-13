import { Technology, TechCategory } from "@/types";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiRedis, SiPrisma,
  SiN8N, SiPython, SiDocker, SiGit, SiLinux, SiSupabase, SiVercel, SiCloudflare,
  SiAnthropic, SiObsidian
} from "react-icons/si";
import { VscOpenai } from "react-icons/vsc";

export const technologies: Technology[] = [
  // Frontend
  { name: "React JS", icon: SiReact, category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },

  // Backend
  { name: "Node JS", icon: SiNodedotjs, category: "Backend" },
  { name: "Express", icon: SiExpress, category: "Backend" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Backend" },
  { name: "Redis", icon: SiRedis, category: "Backend" },
  { name: "Prisma", icon: SiPrisma, category: "Backend" },

  // AI & Automation
  { name: "OpenAI", icon: VscOpenai, category: "AI & Automation" },
  { name: "Anthropic", icon: SiAnthropic, category: "AI & Automation" },
  { name: "n8n", icon: SiN8N, category: "AI & Automation" },
  { name: "Python", icon: SiPython, category: "AI & Automation" },
  { name: "Obsidian", icon: SiObsidian, category: "AI & Automation" },

  // Infrastructure
  { name: "Docker", icon: SiDocker, category: "Infrastructure" },
  { name: "Git", icon: SiGit, category: "Infrastructure" },
  { name: "Linux", icon: SiLinux, category: "Infrastructure" },
  { name: "Supabase", icon: SiSupabase, category: "Infrastructure" },
  { name: "Vercel", icon: SiVercel, category: "Infrastructure" },
  { name: "Cloudflare", icon: SiCloudflare, category: "Infrastructure" },
];

export const techCategories: (TechCategory | "All")[] = [
  "All", "Frontend", "Backend", "AI & Automation", "Infrastructure"
];
