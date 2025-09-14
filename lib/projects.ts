import { Project } from '@/types';
import { projects } from '@/content/projects/projects-data';

// Get all projects
export function getAllProjects(): Project[] {
  return projects;
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

// Get project by ID
export function getProjectById(id: string): Project | null {
  return projects.find(project => project.id === id) || null;
}

// Get projects by status
export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter(project => project.status === status);
}

// Get projects by tag
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => 
    project.tags.some(projectTag => projectTag.toLowerCase() === tag.toLowerCase())
  );
}

// Search projects
export function searchProjects(query: string): Project[] {
  if (!query.trim()) return projects;

  const searchTerm = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Get all unique tags from projects
export function getProjectTags(): { tag: string; count: number }[] {
  const tagCount: Record<string, number> = {};

  projects.forEach(project => {
    project.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Get projects statistics
export function getProjectsStats() {
  const total = projects.length;
  const completed = getProjectsByStatus('completed').length;
  const inProgress = getProjectsByStatus('in-progress').length;
  const planned = getProjectsByStatus('planned').length;
  const featured = getFeaturedProjects().length;

  return {
    total,
    completed,
    inProgress,
    planned,
    featured,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
