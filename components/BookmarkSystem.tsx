'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';

interface BookmarkSystemProps {
  postSlug: string;
  postTitle: string;
}

export function BookmarkSystem({ postSlug, postTitle }: BookmarkSystemProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.some((b: any) => b.slug === postSlug));
  }, [postSlug]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((b: any) => b.slug !== postSlug);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const newBookmark = {
        slug: postSlug,
        title: postTitle,
        timestamp: new Date().toISOString(),
      };
      bookmarks.push(newBookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
        isBookmarked
          ? 'bg-primary-500 text-white hover:bg-primary-600'
          : 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <Bookmark className="h-4 w-4 fill-current" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
    </button>
  );
}
