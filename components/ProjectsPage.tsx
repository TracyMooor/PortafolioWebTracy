
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from './LanguageContext';
import { projects } from './projectsData';

const ProjectsPage: React.FC = () => {
    const { t } = useLang();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState('all_projects');
    const isFirstRender = useRef(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.from('.page-title', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isFirstRender.current) {
                // Initial fade in for cards
                gsap.fromTo('.project-card',
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.4 }
                );
                isFirstRender.current = false;
            } else {
                // Fade in cards on filter change
                gsap.fromTo('.project-card',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [activeFilter]);

    const filteredProjects = activeFilter === 'all_projects'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
            <main className="pt-32 pb-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1700px] mx-auto">
                <header className="mb-20">
                    <Link to="/" className="inline-flex md:hidden items-center gap-2 mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-8 group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        {t('backToHome') || 'Back to Home'}
                    </Link>

                    <h1 className="page-title heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-6">
                        {t('projects') || 'Projects'}
                    </h1>
                    <p className="max-w-xl text-white/40 mono text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                        {t('project_desc')}
                    </p>
                </header>

                {/* Premium Categories Filter Bar */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-white/10 pb-8 mb-16">
                    {['all_projects', 'web_corporativa', 'web_ecommerce', 'landing_page', 'catalogo_digital'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`mono text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${
                                activeFilter === filter ? 'text-white' : 'text-white/40 hover:text-white/80'
                            }`}
                        >
                            {t(filter)}
                            {activeFilter === filter && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.title} className="project-card group relative overflow-hidden rounded-2xl aspect-[3/4] bg-zinc-900 border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full relative"
                            >
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Top-right Year Tag */}
                                <div className="absolute top-5 right-5 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/60 mono text-[9px] uppercase tracking-widest">
                                    {project.year}
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 z-10" />

                                {/* Accent Glow on Hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-10"
                                    style={{ background: `radial-gradient(circle at bottom left, ${project.accentColor}, transparent)` }}
                                />

                                {/* Bottom Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end z-20">
                                    <h3 className="heading text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-2 group-hover:translate-x-1 transition-transform duration-500">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }}></span>
                                        <span className="mono text-[10px] uppercase text-white/50 tracking-[0.2em]">
                                            {t(project.category)}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </main>

            {/* Grid background */}
            <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:80px_80px]"></div>
            </div>
        </div>
    );
};

export default ProjectsPage;
