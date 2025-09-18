import React from 'react'

function ShinyText({ text, disabled = false, speed = 5, className = '' }) {
    const animationDuration = `${speed}s`;  

    return (
        <div
        className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-[shine_5s_linear_infinite]'} ${className}`}
        style={{
            backgroundImage:
            'linear-gradient(120deg, rgba(0, 0, 0, 1) 40%, rgba(0, 255, 221, 1) 50%, rgba(0, 0, 0, 1) 60%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            animationDuration: animationDuration
        }}
        >
      {text}
    </div>
    )
}

export default ShinyText;