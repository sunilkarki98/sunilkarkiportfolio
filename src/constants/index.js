import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  java,
  python,
  moviepic1,
  moviepic2,
  moviepic3
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "AI Automation Expert",
    icon: web,
  },
  {
    title: "AI Chatbot Developer",
    icon: mobile,
  },
  {
    title: "AI Agents Developer",
    icon: backend,
  },
  {
    title: "n8n Low-code Specialist",
    icon: creator,
  },
  {
    title: "Full Stack Developer",
    icon: java
  }
];



const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "Your Company",
    icon: meta, // Replace with your company icon
    iconBg: "#383E56",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Previous Company",
    icon: shopify, // Replace with your company icon
    iconBg: "#E6DEDD",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Update this section with your actual work experience.",
      "Focus on achievements and impact rather than just daily tasks.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Suneel proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Suneel does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Suneel optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "StaySewa",
    description:
      "A comprehensive marketplace for booking hotels, flats, hostels, and resorts. It enables property owners to list their venues effortlessly while providing customers with a seamless booking experience.",
    tags: [
      {
        name: "marketplace",
        color: "blue-text-gradient",
      },
      {
        name: "booking",
        color: "green-text-gradient",
      },
      {
        name: "real-estate",
        color: "pink-text-gradient",
      },
    ],
    images: [tripguide], // using tripguide placeholder until new image provided
    github_link: "https://github.com/sunilkarki98", // Update with actual URL
    live_link: "https://staysewa.vercel.app/",
  },
  {
    name: "MovieVerse",
    description:
      "Web-based platform that enables users to browse movies, select showtimes, choose seats, and securely book tickets online, providing a seamless and convenient movie-going experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    images: [moviepic1, moviepic2, moviepic3],
    github_link: "https://github.com/sunilkarki98", // Update with actual URL
    live_link: "https://movieticketbooking-nine.vercel.app/",
  },
  {
    name: "eBizMate",
    description:
      "A powerful social media automation platform designed for SMEs. It streamlines marketing efforts for businesses selling products and services, allowing them to scale their online presence effectively.",
    tags: [
      {
        name: "ai-automation",
        color: "blue-text-gradient",
      },
      {
        name: "social-media",
        color: "green-text-gradient",
      },
      {
        name: "saas",
        color: "pink-text-gradient",
      },
    ],
    images: [jobit], // using jobit placeholder until new image provided
    github_link: "https://github.com/sunilkarki98", // Update with actual URL
    live_link: "https://ebizmate-web.vercel.app/",
  },
  {
    name: "EEVS Group",
    description:
      "A comprehensive cross-platform website for an educational and migration consultancy, providing students with critical resources, appointment scheduling, and university information.",
    tags: [
      {
        name: "consultancy",
        color: "blue-text-gradient",
      },
      {
        name: "nextjs",
        color: "green-text-gradient",
      },
      {
        name: "education",
        color: "pink-text-gradient",
      },
    ],
    images: [web], // Using web icon placeholder
    github_link: "https://github.com/sunilkarki98", // Update with actual URL
    live_link: "https://eevsgroup.com/",
  },
  {
    name: "Namaste Nepal Belgium",
    description:
      "A rich, content-driven WordPress blog catering to the Nepalese community in Belgium. Features community news, event galleries, and cultural stories.",
    tags: [
      {
        name: "wordpress",
        color: "blue-text-gradient",
      },
      {
        name: "blog",
        color: "green-text-gradient",
      },
      {
        name: "community",
        color: "pink-text-gradient",
      },
    ],
    images: [web], // Using web icon placeholder
    github_link: "https://github.com/sunilkarki98", // Update with actual URL
    live_link: "https://namastenepalbelgium.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
