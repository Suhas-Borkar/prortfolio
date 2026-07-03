import { Project, Skill, Experience, Solution } from './types';

export const HERO_DATA = {
  name: "Suhas Borkar",
  title: "Full Stack Developer",
  badgeText: "Available for Work",
  description: "Full Stack Developer with 2.7+ years of experience delivering 22+ production applications across EdTech, FinTech, Real Estate, and Healthcare. Proficient in Angular, PHP/CodeIgniter, Python, AWS, and Docker.",
  stats: [
    { label: "Years Experience", value: "2.7+" },
    { label: "Projects Delivered", value: "22" },
    { label: "Client Portfolios", value: "22" },
    { label: "Commitment", value: "100%" }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "digitaltrainee-ecosystem",
    title: "DigitalTrainee Ecosystem",
    description: "Integrated platform consisting of CRM, LMS, student & trainer dashboards.",
    longDescription: "A massive, multi-portal education management ecosystem crafted for the DigitalTrainee platform, consisting of CRM, LMS, and separate interactive dashboards for students and trainers. Architected to support over 1,000 active users with real-time analytics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcRg2SDI-q9VZwHFGB32dL3tuHrjaTK6-MgUMgFVlYK4E3lIXdq3S4P6CjY6s2wKqYuRh071nONLQu4-dTn_MlizxuRq9hXq7ob0PRkDTnAgmVWDQQb5SxKqFIYsaotl_gqlNALfgXkzC8IrtVN00ZED6CxbSXlHeCM_7vGY7iu2QliQ8LM7Xqje1KZrYvPkOJFXC-ECslR4b9nmKc0d27iVjyVJMkjyzgec-Bb_3Uw5TtHopUDAIuLRLbYUTY_jy_iME-x4RlMbs",
    tags: ["Angular", "CodeIgniter 3", "MySQL", "AWS EC2", "RxJS"],
    category: "Full Stack & EdTech",
    stats: [
      { label: "Active Users", value: "1,000+" },
      { label: "Portals Integrated", value: "4" },
      { label: "Infrastructure Uptime", value: "99.9%" }
    ],
    challenges: [
      "Managing real-time synchronization of student and trainer activity logs across independent database instances.",
      "Overcoming slow page load speeds on heavy data tables containing student academic records."
    ],
    solutions: [
      "Created centralized RESTful PHP/CodeIgniter API backends combined with shared JWT authentication tokens.",
      "Implemented Angular lazy loading and RxJS state management to streamline data streams and optimize DOM render speeds."
    ],
    links: {
      live: "https://digitaltrainee.com",
      github: "https://github.com/Suhas-Borkar"
    }
  },
  {
    id: "roundexa",
    title: "Roundexa",
    description: "Premium digital transformation platform and corporate brand management engine.",
    longDescription: "A sophisticated corporate brand showcase and customer acquisition engine engineered for high-growth enterprises. Features custom lead routing algorithms, interactive agency portfolios, and highly dynamic service matrices.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgYdQswv8z71U7sflQCQhP3NNlrLTMBd3ED-cogVv7H2TFvfB1CbTtAJiVELVYI51D7ggBnqLz0Uo9BOyoDvDYLnDeAh0XCpMwpSzxrw5ojBebKO14zrvWPjsXdLMO0yaFdCQxtdPqBew_QoYOT_VYSO5uifaD_xA2PjIzex-DdyZFirx3eGyNG-Cj7lGcFkV6Ge25bdakgl54p_i41ua31wuYuAxOVfGJG-x8FFoRofWTlcG612hh_bdmLVZoDaLjoabKPF19zuE",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "REST API"],
    category: "Business & Agency",
    stats: [
      { label: "Platform Model", value: "SaaS & Showcase" },
      { label: "Lead Response Time", value: "< 2 mins" },
      { label: "Core Performance", value: "98% PageSpeed" }
    ],
    challenges: [
      "Optimizing complex interactive layouts and image-heavy brand showcases for mobile search engine indices.",
      "Handling real-time contact capturing and automated validation of client pipeline entries securely."
    ],
    solutions: [
      "Engineered a fully semantic, micro-formatted HTML schema using Next.js client optimization and optimized asset pipeline delivery.",
      "Implemented server-side sanitation filters in FastAPI and real-time validation via asynchronous REST APIs."
    ],
    links: {
      live: "https://roundexa.com",
      github: "https://github.com/Suhas-Borkar"
    }
  },
  {
    id: "digismart-manager",
    title: "DigiSmart Manager",
    description: "High-performance SaaS CRM fully containerized with automated CI/CD.",
    longDescription: "A comprehensive SaaS CRM application designed to assist agencies in handling lead funnels, customer relations, and business analytics. The system features custom dashboard metrics and a fully automated deployment cycle.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqib0S1JGNfUDwzAstq0VaaFaPISqZQ2b4jQE-_iDes_G5v_kzlSOmxAzXrfwAQLj8lFXEBMOfyKbOWxIkOl1aDrvahrpTXLS0ET6kUL3F88x9_IeQZXAwiGPxBYlNzLAb5X2EKQ0PxW_710O_aRTC3Kjo1djB3PqVf7dgA6r0IAUX0bhNqrxGzdvyUM1gJWzfVasBAnvLZU5-XOmhiFXQUCOHO8vXEsxL5qL44rqm61urIHM7pGWIkKYux6aaQqyNp4Ve-kUM3ww",
    tags: ["Angular", "PHP", "Docker", "GitHub Actions", "CI/CD"],
    category: "SaaS & DevOps",
    stats: [
      { label: "Manual Effort Reduction", value: "~70%" },
      { label: "Deployment Speed", value: "< 3 mins" },
      { label: "Platform Type", value: "SaaS CRM" }
    ],
    challenges: [
      "Resolving environment inconsistency across staging and production server setups.",
      "Manual testing and deployment took upwards of an hour per feature release, delaying updates."
    ],
    solutions: [
      "Completely containerized the Angular frontend and PHP backend using multi-stage Docker builds.",
      "Automated unit tests and production building using custom GitHub Actions workflows, deploying directly to secure environments."
    ],
    links: {
      live: "https://digismartmanager.com",
      github: "https://github.com/Suhas-Borkar"
    }
  }
];

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: "Angular", level: 95, category: "Frontend", icon: "Code2" },
  { name: "Next.js", level: 88, category: "Frontend", icon: "Layers" },
  { name: "RxJS", level: 90, category: "Frontend", icon: "Layers" },
  { name: "TypeScript", level: 92, category: "Frontend", icon: "ShieldAlert" },
  { name: "JavaScript (ES6+)", level: 95, category: "Frontend", icon: "Paintbrush" },
  { name: "HTML5 & CSS3", level: 96, category: "Frontend", icon: "Paintbrush" },
  { name: "Angular Material", level: 90, category: "Frontend", icon: "Layers" },
  { name: "jQuery", level: 85, category: "Frontend", icon: "Code2" },
  // Backend
  { name: "PHP", level: 93, category: "Backend", icon: "Terminal" },
  { name: "CodeIgniter 3", level: 95, category: "Backend", icon: "Server" },
  { name: "Python", level: 82, category: "Backend", icon: "Cpu" },
  { name: "Django", level: 80, category: "Backend", icon: "GitBranch" },
  { name: "FastAPI", level: 85, category: "Backend", icon: "Cpu" },
  { name: "REST API Design", level: 94, category: "Backend", icon: "Terminal" },
  // Database
  { name: "MySQL", level: 92, category: "Database", icon: "Database" },
  { name: "PostgreSQL", level: 88, category: "Database", icon: "Layers" },
  // Tools
  { name: "Docker", level: 88, category: "Tools", icon: "Container" },
  { name: "AWS (EC2/S3)", level: 86, category: "Tools", icon: "Cloud" },
  { name: "GitHub Actions", level: 90, category: "Tools", icon: "Zap" },
  { name: "Git & GitHub", level: 95, category: "Tools", icon: "GitCommit" }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Digitize Brand Pvt. Ltd.",
    location: "Pune, India",
    period: "June 2023 — Present",
    description: "Delivered 22 production websites across EdTech, FinTech, Real Estate, Healthcare, and Hospitality as the sole developer on most projects. Built and maintained 4 integrated portals serving 1,000+ active users.",
    bullets: [
      "Delivered 22 production websites across multiple domains as the sole developer on most projects.",
      "Architected Angular SPAs with RESTful PHP/CodeIgniter backends; implemented lazy loading and RxJS optimization for improved page load performance.",
      "Automated deployment pipelines using GitHub Actions + Docker, reducing manual deployment effort by ~70%.",
      "Managed cloud infrastructure on AWS EC2 with S3 for static assets, maintaining 99%+ uptime across all client projects.",
      "Owned full SDLC: requirement gathering, sprint planning, REST API design, JWT authentication, and post-launch support."
    ]
  }
];

export const SOLUTIONS_DATA: Solution[] = [
  {
    title: "Custom Software Development",
    description: "Bespoke, high-performance software systems engineered from the ground up to automate workflows and scale complex business models.",
    iconName: "Code",
    tags: ["SaaS", "Enterprise", "Automation"]
  },
  {
    title: "Web Development",
    description: "Bespoke web applications built with the latest frameworks for speed, security, and responsive scale.",
    iconName: "Monitor",
    tags: ["React", "Next.js", "Vite"]
  },
  {
    title: "API Architecture",
    description: "Robust and secure REST & GraphQL APIs designed with strict schemas for seamless integrations and high availability.",
    iconName: "Settings",
    tags: ["Express", "Node.js", "GraphQL"]
  },
  {
    title: "Performance Opt",
    description: "Lightning-fast load times, SEO-optimized structures, and smooth interactive frame rates using progressive audits.",
    iconName: "Zap",
    tags: ["Web Vitals", "Caching", "CDN"]
  },
  {
    title: "Cloud Solutions",
    description: "Deployment, monitoring, orchestration, and serverless scaling strategies on AWS, Vercel, and GCP.",
    iconName: "Cloud",
    tags: ["Docker", "S3", "Cloud Run"]
  },
  {
    title: "Security Audits",
    description: "In-depth reviews into application authentication, database queries, and injection vectors to patch vulnerabilities.",
    iconName: "Lock",
    tags: ["JWT", "CORS", "WAF"]
  },
  {
    title: "UI/UX Design Integration",
    description: "Converting complicated UX flows into beautifully detailed, highly tactile, responsive, and micro-animated interfaces.",
    iconName: "Palette",
    tags: ["Framer", "Aesthetics", "A11y"]
  }
];
