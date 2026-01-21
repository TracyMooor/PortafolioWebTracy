
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const ServicesPage: React.FC = () => {
    const { lang, t } = useLang();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.from('.page-title', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            });

            gsap.from('.service-card', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 0.4,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            id: "01",
            title: lang === 'ESP' ? "Desarrollo Web Full-Stack" : "Full-Stack Web Development",
            desc: lang === 'ESP' ? "Creación de aplicaciones web robustas y escalables utilizando las últimas tecnologías como React, Node.js y bases de datos avanzadas." : "Creating robust and scalable web applications using the latest technologies like React, Node.js and advanced databases.",
            tags: ["React", "Node.js", "TypeScript", "SQL"]
        },
        {
            id: "02",
            title: lang === 'ESP' ? "Diseño de Interfaz (UI/UX)" : "UI/UX Design",
            desc: lang === 'ESP' ? "Interfaces intuitivas y estéticamente atractivas enfocadas en la experiencia del usuario y la conversión." : "Intuitive and aesthetically pleasing interfaces focused on user experience and conversion.",
            tags: ["Figma", "Prototyping", "User Flow"]
        },
        {
            id: "03",
            title: lang === 'ESP' ? "E-commerce & Tiendas Online" : "E-commerce Solutions",
            desc: lang === 'ESP' ? "Desarrollo de tiendas virtuales completas con pasarelas de pago seguras y gestión de inventario optimizada." : "Development of complete virtual stores with secure payment gateways and optimized inventory management.",
            tags: ["Shopify", "Stripe", "Dashboard"]
        },
        {
            id: "04",
            title: lang === 'ESP' ? "Optimización de Rendimiento" : "Performance Optimization",
            desc: lang === 'ESP' ? "Mejora de la velocidad de carga y puntuaciones SEO para maximizar la visibilidad y retención de usuarios." : "Improving load speed and SEO scores to maximize visibility and user retention.",
            tags: ["SEO", "Web Vitals", "Analytics"]
        },
        {
            id: "05",
            title: lang === 'ESP' ? "Desarrollo de Apps Móviles" : "Mobile App Development",
            desc: lang === 'ESP' ? "Aplicaciones móviles multiplataforma que ofrecen una experiencia nativa fluida en iOS y Android." : "Cross-platform mobile applications offering a smooth native experience on iOS and Android.",
            tags: ["React Native", "Mobile First", "API"]
        },
        {
            id: "06",
            title: lang === 'ESP' ? "Consultoría Técnica" : "Technical Consulting",
            desc: lang === 'ESP' ? "Asesoramiento estratégico sobre arquitectura de software y selección de stack tecnológico para nuevos proyectos." : "Strategic advice on software architecture and technology stack selection for new projects.",
            tags: ["Architecture", "Strategy", "Cloud"]
        }
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
                        {t('services')}
                    </h1>
                    <p className="max-w-2xl text-white/40 mono text-xs md:text-sm uppercase tracking-[0.2em] leading-relaxed">
                        {lang === 'ESP' ? "SOLUCIONES DIGITALES A MEDIDA PARA IMPULSAR TU NEGOCIO AL SIGUIENTE NIVEL." : "CUSTOM DIGITAL SOLUTIONS TO DRIVE YOUR BUSINESS TO THE NEXT LEVEL."}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {services.map((service, index) => (
                        <div key={index} className="service-card group border border-white/5 bg-white/[0.02] p-8 md:p-10 rounded-sm hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 flex flex-col justify-between min-h-[400px]">
                            <div>
                                <span className="heading text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500 block mb-10 border-b border-white/5 pb-6">
                                    {service.id}
                                </span>
                                <h3 className="heading text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">
                                    {service.title}
                                </h3>
                                <p className="text-white/50 text-base leading-relaxed mb-10">
                                    {service.desc}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag, j) => (
                                    <span key={j} className="mono text-[8px] md:text-[9px] uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full text-white/30 group-hover:text-white/60 group-hover:border-white/20 transition-all duration-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 p-12 md:p-24 bg-white/5 rounded-sm border border-white/10 text-center relative overflow-hidden group/cta">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/cta:translate-y-0 transition-transform duration-700 ease-expo"></div>
                    <div className="relative z-10">
                        <h2 className="heading text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover/cta:text-black transition-colors duration-500">
                            {lang === 'ESP' ? '¿Listo profesionalizar tu marca?' : 'Ready to professionalize your brand?'}
                        </h2>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-4 heading text-xl md:text-2xl font-bold uppercase tracking-widest border-b-2 border-white group-hover/cta:text-black group-hover/cta:border-black transition-all duration-500 pb-2"
                        >
                            {lang === 'ESP' ? 'Contáctame ahora' : 'Contact me now'}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform group-hover/cta:translate-x-2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>

            <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:80px_80px]"></div>
            </div>
        </div>
    );
};

export default ServicesPage;
