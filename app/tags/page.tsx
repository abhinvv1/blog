import React from 'react';
import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { getAllProjects, getProjectTags } from '@/lib/projects';
import { TagsClient } from '@/components/TagsClient';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse content by tags.',
};

export default function TagsPage() {
  const posts = getAllPosts();
  const projects = getAllProjects();
  const postTags = getAllTags();
  const projectTags = getProjectTags();

  return (
    <TagsClient 
      posts={posts}
      projects={projects}
      postTags={postTags}
      projectTags={projectTags}
    />
  );
}
