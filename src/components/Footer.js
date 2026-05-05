import React from 'react';
import { motion } from 'framer-motion';

const DownloadIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)', boxShadow: '0 0 8px #39FF14' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <a href="#" className="text-2xl font-black">
              <span className="text-white">UV</span>
              <span className="neon-text">.</span>
            </a>
            <p className="text-gray-600 text-xs mt-1">Udayanga Vishvajith Perera</p>
          </motion.div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-gray-500 hover:text-green-neon text-sm transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Download CV — fixed */}
          <motion.a
            href={process.env.PUBLIC_URL + "/UdayangaCV.pdf"}
            download="UdayangaCV.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neon-btn text-xs py-2.5 px-5 flex items-center gap-2"
          >
            <DownloadIcon size={14} /> Download CV
          </motion.a>
        </div>

        {/* Divider */}
        <div className="neon-divider my-8 opacity-20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-700">
          <span>© {currentYear} Udayanga Vishvajith Perera. All rights reserved.</span>
          <span>Built with <span className="neon-text">React</span> & <span className="neon-text">Tailwind CSS</span></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
