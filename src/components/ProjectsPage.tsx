import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Search, 
  Laptop, 
  Tablet, 
  Smartphone, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Check, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Briefcase, 
  Home, 
  Activity, 
  Info, 
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Clock
} from 'lucide-react';

interface ClientProject {
  name: string;
  url: string;
  category: 'EdTech & Learning' | 'Portals & SaaS' | 'Business & Agency' | 'Real Estate & Hospitality' | 'Finance & Healthcare';
  description: string;
  tech: string[];
}

const LIVE_PROJECTS: ClientProject[] = [
  // EdTech & Learning
  { 
    name: "digitaltrainee.com", 
    url: "https://digitaltrainee.com", 
    category: "EdTech & Learning", 
    description: "Premium learning hub for professional digital training courses and certifications.",
    tech: ["Angular", "PHP", "CodeIgniter", "MySQL", "AWS EC2"]
  },
  { 
    name: "vidyatirth.com", 
    url: "https://vidyatirth.com", 
    category: "EdTech & Learning", 
    description: "Holistic academic courses learning portal for high school and pre-college students.",
    tech: ["Angular", "PHP", "MySQL", "Responsive CSS"]
  },
  { 
    name: "mentortechsystems.com", 
    url: "https://mentortechsystems.com", 
    category: "EdTech & Learning", 
    description: "Corporate technical mentorship systems and software training program dashboard.",
    tech: ["Angular", "PHP", "REST APIs", "Tailwind CSS"]
  },
  { 
    name: "planetofautomation.com", 
    url: "https://planetofautomation.com", 
    category: "EdTech & Learning", 
    description: "Comprehensive industrial automation training Academy website and seminar logs.",
    tech: ["Angular", "PHP", "CodeIgniter", "MySQL"]
  },
  { 
    name: "iitiansacademypune.in", 
    url: "https://iitiansacademypune.in", 
    category: "EdTech & Learning", 
    description: "JEE & NEET entrance coaching institute platform with test registrations and results.",
    tech: ["Angular", "PHP", "MySQL", "Bootstrap"]
  },
  // Portals & SaaS
  { 
    name: "crm.digitaltrainee.in", 
    url: "https://crm.digitaltrainee.in", 
    category: "Portals & SaaS", 
    description: "Internal custom CRM platform for lead routing, agent follow-ups, and sales tracking.",
    tech: ["Angular", "PHP/CodeIgniter", "MySQL", "JWT Session Management"]
  },
  { 
    name: "students.digitaltrainee.in", 
    url: "https://students.digitaltrainee.in", 
    category: "Portals & SaaS", 
    description: "Dynamic portal for student profile management, batch schedule, task lists, and grades.",
    tech: ["Angular", "PHP/CodeIgniter", "MySQL", "REST API", "RxJS"]
  },
  { 
    name: "trainer.digitaltrainee.in", 
    url: "https://trainer.digitaltrainee.in", 
    category: "Portals & SaaS", 
    description: "Trainer dashboard to track student batches, lecture plans, mark sheets, and attendance.",
    tech: ["Angular", "PHP/CodeIgniter", "MySQL", "REST API", "JSON Data Modeling"]
  },
  { 
    name: "digismartmanager.com", 
    url: "https://digismartmanager.com", 
    category: "Portals & SaaS", 
    description: "High-performance SaaS CRM for lead pipeline, task scheduling, and operations tracking.",
    tech: ["Angular", "PHP/CodeIgniter", "Docker Containerized", "GitHub Actions"]
  },
  // Business & Agency
  { 
    name: "roundexa.com", 
    url: "https://roundexa.com", 
    category: "Business & Agency", 
    description: "Premium digital transformation platform and corporate brand management engine.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis"]
  },
  { 
    name: "assyndicate.com", 
    url: "https://www.assyndicate.com/", 
    category: "Business & Agency", 
    description: "Premium enterprise syndicate portal, brand management systems, and business consulting suite.",
    tech: ["Next.js", "Remote MySQL", "Tailwind CSS", "REST API"]
  },
  { 
    name: "digitizebrand.com", 
    url: "https://digitizebrand.com", 
    category: "Business & Agency", 
    description: "Full-scale corporate website representing digital agency services, case studies, and quote generators.",
    tech: ["Angular", "PHP", "Custom Responsive Layout", "SEO Optimized"]
  },
  { 
    name: "gnstechnologies.in", 
    url: "https://gnstechnologies.in/", 
    category: "Business & Agency", 
    description: "Professional IT services, corporate training & cloud infrastructure consultant landing page.",
    tech: ["Angular", "PHP", "MySQL", "Material UI"]
  },
  { 
    name: "acgrindia.com", 
    url: "https://acgrindia.com", 
    category: "Business & Agency", 
    description: "Corporate consultation, governance framework advisory, and compliance reports portal.",
    tech: ["Angular", "PHP", "MySQL", "REST APIs"]
  },
  { 
    name: "registervyapar.com", 
    url: "https://registervyapar.com", 
    category: "Business & Agency", 
    description: "Online corporate setup, business licenses filings, and legal registrations dashboard.",
    tech: ["Angular", "PHP", "MySQL", "Payment Webhooks"]
  },
  { 
    name: "bizregistro.com", 
    url: "https://bizregistro.com", 
    category: "Business & Agency", 
    description: "Company incorporation & business registration SaaS portal with simplified filing wizards.",
    tech: ["Angular", "PHP", "MySQL", "Responsive Design"]
  },
  // Real Estate & Hospitality
  { 
    name: "muhomes.in", 
    url: "https://muhomes.in", 
    category: "Real Estate & Hospitality", 
    description: "Modern real estate listing search platform matching property buyers with verified premium realtors.",
    tech: ["Angular", "PHP", "MySQL", "Advanced Filters", "Location Mapping"]
  },
  { 
    name: "bhartiresort.com", 
    url: "https://bhartiresort.com", 
    category: "Real Estate & Hospitality", 
    description: "Luxury resort guest booking portal with pricing lists, interactive photo galleries, and reviews.",
    tech: ["Angular", "PHP", "MySQL", "Online Reservation Forms"]
  },
  { 
    name: "captainnileshholidays.com", 
    url: "https://captainnileshholidays.com", 
    category: "Real Estate & Hospitality", 
    description: "Leisure tour package selector, custom vacation itineraries planner, and booking engine.",
    tech: ["Angular", "PHP", "MySQL", "Customer Feedback Management"]
  },
  // Finance & Healthcare
  { 
    name: "bhartisharemarket.com", 
    url: "https://bhartisharemarket.com", 
    category: "Finance & Healthcare", 
    description: "Financial literacy platform providing stock market analysis, live CMS blogs, and training packages.",
    tech: ["Angular", "PHP", "MySQL", "Real-Time CMS Engine"]
  },
  { 
    name: "365pharmacyhub.com", 
    url: "https://365pharmacyhub.com", 
    category: "Finance & Healthcare", 
    description: "Online medical healthcare marketplace, prescription uploading engine, and pharmacy admin CRM.",
    tech: ["Angular", "PHP", "MySQL", "Order Tracking Management"]
  },
  { 
    name: "royalrider.in", 
    url: "https://royalrider.in", 
    category: "Finance & Healthcare", 
    description: "Leisure premium automobile rentals, travel booking system, and fleet management dashboard.",
    tech: ["Angular", "PHP", "MySQL", "Fleet Schedule Engine"]
  }
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ClientProject>(LIVE_PROJECTS[0]);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Filter categories
  const categories = ['All', 'EdTech & Learning', 'Portals & SaaS', 'Business & Agency', 'Real Estate & Hospitality', 'Finance & Healthcare'];

  const filteredProjects = LIVE_PROJECTS.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedProject.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reloadIframe = () => {
    setIframeLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = selectedProject.url;
    }
  };

  useEffect(() => {
    setIframeLoading(true);
  }, [selectedProject]);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'EdTech & Learning': return <BookOpen size={14} />;
      case 'Portals & SaaS': return <Layers size={14} />;
      case 'Business & Agency': return <Briefcase size={14} />;
      case 'Real Estate & Hospitality': return <Home size={14} />;
      case 'Finance & Healthcare': return <Activity size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Live Sandbox <span className="gradient-text">&amp; Demos</span>
          </h1>
          <p className="text-brand-on-surface-variant/90 text-sm sm:text-base mt-2 max-w-2xl">
            Explore 22 live production apps designed, developed, and deployed by Suhas. Interact with live sites directly in the responsive sandbox simulator below.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-brand-surface-container/50 border border-white/5 p-1.5 rounded-2xl">
          <div className="flex flex-col text-right px-3 py-1">
            <span className="text-xs text-brand-on-surface-variant/60 uppercase tracking-wider font-mono">Live Portfolio</span>
            <span className="text-sm font-bold text-brand-primary">22 Active Deployments</span>
          </div>
          <div className="p-2.5 bg-brand-primary-container/10 border border-brand-primary/20 text-brand-primary rounded-xl">
            <Globe className="animate-spin-slow" size={20} />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Iframe Simulator */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Project Navigation Sidebar (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-on-surface-variant/60" size={16} />
              <input 
                type="text" 
                placeholder="Search live domains or tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-brand-bg/80 border border-brand-outline-variant/30 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-brand-on-surface placeholder:text-brand-on-surface-variant/50 focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
            </div>

            {/* Category Pills Slider */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-brand-primary text-white font-semibold' 
                      : 'bg-brand-surface-container/40 text-brand-on-surface-variant hover:bg-brand-surface-container hover:text-white'
                  }`}
                >
                  {cat !== 'All' && getCategoryIcon(cat)}
                  <span>{cat === 'All' ? 'All Sites' : cat.split(' & ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards List */}
          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => {
                  const isSelected = selectedProject.name === project.name;
                  return (
                    <motion.button
                      layout
                      key={project.name}
                      onClick={() => {
                        setSelectedProject(project);
                        setIframeLoading(true);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all relative group cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-primary-container/10 border-brand-primary shadow-lg shadow-brand-primary/5' 
                          : 'bg-brand-surface-container/30 border-white/5 hover:border-brand-primary/30 hover:bg-brand-surface-container/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-brand-tertiary bg-brand-tertiary/10 px-2 py-0.5 rounded-full uppercase">
                            {getCategoryIcon(project.category)}
                            {project.category}
                          </span>
                          <h3 className="font-semibold text-sm sm:text-base text-brand-on-surface group-hover:text-brand-primary transition-colors mt-1 flex items-center gap-1.5">
                            {project.name}
                            <ArrowRight size={14} className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${isSelected ? 'opacity-100 translate-x-0 text-brand-primary' : ''}`} />
                          </h3>
                        </div>
                        <Globe size={16} className={`shrink-0 ${isSelected ? 'text-brand-primary' : 'text-brand-on-surface-variant/40'}`} />
                      </div>

                      <p className="text-xs text-brand-on-surface-variant/90 mt-2 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] bg-brand-bg/60 border border-white/5 text-brand-on-surface-variant/80 px-2 py-0.5 rounded font-mono">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[10px] bg-brand-bg/60 border border-white/5 text-brand-on-surface-variant/60 px-1.5 py-0.5 rounded font-mono">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-brand-surface-container/10 rounded-2xl border border-white/5">
                  <p className="text-sm text-brand-on-surface-variant/60">No projects found matching your search</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                    className="mt-3 text-xs text-brand-primary font-bold hover:underline"
                  >
                    Clear Search &amp; Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar CTA Card */}
          <div className="glass-card p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-brand-primary-container/5 via-transparent to-brand-tertiary/5 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest">WANT A CUSTOM PORTAL?</span>
              <h4 className="font-display font-bold text-sm text-brand-on-surface">Let's Build Your Project</h4>
              <p className="text-xs text-brand-on-surface-variant leading-relaxed">
                Need a highly optimized portal or business application built for maximum scale? Let's consult.
              </p>
            </div>
            <button
              onClick={() => {
                const event = new CustomEvent('suhas_open_enquiry', { detail: { subject: `Custom Portal Development inquiry` } });
                window.dispatchEvent(event);
              }}
              className="w-full py-2.5 bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary/20 text-brand-primary hover:text-brand-on-surface dark:hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Start Instant Enquiry
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Web Frame Sandbox (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 flex flex-col relative">
            
            {/* Address Bar Controls */}
            <div className="bg-brand-surface-container-lowest/80 border-b border-white/5 px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 z-10">
              
              {/* Traffic Lights & Selected Domain */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
                
                {/* Simulated URL Input */}
                <div className="flex-1 flex items-center justify-between gap-2 bg-brand-bg border border-brand-outline-variant/30 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs text-brand-on-surface-variant font-mono overflow-hidden">
                  <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
                    <Globe size={11} className="text-brand-primary shrink-0" />
                    <span className="text-brand-on-surface font-medium truncate select-all">{selectedProject.url}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      onClick={handleCopy}
                      className="p-1 hover:bg-white/10 rounded text-brand-on-surface-variant hover:text-brand-on-surface dark:hover:text-white transition-colors"
                      title="Copy URL"
                    >
                      {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    </button>
                    <button 
                      onClick={reloadIframe}
                      className="p-1 hover:bg-white/10 rounded text-brand-on-surface-variant hover:text-brand-on-surface dark:hover:text-white transition-all active:rotate-180"
                      title="Reload sandbox"
                    >
                      <RefreshCw size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* External Actions */}
              <div className="flex items-center justify-end gap-3 shrink-0">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-brand-primary hover:bg-brand-primary-container text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <span>Open Live Site</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Sandbox Notice / Security warning for iframes */}
            <div className="bg-brand-primary-container/5 border-b border-white/5 px-4 py-2.5 text-xs text-brand-on-surface-variant/80 flex items-center gap-2">
              <Info size={14} className="text-brand-primary shrink-0" />
              <p className="leading-tight">
                Some cloud hosting providers block live embedding. If the sandbox below stays blank, click <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="text-brand-primary font-semibold underline hover:text-brand-on-surface dark:hover:text-white transition-colors">Open Live Site</a> to view it securely!
              </p>
            </div>

            {/* Simulated Workspace Viewport Container */}
            <div className="bg-brand-bg/50 p-2 sm:p-6 flex justify-center items-center overflow-hidden min-h-[400px] sm:min-h-[500px]">
              
              <motion.div
                layout
                className="relative shadow-2xl transition-all duration-300 w-full h-[400px] sm:h-[580px] rounded-2xl overflow-hidden border border-white/10"
              >
                {/* Loading overlay */}
                {iframeLoading && (
                  <div className="absolute inset-0 bg-brand-bg/95 flex flex-col justify-center items-center z-10 space-y-4">
                    <div className="relative flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                      <Globe size={18} className="absolute text-brand-primary animate-pulse" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xs text-brand-on-surface font-mono">Routing to secure endpoint...</p>
                      <p className="text-[10px] text-brand-on-surface-variant/60">{selectedProject.name}</p>
                    </div>
                  </div>
                )}

                {/* Iframe View */}
                <iframe
                  ref={iframeRef}
                  src={selectedProject.url}
                  className="w-full h-full bg-white transition-all"
                  onLoad={() => setIframeLoading(false)}
                  title={`Live Demo of ${selectedProject.name}`}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>

          {/* Quick Technical Summary Card */}
          <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-3">
            <h4 className="font-semibold text-sm text-brand-on-surface flex items-center gap-1.5">
              <Sparkles size={14} className="text-brand-primary" />
              Technical Overview: {selectedProject.name}
            </h4>
            <p className="text-xs text-brand-on-surface-variant leading-relaxed">
              {selectedProject.description} Designed with maximum optimization and visual consistency, utilizing {selectedProject.tech.join(', ')}. Engineered with security practices like JWT session states and RESTful API structures.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedProject.tech.map((t) => (
                <span key={t} className="text-[10px] bg-brand-primary-container/10 border border-brand-primary/20 text-brand-primary px-2.5 py-0.5 rounded-full font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
