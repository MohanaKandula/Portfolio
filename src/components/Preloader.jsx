import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(() => {
    return typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  });

  // Generate particle parameters once on initialization to maintain component purity
  const [particles] = useState(() => {
    return [...Array(12)].map((_, i) => ({
      left: `${(i * 8) + Math.random() * 6}%`,
      width: `${15 + Math.random() * 25}px`,
      height: `${15 + Math.random() * 25}px`,
      animationDuration: `${5 + Math.random() * 5}s`,
      animationDelay: `${Math.random() * 3}s`,
    }));
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Automatic timeout dismiss after 2.4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(timer);
    };
  }, []);

  const name = "Kandula Mohana Varsha Sri";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 w-full h-screen bg-[#ff2a2a] z-[100000] flex flex-col items-center justify-center overflow-hidden font-sans"
        >
          {/* Inject self-contained style rules for the floating white particle canvas */}
          <style>{`
            @keyframes preloader-float {
              0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
              50% { opacity: 0.35; }
              100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
            }
            .preloader-particle {
              position: absolute;
              bottom: 0;
              background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
              border-radius: 50%;
              pointer-events: none;
              animation: preloader-float infinite linear;
            }
          `}</style>

          {/* Gentle white particle background */}
          {!reducedMotion && particles.map((p, i) => (
            <div
              key={i}
              className="preloader-particle"
              style={{
                left: p.left,
                width: p.width,
                height: p.height,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay,
              }}
            />
          ))}

          {/* Soft background white blur glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.05] rounded-full blur-[80px] pointer-events-none z-0" />

          {/* Text Container with White Glassmorphism Card backing */}
          <div className="relative z-10 bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-6 shadow-2xl flex flex-col items-center">
            
            {/* Character-by-character text reveal */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight flex flex-wrap justify-center whitespace-nowrap">
              {name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.035 * index,
                    duration: 0.25,
                    ease: "easeOut"
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: reducedMotion ? 0 : 0.9,
                duration: 0.7,
                ease: "easeInOut"
              }}
              className="h-[2px] bg-white mt-4 shadow-[0_0_8px_rgba(255,255,255,0.4)] w-full"
            />

            {/* Role & Tech stack reveal */}
            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : 1.3,
                duration: 0.5,
                ease: "easeOut"
              }}
              className="mt-6 flex flex-col items-center"
            >
              <div className="text-xs md:text-sm font-semibold tracking-[0.25em] text-white uppercase mb-2">
                Software Engineer
              </div>
              <div className="text-[10px] md:text-xs font-semibold font-mono tracking-wider text-white/70 uppercase">
                Java • Spring Boot • React
              </div>
            </motion.div>
          </div>

          {/* Quick Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            onClick={() => setIsLoading(false)}
            className="absolute bottom-10 text-[10px] font-mono font-bold tracking-wider text-white/50 hover:text-white/80 border border-white/20 hover:border-white/40 rounded-full px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] cursor-pointer"
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
