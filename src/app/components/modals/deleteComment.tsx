import React, { useContext } from 'react';
import { CommentContext } from '@/app/globalContext/commentContext';

interface DeleteCommentProps {
    commentId: string;
    handleDeleteComment: () => void
}


const DeleteCommentModal: React.FC<DeleteCommentProps> = ({ commentId, handleDeleteComment }) => {
    const commentContext = useContext(CommentContext);

    if (!commentContext) {
        return (
            <div>Comments loading...</div>
        )
    }

    const {deleteComment} = commentContext

    return (
        <div className=' fixed inset-0 z-30 bg-black bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg max-w-[600px] w-[90%]'>
                <p className='text-xl md:text-2xl font-semibold mb-4'>Delete comment</p>
                <p className='text-lg md:text-xl text-slate-600'>Are you sure you want to delete this comment? This will remove the comment and can&rsquo;t be undone.</p>
                <div className='grid grid-cols-2 gap-3 mt-4'>
                    <button className='bg-slate-500 p-4 rounded-lg text-white font-semibold text-xl' onClick={() => handleDeleteComment()}>NO, Cancel</button>
                    <button className='bg-red-400 p-4 rounded-lg text-white font-semibold text-xl' onClick={() => deleteComment(commentId) }>YES, DELETE</button>
                </div>
            </div>   
        </div>
    );
};

export default DeleteCommentModal;