import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: "Abhinav",
  description: "Blog and portfolio - sharing thoughts on technology, programming, and software engineering.",
  url: "https://blog-sandy-pi-45.vercel.app/",
  author: {
    name: "Abhinav",
    email: "abhinav.1e4@gmail.com",
    twitter: "pixelcaliber",
    github: "pixelcaliber",
    linkedin: "abhinav-pandey",
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
      url: "https://github.com/pixelcaliber",
      icon: "github",
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/abhinav-pandey-487989215",
      icon: "linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/pixelcaliber",
      icon: "twitter",
    },
    {
      name: "Reddit",
      url: "https://reddit.com/u/pixelcaliber",
      icon: "reddit",
    },
  ],
};
