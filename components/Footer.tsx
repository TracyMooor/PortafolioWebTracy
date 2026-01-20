
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const MagneticLink = ({ href, children, label }: { href: string, children: React.ReactNode, label: string }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const link = linkRef.current;
    if (!link || window.innerWidth < 768) return;

    const move = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = link.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: 'power3.out' });
    };

    const reset = () => {
      gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    link.addEventListener('mousemove', move);
    link.addEventListener('mouseleave', reset);
    return () => {
      link.removeEventListener('mousemove', move);
      link.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <a 
      ref={linkRef}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex flex-col py-5 md:py-6 border-b border-black/10 hover:border-black transition-colors duration-500"
    >
      <span className="mono text-[8px] md:text-[9px] uppercase opacity-40 mb-1 md:mb-2 tracking-widest">{label}</span>
      <span className="heading text-2xl sm:text-3xl md:text-5xl lg:text-5xl uppercase tracking-tighter font-bold transition-transform duration-500 md:group-hover:translate-x-4">
        {children}
      </span>
    </a>
  );
};

const SocialIcon = ({ href, aria, d }: { href: string, aria: string, d: string }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-black/10 transition-all duration-700 hover:border-black hover:bg-black overflow-hidden"
      aria-label={aria}
    >
      <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo rounded-full" />
      <svg className="w-5 h-5 fill-current text-black group-hover:text-white transition-colors duration-500 relative z-10" viewBox="0 0 24 24">
        <path d={d} />
      </svg>
    </a>
  );
};

const Footer: React.FC = () => {
  const { lang, t } = useLang();
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const limaTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Lima',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTime(limaTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll('.footer-line');
        gsap.fromTo(lines, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 1.5, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            }
          }
        );
      }
    });

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <footer id="contact" ref={containerRef} className="relative min-h-screen bg-[#F5F5F5] text-black pt-24 md:pt-40 pb-8 md:pb-12 px-6 md:px-24 flex flex-col justify-between overflow-hidden">
      
      <div className="w-full mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 border-b border-black/10 pb-8 md:pb-12">
          <span className="mono text-[10px] uppercase text-black/40 tracking-[0.4em]">
            04 — {t('contact')}
          </span>
          <div className="max-w-md">
            <p className="text-black/30 text-[10px] md:text-xs mono leading-relaxed uppercase tracking-widest text-left md:text-right">
              {t('contact_h3')}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-16 md:gap-20 items-start lg:items-end flex-grow">
        <div className="flex-grow w-full">
          <h2 ref={titleRef} className="text-[15vw] lg:text-[10vw] heading font-bold leading-[0.85] tracking-tighter uppercase mb-12 lg:mb-0">
            <div className="overflow-hidden h-fit"><span className="footer-line block">{t('contact_h1')}</span></div>
            <div className="overflow-hidden h-fit"><span className="footer-line block text-zinc-400 italic font-normal">{t('contact_h2')}</span></div>
            <div className="overflow-hidden h-fit"><span className="footer-line block underline decoration-1 underline-offset-[0.1em]">{t('contact')}</span></div>
          </h2>
        </div>

        <div className="w-full lg:w-[450px] flex flex-col">
          <MagneticLink href="mailto:tracynicolehmorianotuanama@gmail.com" label={t('email')}>
            {lang === 'ESP' ? 'Contacto' : 'Tracy@gmail.com'}
          </MagneticLink>
          <MagneticLink href="https://www.linkedin.com/in/tracymooor/" label={t('linkedin')}>
            Tracy Moriano
          </MagneticLink>
          <MagneticLink href="https://github.com/TracyMooor" label={t('github')}>
            TracyMooor
          </MagneticLink>
        </div>
      </div>

      <div className="mt-20 md:mt-32 pt-8 md:pt-12 border-t border-black/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-3">
            <span className="mono text-[8px] md:text-[9px] uppercase opacity-40 tracking-widest">{t('location_label')}</span>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse-custom" />
               <span className="heading text-xs md:text-sm uppercase font-bold tracking-widest">{t('location')}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <span className="mono text-[8px] md:text-[9px] uppercase opacity-40 tracking-widest">LOCAL TIME</span>
            <span className="heading text-xs md:text-sm uppercase font-bold tracking-widest tabular-nums">{time} (GMT-5)</span>
          </div>

          <div className="flex flex-col gap-2 md:gap-3 sm:items-end md:col-start-4">
            <span className="mono text-[8px] md:text-[9px] uppercase opacity-40 tracking-widest mb-1">SOCIAL</span>
            <div className="flex gap-4 items-center">
              <SocialIcon 
                href="https://wa.me/51906936891" 
                aria="WhatsApp" 
                d="M17.472 14.382c-.301-.15-1.781-.88-2.057-.981-.275-.1-.476-.15-.677.15-.201.3-.777 1.006-.95 1.201-.173.196-.347.221-.647.071-.301-.15-1.272-.47-2.422-1.496-.894-.798-1.498-1.783-1.674-2.083-.176-.3-.019-.462.131-.611.135-.134.301-.351.451-.526.151-.175.201-.301.301-.501.1-.2.05-.375-.025-.525-.075-.15-.677-1.636-.927-2.236-.244-.587-.492-.507-.677-.516-.174-.008-.374-.01-.574-.01s-.526.075-.801.375c-.275.3-1.05 1.026-1.05 2.501 0 1.475 1.076 2.901 1.226 3.101.15.2 2.113 3.221 5.118 4.522.715.31 1.274.495 1.708.633.718.228 1.37.195 1.886.118.575-.086 1.781-.727 2.031-1.427.25-.7.25-1.301.176-1.426-.075-.125-.275-.201-.576-.351zM12.004 2c-5.518 0-10 4.482-10 10 0 1.765.459 3.421 1.264 4.861L2 22l5.285-1.387c1.403.766 2.997 1.202 4.693 1.202 5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18.25c-1.611 0-3.118-.445-4.406-1.218l-.316-.188-3.279.86.874-3.195-.207-.329c-.711-1.129-1.116-2.47-1.116-3.904 0-4.004 3.246-7.25 7.25-7.25s7.25 3.246 7.25 7.25-3.246 7.25-7.25 7.25z" />
              <SocialIcon 
                href="https://www.facebook.com/hanna.mt.1238/" 
                aria="Facebook" 
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              <SocialIcon 
                href="https://www.instagram.com/_sooymor/" 
                aria="Instagram" 
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 border-t border-black/5 pt-8 md:pt-12">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center">
             <span className="mono text-[9px] opacity-40 tracking-widest uppercase">{t('copyright')}</span>
             <span className="hidden sm:inline mono text-[9px] opacity-40">/</span>
             <span className="mono text-[9px] opacity-40 tracking-widest uppercase">ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="mono text-[9px] opacity-40 uppercase tracking-widest">{t('designed_by')}</span>
             <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-black/10 flex items-center justify-center group overflow-hidden relative cursor-help">
                <div className="absolute inset-0 bg-black scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                <span className="heading text-[8px] font-bold z-10 group-hover:text-white transition-colors duration-500">TM</span>
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-2%] md:bottom-[-5%] left-[-2%] text-[25vw] md:text-[35vw] font-black opacity-[0.02] select-none pointer-events-none uppercase heading leading-none whitespace-nowrap">
        MORIANO
      </div>
    </footer>
  );
};

export default Footer;
