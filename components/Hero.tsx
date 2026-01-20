
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

interface HeroProps {
  active?: boolean;
}

const Hero: React.FC<HeroProps> = ({ active }) => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!active) return;

    const chars = titleRef.current?.querySelectorAll('.char');
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.set(containerRef.current, { opacity: 1 })
      .fromTo(spineRef.current, 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 2, transformOrigin: 'top', ease: 'power4.inOut' }
      )
      .fromTo(chars, 
        { y: 150, opacity: 0, rotateX: -90 }, 
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.8 },
        "-=1.5"
      )
      .fromTo(metaRefs.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2 }, 
        "-=1"
      );

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to(titleRef.current, {
        x: x,
        y: y,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [active]);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      className={`relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] select-none transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
    >
      <div ref={spineRef} className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent z-0 hidden md:block" />

      <div className="absolute top-[15%] w-full text-center z-10 px-8">
        <span className="mono text-[8px] md:text-[10px] uppercase tracking-[0.5em] opacity-40 block mb-4">
          {t('role')}
        </span>
      </div>

      <div className="relative z-10 text-center px-4 w-full">
        <h1 
          ref={titleRef}
          className="text-[clamp(3.5rem,15vw,14rem)] font-bold leading-[0.8] uppercase tracking-tighter text-white perspective-1000"
        >
          <div className="overflow-hidden flex justify-center"><div className="flex">{splitText("TRACY")}</div></div>
          <div className="overflow-hidden flex justify-center"><div className="flex">{splitText("MORIANO")}</div></div>
        </h1>
      </div>

      <div className="absolute bottom-[8%] md:bottom-[10%] w-full max-w-[1400px] px-8 md:px-24 grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-8 md:gap-0 z-10">
        <div ref={el => { metaRefs.current[0] = el; }} className="flex flex-col items-center md:items-start group order-2 md:order-1">
          <span className="mono text-[8px] md:text-[9px] opacity-30 uppercase tracking-widest mb-1 group-hover:opacity-100 transition-opacity">{t('basedIn')}</span>
          <span className="heading text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">{t('location')}</span>
        </div>

        <div ref={el => { metaRefs.current[1] = el; }} className="flex flex-col items-center gap-3 md:gap-4 order-1 md:order-2">
          <span className="mono text-[8px] md:text-[9px] uppercase tracking-[0.4em] vertical-rl opacity-30 group-hover:opacity-100 transition-opacity hidden md:block">{t('scrollDown')}</span>
          <div className="w-[1px] h-12 md:h-20 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-spine-scroll" />
          </div>
        </div>

        <div ref={el => { metaRefs.current[2] = el; }} className="flex flex-col items-center md:items-end group order-3 md:order-3">
          <span className="mono text-[8px] md:text-[9px] opacity-30 uppercase tracking-widest mb-1 group-hover:opacity-100 transition-opacity">{t('specializing')}</span>
          <span className="heading text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-center md:text-right">{t('specialty')}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
