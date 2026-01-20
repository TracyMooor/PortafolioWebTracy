
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const TechStack: React.FC = () => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const stack = [
    { name: 'React', category: 'cat_frontend' },
    { name: 'TypeScript', category: 'cat_logic' },
    { name: 'GSAP', category: 'cat_motion' },
    { name: 'Node.js', category: 'cat_backend' },
    { name: 'Next.js', category: 'cat_framework' },
    { name: 'WebGL', category: 'cat_graphics' },
    { name: 'Three.js', category: 'cat_3d' },
    { name: 'GLSL', category: 'cat_shaders' },
    { name: 'Tailwind', category: 'cat_styling' },
    { name: 'Framer', category: 'cat_interaction' },
    { name: 'PostgreSQL', category: 'cat_db' },
    { name: 'AWS', category: 'cat_cloud' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cells = gridRef.current?.querySelectorAll('.tech-cell');
      if (cells) {
        gsap.fromTo(cells, 
          { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
          { 
            opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
            stagger: 0.05, duration: 1.5, ease: 'expo.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-8">
          <div className="mono text-[10px] uppercase text-white/40 tracking-[0.4em]">
            02 — {t('tech_stack')}
          </div>
          <div className="max-w-md">
            <p className="text-white/30 text-xs md:text-sm mono leading-relaxed uppercase">
              {t('tech_stack_desc')}
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-white/10 relative z-10">
          {stack.map((item, index) => (
            <div 
              key={index} 
              className="tech-cell group relative aspect-square md:aspect-auto md:h-72 border-r border-b border-white/10 p-8 md:p-10 flex flex-col justify-between hover:bg-white/[0.03] transition-all duration-700 ease-expo cursor-default"
            >
              <div className="mono text-[8px] md:text-[9px] uppercase tracking-[0.25em] opacity-30 group-hover:opacity-100 group-hover:text-white transition-all duration-500">
                {t(item.category)}
              </div>
              <div className="relative overflow-hidden">
                <h3 className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-serif text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-700 ease-expo">
                  {item.name}
                </h3>
              </div>
              <div className="flex justify-between items-end opacity-10 group-hover:opacity-40 transition-opacity">
                <span className="mono text-[8px]">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
