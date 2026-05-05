import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ── SVG Icon Components ──────────────────────────────────────────────
const RocketIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const FilmIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const CheckCircleIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SettingsIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const PlusIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const LogOutIcon = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const SaveIcon = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const ImageIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const VideoUploadIcon = ({ size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const LinkIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const MonitorIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SmartphoneIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const UserIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const GlobeIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PaletteIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const PenToolIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

// ── Default Data ─────────────────────────────────────────────────────
const defaultProjects = [
  {
    id: 1, title: 'FitZone Gym',
    description: 'A full-featured gym management website.',
    longDescription: 'FitZone Gym is a comprehensive web platform built for modern fitness centers.',
    tech: 'HTML, CSS, JavaScript, PHP', category: 'Web App', status: 'Completed',
    github: '#', images: [],
    features: 'Membership Management, Class Booking System, Trainer Profiles, Admin Dashboard, Responsive Design',
  },
  {
    id: 2, title: 'Gadget Hub',
    description: 'A desktop application for managing electronics inventory.',
    longDescription: 'Gadget Hub is a robust desktop application for electronics retail businesses.',
    tech: 'C#, Visual Studio, SQL Server, .NET', category: 'Desktop App', status: 'Completed',
    github: '#', images: [],
    features: 'Inventory Management, POS System, Customer CRM, Sales Reports, Supplier Management',
  },
];

const defaultVideos = [];

const inputCls = "w-full border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-green-neon transition-colors";
const inputStyle = { background: 'rgba(255,255,255,0.03)' };

const defaultSettings = {
  ownerName: 'Udayanga Vishvajith Perera',
  ownerAge: '25',
  location: 'Kalutara, Sri Lanka',
  email: 'udayangamusic056@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  cvUrl: '',
  heroTagline: 'Crafting digital experiences with clean code and cinematic vision.',
  aboutBio1: "My journey into tech started with curiosity — taking apart websites to understand how they tick, then building my own.",
  aboutBio2: "When I'm not coding, you'll find me behind a camera, capturing moments and editing them into compelling visual stories.",
  accentColor: '#39FF14',
};

const tabs = ['projects', 'videos', 'settings'];

// ── AdminDashboard ────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(defaultProjects);
  const [videos, setVideos] = useState(defaultVideos);
  const [settings, setSettings] = useState(defaultSettings);
  const [editing, setEditing] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [videoUploadMode, setVideoUploadMode] = useState('url'); // 'url' | 'file'
  const localVideoRef = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem('admin_auth')) { navigate('/admin'); return; }
    try {
      const sp = localStorage.getItem('portfolio_projects');
      if (sp) setProjects(JSON.parse(sp));
      const sv = localStorage.getItem('portfolio_videos');
      if (sv) setVideos(JSON.parse(sv));
      const ss = localStorage.getItem('portfolio_settings');
      if (ss) setSettings(s => ({ ...s, ...JSON.parse(ss) }));
    } catch {}
  }, [navigate]);

  const handleLogout = () => { sessionStorage.removeItem('admin_auth'); navigate('/admin'); };

  // ── Projects ──
  const saveProjects = (data) => {
    const formatted = data.map(p => ({
      ...p,
      tech: typeof p.tech === 'string' ? p.tech.split(',').map(t => t.trim()) : p.tech,
      features: typeof p.features === 'string' ? p.features.split(',').map(f => f.trim()) : p.features,
      images: p.images || [],
    }));
    localStorage.setItem('portfolio_projects', JSON.stringify(formatted));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSaveAll = () => {
    saveProjects(projects);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveEdit = () => {
    const updated = projects.map(p => p.id === editing.id ? editing : p);
    setProjects(updated);
    saveProjects(updated);
    setEditing(null);
  };

  const handleAddProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const np = {
      id: newId, title: 'New Project', description: 'Short description.',
      longDescription: 'Detailed description.', tech: 'React, Node.js',
      category: 'Web App', status: 'In Progress', github: '#',
      images: [], features: 'Feature 1, Feature 2',
    };
    const updated = [...projects, np];
    setProjects(updated);
    setEditing(np);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const promises = files.map(f => new Promise(res => {
      const reader = new FileReader();
      reader.onload = ev => res(ev.target.result);
      reader.readAsDataURL(f);
    }));
    Promise.all(promises).then(imgs => {
      setEditing(p => ({ ...p, images: [...(p.images || []), ...imgs] }));
    });
  };

  const removeImage = (idx) => {
    setEditing(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  };

  // ── Videos ──
  const saveVideos = (data) => {
    localStorage.setItem('portfolio_videos', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  };

  const newVideo = () => {
    setVideoUploadMode('url');
    setEditingVideo({ id: null, title: '', platform: 'YouTube', url: '', thumbnail: '', description: '' });
  };

  const handleSaveVideo = () => {
    if (!editingVideo.title || !editingVideo.url) return;
    const id = editingVideo.id || Date.now();
    const updated = editingVideo.id
      ? videos.map(v => v.id === editingVideo.id ? { ...editingVideo, id } : v)
      : [...videos, { ...editingVideo, id }];
    setVideos(updated);
    saveVideos(updated);
    setEditingVideo(null);
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Delete this video?')) {
      const updated = videos.filter(v => v.id !== id);
      setVideos(updated);
      saveVideos(updated);
    }
  };

  // ── Local video file upload ──
  const handleLocalVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setEditingVideo(v => ({
      ...v,
      url: blobUrl,
      platform: 'Local',
      title: v.title || file.name.replace(/\.[^.]+$/, ''),
    }));
  };

  // ── Settings ──
  const handleSaveSettings = () => {
    localStorage.setItem('portfolio_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('storage'));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black font-poppins grid-bg">
      <div className="noise-overlay" />

      {/* Top Bar */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(0,0,0,0.95)',
          borderBottom: '1px solid rgba(57,255,20,0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-4">
          <a href="/" className="text-xl font-black">
            <span className="text-white">UV</span><span className="neon-text">.</span>
          </a>
          <span className="text-gray-600 text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          {activeTab === 'projects' && (
            <button onClick={handleSaveAll} className="neon-btn text-xs py-2 px-4 flex items-center gap-1.5">
              <SaveIcon size={14} />
              {saved ? 'Saved!' : 'Save Projects'}
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs px-3 py-2 border border-white/10 rounded transition-colors"
          >
            <LogOutIcon size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-1">
            Welcome back, <span className="neon-text">Udayanga</span> 👋
          </h1>
          <p className="text-gray-500 text-sm">Manage your portfolio content from here.</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { n: projects.length, l: 'Projects', Icon: RocketIcon },
            { n: videos.length, l: 'Videos', Icon: FilmIcon },
            { n: projects.filter(p => p.status === 'Completed').length, l: 'Completed', Icon: CheckCircleIcon },
          ].map(({ n, l, Icon }) => (
            <div
              key={l}
              className="rounded-xl p-4 text-center"
              style={{ background: 'rgba(57,255,20,0.04)', border: '1px solid rgba(57,255,20,0.15)' }}
            >
              <div className="flex justify-center mb-1 text-green-neon opacity-70">
                <Icon size={22} />
              </div>
              <div className="text-2xl font-black neon-text">{n}</div>
              <div className="text-gray-500 text-xs uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-semibold tracking-wider uppercase rounded transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-green-neon text-black'
                  : 'border border-white/10 text-gray-400 hover:border-green-neon/40 hover:text-green-neon'
              }`}
            >
              {tab === 'projects' ? <><RocketIcon size={15} /> Projects</> :
               tab === 'videos'   ? <><FilmIcon size={15} /> Videos</> :
                                    <><SettingsIcon size={15} /> Settings</>}
            </button>
          ))}
        </div>

        {/* ── PROJECTS TAB ── */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
              <button onClick={handleAddProject} className="neon-btn text-xs py-2 px-4 flex items-center gap-1.5">
                <PlusIcon size={14} /> Add Project
              </button>
            </div>
            <div className="grid gap-4">
              {projects.map(project => (
                <motion.div
                  key={project.id} layout
                  className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.2)' }}
                  >
                    {project.images && project.images.length > 0
                      ? <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                      : <ImageIcon size={28} className="text-green-neon opacity-30" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold truncate">{project.title}</h3>
                    <p className="text-gray-500 text-sm truncate">{project.description}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        project.status === 'Completed'
                          ? 'bg-green-neon/10 text-green-neon border border-green-neon/30'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}>{project.status}</span>
                      <span className="text-xs px-2 py-0.5 rounded border border-white/10 text-gray-500">{project.category}</span>
                      {project.images && project.images.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded border border-blue-500/20 text-blue-400">
                          {project.images.length} screenshot{project.images.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditing({ ...project, images: project.images || [] })}
                      className="text-xs px-4 py-2 neon-btn flex items-center gap-1.5"
                    >
                      <EditIcon size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-xs px-4 py-2 border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
                    >
                      <TrashIcon size={13} /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── VIDEOS TAB ── */}
        {activeTab === 'videos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Cinematic Works ({videos.length})</h2>
              <button onClick={newVideo} className="neon-btn text-xs py-2 px-4 flex items-center gap-1.5">
                <PlusIcon size={14} /> Add Video
              </button>
            </div>
            {videos.length === 0 ? (
              <div
                className="rounded-xl p-12 text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(57,255,20,0.2)' }}
              >
                <div className="flex justify-center mb-4 opacity-30 text-green-neon">
                  <FilmIcon size={56} />
                </div>
                <h3 className="text-white font-bold mb-2">No videos yet</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Add YouTube / Vimeo links or upload local video files for your Cinematic Works section
                </p>
                <button onClick={newVideo} className="neon-btn text-sm py-2 px-6 flex items-center gap-2 mx-auto">
                  <PlusIcon size={14} /> Add First Video
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {videos.map(v => (
                  <motion.div
                    key={v.id} layout
                    className="rounded-xl p-4 flex gap-4"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div
                      className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
                      style={{ background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.15)' }}
                    >
                      {v.thumbnail
                        ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                        : <FilmIcon size={24} className="text-green-neon opacity-40" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold truncate text-sm">{v.title || 'Untitled'}</h4>
                      <p className="text-gray-600 text-xs mt-0.5 flex items-center gap-1">
                        {v.platform === 'Local'
                          ? <><SmartphoneIcon size={11} /> Local File</>
                          : <><GlobeIcon size={11} /> {v.platform}</>}
                      </p>
                      <p className="text-gray-700 text-xs truncate mt-1">{v.url?.substring(0, 50)}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => { setVideoUploadMode('url'); setEditingVideo({ ...v }); }}
                        className="text-xs px-3 py-1.5 neon-btn flex items-center gap-1"
                      >
                        <EditIcon size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(v.id)}
                        className="text-xs px-3 py-1.5 border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition-colors flex items-center gap-1"
                      >
                        <TrashIcon size={12} /> Del
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            {/* Personal Info */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <UserIcon size={17} className="text-green-neon" /> Personal Info
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'ownerName', label: 'Full Name' },
                  { key: 'ownerAge', label: 'Age' },
                  { key: 'location', label: 'Location' },
                  { key: 'email', label: 'Email' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
                    <input className={inputCls} style={inputStyle} value={settings[key]} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <LinkIcon size={17} className="text-green-neon" /> Social Links & CV
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'github', label: 'GitHub URL' },
                  { key: 'linkedin', label: 'LinkedIn URL' },
                  { key: 'cvUrl', label: 'CV Download URL (e.g. /UdayangaCV.pdf)' },
                ].map(({ key, label }) => (
                  <div key={key} className={key === 'cvUrl' ? 'md:col-span-2' : ''}>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
                    <input className={inputCls} style={inputStyle} value={settings[key]} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* Hero & About Text */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <PenToolIcon size={17} className="text-green-neon" /> Page Content
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Hero Tagline</label>
                  <input className={inputCls} style={inputStyle} value={settings.heroTagline} onChange={e => setSettings(s => ({ ...s, heroTagline: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">About Me — Paragraph 1</label>
                  <textarea className={inputCls} style={inputStyle} rows={3} value={settings.aboutBio1} onChange={e => setSettings(s => ({ ...s, aboutBio1: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">About Me — Paragraph 2</label>
                  <textarea className={inputCls} style={inputStyle} rows={3} value={settings.aboutBio2} onChange={e => setSettings(s => ({ ...s, aboutBio2: e.target.value }))} />
                </div>
              </div>
            </div>

            {/* Theme */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <PaletteIcon size={17} className="text-green-neon" /> Theme Color
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="color" value={settings.accentColor}
                  onChange={e => setSettings(s => ({ ...s, accentColor: e.target.value }))}
                  className="w-14 h-14 rounded-lg cursor-pointer border-2 border-white/10 bg-transparent"
                />
                <div>
                  <p className="text-white font-semibold">{settings.accentColor}</p>
                  <p className="text-gray-600 text-sm">Accent / highlight color</p>
                </div>
                <div
                  className="ml-4 px-4 py-2 rounded-lg text-sm font-bold"
                  style={{ background: settings.accentColor, color: '#000' }}
                >
                  Preview
                </div>
              </div>
              <p className="text-gray-700 text-xs mt-3">
                ⚠️ Color change applies after Save. Requires CSS variable update in index.css for full effect.
              </p>
            </div>

            <button
              onClick={handleSaveSettings}
              className="neon-btn w-full py-3 text-sm flex items-center justify-center gap-2"
            >
              <SaveIcon size={16} />
              {settingsSaved ? '✓ Settings Saved!' : 'Save All Settings'}
            </button>

            {settingsSaved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg text-sm text-center"
                style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.3)' }}
              >
                <span className="neon-text font-bold">Settings saved!</span>{' '}
                <span className="text-gray-400">Refresh the portfolio to see changes reflected in dynamic sections.</span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* ── Project Edit Modal ── */}
      <AnimatePresence>
        {editing && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl"
              style={{ background: '#0a0a0a', border: '1px solid rgba(57,255,20,0.4)', boxShadow: '0 0 60px rgba(57,255,20,0.15)' }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <EditIcon size={18} className="text-green-neon" /> Edit Project
                  </h3>
                  <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'title', label: 'Project Title' },
                    { key: 'description', label: 'Short Description' },
                    { key: 'tech', label: 'Tech Stack (comma separated)' },
                    { key: 'github', label: 'GitHub URL' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
                      <input className={inputCls} style={inputStyle} value={editing[key] || ''} onChange={e => setEditing(p => ({ ...p, [key]: e.target.value }))} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Detailed Description</label>
                    <textarea rows={3} className={inputCls} style={inputStyle} value={editing.longDescription || ''} onChange={e => setEditing(p => ({ ...p, longDescription: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Features (comma separated)</label>
                    <input className={inputCls} style={inputStyle} value={editing.features || ''} onChange={e => setEditing(p => ({ ...p, features: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Status</label>
                      <select className={inputCls} style={{ background: '#111' }} value={editing.status} onChange={e => setEditing(p => ({ ...p, status: e.target.value }))}>
                        <option>Completed</option><option>In Progress</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Category</label>
                      <select className={inputCls} style={{ background: '#111' }} value={editing.category} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))}>
                        <option>Web App</option><option>Desktop App</option><option>Mobile App</option><option>In Progress</option>
                      </select>
                    </div>
                  </div>
                  {/* Screenshots */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
                      Screenshots ({(editing.images || []).length} uploaded) — Multiple allowed
                    </label>
                    <div
                      className="rounded-lg p-4 border-2 border-dashed border-white/10 hover:border-green-neon/50 transition-colors cursor-pointer text-center mb-3"
                      onClick={() => document.getElementById('imgs-upload').click()}
                    >
                      <div className="flex justify-center mb-2 opacity-30 text-green-neon">
                        <ImageIcon size={32} />
                      </div>
                      <p className="text-gray-600 text-sm">Click to upload screenshots (multiple)</p>
                      <p className="text-gray-700 text-xs">PNG, JPG, WEBP supported</p>
                    </div>
                    <input id="imgs-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleImagesUpload} />
                    {(editing.images || []).length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {editing.images.map((img, idx) => (
                          <div key={idx} className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >✕</button>
                            {idx === 0 && (
                              <span className="absolute bottom-1 left-1 text-xs px-1.5 py-0.5 rounded bg-green-neon text-black font-bold">Cover</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleSaveEdit} className="neon-btn flex-1 py-2.5 text-sm flex items-center justify-center gap-2">
                    <SaveIcon size={14} /> Save Project
                  </button>
                  <button onClick={() => setEditing(null)} className="flex-1 border border-white/10 text-gray-400 rounded py-2.5 text-sm hover:border-white/30 transition-colors">Cancel</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Video Edit Modal ── */}
      <AnimatePresence>
        {editingVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-xl"
              style={{ background: '#0a0a0a', border: '1px solid rgba(57,255,20,0.4)', boxShadow: '0 0 60px rgba(57,255,20,0.15)' }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FilmIcon size={18} className="text-green-neon" />
                    {editingVideo.id ? 'Edit' : 'Add'} Video
                  </h3>
                  <button onClick={() => setEditingVideo(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
                </div>

                {/* Upload Mode Toggle */}
                <div className="flex gap-2 mb-5">
                  <button
                    onClick={() => setVideoUploadMode('url')}
                    className={`flex-1 py-2 text-xs rounded flex items-center justify-center gap-1.5 font-semibold transition-all ${
                      videoUploadMode === 'url'
                        ? 'bg-green-neon text-black'
                        : 'border border-white/10 text-gray-500 hover:border-green-neon/40'
                    }`}
                  >
                    <LinkIcon size={13} /> YouTube / Vimeo URL
                  </button>
                  <button
                    onClick={() => setVideoUploadMode('file')}
                    className={`flex-1 py-2 text-xs rounded flex items-center justify-center gap-1.5 font-semibold transition-all ${
                      videoUploadMode === 'file'
                        ? 'bg-green-neon text-black'
                        : 'border border-white/10 text-gray-500 hover:border-green-neon/40'
                    }`}
                  >
                    <SmartphoneIcon size={13} /> Local File (PC / Phone)
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Video Title</label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="My Cinematic Reel"
                      value={editingVideo.title}
                      onChange={e => setEditingVideo(v => ({ ...v, title: e.target.value }))}
                    />
                  </div>

                  {videoUploadMode === 'url' ? (
                    <>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Platform</label>
                        <select
                          className={inputCls} style={{ background: '#111' }}
                          value={editingVideo.platform}
                          onChange={e => setEditingVideo(v => ({ ...v, platform: e.target.value }))}
                        >
                          <option>YouTube</option><option>Vimeo</option><option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Video URL</label>
                        <input
                          className={inputCls} style={inputStyle}
                          placeholder="https://youtube.com/watch?v=..."
                          value={editingVideo.url}
                          onChange={e => setEditingVideo(v => ({ ...v, url: e.target.value }))}
                        />
                        <p className="text-gray-700 text-xs mt-1">Paste full YouTube or Vimeo URL</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Thumbnail URL (optional)</label>
                        <input
                          className={inputCls} style={inputStyle}
                          placeholder="https://img.youtube.com/vi/VIDEO_ID/0.jpg"
                          value={editingVideo.thumbnail}
                          onChange={e => setEditingVideo(v => ({ ...v, thumbnail: e.target.value }))}
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
                        Upload Local Video File
                      </label>
                      <div
                        className="rounded-lg p-6 border-2 border-dashed border-white/10 hover:border-green-neon/50 transition-colors cursor-pointer text-center"
                        onClick={() => localVideoRef.current?.click()}
                      >
                        <div className="flex justify-center mb-3 text-green-neon opacity-50">
                          <VideoUploadIcon size={40} />
                        </div>
                        <p className="text-gray-400 text-sm font-semibold">
                          Click to select video from your device
                        </p>
                        <p className="text-gray-700 text-xs mt-1">
                          MP4, MOV, WEBM, AVI supported
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1"><MonitorIcon size={12} /> Desktop</span>
                          <span className="flex items-center gap-1"><SmartphoneIcon size={12} /> Phone</span>
                        </div>
                      </div>
                      <input
                        ref={localVideoRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleLocalVideoUpload}
                      />
                      {editingVideo.url && editingVideo.platform === 'Local' && (
                        <div
                          className="mt-3 p-3 rounded-lg flex items-center gap-2"
                          style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.2)' }}
                        >
                          <FilmIcon size={16} className="text-green-neon flex-shrink-0" />
                          <p className="text-green-neon text-xs font-semibold">Local video file loaded!</p>
                        </div>
                      )}
                      <p className="text-gray-700 text-xs mt-2">
                        ⚠️ Note: Local blob URLs work only in the current browser session. For permanent hosting, use YouTube or Vimeo.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                    <textarea
                      rows={2} className={inputCls} style={inputStyle}
                      placeholder="Short description..."
                      value={editingVideo.description}
                      onChange={e => setEditingVideo(v => ({ ...v, description: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={handleSaveVideo} className="neon-btn flex-1 py-2.5 text-sm flex items-center justify-center gap-2">
                    <SaveIcon size={14} /> Save Video
                  </button>
                  <button onClick={() => setEditingVideo(null)} className="flex-1 border border-white/10 text-gray-400 rounded py-2.5 text-sm">Cancel</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;