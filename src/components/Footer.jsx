import React from 'react';
import { personalInfo, socialLinks, footerContent } from '../data/portfolioData';

const Footer = ({ onEmailClick }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0b0b0b] text-white/50 py-12 px-6 md:px-12 w-full border-t border-white/5 relative z-20 font-sans">
      {/* Subtle background red glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 w-full relative z-10">
        {/* Left Side: Copyright */}
        <div className="text-xs md:text-sm font-medium tracking-wide text-white/40">
          {footerContent.copyright}
        </div>

        {/* Center: Social Links & Email */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button 
            onClick={onEmailClick} 
            className="text-xs md:text-sm hover:text-white transition-colors duration-300 font-bold flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none p-0"
            aria-label="Email"
          >
            <svg className="w-4 h-4 text-[#ff2a2a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {personalInfo.emails.primary}
          </button>
          
          <span className="hidden sm:inline-block w-1.5 h-1.5 bg-white/10 rounded-full" />

          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a 
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Back to Top */}
        <div>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs md:text-sm font-bold hover:text-white transition-colors duration-300 group cursor-pointer text-white/60"
          >
            Back to Top
            <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
