import React from 'react';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';

function Like({ likes, isLiked, handleLike }) {
  return (
    <>
      {!isLiked ? (
        <>
          <button onClick={handleLike} className="cursor-pointer hover:bg-red-200 rounded p-1">
            <HeartIcon />
          </button>
          <span className="text-sm font-semibold text-zinc-500">{likes || 0}</span>
        </>
      ) : (
        <>
          <button onClick={handleLike} className="cursor-pointer hover:bg-red-200 rounded p-1">
            <HeartFilledIcon />
          </button>
          <span className="text-sm font-semibold text-zinc-500">{likes}</span>
        </>
      )}
    </>
  );
}

export default Like;
