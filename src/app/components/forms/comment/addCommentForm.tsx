"use client";

import React, { useContext, useState } from 'react';
import { currentUser } from '@/app/lib/data';
import { CommentContext } from '@/app/globalContext/commentContext';
import Image from 'next/image';
import { Reply } from '@/app/utils/types';

const AddCommentForm = () => {
    const [newComent, setNewComment] = useState<string>('');
    const commentContext = useContext(CommentContext);
    let score = 0;
    let replies: Reply | never[] = [];

    if (!commentContext) {
        return <div>Loading Comments...</div>;
    }

    const {addComment} = commentContext


    //handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComent.trim()) {
            addComment(newComent, currentUser, score, replies )
            setNewComment('')
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

                <button type='submit' className='text-2xl font-semibold hidden md:block bg-[#5457B6] text-white p-2 px-3 rounded-lg'>
                    SEND
                </button>
            </div>
            

            <div className='flex justify-between w-full mt-3 md:hidden'>
                <Image src={currentUser.image.png} alt={currentUser.username} width={40} height={40} />
                
                <button type='submit' className='text-2xl font-semibold md:hidden bg-[#5457B6] text-white p-2 px-3 rounded-lg'>
                    SEND
                </button>
            </div>
        </form>
    );
};

export default AddCommentForm;