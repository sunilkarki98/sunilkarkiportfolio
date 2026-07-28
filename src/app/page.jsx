"use client";

import dynamic from "next/dynamic";
import { motion, useScroll } from "framer-motion";
import {
  About, Contact, Feedbacks, Hero, Navbar, Tech, Works,
  ValueProposition, Process, CurrentlyBuilding, GithubStats
} from "../components";
import ErrorBoundary from "../components/ErrorBoundary";

const StarsCanvas = dynamic(() => import('../components/canvas/Stars'), {
  ssr: false,
});

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div className='relative z-0 bg-primary'>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50 rounded-full"
        style={{ scaleX: scrollYProgress }}
      />
      
      <ErrorBoundary>
        <StarsCanvas />
      </ErrorBoundary>
      
      <div className='hero-background bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <About />
      <ValueProposition />
      <Process />
      <Works />
      <CurrentlyBuilding />
      <GithubStats />
      <Tech />
      <Feedbacks />
      <Contact />
    </div>
  );
}
