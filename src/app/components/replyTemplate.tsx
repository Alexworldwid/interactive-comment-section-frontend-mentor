"use client"

import React, { useContext, useState } from 'react';
import { Reply } from '../utils/types';
import { currentUser } from '../lib/data';
import Image from 'next/image';
import { FaReply } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { timeAgo } from '../utils/dateFormatter';
import ReplyCommentForm from './forms/reply/replyComment';
import { CommentContext } from '../globalContext/commentContext';
import DeleteReplyModal from './modals/deleteReplyModal';
import EditReplyForm from './forms/reply/editReply';

interface ReplyTemplateProps {
    reply: Reply
    commentId: string
}

const ReplyTemplate:React.FC<ReplyTemplateProps>  = ({reply, commentId}) => {
    const relativeTime = timeAgo(reply.updatedAt);
    const [replyingComment, setReplyingComment] = useState<boolean>(false);
    const [deleteReply, setDeleteReply] = useState<boolean>(false);
    const [editingReply, setEditingReply] = useState<boolean>(false);
    const commentContext = useContext(CommentContext);

    if (!commentContext) {
        return <div>Loading Comments...</div>;
    }

    const {editReplyScore} = commentContext

    const handleReplyingComment = () => {
        setReplyingComment(!replyingComment)
    }

    const handleEditingReply = () => {
        setEditingReply(!editingReply);
    }

    const handleDeleteReply = () => {
        setDeleteReply(!deleteReply)
    }

    return (
        <li key={reply._id} className='my-4 rounded-lg w-[95%]'>
            {reply.user.username !== currentUser.username && (
                <div className='p-4 bg-white rounded-lg md:flex gap-4'>
                    <div className='bg-[#EAECF1] p-1 px-4 w-20 h-40 rounded-lg hidden md:flex md:flex-col justify-between items-center'>
                        <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, 1, reply._id)}}>+</button>
                        <span className='text-2xl font-semibold text-[#5457B6]'>{reply.score}</span>
                        <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, -1, reply._id)}}>-</button>
                    </div>
                    <div>
                        <div className='flex items-center gap-6 mb-2 justify-between' >
                            <div className='flex items-center gap-6 mb-2'>
                                <Image src={reply.user.image.png} width={40} height={30} alt={`${reply.user.username} image`} priority />
                                <p className='text-xl font-semibold md:text-2xl'>{reply.user.username}</p>
                                <p className='text-xl text-gray-500 font-semibold'>{relativeTime}</p>
                            </div>
                            
                            <button  className='md:flex items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out hidden'
                            onClick={handleReplyingComment}
                            >
                                <FaReply />
                                <span>Reply</span>
                            </button>
                        </div>

                        <div className='mb-2'>
                            <p className='text-xl text-gray-500 md:text-2xl'><span className='text-[#5457b6] font-bold'>@{reply.replyingTo}</span> {reply.content}</p>
                        </div>

                        <div className='flex items-center justify-between mt-2 md:hidden'>
                            <div className='bg-[#EAECF1] p-1 px-2 w-20 rounded-lg flex justify-between items-center'>
                                <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, 1, reply._id)}}>+</button>
                                <span className='text-2xl font-semibold text-[#5457B6]'>{reply.score}</span>
                                <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, -1, reply._id)}}>-</button>
                            </div>
                            <button  className='flex items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'
                            onClick={handleReplyingComment}
                            >
                                <FaReply />
                                <span>Reply</span>
                            </button>
                        </div>
                    </div>

                </div>
            )}

            {reply.user.username === currentUser.username && (
                <div className='p-4 bg-white rounded-lg'>
                    <div className='flex gap-4 p-3 min-w-full'>
                        <div className='bg-[#EAECF1] p-1 px-4 w-20 h-40 rounded-lg hidden md:flex md:flex-col justify-between items-center'>
                            <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, 1, reply._id)}}>+</button>
                            <span className='text-2xl font-semibold text-[#5457B6]'>{reply.score}</span>
                            <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, -1, reply._id)}}>-</button>
                        </div>

                        <div className='w-full'>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-6 mb-2'>
                                    <Image src={reply.user.image.png} width={40} height={30} alt={`${reply.user.username} image`} priority />
                                    <p className='text-xl font-semibold md:text-2xl'>{reply.user.username}</p>
                                    <p className=' text-center bg-[#5457B6] tracking-wide px-2 rounded-md text-white'>You</p>
                                    <p className='text-xl text-gray-500 font-semibold'>{relativeTime}</p>
                                </div>

                                <div className='items-center gap-4 hidden md:flex'>
                                    <button className='flex items-center gap-2 text-[#ED6468] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out' onClick={handleDeleteReply}>
                                        <MdDelete />
                                        <p>Delete</p>
                                        {deleteReply && (
                                            <DeleteReplyModal commentId={commentId} replyId={reply._id} handleDeleteReply={handleDeleteReply} />
                                        )}
                                    </button>

                                    <button className='flex items-center gap-2 text-[#5457b6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out' onClick={handleEditingReply}>
                                        <CiEdit />
                                        <p>Edit</p>
                                    </button>

                                </div>
                            </div>

                            <div className='text-xl text-gray-500 md:text-2xl mb-2'>
                                {
                                    editingReply ? <EditReplyForm content={reply.content} commentId={commentId} handleEditingReply={handleEditingReply} replyId={reply._id} /> : (<p><span className='text-[#5457b6] font-bold'>@{reply.replyingTo}</span> {reply.content}</p>)
                                }
                            </div>

                            {!editingReply && (
                                <div className='flex items-center justify-between md:hidden'>
                                    <div className='bg-[#EAECF1] p-1 px-2 w-20 rounded-lg flex justify-between'>
                                        <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, 1, reply._id)}}>+</button>
                                        <span className='text-2xl font-semibold text-[#5457B6]'>{reply.score}</span>
                                        <button className='text-2xl text-gray-500' onClick={() => {editReplyScore(commentId, -1, reply._id)}}>-</button>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <button className='flex items-center gap-2 text-[#ED6468] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out' onClick={handleDeleteReply}>
                                            <MdDelete />
                                            <p>Delete</p>
                                            {deleteReply && (
                                                <DeleteReplyModal commentId={commentId} replyId={reply._id} handleDeleteReply={handleDeleteReply} />
                                            )}
                                        </button>

                                        <button className='flex items-center gap-2 text-[#5457b6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out' onClick={handleEditingReply}>
                                            <CiEdit />
                                            <p>Edit</p>
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>







                    </div>
                    
                    
                </div>
            )}

            {replyingComment && (
                <ReplyCommentForm replyingTo={reply.user.username} commentId={commentId} handleReplyingComment={handleReplyingComment} />
            )}

        </li>
    );
};

export default ReplyTemplate;