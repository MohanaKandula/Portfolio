import React from 'react';
import { technicalSkills } from '../data/portfolioData';

const SkillCard = ({ category, index }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] hover:border-red-500/30 hover:shadow-[0_20px_50px_rgba(255,42,42,0.1)] transition-all duration-500 flex flex-col justify-between"
  >
    <div>
      <h3 className="text-white text-sm font-black tracking-widest mb-4 pb-2 border-b border-white/10 uppercase">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span 
            key={skill}
            className="px-3 py-1.5 text-xs font-semibold text-white/90 bg-white/5 rounded-xl border border-white/10 hover:bg-[#ff2a2a]/20 hover:border-[#ff2a2a]/40 hover:text-red-300 transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TechnicalSkills = () => {
  return (
    <section id="skills" className="bg-[#0a0a0a] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Background visual elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Technical Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            My Skillset
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A comprehensive overview of my programming languages, frameworks, databases, and engineering concepts.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {technicalSkills.categories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Currently Learning Card */}
        <div 
          data-aos="fade-up"
          className="bg-gradient-to-r from-[#ff2a2a]/10 to-transparent backdrop-blur-md border border-[#ff2a2a]/20 rounded-3xl p-6 md:p-8 mt-12 w-full"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-white text-lg font-black tracking-tight mb-2 uppercase flex items-center gap-2">
                <span>🚀</span> Currently Learning
              </h3>
              <p className="text-white/50 text-sm font-medium leading-relaxed">
                Actively expanding my knowledge in modern cloud-native systems, advanced architectures, and intelligence frameworks.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end max-w-xl">
              {technicalSkills.currentlyLearning.map((topic) => (
                <span 
                  key={topic}
                  className="px-4 py-2 text-xs font-bold text-red-200 bg-[#ff2a2a]/10 border border-[#ff2a2a]/30 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechnicalSkills;
