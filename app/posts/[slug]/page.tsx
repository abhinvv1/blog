import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, Clock, Tag, ArrowLeft, Twitter } from 'lucide-react';
import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import { formatDateTime } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { TableOfContents } from '@/components/TableOfContents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BackButton } from '@/components/NavigationButtons';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(params.slug);
  const shareUrl = `${siteConfig.url}/posts/${post.slug}`;

  return (
    <article className="max-w-4xl">
      {/* Back Button */}
      <BackButton />

      {/* Article Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-500 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Post Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400 mb-6">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDateTime(post.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
          {post.author && (
            <span>by {post.author}</span>
          )}
          {post.featured && (
            <span className="bg-primary-500 text-dark-900 px-2 py-1 rounded-md text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Social Follow Button */}
        <div className="mb-8">
          <a
            href={`https://twitter.com/intent/follow?screen_name=${siteConfig.author.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-dark-800 hover:bg-dark-700 text-dark-200 px-4 py-2 rounded-md transition-colors duration-200 text-sm"
          >
            <Twitter className="h-4 w-4" />
            <span>Follow @{siteConfig.author.twitter || 'username'}</span>
          </a>
        </div>

        {/* Post Description */}
        <p className="text-lg text-dark-300 leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Main Content Layout */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        {/* Table of Contents - Desktop Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start hidden lg:block">
          <TableOfContents content={post.content || ''} />
        </aside>

        {/* Article Content */}
        <div className="lg:col-span-3">
          {/* Mobile Table of Contents */}
          <div className="lg:hidden mb-8 p-4 bg-dark-800 border border-dark-700 rounded-lg">
            <TableOfContents content={post.content || ''} />
          </div>

          {/* MDX Content */}
          <div className="prose prose-invert prose-orange max-w-none">
            <MDXRemote source={post.content || ''} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-dark-700">
              <h3 className="text-lg font-semibold text-dark-200 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center space-x-1 text-sm bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-primary-500 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-dark-700">
            <h3 className="text-lg font-semibold text-dark-200 mb-4">Share this post</h3>
            <div className="flex items-center space-x-4">
              {/* <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm"
              >
                <Twitter className="h-4 w-4" />
                <span>Tweet</span>
              </a>
               <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="inline-flex items-center space-x-2 bg-dark-800 hover:bg-dark-700 text-dark-200 px-4 py-2 rounded-md transition-colors duration-200 text-sm"
              >
                <span>Copy link</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation to Previous/Next Posts */}
      {(previous || next) && (
        <nav className="mt-16 pt-8 border-t border-dark-700">
          <div className="grid gap-6 md:grid-cols-2">
            {previous && (
              <Link
                href={`/posts/${previous.slug}`}
                className="group p-6 bg-dark-800 border border-dark-700 rounded-lg hover:border-dark-600 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2 text-sm text-dark-400 mb-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </div>
                <h4 className="text-lg font-semibold text-dark-200 group-hover:text-primary-500 transition-colors duration-200">
                  {previous.title}
                </h4>
                <p className="text-dark-400 text-sm mt-2 line-clamp-2">
                  {previous.description}
                </p>
              </Link>
            )}

            {next && (
              <Link
                href={`/posts/${next.slug}`}
                className="group p-6 bg-dark-800 border border-dark-700 rounded-lg hover:border-dark-600 transition-colors duration-200 md:text-right"
              >
                <div className="flex items-center justify-end space-x-2 text-sm text-dark-400 mb-2 md:justify-end">
                  <span>Next</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </div>
                <h4 className="text-lg font-semibold text-dark-200 group-hover:text-primary-500 transition-colors duration-200">
                  {next.title}
                </h4>
                <p className="text-dark-400 text-sm mt-2 line-clamp-2">
                  {next.description}
                </p>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
