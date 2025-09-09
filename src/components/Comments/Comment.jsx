import React from 'react';
import { TrashIcon, StarIcon, StarFilledIcon } from '@radix-ui/react-icons';

function Comment({ comment, solutionId, currentUserId, onDelete, onSolution }) {
  const isSolution = comment.id === solutionId;

  return (
    <div className={isSolution ? 'flex flex-col bg-green-400 p-2 gap-4' : 'flex flex-col bg-white p-2 gap-4'}>
      {isSolution && <h4 className="uppercase font-semibold text-xs text-white">Solution</h4>}
      <div className="flex gap-2 items-center">
        <img src={comment.authorPhoto} className="h-8 w-8 rounded-full object-cover" />
        <div className="flex flex-col gap-1">
          <span className={isSolution ? 'text-sm text-white' : 'text-sm text-zinc-800'}>{comment.authorName}</span>
          <span className={isSolution ? 'text-xs text-white' : 'text-xs text-zinc-400'}>
            {comment.createdAt?.toDate().toLocaleString()}
          </span>
        </div>
        <div className="flex gap-1 ml-auto">
          {comment.authorId === currentUserId && (
            <button
              onClick={() => onDelete(comment)}
              className="hover:bg-zinc-300 p-2 cursor-pointer rounded"
            >
              <TrashIcon className="text-zinc-500" />
            </button>
          )}
          {comment.ownerId === currentUserId && (
            <button
              onClick={() => onSolution(comment)}
              className="hover:bg-zinc-300  p-2 cursor-pointer rounded"
            >
              {isSolution ? <StarFilledIcon className="text-white" /> : <StarIcon className="text-zinc-500" />}
            </button>
          )}
        </div>
      </div>
      <p className={isSolution ? 'text-white' : 'text-zinc-600'}>{comment.text}</p>
    </div>
  );
}

export default Comment;
