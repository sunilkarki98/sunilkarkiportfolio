import { Technology } from "@/types";

import html from "@/assets/tech/html.webp";
import css from "@/assets/tech/css.webp";
import javascript from "@/assets/tech/javascript.webp";
import typescript from "@/assets/tech/typescript.webp";
import reactjs from "@/assets/tech/reactjs.webp";
import redux from "@/assets/tech/redux.webp";
import tailwind from "@/assets/tech/tailwind.webp";
import nodejs from "@/assets/tech/nodejs.webp";
import mongodb from "@/assets/tech/mongodb.webp";
import git from "@/assets/tech/git.webp";
import figma from "@/assets/tech/figma.webp";
import docker from "@/assets/tech/docker.webp";
import python from "@/assets/python.svg";

export const technologies: Technology[] = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Python", icon: python },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
];
