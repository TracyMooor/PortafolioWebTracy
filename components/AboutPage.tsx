
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const AboutPage: React.FC = () => {
    const { lang, t } = useLang();
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.from('.page-title', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            });

            gsap.from('.about-content', {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out'
            });

            gsap.from('.about-image', {
                scale: 1.1,
                opacity: 0,
                duration: 1.5,
                ease: 'expo.out'
            });

            gsap.from('.stat-item', {
                y: 20,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 0.6,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const skills = [
        { category: "Frontend", items: ["React", "Next.js", "TypeScript", "GSAP", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "PostgreSQL", "Python", "PHP", "AWS"] },
        { category: "Design", items: ["UI/UX", "Figma", "Branding", "Creative Direction"] }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <header className="mb-20">
                    <Link to="/" className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-8 group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        {t('backToHome')}
                    </Link>

                    <h1 className="page-title heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-6">
                        {t('about')}
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                    <div className="lg:col-span-7 about-content">
                        <div className="mono text-[10px] uppercase text-white/40 mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-white/20"></span>
                            {t('philosophy')}
                        </div>

                        <p className="text-2xl md:text-3xl lg:text-4xl heading leading-tight tracking-tight mb-12">
                            {t('about_intro')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
                            <div>
                                <h4 className="mono text-[10px] uppercase opacity-40 mb-4 tracking-[0.4em]">{t('mindset_label')}</h4>
                                <p className="text-white/60 text-lg leading-relaxed">{t('mindset_text')}</p>
                            </div>
                            <div>
                                <h4 className="mono text-[10px] uppercase opacity-40 mb-4 tracking-[0.4em]">{t('goal_label')}</h4>
                                <p className="text-white/60 text-lg leading-relaxed">{t('goal_text')}</p>
                            </div>
                        </div>

                        <div className="mt-20">
                            <h4 className="mono text-[10px] uppercase opacity-40 mb-10 tracking-[0.4em]">EXPERTISE</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                                {skills.map((skill, i) => (
                                    <div key={i} className="stat-item">
                                        <h5 className="heading text-xl font-bold mb-4 uppercase tracking-tight">{skill.category}</h5>
                                        <ul className="space-y-2">
                                            {skill.items.map((item, j) => (
                                                <li key={j} className="text-white/40 mono text-xs uppercase tracking-widest">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="about-image relative aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm shadow-2xl">
                            <img
                                src="/portafoliotracy.jpg"
                                alt="Tracy Moriano"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <div className="mt-8 flex justify-between items-start px-1">
                            <div className="flex flex-col">
                                <span className="mono text-[9px] uppercase opacity-40 mb-1">{t('location_label')}</span>
                                <span className="heading text-sm uppercase tracking-widest font-bold text-white">{t('location')}</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="mono text-[9px] uppercase opacity-40 mb-1">{t('role_label')}</span>
                                <span className="heading text-sm uppercase tracking-widest font-bold text-white">{t('fullstack_lead')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-32 p-12 md:p-24 bg-white/5 rounded-sm border border-white/10 text-center relative overflow-hidden group/projects">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/projects:translate-y-0 transition-transform duration-700 ease-expo"></div>
                    <div className="relative z-10">
                        <h2 className="heading text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover/projects:text-black transition-colors duration-500">
                            {lang === 'ESP' ? '¿Quieres ver mis trabajos?' : 'Want to see my work?'}
                        </h2>
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-4 heading text-xl md:text-2xl font-bold uppercase tracking-widest border-b-2 border-white group-hover/projects:text-black group-hover/projects:border-black transition-all duration-500 pb-2"
                        >
                            {t('projects')}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform group-hover/projects:translate-x-2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Grid background */}
            <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:80px_80px]"></div>
            </div>
        </div>
    );
};

export default AboutPage;
