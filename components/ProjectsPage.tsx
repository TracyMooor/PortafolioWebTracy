
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from './LanguageContext';
import { projects } from './projectsData';

const ProjectsPage: React.FC = () => {
    const { t } = useLang();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.from('.project-card', {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.5
            });

            gsap.from('.page-title', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <header className="mb-20">
                    <Link to="/" className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-8 group">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card group">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative aspect-video overflow-hidden rounded-sm bg-zinc-900 mb-6"
                            >
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Accent Glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at center, ${project.accentColor}, transparent)` }}
                                />
                            </a>

                            <div className="flex justify-between items-end border-b border-white/5 pb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }}></span>
                                        <span className="mono text-[10px] uppercase text-white/40 tracking-[0.3em]">
                                            {project.category === 'Visit Web' ? t('visitWeb') : project.category}
                                        </span>
                                    </div>
                                    <h3 className="heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
                                        {project.title}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <span className="mono text-[10px] uppercase text-white/40 tracking-[0.3em] block mb-2">
                                        {t('year_label')}
                                    </span>
                                    <span className="heading text-xl md:text-2xl font-bold">
                                        {project.year}
                                    </span>
                                </div>
                            </div>
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
