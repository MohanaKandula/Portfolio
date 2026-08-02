import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emailjsConfig, personalInfo, socialLinks } from '../data/portfolioData';

const ContactCard = ({ icon, title, label, href, onClick, target, rel, reducedMotion, onCopy }) => {
  const CardWrapper = href ? 'a' : onClick ? 'button' : 'div';
  
  return (
    <motion.div
      whileHover={reducedMotion ? {} : { scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="w-full"
    >
      <CardWrapper
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(255,42,42,0.08)] group w-full text-left outline-none ${(href || onClick) ? 'cursor-pointer' : ''}`}
      >
        <div className="w-12 h-12 rounded-xl bg-[#ff2a2a]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ff2a2a]/20 transition-all duration-300 shrink-0">
          {icon}
        </div>
        <div className="overflow-hidden flex-1">
          <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-0.5">{title}</span>
          <span className="text-white text-sm font-semibold tracking-wide block truncate group-hover:text-red-400 transition-colors">
            {label}
          </span>
        </div>
        {title === "Email" && onCopy && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCopy(label);
            }}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/10 text-white border border-white/10 hover:bg-white hover:text-black transition-all cursor-pointer z-30 shrink-0"
            title="Copy Email Address"
          >
            Copy
          </button>
        )}
      </CardWrapper>
    </motion.div>
  );
};

const Contact = ({ onEmailClick }) => {
  const formRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [formData, setFormData] = useState({
    from_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Background Particles effect (HTML5 Canvas)
  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.3;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
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

    const particles = Array.from({ length: 30 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  const handleCopyEmail = (emailVal) => {
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
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Full Name is required';
    }
    
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = 'Please provide a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    if (!validate()) return;

    setStatus('sending');

    // Check if EmailJS is configured correctly
    const isConfigured = 
      emailjsConfig.serviceId && 
      emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      emailjsConfig.templateId && 
      emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      emailjsConfig.publicKey && 
      emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

    if (!isConfigured) {
      console.warn('EmailJS environment keys are not configured. Simulation of submit failure.');
      setTimeout(() => {
        setStatus('error');
      }, 1000);
      return;
    }

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );
      setStatus('success');
      setFormData({
        from_name: '',
        user_email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Submit Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden flex items-center font-sans border-t border-white/5">
      {/* Background canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Background Soft radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff2a2a]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center lg:text-left">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Contact
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Introductions and cards */}
          <motion.div 
            initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-white text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Let's Build Something <br />Amazing Together
              </h2>
              
              <p className="text-white/60 text-sm md:text-base mb-10 leading-relaxed font-medium max-w-lg">
                I'm always open to discussing software engineering opportunities, internships, collaborations, or interesting projects. Feel free to reach out.
              </p>
            </div>

            {/* Premium Contact Cards */}
            <div className="flex flex-col gap-4 max-w-md w-full">
              <ContactCard
                title="Email"
                label={personalInfo.emails.primary}
                onClick={onEmailClick}
                reducedMotion={reducedMotion}
                onCopy={handleCopyEmail}
                icon={
                  <svg className="w-5 h-5 text-[#ff2a2a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <ContactCard
                title="LinkedIn"
                label="Kandula Mohana Varsha Sri"
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                reducedMotion={reducedMotion}
                icon={
                  <svg className="w-5 h-5 text-[#ff2a2a]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                }
              />
              <ContactCard
                title="GitHub"
                label="MohanaKandula"
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                reducedMotion={reducedMotion}
                icon={
                  <svg className="w-5 h-5 text-[#ff2a2a]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                }
              />
              <ContactCard
                title="Location"
                label={personalInfo.location + ", Andhra Pradesh, India"}
                reducedMotion={reducedMotion}
                icon={
                  <svg className="w-5 h-5 text-[#ff2a2a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
            </div>
          </motion.div>

          {/* Right Column: Premium Contact Form */}
          <motion.div 
            initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between relative"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-md relative h-full flex flex-col justify-between">
              
              {/* Form header description */}
              <div className="mb-8">
                <h3 className="text-white text-lg font-black tracking-tight mb-1 uppercase">Send Message</h3>
                <p className="text-white/40 text-xs font-semibold">Have a question or proposal? I'd love to hear from you.</p>
              </div>

              {/* Form with Material Floating labels */}
              <form ref={formRef} onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="relative z-0 w-full group">
                    <input 
                      type="text" 
                      name="from_name" 
                      id="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#ff2a2a] peer font-medium rounded-none"
                    />
                    <label 
                      htmlFor="from_name"
                      className="peer-focus:font-semibold absolute text-sm text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ff2a2a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
                    >
                      Full Name
                    </label>
                    {errors.from_name && <span className="text-red-500 text-[10px] font-bold block mt-1">{errors.from_name}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="relative z-0 w-full group">
                    <input 
                      type="email" 
                      name="user_email" 
                      id="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#ff2a2a] peer font-medium rounded-none"
                    />
                    <label 
                      htmlFor="user_email"
                      className="peer-focus:font-semibold absolute text-sm text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ff2a2a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
                    >
                      Email Address
                    </label>
                    {errors.user_email && <span className="text-red-500 text-[10px] font-bold block mt-1">{errors.user_email}</span>}
                  </div>

                  {/* Subject */}
                  <div className="relative z-0 w-full group">
                    <input 
                      type="text" 
                      name="subject" 
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#ff2a2a] peer font-medium rounded-none"
                    />
                    <label 
                      htmlFor="subject"
                      className="peer-focus:font-semibold absolute text-sm text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ff2a2a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
                    >
                      Subject
                    </label>
                    {errors.subject && <span className="text-red-500 text-[10px] font-bold block mt-1">{errors.subject}</span>}
                  </div>

                  {/* Message */}
                  <div className="relative z-0 w-full group">
                    <textarea 
                      name="message" 
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#ff2a2a] peer font-medium resize-none rounded-none"
                    ></textarea>
                    <label 
                      htmlFor="message"
                      className="peer-focus:font-semibold absolute text-sm text-white/40 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ff2a2a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text"
                    >
                      Your Message
                    </label>
                    {errors.message && <span className="text-red-500 text-[10px] font-bold block mt-1">{errors.message}</span>}
                  </div>
                </div>

                {/* Submit button container */}
                <div className="mt-8 flex flex-col gap-6">
                  <motion.button 
                    whileHover={reducedMotion ? {} : { scale: 1.01 }}
                    whileTap={reducedMotion ? {} : { scale: 0.99 }}
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full py-3.5 rounded-2xl border font-bold flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer ${
                      status === 'sending' 
                        ? 'bg-white/10 border-white/20 text-white/60 cursor-not-allowed'
                        : status === 'error'
                        ? 'bg-red-800 border-red-700 text-white shadow-[0_0_20px_rgba(153,27,27,0.4)]'
                        : 'bg-[#ff2a2a] border-transparent hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,42,42,0.4)] text-white hover:scale-[1.01]'
                    }`}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : status === 'error' ? (
                      <span>Unable to send message. Please try again.</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    )}
                  </motion.button>

                  {/* Bottom Quick Contact Buttons */}
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest">Quick links:</span>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={onEmailClick}
                        className="text-xs font-bold text-white/60 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/20 transition-all duration-300 cursor-pointer outline-none"
                      >
                        Email Me
                      </button>
                      <a 
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-white/60 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/20 transition-all duration-300"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-white/60 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/20 transition-all duration-300"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </form>

              {/* Success Overlay Panel */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-[#111111]/95 rounded-3xl p-8 md:p-10 flex flex-col items-center justify-center text-center z-50 backdrop-blur-md"
                  >
                    {/* Success Checkmark Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      className="w-20 h-20 bg-green-500/20 text-green-500 border border-green-500/40 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                    >
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white text-2xl font-black mb-2 uppercase"
                    >
                      Thank You!
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/70 text-sm max-w-sm font-semibold"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => setStatus('idle')}
                      className="mt-8 px-6 py-2.5 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition-all text-xs font-bold cursor-pointer"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 border border-green-500 text-white font-bold px-6 py-3 rounded-full shadow-2xl z-[400000] text-sm whitespace-nowrap"
          >
            Email copied successfully.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
