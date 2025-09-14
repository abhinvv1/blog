// Core types for the blog application

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: number;
  published: boolean;
  featured?: boolean;
  image?: string;
  author?: string;
  content?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  github?: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  nav: NavItem[];
  socialLinks: SocialLink[];
}

export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface SearchResult {
  type: 'post' | 'project';
  title: string;
  description: string;
  url: string;
  tags: string[];
  date?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}
