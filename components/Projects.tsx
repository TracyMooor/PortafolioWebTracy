import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from './LanguageContext';
import { projects } from './projectsData';
import { useSmoothScroll } from './SmoothScroll';

const Projects: React.FC = () => {
  const { t, lang } = useLang();
  const lenis = useSmoothScroll();
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Drag state and references for custom horizontal dragging
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startScrollYRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const isFirstMoveRef = useRef(true);
  const isSwipeHorizontalRef = useRef(false);

  useEffect(() => {
    const section = horizontalRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const totalWidth = section.scrollWidth - window.innerWidth;

      gsap.to(section, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Find which project is currently active (closest to left margin)
            const currentX = self.progress * totalWidth;
            const items = section.querySelectorAll('.project-item');
            if (items.length > 0) {
              const firstItem = items[0] as HTMLElement;
              const firstOffset = firstItem.offsetLeft;
              let newIndex = 0;
              let minDiff = Infinity;

              items.forEach((itemNode, idx) => {
                const item = itemNode as HTMLElement;
                const itemX = item.offsetLeft - firstOffset;
                const diff = Math.abs(itemX - currentX);
                if (diff < minDiff) {
                  minDiff = diff;
                  newIndex = idx;
                }
              });

              if (newIndex !== activeIndexRef.current) {
                activeIndexRef.current = newIndex;
                setActiveIndex(newIndex);
              }
            }
          }
        }
      });

      // Header Fade In
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 90%'
        }
      });

      // Individual project title animations
      section.querySelectorAll('.project-item').forEach((item) => {
        const title = item.querySelector('.project-title');
        if (title) {
          gsap.from(title, {
            y: '50%',
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              containerAnimation: gsap.to(section, { x: -totalWidth, ease: 'none' }),
              start: 'left 85%'
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Drag interaction logic
  const handleDragStart = (clientX: number) => {
    const scrollTrigger = ScrollTrigger.getAll().find(st => st.trigger === triggerRef.current);
    if (!scrollTrigger) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = clientX;
    startScrollYRef.current = window.scrollY;
    dragDistanceRef.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;

    const scrollTrigger = ScrollTrigger.getAll().find(st => st.trigger === triggerRef.current);
    if (!scrollTrigger) return;

    const deltaX = clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);

    const minScroll = scrollTrigger.start;
    const maxScroll = scrollTrigger.end;

    // Convert horizontal displacement into vertical scroll with a multiplier to make it responsive
    const multiplier = 2.5;
    let targetScrollY = startScrollYRef.current - (deltaX * multiplier);
    targetScrollY = Math.max(minScroll, Math.min(maxScroll, targetScrollY));

    if (lenis) {
      lenis.scrollTo(targetScrollY, { immediate: true });
    } else {
      window.scrollTo(0, targetScrollY);
    }
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  // Listen to touch gestures with passive option configuration to allow e.preventDefault()
  useEffect(() => {
    const container = horizontalRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        startXRef.current = e.touches[0].clientX;
        startYRef.current = e.touches[0].clientY;
        startScrollYRef.current = window.scrollY;
        isFirstMoveRef.current = true;
        isSwipeHorizontalRef.current = false;
        dragDistanceRef.current = 0;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;

      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;

      if (isFirstMoveRef.current) {
        const deltaX = clientX - startXRef.current;
        const deltaY = clientY - startYRef.current;

        // If movement is horizontal, take control of the drag
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
          isSwipeHorizontalRef.current = true;
          isDraggingRef.current = true;
          setIsDragging(true);
        } else {
          isSwipeHorizontalRef.current = false;
          isDraggingRef.current = false;
        }
        isFirstMoveRef.current = false;
      }

      if (isSwipeHorizontalRef.current) {
        // Prevent default browser scrolling only for horizontal swipes
        if (e.cancelable) {
          e.preventDefault();
        }
        handleDragMove(clientX);
      }
    };

    const onTouchEnd = () => {
      if (isSwipeHorizontalRef.current) {
        handleDragEnd();
      }
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [lenis]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) return; // Disable mouse dragging on desktop
    if (e.button !== 0) return; // Only left click
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) return; // Disable mouse dragging on desktop
    handleDragMove(e.clientX);
  };

  const onMouseUpOrLeave = () => {
    if (window.innerWidth >= 1024) return; // Disable mouse dragging on desktop
    handleDragEnd();
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    // If the user was dragging, prevent navigation
    if (dragDistanceRef.current > 15) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollToProject = (index: number) => {
    const container = horizontalRef.current;
    if (!container) return;
    const items = container.querySelectorAll('.project-item');
    if (index < 0 || index >= items.length) return;

    const item = items[index] as HTMLElement;
    const firstItem = items[0] as HTMLElement;
    const scrollTrigger = ScrollTrigger.getAll().find(st => st.trigger === triggerRef.current);
    if (!scrollTrigger) return;

    const x = item.offsetLeft - firstItem.offsetLeft;
    const totalWidth = container.scrollWidth - window.innerWidth;
    const clampedX = Math.min(x, totalWidth);
    const targetScroll = scrollTrigger.start + clampedX;

    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToProject(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      scrollToProject(activeIndex + 1);
    }
  };

  return (
    <section id="projects" ref={triggerRef} className="relative bg-[#050505] overflow-hidden min-h-screen flex flex-col justify-start select-none">
      {/* Reduced padding on mobile (pt-20 vs pt-32) to bring content higher */}
      <div ref={headerRef} className="w-full px-6 md:px-24 pt-20 md:pt-32 pb-8 md:pb-16 z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 border-b border-white/5 pb-8 md:pb-16">
          <div className="flex flex-col gap-3 md:gap-5">
            <span className="mono text-[9px] md:text-[10px] uppercase text-white/40 tracking-[0.4em]">02 — {t('selectedWorks')}</span>
            
            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-6 mt-1">
              <div className="hidden md:block mono text-[11px] text-white/60 tracking-wider">
                <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="text-white/20"> / </span>
                <span>{String(projects.length).padStart(2, '0')}</span>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
                    activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-white hover:bg-white text-white hover:text-black active:scale-95'
                  }`}
                  aria-label="Previous Project"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === projects.length - 1}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
                    activeIndex === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-white hover:bg-white text-white hover:text-black active:scale-95'
                  }`}
                  aria-label="Next Project"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-md">
            <p className="text-white/30 text-[9px] md:text-xs mono leading-relaxed uppercase tracking-widest text-left md:text-right">
              {t('project_desc')}
            </p>
            <p className="text-white/15 text-[8px] md:text-[9px] mono uppercase tracking-wider mt-2.5 text-left md:text-right hidden sm:block">
              {lang === 'ESP'
                ? 'Usa el scroll o las flechas para explorar'
                : 'Use scroll or arrows to explore'}
            </p>
          </div>
        </div>
      </div>

      {/* Optimized spacing for desktop to ensure vertical visibility, with internal bottom padding */}
      <div
        ref={horizontalRef}
        className={`flex h-[60vh] md:h-fit items-start px-6 md:px-24 pt-10 md:-mt-24 pb-16 md:pb-28 gap-12 md:gap-32 lg:gap-40 relative select-none lg:cursor-default ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
      >
        {projects.map((project, index) => (
          <div key={index} className="project-item flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] group flex flex-col pt-0">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                draggable="false"
                className="relative overflow-hidden aspect-video bg-zinc-900 shadow-2xl rounded-sm block cursor-pointer group/img"
              >
                <div className="absolute top-8 right-8 z-30 pointer-events-none animate-mouse-click-expert">
                  <div className="relative">
                    {/* Synchronized Expert Ripple */}
                    <div
                      className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full animate-ripple-expert pointer-events-none"
                      style={{ borderColor: project.glowColor }}
                    />

                    {/* Expert Impact Flare */}
                    <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-xl rounded-full scale-0 animate-impact-flare pointer-events-none" />
                    <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-white blur-md rounded-full scale-0 animate-impact-flare pointer-events-none" />

                    {/* DESKTOP INDICATOR: Dynamic Color Arrow */}
                    <div className="hidden md:block animate-neon-flicker">
                      {/* Soft Ambient Glow base */}
                      <div
                        className="absolute inset-0 blur-xl rounded-full scale-125 opacity-20"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        className="transform rotate-[-95deg]"
                        style={{ filter: `drop-shadow(0 0 8px ${project.glowColor})` }}
                      >
                        {/* Outer Body Glow Path */}
                        <path
                          d="M5.5 3.21V20.8L10.07 16.23L13.12 22.5L16.22 21L13.17 14.73L18.79 14.73L5.5 3.21Z"
                          fill={project.accentColor}
                          opacity="0.3"
                        />
                        {/* Main Body Path */}
                        <path
                          d="M5.5 3.21V20.8L10.07 16.23L13.12 22.5L16.22 21L13.17 14.73L18.79 14.73L5.5 3.21Z"
                          fill="#121212"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        {/* High-Brightness Core */}
                        <path
                          d="M7.5 5.5V17L10.5 14L14 21L15 20.5L11.5 13.5L16.5 13.5L7.5 5.5Z"
                          fill="white"
                          opacity="0.3"
                        />
                      </svg>
                    </div>

                    {/* MOBILE INDICATOR: Dynamic Color Arrow (Unified) */}
                    <div className="block md:hidden animate-neon-flicker">
                      {/* Soft Ambient Glow base */}
                      <div
                        className="absolute inset-0 blur-xl rounded-full scale-125 opacity-20"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        className="transform rotate-[-135deg]"
                        style={{ filter: `drop-shadow(0 0 8px ${project.glowColor})` }}
                      >
                        {/* Outer Body Glow Path */}
                        <path
                          d="M5.5 3.21V20.8L10.07 16.23L13.12 22.5L16.22 21L13.17 14.73L18.79 14.73L5.5 3.21Z"
                          fill={project.accentColor}
                          opacity="0.3"
                        />
                        {/* Main Body Path */}
                        <path
                          d="M5.5 3.21V20.8L10.07 16.23L13.12 22.5L16.22 21L13.17 14.73L18.79 14.73L5.5 3.21Z"
                          fill="#121212"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        {/* High-Brightness Core */}
                        <path
                          d="M7.5 5.5V17L10.5 14L14 21L15 20.5L11.5 13.5L16.5 13.5L7.5 5.5Z"
                          fill="white"
                          opacity="0.3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <img
                  src={project.img}
                  alt={project.title}
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-[2.5s] cubic-bezier(0.19, 1, 0.22, 1) group-hover/img:scale-105 animate-image-impact"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover/img:opacity-30 transition-opacity duration-700" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                  <h3 className="project-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl heading font-bold text-white uppercase tracking-tight leading-[1] will-change-transform animate-text-reveal transition-all duration-700 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>
                </div>
              </a>
            ) : (
              <div className="relative overflow-hidden aspect-video bg-zinc-900 shadow-2xl rounded-sm">
                <img
                  src={project.img}
                  alt={project.title}
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-[2.5s] cubic-bezier(0.19, 1, 0.22, 1)"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                  <h3 className="project-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl heading font-bold text-white uppercase tracking-tight leading-[1] will-change-transform animate-text-reveal transition-all duration-700 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>
                </div>
              </div>
            )}

            <div className="mt-6 md:mt-8 flex justify-between items-start px-1 border-t border-white/10 pt-6 group-hover:border-white/20 transition-colors duration-700">
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/30 rounded-full"></span>
                  <span className="mono text-[10px] md:text-xs uppercase text-white/40 tracking-[0.5em] font-medium">
                    {t('category_label')}
                  </span>
                </div>
                <h4 className="heading text-xl md:text-2xl lg:text-3xl tracking-tighter font-bold text-white leading-[0.9]">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="group/link inline-flex items-center gap-3 md:gap-4"
                    >
                      <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full border border-white/20 group-hover/link:border-white group-hover/link:bg-white transition-all duration-500 animate-bounce-gentle">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3.5 h-3.5 md:w-5 md:h-5 text-white/40 group-hover/link:text-black transition-all duration-500 rotate-[-45deg] group-hover/link:rotate-0"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </div>
                      <span className="relative pb-1">
                        {t('visitWeb')}
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
                      </span>
                    </a>
                  ) : (
                    <span className="uppercase">
                      {t('visitWeb')}
                    </span>
                  )}
                </h4>
              </div>

              <div className="flex flex-col gap-2 md:gap-3 items-end text-right">
                <div className="flex items-center gap-3 justify-end">
                  <span className="mono text-[10px] md:text-xs uppercase text-white/40 tracking-[0.5em] font-medium">
                    {t('year_label')}
                  </span>
                  <span className="w-2 h-2 bg-white/30 rounded-full"></span>
                </div>
                <h4 className="heading text-xl md:text-2xl lg:text-3xl uppercase tracking-tighter font-bold text-white leading-[0.9]">
                  {project.year}
                </h4>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer to allow the last item to be centered before ending scroll */}
        <div className="flex-shrink-0 w-[20vw] md:w-[30vw]" />
      </div>
    </section>
  );
};

export default Projects;
