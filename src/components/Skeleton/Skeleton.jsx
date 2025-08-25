import React from 'react'

function Skeleton({ className }) {
return (
    <div className={`relative overflow-hidden bg-zinc-200 rounded ${className}`}>
      <div className="absolute inset-0 -translate-x-full
                      bg-gradient-to-r from-transparent via-white/60 to-transparent
                      animate-[shimmer_1.2s_infinite] [background-size:200%_100%]" />
    </div>
  )
}

export default Skeleton