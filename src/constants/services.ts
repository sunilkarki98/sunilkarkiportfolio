import { FaRobot, FaBrain, FaLaptopCode, FaCommentDots } from "react-icons/fa";
import { SiN8N } from "react-icons/si";
import { Service } from "@/types";

export const services: Service[] = [
  {
    title: "AI Automation Expert",
    icon: FaRobot,
    color: "text-blue-400",
  },
  {
    title: "AI Chatbot Developer",
    icon: FaCommentDots,
    color: "text-purple-400",
  },
  {
    title: "AI Agents Developer",
    icon: FaBrain,
    color: "text-indigo-400",
  },
  {
    title: "n8n Low-code Specialist",
    icon: SiN8N,
    color: "text-orange-500",
  },
  {
    title: "Full Stack Developer",
    icon: FaLaptopCode,
    color: "text-cyan-400",
  },
];
