
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { LanguageProvider } from './components/LanguageContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectsPage from './components/ProjectsPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
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
    <Router>
      <ScrollToTop />
      <LanguageProvider>
        <SmoothScrollProvider>
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

          <div className={`relative min-h-screen selection:bg-white selection:text-black bg-[#050505] text-[#f5f5f5] ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
            {!isLoading && (
              <>
                <Cursor />
                <Navbar />
              </>
            )}

            <Routes>
              <Route path="/" element={
                <>
                  <Home isLoading={isLoading} />
                  {/* Subtle grid background */}
                  <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02]">
                    <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:80px_80px]"></div>
                  </div>
                </>
              } />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </SmoothScrollProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;
