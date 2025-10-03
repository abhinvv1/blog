import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import { getAllPosts, getFeaturedPosts } from '@/lib/posts';
import { getFeaturedProjects } from '@/lib/projects';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredPosts = getFeaturedPosts().slice(0, 2);
  const featuredProjects = getFeaturedProjects().slice(0, 2);

  return (
    <div className="space-y-16">
      <Analytics />
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-dark-100">
          Hi, I'm <span className="text-gradient">{siteConfig.author.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
          {siteConfig.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/posts"
            className="btn-primary inline-flex items-center space-x-2 !text-black"
          >
            <span>Read my posts</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>About me</span>
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-dark-100">Featured Posts</h2>
            <Link
              href="/posts"
              className="text-primary-500 hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              View all posts →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="card group">
                <div className="space-y-4">
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
                  
                  <h3 className="text-xl font-semibold text-dark-100 group-hover:text-primary-500 transition-colors duration-200">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-dark-300 leading-relaxed">
                    {post.description}
                  </p>
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-1 text-xs bg-dark-800 text-primary-500 px-2 py-1 rounded-md"
                        >
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-light-400">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-dark-100">Recent Posts</h2>
            <Link
              href="/posts"
              className="text-primary-500 hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              View all posts →
            </Link>
          </div>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <article key={post.slug} className="border-b border-dark-700 pb-6 last:border-b-0">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-sm text-dark-400">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-dark-100 hover:text-primary-500 transition-colors duration-200">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-dark-300 leading-relaxed">
                    {post.description}
                  </p>
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags?tag=${encodeURIComponent(tag)}`}
                          className="text-xs bg-dark-800 text-light-300 hover:bg-dark-700 hover:text-primary-500 px-2 py-1 rounded-md transition-colors duration-200"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-dark-100">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-primary-500 hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              View all projects →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.id} className="card group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      project.status === 'completed' 
                        ? 'bg-green-900 text-green-300' 
                        : project.status === 'in-progress'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-blue-900 text-blue-300'
                    }`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-dark-100 group-hover:text-primary-500 transition-colors duration-200">
                    {project.url ? (
                      <Link href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-dark-800 text-white px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-dark-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
