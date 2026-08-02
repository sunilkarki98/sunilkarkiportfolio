import { Suspense } from "react";
import {
  About, Contact, Feedbacks, Hero, Tech, Works,
  ValueProposition, Process, CurrentlyBuilding, GithubStats
} from "../../components";
import StarsWrapper from "../../components/canvas/StarsWrapper";

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
      <CurrentlyBuilding />
      <GithubStats />
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
