import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ValueProposition from "@/components/sections/ValueProposition";
import Process from "@/components/sections/Process";
import Works from "@/components/sections/Works";
import CurrentlyBuilding from "@/components/sections/CurrentlyBuilding";
import Feedbacks from "@/components/sections/Feedbacks";
import Contact from "@/components/sections/Contact";
import GithubStats from "@/components/ui/GithubStats";
export default function Home() {

  return (
    <div className='relative z-0 bg-bg'>
      
      <Hero />
      <About />
      <ValueProposition />
      <Process />
      <Works />
      {/* <CurrentlyBuilding /> */}
      {/* <GithubStats /> */}
      <Feedbacks />
      <div className='relative'>
        <Contact />
      </div>
    </div>
  );
}
