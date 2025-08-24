import React from 'react'

function Card({children, className, padding = "p-10"}) {
  return (
    <div className={`flex flex-col ${padding} rounded ring-1 ring-zinc-300 ${className}`}>
        {children}
    </div>
  )
}

export default Card