
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ENG' | 'ESP';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ENG: {
    // Navbar & Common
    role: "Software Engineer | Full Stack Developer",
    home: "Home",
    projects: "My Projects",
    about: "About",
    services: "Services",
    contact: "Contact Me",
    scrollDown: "Scroll Down",
    location: "TRACY MORIANO",
    heroLocation: "LIMA, PERÚ",
    backToHome: "Back to Home",
    viewCV: "View CV",

    // Hero
    basedIn: "Based in",
    specializing: "Specializing in",
    specialty: "Advanced Web Interfaces",

    // About
    philosophy: "Philosophy",
    about_intro: "Precision has defined my path in the world of technological development. I started solving complex problems, and today I create robust web solutions that drive business growth in production environments.",
    mindset_label: "THE MINDSET",
    mindset_text: "Solving with logic, precision, and a focus on results. Every technical decision must have a clear purpose and add value to the business.",
    goal_label: "THE GOAL",
    goal_text: "To design and develop professional websites that help companies look better, build trust, and grow.",
    location_label: "ENGINEER",
    role_label: "ROLE",
    fullstack_lead: "FULL-STACK LEAD",
    engineering_bg: "ENGINEERING",
    expertise_label: "TECHNOLOGIES",

    // Services
    services_intro: "I DESIGN AND DEVELOP PROFESSIONAL WEBSITES TAILORED FOR ALL TYPES OF BUSINESSES—FROM LOCAL SHOPS TO CORPORATE ENTITIES.",
    process_title: "My Creative Process",
    step1_num: "01", step1_title: "Discovery", step1_desc: "Understanding your business goals to define the ideal structure and hierarchy for your new website.",
    step2_num: "02", step2_title: "Strategy", step2_desc: "Planning the user experience (UX) and the most efficient technology to ensure your site is fast and scalable.",
    step3_num: "03", step3_title: "Execution", step3_desc: "Modern web development with high standards of design and security, optimized for all devices.",
    step4_num: "04", step4_title: "Launch", step4_desc: "Final optimizations, SEO settings, and publishing your site to start growing your company online.",

    // Projects
    selectedWorks: "Selected Works",
    project_desc: "TRANSFORMING COMPLEX LOGIC INTO HIGH-FIDELITY DIGITAL EXPERIENCES.",
    category_label: "WEBSITE",
    year_label: "YEAR",
    visitWeb: "Visit Web",
    web_corporativa: "Corporate Web",
    web_ecommerce: "E-commerce Web",
    landing_page: "Landing Page",
    catalogo_digital: "Digital Catalog",
    all_projects: "All",

    // Footer / Contact
    collaboration: "Collaboration",
    contact_h1: "Have an idea?",
    contact_h2: "Let's make it happen.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    designed_by: "Designed & Developed with Passion",
    copyright: "© 2025 Tracy Moriano"
  },
  ESP: {
    // Navbar & Common
    role: "Ingeniera de Software | Desarrolladora Full Stack",
    home: "Inicio",
    projects: "Mis Proyectos",
    about: "Sobre mí",
    services: "Servicios",
    contact: "Contáctame",
    scrollDown: "Deslizar",
    location: "TRACY MORIANO",
    heroLocation: "LIMA, PERÚ",
    backToHome: "Volver al Inicio",
    viewCV: "Ver CV",

    // Hero
    basedIn: "Ubicada en",
    specializing: "Especializada en",
    specialty: "Interfaces Web Avanzadas",

    // About
    philosophy: "Filosofía",
    about_intro: "La precisión ha marcado mi camino en el mundo del desarrollo tecnológico. Empecé resolviendo problemas complejos y hoy creo soluciones web robustas que impulsan negocios en entornos de producción.",
    mindset_label: "LA MENTALIDAD",
    mindset_text: "Resolver con lógica, precisión y enfoque en resultados. Cada decisión técnica debe tener un propósito claro y aportar valor al negocio.",
    goal_label: "EL OBJETIVO",
    goal_text: "Diseñar y desarrollar páginas web profesionales que ayuden a las empresas a verse mejor, generar confianza y crecer.",
    location_label: "INGENIERA",
    role_label: "ROL",
    fullstack_lead: "LÍDER FULL-STACK",
    engineering_bg: "INGENIERA",
    expertise_label: "TECNOLOGÍAS",

    // Services
    services_intro: "DISEÑO Y DESARROLLO PÁGINAS WEB PROFESIONALES A MEDIDA PARA TODO TIPO DE EMPRESAS, DESDE NEGOCIOS LOCALES HASTA CORPORACIONES.",
    process_title: "Mi Proceso Creativo",
    step1_num: "01", step1_title: "Descubrimiento", step1_desc: "Entender los objetivos de tu negocio para definir la estructura e jerarquía ideal de tu nueva página web.",
    step2_num: "02", step2_title: "Estrategia", step2_desc: "Planificación de la experiencia de usuario (UX) y la tecnología más eficiente para que tu sitio sea rápido y escalable.",
    step3_num: "03", step3_title: "Ejecución", step3_desc: "Desarrollo web moderno con altos estándares de diseño y seguridad, optimizado para todos los dispositivos.",
    step4_num: "04", step4_title: "Lanzamiento", step4_desc: "Optimizaciones finales, configuración de SEO y publicación de tu sitio para que tu empresa empiece a crecer online.",

    // Projects
    selectedWorks: "Proyectos Selectos",
    project_desc: "TRANSFORMANDO LÓGICA COMPLEJA EN EXPERIENCIAS DIGITALES DE ALTA FIDELIDAD.",
    category_label: "SITIO WEB",
    year_label: "AÑO",
    visitWeb: "Visitar Web",
    web_corporativa: "Web Corporativa",
    web_ecommerce: "Web E-commerce",
    landing_page: "Landing Page",
    catalogo_digital: "Catálogo Digital",
    all_projects: "Todos",

    // Footer / Contact
    collaboration: "Colaboración",
    contact_h1: "¿Tienes una idea?",
    contact_h2: "Hagámoslo realidad.",
    email: "Correo",
    linkedin: "LinkedIn",
    github: "GitHub",
    designed_by: "Diseñado y Desarrollado con Pasión",
    copyright: "© 2025 Tracy Moriano"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ENG';
    
    // Get the browser language (navigator.language)
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    
    // Default to ESP if Spanish, otherwise ENG
    if (browserLang.toLowerCase().startsWith('es')) {
      return 'ESP';
    }
    return 'ENG';
  });

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
};
