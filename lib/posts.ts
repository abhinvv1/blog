import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types';
import { calculateReadingTime, sortPostsByDate, generateSlug } from './utils';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Ensure posts directory exists
function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Get all post slugs
export function getPostSlugs(): string[] {
  ensurePostsDirectory();
  try {
    return fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

// Get post by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const post: Post = {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      readTime: data.readTime || calculateReadingTime(content),
      published: data.published !== false,
      featured: data.featured || false,
      image: data.image || null,
      author: data.author || null,
      content,
    };

    return post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all posts
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.published);

  return sortPostsByDate(posts);
}

// Get featured posts
export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(post => post.featured);
}

// Get posts by tag
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// Get recent posts
export function getRecentPosts(limit: number = 5): Post[] {
  return getAllPosts().slice(0, limit);
}

// Get all unique tags
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Search posts
export function searchPosts(query: string): Post[] {
  if (!query.trim()) return getAllPosts();

  const searchTerm = query.toLowerCase();
  return getAllPosts().filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.content?.toLowerCase().includes(searchTerm)
  );
}

// Get adjacent posts (for navigation)
export function getAdjacentPosts(currentSlug: string): {
  previous: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}

// Create a new post (for the editor)
export function createPost(postData: Partial<Post>): string {
  if (typeof window !== 'undefined' || !fs || !path || !matter || !postsDirectory) return '';
  
  const slug = postData.slug || generateSlug(postData.title || 'untitled');
  const now = new Date().toISOString();
  
  const frontmatter = {
    title: postData.title || 'Untitled Post',
    description: postData.description || '',
    date: postData.date || now,
    tags: postData.tags || [],
    published: postData.published !== false,
    featured: postData.featured || false,
    image: postData.image || null,
    author: postData.author || null,
  };

  const content = postData.content || '# New Post\n\nStart writing your content here...';
  
  const fileContent = matter.stringify(content, frontmatter);
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
  
  fs.writeFileSync(filePath, fileContent);
  return slug;
}

// Update an existing post
export function updatePost(slug: string, postData: Partial<Post>): boolean {
  if (typeof window !== 'undefined' || !fs || !path || !matter || !postsDirectory) return false;
  
  try {
    const existingPost = getPostBySlug(slug);
    if (!existingPost) return false;

    const updatedPost = { ...existingPost, ...postData };
    const frontmatter = {
      title: updatedPost.title,
      description: updatedPost.description,
      date: updatedPost.date,
      tags: updatedPost.tags,
      published: updatedPost.published,
      featured: updatedPost.featured,
      image: updatedPost.image,
      author: updatedPost.author,
    };

    const fileContent = matter.stringify(updatedPost.content || '', frontmatter);
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    
    fs.writeFileSync(filePath, fileContent);
    return true;
  } catch (error) {
    console.error(`Error updating post ${slug}:`, error);
    return false;
  }
}

// Delete a post
export function deletePost(slug: string): boolean {
  if (typeof window !== 'undefined' || !fs || !path || !postsDirectory) return false;
  
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting post ${slug}:`, error);
    return false;
  }
}
