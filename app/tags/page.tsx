'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, Tag, Hash, Folder } from 'lucide-react';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { getAllProjects, getProjectTags } from '@/lib/projects';
import { formatDate } from '@/lib/utils';

export default function TagsPage() {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag') || '';
  
  const [activeTag, setActiveTag] = useState(selectedTag);
  const [contentType, setContentType] = useState<'all' | 'posts' | 'projects'>('all');

  const posts = getAllPosts();
  const projects = getAllProjects();
  const postTags = getAllTags();
  const projectTags = getProjectTags();

  // Combine and deduplicate tags
  const allTags = React.useMemo(() => {
    const combined = new Map<string, { tag: string; postCount: number; projectCount: number }>();
    
    postTags.forEach(({ tag, count }) => {
      combined.set(tag, { tag, postCount: count, projectCount: 0 });
    });
    
    projectTags.forEach(({ tag, count }) => {
      const existing = combined.get(tag);
      if (existing) {
        existing.projectCount = count;
      } else {
        combined.set(tag, { tag, postCount: 0, projectCount: count });
      }
    });
    
    return Array.from(combined.values()).sort((a, b) => 
      (b.postCount + b.projectCount) - (a.postCount + a.projectCount)
    );
  }, [postTags, projectTags]);

  // Filter content by selected tag
  const filteredPosts = React.useMemo(() => {
    if (!activeTag) return [];
    return posts.filter(post => 
      post.tags.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
    );
  }, [posts, activeTag]);

  const filteredProjects = React.useMemo(() => {
    if (!activeTag) return [];
    return projects.filter(project => 
      project.tags.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
    );
  }, [projects, activeTag]);

  // Update URL when tag changes
  useEffect(() => {
    if (activeTag && activeTag !== selectedTag) {
      const url = new URL(window.location.href);
      url.searchParams.set('tag', activeTag);
      window.history.pushState({}, '', url.toString());
    } else if (!activeTag && selectedTag) {
      const url = new URL(window.location.href);
      url.searchParams.delete('tag');
      window.history.pushState({}, '', url.toString());
    }
  }, [activeTag, selectedTag]);

  const clearTag = () => {
    setActiveTag('');
    const url = new URL(window.location.href);
    url.searchParams.delete('tag');
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-dark-400 mb-8">
        <Link href="/" className="hover:text-primary-500">Home</Link>
        <span>{">"}</span>
        <span>Tags</span>
      </nav>

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-dark-100 mb-4">Tags</h1>
        <p className="text-dark-300">
          Browse content by tags. Click on any tag to see related posts and projects.
        </p>
      </div>

      {/* Selected Tag Banner */}
      {activeTag && (
        <div className="mb-8 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="h-5 w-5 text-primary-500" />
              <span className="text-lg font-semibold text-primary-500">{activeTag}</span>
            </div>
            <button
              onClick={clearTag}
              className="text-sm text-primary-500 hover:text-primary-400 transition-colors duration-200"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}

      {/* Content Type Filter */}
      {activeTag && (
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-dark-400">Show:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setContentType('all')}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  contentType === 'all'
                    ? 'bg-primary-500 text-dark-900'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                }`}
              >
                All ({filteredPosts.length + filteredProjects.length})
              </button>
              <button
                onClick={() => setContentType('posts')}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  contentType === 'posts'
                    ? 'bg-primary-500 text-dark-900'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                }`}
              >
                Posts ({filteredPosts.length})
              </button>
              <button
                onClick={() => setContentType('projects')}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  contentType === 'projects'
                    ? 'bg-primary-500 text-dark-900'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                }`}
              >
                Projects ({filteredProjects.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tag Cloud */}
      {!activeTag && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-dark-100 mb-6">All Tags</h2>
          <div className="flex flex-wrap gap-3">
            {allTags.map(({ tag, postCount, projectCount }) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="group bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-primary-500/50 rounded-lg p-4 transition-all duration-200"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-4 w-4 text-primary-500" />
                  <span className="font-medium text-dark-200 group-hover:text-primary-500">
                    {tag}
                  </span>
                </div>
                <div className="text-xs text-dark-400">
                  {postCount > 0 && <span>{postCount} post{postCount !== 1 ? 's' : ''}</span>}
                  {postCount > 0 && projectCount > 0 && <span>, </span>}
                  {projectCount > 0 && <span>{projectCount} project{projectCount !== 1 ? 's' : ''}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Content */}
      {activeTag && (
        <div className="space-y-8">
          {/* Posts Section */}
          {(contentType === 'all' || contentType === 'posts') && filteredPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-dark-100 mb-6 flex items-center space-x-2">
                <Folder className="h-5 w-5" />
                <span>Posts ({filteredPosts.length})</span>
              </h2>
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <article key={post.slug} className="border-b border-dark-700 pb-6 last:border-b-0">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-dark-100 hover:text-primary-500 transition-colors duration-200">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-dark-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      
                      <p className="text-dark-300 leading-relaxed">
                        {post.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`text-xs px-2 py-1 rounded-md transition-colors duration-200 ${
                              tag === activeTag
                                ? 'bg-primary-500 text-dark-900'
                                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {(contentType === 'all' || contentType === 'projects') && filteredProjects.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-dark-100 mb-6 flex items-center space-x-2">
                <Folder className="h-5 w-5" />
                <span>Projects ({filteredProjects.length})</span>
              </h2>
              <div className="space-y-6">
                {filteredProjects.map((project) => (
                  <article key={project.id} className="border-b border-dark-700 pb-6 last:border-b-0">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-dark-100 hover:text-primary-500 transition-colors duration-200 flex-1">
                          {project.url ? (
                            <Link href={project.url} target="_blank" rel="noopener noreferrer">
                              {project.title}
                            </Link>
                          ) : (
                            project.title
                          )}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-md ml-4 ${
                          project.status === 'completed' 
                            ? 'bg-green-900 text-green-300' 
                            : project.status === 'in-progress'
                            ? 'bg-yellow-900 text-yellow-300'
                            : 'bg-blue-900 text-blue-300'
                        }`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-dark-300 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`text-xs px-2 py-1 rounded-md transition-colors duration-200 ${
                              tag === activeTag
                                ? 'bg-primary-500 text-dark-900'
                                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {((contentType === 'posts' && filteredPosts.length === 0) ||
            (contentType === 'projects' && filteredProjects.length === 0) ||
            (contentType === 'all' && filteredPosts.length === 0 && filteredProjects.length === 0)) && (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 text-dark-600 mx-auto mb-4" />
              <p className="text-dark-400 text-lg">
                No {contentType === 'all' ? 'content' : contentType} found for tag "{activeTag}"
              </p>
              <button
                onClick={clearTag}
                className="mt-4 text-primary-500 hover:text-primary-400 transition-colors duration-200"
              >
                Browse all tags
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
