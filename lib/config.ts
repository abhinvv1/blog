import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: "Your Name", // Replace with your actual name
  description: "Personal blog and portfolio - sharing thoughts on technology, programming, and software engineering.",
  url: "https://yourdomain.com", // Replace with your actual domain
  author: {
    name: "Your Name", // Replace with your actual name
    email: "your.email@example.com", // Replace with your actual email
    twitter: "yourusername", // Replace with your Twitter username (optional)
    github: "yourusername", // Replace with your GitHub username
    linkedin: "yourusername", // Replace with your LinkedIn username (optional)
  },
  nav: [
    {
      name: "Posts",
      href: "/posts",
    },
    {
      name: "Projects", 
      href: "/projects",
    },
    {
      name: "Tags",
      href: "/tags",
    },
    {
      name: "About",
      href: "/about",
    },
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername", // Replace with your GitHub URL
      icon: "github",
    },
    {
      name: "LinkedIn", 
      url: "https://linkedin.com/in/yourusername", // Replace with your LinkedIn URL
      icon: "linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername", // Replace with your Twitter URL
      icon: "twitter",
    },
    {
      name: "Reddit",
      url: "https://reddit.com/u/yourusername", // Replace with your Reddit URL
      icon: "reddit",
    },
  ],
};
