import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Clock, Tag } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'All blog posts about technology, programming, and software engineering.',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-dark-400 mb-8">
        <Link href="/" className="hover:text-primary-500">Home</Link>
        <span>{">"}</span>
        <span>Posts (Page 1)</span>
      </nav>

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-dark-100 mb-4">Posts</h1>
        <p className="text-dark-400 italic">All the articles I've posted.</p>
      </div>

      {/* Posts List */}
      <div className="space-y-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-400 text-lg">No posts published yet.</p>
            <p className="text-dark-500 text-sm mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="border-b border-dark-700 pb-8 last:border-b-0">
              <div className="space-y-4">
                {/* Post Title */}
                <h2 className="text-2xl font-semibold text-primary-500 hover:text-primary-400 transition-colors duration-200">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {/* Post Meta */}
                <div className="flex items-center space-x-4 text-sm text-dark-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                  {post.featured && (
                    <span className="bg-primary-500 text-dark-900 px-2 py-1 rounded-md text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>

                {/* Post Description */}
                <p className="text-dark-300 leading-relaxed">
                  {post.description}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags?tag=${encodeURIComponent(tag)}`}
                        className="inline-flex items-center space-x-1 text-xs bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-primary-500 px-3 py-1 rounded-md transition-colors duration-200"
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

      {/* Pagination placeholder - removed static buttons to prevent SSR issues */}
      {posts.length > 10 && (
        <div className="mt-12 text-center text-dark-400">
          <p>Pagination will be added for large post collections</p>
        </div>
      )}
    </div>
  );
}
