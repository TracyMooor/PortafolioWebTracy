
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: 'expo.inOut',
          onComplete: onComplete
        });
      }
    });

    // Animate counter logic
    const counterObj = { value: 0 };
    gsap.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: 'power4.inOut',
      onUpdate: () => {
        setProgress(Math.floor(counterObj.value));
      }
    });

    // Text animations
    tl.fromTo(".loader-char", 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: 'expo.out', delay: 0.5 }
    )
    .to(".loader-char", {
      letterSpacing: "0.2em",
      duration: 1.5,
      ease: 'expo.inOut'
    }, "-=0.2")
    .to(".loader-char", {
      y: -100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: 'expo.in'
    }, "+=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const splitName = "TRACY MORIANO".split("");

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex overflow-hidden">
        {splitName.map((char, i) => (
          <span 
            key={i} 
            className="loader-char heading text-4xl md:text-7xl font-bold text-white uppercase inline-block whitespace-pre"
          >
            {char}
          </span>
        ))}
      </div>
      
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 overflow-hidden">
        <div ref={counterRef} className="mono text-4xl md:text-8xl font-bold text-white/10 tabular-nums">
          {progress < 10 ? `0${progress}` : progress}
        </div>
      </div>

      <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24">
        <div className="w-32 md:w-48 h-px bg-white/10 relative">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
