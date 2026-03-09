import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion, useScroll } from "framer-motion";

import {
  About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works,
  ValueProposition, Process, CurrentlyBuilding, GithubStats
} from "./components";

// Lazy loading the heaviest Three.js canvas element so the rest of the site is interactive immediately
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));

const App = () => {
  const { scrollYProgress } = useScroll();

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <motion.div
          className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50 rounded-full"
          style={{ scaleX: scrollYProgress }}
        />
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
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
        {/* <Experience /> -> Replace with resume/timeline if needed, currently unused in App but imported */}
        <Feedbacks />
        <Contact />
      </div>
    </BrowserRouter>
  );
}

export default App;
