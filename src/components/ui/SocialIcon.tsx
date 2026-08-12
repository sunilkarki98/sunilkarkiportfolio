import { IconType } from "react-icons";

interface SocialIconProps {
  href: string;
  label: string;
  icon: IconType;
}

const SocialIcon = ({ href, label, icon: Icon }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-accent-glow hover:border-accent transition-all cursor-pointer group"
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-text-primary group-hover:scale-110 transition-transform" />
  </a>
);

export default SocialIcon;
