import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author.name} and their work in technology and software engineering.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-dark-400 mb-8">
        <span>Home</span>
        <span>{">"}</span>
        <span>About</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-dark-100 mb-8">About</h1>

      {/* Introduction */}
      <div className="space-y-6 text-dark-300 leading-relaxed">
        <p className="text-lg">
          Hi, thanks for visiting my website!
        </p>

        <p>
          My name is {siteConfig.author.name}. I am currently employed as a Staff Software 
          Engineer at Google, working on Google Cloud Applied AI. I have also 
          previously worked in engineering positions at places like Meta, Microsoft 
          and Google's X, the moonshot factory.
        </p>

        <p>
          This website is run in my free time and I hope you find the articles on it 
          useful. If you would like to connect, please use the social media links in 
          the bottom.
        </p>

        {/* Technical Details */}
        <div className="mt-12 p-6 bg-dark-800 border border-dark-700 rounded-lg">
          <p className="text-sm text-dark-400 italic">
            This website has been built with{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-400 underline"
            >
              Next.js
            </a>{' '}
            and uses the{' '}
            <a 
              href="https://tailwindcss.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-400 underline"
            >
              Tailwind CSS
            </a>{' '}
            framework for styling. Content is written in MDX format for rich formatting capabilities.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <h2 className="text-2xl font-semibold text-dark-100 mb-4">Get in Touch</h2>
          <p>
            Feel free to reach out if you'd like to discuss technology, collaborate on projects, 
            or just say hello. You can find me on the social platforms linked in the footer, 
            or send me an email at{' '}
            <a 
              href={`mailto:${siteConfig.author.email}`}
              className="text-primary-500 hover:text-primary-400 underline"
            >
              {siteConfig.author.email}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
