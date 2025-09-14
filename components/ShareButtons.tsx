'use client';

import React from 'react';
import { Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  author: string;
}

export function ShareButtons({ title, url, author }: ShareButtonsProps) {
  const shareText = `Check out "${title}" by ${author}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm"
      >
        <Twitter className="h-4 w-4" />
        <span>Tweet</span>
      </a>
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center space-x-2 bg-dark-800 hover:bg-dark-700 text-dark-200 px-4 py-2 rounded-md transition-colors duration-200 text-sm"
      >
        <span>Copy link</span>
      </button>
    </div>
  );
}
