import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from './LanguageContext';

const ServicesPage: React.FC = () => {
    const { lang, t } = useLang();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobileMuted, setIsMobileMuted] = useState(true);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);

    const toggleMobileMute = () => {
        if (mobileVideoRef.current) {
            mobileVideoRef.current.muted = !mobileVideoRef.current.muted;
            setIsMobileMuted(mobileVideoRef.current.muted);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.from('.page-title', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out'
            });

            gsap.from('.service-row-item', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
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
            num: "01",
            category: "Websites",
            title: lang === 'ESP' ? "Páginas Web Profesionales" : "Professional Websites",
            desc: lang === 'ESP'
                ? "Diseño y desarrollo de sitios web corporativos y de aterrizaje (landing pages). Diseñados para captar clientes, transmitir credibilidad y posicionar tu negocio en el mercado."
                : "Design and development of corporate sites and landing pages. Built to attract customers, project credibility, and position your business in the market.",
            tags: ["HTML / CSS", "Tailwind", "Responsive", "SEO"]
        },
        {
            num: "02",
            category: "Full-Stack",
            title: lang === 'ESP' ? "Desarrollo Web Full Stack" : "Full Stack Web Development",
            desc: lang === 'ESP'
                ? "Plataformas web autoadministrables y dinámicas. Construcción de sistemas completos conectando paneles administrativos con bases de datos estables y seguras."
                : "Dynamic, self-managed web platforms. Engineering complete end-to-end systems linking admin dashboards with stable and secure databases.",
            tags: ["React / Next.js", "Node.js", "Databases", "Auth"]
        },
        {
            num: "03",
            category: "Frontend",
            title: lang === 'ESP' ? "Desarrollo Frontend" : "Frontend Development",
            desc: lang === 'ESP'
                ? "Interfaces modernas, interactivas y veloces. Maquetación limpia a partir de diseños de Figma con animaciones fluidas y excelente experiencia de usuario."
                : "Modern, interactive, and ultra-fast user interfaces. Translating Figma wireframes into clean, semantic code with fluid animations and responsive layouts.",
            tags: ["TypeScript", "GSAP", "React", "CSS Animation"]
        },
        {
            num: "04",
            category: "Backend",
            title: lang === 'ESP' ? "Desarrollo Backend" : "Backend Development",
            desc: lang === 'ESP'
                ? "Arquitectura y lógica de servidores sólida. Creación de servidores óptimos, estructuración de bases de datos relacionales y optimización de consultas."
                : "Robust server logic and architectures. Creating optimized servers, structuring database queries, and securing business rules.",
            tags: ["Express / NestJS", "PostgreSQL", "SQL Server", "Security"]
        },
        {
            num: "05",
            category: "Mobile",
            title: lang === 'ESP' ? "Aplicaciones Móviles" : "Mobile Applications",
            desc: lang === 'ESP'
                ? "Desarrollo de aplicaciones híbridas y nativas para iOS y Android. Experiencias móviles enfocadas en rendimiento y preparadas para las tiendas de apps."
                : "Developing hybrid and native mobile apps for iOS & Android. Mobile experiences optimized for performance and ready for the App / Play stores.",
            tags: ["React Native", "Expo", "App Store / Play Store"]
        },
        {
            num: "06",
            category: "AI Agents",
            title: lang === 'ESP' ? "Chatbots Inteligentes" : "Intelligent Chatbots",
            desc: lang === 'ESP'
                ? "Asistentes de conversación autónomos. Integración de flujos inteligentes en web y WhatsApp para responder consultas, calificar prospectos y guiar ventas 24/7."
                : "Autonomous conversational assistants. Integrating smart conversational flows into webs and WhatsApp to answer FAQs and capture leads 24/7.",
            tags: ["NLP Flow", "WhatsApp API", "AI Chat", "Autopilot"]
        },
        {
            num: "07",
            category: "Integrations",
            title: lang === 'ESP' ? "Integración de APIs" : "API Integration",
            desc: lang === 'ESP'
                ? "Conexión fluida de sistemas y plataformas. Integración de pasarelas de pago, facturación electrónica, sistemas CRM, ERPs y herramientas externas."
                : "Seamless integration between different systems and platforms. Hooking up payment gateways, invoicing systems, CRMs, ERPs, and external tools.",
            tags: ["Stripe / PayPal", "Webhooks", "REST APIs", "OAuth"]
        },
        {
            num: "08",
            category: "AI Workflows",
            title: lang === 'ESP' ? "Automatización con IA" : "AI Automation",
            desc: lang === 'ESP'
                ? "Integración de modelos de IA avanzados para automatizar procesos manuales repetitivos, optimizando el tiempo y reduciendo errores operativos."
                : "Integrating advanced AI models to automate tedious, repetitive tasks, freeing up human time and minimizing operational mistakes.",
            tags: ["OpenAI API", "LangChain", "n8n / Zapier", "Agentic Flow"]
        },
        {
            num: "09",
            category: "Design",
            title: lang === 'ESP' ? "Diseño UI/UX" : "UI/UX Design",
            desc: lang === 'ESP'
                ? "Investigación y maquetación visual centrada en el usuario. Creación de flujos de interacción, wireframes e interfaces de alta conversión."
                : "User-centered design planning and prototyping. Designing user flows, interactive wireframes, and layouts optimized for conversion.",
            tags: ["Figma", "UI Design", "Prototyping", "User Flows"]
        },
        {
            num: "10",
            category: "Maintenance",
            title: lang === 'ESP' ? "Optimización de Software" : "Software Optimization",
            desc: lang === 'ESP'
                ? "Mejora del rendimiento general de tu software. Corrección de errores, optimización de velocidad de carga, auditoría SEO y actualización del stack tecnológico."
                : "Tuning software performance and reliability. Fixing bugs, optimizing page speed, conducting SEO audits, and upgrading library stacks.",
            tags: ["Core Web Vitals", "Debugging", "SEO Audit", "Refactoring"]
        },
        {
            num: "11",
            category: "Consulting",
            title: lang === 'ESP' ? "Consultoría Tecnológica" : "Tech Consulting",
            desc: lang === 'ESP'
                ? "Asesoramiento técnico y estratégico. Definición del stack tecnológico óptimo, viabilidad de software y planeación de arquitectura escalable."
                : "Strategic technical advisory. Defining the optimal technology stack, analyzing software feasibility, and planning scalable architectures.",
            tags: ["Feasibility", "Tech Stack Decision", "Scale Plan"]
        },
        {
            num: "12",
            category: "DevOps",
            title: lang === 'ESP' ? "Despliegue y Configuración" : "Project Deployment",
            desc: lang === 'ESP'
                ? "Puesta en producción segura de tus sistemas. Configuración de servidores en la nube, dominios, certificados SSL y flujos de integración continua (CI/CD)."
                : "Safely launching systems to production. Setting up cloud servers, custom domains, SSL certificates, and continuous deployment workflows.",
            tags: ["Vercel / Netlify", "AWS / Docker", "SSL / DNS", "CI / CD"]
        }
    ];

    const steps = [
        {
            num: "01",
            title: lang === 'ESP' ? "Planificación Estratégica" : "Strategic Planning",
            desc: lang === 'ESP'
                ? "Definición conjunta del alcance, selección de tecnologías adecuadas y creación del mapa del sitio para asentar bases sólidas."
                : "Collaboratively defining project scope, selecting the ideal tech stack, and mapping the site structure for a solid foundation."
        },
        {
            num: "02",
            title: lang === 'ESP' ? "Diseño UI/UX Interactivo" : "Interactive UI/UX Design",
            desc: lang === 'ESP'
                ? "Maquetación visual moderna orientada a la experiencia del usuario y conversión, creando prototipos interactivos en Figma."
                : "Modern visual layouts geared towards user experience and conversion, creating high-fidelity interactive wireframes in Figma."
        },
        {
            num: "03",
            title: lang === 'ESP' ? "Desarrollo y Pruebas" : "Engineering & Testing",
            desc: lang === 'ESP'
                ? "Escritura de código limpio, modular y optimizado en SEO, aplicando pruebas de control de calidad y garantizando adaptabilidad en pantallas."
                : "Writing clean, modular, and SEO-optimized code, conducting quality control tests, and ensuring responsiveness across all devices."
        },
        {
            num: "04",
            title: lang === 'ESP' ? "Despliegue y Monitoreo" : "Deployment & Launch",
            desc: lang === 'ESP'
                ? "Configuración de dominios, hosting, certificados de seguridad SSL y monitoreo inicial para un lanzamiento impecable a producción."
                : "Configuring server hosting, custom domains, security SSL certificates, and initial telemetry logs for a flawless production launch."
        }
    ];

    const trustItems = [
        {
            t: lang === 'ESP' ? "Ingeniería de Alta Precisión" : "High-Precision Engineering",
            d: lang === 'ESP'
                ? "Escribo código limpio, seguro y testeado siguiendo estándares modernos de la industria, garantizando una base escalable para tu producto."
                : "I write clean, secure, and tested code following modern industry standards, ensuring a scalable foundation for your digital product."
        },
        {
            t: lang === 'ESP' ? "Tecnología y Automatización con IA" : "Tech & AI Automation",
            d: lang === 'ESP'
                ? "Integro automatizaciones con inteligencia artificial y flujos autónomos para simplificar procesos y mantener tu negocio un paso adelante."
                : "I integrate artificial intelligence automation and autonomous flows to simplify processes and keep your business one step ahead."
        },
        {
            t: lang === 'ESP' ? "Enfoque en Negocio y Conversión" : "Business & Conversion Focus",
            d: lang === 'ESP'
                ? "No solo programo interfaces; diseño y desarrollo soluciones tecnológicas pensadas para mejorar tus métricas de conversión y optimizar costos."
                : "I don't just build interfaces; I design and develop technological solutions engineered to drive conversions and optimize operational costs."
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <header className="mb-20">
                    <Link to="/" className="inline-flex md:hidden items-center gap-2 mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-8 group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        {t('backToHome')}
                    </Link>

                    <h1 className="page-title heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-6">
                        {t('services')}
                    </h1>
                    <p className="max-w-xl text-white/40 mono text-xs md:text-sm uppercase tracking-[0.25em] leading-[1.8]">
                        {t('services_intro')}
                    </p>
                </header>

                {/* Typographic Interactive List of Services */}
                <div className="w-full border-t border-white/10 mt-16 mb-40 flex flex-col">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-row-item w-full border-b border-white/10 py-6 md:py-8 lg:py-10 flex flex-col group cursor-pointer hover:border-white transition-colors duration-500"
                        >
                            {/* Static view */}
                            <div className="flex items-center justify-between gap-6 w-full">
                                <div className="flex items-center">
                                    <span className="mono text-xs opacity-30 tracking-widest">{service.num}</span>
                                    <h3 className="heading text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight ml-6 md:ml-10 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-500">
                                        {service.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="hidden md:inline-block mono text-[9px] uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full text-white/40 group-hover:text-white group-hover:border-white transition-all duration-500">
                                        {service.category}
                                    </span>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 group-hover:border-white flex items-center justify-center transition-colors duration-500">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-transform duration-500 group-hover:rotate-45">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Reveal content */}
                            <div className="max-h-0 overflow-hidden group-hover:max-h-[300px] transition-all duration-700 ease-in-out pl-8 md:pl-16">
                                <div className="pt-6 pb-2 flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                                        {service.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 lg:max-w-xs justify-start lg:justify-end">
                                        {service.tags.map((tag, idx) => (
                                            <span key={idx} className="mono text-[8px] md:text-[9px] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/50 whitespace-nowrap">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile-Only Video: Positioned directly after the 12 services */}
                <div className="block lg:hidden w-full mb-32">
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-black border border-white/20 group/video-mobile">
                        <video
                            ref={mobileVideoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/video-mobile:opacity-100 transition-opacity duration-1000"
                        >
                            <source src="/tracyvideo.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-10 left-10 z-10">
                        </div>

                        {/* Custom Speaker Toggle Button in top-right corner */}
                        <button
                            onClick={toggleMobileMute}
                            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 hover:border-white flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 interactive"
                            aria-label={isMobileMuted ? "Unmute video" : "Mute video"}
                        >
                            {isMobileMuted ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                    <path d="M9 9v6a3 3 0 0 0 3 3h1.586l4.707 4.707A1 1 0 0 0 20 22V4a1 1 0 0 0-1.707-.707L13.586 8H12a3 3 0 0 0-3 3z"></path>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Process Section */}
                <section className="process-section mb-40 border-t border-white/5 pt-12">
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
                            {lang === 'ESP' ? "Ingeniería Web Enfocada en Resultados." : "Web Engineering Focused on Results."}
                        </h3>
                        <div className="space-y-8">
                            {trustItems.map((item, i) => (
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
                    <div className="hidden lg:block relative aspect-square overflow-hidden rounded-sm bg-black border border-white/20 group/video">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity duration-1000"
                        >
                            <source src="/tracyvideo.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-10 left-10 z-10">
                        </div>

                        {/* Custom Speaker Toggle Button in top-right corner */}
                        <button
                            onClick={toggleMute}
                            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 hover:border-white flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 interactive"
                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                        >
                            {isMuted ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                    <path d="M9 9v6a3 3 0 0 0 3 3h1.586l4.707 4.707A1 1 0 0 0 20 22V4a1 1 0 0 0-1.707-.707L13.586 8H12a3 3 0 0 0-3 3z"></path>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-32 py-16 px-6 md:p-24 bg-white/5 rounded-sm border border-white/10 text-center relative overflow-hidden group/cta">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/cta:translate-y-0 transition-transform duration-700 ease-expo"></div>
                    <div className="relative z-10">
                        <h2 className="heading text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover/cta:text-black transition-colors duration-500">
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
