import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EmailModal = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const emailVal = "kandulamohana14@gmail.com";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailVal}`;

  const handleCopy = () => {
    // Robust clipboard copy fallback for insecure contexts/HTTP
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailVal);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = emailVal;
      textArea.style.position = "fixed"; // Prevent scroll jumps
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback Copy Error:', err);
      }
      document.body.removeChild(textArea);
    }
    onShowToast();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal content box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-[#111111]/95 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-[0_20px_50px_rgba(255,42,42,0.15)] text-center overflow-hidden"
        >
          {/* Decorative glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#ff2a2a]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#ff2a2a]/10 text-[#ff2a2a] border border-[#ff2a2a]/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h3 className="text-white text-2xl font-black mb-2 uppercase tracking-wide">Get in Touch</h3>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            How would you like to email <span className="text-white font-semibold">{emailVal}</span>?
          </p>

          <div className="flex flex-col gap-3">
            {/* Option 1: Copy Email */}
            <button
              onClick={handleCopy}
              className="w-full py-3 rounded-xl bg-[#ff2a2a] text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,42,42,0.3)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
              Copy Email Address
            </button>

            {/* Option 2: Open Gmail */}
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-1.29 1.454-2.032 2.514-1.222L12 11.364l9.487-7.129c1.059-.796 2.513-.07 2.513 1.222z"/>
              </svg>
              Open Gmail (Web)
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmailModal;
