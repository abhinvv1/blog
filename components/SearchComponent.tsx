'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, Tag, Folder } from 'lucide-react';
import { Post } from '@/types';
import { Project } from '@/types';
import { formatDate, debounce } from '@/lib/utils';

interface SearchResult {
  type: 'post' | 'project';
  title: string;
  description: string;
  url: string;
  tags: string[];
  date?: string;
  readTime?: number;
  status?: string;
}

interface SearchComponentProps {
  posts: Post[];
  projects: Project[];
  placeholder?: string;
  showFilters?: boolean;
}

export function SearchComponent({ 
  posts, 
  projects, 
  placeholder = "Search for anything...", 
  showFilters = true 
}: SearchComponentProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'post' | 'project'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  
  // Debounce the search query
  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 300),
    []
  );

  useEffect(() => {
    debouncedSetQuery(query);
  }, [query, debouncedSetQuery]);

  // Convert posts and projects to search results
  const allResults: SearchResult[] = useMemo(() => {
    const postResults: SearchResult[] = posts.map(post => ({
      type: 'post' as const,
      title: post.title,
      description: post.description,
      url: `/posts/${post.slug}`,
      tags: post.tags,
      date: post.date,
      readTime: post.readTime,
    }));

    const projectResults: SearchResult[] = projects.map(project => ({
      type: 'project' as const,
      title: project.title,
      description: project.description,
      url: project.url || `/projects#${project.id}`,
      tags: project.tags,
      status: project.status,
    }));

    return [...postResults, ...projectResults];
  }, [posts, projects]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allResults.forEach(result => {
      result.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allResults]);

  // Filter results based on search criteria
  const filteredResults = useMemo(() => {
    let results = allResults;

    // Filter by type
    if (selectedType !== 'all') {
      results = results.filter(result => result.type === selectedType);
    }

    // Filter by tag
    if (selectedTag) {
      results = results.filter(result => 
        result.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Filter by search query
    if (debouncedQuery.trim()) {
      const searchTerm = debouncedQuery.toLowerCase();
      results = results.filter(result => 
        result.title.toLowerCase().includes(searchTerm) ||
        result.description.toLowerCase().includes(searchTerm) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    return results;
  }, [allResults, selectedType, selectedTag, debouncedQuery]);

  const clearFilters = () => {
    setQuery('');
    setDebouncedQuery('');
    setSelectedType('all');
    setSelectedTag('');
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input pl-10"
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 items-center">
          {/* Content Type Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-dark-400">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'all' | 'post' | 'project')}
              className="bg-dark-800 border border-dark-700 rounded px-3 py-1 text-sm text-dark-200 focus:border-primary-500 focus:ring-0"
            >
              <option value="all">All</option>
              <option value="post">Posts</option>
              <option value="project">Projects</option>
            </select>
          </div>

          {/* Tag Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-dark-400">Tag:</span>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-dark-800 border border-dark-700 rounded px-3 py-1 text-sm text-dark-200 focus:border-primary-500 focus:ring-0"
            >
              <option value="">All tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(query || selectedType !== 'all' || selectedTag) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-500 hover:text-primary-400 transition-colors duration-200"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-dark-400">
        {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
        {debouncedQuery && ` for "${debouncedQuery}"`}
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400 text-lg">
              {debouncedQuery 
                ? `No results found for "${debouncedQuery}"`
                : 'Start typing to search...'
              }
            </p>
            <p className="text-dark-500 text-sm mt-2">
              Try different keywords or clear your filters.
            </p>
          </div>
        ) : (
          filteredResults.map((result, index) => (
            <article key={`${result.type}-${index}`} className="border-b border-dark-700 pb-6 last:border-b-0">
              <div className="space-y-3">
                {/* Result Type Badge */}
                <div className="flex items-center space-x-2">
                  {result.type === 'post' ? (
                    <div className="flex items-center space-x-1 text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-md">
                      <Folder className="h-3 w-3" />
                      <span>Post</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-xs bg-green-900 text-green-300 px-2 py-1 rounded-md">
                      <Folder className="h-3 w-3" />
                      <span>Project</span>
                    </div>
                  )}
                  {result.status && (
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      result.status === 'completed' 
                        ? 'bg-green-900 text-green-300' 
                        : result.status === 'in-progress'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-blue-900 text-blue-300'
                    }`}>
                      {result.status.replace('-', ' ')}
                    </span>
                  )}
                </div>

                {/* Result Title */}
                <h3 className="text-xl font-semibold text-dark-100 hover:text-primary-500 transition-colors duration-200">
                  <Link href={result.url}>
                    {result.title}
                  </Link>
                </h3>

                {/* Result Meta */}
                {(result.date || result.readTime) && (
                  <div className="flex items-center space-x-4 text-sm text-dark-400">
                    {result.date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(result.date)}</span>
                      </div>
                    )}
                    {result.readTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{result.readTime} min read</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Result Description */}
                <p className="text-dark-300 leading-relaxed">
                  {result.description}
                </p>

                {/* Result Tags */}
                {result.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {result.tags.slice(0, 5).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="inline-flex items-center space-x-1 text-xs bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-primary-500 px-2 py-1 rounded-md transition-colors duration-200"
                      >
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </button>
                    ))}
                    {result.tags.length > 5 && (
                      <span className="text-xs text-dark-400">
                        +{result.tags.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
