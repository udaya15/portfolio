import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ── SVG Icon Components ──────────────────────────────────────────────
const CodeIcon = ({ size = 36, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ClapperboardIcon = ({ size = 36, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4z" />
    <path d="M4 11L2 4l3.5 1 2-3 2.5 3.5 2.5-1.5 2 3 3.5-1L20 11H4z" />
    <line x1="4" y1="15" x2="20" y2="15" />
  </svg>
);

const GraduationCapIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// ── Animation Variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Component ────────────────────────────────────────────────────────
const About = () => {
  const stats = [
    { value: '2+', label: 'Years Coding' },
    { value: '5+', label: 'Projects Built' },
    { value: '5+', label: 'Tech Stacks' },
    { value: '∞', label: 'Passion' },
  ];

  const skills = ['Problem Solver', 'Creative Thinker', 'Team Player', 'Fast Learner'];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-5 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #39FF14, transparent)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.div variants={fadeUp}>
            <span className="text-green-neon text-sm font-semibold tracking-[0.3em] uppercase">Who I Am</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title text-white mt-2">
            About <span className="neon-text">Me</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="w-16 h-px bg-green-neon mx-auto mt-4"
            style={{ boxShadow: '0 0 8px #39FF14' }}
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Bio */}
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm <span className="text-white font-semibold">Udayanga Vishvajith Perera</span>, a passionate
                Full-Stack Developer and Creative Media enthusiast based in{' '}
                <span className="neon-text font-medium">Kalutara, Sri Lanka</span>.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                My journey into tech started with curiosity taking apart websites to understand how they tick,
                then building my own. Today I craft everything from robust web applications to cinematic video
                content. I believe technology and creativity are two sides of the same coin.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                When I'm not coding, you'll find me behind a camera, capturing moments and editing them into
                compelling visual stories. This dual passion for precision in code and beauty in visuals
                defines everything I build.
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1.5 border border-green-neon/30 text-green-neon rounded-sm tracking-wider"
                    style={{ background: 'rgba(57,255,20,0.05)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={fadeUp}
              className="neon-border rounded-lg p-6 relative overflow-hidden"
              style={{ background: 'rgba(57,255,20,0.03)' }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-10"
                style={{ background: 'radial-gradient(circle, #39FF14, transparent)' }}
              />

              {/* Campus Logos — top right */}
              <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                <div
                  className="flex items-center justify-center rounded-md overflow-hidden"
                  style={{ width: 72, height: 72, background: '#fff', padding: 4, border: '1px solid rgba(57,255,20,0.3)' }}
                  title="ICBT Colombo Campus"
                >
                  <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <rect width="120" height="60" fill="#003087" rx="4"/>
                    <text x="8" y="38" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="28" fill="#ffffff" letterSpacing="1">ICBT</text>
                    <rect x="8" y="44" width="104" height="2.5" fill="#39FF14"/>
                    <text x="8" y="56" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#ccddff" letterSpacing="0.5">CAMPUS</text>
                  </svg>
                </div>
                <div
                  className="flex items-center justify-center rounded-md overflow-hidden"
                  style={{ width: 72, height: 28, background: '#fff', padding: '2px 4px', border: '1px solid rgba(57,255,20,0.2)' }}
                  title="Cardiff Metropolitan University"
                >
                  <svg viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <rect width="120" height="32" fill="#C8102E" rx="3"/>
                    <text x="6" y="14" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#ffffff">Cardiff</text>
                    <text x="6" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7" fill="#ffffff">Metropolitan</text>
                    <text x="72" y="20" fontFamily="Arial Black" fontWeight="900" fontSize="14" fill="#ffffff">Uni</text>
                  </svg>
                </div>
              </div>

              {/* Education Info */}
              <div className="flex items-start gap-4 pr-20">
                <div
                  className="w-12 h-12 flex-shrink-0 rounded flex items-center justify-center text-green-neon"
                  style={{ border: '1px solid rgba(57,255,20,0.5)', background: 'rgba(57,255,20,0.1)' }}
                >
                  <GraduationCapIcon size={26} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Higher Diploma in Computing & Software Engineering
                  </h3>
                  <p className="neon-text text-sm font-semibold mb-1">ICBT Colombo Campus</p>
                  <p className="text-gray-500 text-sm">Affiliated with Cardiff Metropolitan University, UK</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-xs px-2 py-1 bg-green-neon/10 border border-green-neon/20 text-green-neon rounded-sm">
                      Computing
                    </span>
                    <span className="text-xs px-2 py-1 bg-green-neon/10 border border-green-neon/20 text-green-neon rounded-sm">
                      Software Engineering
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Right: Stats + Passion Cards */}
          <AnimatedSection>
            {/* Stats Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-8">
              {stats.map(({ value, label }) => (
                <div key={label} className="project-card rounded-lg p-6 text-center group">
                  <div
                    className="text-4xl font-black neon-text mb-2 group-hover:scale-110 transition-transform duration-300"
                    style={{ textShadow: '0 0 20px rgba(57,255,20,0.5)' }}
                  >
                    {value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium tracking-wider uppercase">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Dual Passion Cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              <div className="project-card rounded-lg p-5 group">
                <div className="mb-3 text-green-neon group-hover:scale-110 transition-transform duration-300">
                  <CodeIcon size={34} />
                </div>
                <h4 className="text-white font-bold mb-1">Developer</h4>
                <p className="text-gray-500 text-sm">
                  Building robust, scalable web applications with modern technologies
                </p>
              </div>
              <div className="project-card rounded-lg p-5 group">
                <div className="mb-3 text-green-neon group-hover:scale-110 transition-transform duration-300">
                  <ClapperboardIcon size={34} />
                </div>
                <h4 className="text-white font-bold mb-1">Creator</h4>
                <p className="text-gray-500 text-sm">
                  Crafting cinematic stories through photography & videography
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;