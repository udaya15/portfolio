import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import CinematicWorks from './components/CinematicWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import './index.css';

function MainSite() {
  return (
    <div className="bg-black min-h-screen font-poppins">
      {/* Noise texture overlay for premium feel */}
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <CinematicWorks />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;