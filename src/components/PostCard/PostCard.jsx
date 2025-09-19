import React from 'react'
import Card from '../Card/Card'
import { StarFilledIcon, DotsVerticalIcon, ChatBubbleIcon, PlayIcon} from '@radix-ui/react-icons'
import { DropdownMenu } from 'radix-ui'
import { Link } from 'react-router-dom'
import Comment from '../Comments/Comment'
import Like from '../Like/Like'

function PostCard({ id, uid, postType, question, abstract, article, imageUrl, videoUrl, imageClass, imageAlt, imageSize = "max-h-[60%]" , title, desc, tags, rating, author, authorPhoto, width, height, createdAt, handleVisibility, menu, likes, comments, isLiked, handleLike, solution}) {
  return (
    <Link to={`/post/${uid}/${id}`}>
        <Card className={`${width} ${height} shadow overflow-hidden h-full flex flex-col`} padding="p-0">
            {/* Media */}
            {imageUrl && <img src={imageUrl} alt={imageAlt} className={`${imageClass} ${imageSize}`}/>}
            {videoUrl && <div className="relative inline-block"><video src={videoUrl}></video> <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-teal-500 rounded-full p-2 opacity-90 hover:opacity-80"><PlayIcon className="h-8 w-8"/></div> </div>}
            {/* Text */}
            <div className="flex flex-col gap-2 p-4 h-full">
                <div className="flex justify-between">
                    <h3 className="text-2xl text-zinc-900 text-wrap">{title}</h3>
                    {/* Menu */}
                    {menu ?
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="text-zinc-800 p-2 cursor-pointer hover:bg-zinc-300 rounded" aria-label="Post Menu" onClick={(e) => e.stopPropagation()}>
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
                <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            {tags?.map(tag => (
                            <div className="bg-zinc-100 text-zinc-900 ring-1 ring-zinc-400 text-xs font-semibold w-fit py-1 px-3 rounded-full tracking-wide">{tag}</div>
                        ))}
                        </div>
                        <div className="flex gap-1 items-center">
                            <Like likes={likes} isLiked={isLiked} handleLike={handleLike} />
                            <div className="flex gap-1 ml-2">
                            <ChatBubbleIcon />
                            <span className="text-sm font-semibold text-zinc-500">{comments || 0}</span>
                            </div>
                        </div>
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
            </div>
            {solution && 
            <Comment comment={solution}/>}
        </Card>
    </Link>
  )
}

export default PostCard
