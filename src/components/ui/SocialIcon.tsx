import { IconType } from "react-icons";

interface SocialIconProps {
  href: string;
  label: string;
  icon: IconType;
  hoverClass?: string;
  colorClass?: string;
}

const SocialIcon = ({ href, label, icon: Icon, colorClass }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer group hover:opacity-80 hover:-translate-y-1 shadow-sm ${colorClass || 'bg-surface border-border text-text-primary'}`}
    aria-label={label}
  >
    <Icon className="w-5 h-5 transition-transform" />
  </a>
);

export default SocialIcon;
