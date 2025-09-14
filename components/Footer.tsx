import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '@/lib/config';

// Custom Reddit icon component (since lucide-react doesn't have it)
const RedditIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

// Icon mapping for social links
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  reddit: RedditIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-700 bg-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-dark-400 text-sm">
            Copyright © {currentYear} | All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {siteConfig.socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              
              if (!IconComponent) return null;
              
              return (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-primary-500 transition-colors duration-200"
                  aria-label={`Visit ${link.name} profile`}
                >
                  <IconComponent className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Additional footer info - only shown on larger screens */}
        <div className="hidden md:block mt-6 pt-6 border-t border-dark-800">
          <div className="text-dark-500 text-xs text-center">
            Built with Next.js, TypeScript, and Tailwind CSS. 
            <span className="mx-2">•</span>
            Deployed on Vercel.
            <span className="mx-2">•</span>
            <Link 
              href="https://github.com/yourusername/blog-website" // Replace with your repo URL
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500 transition-colors duration-200"
            >
              View source code
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
