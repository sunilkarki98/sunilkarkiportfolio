"use client";
import { motion } from "framer-motion";
import { styles } from "@/styles";
import { textVariant } from "@/utils/motion";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  center?: boolean;
  className?: string;
}

const SectionHeader = ({ subtitle, title, center = false, className = "" }: SectionHeaderProps) => (
  <motion.div variants={textVariant()} className={className}>
    <p className={`${styles.sectionSubText} ${center ? "text-center" : ""}`}>
      {subtitle}
    </p>
    <h2 className={`${styles.sectionHeadText} text-gradient ${center ? "text-center" : ""}`}>
      {title}
    </h2>
  </motion.div>
);

export default SectionHeader;
