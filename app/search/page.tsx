import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import { SearchComponent } from '@/components/SearchComponent';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search through blog posts, projects, and content.',
};

export default function SearchPage() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-dark-400 mb-8">
        <Link href="/" className="hover:text-primary-500">Home</Link>
        <span>{">"}</span>
        <span>Search</span>
      </nav>

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-dark-100 mb-4">Search</h1>
        <p className="text-dark-400 italic">Search any article ...</p>
      </div>

      {/* Search Component */}
      <SearchComponent
        posts={posts}
        projects={projects}
        placeholder="Search for anything..."
        showFilters={true}
      />
    </div>
  );
}
