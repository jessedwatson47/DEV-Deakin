import React from 'react';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';

function Like({ likes, isLiked, handleLike }) {
  return (
    <>
      {!isLiked ? (
        <div className="flex items-center gap-0.5">
          <button onClick={handleLike} className="cursor-pointer hover:bg-red-200 rounded p-1">
            <HeartIcon className="w-4 h-4"/>
          </button>
          <span className="text-base font-semibold text-zinc-500">{likes || 0}</span>
        </div>
      ) : (
        <div className="flex items-center gap-0.5">
          <button onClick={handleLike} className="cursor-pointer hover:bg-red-200 rounded p-1">
            <HeartFilledIcon  className="w-4 h-4"/>
          </button>
          <span className="text-base font-semibold text-zinc-500">{likes}</span>
        </div>
      )}
    </>
  );
}

export default Like;
