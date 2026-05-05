import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Simple typing animation hook
function useTypingAnimation(texts, speed = 80) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!deleting && charIndex < currentText.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), speed);
    } else if (!deleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex(i => (i + 1) % texts.length);
    }

    setDisplayed(currentText.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed]);

  return displayed;
}

// Particle canvas
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 20, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(57, 255, 20, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

const Hero = () => {
  const roles = ['Full-Stack Web Developer', 'Video Editor', 'Tech Enthusiast', 'Creative Coder'];
  const typedText = useTypingAnimation(roles, 75);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Radial glow in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(57,255,20,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 pt-20">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-green-neon mb-6 py-1 px-3 border border-green-neon/30 rounded-sm"
              style={{ boxShadow: '0 0 10px rgba(57,255,20,0.2)' }}
            >
              Available for Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2"
          >
            Hi, I am
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
          >
            <span className="neon-text">Udayanga</span>
            <br />
            <span className="text-white">Vishvajith Perera</span>
            <span className="text-gray-500 text-3xl font-light ml-2">(25)</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 font-medium mb-8 h-9 flex items-center justify-center lg:justify-start"
          >
            <span className="text-green-neon mr-2">&gt;</span>
            <span>{typedText}</span>
            <span className="ml-1 inline-block w-0.5 h-6 bg-green-neon" style={{ animation: 'blink 1s step-end infinite' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-gray-400 text-base max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Crafting digital experiences with clean code and cinematic vision.
            Based in Kalutara, Sri Lanka 🇱🇰
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a href="#contact" className="neon-btn text-center glow-pulse">
              Contact Me
            </a>
            <a
              href="#projects"
              className="border border-white/20 text-white hover:border-green-neon/50 hover:text-green-neon transition-all duration-300 py-3 px-8 rounded text-sm font-semibold tracking-widest uppercase text-center"
            >
              View Projects
            </a>
          </motion.div>
        </div>

        {/* Right: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <div className="relative">
            {/* Glow rings */}
            <div
              className="absolute -inset-4 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(57,255,20,0.3) 0%, transparent 70%)',
                animation: 'glowPulse 3s ease-in-out infinite',
              }}
            />
            <div
              className="absolute -inset-1 rounded-full"
              style={{ border: '2px solid rgba(57,255,20,0.5)', boxShadow: '0 0 20px rgba(57,255,20,0.3)' }}
            />

            {/* Photo container */}
            <div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative float-icon"
              style={{ border: '3px solid #39FF14', boxShadow: '0 0 40px rgba(57,255,20,0.4)' }}
            >
              {/* Profile photo placeholder — replace src with your actual photo */}
              <img
                src={process.env.PUBLIC_URL + "/profile.png"}
                alt="Udayanga Vishvajith Perera"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback initials */}
              <div
                className="w-full h-full items-center justify-center text-5xl font-black neon-text absolute inset-0"
                style={{ display: 'none', background: '#0a0a0a' }}
              >
                UVP
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-4 -right-4 bg-black border border-green-neon/50 rounded-lg px-3 py-2 text-xs font-semibold"
              style={{ boxShadow: '0 0 15px rgba(57,255,20,0.2)' }}
            >
              <span className="neon-text">Full-Stack</span>
              <br />
              <span className="text-gray-300">Developer</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-12 bg-gradient-to-b from-green-neon to-transparent"
          style={{ animation: 'float 1.5s ease-in-out infinite' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;