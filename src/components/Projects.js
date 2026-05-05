import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const defaultProjects = [
  {
    id: 1,
    title: 'FitZone Gym',
    description: 'A full-featured gym management and membership website with booking system, trainer profiles, and class schedules.',
    longDescription: 'FitZone Gym is a comprehensive web platform built for modern fitness centers. It features an intuitive membership management system, online class booking, trainer profile pages, progress tracking, and an admin dashboard for gym owners. The site is fully responsive and optimized for performance.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    category: 'Web App',
    status: 'Completed',
    github: '#',
    images: [],
    features: ['Membership Management', 'Class Booking System', 'Trainer Profiles', 'Admin Dashboard', 'Responsive Design'],
  },
  {
    id: 2,
    title: 'Gadget Hub',
    description: 'A desktop application for managing electronics inventory, sales, and customer records built with C# and Visual Studio.',
    longDescription: 'Gadget Hub is a robust desktop application developed for electronics retail businesses. It provides comprehensive inventory management, point-of-sale functionality, customer relationship management, sales reporting, and supplier management. Built with a clean WinForms UI and SQL Server backend.',
    tech: ['C#', 'Visual Studio', 'SQL Server', '.NET'],
    category: 'Desktop App',
    status: 'Completed',
    github: '#',
    images: [],
    features: ['Inventory Management', 'POS System', 'Customer CRM', 'Sales Reports', 'Supplier Management'],
  },
  {
    id: 3,
    title: 'Coming Soon',
    description: 'More exciting projects are in development. Stay tuned!',
    longDescription: 'I am currently working on several new projects including a full-stack React + Node.js application and more. Check back soon!',
    tech: ['React', 'Node.js', 'TypeScript'],
    category: 'In Progress',
    status: 'In Progress',
    github: null,
    images: [],
    features: ['Full-Stack Architecture', 'Modern UI/UX', 'API Integration'],
  },
];

// Image carousel inside modal
function ImageCarousel({ images }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-52 flex flex-col items-center justify-center"
        style={{ background: 'rgba(57,255,20,0.03)' }}>
        <div className="text-6xl mb-2 opacity-20">🖼️</div>
        <p className="text-gray-600 text-sm">No screenshots yet</p>
        <p className="text-gray-700 text-xs">Upload via Admin Panel</p>
      </div>
    );
  }
  return (
    <div className="relative w-full h-52 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <img src={images[idx]} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
      {images.length > 1 && (
        <>
          <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 text-green-neon text-lg flex items-center justify-center hover:bg-black transition-all"
            style={{ border: '1px solid rgba(57,255,20,0.4)' }}>‹</button>
          <button onClick={() => setIdx(i => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 text-green-neon text-lg flex items-center justify-center hover:bg-black transition-all"
            style={{ border: '1px solid rgba(57,255,20,0.4)' }}>›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === idx ? '#39FF14' : 'rgba(255,255,255,0.3)' }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Modal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative w-full max-w-2xl rounded-xl overflow-hidden z-10"
          initial={{ scale: 0.8, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ background: '#080808', border: '1px solid rgba(57,255,20,0.4)', boxShadow: '0 0 60px rgba(57,255,20,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }} />

          {/* Image carousel */}
          <ImageCarousel images={project.images || []} />

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-black text-white mb-1">{project.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 bg-green-neon/10 text-green-neon border border-green-neon/30 rounded">{project.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${project.status === 'Completed' ? 'border-green-neon/30 text-green-neon bg-green-neon/10' : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'}`}>{project.status}</span>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-xl font-bold ml-4">✕</button>
            </div>

            <p className="text-gray-400 leading-relaxed mb-5">{project.longDescription}</p>

            <div className="mb-5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Key Features</h4>
              <ul className="grid grid-cols-2 gap-2">
                {(project.features || []).map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="neon-text text-xs">▶</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {(project.tech || []).map(t => (
                <span key={t} className="text-xs px-3 py-1 border border-white/10 text-gray-400 rounded">{t}</span>
              ))}
            </div>

            {/* Only GitHub — no Live Demo */}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="neon-btn block text-center text-sm py-2.5">
                View on GitHub ↗
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) setProjects(parsed);
      } catch (e) {}
    }
    // Listen for storage changes (when admin saves)
    const handler = () => {
      const saved = localStorage.getItem('portfolio_projects');
      if (saved) { try { setProjects(JSON.parse(saved)); } catch {} }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-3 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.08), transparent)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="text-green-neon text-sm font-semibold tracking-[0.3em] uppercase">What I've Built</span>
          <h2 className="section-title text-white mt-2">Featured <span className="neon-text">Projects</span></h2>
          <div className="w-16 h-px bg-green-neon mx-auto mt-4" style={{ boxShadow: '0 0 8px #39FF14' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="project-card rounded-xl overflow-hidden flex flex-col">
              {/* Card image */}
              <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ background: 'rgba(57,255,20,0.02)' }}>
                {project.images && project.images.length > 0 ? (
                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="text-5xl mb-2 opacity-30">
                      {project.category === 'Web App' ? '🌐' : project.category === 'Desktop App' ? '🖥️' : '⚡'}
                    </div>
                    <p className="text-gray-700 text-xs tracking-wider">
                      {project.status === 'In Progress' ? 'In Development' : 'Screenshot Placeholder'}
                    </p>
                  </div>
                )}
                <span className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded font-semibold ${project.status === 'Completed' ? 'bg-green-neon/20 text-green-neon border border-green-neon/40' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                  {project.status}
                </span>
                {project.images && project.images.length > 1 && (
                  <span className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded bg-black/60 text-gray-400 border border-white/10">
                    +{project.images.length} shots
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(project.tech || []).slice(0, 4).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 border border-white/10 text-gray-500 rounded">{t}</span>
                  ))}
                </div>
                <button onClick={() => setSelectedProject(project)} className="neon-btn w-full text-sm py-2.5">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Projects;