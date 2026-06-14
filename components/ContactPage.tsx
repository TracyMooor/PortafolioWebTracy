
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const ContactPage: React.FC = () => {
    const { lang, t } = useLang();
    const containerRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        const updateTime = () => {
            const now = new Date();
            const limaTime = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/Lima',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).format(now);
            setTime(limaTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        const ctx = gsap.context(() => {
            gsap.from('.page-title', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            });

            gsap.from('.contact-item', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 0.3,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => {
            clearInterval(interval);
            ctx.revert();
        };
    }, []);

    const SocialLink = ({ href, label, value }: { href: string, label: string, value: string }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item group flex flex-col py-8 border-b border-white/10 hover:border-white transition-colors duration-500"
        >
            <span className="mono text-[10px] uppercase text-white/40 mb-2 tracking-[0.4em]">{label}</span>
            <div className="flex justify-between items-center">
                <span className="heading text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 italic group-hover:not-italic">
                    {value}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-[-45deg] group-hover:rotate-0">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </div>
        </a>
    );

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
                        {t('contact')}
                    </h1>
                    <p className="page-title hidden md:block text-white/40 mono text-xs md:text-sm uppercase tracking-[0.25em] leading-relaxed max-w-xl">
                        {lang === 'ESP' ? '¿Tienes una idea? Hagámoslo realidad.' : "Have an idea? Let's make it happen."}
                    </p>
                    <p className="page-title md:hidden text-white/40 mono text-xs uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                        {lang === 'ESP' ? 'Cada gran proyecto comienza con un mensaje. Conversemos sobre tu próxima idea.' : 'Every great project starts with a message. Let\'s talk about your next idea.'}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32">
                    <div className="lg:col-span-7">
                        <div className="flex flex-col gap-0">
                            <SocialLink
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=tracynicolehmorianotuanama@gmail.com"
                                label={t('email')}
                                value="Tracy@gmail.com"
                            />
                            <SocialLink
                                href="https://www.linkedin.com/in/tracymooor/"
                                label={t('linkedin')}
                                value="Tracy Moriano"
                            />
                            <SocialLink
                                href="https://github.com/TracyMooor"
                                label={t('github')}
                                value="TracyMooor"
                            />
                            <SocialLink
                                href="https://wa.me/51906936891?text=Hola%20Tracy%20%F0%9F%98%8A%2C%20acabo%20de%20ver%20tu%20perfil%20y%20me%20interesa%20lo%20que%20haces.%20%C2%BFPodemos%20coordinar%20una%20reuni%C3%B3n%20para%20hablar%20sobre%20un%20proyecto%3F"
                                label="WhatsApp"
                                value="+51 906 936 891"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-end gap-16">
                        <div className="contact-item">
                            <span className="mono text-[10px] uppercase text-white/40 mb-4 block tracking-[0.4em]">{t('basedIn')}</span>
                            <span className="heading text-2xl md:text-3xl font-bold uppercase tracking-tight block">{t('heroLocation')}</span>
                        </div>

                        <div className="contact-item">
                            <span className="mono text-[10px] uppercase text-white/40 mb-4 block tracking-[0.4em]">{lang === 'ESP' ? 'HORA LOCAL' : 'LOCAL TIME'}</span>
                            <span className="heading text-2xl md:text-3xl font-bold uppercase tracking-tight block tabular-nums">{time} (GMT-5)</span>
                        </div>

                        <div className="contact-item hidden md:block p-8 bg-white/5 rounded-sm border border-white/10">
                            <p className="text-white/60 text-lg italic leading-relaxed">
                                {lang === 'ESP' ? '"Cada gran proyecto comienza con un mensaje. Conversemos sobre tu próxima idea."' : '"Every great project starts with a message. Let\'s talk about your next idea."'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section with link to projects as requested */}
                <div className="p-12 md:p-24 bg-white/5 rounded-sm border border-white/10 text-center relative overflow-hidden group/projects">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/projects:translate-y-0 transition-transform duration-700 ease-expo"></div>
                    <div className="relative z-10">
                        <h2 className="heading text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover/projects:text-black transition-colors duration-500">
                            {lang === 'ESP' ? 'Explora mi portafolio completo' : 'Explore my full portfolio'}
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

            <div className="absolute bottom-[-2%] md:bottom-[-5%] right-[-2%] text-[20vw] md:text-[25vw] font-black opacity-[0.02] select-none pointer-events-none uppercase heading leading-none whitespace-nowrap">
                TRACY
            </div>
        </div>
    );
};

export default ContactPage;
