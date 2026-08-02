import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, socialLinks, developerMetrics } from '../data/portfolioData';

// Dynamically import all project images in the assets folder
const projectImages = import.meta.glob('../assets/projects/**/*.{jpeg,jpg,png}', { eager: true, import: 'default' });

const getProjectImages = (projectId) => {
  const images = [];
  Object.keys(projectImages).forEach((key) => {
    const pathParts = key.split('/');
    if (pathParts.includes(projectId)) {
      images.push({
        path: key,
        url: projectImages[key]
      });
    }
  });

  // Sort images numerically by filename index (e.g. imag1, imag2...)
  images.sort((a, b) => {
    const extractNum = (path) => {
      const match = path.match(/imag(\d+)\.(jpeg|jpg|png)$/i);
      return match ? parseInt(match[1], 10) : 999;
    };
    return extractNum(a.path) - extractNum(b.path);
  });

  return images.map(img => img.url);
};

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ProjectCard = ({ project, index, onOpenLightbox }) => {
  const images = getProjectImages(project.id);
  const hasImages = images.length > 0;
  const [activeHero, setActiveHero] = useState(hasImages ? images[0] : null);

  // Set up active thumbnail transition state
  const handleThumbnailClick = (img) => {
    setActiveHero(img);
  };

  const handleHeroClick = () => {
    if (!hasImages) return;
    const activeIdx = images.indexOf(activeHero);
    onOpenLightbox(images, activeIdx !== -1 ? activeIdx : 0);
  };

  // Thumbnail list logic: up to 4 items max. If more exist, 4th item gets "+N More" overlay.
  const renderThumbnails = (isMobile) => {
    if (!hasImages || images.length === 1) return null;

    const showMore = images.length > 5; // 1 hero + 4 regular thumbs. If length > 5, 4th thumb is "+N More"
    
    // We slice regular thumbs starting from index 1.
    // If showMore is true, we display 3 normal thumbs, and the 4th with an overlay.
    const thumbsToRender = showMore ? images.slice(1, 4) : images.slice(1);
    
    return (
      <div className={`flex flex-wrap gap-3 mt-4 ${isMobile ? 'justify-start' : ''}`}>
        {/* Main Hero Thumbnail */}
        <button 
          onClick={() => handleThumbnailClick(images[0])}
          className={`w-16 h-10 md:w-24 md:h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${
            activeHero === images[0] ? 'border-[#ff2a2a] scale-105 shadow-[0_0_12px_rgba(255,42,42,0.3)]' : 'border-white/10 hover:border-white/30'
          }`}
        >
          <img src={images[0]} alt="Hero preview" className="w-full h-full object-cover" loading="lazy" />
        </button>

        {/* Regular Thumbnails */}
        {thumbsToRender.map((thumb, idx) => (
          <button 
            key={idx}
            onClick={() => handleThumbnailClick(thumb)}
            className={`w-16 h-10 md:w-24 md:h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${
              activeHero === thumb ? 'border-[#ff2a2a] scale-105 shadow-[0_0_12px_rgba(255,42,42,0.3)]' : 'border-white/10 hover:border-white/30'
            }`}
          >
            <img src={thumb} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}

        {/* More Overlay Thumbnail */}
        {showMore && (
          <button 
            onClick={() => onOpenLightbox(images, 4)}
            className="w-16 h-10 md:w-24 md:h-14 rounded-xl overflow-hidden border-2 border-white/10 hover:border-[#ff2a2a] transition-all duration-300 relative group cursor-pointer"
          >
            <img src={images[4]} alt="More previews" className="w-full h-full object-cover brightness-[0.3]" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs md:text-sm font-black tracking-tighter">
              +{images.length - 4} More
            </div>
          </button>
        )}
      </div>
    );
  };

  return (
    <div 
      className="bg-[#111111]/85 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-red-500/20 hover:shadow-[0_20px_50px_rgba(255,42,42,0.05)] transition-all duration-500 w-full"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className={`flex flex-col lg:grid ${hasImages ? 'lg:grid-cols-12' : 'grid-cols-1'} gap-8 lg:gap-12 items-center`}>
        
        {/* Mobile-Only Hero: Top-level visual */}
        {hasImages && (
          <div className="w-full block lg:hidden order-1">
            <div 
              onClick={handleHeroClick}
              className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-950 border border-white/10 shadow-2xl relative cursor-zoom-in group"
            >
              <img 
                src={activeHero} 
                alt={`${project.title} hero`} 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        )}

        {/* Left Side: Details (lg:col-span-5 on desktop, order-2 on mobile) */}
        <div className={`w-full order-2 lg:order-none ${hasImages ? 'lg:col-span-5' : ''}`}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-5xl font-black text-white/10 font-serif italic leading-none">{project.number}</span>
            <span className="bg-red-500/10 text-[#ff2a2a] text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-red-500/25">
              {project.type}
            </span>
            {project.badge && (
              <span className="bg-white/5 text-white/70 text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-white/10">
                {project.badge}
              </span>
            )}
          </div>

          <h3 className="text-white text-2xl md:text-3xl font-black mb-4 tracking-tight">{project.title}</h3>

          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-[#ff2a2a] text-xs font-bold uppercase tracking-wider mb-1">Overview</h4>
              <p className="text-white/80 text-sm font-medium leading-relaxed">{project.overview}</p>
            </div>
            <div>
              <h4 className="text-[#ff2a2a] text-xs font-bold uppercase tracking-wider mb-1">The Problem</h4>
              <p className="text-white/60 text-sm font-medium leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h4 className="text-[#ff2a2a] text-xs font-bold uppercase tracking-wider mb-1">Our Approach & Architecture</h4>
              <p className="text-white/60 text-sm font-medium leading-relaxed">{project.approach}</p>
            </div>
            <div>
              <h4 className="text-[#ff2a2a] text-xs font-bold uppercase tracking-wider mb-1">Challenges & Resolution</h4>
              <p className="text-white/60 text-sm font-medium leading-relaxed">{project.challenges}</p>
            </div>
            <div>
              <h4 className="text-[#ff2a2a] text-xs font-bold uppercase tracking-wider mb-1">Key Outcomes</h4>
              <p className="text-[#ff2a2a]/90 text-sm font-semibold leading-relaxed">{project.outcomes}</p>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techTags.map((tag) => (
              <span 
                key={tag}
                className="px-2.5 py-1 text-[10px] md:text-xs font-bold text-white/60 bg-white/5 rounded-full border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.links.github && (
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs md:text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                <GitHubIcon />
                GitHub Code
              </a>
            )}
            {project.links.demo && (
              <a 
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff2a2a] text-white text-xs md:text-sm font-semibold hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,42,42,0.4)] transition-all duration-300"
              >
                <ExternalLinkIcon />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Desktop-Only Hero + Gallery (lg:col-span-7, hidden on mobile) */}
        {hasImages && (
          <div className="w-full lg:col-span-7 hidden lg:flex flex-col gap-4">
            {/* Desktop Hero Image Container */}
            <div 
              onClick={handleHeroClick}
              className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-950 border border-white/10 shadow-2xl relative cursor-zoom-in group flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeHero}
                  src={activeHero} 
                  alt={`${project.title} hero`} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-103"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Desktop Thumbnails */}
            {renderThumbnails(false)}
          </div>
        )}

        {/* Mobile-Only Thumbnails (order-3, hidden on desktop) */}
        {hasImages && (
          <div className="w-full block lg:hidden order-3">
            {renderThumbnails(true)}
          </div>
        )}

      </div>
    </div>
  );
};

const Projects = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    zoomScale: 1
  });

  // Touch Swipe Variables
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightbox(prev => ({ ...prev, isOpen: false, zoomScale: 1 }));
      } else if (e.key === 'ArrowRight') {
        setLightbox(prev => ({
          ...prev,
          currentIndex: (prev.currentIndex + 1) % prev.images.length,
          zoomScale: 1
        }));
      } else if (e.key === 'ArrowLeft') {
        setLightbox(prev => ({
          ...prev,
          currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
          zoomScale: 1
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, lightbox.images.length]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleOpenLightbox = (images, index) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: index,
      zoomScale: 1
    });
  };

  const handleCloseLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false, zoomScale: 1 }));
  };

  const handleNextImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
      zoomScale: 1
    }));
  };

  const handlePrevImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
      zoomScale: 1
    }));
  };

  const handleZoomIn = () => {
    setLightbox(prev => ({
      ...prev,
      zoomScale: Math.min(prev.zoomScale + 0.25, 3)
    }));
  };

  const handleZoomOut = () => {
    setLightbox(prev => ({
      ...prev,
      zoomScale: Math.max(prev.zoomScale - 0.25, 1)
    }));
  };

  // Mobile swipe gestures
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  return (
    <section id="projects" className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 max-w-2xl">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-8 shadow-sm bg-white/5 backdrop-blur-sm">
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            Work that Speaks <br className="hidden md:block" />for Itself
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg font-medium leading-relaxed">
            A selection of projects that showcase my expertise in full-stack development, modern databases, and clean architecture.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

        {/* Developer Metrics Card */}
        <div 
          data-aos="fade-up"
          className="mt-20 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff2a2a]/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-white text-lg font-black tracking-widest uppercase mb-8 border-b border-white/10 pb-3">
            📊 Developer Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">Public Repositories</span>
              <span className="text-white text-3xl font-black">{developerMetrics.publicRepos}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">Featured Repositories</span>
              <span className="text-white text-3xl font-black">{developerMetrics.featuredRepos}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">Primary Stack</span>
              <span className="text-white text-lg font-black leading-tight mt-1">{developerMetrics.primaryLanguages.join(" · ")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">Problem Solving</span>
              <span className="text-[#ff2a2a] text-lg font-black leading-tight mt-1">{developerMetrics.problemSolvingCount}</span>
            </div>
          </div>
        </div>

        {/* GitHub Explore CTA */}
        <div data-aos="fade-up" className="mt-16 flex justify-center">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-base hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 group"
          >
            <GitHubIcon />
            Explore All My Repositories
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-[#ff2a2a] text-white shadow-[0_0_20px_rgba(255,42,42,0.4)] hover:bg-red-600 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Back to Top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[300000] flex flex-col justify-between items-center py-6 px-4"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-7xl flex items-center justify-between z-50" onClick={(e) => e.stopPropagation()}>
              <span className="text-white/40 text-xs font-mono font-bold uppercase tracking-widest">
                Image {lightbox.currentIndex + 1} of {lightbox.images.length}
              </span>
              <div className="flex items-center gap-4">
                {/* Zoom Out */}
                <button
                  onClick={handleZoomOut}
                  disabled={lightbox.zoomScale === 1}
                  className="p-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Zoom Out"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                {/* Zoom In */}
                <button
                  onClick={handleZoomIn}
                  disabled={lightbox.zoomScale === 3}
                  className="p-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Zoom In"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
                {/* Close */}
                <button
                  onClick={handleCloseLightbox}
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Central Image Frame */}
            <div className="flex-1 w-full max-w-6xl flex items-center justify-center overflow-hidden relative">
              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-4 z-50 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-colors hidden md:block cursor-pointer"
                aria-label="Previous Image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Main Lightbox Image */}
              <motion.div
                key={lightbox.currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={lightbox.images[lightbox.currentIndex]}
                  alt={`Screenshot ${lightbox.currentIndex + 1}`}
                  style={{
                    transform: `scale(${lightbox.zoomScale})`,
                    transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className="max-w-full max-h-[75vh] object-contain select-none shadow-2xl border border-white/5 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-4 z-50 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-colors hidden md:block cursor-pointer"
                aria-label="Next Image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Bottom Swipe helper on mobile */}
            <div className="text-white/20 text-[10px] md:hidden font-mono tracking-widest uppercase select-none pb-4">
              Swipe Left/Right to Navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
