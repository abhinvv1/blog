'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Clock } from 'lucide-react';

interface ReadingProgressProps {
  readTime: number;
}

export function ReadingProgress({ readTime }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsVisible(scrollTop > 100); // Show after scrolling 100px
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    calculateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const estimatedTimeLeft = Math.max(0, Math.ceil(readTime * (1 - progress / 100)));

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      {/* Progress bar */}
      <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-400 transform origin-left transition-transform duration-150 ease-out" 
           style={{ transform: `scaleX(${progress / 100})` }} />
      
      {/* Reading stats */}
      <div className="dark:bg-dark-900/95 light:bg-slate-50/95 backdrop-blur-sm border-b dark:border-dark-700 light:border-slate-200 py-2">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between text-xs text-muted">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <BookOpen className="h-3 w-3" />
                <span>{Math.round(progress)}% complete</span>
              </div>
              {estimatedTimeLeft > 0 && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{estimatedTimeLeft} min left</span>
                </div>
              )}
            </div>
            <div className="text-primary-500 font-medium">
              {progress >= 100 ? 'Article completed!' : 'Keep reading...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
