import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Real tech logos from devicons CDN
const technologies = [
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Frontend', color: '#E34F26' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Frontend', color: '#1572B6' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Frontend', color: '#F7DF1E' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Frontend', color: '#3178C6' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', color: '#61DAFB' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'Frontend', color: '#ffffff' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', color: '#339933' },
  { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', category: 'Backend', color: '#777BB4' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'Backend', color: '#ED8B00' },
  { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', category: 'Backend', color: '#239120' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', category: 'Backend', color: '#00599C' },
  { name: 'R', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg', category: 'Data', color: '#276DC3' },
  { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'Database', color: '#4479A1' },
  { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'Tools', color: '#007ACC' },
  { name: 'Visual Studio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg', category: 'Tools', color: '#5C2D91' },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Data', 'Tools'];

function TechIcon({ tech, hovered }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300 p-2"
      style={{
        background: hovered ? 'rgba(57,255,20,0.1)' : 'rgba(255,255,255,0.04)',
        border: hovered ? '1px solid #39FF14' : '1px solid rgba(255,255,255,0.09)',
        boxShadow: hovered ? `0 0 22px rgba(57,255,20,0.45), 0 0 45px rgba(57,255,20,0.12)` : 'none',
        animation: 'float 3.5s ease-in-out infinite',
      }}
    >
      {!imgError ? (
        <img
          src={tech.logo}
          alt={tech.name}
          className="w-10 h-10 object-contain"
          style={{
            filter: hovered
              ? `drop-shadow(0 0 6px ${tech.color}aa) brightness(1.15)`
              : 'brightness(0.85) saturate(0.7)',
            transition: 'filter 0.3s ease',
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-xs font-black text-center leading-none" style={{ color: hovered ? '#39FF14' : '#6b7280', fontSize: '10px' }}>
          {tech.name}
        </span>
      )}
    </div>
  );
}

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredTech, setHoveredTech] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeCategory === 'All' ? technologies : technologies.filter(t => t.category === activeCategory);

  return (
    <section id="tech" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #39FF14, transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="text-green-neon text-sm font-semibold tracking-[0.3em] uppercase">What I Use</span>
          <h2 className="section-title text-white mt-2">Tech <span className="neon-text">Stack</span></h2>
          <div className="w-16 h-px bg-green-neon mx-auto mt-4" style={{ boxShadow: '0 0 8px #39FF14' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-semibold tracking-widest uppercase rounded transition-all duration-300 ${activeCategory === cat ? 'bg-green-neon text-black shadow-lg' : 'border border-white/10 text-gray-400 hover:border-green-neon/50 hover:text-green-neon'}`}
              style={activeCategory === cat ? { boxShadow: '0 0 20px rgba(57,255,20,0.5)' } : {}}>
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {filtered.map((tech, i) => (
            <motion.div key={tech.name}
              initial={{ opacity: 0, scale: 0.5, y: 30 }} animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ scale: 1.12, y: -8 }}
              onHoverStart={() => setHoveredTech(tech.name)} onHoverEnd={() => setHoveredTech(null)}
              className="relative flex flex-col items-center gap-3 cursor-default">
              <TechIcon tech={tech} hovered={hoveredTech === tech.name} />
              <span className="text-xs font-semibold text-center transition-colors duration-300"
                style={{ color: hoveredTech === tech.name ? '#39FF14' : '#9ca3af' }}>
                {tech.name}
              </span>
              {hoveredTech === tech.name && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-8 text-xs px-2 py-1 rounded bg-green-neon text-black font-semibold whitespace-nowrap z-10">
                  {tech.category}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[{ n: '15+', l: 'Technologies' }, { n: '5', l: 'Categories' }, { n: '2+', l: 'Years XP' }].map(({ n, l }) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-black neon-text">{n}</div>
              <div className="text-gray-600 text-xs uppercase tracking-wider mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;