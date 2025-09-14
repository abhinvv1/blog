'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, User, Calendar, Reply } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Comment {
  id: string;
  postSlug: string;
  author: string;
  content: string;
  timestamp: string;
  isAnonymous: boolean;
  parentId?: string;
}

interface CommentSystemProps {
  postSlug: string;
}

export function CommentSystem({ postSlug }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load comments from localStorage on mount
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${postSlug}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [postSlug]);

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments-${postSlug}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  // Add new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      postSlug,
      author: isAnonymous ? 'Anonymous' : (author.trim() || 'Anonymous'),
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      isAnonymous,
      parentId: replyTo || undefined,
    };

    const updatedComments = [...comments, comment];
    saveComments(updatedComments);
    
    // Reset form
    setNewComment('');
    if (!isAnonymous) setAuthor('');
    setReplyTo(null);
    setIsSubmitting(false);
  };

  // Get nested comments structure
  const getNestedComments = (parentId?: string): Comment[] => {
    return comments
      .filter(comment => comment.parentId === parentId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const rootComments = getNestedComments();

  // Render individual comment
  const renderComment = (comment: Comment, depth = 0) => {
    const replies = getNestedComments(comment.id);

    return (
      <div key={comment.id} className={`comment-card ${depth > 0 ? 'ml-8 mt-4' : 'mb-6'}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-sm dark:text-dark-200 light:text-slate-900">
                {comment.author}
              </span>
              {comment.isAnonymous && (
                <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  Anonymous
                </span>
              )}
              <span className="text-xs text-muted flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(comment.timestamp)}</span>
              </span>
            </div>
            
            <p className="text-sm dark:text-dark-300 light:text-slate-700 leading-relaxed mb-3">
              {comment.content}
            </p>
            
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="text-xs text-primary-500 hover:text-primary-600 flex items-center space-x-1 transition-colors duration-200"
            >
              <Reply className="h-3 w-3" />
              <span>{replyTo === comment.id ? 'Cancel' : 'Reply'}</span>
            </button>
            
            {/* Reply form */}
            {replyTo === comment.id && (
              <div className="mt-4 p-4 rounded-lg dark:bg-dark-700 light:bg-slate-100">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="text-xs text-muted">
                    Replying to {comment.author}
                  </div>
                  
                  {!isAnonymous && (
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3 py-2 text-sm border rounded-md dark:bg-dark-800 dark:border-dark-600 dark:text-dark-200 light:bg-white light:border-slate-300 light:text-slate-900"
                    />
                  )}
                  
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your reply..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border rounded-md resize-none dark:bg-dark-800 dark:border-dark-600 dark:text-dark-200 light:bg-white light:border-slate-300 light:text-slate-900"
                    required
                  />
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-xs">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-muted">Post anonymously</span>
                    </label>
                    
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setReplyTo(null)}
                        className="px-3 py-1 text-xs border rounded-md dark:border-dark-600 dark:text-dark-300 light:border-slate-300 light:text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !newComment.trim()}
                        className="px-3 py-1 text-xs bg-primary-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Posting...' : 'Reply'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        
        {/* Render replies */}
        {replies.length > 0 && (
          <div className="mt-4">
            {replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-16 pt-8 border-t dark:border-dark-700 light:border-slate-200">
      <div className="flex items-center space-x-2 mb-8">
        <MessageCircle className="h-5 w-5 text-primary-500" />
        <h3 className="text-xl font-semibold dark:text-dark-100 light:text-slate-900">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment form */}
      <div className="comment-card mb-8">
        <h4 className="text-lg font-medium mb-4 dark:text-dark-200 light:text-slate-800">
          Leave a Comment
        </h4>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAnonymous && (
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-2 dark:text-dark-300 light:text-slate-700">
                Your Name
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md dark:bg-dark-800 dark:border-dark-600 dark:text-dark-200 light:bg-white light:border-slate-300 light:text-slate-900"
              />
            </div>
          )}
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2 dark:text-dark-300 light:text-slate-700">
              Comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              rows={4}
              className="w-full px-3 py-2 border rounded-md resize-none dark:bg-dark-800 dark:border-dark-600 dark:text-dark-200 light:bg-white light:border-slate-300 light:text-slate-900"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-muted">Post anonymously</span>
            </label>
            
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {rootComments.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted mx-auto mb-4" />
            <p className="text-muted">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          rootComments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
}
