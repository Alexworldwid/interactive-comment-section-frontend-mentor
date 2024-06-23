"use client";

import React, { useContext, useState } from 'react';
import { currentUser } from '@/app/lib/data';
import { CommentContext } from '@/app/globalContext/commentContext';
import Image from 'next/image';

interface EditCommentFormProps {
    content: string;
    commentId: string;
    handleEditingReply: () => void
    replyId: string
}

const EditReplyForm: React.FC<EditCommentFormProps> = ({ content, commentId, handleEditingReply, replyId }) => {
    const [updatedReply, setUpdatedReply] = useState<string>(content);
    const commentContext = useContext(CommentContext);

    if (!commentContext) {
        return <div>Loading Comments...</div>;
    }

    const {editReply} = commentContext


    //handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (updatedReply.trim()) {
            editReply( updatedReply, commentId, replyId )
            handleEditingReply();
        }
    }

    return (
        <form className='w-full my-4 bg-white p-4 rounded-lg' onSubmit={handleSubmit}>
            <div className='flex items-start gap-2'>
                <textarea 
                name="comment" 
                id="comment" 
                value={updatedReply} 
                onChange={(e) => setUpdatedReply(e.target.value)}
                rows={3}
                placeholder='Add a comment...'
                className='w-full border p-4 placeholder:text-xl placeholder:font-semibold text-xl text-gray-600 font-medium'
                ></textarea>
            </div>
            

            <div className='flex justify-end w-full mt-3'>        
                <button type='submit' className='text-white bg-[#5457B6] p-2 px-3 mt-1 rounded-lg  text-xl font-semibold transition-all duration-150 ease-in-out hover:bg-[blue]'>
                    UPDATE
                </button>
            </div>
        </form>
    );
};

export default EditReplyForm;