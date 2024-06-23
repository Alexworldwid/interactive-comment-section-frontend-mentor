"use client"

import React, { useState, useContext } from 'react';
import { Comment, Reply } from '../utils/types';
import Image from 'next/image';
import { FaReply } from "react-icons/fa";
import { currentUser } from '../lib/data';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ReplyTemplate from './replyTemplate';
import { timeAgo } from '../utils/dateFormatter';
import EditCommentForm from './forms/comment/editComment';
import DeleteCommentModal from './modals/deleteComment';
import { CommentContext } from '../globalContext/commentContext';
import ReplyCommentForm from './forms/reply/replyComment';



interface commentTemplateProps {
    comment: Comment
}

const CommentTemplate: React.FC<commentTemplateProps> = ({ comment }) => {
    const relativeTime = timeAgo(comment.updatedAt)
    const [editingComment, setEditingComment] = useState<boolean>(false)
    const [deleteComment, setDeleteComment] = useState<boolean>(false);
    const [replyingComment, setReplyingComment] = useState<boolean>(false);
    const commentContext = useContext(CommentContext);

    if (!commentContext) {
        return <div>Loading Comments...</div>;
    }

    const {editScore} = commentContext


    const handleEditingComment = () => {
        setEditingComment(!editingComment);
    }

    const handleDeleteComment = () => {
        setDeleteComment(!deleteComment)
    }

    const handleReplyingComment = () => {
        setReplyingComment(!replyingComment)
    }

    return (
        <li key={comment._id} className=' my-4 rounded-lg transition-all duration-150 ease-in-out'>
            {comment.user.username !== currentUser.username && (
                <div className='p-4 bg-white rounded-lg'>
                    <div className='flex gap-4 p-3'>
                        <div className='bg-[#EAECF1] p-1 px-4 w-20 h-40 rounded-lg hidden md:flex md:flex-col justify-between items-center'>
                            <button className='text-3xl text-gray-500' onClick={() => editScore(comment._id, 1)}>+</button>
                            <span className='text-3xl font-semibold text-[#5457B6]'>{comment.score}</span>
                            <button className='text-3xl text-gray-500' onClick={() => editScore(comment._id, -1)}>-</button>
                        </div>

                        <div>
                            <div className='flex justify-between items-center'>
                                <div className='items-center gap-6 mb-2 flex'>
                                    <Image src={comment.user.image.png} 
                                    width={40} 
                                    height={30} 
                                    alt={`${comment.user.username} image`} 
                                    priority />
                                    <p className='text-xl font-semibold md:text-2xl'>{comment.user.username}</p>
                                    <p className='text-xl text-gray-500 font-semibold'>{relativeTime}</p>
                                </div>
                                
                                <button  className='hidden md:flex items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'
                                    onClick={() => handleReplyingComment()}
                                    >
                                        <FaReply />
                                        <span>Reply</span>
                                </button>
                            </div>

                            <div className='text-xl text-gray-500 md:text-2xl mb-2'>
                                <p>{comment.content}</p>    
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className='flex items-center justify-between mt-2 px-3 md:hidden'>
                        <div className='bg-[#EAECF1] p-1 px-2 w-20 rounded-lg flex justify-between items-center'>
                            <button className='text-2xl text-gray-500' onClick={() => editScore(comment._id, 1)}>+</button>
                            <span className='text-2xl font-semibold text-[#5457B6]'>{comment.score}</span>
                            <button className='text-2xl text-gray-500' onClick={() => editScore(comment._id, -1)}>-</button>
                        </div>
                        <button  className='flex md:hidden items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'
                        onClick={() => handleReplyingComment()}
                        >
                            <FaReply />
                            <span>Reply</span>
                        </button>
                    </div>
                </div>

                
            )}

            {comment.user.username === currentUser.username && (
                <div className='p-4 bg-white rounded-lg '>
                    <div className='flex gap-4 p-3 min-w-full'>
                        <div className='bg-[#EAECF1] p-1 px-4 h-40 w-20 rounded-lg hidden lg:flex md:flex-col justify-between items-center'>
                            <button className='text-3xl text-gray-500' onClick={() => editScore(comment._id, 1)}>+</button>
                            <span className='text-3xl font-semibold text-[#5457B6]'>{comment.score}</span>
                            <button className='text-3xl text-gray-500' onClick={() => editScore(comment._id, -1)}>-</button>
                        </div>

                        <div className='w-full'>
                            <div>
                                <div className='flex items-center gap-6 mb-2 justify-between'>
                                    <div className='flex items-center gap-6 mb-2'>
                                        <Image src={comment.user.image.png}
                                        width={40} 
                                        height={30} 
                                        alt={`${comment.user.username} image`} 
                                        priority />
                                        <p className='text-xl font-semibold md:text-2xl'>{comment.user.username}</p>
                                        <p className=' text-center bg-[#5457B6] tracking-wide px-2 rounded-md text-white'>You</p>
                                        <p className='text-xl text-gray-500 font-semibold'>{relativeTime}</p>
                                    </div>
                                    

                                    <div className='lg:flex hidden'>
                                        <div className='flex items-center gap-4'>
                                            <button className='flex items-center gap-2 text-[#ED6468] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'
                                            onClick={handleDeleteComment}
                                            >
                                                <MdDelete />
                                                <p>Delete</p>
                                                {deleteComment && (
                                                    <DeleteCommentModal commentId={comment._id} handleDeleteComment={handleDeleteComment} />
                                                )}
                                                
                                            </button>

                                            <button className='flex items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'
                                            onClick={handleEditingComment}
                                            >
                                                <CiEdit />
                                                <p>Edit</p>
                                            </button>

                                        </div>
                                    </div>

                            </div>

                            <div className='text-xl text-gray-500 md:text-2xl mb-2'>
                                {
                                    editingComment ? <EditCommentForm content={comment.content} commentId={comment._id} handleEditingComment={handleEditingComment} /> : (<p>{comment.content}</p>)
                                }
                                
                            </div>

                            {!editingComment && (
                                <div className='flex items-center justify-between lg:hidden'>
                                    <div className='bg-[#EAECF1] p-1 px-2 w-20 rounded-lg flex justify-between'>
                                        <button className='text-2xl text-gray-500' onClick={() => editScore(comment._id, 1)}>+</button>
                                        <span className='text-2xl font-semibold text-[#5457B6]'>{comment.score}</span>
                                        <button className='text-2xl text-gray-500' onClick={() => editScore(comment._id, -1)}>-</button>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <button className='flex items-center gap-2 text-[#ED6468] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'
                                        onClick={handleDeleteComment}
                                        >
                                            <MdDelete />
                                            <p>Delete</p>
                                            {deleteComment && (
                                                <DeleteCommentModal commentId={comment._id} handleDeleteComment={handleDeleteComment} />
                                            )}
                                            
                                        </button>

                                        <button className='flex items-center gap-2 text-[#5457B6] hover:text-2xl text-xl font-bold transition-all duration-150 ease-in-out'
                                        onClick={handleEditingComment}
                                        >
                                            <CiEdit />
                                            <p>Edit</p>
                                        </button>

                                    </div>
                                </div>
                            )}
                            </div>
                        </div>   
                    </div>    
                </div>
            )}
            
            {replyingComment && (
                <ReplyCommentForm replyingTo={comment.user.username} commentId={comment._id} handleReplyingComment={handleReplyingComment} />
            )}
            

            {/* reply array for each comment */}
            <ul className='flex flex-col items-end border-l-2 border-solid border-gray-400 my-2'>
                {comment.replies.map((reply: Reply) => (
                    <ReplyTemplate key={reply._id} reply={reply} commentId={comment._id} />
                ))}
            </ul>
        </li>
    );
};

export default CommentTemplate;