import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroImage from '../assets/hero/profileImg.jpeg';
import { heroContent, personalInfo, socialLinks, heroHighlights, coreTechnologies } from '../data/portfolioData';

const Hero = ({ onEmailClick }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Parallax offsets
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Parallax mouse effect handler
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      setOffsetX(x * -10);
      setOffsetY(y * -10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  // Background Particles effect (HTML5 Canvas)
  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(255, 42, 42, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    const drawLine = (p1, p2, distance) => {
      const opacity = (1 - distance / 120) * 0.15;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, idx) => {
        p.update();
        p.draw();
        
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            drawLine(p, p2, dist);
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-between"
    >
      {/* Background Canvas Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Left Floating Social Bar for Large Screens */}
      <div className="hidden lg:flex flex-col gap-6 fixed left-6 top-1/2 -translate-y-1/2 z-50 mix-blend-difference">
        <a 
          href={socialLinks.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-125"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        <a 
          href={socialLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-125"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <button 
          onClick={onEmailClick} 
          className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-125 cursor-pointer outline-none border-none bg-transparent p-0"
          aria-label="Email"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 px-6 pt-32 pb-16 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center text-left w-full flex-1 gap-12 lg:gap-20">
        
        {/* Left Column: Name, Stack and Buttons */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full lg:flex-1 order-2 lg:order-1">
          {/* Mobile socials */}
          <div 
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex items-center gap-4 mb-4 lg:hidden"
          >
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <button onClick={onEmailClick} className="text-white/60 hover:text-white cursor-pointer outline-none border-none bg-transparent p-0" aria-label="Email">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </button>
          </div>

          {/* Title and Subtitle */}
          <h1 
            data-aos="fade-up"
            className="text-white text-4xl md:text-6xl font-black mb-1 tracking-tight leading-tight"
          >
            {personalInfo.title}
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-[#ff2a2a] text-lg md:text-2xl font-bold mb-6 tracking-wide"
          >
            {personalInfo.subtitleHighlight}
          </p>

          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white/80 text-sm md:text-base font-semibold mb-8 max-w-xl leading-relaxed"
          >
            {heroContent.subtitle}
          </p>

          {/* Featured Technologies Section */}
          <div 
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-wrap items-center gap-3 mb-8 w-full"
          >
            <span className="text-white/40 text-[10px] font-mono font-bold tracking-widest uppercase mr-2">Featured:</span>
            {coreTechnologies.map((tech) => (
              <span 
                key={tech.name} 
                className="flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/10 text-white/80 text-xs font-semibold rounded-full transition-all duration-300 cursor-default"
              >
                <img src={tech.icon} alt={tech.name} className="w-4 h-4 object-contain" />
                <span>{tech.name}</span>
              </span>
            ))}
          </div>

          {/* Left CTAs */}
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-3 w-full"
          >
            <a 
              href={heroContent.ctaPrimary.href}
              onClick={(e) => handleScrollToSection(e, heroContent.ctaPrimary.href)}
              className="px-6 py-3 text-xs md:text-sm rounded-full bg-[#ff2a2a] text-white font-bold hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,42,42,0.4)] transition-all duration-300 transform hover:scale-105"
            >
              {heroContent.ctaPrimary.text}
            </a>

            <a 
              href={heroContent.ctaResume.href}
              download
              className="px-6 py-3 text-xs md:text-sm rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {heroContent.ctaResume.text}
            </a>
            
            <a 
              href={heroContent.ctaSecondary.href}
              onClick={(e) => handleScrollToSection(e, heroContent.ctaSecondary.href)}
              className="px-6 py-3 text-xs md:text-sm rounded-full bg-black/40 border border-white/20 text-white font-bold hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 backdrop-blur-md"
            >
              {heroContent.ctaSecondary.text}
            </a>
          </div>
        </div>

        {/* Right Column: Premium Circular Profile Image centerpiece */}
        <div 
          className="relative flex justify-center items-center order-1 lg:order-2 shrink-0 z-30 w-full lg:w-auto"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          {/* Parallax wrapper */}
          <div 
            style={{
              transform: reducedMotion ? 'none' : `translate(${offsetX}px, ${offsetY}px)`,
              transition: reducedMotion ? 'none' : 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            className="relative group"
          >
            {/* Soft radial cyan glow (blur 40px) behind the image (does not overlap the face, breathes 5s, brightens on hover) */}
            <motion.div
              animate={reducedMotion ? {} : {
                scale: [1, 1.15, 1],
                opacity: [0.65, 0.9, 0.65]
              }}
              transition={reducedMotion ? {} : {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-4 bg-cyan-500/20 group-hover:bg-cyan-500/35 rounded-full blur-[40px] z-0 pointer-events-none transition-colors duration-300"
            />

            {/* Soft radial blue glow (blur 20px) behind the image (does not overlap the face, breathes 5s, brightens on hover) */}
            <motion.div
              animate={reducedMotion ? {} : {
                scale: [1, 1.1, 1],
                opacity: [0.65, 0.9, 0.65]
              }}
              transition={reducedMotion ? {} : {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-2 bg-blue-600/30 group-hover:bg-blue-600/45 rounded-full blur-[20px] z-0 pointer-events-none transition-colors duration-300"
            />

            {/* Breathing/Floating Animation wrapper (matches 2-3px movement) */}
            <motion.div
              animate={reducedMotion ? {} : {
                y: [0, -3, 0],
              }}
              transition={reducedMotion ? {} : {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: reducedMotion ? 1 : 1.02,
              }}
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] rounded-full p-[4px] bg-gradient-to-tr from-blue-600 via-cyan-500 to-blue-400 shadow-[0_20px_50px_rgba(0,0,0,0.55)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.25)] transition-all duration-500"
            >
              {/* Glass Ring (1px border, backdrop blur, white at 8-12% opacity) */}
              <div className="w-full h-full rounded-full border border-white/10 bg-white/10 backdrop-blur-sm overflow-hidden relative flex items-center justify-center p-2">
                
                {/* The actual image circular cropped with inner shadow */}
                <div className="w-full h-full rounded-full overflow-hidden border border-white/20 bg-gray-900 shadow-inner">
                  <img 
                    src={heroImage} 
                    alt="Kandula Mohana Varsha Sri — Software Engineer" 
                    className="w-full h-full object-cover object-top select-none scale-102"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Highlights metrics bar strip */}
      <div 
        data-aos="fade-up"
        data-aos-delay="500"
        className="w-full bg-black/40 border-t border-white/10 backdrop-blur-md relative z-20 py-6 px-6 md:px-12 mt-auto"
      >
        <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-between items-center gap-6 md:gap-12">
          {heroHighlights.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start min-w-[120px]">
              <span className="text-[#ff2a2a] text-2xl md:text-4xl font-black tracking-tight leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-white/50 text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
