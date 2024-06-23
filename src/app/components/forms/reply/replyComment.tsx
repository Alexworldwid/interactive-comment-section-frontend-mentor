"use client";

import React, { useContext, useState } from 'react';
import { currentUser } from '@/app/lib/data';
import { CommentContext } from '@/app/globalContext/commentContext';
import Image from 'next/image';


interface ReplyCommentFormProps {
    replyingTo: string;
    commentId: string;
    handleReplyingComment: () => void;
}

const ReplyCommentForm: React.FC<ReplyCommentFormProps> = ({ replyingTo, commentId, handleReplyingComment }) => {
    const [newComent, setNewComment] = useState<string>('');
    const commentContext = useContext(CommentContext);
    let score = 0;

    if (!commentContext) {
        return <div>Loading Comments...</div>;
    }

    const {replyComment} = commentContext


    //handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComent.trim()) {
            replyComment(newComent, currentUser, score, replyingTo, commentId )
            setNewComment('')
            handleReplyingComment();
        }
    }

    return (
        <form className='w-full my-4 bg-white p-4 rounded-lg' onSubmit={handleSubmit}>
            <div className='flex items-start gap-2'>
                <Image src={currentUser.image.png} alt={currentUser.username} width={40} height={40} className='hidden md:block' />
                
                <textarea 
                name="comment" 
                id="comment" 
                value={newComent} 
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                placeholder='Add a comment...'
                className='w-full border p-4 placeholder:text-xl placeholder:font-semibold text-xl text-gray-600 font-medium'
                ></textarea>

                <button type='submit' className='hidden items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out md:block'>
                    Reply
                </button>
            </div>
            

            <div className='flex justify-between w-full mt-3 md:hidden'>
                <Image src={currentUser.image.png} alt={currentUser.username} width={40} height={40} />
                
                <button type='submit' className='flex items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'>
                    Reply
                </button>
            </div>
        </form>
    );
};

export default ReplyCommentForm;


