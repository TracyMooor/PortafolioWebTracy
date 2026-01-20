
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const TechStack: React.FC = () => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const stack = [
    
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

  
};

export default TechStack;
