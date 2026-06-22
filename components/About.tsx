
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from './LanguageContext';

const About: React.FC = () => {
  const { lang, t } = useLang();
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageWrapperRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.2 },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 2,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.to(imageWrapperRef.current?.querySelector('img'), {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          scrub: true
        }
      });

      const marqueeWidth = marqueeRef.current?.scrollWidth || 0;
      gsap.to(marqueeRef.current, {
        x: -marqueeWidth / 2,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const words = textContainerRef.current?.querySelectorAll('.highlight-text span');
    if (words) {
      gsap.fromTo(words,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true,
          }
        }
      );
    }
    ScrollTrigger.refresh();
  }, [lang]);

  const technologies = ["React", "TypeScript", "GSAP", "PostgreSQL", "UI/UX", "GLSL", "AWS", "JavaScript", "PHP", "Python", "Docker", "SQL"];

  return (
    <section id="about" ref={containerRef} className="relative py-24 md:py-40 bg-[#050505] overflow-hidden">
      <div className="absolute top-10 left-4 md:left-10 text-[20vw] md:text-[15vw] heading font-black opacity-[0.02] select-none pointer-events-none uppercase leading-none">
        {t('engineering_bg')}
      </div>

      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 items-start">
          <div className="lg:col-span-7" ref={textContainerRef}>
            <div className="mono text-[10px] uppercase text-white/40 mb-8 md:mb-12 flex items-center gap-4">
              <span className="w-6 md:w-8 h-[1px] bg-white/20"></span>
              01 — {t('philosophy')}
            </div>

            <h2 className="highlight-text text-xl sm:text-3xl md:text-4xl lg:text-4xl heading leading-[1.2] md:leading-[1.1] tracking-tight">
              {t('about_intro').split(' ').map((word, i) => (
                <span key={`${lang}-${i}`} className="inline-block mr-[0.25em] mb-[0.1em] transition-all duration-300">
                  {word}
                </span>
              ))}
            </h2>

            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-l border-white/10 pl-6 md:pl-8">
              <div>
                <h4 className="mono text-[9px] uppercase opacity-40 mb-3 md:mb-4 tracking-widest">{t('mindset_label')}</h4>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">{t('mindset_text')}</p>
              </div>
              <div>
                <h4 className="mono text-[9px] uppercase opacity-40 mb-3 md:mb-4 tracking-widest">{t('goal_label')}</h4>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">{t('goal_text')}</p>
              </div>
            </div>

            <div className="mt-12 md:mt-16">
              <a
                href={lang === 'ESP' ? "/CV (ESP) - TRACY MORIANO T.pdf" : "/CV (ENG) - TRACY MORIANO T.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-white">
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo"></div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors duration-500 relative z-10">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17L17 7"></path>
                  </svg>
                </div>
                <span className="heading text-lg md:text-xl font-bold uppercase tracking-widest border-b border-white/20 group-hover:border-white transition-all duration-500 pb-1">
                  {t('viewCV')}
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full mt-10 lg:mt-0">
            <div ref={imageWrapperRef} className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-zinc-900 group rounded-sm shadow-2xl">
              <img
                src="/portafoliotracy.jpeg"
                alt="Tracy Moriano"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="mt-6 md:mt-8 flex justify-between items-start px-1">
              <div className="flex flex-col">
                <span className="mono text-[9px] uppercase opacity-40 mb-1">{t('location_label')}</span>
                <span className="heading text-xs md:text-sm uppercase tracking-widest font-bold">{t('location')}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="mono text-[9px] uppercase opacity-40 mb-1">{t('role_label')}</span>
                <span className="heading text-xs md:text-sm uppercase tracking-widest font-bold whitespace-nowrap">
                  <span className="md:hidden">FULL-STACK</span>
                  <span className="hidden md:inline">{t('fullstack_lead')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 md:mt-40 relative border-y border-white/5 py-6 md:py-10 overflow-hidden rotate-[-1deg] bg-white text-black">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-10 md:gap-16">
          {[...technologies, ...technologies].map((tech, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-16">
              <span className="heading text-3xl md:text-6xl font-black uppercase tracking-tighter">{tech}</span>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-black rotate-45"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
