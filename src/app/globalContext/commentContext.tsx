"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Comment, CommentContextType, Reply, User } from '../utils/types';
import { ObjectId } from 'mongoose';

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

interface CommentProviderProps {
  children: ReactNode;
}

export const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const backendUri = process.env.BACKEND_URI || 'https://interactive-comment-api.vercel.app';

  const fetchComments = async () => {
    try {
      const response = await fetch(`${backendUri}/api/comment`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data: Comment[] = await response.json();
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (content: string, user: User, score: number, replies: Reply[]) => {
    const bodyData = {
        content: content,
        score: score,
        replies: replies,
        user: user
    } 
    try {
      await fetch(`${backendUri}/api/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      await fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  const replyComment = async (content: string, user: User, score: number, replyingTo: string, commentId: string) => {
    const bodyData = {
      content: content,
      score: score,
      replyingTo: replyingTo,
      user: user
  };
  
    try {
      await fetch(`${backendUri}/api/comment/${commentId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      await fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  const editComment = async (content: string, commentId: string) => {
    try {
      await fetch(`${backendUri}/api/comment/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }) 
      });
      await fetchComments();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };


  const deleteComment =  async (commentId: string) => {
    try {
      await fetch(`${backendUri}/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, 
      });
      await fetchComments();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };


  const editScore = async (commentId: string, score: number) => {
    try {
      await fetch(`${backendUri}/api/comment/${commentId}/score`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({score})
      });
      await fetchComments();
    } catch (error) {
      console.log('error editing score', error)
    }
  }


  const editReplyScore = async (commentId: string, score: number, replyId: string) => {
    try {
      await fetch(`${backendUri}/api/comment/${commentId}/${replyId}/score`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({score})
      });
      await fetchComments();
    } catch (error) {
      console.log('error editing score', error)
    }
  }

  const editReply = async (content: string, commentId: string, replyId: string) => {
    try {
      await fetch(`${backendUri}/api/comment/${commentId}/${replyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }) 
      });
      await fetchComments();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };



  const deleteReply =  async (commentId: string, replyId: string) => {
    try {
      await fetch(`${backendUri}/api/comment/${commentId}/${replyId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, 
      });
      await fetchComments();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };



  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <CommentContext.Provider value={{ comments, addComment, fetchComments, editComment, deleteComment, editScore, replyComment, editReplyScore, editReply, deleteReply }}>
      {children}
    </CommentContext.Provider>
  );
};
