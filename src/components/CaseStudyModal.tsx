import { X, ExternalLink, Github, TrendingUp, Cpu, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div id="case-study-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        id="case-study-container"
        className="relative w-full max-w-4xl bg-brand-surface border border-white/15 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Banner Image */}
        <div className="relative h-48 sm:h-72 w-full overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover brightness-[0.65]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-black/40"></div>
          
          {/* Close button */}
          <button 
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-brand-primary transition-all duration-200 border border-white/10 hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Overlaid metadata */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs uppercase font-bold tracking-widest rounded border border-brand-primary/30">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold mt-2 text-white drop-shadow-md">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Intro & Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-lg font-display font-semibold text-brand-primary flex items-center gap-2">
                <Layers size={18} /> Project Architecture &amp; Overview
              </h3>
              <p className="text-sm sm:text-base text-brand-on-surface-variant leading-relaxed">
                {project.longDescription}
              </p>
            </div>
            
            {/* Impact Metrics Panel */}
            <div className="bg-brand-surface-container-low/60 border border-white/10 rounded-xl p-4 sm:p-5 space-y-4">
              <h4 className="text-xs font-display font-bold tracking-widest text-brand-tertiary uppercase flex items-center gap-1.5">
                <TrendingUp size={14} /> High-Impact Stats
              </h4>
              <div className="space-y-3">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <div className="text-xl sm:text-2xl font-display font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-brand-on-surface-variant/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack Used */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-semibold text-brand-secondary/90 flex items-center gap-2">
              <Cpu size={16} /> Technologies Leveraged
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="bg-brand-surface-container border border-white/5 px-3 py-1 rounded-full text-brand-primary font-medium text-xs tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            {/* Challenges */}
            <div className="space-y-4">
              <h4 className="text-base font-display font-semibold text-brand-error flex items-center gap-2">
                <HelpCircle size={18} className="text-brand-error" /> Engineering Challenges
              </h4>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start bg-brand-error-container/10 border border-brand-error/20 p-3 rounded-lg text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                    <span className="text-brand-error font-bold text-xs mt-0.5">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Solutions */}
            <div className="space-y-4">
              <h4 className="text-base font-display font-semibold text-green-400 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-400" /> Implemented Solutions
              </h4>
              <ul className="space-y-3">
                {project.solutions.map((sol, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                    <span className="text-green-400 font-bold text-xs mt-0.5">✓</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Case Study Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
            <span className="text-xs text-brand-on-surface-variant/60 font-mono">
              Designed &amp; Developed with precision by Suhas Borkar
            </span>
            <div className="flex gap-3">
              {project.links.github && (
                <a 
                  href={project.links.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-surface-container hover:bg-brand-surface-container-high text-brand-on-surface text-sm font-semibold rounded-xl border border-white/10 transition-colors"
                >
                  <Github size={16} /> Code Repository
                </a>
              )}
              {project.links.live && (
                <a 
                  href={project.links.live} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 btn-primary text-white text-sm font-bold rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <ExternalLink size={16} /> Launch App
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
