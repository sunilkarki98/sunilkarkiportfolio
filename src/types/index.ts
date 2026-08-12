import { IconType } from "react-icons";
import { StaticImageData } from "next/image";

export interface NavLink {
  id: string;
  title: string;
}

export interface Service {
  title: string;
  icon: IconType;
  color?: string;
}

export interface Technology {
  name: string;
  icon: StaticImageData | any;
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
  tags: ProjectTag[];
  images: (StaticImageData | any)[];
  github_link: string;
  live_link: string;
}
