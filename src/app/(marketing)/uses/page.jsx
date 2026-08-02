"use client";

import { motion } from "framer-motion";
import { styles } from "../../../styles";
import { fadeIn, textVariant } from "../../../utils/motion";

const usesCategories = [
  {
    category: "Desk Setup",
    items: [
      {
        name: "MacBook Pro 16\" (M2 Max)",
        description: "The workhorse. 64GB RAM makes running Docker, local LLMs, and multiple Chrome profiles a breeze.",
        link: "https://amazon.com", // Replace with real affiliate links
        image: "💻", // Placeholder emoji or add an actual image URL
      },
      {
        name: "Studio Display",
        description: "Incredible 5K resolution for crisp text and accurate colors during UI development.",
        link: "https://amazon.com",
        image: "🖥️",
      },
      {
        name: "Herman Miller Aeron",
        description: "An absolute lifesaver for posture during long coding sessions.",
        link: "https://amazon.com",
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
  }
];

export default function UsesPage() {
  return (
    <div className="bg-primary min-h-screen pt-32 pb-16 relative z-0">
      <div className={`${styles.paddingX} max-w-4xl mx-auto`}>
        <motion.div variants={textVariant()} initial="hidden" animate="show">
          <p className={`${styles.sectionSubText}`}>My Setup</p>
          <h1 className={`${styles.sectionHeadText}`}>Uses.</h1>
          <p className="mt-4 text-secondary text-[17px] leading-[30px]">
            A curated list of the hardware, software, and tools I use on a daily basis to build scalable applications and automate workflows.
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
              <h2 className="text-white font-bold text-3xl mb-8 border-b border-white/10 pb-4">
                {section.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, itemIdx) => (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-tertiary border border-white/10 rounded-2xl p-6 hover:bg-black-100 hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4"
                  >
                    <div className="text-4xl bg-black-200 w-16 h-16 rounded-xl flex items-center justify-center shrink-0 shadow-lg border border-white/5">
                      {item.image}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl group-hover:text-purple-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-secondary text-sm mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
