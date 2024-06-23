import mongoose, { ObjectId } from "mongoose";
import { ReactNode } from "react";


export interface Comment {
    _id: string;
    content: string;
    score: number;
    user: User;
    replies: Reply[];
    createdAt: string;
    updatedAt: string;
};


export interface Reply {
    _id: string;
    content: string;
    score: number;
    user: User;
    replyingTo: string;
    createdAt: string;
    updatedAt: string;
};

export interface User {
        username: string;
        image: {
            png: string;
            webp: string;
        };
}

export interface ReactNodeChildren {
    children: ReactNode;
}

export interface CommentContextType {
    comments: Comment[];
    addComment: (content: string, user: User, score: number, replies: Reply[]) => Promise<void>;
    fetchComments: () => Promise<void>;
    editComment: (content: string, commentId: string) => Promise<void>;
    deleteComment: (commentId: string) => Promise<void>;
    editScore: (commentId: string, score: number) => Promise<void>;
    replyComment: (content: string, user: User, score: number, replying: string, commentId: string) => Promise<void>;
    editReplyScore: (commentId: string, score: number, replyId: string) => Promise<void>;
    editReply: (content: string, commentId: string, replyId: string) => Promise<void>;
    deleteReply: (commentId: string, replyId: string) => Promise<void>
}