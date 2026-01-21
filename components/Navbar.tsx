
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLang } from './LanguageContext';
import { useSmoothScroll } from './SmoothScroll';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SocialIconMenu = ({ href, aria, d }: { href: string, aria: string, d: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 transition-all duration-500 hover:border-white hover:bg-white overflow-hidden"
      aria-label={aria}
    >
      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo rounded-full" />
      <svg className="w-4 h-4 fill-current text-white group-hover:text-black transition-colors duration-500 relative z-10" viewBox="0 0 24 24">
        <path d={d} />
      </svg>
    </a>
  );
};

const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLang();
  const lenis = useSmoothScroll();
  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Entrance animation for the nav bar
    gsap.fromTo(navRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'expo.out',
        onComplete: () => {
          if (navRef.current) gsap.set(navRef.current, { clearProps: "y" });
        }
      }
    );
  }, []);

  useEffect(() => {
    const overlay = menuOverlayRef.current;
    const links = menuLinksRef.current?.querySelectorAll('.mobile-link');
    const mobileFooter = menuOverlayRef.current?.querySelector('.mobile-footer');
    const bgText = menuOverlayRef.current?.querySelector('.bg-text-menu');

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlay, {
        top: 0,
        duration: 1.2,
        ease: 'expo.inOut',
      });
      tl.fromTo(bgText,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.03, scale: 1, duration: 2, ease: 'expo.out' },
        "-=0.5"
      );
      if (links) {
        tl.fromTo(links,
          { y: 80, opacity: 0, rotate: 2 },
          { y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 1, ease: 'expo.out' },
          "-=0.8"
        );
      }
      tl.fromTo(mobileFooter,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
        "-=0.6"
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, {
        top: '-100%',
        duration: 1,
        ease: 'expo.inOut',
      });
    }
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId === 'home' || targetId === 'projects' || targetId === 'about' || targetId === 'contact' || targetId === 'services') {
      setIsMenuOpen(false);
      return;
    }

    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      return;
    }

    // Smooth scroll using Lenis
    if (lenis) {
      const target = document.querySelector(`#${targetId}`);
      if (target) {
        lenis.scrollTo(target as HTMLElement, {
          offset: 0,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    } else {
      document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'home', id: 'home', path: '/', num: '01' },
    { label: 'about', id: 'about', path: '/about', num: '02' },
    { label: 'services', id: 'services', path: '/services', num: '03' },
    { label: 'projects', id: 'projects', path: '/projects', num: '04' },
    { label: 'contact', id: 'contact', path: '/contact', num: '05' }
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[1001] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md border-b border-white/5"
      >
        {/* Brand Group */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              lenis?.scrollTo(0);
            }
          }}
          className="flex items-center gap-4 cursor-pointer group z-[1002]"
        >
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center overflow-hidden relative interactive">
            <div className="w-full h-full absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white group-hover:bg-black rounded-full transition-colors duration-500 z-10" />
          </div>
          <span className="heading text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white whitespace-nowrap">
            Tracy Moriano
          </span>
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="flex items-center gap-10 lg:gap-16">
          <div className="hidden md:flex items-center gap-8 lg:gap-12 mr-4 lg:mr-8">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => handleNavClick(e as any, item.id)}
                className="mono text-[9px] lg:text-[10px] uppercase tracking-[0.35em] text-white/50 hover:text-white transition-all relative group py-1 interactive"
              >
                {t(item.label)}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 z-[1002]">
            <div className="flex border border-white/10 rounded-full p-0.5 bg-white/5">
              <button
                onClick={() => setLang('ENG')}
                className={`px-3 py-1 mono text-[8px] md:text-[9px] rounded-full transition-all duration-300 interactive ${lang === 'ENG' ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'}`}
              >
                ENG
              </button>
              <button
                onClick={() => setLang('ESP')}
                className={`px-3 py-1 mono text-[8px] md:text-[9px] rounded-full transition-all duration-300 interactive ${lang === 'ESP' ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'}`}
              >
                ESP
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative group interactive"
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-[1px] bg-white transition-all duration-500 ease-expo ${isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
              <span className={`w-6 h-[1px] bg-white transition-all duration-500 ease-expo ${isMenuOpen ? '-rotate-45 translate-y-[-3px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed top-[-100%] left-0 w-full h-full bg-[#0A0A0A] z-[1000] flex flex-col px-8 pt-32 pb-12 overflow-hidden md:hidden"
      >
        {/* Background Decorative Text */}
        <div className="bg-text-menu absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="heading text-[30vw] font-black text-white opacity-0 select-none tracking-tighter">MENU</span>
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none noise-bg-texture" />

        <div ref={menuLinksRef} className="flex flex-col gap-10 relative z-10 mt-10">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleNavClick(e as any, item.id)}
              className="mobile-link group flex items-start gap-4 interactive"
            >
              <span className="mono text-[12px] text-white/30 pt-2">{item.num}</span>
              <span className="heading text-[12vw] leading-[1.1] uppercase font-bold tracking-tighter text-white transition-all duration-500 group-hover:italic group-hover:translate-x-4">
                {t(item.label)}
              </span>
            </Link>
          ))}
        </div>

        <div className="mobile-footer mt-auto pt-10 border-t border-white/10 relative z-10 flex flex-col gap-10">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-3">
              <span className="mono text-[9px] uppercase text-white/30 tracking-[0.3em]">{t('basedIn')}</span>
              <span className="heading text-xs uppercase font-bold text-white tracking-widest">{t('heroLocation')}</span>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <span className="mono text-[9px] uppercase text-white/30 tracking-[0.3em]">{lang === 'ESP' ? 'CONTACTO' : 'CONTACT'}</span>
              <div className="flex gap-4">
                <SocialIconMenu
                  href="https://wa.me/51906936891"
                  aria="WhatsApp"
                  d="M17.472 14.382c-.301-.15-1.781-.88-2.057-.981-.275-.1-.476-.15-.677.15-.201.3-.777 1.006-.95 1.201-.173.196-.347.221-.647.071-.301-.15-1.272-.47-2.422-1.496-.894-.798-1.498-1.783-1.674-2.083-.176-.3-.019-.462.131-.611.135-.134.301-.351.451-.526.151-.175.201-.301.301-.501.1-.2.05-.375-.025-.525-.075-.15-.677-1.636-.927-2.236-.244-.587-.492-.507-.677-.516-.174-.008-.374-.01-.574-.01s-.526.075-.801.375c-.275.3-1.05 1.026-1.05 2.501 0 1.475 1.076 2.901 1.226 3.101.15.2 2.113 3.221 5.118 4.522.715.31 1.274.495 1.708.633.718.228 1.37.195 1.886.118.575-.086 1.781-.727 2.031-1.427.25-.7.25-1.301.176-1.426-.075-.125-.275-.201-.576-.351zM12.004 2c-5.518 0-10 4.482-10 10 0 1.765.459 3.421 1.264 4.861L2 22l5.285-1.387c1.403.766 2.997 1.202 4.693 1.202 5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18.25c-1.611 0-3.118-.445-4.406-1.218l-.316-.188-3.279.86.874-3.195-.207-.329c-.711-1.129-1.116-2.47-1.116-3.904 0-4.004 3.246-7.25 7.25-7.25s7.25 3.246 7.25 7.25-3.246 7.25-7.25 7.25z"
                />
                <SocialIconMenu
                  href="https://www.facebook.com/hanna.mt.1238/"
                  aria="Facebook"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                />
                <SocialIconMenu
                  href="https://www.instagram.com/_sooymor/"
                  aria="Instagram"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </div>
            </div>
          </div>
          <p className="mono text-[8px] text-center text-white/20 uppercase tracking-[0.5em]">
            TRACY MORIANO © 2025
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
