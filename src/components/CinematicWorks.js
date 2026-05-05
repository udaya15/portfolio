import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ── SVG Icon Components ──────────────────────────────────────────────
const PlayIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const CameraIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const FilmIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

const ScissorsIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const VideoIcon = ({ size = 80, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const ExternalLinkIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ── Helpers ──────────────────────────────────────────────────────────
function getEmbedUrl(url) {
  if (!url) return null;
  if (url.startsWith('blob:') || url.startsWith('data:')) return url;
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vMatch) return `https://player.vimeo.com/video/${vMatch[1]}`;
  return url;
}

function getYtThumbnail(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return null;
}

function isLocalVideo(url) {
  return url && (url.startsWith('blob:') || url.startsWith('data:video'));
}

// ── VideoCard Component ───────────────────────────────────────────────
function VideoCard({ video, index, isInView }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getEmbedUrl(video.url);
  const thumbnail = video.thumbnail || getYtThumbnail(video.url);
  const local = isLocalVideo(video.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="project-card rounded-xl overflow-hidden flex flex-col group"
    >
      {/* Thumbnail / Player */}
      <div className="relative" style={{ aspectRatio: '16/9', background: '#0a0a0a' }}>
        {playing && (local || embedUrl) ? (
          local ? (
            <video
              src={video.url}
              className="w-full h-full object-cover"
              controls
              autoPlay
              title={video.title}
            />
          ) : (
            <iframe
              src={`${embedUrl}?autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={video.title}
            />
          )
        ) : (
          <div className="w-full h-full relative cursor-pointer" onClick={() => setPlaying(true)}>
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={video.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'rgba(57,255,20,0.03)' }}
              >
                <VideoIcon size={72} className="text-green-neon opacity-20" />
              </div>
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(57,255,20,0.9)', boxShadow: '0 0 30px rgba(57,255,20,0.6)' }}
              >
                <PlayIcon size={22} className="text-black ml-1" />
              </motion.div>
            </div>

            {/* Platform badge */}
            <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded font-semibold bg-black/70 text-gray-300 border border-white/10">
              {local ? 'Local' : (video.platform || 'Video')}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1">
        <h4 className="text-white font-bold text-sm mb-1">{video.title || 'Cinematic Work'}</h4>
        {video.description && (
          <p className="text-gray-600 text-xs leading-relaxed">{video.description}</p>
        )}
        {!playing && (embedUrl || local) && (
          <button
            onClick={() => setPlaying(true)}
            className="mt-3 text-xs neon-text hover:underline font-semibold flex items-center gap-1"
          >
            <PlayIcon size={12} /> Watch Now
          </button>
        )}
        {!embedUrl && !local && video.url && (
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-xs neon-text hover:underline font-semibold flex items-center gap-1"
          >
            <ExternalLinkIcon size={12} /> Open Video
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────
const CinematicWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem('portfolio_videos');
      if (saved) {
        try { setVideos(JSON.parse(saved)); } catch {}
      }
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const hasVideos = videos.length > 0;

  const categories = [
    {
      Icon: CameraIcon,
      label: 'Photography',
      sub: hasVideos ? 'Active' : 'Coming Soon',
    },
    {
      Icon: FilmIcon,
      label: 'Videography',
      sub: hasVideos ? `${videos.length} video${videos.length !== 1 ? 's' : ''}` : 'Coming Soon',
    },
    {
      Icon: ScissorsIcon,
      label: 'Video Editing',
      sub: hasVideos ? 'Active' : 'Coming Soon',
    },
  ];

  return (
    <section id="cinematic" className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,0.01) 2px, rgba(57,255,20,0.01) 4px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-green-neon text-sm font-semibold tracking-[0.3em] uppercase">
            Creative Side
          </span>
          <h2 className="section-title text-white mt-2">
            Cinematic <span className="neon-text">Works</span>
          </h2>
          <div
            className="w-16 h-px bg-green-neon mx-auto mt-4 mb-6"
            style={{ boxShadow: '0 0 8px #39FF14' }}
          />
          <p className="text-gray-400 max-w-xl mx-auto">
            Beyond code, I capture the world through a lens. Photography, videography, and cinematic
            editing — this is where creativity meets technology.
          </p>
        </motion.div>

        {hasVideos ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} isInView={isInView} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden mb-8"
            style={{
              background: 'rgba(10,10,10,0.8)',
              border: '1px solid rgba(57,255,20,0.25)',
              boxShadow: '0 0 60px rgba(57,255,20,0.08)',
            }}
          >
            <div
              className="h-1.5"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #39FF14 20%, #39FF14 80%, transparent)',
              }}
            />
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center relative">
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-8 opacity-80"
              >
                <VideoIcon size={88} className="text-green-neon" />
              </motion.div>

              <div
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full mb-6"
                style={{
                  border: '1px solid rgba(57,255,20,0.5)',
                  background: 'rgba(57,255,20,0.08)',
                  boxShadow: '0 0 20px rgba(57,255,20,0.2)',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full bg-green-neon"
                  style={{
                    animation: 'glowPulse 1.5s ease-in-out infinite',
                    boxShadow: '0 0 6px #39FF14',
                  }}
                />
                <span className="text-green-neon text-sm font-bold tracking-[0.2em] uppercase">
                  Under Construction
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Something <span className="neon-text">Cinematic</span> is Coming
              </h3>
              <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
                Curating the finest photography and videography — cinematic reels, portrait sessions,
                urban captures, and motion edits. Add videos via the Admin Panel!
              </p>
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Progress</span>
                  <span className="neon-text">35%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '35%' } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-green-neon rounded-full"
                    style={{ boxShadow: '0 0 8px #39FF14' }}
                  />
                </div>
              </div>
            </div>
            <div
              className="h-1.5"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #39FF14 20%, #39FF14 80%, transparent)',
              }}
            />
          </motion.div>
        )}

        {/* Sub-category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {categories.map(({ Icon, label, sub }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="project-card rounded-xl p-6 text-center group cursor-default"
            >
              <div className="flex justify-center mb-3 text-green-neon group-hover:scale-110 transition-transform duration-300">
                <Icon size={36} />
              </div>
              <h4 className="text-white font-bold mb-1">{label}</h4>
              <span
                className="text-xs px-3 py-1 rounded-full text-green-neon font-semibold"
                style={{
                  background: 'rgba(57,255,20,0.08)',
                  border: '1px solid rgba(57,255,20,0.2)',
                }}
              >
                {sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicWorks;