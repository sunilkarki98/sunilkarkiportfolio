"use client";

import { motion } from "framer-motion";
import { styles } from "@/styles";
import { fadeIn, textVariant } from "@/utils/motion";

const usesCategories = [
  {
    category: "Desk Setup",
    items: [
      {
        name: "MacBook Pro 16\"",
        description: "My primary development machine. Runs Docker, local LLMs, and multiple projects simultaneously without breaking a sweat.",
        image: "💻",
      },
      {
        name: "External Monitor",
        description: "High-resolution display for crisp text and accurate colors during UI development and code reviews.",
        image: "🖥️",
      },
      {
        name: "Ergonomic Chair",
        description: "A must-have for posture during long coding sessions. Invest in your back - it pays dividends.",
        image: "💺",
      }
    ]
  },
  {
    category: "Coding & Software",
    items: [
      {
        name: "VS Code / Cursor",
        description: "Currently transitioning to Cursor for the built-in AI capabilities. Theme: One Dark Pro.",
        link: "https://cursor.sh",
        image: "⌨️",
      },
      {
        name: "Next.js & Tailwind",
        description: "My go-to stack for building scalable, high-performance web applications quickly.",
        link: "https://nextjs.org",
        image: "⚛️",
      },
      {
        name: "n8n",
        description: "The best fair-code workflow automation tool. I use this for all AI and backend automation.",
        link: "https://n8n.io",
        image: "⚙️",
      }
    ]
  },
  {
    category: "AI & Automation",
    items: [
      {
        name: "OpenAI / LLM APIs",
        description: "GPT-4, Claude, and open-source models for chatbot development, content generation, and intelligent automation.",
        link: "https://platform.openai.com",
        image: "🤖",
      },
      {
        name: "LangChain / RAG",
        description: "Building retrieval-augmented generation pipelines for context-aware AI applications.",
        link: "https://langchain.com",
        image: "🧠",
      },
      {
        name: "Docker",
        description: "Containerizing everything for consistent development and production environments.",
        link: "https://docker.com",
        image: "🐳",
      }
    ]
  }
];

interface UsesItem {
  name: string;
  description: string;
  image: string;
  link?: string;
}

export default function UsesClient() {
  return (
    <div className="bg-bg min-h-screen pt-32 pb-16 relative z-0">
      <div className={`${styles.paddingX} max-w-4xl mx-auto`}>
        <motion.div variants={textVariant()} initial="hidden" animate="show">
          <p className={`${styles.sectionSubText}`}>My Setup</p>
          <h1 className={`${styles.sectionHeadText}`}>Uses.</h1>
          <p className="mt-4 text-text-secondary text-[17px] leading-[30px]">
            The hardware, software, and tools I use daily to build scalable applications and automate workflows.
          </p>
        </motion.div>

        <div className="mt-20 space-y-16">
          {usesCategories.map((section, sectionIdx) => (
            <motion.div
              key={section.category}
              variants={fadeIn("up", "spring", sectionIdx * 0.3, 0.75)}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-text-primary font-bold text-3xl mb-8 border-b border-border pb-4">
                {section.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item: UsesItem) => {
                  const Wrapper = item.link ? "a" : "div";
                  const wrapperProps = item.link
                    ? { href: item.link, target: "_blank", rel: "noreferrer" }
                    : {};

                  return (
                    <Wrapper
                      key={item.name}
                      {...wrapperProps}
                      className="bg-surface border border-border rounded-2xl p-6 hover:bg-surface-alt hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4"
                    >
                      <div className="text-4xl bg-surface-deep w-16 h-16 rounded-xl flex items-center justify-center shrink-0 shadow-lg border border-border">
                        {item.image}
                      </div>
                      <div>
                        <h3 className="text-text-primary font-bold text-xl group-hover:text-text-accent transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
