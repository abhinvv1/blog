import { NextRequest, NextResponse } from 'next/server';
import { githubStorage } from '@/lib/github-storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postSlug = searchParams.get('postSlug');
    
    if (!postSlug) {
      return NextResponse.json({ error: 'postSlug is required' }, { status: 400 });
    }
    
    const comments = await githubStorage.getComments(postSlug);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, author, content, isAnonymous, parentId } = body;
    
    if (!postSlug || !content) {
      return NextResponse.json({ error: 'postSlug and content are required' }, { status: 400 });
    }
    
    const comment = await githubStorage.addComment(postSlug, {
      postSlug,
      author: isAnonymous ? 'Anonymous' : (author || 'Anonymous'),
      content: content.trim(),
      timestamp: new Date().toISOString(),
      isAnonymous: Boolean(isAnonymous),
      parentId: parentId || undefined,
    });
    
    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
