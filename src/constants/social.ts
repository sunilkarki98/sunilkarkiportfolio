import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export interface SocialLink {
  href: string;
  label: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/sunilkarki98",
    label: "GitHub Profile",
    icon: FaGithub,
  },
  {
    href: "https://linkedin.com/in/suneelkarkee",
    label: "LinkedIn Profile",
    icon: FaLinkedin,
  },
  {
    href: "https://facebook.com/suneelkarkee",
    label: "Facebook Profile",
    icon: FaFacebook,
  },
  {
    href: "https://instagram.com/suneelkarkee",
    label: "Instagram Profile",
    icon: FaInstagram,
  },
];
