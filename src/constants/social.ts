import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export interface SocialLink {
  href: string;
  label: string;
  icon: IconType;
  colorClass?: string;
}

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/sunilkarki98",
    label: "GitHub Profile",
    icon: FaGithub,
    colorClass: "bg-[#333] border-[#333] text-white dark:bg-white dark:border-white dark:text-black",
  },
  {
    href: "https://linkedin.com/in/suneelkarkee",
    label: "LinkedIn Profile",
    icon: FaLinkedin,
    colorClass: "bg-[#0077b5] border-[#0077b5] text-white",
  },
  {
    href: "https://facebook.com/suneelkarkee",
    label: "Facebook Profile",
    icon: FaFacebook,
    colorClass: "bg-[#1877f2] border-[#1877f2] text-white",
  },
  {
    href: "https://instagram.com/suneelkarkee",
    label: "Instagram Profile",
    icon: FaInstagram,
    colorClass: "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] border-transparent text-white",
  },
];
