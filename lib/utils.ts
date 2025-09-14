import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date for display
export function formatDate(date: string): string {
  return format(parseISO(date), "MMMM dd, yyyy");
}

// Format date with time
export function formatDateTime(date: string): string {
  return format(parseISO(date), "MMMM dd, yyyy | hh:mm a");
}

// Calculate reading time based on word count
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Extract excerpt from content
export function extractExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content.replace(/[#*`\[\]]/g, "").replace(/\n/g, " ");
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

// Sort posts by date (newest first)
export function sortPostsByDate<T extends { date: string }>(posts: T[]): T[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Filter posts by tag
export function filterPostsByTag<T extends { tags: string[] }>(posts: T[], tag: string): T[] {
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// Get unique tags from posts
export function getUniqueTags<T extends { tags: string[] }>(posts: T[]): string[] {
  const allTags = posts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
}

// Search posts by title, description, or tags
export function searchPosts<T extends { title: string; description: string; tags: string[] }>(
  posts: T[], 
  query: string
): T[] {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return posts;

  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Debounce function for search
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate table of contents from markdown content
export function generateTableOfContents(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = generateSlug(title);
    
    headings.push({
      id,
      title,
      level,
    });
  }

  return headings;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Format numbers with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}
