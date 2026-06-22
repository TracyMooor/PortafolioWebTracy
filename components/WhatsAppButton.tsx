import React, { useState } from 'react';
import { useLang } from './LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { lang } = useLang();
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = lang === 'ESP'
    ? "https://wa.me/51906936891?text=Hola%20Tracy,%20acabo%20de%20ver%20tu%20portafolio%20y%20me%20interesa%20lo%20que%20haces.%20%C2%BFPodemos%20coordinar%20una%20reuni%C3%B3n%20para%20hablar%20sobre%20un%20proyecto%3F"
    : "https://wa.me/51906936891?text=Hi%20Tracy,%20I%20just%20saw%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20schedule%20a%20meeting%20to%20talk%20about%20a%20project%3F";

  const tooltipText = lang === 'ESP' ? '¡Hablemos por WhatsApp!' : "Let's chat on WhatsApp!";

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 select-none pointer-events-auto">
      {/* Tooltip (visible instantly on desktop when hovered) */}
      <div 
        className={`hidden sm:block px-4 py-2 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 text-white text-xs mono uppercase tracking-wider pointer-events-none whitespace-nowrap shadow-lg shadow-black/40
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        {tooltipText}
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/20 hover:bg-[#128C7E]"
        aria-label="WhatsApp"
      >
        {/* WhatsApp Icon (SVG) */}
        <svg 
          className="w-7 h-7 fill-current text-white relative z-10" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.301-.15-1.781-.88-2.057-.981-.275-.1-.476-.15-.677.15-.201.3-.777 1.006-.95 1.201-.173.196-.347.221-.647.071-.301-.15-1.272-.47-2.422-1.496-.894-.798-1.498-1.783-1.674-2.083-.176-.3-.019-.462.131-.611.135-.134.301-.351.451-.526.151-.175.201-.301.301-.501.1-.2.05-.375-.025-.525-.075-.15-.677-1.636-.927-2.236-.244-.587-.592-.507-.677-.516-.174-.008-.374-.01-.574-.01s-.526.075-.801.375c-.275.3-1.05 1.026-1.05 2.501 0 1.475 1.076 2.901 1.226 3.101.15.2 2.113 3.221 5.118 4.522.715.31 1.274.495 1.708.633.718.228 1.37.195 1.886.118.575-.086 1.781-.727 2.031-1.427.25-.7.25-1.301.176-1.426-.075-.125-.275-.201-.576-.351zM12.004 2c-5.518 0-10 4.482-10 10 0 1.765.459 3.421 1.264 4.861L2 22l5.285-1.387c1.403.766 2.997 1.202 4.693 1.202 5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18.25c-1.611 0-3.118-.445-4.406-1.218l-.316-.188-3.279.86.874-3.195-.207-.329c-.711-1.129-1.116-2.47-1.116-3.904 0-4.004 3.246-7.25 7.25-7.25s7.25 3.246 7.25 7.25-3.246 7.25-7.25 7.25z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
