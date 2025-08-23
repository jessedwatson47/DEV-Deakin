import React from 'react'

function Card({children, className}) {
  return (
    <div className={`flex flex-col p-10 rounded ring-1 ring-zinc-300 ${className}`}>
        {children}
    </div>
  )
}

export default Card