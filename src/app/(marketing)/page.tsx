import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ValueProposition from "@/components/sections/ValueProposition";
import Process from "@/components/sections/Process";
import Works from "@/components/sections/Works";
import CurrentlyBuilding from "@/components/sections/CurrentlyBuilding";
import Tech from "@/components/sections/Tech";
import Feedbacks from "@/components/sections/Feedbacks";
import Contact from "@/components/sections/Contact";
import GithubStats from "@/components/ui/GithubStats";
import StarsWrapper from "@/components/canvas/StarsWrapper";

export default function Home() {

  return (
    <div className='relative z-0 bg-primary'>
      
      <div className='hero-background bg-cover bg-no-repeat bg-center'>
        <Hero />
      </div>
      <About />
      <ValueProposition />
      <Process />
      <Works />
      {/* <CurrentlyBuilding /> */}
      {/* <GithubStats /> */}
      <Tech />
      <Feedbacks />
      <div className='relative'>
        <Contact />
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <StarsWrapper />
        </div>
      </div>
    </div>
  );
}
