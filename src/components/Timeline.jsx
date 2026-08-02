import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { timelineEvents } from '../data/portfolioData';

// Custom SVG Icons for categories (using unified red theme)
const EducationIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

const ProjectIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const InternshipIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const CertificationIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const CareerIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5"/>
    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.5.5 3 1.5 4.5L12 8l8 8.5c1-1.5 1.5-3 1.5-4.5 0-5.5-4.5-10-10-10z"/>
    <path d="M12 2s4 4 4 10H8c0-6 4-10 4-10z"/>
  </svg>
);

const CategoryIcon = ({ type }) => {
  switch (type) {
    case 'Education': return <EducationIcon />;
    case 'Project': return <ProjectIcon />;
    case 'Internship': return <InternshipIcon />;
    case 'Certification': return <CertificationIcon />;
    case 'Career': return <CareerIcon />;
    default:
      return (
        <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const TimelineItem = ({ item, index, reducedMotion }) => {
  const isEven = index % 2 === 0;

  // Determine badge colors based on category type (unified red theme)
  const getBadgeStyles = () => {
    return 'bg-red-50 text-red-600 border-red-100';
  };

  // Card slide animation variant config
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: reducedMotion ? 0 : (isEven ? -60 : 60),
      y: reducedMotion ? 30 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 0.6,
      }
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-20 w-full group">
      
      {/* Central dot icon container with pulsing indicator */}
      <div className="absolute left-1 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center z-30 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(255,42,42,0.2)] transition-all duration-300">
        {/* Pulsing indicator loop */}
        <span className="absolute inset-0 rounded-full border border-red-500/30 animate-ping opacity-45 pointer-events-none" />
        <CategoryIcon type={item.type} />
      </div>

      {/* Card Content block */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        className={`w-full md:w-[45%] pl-14 md:pl-0 ${
          isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-3'
        }`}
      >
        <div className="bg-white border border-gray-100 hover:border-red-200 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(255,42,42,0.06)] hover:-translate-y-1 transition-all duration-500 relative group/card overflow-hidden">
          {/* Left glowing accent line indicator */}
          <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-[#ff2a2a] to-red-500/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className={`relative z-10 flex flex-wrap gap-2 items-center mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200/50 tracking-wider">
              {item.date}
            </span>
            <span className={`text-[9px] font-black tracking-widest uppercase py-0.5 px-2.5 rounded-full border ${getBadgeStyles(item.type)}`}>
              {item.badge}
            </span>
          </div>
          
          <h3 className="relative z-10 text-gray-900 text-lg md:text-xl font-bold mb-1 tracking-tight group-hover/card:text-red-500 transition-colors">
            {item.title}
          </h3>
          <p className="relative z-10 text-red-500/90 text-xs font-semibold font-mono tracking-wider uppercase mb-3">
            {item.subtitle}
          </p>
          <p className="relative z-10 text-gray-600 text-sm leading-relaxed font-medium whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Spacer block for desktop alignment */}
      <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-3' : 'md:order-1'}`} />
    </div>
  );
};

const Timeline = () => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    return typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  return (
    <section id="timeline" className="bg-[#f8f8f8] pt-28 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:80px_80px]">
      
      {/* Soft red glow shapes in background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/[0.015] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/[0.015] rounded-full blur-[120px] pointer-events-none" />

      {/* Tear wave border at top */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-10 transform -translate-y-[1px] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16 fill-[#000000]/5">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-24 text-center">
          <div className="inline-block border border-red-500/20 rounded-full px-5 py-1.5 text-xs text-red-500 font-bold mb-5 shadow-sm bg-red-500/5 backdrop-blur-sm tracking-wider uppercase">
            Career Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 uppercase">
            Career Journey
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            My journey as a Computer Science student and aspiring Software Engineer.
          </p>
        </div>
 
        {/* Timeline block */}
        <div className="relative w-full">
          {/* Vertical axis glowing light-beam line (fading smoothly at bottom) */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#ff2a2a] via-red-500/40 to-transparent opacity-60 shadow-[0_0_6px_rgba(255,42,42,0.2)]" />
 
          {/* Timeline Milestones list */}
          <div className="w-full">
            {timelineEvents.map((item, index) => (
              <TimelineItem 
                key={`${item.title}-${index}`} 
                item={item} 
                index={index} 
                reducedMotion={reducedMotion} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
