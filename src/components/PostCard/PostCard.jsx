import React from 'react'
import Card from '../Card/Card'
import { StarFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from 'radix-ui'
import { Link } from 'react-router-dom'



function PostCard({postType, question, abstract, article, imageUrl, imageClass, imageAlt, imageSize = "max-h-[60%]" , title, desc, tags, rating, author, authorPhoto, width, height, createdAt, handleVisibility, menu}) {
  return (
    <Card className={`${width} ${height} shadow`} padding="p-0">
        {/* Img */}
        <img src={imageUrl} alt={imageAlt} className={`${imageClass} ${imageSize}`}/>
        {/* Text */}
        <div className="flex flex-col gap-2 p-4">
            <div className="flex justify-between">
                <h3 className="text-2xl text-zinc-900 text-wrap">{title}</h3>
                {/* Menu */}
                {menu ?
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="text-zinc-800" aria-label="Post Menu">
                            <DotsVerticalIcon />
                        </button>
                    </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                        <DropdownMenu.Content className="DropdownMenuContent flex flex-col gap-2 bg-gray-200 p-4 shadow-md rounded" sideOffset={5}>
                            {/* Dropdown Menu Items */}
                            
                            <DropdownMenu.Item className="DropdownMenuItem font-semibold text-white bg-zinc-500 py-2 px-4 hover:bg-zinc-600 rounded">
                            <button onClick={handleVisibility}>Hide Post</button>
                            </DropdownMenu.Item>


                    </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
                : ""
                }
                
            </div>
            <span className="text-xs text-zinc-400">{postType}</span>
            {abstract ? <p className="text-sm text-zinc-700 text-wrap">{abstract}</p> : <></>}
            <p className="text-sm text-zinc-500 text-wrap">{desc || question || article}</p>
            <div className="flex gap-2">
                {tags.map(tag => (
                <div className="bg-zinc-100 text-zinc-900 ring-1 ring-zinc-400 text-xs font-semibold w-fit py-1 px-3 rounded-full tracking-wide">{tag}</div>
            ))}
            </div>
            <div className="flex justify-between">
                {rating ? <div className="flex gap-1 items-center"><StarFilledIcon className="text-yellow-500"/>{rating}</div> : ""}
                <span className="text-zinc-300 text-xs">{createdAt}</span>
                <div className="flex gap-2">
                    <img className="w-4 h-4 rounded-full" src={authorPhoto}></img>
                    <span className="text-zinc-500 text-xs">{author}</span>
                </div>
            </div>
        </div>
    </Card>
  )
}

export default PostCard