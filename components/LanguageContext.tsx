
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
    role: "Software Engineer | Creative Coder",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    scrollDown: "Scroll Down",
    location: "Lima, Perú",
    
    // Hero
    basedIn: "Based in",
    specializing: "Specializing in",
    specialty: "Scalable Architecture",
    
    // About
    philosophy: "Philosophy",
    about_intro: "Architecture is not just about structure, it is about the poetry of precision. As a Software Engineer in Lima, Perú, I transform complex logic into fluid, high-end digital experiences that prioritize performance and aesthetic brutalism.",
    mindset_label: "THE MINDSET",
    mindset_text: "Focusing on scalable architectures and pixel-perfect interfaces. I bridge the gap between design vision and technical reality.",
    goal_label: "THE GOAL",
    goal_text: "Creating software that feels invisible. When code is truly great, the user only feels the experience.",
    location_label: "LOCATION",
    role_label: "ROLE",
    fullstack_lead: "FULL-STACK LEAD",
    engineering_bg: "ENGINEERING",
    
    // Tech Stack
    tech_stack: "Tech Stack",
    tech_stack_desc: "Merging structural engineering with high-fidelity visual performance.",
    cat_frontend: "Frontend Core",
    cat_logic: "Logic & State",
    cat_motion: "Motion Engine",
    cat_backend: "Server Side",
    cat_graphics: "Graphics",
    cat_3d: "3D Library",
    cat_styling: "Styling",
    cat_db: "Database",
    cat_framework: "Architecture",
    cat_interaction: "Interactive Motion",
    cat_shaders: "Low Level",
    cat_cloud: "Infrastructure",
    
    // Projects
    selectedWorks: "Selected Works",
    project_desc: "TRANSFORMING COMPLEX LOGIC INTO HIGH-FIDELITY DIGITAL EXPERIENCES.",
    category_label: "CATEGORY",
    year_label: "YEAR",
    
    // Footer / Contact
    collaboration: "Collaboration",
    contact_h1: "Have an idea?",
    contact_h2: "Let's build the",
    contact_h3: "future together.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    designed_by: "Designed & Developed with Passion",
    copyright: "© 2025 Tracy Moriano"
  },
  ESP: {
    // Navbar & Common
    role: "Ingeniera de Software | Creative Coder",
    projects: "Proyectos",
    about: "Sobre mí",
    contact: "Contacto",
    scrollDown: "Deslizar",
    location: "Lima, Perú",
    
    // Hero
    basedIn: "Ubicada en",
    specializing: "Especializada en",
    specialty: "Arquitectura Escalable",
    
    // About
    philosophy: "Filosofía",
    about_intro: "La arquitectura no se trata solo de estructura, se trata de la poesía de la precisión. Como Ingeniera de Software en Lima, Perú, transformo lógica compleja en experiencias digitales fluidas y de alto nivel que priorizan el rendimiento y el brutalismo estético.",
    mindset_label: "LA MENTALIDAD",
    mindset_text: "Enfocada en arquitecturas escalables e interfaces perfectas. Cierro la brecha entre la visión de diseño y la realidad técnica.",
    goal_label: "EL OBJETIVO",
    goal_text: "Crear software que se sienta invisible. Cuando el código es realmente excelente, el usuario solo siente la experiencia.",
    location_label: "UBICACIÓN",
    role_label: "ROL",
    fullstack_lead: "LÍDER FULL-STACK",
    engineering_bg: "INGENIERÍA",
    
    // Tech Stack
    tech_stack: "Tecnologías",
    tech_stack_desc: "Fusionando ingeniería estructural con rendimiento visual de alta fidelidad.",
    cat_frontend: "Núcleo Frontend",
    cat_logic: "Lógica y Estado",
    cat_motion: "Motor de Movimiento",
    cat_backend: "Lado del Servidor",
    cat_graphics: "Gráficos",
    cat_3d: "Librería 3D",
    cat_styling: "Estilos",
    cat_db: "Base de Datos",
    cat_framework: "Arquitectura",
    cat_interaction: "Movimiento Interactivo",
    cat_shaders: "Bajo Nivel",
    cat_cloud: "Infraestructura",
    
    // Projects
    selectedWorks: "Proyectos Selectos",
    project_desc: "TRANSFORMANDO LÓGICA COMPLEJA EN EXPERIENCIAS DIGITALES DE ALTA FIDELIDAD.",
    category_label: "CATEGORÍA",
    year_label: "AÑO",
    
    // Footer / Contact
    collaboration: "Colaboración",
    contact_h1: "¿Tienes una idea?",
    contact_h2: "Construyamos el",
    contact_h3: "futuro juntos.",
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
