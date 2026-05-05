import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const OWNER_EMAIL = 'udayangamusic056@gmail.com';

// ── SVG Icon Components ──────────────────────────────────────────────
const MailIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const MapPinIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const GraduationCapIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const CheckCircleIcon = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SendIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const InfoIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const GithubIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ── Component ────────────────────────────────────────────────────────
const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const contactInfo = [
    {
      Icon: MailIcon,
      label: 'Email',
      value: OWNER_EMAIL,
      href: `mailto:${OWNER_EMAIL}`,
    },
    {
      Icon: MapPinIcon,
      label: 'Location',
      value: 'Kalutara, Sri Lanka 🇱🇰',
      href: null,
    },
    {
      Icon: GraduationCapIcon,
      label: 'Education',
      value: 'ICBT Colombo / Cardiff Met',
      href: null,
    },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', Icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-5 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #39FF14, transparent)', filter: 'blur(80px)' }}
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
            Get In Touch
          </span>
          <h2 className="section-title text-white mt-2">
            Contact <span className="neon-text">Me</span>
          </h2>
          <div
            className="w-16 h-px bg-green-neon mx-auto mt-4"
            style={{ boxShadow: '0 0 8px #39FF14' }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Let's Build Something Together</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities. Drop a
              message and I'll get back to you within 24 hours!
            </p>

            {/* Contact Info List */}
            <div className="space-y-5 mb-8">
              {contactInfo.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded text-green-neon"
                    style={{
                      background: 'rgba(57,255,20,0.08)',
                      border: '1px solid rgba(57,255,20,0.3)',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-gray-200 text-sm font-medium hover:text-green-neon transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-200 text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-500 hover:text-green-neon transition-colors duration-300 border border-white/10 hover:border-green-neon/40 px-4 py-2 rounded"
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>

            {/* Info note */}
            <div
              className="mt-6 p-3 rounded-lg text-xs text-gray-600 leading-relaxed flex items-start gap-2"
              style={{
                background: 'rgba(57,255,20,0.04)',
                border: '1px solid rgba(57,255,20,0.12)',
              }}
            >
              <InfoIcon size={14} className="text-green-neon flex-shrink-0 mt-0.5" />
              <span>
                Submitting the form will open your email client with the message pre-filled and send
                directly to <span className="text-gray-400">{OWNER_EMAIL}</span>
              </span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-green-neon"
                  style={{
                    border: '2px solid #39FF14',
                    boxShadow: '0 0 30px rgba(57,255,20,0.4)',
                    background: 'rgba(57,255,20,0.08)',
                  }}
                >
                  <CheckCircleIcon size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Email Client Opened!</h3>
                <p className="text-gray-400 mb-2">Your message is ready to send from your email app.</p>
                <p className="text-gray-600 text-sm mb-6">
                  Sending to: <span className="text-green-neon">{OWNER_EMAIL}</span>
                </p>
                <button onClick={() => setSubmitted(false)} className="neon-btn text-sm py-2 px-6">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Your Name
                  </label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-700 outline-none transition-all duration-300 focus:border-green-neon ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Your Email
                  </label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-700 outline-none transition-all duration-300 focus:border-green-neon ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell me about your project or inquiry..."
                    className={`w-full border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-700 outline-none transition-all duration-300 focus:border-green-neon resize-none ${errors.message ? 'border-red-500' : 'border-white/10'}`}
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit" disabled={loading}
                  className="neon-btn w-full text-sm py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-green-neon/30 border-t-green-neon rounded-full animate-spin" />
                      Opening Email...
                    </>
                  ) : (
                    <>
                      <SendIcon size={15} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;