export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  stats: { label: string; value: string }[];
  challenges: string[];
  solutions: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export interface Skill {
  name: string;
  level: number; // 0-100 for visual progress if needed
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  bullets: string[];
}

export interface Solution {
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
}

export interface FAQItem {
  question: string;
  answer: string;
}

