
import React, { useEffect, useState } from 'react';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { LanguageProvider } from './components/LanguageContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      gsap.to('body', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      });
    } else {
      gsap.set('body', { opacity: 1 });
    }
  }, [isLoading]);

  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        
        <div className={`relative min-h-screen selection:bg-white selection:text-black bg-[#050505] text-[#f5f5f5] ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
          <Cursor />
          {!isLoading && <Navbar />}
          <main>
            {/* Solo renderizamos el contenido visual o activamos animaciones tras el load */}
            <Hero active={!isLoading} />
            <About />
            <TechStack />
            <Projects />
            <Contact />
          </main>
          
          {/* Subtle grid background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02]">
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          </div>
        </div>
      </SmoothScrollProvider>
    </LanguageProvider>
  );
};

export default App;
