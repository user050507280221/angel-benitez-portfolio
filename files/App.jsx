import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

import CustomCursor from './components/CustomCursor';
import ScrollIndicator from './components/ScrollIndicator';
import ThemeSwitcher from './components/ThemeSwitcher';
// import ScrollVideoScrubber from './components/ScrollVideoScrubber';

export default function App() {
  return (
    <>
      <CustomCursor />
      <ThemeSwitcher />
      <ScrollIndicator topTargetId="hero" nextSectionId="about" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />

        {/*
          Optional scroll-scrubbed project reel — drop it wherever you want
          a cinematic showcase moment (right before or inside Projects works well).
          Requires an extracted frame sequence, see ScrollVideoScrubber.jsx docs.

          <ScrollVideoScrubber
            frameCount={90}
            frameUrlBuilder={(i) => `/reel-frames/frame_${String(i + 1).padStart(3, '0')}.webp`}
            scrollHeight={3200}
            caption="Watch a project come together"
          />
        */}

        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
