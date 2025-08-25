import React from 'react'
import Skeleton from './Skeleton'

function PostCardSkeleton({className}) {
return (
    <div className="overflow-hidden rounded ring-1 ring-zinc-200 bg-white shadow">
      <Skeleton className={`${className} w-full`}/>
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-2/3" />      {/* title */}
        <Skeleton className="h-4 w-1/4" />      {/* postType */}
        <Skeleton className="h-4 w-full" />     {/* line 1 */}
        <Skeleton className="h-4 w-5/6" />      {/* line 2 */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-10 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-24" />     {/* date */}
          <Skeleton className="h-4 w-20" />     {/* author */}
        </div>
      </div>
    </div>
  ) 
}

export default PostCardSkeleton