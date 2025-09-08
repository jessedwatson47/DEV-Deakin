import React, { useEffect, useState } from 'react'
import { fetchComments } from '../../utils/firebase'
import { useParams } from 'react-router-dom';

function Comments() {
  const [comments, setComments] = useState([])
  const { uid, id } = useParams();

  useEffect( () => {
    const fetch = async () => {
      try {
        const data = await fetchComments(id, uid);
        console.log("COMMENT DATA", data);
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  },[])

  console.log(comments);
  return (
    <>
    {comments.map(comment => 
    <div className="flex flex-col bg-white p-2 gap-4">
      <div className="flex gap-2 items-center">
        <img src={comment.authorPhoto} className="h-8 w-8 rounded-full object-cover"></img>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-800">{comment.authorName}</span>
          <span className="text-xs text-zinc-400">{comment.createdAt.toDate().toLocaleString()}</span>
        </div>

      </div>
      <p className="text-zinc-600">{comment.text}</p>
    </div>
    )}
    </>
  )
}

export default Comments