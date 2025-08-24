import React from 'react'
import Card from '../Card/Card'
import { StarFilledIcon } from '@radix-ui/react-icons'

function PostCard({postType, question, abstract, article, imgUrl, imgAlt, title, desc, tags, rating, author, width, height}) {
  return (
    <Card className={`${width} ${height} shadow-xl `} padding="p-0">
        {/* Img */}
        <img src={imgUrl} alt={imgAlt} className="object-cover max-h-[60%]" />
        {/* Text */}
        <div className="flex flex-col gap-2 p-4">
            <h3 className="text-2xl text-zinc-700">{title}</h3>
            <span className="text-xs text-zinc-300">{postType}</span>
            {abstract ? <p className="text-sm text-zinc-400">{abstract}</p> : <></>}
            <p className="text-sm text-zinc-400">{desc || question || article}</p>
            <div className="flex gap-1">
                {tags.forEach(tag => (
                <div className="rounded-full bg-zinc-400 text-black">{tag}</div>
            ))}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-1 items-center"><StarFilledIcon className="text-yellow-500"/>{rating}</div>
                <span className="text-zinc-500">{author}</span>
            </div>
        </div>
    </Card>
  )
}

export default PostCard