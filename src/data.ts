import { Project, Skill, Experience, Solution } from './types';

export const HERO_DATA = {
  name: "Suhas Borkar",
  title: "Full Stack Developer & Digital Architect",
  badgeText: "Available for Work",
  description: "I build high-performance web applications with React, Node.js, and modern cloud architectures. Transforming complex problems into elegant digital experiences through technical precision and modern design.",
  stats: [
    { label: "Years Experience", value: "4+" },
    { label: "Projects Delivered", value: "20+" },
    { label: "Tech Stacks", value: "10+" },
    { label: "Commitment", value: "100%" }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "bi-dashboard",
    title: "Business Intelligence Dashboard",
    description: "Real-time data visualization platform for enterprise logistics management.",
    longDescription: "A comprehensive high-end business dashboard system built for monitoring global supply chain operations. It leverages dynamic microservices to query data streams, processes high-frequency telemetry, and displays sub-second visual updates for complex route logistics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcRg2SDI-q9VZwHFGB32dL3tuHrjaTK6-MgUMgFVlYK4E3lIXdq3S4P6CjY6s2wKqYuRh071nONLQu4-dTn_MlizxuRq9hXq7ob0PRkDTnAgmVWDQQb5SxKqFIYsaotl_gqlNALfgXkzC8IrtVN00ZED6CxbSXlHeCM_7vGY7iu2QliQ8LM7Xqje1KZrYvPkOJFXC-ECslR4b9nmKc0d27iVjyVJMkjyzgec-Bb_3Uw5TtHopUDAIuLRLbYUTY_jy_iME-x4RlMbs",
    tags: ["Next.js", "Chart.js", "TypeScript", "D3.js", "Tailwind"],
    category: "Frontend & Analytics",
    stats: [
      { label: "Active Operations", value: "1,200/min" },
      { label: "Data Latency", value: "< 150ms" },
      { label: "Client Render Time", value: "12ms" }
    ],
    challenges: [
      "Rendering thousands of live plotting points on SVG-based charts caused critical browser frame dropouts.",
      "Parsing real-time JSON web socket streams led to main-thread congestion."
    ],
    solutions: [
      "Optimized rendering pipeline using canvas-based layered graphs combined with RequestAnimationFrame rendering loops.",
      "Offloaded stream ingestion, compression, and mathematical calculations to Web Workers to ensure a 60fps interaction experience."
    ],
    links: {
      live: "https://example.com/demo-bi",
      github: "https://github.com/suhasborkar/bi-dashboard"
    }
  },
  {
    id: "nexus-ecommerce",
    title: "Nexus E-Commerce",
    description: "A headless commerce solution with ultra-fast checkout and product discovery.",
    longDescription: "A state-of-the-art e-commerce engine designed for high-end luxury products. Built on a modular headless framework, it incorporates serverless API integrations, lightning-quick pagination, layered elastic filters, and secure international gateways via Stripe Elements.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgYdQswv8z71U7sflQCQhP3NNlrLTMBd3ED-cogVv7H2TFvfB1CbTtAJiVELVYI51D7ggBnqLz0Uo9BOyoDvDYLnDeAh0XCpMwpSzxrw5ojBebKO14zrvWPjsXdLMO0yaFdCQxtdPqBew_QoYOT_VYSO5uifaD_xA2PjIzex-DdyZFirx3eGyNG-Cj7lGcFkV6Ge25bdakgl54p_i41ua31wuYuAxOVfGJG-x8FFoRofWTlcG612hh_bdmLVZoDaLjoabKPF19zuE",
    tags: ["React", "Stripe", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    stats: [
      { label: "Checkout Conversion", value: "+24%" },
      { label: "Page Load (LCP)", value: "0.8s" },
      { label: "API Response Time", value: "45ms" }
    ],
    challenges: [
      "Slow faceted search filters delayed product discovery and directly hurt customer retention.",
      "Race conditions occurred during sudden high-velocity stock updates during holiday events."
    ],
    solutions: [
      "Implemented server-side Elasticsearch index replication paired with Redis in-memory cache clustering.",
      "Designed a robust atomic inventory decrement protocol in MongoDB with retry mechanics to prevent overselling."
    ],
    links: {
      live: "https://example.com/demo-nexus",
      github: "https://github.com/suhasborkar/nexus-ecommerce"
    }
  },
  {
    id: "project-sync",
    title: "Project Sync Tool",
    description: "Collaborative workspace for agile teams with real-time updates.",
    longDescription: "A productivity and workspace planner incorporating a real-time collaborative white-board, Kanban board, and automated sprint metrics. Designed for fast-paced modern engineering units requiring seamless team synchronization.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqib0S1JGNfUDwzAstq0VaaFaPISqZQ2b4jQE-_iDes_G5v_kzlSOmxAzXrfwAQLj8lFXEBMOfyKbOWxIkOl1aDrvahrpTXLS0ET6kUL3F88x9_IeQZXAwiGPxBYlNzLAb5X2EKQ0PxW_710O_aRTC3Kjo1djB3PqVf7dgA6r0IAUX0bhNqrxGzdvyUM1gJWzfVasBAnvLZU5-XOmhiFXQUCOHO8vXEsxL5qL44rqm61urIHM7pGWIkKYux6aaQqyNp4Ve-kUM3ww",
    tags: ["Firebase", "Tailwind", "React", "WebSockets", "Vite"],
    category: "Productivity",
    stats: [
      { label: "Active Collaboration", value: "250+ users" },
      { label: "Sync Latency", value: "< 50ms" },
      { label: "Weekly Active Teams", value: "800+" }
    ],
    challenges: [
      "Resolving concurrent modifications to single task cards when multiple users edited descriptions simultaneously.",
      "Real-time visual flickering during aggressive socket-driven updates."
    ],
    solutions: [
      "Engineered a lightweight Operational Transformation (OT) conflict resolution algorithm on the client side.",
      "Utilized optimized state batching combined with structural shallow comparisons to completely eliminate UI flickering."
    ],
    links: {
      live: "https://example.com/demo-sync",
      github: "https://github.com/suhasborkar/project-sync"
    }
  }
];

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: "React.js", level: 95, category: "Frontend", icon: "Code2" },
  { name: "Next.js", level: 90, category: "Frontend", icon: "Layers" },
  { name: "TypeScript", level: 92, category: "Frontend", icon: "ShieldAlert" },
  { name: "Tailwind CSS", level: 96, category: "Frontend", icon: "Paintbrush" },
  // Backend
  { name: "Node.js", level: 88, category: "Backend", icon: "Terminal" },
  { name: "Express", level: 90, category: "Backend", icon: "Server" },
  { name: "Python", level: 80, category: "Backend", icon: "Cpu" },
  { name: "GraphQL", level: 82, category: "Backend", icon: "GitBranch" },
  // Database
  { name: "MongoDB", level: 85, category: "Database", icon: "Database" },
  { name: "PostgreSQL", level: 88, category: "Database", icon: "Layers" },
  { name: "Redis", level: 80, category: "Database", icon: "Activity" },
  { name: "Firebase", level: 90, category: "Database", icon: "CloudLightning" },
  // Tools
  { name: "Docker", level: 82, category: "Tools", icon: "Container" },
  { name: "AWS", level: 84, category: "Tools", icon: "Cloud" },
  { name: "Git & GitHub", level: 95, category: "Tools", icon: "GitCommit" },
  { name: "CI/CD Pipelines", level: 85, category: "Tools", icon: "Zap" }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "DigitizeBrand Hub (India) Pvt Ltd",
    location: "Pune, India",
    period: "2020 — Present",
    description: "Leading the development of scalable web applications using the MERN stack. Orchestrated high-traffic business dashboards and e-commerce solutions, optimizing performance by 40% through advanced caching strategies and frontend refactoring.",
    bullets: [
      "Architected modular microservices architecture using Node.js and AWS, reducing operational server costs by 22%.",
      "Mentored a team of 5 junior developers on best practices, clean testing strategies, and strict TypeScript code standards.",
      "Authored custom high-efficiency internal reusable component libraries using React, Tailwind CSS, and Framer Motion.",
      "Integrated secure multi-currency billing and checkout operations processing $12k+ in weekly transactions with near-zero error ratios."
    ]
  }
];

export const SOLUTIONS_DATA: Solution[] = [
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
