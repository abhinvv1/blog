import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ExternalLink, Github, Tag } from 'lucide-react';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Collection of projects and open-source work.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-dark-400 mb-8">
        <Link href="/" className="hover:text-primary-500">Home</Link>
        <span>{">"}</span>
        <span>Projects</span>
      </nav>

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-dark-100 mb-4">Projects</h1>
        <p className="text-dark-300 leading-relaxed">
          Below is an index to the end-to-end projects I have worked on (and that are 
          worth sharing!)
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-400 text-lg">No projects to display yet.</p>
            <p className="text-dark-500 text-sm mt-2">Check back soon for new projects!</p>
          </div>
        ) : (
          projects.map((project) => (
            <article key={project.id} className="card group" id={project.id}>
              <div className="space-y-4">
                {/* Project Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-dark-100 group-hover:text-primary-500 transition-colors duration-200 mb-2">
                      {project.url ? (
                        <Link 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.title}
                        </Link>
                      ) : (
                        project.title
                      )}
                    </h2>
                    
                    {/* Status Badge */}
                    <span className={`inline-block text-xs px-2 py-1 rounded-md font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-900 text-green-300' 
                        : project.status === 'in-progress'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-blue-900 text-blue-300'
                    }`}>
                      {project.status === 'in-progress' ? 'In Progress' : 
                       project.status === 'completed' ? 'Completed' : 'Planned'}
                    </span>
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center space-x-2 ml-4">
                    {project.url && (
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-dark-400 hover:text-primary-500 transition-colors duration-200"
                        aria-label="View project"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-dark-400 hover:text-primary-500 transition-colors duration-200"
                        aria-label="View source code"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-dark-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Tags */}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags?tag=${encodeURIComponent(tag)}`}
                        className="inline-flex items-center space-x-1 text-xs bg-dark-800 text-light-300 hover:bg-dark-700 hover:text-primary-500 px-3 py-1 rounded-md transition-colors duration-200"
                      >
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {/* Project Stats */}
      {projects.length > 0 && (
        <div className="mt-16 pt-8 border-t border-dark-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500">
                {projects.length}
              </div>
              <div className="text-sm text-dark-400">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-dark-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {projects.filter(p => p.status === 'in-progress').length}
              </div>
              <div className="text-sm text-dark-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {projects.filter(p => p.status === 'planned').length}
              </div>
              <div className="text-sm text-dark-400">Planned</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
