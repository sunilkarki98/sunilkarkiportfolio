import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Insights from "@/components/sections/Insights";
import Contact from "@/components/sections/Contact";
export default function Home() {

  return (
    <div className='relative z-0 bg-bg'>
      
      <Hero />
      <About />
      <Works />
      <Contact />
      <Suspense fallback={null}>
        <Insights />
      </Suspense>
    </div>
  );
}
