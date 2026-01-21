
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
    projects: "Projects",
    about: "About",
    services: "Services",
    contact: "Contact",
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
    about_intro: "Architecture is defined by precision in every interaction. As a full-stack developer, I transform complex logic into robust web applications that perform at a high level in production environments.",
    mindset_label: "THE MINDSET",
    mindset_text: "Focused on scalable architectures and seamless interfaces. I bridge the gap between design vision and technical reality.",
    goal_label: "THE GOAL",
    goal_text: "Creating software that feels invisible. When code is truly great, the user only feels the experience.",
    location_label: "ENGINEER",
    role_label: "ROLE",
    fullstack_lead: "FULL-STACK LEAD",
    engineering_bg: "ENGINEERING",

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
    projects: "Proyectos",
    about: "Sobre mí",
    services: "Servicios",
    contact: "Contacto",
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
    about_intro: "La arquitectura se define por la precisión en cada interacción. Como Desarrolladora Full Stack, transformo lógica compleja en aplicaciones web robustas que funcionan con alto rendimiento en entornos de producción.",
    mindset_label: "LA MENTALIDAD",
    mindset_text: "Enfocada en arquitecturas escalables e interfaces perfectas. Cierro la brecha entre la visión de diseño y la realidad técnica.",
    goal_label: "EL OBJETIVO",
    goal_text: "Crear software que se sienta invisible. Cuando el código es realmente excelente, el usuario solo siente la experiencia.",
    location_label: "INGENIERA",
    role_label: "ROL",
    fullstack_lead: "LÍDER FULL-STACK",
    engineering_bg: "INGENIERA",

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
  const [lang, setLang] = useState<Language>('ENG');

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
