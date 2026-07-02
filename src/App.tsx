import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Layers, 
  ShieldAlert, 
  Paintbrush, 
  Terminal as TerminalIcon, 
  Server, 
  Cpu, 
  GitBranch, 
  Database, 
  Activity, 
  CloudLightning, 
  Zap, 
  Monitor, 
  Lock, 
  Palette, 
  Menu, 
  X, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Mail, 
  MapPin,
  Flame,
  Award
} from 'lucide-react';

import { HERO_DATA, PROJECTS_DATA, SKILLS_DATA, EXPERIENCE_DATA, SOLUTIONS_DATA } from './data';
import { Project, Skill } from './types';
import TerminalSimulator from './components/TerminalSimulator';
import CaseStudyModal from './components/CaseStudyModal';
import ResumeModal from './components/ResumeModal';
import ContactForm from './components/ContactForm';
import GitPage from './components/GitPage';

export default function App() {
  // Mobile navigation drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected project for Case Study modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Resume modal state
  const [resumeOpen, setResumeOpen] = useState(false);

  // Selected tab/page ('portfolio' | 'git')
  const [currentTab, setCurrentTab] = useState<'portfolio' | 'git'>('portfolio');

  // Skill category filter state
  const [activeSkillFilter, setActiveSkillFilter] = useState<'All' | 'Frontend' | 'Backend' | 'Database' | 'Tools'>('All');

  // Canvas background animation reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic glowing orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, radius: 180, dx: 0.4, dy: 0.3, color: 'rgba(77, 142, 255, 0.08)' }, // Primary Blue
      { x: width * 0.8, y: height * 0.7, radius: 220, dx: -0.3, dy: -0.2, color: 'rgba(208, 188, 255, 0.08)' }, // Tertiary Purple
      { x: width * 0.5, y: height * 0.2, radius: 150, dx: 0.2, dy: -0.4, color: 'rgba(6, 182, 212, 0.06)' }, // Cyan Accent
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      orbs.forEach((orb) => {
        // Update positions
        orb.x += orb.dx;
        orb.y += orb.dy;

        // Bounce walls
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > width) orb.dx *= -1;
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > height) orb.dy *= -1;

        // Draw radial gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filter skills based on tab
  const filteredSkills = SKILLS_DATA.filter(skill => {
    if (activeSkillFilter === 'All') return true;
    return skill.category === activeSkillFilter;
  });

  // Map icons dynamically
  const getSolutionIcon = (name: string) => {
    switch (name) {
      case 'Monitor': return <Monitor className="text-brand-primary" size={28} />;
      case 'Settings': return <Server className="text-brand-tertiary" size={28} />;
      case 'Zap': return <Zap className="text-brand-error" size={28} />;
      case 'Cloud': return <CloudLightning className="text-brand-primary-container" size={28} />;
      case 'Lock': return <Lock className="text-brand-primary" size={28} />;
      case 'Palette': return <Palette className="text-brand-tertiary" size={28} />;
      default: return <Code2 className="text-brand-primary" size={28} />;
    }
  };

  const getSkillIcon = (name: string) => {
    switch (name) {
      case 'Code2': return <Code2 size={16} />;
      case 'Layers': return <Layers size={16} />;
      case 'ShieldAlert': return <ShieldAlert size={16} />;
      case 'Paintbrush': return <Paintbrush size={16} />;
      case 'Terminal': return <TerminalIcon size={16} />;
      case 'Server': return <Server size={16} />;
      case 'Cpu': return <Cpu size={16} />;
      case 'GitBranch': return <GitBranch size={16} />;
      case 'Database': return <Database size={16} />;
      case 'Activity': return <Activity size={16} />;
      case 'CloudLightning': return <CloudLightning size={16} />;
      default: return <Code2 size={16} />;
    }
  };

  // Helper function to smooth scroll
  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setCurrentTab('portfolio');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="relative min-h-screen text-brand-on-surface selection:bg-brand-primary/30 selection:text-white">
      {/* Dynamic Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full -z-20 opacity-70 pointer-events-none"
      />

      {/* Decorative Blur circles */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-tertiary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Fixed Header / Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-brand-bg/65 backdrop-blur-xl border-b border-white/5 h-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          
          {/* Logo */}
          <button 
            id="nav-logo"
            onClick={() => handleScrollTo('hero')}
            className="font-display text-2xl font-bold tracking-tighter text-brand-primary hover:text-white transition-colors cursor-pointer"
          >
            SB
          </button>

          {/* Desktop Navigation Link items */}
          <div className="hidden md:flex items-center gap-10">
            <button 
              id="nav-work-btn"
              onClick={() => handleScrollTo('work')} 
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors text-sm font-medium tracking-wide cursor-pointer"
            >
              Work
            </button>
            <button 
              id="nav-skills-btn"
              onClick={() => handleScrollTo('skills')} 
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors text-sm font-medium tracking-wide cursor-pointer"
            >
              Skills
            </button>
            <button 
              id="nav-experience-btn"
              onClick={() => handleScrollTo('experience')} 
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors text-sm font-medium tracking-wide cursor-pointer"
            >
              Experience
            </button>
            <button 
              id="nav-services-btn"
              onClick={() => handleScrollTo('services')} 
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors text-sm font-medium tracking-wide cursor-pointer"
            >
              Services
            </button>
            <button 
              id="nav-git-btn"
              onClick={() => { setCurrentTab('git'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`transition-colors text-sm font-medium tracking-wide cursor-pointer ${currentTab === 'git' ? 'text-brand-primary font-bold' : 'text-brand-on-surface-variant hover:text-brand-primary'}`}
            >
              Git Engine
            </button>
            
            <button 
              id="nav-talk-btn"
              onClick={() => handleScrollTo('contact')}
              className="btn-primary px-6 py-2.5 rounded-full text-white font-bold text-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-lg"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <button 
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-primary hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-drawer" className="absolute top-20 left-0 w-full bg-brand-surface-container-lowest/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in md:hidden shadow-2xl z-50">
            <button 
              id="mob-nav-work-btn"
              onClick={() => handleScrollTo('work')} 
              className="text-left py-2 text-brand-on-surface hover:text-brand-primary text-base font-semibold border-b border-white/5"
            >
              Work
            </button>
            <button 
              id="mob-nav-skills-btn"
              onClick={() => handleScrollTo('skills')} 
              className="text-left py-2 text-brand-on-surface hover:text-brand-primary text-base font-semibold border-b border-white/5"
            >
              Skills
            </button>
            <button 
              id="mob-nav-experience-btn"
              onClick={() => handleScrollTo('experience')} 
              className="text-left py-2 text-brand-on-surface hover:text-brand-primary text-base font-semibold border-b border-white/5"
            >
              Experience
            </button>
            <button 
              id="mob-nav-services-btn"
              onClick={() => handleScrollTo('services')} 
              className="text-left py-2 text-brand-on-surface hover:text-brand-primary text-base font-semibold border-b border-white/5"
            >
              Services
            </button>
            <button 
              id="mob-nav-git-btn"
              onClick={() => { setMobileMenuOpen(false); setCurrentTab('git'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-left py-2 text-base font-semibold border-b border-white/5 ${currentTab === 'git' ? 'text-brand-primary' : 'text-brand-on-surface hover:text-brand-primary'}`}
            >
              Git Engine
            </button>
            <button 
              id="mob-nav-talk-btn"
              onClick={() => handleScrollTo('contact')}
              className="btn-primary w-full py-3 rounded-xl text-center text-white font-bold text-sm mt-2 shadow-lg"
            >
              Let's Talk
            </button>
          </div>
        )}
      </nav>

      {/* Main Container spacing for fixed nav */}
      <main className="relative z-10 pt-20">

        <AnimatePresence mode="wait">
          {currentTab === 'git' ? (
            <motion.div 
              key="git"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-6 py-12"
            >
              <GitPage />
            </motion.div>
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <section id="hero" className="min-h-[calc(100vh-80px)] flex items-center px-6 max-w-7xl mx-auto py-12 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
              
              {/* Hero details */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
              {/* Hiring Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-primary-container/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                <span className="text-brand-primary text-xs font-semibold tracking-wider uppercase font-display">{HERO_DATA.badgeText}</span>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-none text-white">
                  Hi, I'm <span className="gradient-text">{HERO_DATA.name}</span>
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-brand-on-surface-variant">
                  {HERO_DATA.title}
                </h2>
              </div>

              {/* Bio paragraph */}
              <p className="text-sm sm:text-base lg:text-lg text-brand-on-surface-variant/90 max-w-xl leading-relaxed">
                {HERO_DATA.description}
              </p>

              {/* Buttons panel */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  id="hero-view-projects-btn"
                  onClick={() => handleScrollTo('work')}
                  className="btn-primary px-8 py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  View Projects
                </button>
                <button 
                  id="hero-resume-btn"
                  onClick={() => setResumeOpen(true)}
                  className="glass-card px-8 py-3.5 rounded-xl text-brand-primary hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/10 hover:bg-brand-primary/5 cursor-pointer"
                >
                  <FileText size={16} /> Interactive CV
                </button>
              </div>
            </motion.div>

            {/* Editor Terminal widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <TerminalSimulator />
            </motion.div>
          </div>
        </section>

        {/* Quick Stats Grid Section */}
        <section id="stats" className="py-12 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {HERO_DATA.stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center border border-white/5 relative group overflow-hidden"
              >
                {/* Micro particle background glow */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand-primary/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black gradient-text mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-brand-on-surface-variant/80 font-medium font-sans">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Arsenal (Skills Matrix) Section */}
        <section id="skills" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Technical <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-on-surface-variant">
              Engineered with specialized skillsets across modern technology quadrants to secure high-performance delivery.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {(['All', 'Frontend', 'Backend', 'Database', 'Tools'] as const).map((cat) => (
                <button 
                  id={`skill-filter-btn-${cat.toLowerCase()}`}
                  key={cat}
                  onClick={() => setActiveSkillFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                    activeSkillFilter === cat 
                      ? 'bg-brand-primary/20 text-brand-primary border-brand-primary/30 font-bold' 
                      : 'bg-brand-surface-container/40 text-brand-on-surface-variant border-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredSkills.map((skill, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                key={skill.name} 
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-brand-primary/30 flex flex-col justify-between group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-surface-container flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 group-hover:text-brand-tertiary transition-all">
                    {getSkillIcon(skill.icon)}
                  </div>
                  <span className="font-display font-bold text-sm sm:text-base text-white">{skill.name}</span>
                </div>

                {/* Progress Visual Level indicator */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-brand-on-surface-variant/60">
                    <span>PROFICIENCY</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-brand-surface-container-highest/60 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-primary to-brand-tertiary rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience / Timeline Section */}
        <section id="experience" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Award size={20} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Professional <span className="gradient-text">Journey</span>
              </h2>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Glowing Indicator Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-brand-bg border-4 border-brand-primary ring-4 ring-brand-primary/10 group-hover:scale-125 group-hover:border-brand-tertiary transition-all duration-300"></div>
                  
                  {/* Experience Card */}
                  <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-brand-secondary">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-brand-on-surface-variant font-medium bg-brand-surface-container/60 px-3.5 py-1.5 rounded-full border border-white/5 self-start sm:self-auto">
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-brand-on-surface-variant leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs font-display font-bold uppercase tracking-widest text-brand-tertiary">Key Accomplishments &amp; Impact:</h4>
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-3 items-start text-xs sm:text-sm text-brand-on-surface-variant/90 leading-relaxed">
                            <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Creations (Portfolio Projects) Section */}
        <section id="work" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Featured <span className="gradient-text">Creations</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-on-surface-variant">
              An inspection into recent systems and high-end digital solutions designed to optimize commercial value.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group border border-white/5 flex flex-col justify-between"
              >
                <div>
                  {/* Image wrapper */}
                  <div className="relative h-56 sm:h-60 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Metadata & Description */}
                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tags.slice(0, 2).map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[10px] uppercase font-bold tracking-widest bg-brand-primary/10 border border-brand-primary/15 text-brand-primary px-2.5 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-on-surface-variant/90 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Case Study Actions trigger */}
                <div className="px-6 pb-6 pt-2">
                  <button 
                    id={`view-case-study-${project.id}`}
                    onClick={() => setSelectedProject(project)}
                    className="text-brand-primary font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group/link"
                  >
                    View Case Study 
                    <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comprehensive Solutions Section */}
        <section id="services" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Comprehensive <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-on-surface-variant">
              Professional full-cycle engineering services delivered with maximum velocity, strict security, and visual excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SOLUTIONS_DATA.map((solution, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/10 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-surface-container flex items-center justify-center text-brand-primary group-hover:scale-105 group-hover:bg-brand-primary/5 transition-all">
                    {getSolutionIcon(solution.iconName)}
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-primary transition-colors">
                    {solution.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                {/* Sub tags */}
                <div className="flex flex-wrap gap-1.5 pt-6 border-t border-white/5 mt-6">
                  {solution.tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-brand-on-surface-variant/70 bg-brand-surface-container px-2 py-0.5 rounded border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack Infinite scrolling Banner */}
        <section id="tech-scroller" className="py-12 overflow-hidden border-y border-white/5 bg-brand-surface-container-lowest/30 relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />
          
          <div className="flex select-none whitespace-nowrap overflow-hidden">
            {/* Repeated sets for seamless infinite loop */}
            <div className="flex gap-16 items-center animate-scroll pr-16 text-xl sm:text-2xl font-display font-extrabold tracking-widest text-brand-on-surface-variant/20 hover:text-brand-primary/60 transition-all">
              <span>REACT</span>
              <span>NODE.JS</span>
              <span>TYPESCRIPT</span>
              <span>MONGODB</span>
              <span>DOCKER</span>
              <span>AWS</span>
              <span>NEXT.JS</span>
              <span>GRAPHQL</span>
              <span>POSTGRESQL</span>
              <span>FIREBASE</span>
            </div>
            <div className="flex gap-16 items-center animate-scroll pr-16 text-xl sm:text-2xl font-display font-extrabold tracking-widest text-brand-on-surface-variant/20 hover:text-brand-primary/60 transition-all" aria-hidden="true">
              <span>REACT</span>
              <span>NODE.JS</span>
              <span>TYPESCRIPT</span>
              <span>MONGODB</span>
              <span>DOCKER</span>
              <span>AWS</span>
              <span>NEXT.JS</span>
              <span>GRAPHQL</span>
              <span>POSTGRESQL</span>
              <span>FIREBASE</span>
            </div>
          </div>
        </section>

            {/* Interactive Contact & Inquiries Panel */}
            <motion.section 
              id="contact" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20"
            >
              <ContactForm />
            </motion.section>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="bg-brand-surface-container-lowest border-t border-white/5 w-full py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold tracking-tighter text-brand-primary">SB</span>
            <span className="h-4 w-px bg-white/10 hidden sm:block"></span>
            <p className="text-xs text-brand-on-surface-variant/70 font-sans hidden sm:block">
              © 2026 Suhas Borkar. Crafted with digital precision.
            </p>
          </div>

          <p className="text-xs text-brand-on-surface-variant/60 font-sans text-center sm:hidden">
            © 2026 Suhas Borkar. Crafted with digital precision.
          </p>

          {/* Social Icons & CV jump */}
          <div className="flex flex-wrap items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Github size={14} /> Github
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Twitter size={14} /> Twitter
            </a>
            <button 
              id="footer-resume-btn"
              onClick={() => setResumeOpen(true)}
              className="text-brand-primary hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <FileText size={14} /> View CV
            </button>
          </div>

        </div>
      </footer>

      {/* Modals Containers */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />

    </div>
  );
}
