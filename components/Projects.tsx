
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const projects = [
  {
    title: 'La Casa de Aurora',
    category: 'SaaS Platform',
    year: '2026',
    img: '/lacasa.jpg',
    link: 'https://lacasadeaurora.vercel.app/',
  },
  {
    title: 'Nexus AI',
    category: 'Full Stack Dashboard',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  },
  {
    title: 'EcoFlow',
    category: 'Sustainable Tech',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop',
  },
  {
    title: 'Mono Collective',
    category: 'Design Agency',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop',
  }
];

const Projects: React.FC = () => {
  const { t } = useLang();
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = horizontalRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // We only apply pinning and horizontal scroll if screen is reasonably wide
      // or if we want to keep it consistent, we ensure it's tight.
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
          invalidateOnRefresh: true 
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

  return (
    <section id="projects" ref={triggerRef} className="relative bg-[#050505] overflow-hidden min-h-screen flex flex-col justify-start">
      {/* Reduced padding on mobile (pt-20 vs pt-32) to bring content higher */}
      <div ref={headerRef} className="w-full px-6 md:px-24 pt-20 md:pt-32 pb-8 md:pb-16 z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 border-b border-white/5 pb-8 md:pb-16">
          <div className="flex flex-col gap-2 md:gap-4">
            <span className="mono text-[9px] md:text-[10px] uppercase text-white/40 tracking-[0.4em]">03 — {t('selectedWorks')}</span>
          </div>
          <div className="max-w-md">
            <p className="text-white/30 text-[9px] md:text-xs mono leading-relaxed uppercase tracking-widest text-left md:text-right">
              {t('project_desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Adjusted height on mobile to keep items compact */}
      <div ref={horizontalRef} className="flex h-[60vh] md:h-[75vh] items-center px-6 md:px-24 gap-12 md:gap-48 relative">
        {projects.map((project, index) => (
          <div key={index} className="project-item flex-shrink-0 w-[80vw] md:w-[65vw] lg:w-[60vw] group flex flex-col">
            <div className="relative overflow-hidden aspect-video bg-zinc-900 shadow-2xl rounded-sm">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-[2.5s] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-700" />
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 overflow-hidden">
                 <h3 className="project-title text-4xl sm:text-5xl md:text-8xl lg:text-[7vw] heading font-bold text-white uppercase tracking-tighter leading-[0.85] will-change-transform">
                   {project.title}
                 </h3>
              </div>
            </div>
            
            <div className="mt-6 md:mt-10 flex justify-between items-start px-1 text-white/90">
              <div className="flex flex-col gap-2 md:gap-4">
                <span className="mono text-[8px] md:text-[10px] uppercase opacity-30 tracking-[0.3em]">
                  0{index + 1} / {t('category_label')}
                </span>
                <span className="heading text-lg md:text-3xl uppercase tracking-tighter font-medium">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-col gap-2 md:gap-4 items-end">
                <span className="mono text-[8px] md:text-[10px] uppercase opacity-30 tracking-[0.3em]">
                  {t('year_label')}
                </span>
                <span className="heading text-lg md:text-3xl uppercase tracking-tighter font-medium">
                  {project.year}
                </span>
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
