import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Certificate image imports
import cloudCert from '../assets/certificates/cloud.jpg';
import elevateCert from '../assets/certificates/elevateLabs.jpeg';
import infosysCert from '../assets/certificates/infosys.jpeg';

const certificateData = [
  {
    id: 'cloud',
    title: 'Cloud Computing Certification (95%)',
    issuer: 'NPTEL / SWAYAM',
    date: 'Nov 2025',
    image: cloudCert,
    pdf: null,
    relevance: 1 // Cloud Computing
  },
  {
    id: 'infosys',
    title: 'Infosys Springboard Virtual Intern – Java Backend Development',
    issuer: 'Infosys',
    date: 'Dec 2025',
    image: infosysCert,
    pdf: '/certificates/infosys.pdf', // PDF version copied from desktop
    relevance: 2 // Java / Spring Boot / Backend
  },
  {
    id: 'elevate',
    title: 'Elevate Labs – Java Developer Internship',
    issuer: 'Elevate Labs',
    date: 'Jul 2025',
    image: elevateCert,
    pdf: null,
    relevance: 3 // Backend / Java
  }
];

const CertificateCard = ({ cert, onViewImage, index }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 hover:border-red-500/30 hover:shadow-[0_20px_50px_rgba(255,42,42,0.08)] transition-all duration-500 flex flex-col justify-between group h-full"
  >
    <div>
      {/* Preview Image Container */}
      <div 
        onClick={() => onViewImage(cert.image)}
        className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-white/5 mb-6 relative cursor-zoom-in group-hover:border-white/20 transition-colors"
      >
        <img 
          src={cert.image} 
          alt={`${cert.title} preview`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover zoom overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>

      <div className="px-1">
        <span className="text-[10px] font-mono font-bold text-red-400 tracking-wider uppercase block mb-1">
          {cert.issuer}
        </span>
        <h3 className="text-white text-lg font-black tracking-tight leading-snug mb-2 group-hover:text-red-400 transition-colors">
          {cert.title}
        </h3>
        <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-6">
          Completed: {cert.date}
        </p>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5 w-full">
      <button 
        onClick={() => onViewImage(cert.image)}
        className="flex-1 min-w-[120px] py-2 px-4 text-center rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
      >
        View Certificate
      </button>

      {cert.pdf && (
        <a 
          href={cert.pdf}
          download
          className="flex-1 min-w-[120px] py-2 px-4 text-center rounded-full bg-[#ff2a2a] text-white text-xs font-bold hover:bg-red-600 hover:shadow-[0_0_15px_rgba(255,42,42,0.3)] transition-all duration-300"
        >
          Download PDF
        </a>
      )}
    </div>
  </div>
);

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="certifications" className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">
      
      {/* Section Background Red Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Certifications
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Industry-recognized credentials validating my software engineering and cloud capability.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificateData.map((cert, index) => (
            <CertificateCard 
              key={cert.id}
              cert={cert}
              onViewImage={setSelectedImage}
              index={index}
            />
          ))}
        </div>

      </div>

      {/* Lightbox Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200000] flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/10 bg-gray-950 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 text-white border border-white/10 hover:bg-white hover:text-black transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <img 
                src={selectedImage} 
                alt="Full certificate preview" 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
