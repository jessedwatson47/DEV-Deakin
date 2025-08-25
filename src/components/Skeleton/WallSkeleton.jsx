import React from 'react'
import PostCardSkeleton from './PostCardSkeleton'

function WallSkeleton({count = 9 }) {
    const heights = ["h-60", "h-40", "h-60", "h-30", "h-50", "h-60", "h-40", "h-40", "h-60"]
  return (
    <section className="max-w-screen-xl mx-auto mt-4 mb-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-6">
            <PostCardSkeleton className={heights[i]}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WallSkeleton