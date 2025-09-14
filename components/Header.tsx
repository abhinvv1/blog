'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b transition-colors duration-200 backdrop-blur supports-[backdrop-filter]:bg-opacity-60 dark:border-dark-700 dark:bg-dark-900/95 light:border-slate-200 light:bg-slate-50/95">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="text-xl font-bold transition-colors duration-200 dark:text-dark-100 dark:hover:text-primary-500 light:text-slate-900 light:hover:text-primary-600"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link text-sm font-medium transition-colors duration-200',
                  isActiveRoute(item.href) && 'active'
                )}
              >
                {item.name}
                {isActiveRoute(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Link
              href="/search"
              className={cn(
                'p-2 rounded-md transition-colors duration-200 dark:hover:bg-dark-800 light:hover:bg-slate-100',
                pathname === '/search' 
                  ? 'text-primary-500 dark:bg-dark-800 light:bg-slate-100' 
                  : 'dark:text-dark-400 light:text-slate-600'
              )}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-colors duration-200 dark:text-dark-400 dark:hover:text-dark-200 dark:hover:bg-dark-800 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md transition-colors duration-200 dark:text-dark-400 dark:hover:text-dark-200 dark:hover:bg-dark-800 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 dark:border-dark-700 light:border-slate-200">
            <nav className="flex flex-col space-y-3">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    isActiveRoute(item.href) && 'active dark:bg-dark-800 light:bg-slate-100'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
