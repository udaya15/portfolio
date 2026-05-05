import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Updated credentials
const ADMIN_USER = 'Udayanga Perera';
const ADMIN_PASS = 'UVP1002@Udaya';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
        sessionStorage.setItem('admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 grid-bg font-poppins">
      <div className="noise-overlay" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-black"><span className="text-white">UV</span><span className="neon-text">.</span></a>
          <p className="text-gray-600 text-sm mt-2 tracking-widest uppercase">Admin Panel</p>
        </div>

        <div className="rounded-xl p-8" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(57,255,20,0.3)', boxShadow: '0 0 40px rgba(57,255,20,0.1)' }}>
          <div className="h-0.5 rounded-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }} />
          <h2 className="text-xl font-bold text-white mb-6">Admin Login</h2>

          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="mb-4 px-4 py-3 rounded border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Username</label>
              <input type="text" value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="Enter username"
                className="w-full border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-700 outline-none focus:border-green-neon transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter password"
                  className="w-full border border-white/10 rounded-lg px-4 py-3 pr-12 text-white text-sm placeholder-gray-700 outline-none focus:border-green-neon transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)' }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-neon text-xs transition-colors">
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="neon-btn w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><div className="w-4 h-4 border-2 border-green-neon/30 border-t-green-neon rounded-full animate-spin" />Authenticating...</> : 'Login →'}
            </button>
          </form>

          <div className="h-0.5 rounded-full mt-8" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }} />
          <p className="text-center text-gray-700 text-xs mt-4">🔒 Secured Admin Area</p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-700 text-sm hover:text-green-neon transition-colors">← Back to Portfolio</a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;