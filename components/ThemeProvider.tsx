'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage only once on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      setTheme(stored);
    } else {
      // Check system preference if no stored theme
      const systemPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemPrefers);
      localStorage.setItem('theme', systemPrefers);
    }
    setMounted(true);
  }, []); // Empty dependency array - runs only once

  // Update localStorage and DOM when theme changes (but not on mount)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
