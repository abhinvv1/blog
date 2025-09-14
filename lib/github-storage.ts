// GitHub API storage for comments
interface GitHubComment {
  id: string;
  postSlug: string;
  author: string;
  content: string;
  timestamp: string;
  isAnonymous: boolean;
  parentId?: string;
}

interface GitHubFile {
  sha?: string;
  content: string;
}

export class GitHubStorage {
  private owner: string;
  private repo: string;
  private token: string;
  private branch: string = 'main';

  constructor() {
    this.owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || '';
    this.repo = process.env.NEXT_PUBLIC_GITHUB_REPO || '';
    this.token = process.env.GITHUB_TOKEN || '';
  }

  private async githubRequest(url: string, options: RequestInit = {}) {
    const response = await fetch(`https://api.github.com${url}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
  }

  private async getFile(path: string): Promise<GitHubFile | null> {
    try {
      const data = await this.githubRequest(`/repos/${this.owner}/${this.repo}/contents/${path}`);
      return {
        sha: data.sha,
        content: atob(data.content),
      };
    } catch (error) {
      return null; // File doesn't exist
    }
  }

  private async writeFile(path: string, content: string, sha?: string) {
    const body = {
      message: `Update ${path}`,
      content: btoa(content),
      branch: this.branch,
      ...(sha && { sha }),
    };

    return this.githubRequest(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async getComments(postSlug: string): Promise<GitHubComment[]> {
    const file = await this.getFile(`data/comments/${postSlug}.json`);
    if (!file) return [];
    
    try {
      return JSON.parse(file.content);
    } catch {
      return [];
    }
  }

  async addComment(postSlug: string, comment: Omit<GitHubComment, 'id'>): Promise<GitHubComment> {
    const comments = await this.getComments(postSlug);
    const file = await this.getFile(`data/comments/${postSlug}.json`);
    
    const newComment: GitHubComment = {
      ...comment,
      id: Date.now().toString(),
    };
    
    const updatedComments = [...comments, newComment];
    
    await this.writeFile(
      `data/comments/${postSlug}.json`,
      JSON.stringify(updatedComments, null, 2),
      file?.sha
    );
    
    return newComment;
  }

  async getAllComments(): Promise<Record<string, GitHubComment[]>> {
    try {
      const data = await this.githubRequest(`/repos/${this.owner}/${this.repo}/contents/data/comments`);
      const commentFiles = Array.isArray(data) ? data : [];
      
      const allComments: Record<string, GitHubComment[]> = {};
      
      for (const file of commentFiles) {
        if (file.name.endsWith('.json')) {
          const postSlug = file.name.replace('.json', '');
          allComments[postSlug] = await this.getComments(postSlug);
        }
      }
      
      return allComments;
    } catch {
      return {};
    }
  }
}

// Singleton instance
export const githubStorage = new GitHubStorage();