import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechnicalSkills from './components/TechnicalSkills';
import Services from './components/Services';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certificates from './components/Certificates';
import SoftSkills from './components/SoftSkills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EmailModal from './components/EmailModal';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <>
      <Preloader />
      <Navbar onEmailClick={() => setIsEmailOpen(true)} />
      <Hero onEmailClick={() => setIsEmailOpen(true)} />
      <About />
      <TechnicalSkills />
      <Services />
      <Projects />
      <Timeline />
      <Certificates />
      <SoftSkills />
      <Contact onEmailClick={() => setIsEmailOpen(true)} />
      <Footer onEmailClick={() => setIsEmailOpen(true)} />

      {/* Global Email Action Selection Pop-Up */}
      <EmailModal 
        isOpen={isEmailOpen} 
        onClose={() => setIsEmailOpen(false)} 
        onShowToast={handleShowToast} 
      />

      {/* Page-Wide Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 border border-green-500 text-white font-bold px-6 py-3 rounded-full shadow-2xl z-[999999] text-sm whitespace-nowrap"
          >
            Email copied successfully.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
