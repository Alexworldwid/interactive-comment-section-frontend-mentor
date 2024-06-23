"use client";

import React, { useContext } from 'react';
import { CommentContext } from '../globalContext/commentContext';
import { Comment, Reply } from '../utils/types';
import CommentTemplate from './commentTemplate';

const CommentSection: React.FC = () => {
    const commentContext = useContext(CommentContext);

    if (!commentContext) {
        return <div>Loading Comments...</div>;
    }

    const { comments } = commentContext;

    return (
        <ul className='w-full'>
            {comments.map((comment: Comment) => (
                <CommentTemplate key={comment._id} comment={comment} />
            ))}
        </ul>
    );
};

export default CommentSection;
