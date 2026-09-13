import { FaRobot, FaBrain, FaLaptopCode, FaCommentDots } from "react-icons/fa";
import { SiN8N } from "react-icons/si";
import { Service } from "@/types";

export const services: Service[] = [
  {
    title: "AI Automation Expert",
    icon: FaRobot,
    color: "text-blue-400",
    description:
      "I design and build automated systems that remove repetitive work, connect your tools, and keep operations running smoothly — so your team can focus on what matters.",
    tags: ["n8n", "APIs", "Webhooks", "OpenAI", "PostgreSQL"],
    workflow: ["Webhook", "n8n", "AI Processing", "Database"],
    relatedTechs: ["n8n", "OpenAI", "PostgreSQL", "Node JS", "Python", "Docker"],
  },
  {
    title: "AI Chatbot Developer",
    icon: FaCommentDots,
    color: "text-purple-400",
    description:
      "I build intelligent conversational interfaces — from RAG-powered knowledge bots to multi-turn customer support agents that understand context and deliver real answers.",
    tags: ["OpenAI", "RAG", "Embeddings", "React", "Next.js"],
    workflow: ["User Input", "Embedding", "Vector Search", "LLM Response"],
    relatedTechs: ["OpenAI", "Anthropic", "React JS", "Next.js", "PostgreSQL", "Python"],
  },
  {
    title: "AI Agents Developer",
    icon: FaBrain,
    color: "text-indigo-400",
    description:
      "I architect autonomous AI agents that reason, plan, and execute multi-step tasks — from lead qualification to content pipelines and internal tool orchestration.",
    tags: ["LangChain", "Function Calling", "Tool Use", "Agents"],
    workflow: ["Task Input", "Agent Reasoning", "Tool Execution", "Result"],
    relatedTechs: ["OpenAI", "Anthropic", "Python", "Node JS", "PostgreSQL", "Redis"],
  },
  {
    title: "n8n Low-code Specialist",
    icon: SiN8N,
    color: "text-orange-500",
    description:
      "I build production-grade n8n workflows that automate business processes end-to-end — CRM syncs, notification systems, data pipelines, and AI-augmented operations.",
    tags: ["n8n", "Automation", "Integrations", "Workflows"],
    workflow: ["Trigger", "Transform", "Integrate", "Notify"],
    relatedTechs: ["n8n", "PostgreSQL", "Node JS", "Docker", "Redis"],
  },
  {
    title: "Full Stack Developer",
    icon: FaLaptopCode,
    color: "text-cyan-400",
    description:
      "I ship production-ready web applications from database schema to deployed frontend — using modern frameworks, type-safe code, and performance-first architecture.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    workflow: ["Design", "Frontend", "API Layer", "Database"],
    relatedTechs: [
      "React JS", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
      "Node JS", "Express", "PostgreSQL", "Prisma", "Redis", "Docker", "Vercel",
    ],
  },
];
