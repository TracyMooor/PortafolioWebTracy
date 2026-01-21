
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

            gsap.from('.process-step', {
                x: -30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.process-section',
                    start: 'top 80%',
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        }
    ];

    const steps = [
        { num: t('step1_num'), title: t('step1_title'), desc: t('step1_desc') },
        { num: t('step2_num'), title: t('step2_title'), desc: t('step2_desc') },
        { num: t('step3_num'), title: t('step3_title'), desc: t('step3_desc') },
        { num: t('step4_num'), title: t('step4_title'), desc: t('step4_desc') }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div className="max-w-3xl">
                        <Link to="/" className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-12 group">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            {t('backToHome')}
                        </Link>

                        <h1 className="page-title heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-none mb-8">
                            {t('services')}
                        </h1>
                        <p className="max-w-xl text-white/40 mono text-xs md:text-sm uppercase tracking-[0.25em] leading-[1.8]">
                            {t('services_intro')}
                        </p>
                    </div>
                </header>



                {/* Process Section */}
                <section className="process-section mb-40 border-t border-white/5 pt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                        <h2 className="heading text-4xl md:text-6xl font-bold uppercase tracking-tighter max-w-md">
                            {t('process_title')}
                        </h2>
                        <div className="max-w-md">
                            <p className="mono text-[10px] text-white/30 uppercase tracking-[0.3em] leading-relaxed">
                                {lang === 'ESP' ? "Un enfoque metodológico para garantizar resultados excepcionales en cada proyecto." : "A methodological approach to ensure exceptional results in every project."}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {steps.map((step, i) => (
                            <div key={i} className="process-step group flex flex-col gap-6">
                                <div className="flex items-center gap-6">
                                    <span className="heading text-5xl md:text-6xl font-black text-white/20 group-hover:text-white transition-colors duration-700">{step.num}</span>
                                    <div className="h-[2px] flex-grow bg-white/20 group-hover:bg-white transition-colors duration-700"></div>
                                </div>
                                <h4 className="heading text-xl md:text-2xl font-bold uppercase tracking-tight text-white">{step.title}</h4>
                                <p className="text-white/70 text-sm leading-relaxed md:pr-4 font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ/Trust Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40">
                    <div>
                        <span className="mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-8 block">{lang === 'ESP' ? 'Por qué elegirme' : 'Why Work With Me'}</span>
                        <h3 className="heading text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12 leading-none">
                            {lang === 'ESP' ? "Sitios Web que Impulsan Negocios." : "Websites that Drive Business."}
                        </h3>
                        <div className="space-y-8">
                            {[
                                { t: lang === 'ESP' ? "Adaptabilidad Total" : "Total Adaptability", d: lang === 'ESP' ? "Desde tiendas locales hasta corporativos; soluciones web que se ajustan a la escala de tu empresa." : "From local shops to corporate entities; web solutions that fit your business scale." },
                                { t: lang === 'ESP' ? "Enfoque en Conversión" : "Conversion Focused", d: lang === 'ESP' ? "Páginas diseñadas para convertir visitantes en clientes reales desde el primer día." : "Pages designed to turn visitors into real customers from day one." },
                                { t: lang === 'ESP' ? "Tecnología de Vanguardia" : "Cutting-edge Tech", d: lang === 'ESP' ? "Sitios rápidos, seguros y optimizados para SEO que posicionan tu marca en lo más alto." : "Fast, secure, and SEO-optimized sites that position your brand at the top." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                                    <div>
                                        <h5 className="heading text-xl font-bold uppercase tracking-tight mb-2 text-white">{item.t}</h5>
                                        <p className="text-white/70 text-sm font-medium">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-black border border-white/20">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                        >
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-modern-connection-lines-loop-33300-large.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-10 left-10 z-10">
                            <span className="heading text-6xl font-black italic text-white/10 uppercase select-none pointer-events-none block mb-4">
                                QUALITY
                            </span>
                            <p className="mono text-[11px] text-white/60 font-bold uppercase tracking-[0.5em]">Engineering Passion</p>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-32 p-12 md:p-24 bg-white/5 rounded-sm border border-white/10 text-center relative overflow-hidden group/cta">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/cta:translate-y-0 transition-transform duration-700 ease-expo"></div>
                    <div className="relative z-10">
                        <h2 className="heading text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover/cta:text-black transition-colors duration-500">
                            {lang === 'ESP' ? '¿Listo para profesionalizar tu marca?' : 'Ready to professionalize your brand?'}
                        </h2>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-4 heading text-xl md:text-2xl font-bold uppercase tracking-widest border-b-2 border-white group-hover/cta:text-black group-hover/cta:border-black transition-all duration-500 pb-2"
                        >
                            {lang === 'ESP' ? 'Inicia un proyecto' : 'Start a project'}
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
