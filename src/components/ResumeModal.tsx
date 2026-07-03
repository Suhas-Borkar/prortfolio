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
        className="relative w-full max-w-4xl bg-brand-surface border border-brand-outline-variant/30 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col print:border-0 print:rounded-none print:shadow-none print:max-h-none print:bg-white print:text-black"
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
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-brand-on-surface print:text-black">
                  Suhas Borkar
                </h1>
                <p className="text-brand-primary text-base sm:text-lg font-medium mt-1 print:text-blue-800">
                  Full Stack Developer
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
                  <span>Pune, Maharashtra</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={12} className="text-brand-primary print:text-blue-800" />
                  <span>https://github.com/Suhas-Borkar</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
                  <Linkedin size={12} className="text-brand-primary print:text-blue-800" />
                  <span>https://in.linkedin.com/in/suhas-borkar</span>
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
              Full Stack Developer with 2.7+ years of experience delivering 22+ production applications across EdTech, FinTech, Real Estate, and Healthcare. Proficient in Angular, PHP/CodeIgniter, Python, AWS, and Docker. Experienced in REST API design, CI/CD automation (GitHub Actions), and cloud infrastructure management. Proven solo-developer track record with end-to-end ownership — from requirement gathering to post-launch support.
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
                    <h3 className="text-sm sm:text-base font-bold text-brand-on-surface print:text-black">
                      Full Stack Developer
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-brand-secondary/95 print:text-gray-800">
                      Digitize Brand Pvt. Ltd.
                    </p>
                  </div>
                  <span className="text-xs text-brand-on-surface-variant/80 font-mono print:text-gray-600 bg-brand-surface-container/40 px-2 py-0.5 rounded border border-white/5 print:border-0 print:bg-transparent">
                    June 2023 — Present
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant/90 italic mb-3 print:text-gray-700">
                  Delivered 22 production websites across EdTech, FinTech, Real Estate, Healthcare, and Hospitality as sole developer on most projects.
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-brand-on-surface-variant list-disc pl-4 print:text-gray-800">
                  <li>Delivered 22 production websites across multiple domains as the sole developer on most projects.</li>
                  <li>Built and maintained 4 integrated portals (CRM, LMS, Student & Trainer dashboards) under the DigitalTrainee platform, serving 1,000+ active users.</li>
                  <li>Architected Angular SPAs with RESTful PHP/CodeIgniter backends; implemented lazy loading and RxJS optimization for improved page load performance.</li>
                  <li>Automated deployment pipelines using GitHub Actions + Docker, reducing manual deployment effort by ~70%.</li>
                  <li>Managed cloud infrastructure on AWS EC2 with S3 for static assets, maintaining 99%+ uptime across all client projects.</li>
                  <li>Owned full SDLC: requirement gathering, sprint planning, REST API design, JWT authentication, and post-launch support.</li>
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
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">Angular, Next.js, Angular Material, RxJS, TypeScript, JavaScript (ES6+), HTML5, CSS3, jQuery</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-tertiary uppercase print:text-purple-800">Backend</h4>
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">PHP, CodeIgniter 3, Python, Django, FastAPI, REST API Design, JWT Authentication, AJAX, JSON</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-tertiary uppercase print:text-purple-800">Databases</h4>
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">MySQL, PostgreSQL</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-tertiary uppercase print:text-purple-800">Cloud &amp; Tools</h4>
                <p className="text-xs text-brand-on-surface-variant mt-1 print:text-gray-800">Docker, Docker Hub, AWS EC2, AWS S3, GitHub Actions, CI/CD Pipelines, Git, GitHub, Postman, VS Code</p>
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
                <h4 className="text-xs sm:text-sm font-bold text-brand-on-surface print:text-black">Bachelor of Commerce (B.Com)</h4>
                <p className="text-xs text-brand-on-surface-variant print:text-gray-700">Savitribai Phule Pune University • Graduated 2022 • CGPA 7.6 / 10</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xs font-display font-bold uppercase tracking-widest text-brand-primary print:text-blue-800 border-b border-white/5 pb-1 print:border-black/5">
                Certifications &amp; Learning
              </h3>
              <ul className="list-disc pl-4 text-xs text-brand-on-surface-variant space-y-1 print:text-gray-800">
                <li>AWS Certified Cloud Practitioner — In Progress / Planned</li>
                <li>Docker Fundamentals (Docker Inc.) — In Progress / Planned</li>
                <li>Angular Advanced Concepts — In Progress / Planned</li>
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
