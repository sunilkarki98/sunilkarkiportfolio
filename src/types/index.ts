import { IconType } from "react-icons";
import { StaticImageData } from "next/image";

export interface NavLink {
  id: string;
  title: string;
  count?: string;
}

export interface Service {
  title: string;
  icon: IconType;
  color?: string;
  description: string;
  tags: string[];
  workflow: string[];
  relatedTechs: string[];
}

export type TechCategory = "Frontend" | "Backend" | "AI & Automation" | "Infrastructure";

export interface Technology {
  name: string;
  icon: IconType | StaticImageData | any;
  category: TechCategory;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: StaticImageData | any;
  iconBg: string;
  date: string;
  points: string[];
}

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  stack: { name: string; icon: IconType | StaticImageData | any }[];
  images: (StaticImageData | any)[];
  github_link: string;
  live_link: string;
}
