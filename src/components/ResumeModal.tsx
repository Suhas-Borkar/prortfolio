import { X, Mail, MapPin, Globe, Linkedin, Github, Printer, Phone } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="resume-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
      <div 
        id="resume-modal-container"
        className="relative w-full max-w-4xl bg-brand-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col print:border-0 print:rounded-none print:shadow-none print:max-h-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls (Hidden in print) */}
        <div className="bg-brand-surface-container-low px-6 py-4 flex items-center justify-between border-b border-white/5 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary"></span>
            <span className="text-xs font-mono text-brand-on-surface-variant uppercase tracking-widest font-bold">Interactive CV</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              id="print-cv-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary text-xs font-bold rounded-lg border border-brand-primary/20 transition-all hover:scale-105"
            >
              <Printer size={13} /> Print/Save as PDF
            </button>
            <button 
              id="close-cv-btn"
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 text-brand-on-surface-variant hover:text-white rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-8 print:overflow-visible print:p-0 print:text-black bg-brand-bg/40 print:bg-white">
          
          {/* Header Section */}
          <div className="border-b border-white/10 pb-6 print:border-black/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white print:text-black">
                  Suhas Borkar
                </h1>
                <p className="text-brand-primary text-base sm:text-lg font-medium mt-1 print:text-blue-800">
                  Full Stack Developer &amp; Digital Architect
                </p>
              </div>
              
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-brand-on-surface-variant print:text-gray-700">
                <div className="flex items-center gap-1.5">
                  <Mail size={12} className="text-brand-primary print:text-blue-800" />
                  <a href="mailto:suhasborkar80@gmail.com" className="hover:text-brand-primary transition-colors">suhasborkar80@gmail.com</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-brand-primary print:text-blue-800" />
                  <a href="tel:+918698095892" className="hover:text-brand-primary transition-colors">+91 8698095892</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-brand-primary print:text-blue-800" />
                  <span>India (GMT +5:30)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={12} className="text-brand-primary print:text-blue-800" />
                  <span>suhasborkar.dev</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
                  <Linkedin size={12} className="text-brand-primary print:text-blue-800" />
                  <span>linkedin.com/in/suhasborkar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary print:text-blue-800 border-b border-white/5 pb-1 print:border-black/5">
              Executive Summary
            </h2>
            <p className="text-sm text-brand-on-surface-variant leading-relaxed print:text-gray-800">
              Passionate, detail-oriented Full Stack Developer with 4+ years of professional experience building high-performance web applications using React, Node.js, and modern cloud infrastructures. Proven track record of architecting scalable microservices, optimizing data pipelines, and implementing high-fidelity visual interfaces that translate customer requirements into business success.
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary print:text-blue-800 border-b border-white/5 pb-1 print:border-black/5">
              Professional Journey
            </h2>
            <div className="space-y-4">
              <div className="relative pl-4 border-l border-brand-primary/20 print:border-blue-800/20">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-brand-primary print:bg-blue-800"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white print:text-black">
                      Full Stack Developer
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-brand-secondary/95 print:text-gray-800">
                      DigitizeBrand Hub (India) Pvt Ltd
                    </p>
                  </div>
                  <span className="text-xs text-brand-on-surface-variant/80 font-mono print:text-gray-600 bg-brand-surface-container/40 px-2 py-0.5 rounded border border-white/5 print:border-0 print:bg-transparent">
                    2020 — Present
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant/90 italic mb-3 print:text-gray-700">
                  Lead MERN stack engineer directing visual, database, and logic workflows for high-frequency client applications.
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-brand-on-surface-variant list-disc pl-4 print:text-gray-800">
                  <li>Architected modular microservices architecture using Node.js, Express, and Amazon Web Services, resolving performance dropouts and cutting server operational costs by 22%.</li>
                  <li>Spearheaded performance tuning and progressive web app configurations for high-traffic business dashboards, optimizing rendering metrics by 40%.</li>
                  <li>Mentored a fast-growing team of 5 junior developers, establishing clean code patterns, rigorous code reviews, and robust TypeScript practices.</li>
                  <li>Implemented real-time transaction processing networks via Stripe, securing flawless conversion funnels for global audiences.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Skills Core */}
          <div className="space-y-3">
            <h2 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary print:text-blue-800 border-b border-white/5 pb-1 print:border-black/5">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="text-xs font-bold text-brand-tertiary uppercase print:text-purple-800">Frontend</h4>
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">React.js, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Framer Motion, HTML5, ES6+</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-tertiary uppercase print:text-purple-800">Backend</h4>
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">Node.js, Express, Python, GraphQL, REST APIs, Microservices, WebSockets, Socket.io</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-tertiary uppercase print:text-purple-800">Databases</h4>
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">MongoDB, PostgreSQL, Redis, Firebase Firestore, Firebase Authentication</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-tertiary uppercase print:text-purple-800">Cloud &amp; Tools</h4>
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">Docker, AWS, Git, CI/CD pipelines, Vercel, Google Cloud, Webpack, Vite</p>
              </div>
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary print:text-blue-800 border-b border-white/5 pb-1 print:border-black/5">
                Education
              </h3>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white print:text-black">Bachelor of Science in Computer Science</h4>
                <p className="text-xs text-brand-on-surface-variant print:text-gray-700">Pune University, India • Graduated First Class</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary print:text-blue-800 border-b border-white/5 pb-1 print:border-black/5">
                Key Accomplishments
              </h3>
              <ul className="list-disc pl-4 text-xs text-brand-on-surface-variant space-y-1 print:text-gray-800">
                <li>AWS Certified Solutions Architect Associate.</li>
                <li>Created custom open-source React dashboard elements with 500+ GitHub stars.</li>
                <li>Delivered 20+ enterprise-grade projects with 100% client satisfaction scores.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer print note */}
        <div className="bg-brand-surface-container px-6 py-4 text-center border-t border-white/5 print:hidden">
          <p className="text-[10px] text-brand-on-surface-variant/50 font-mono">
            Suhas Borkar — Full Stack Developer Portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
