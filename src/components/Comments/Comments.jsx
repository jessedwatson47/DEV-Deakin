import React, { useEffect, useState } from 'react'
import { deleteComment, subscribeToComments, subscribeToPost, updateSolution } from '../../utils/firebase'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { TrashIcon, StarIcon, StarFilledIcon  } from '@radix-ui/react-icons';

function Comments() {
  const [comments, setComments] = useState([])
  const [solutionId, setSolutionId] = useState(null);
  const { uid, id } = useParams();
  const { user } = useAuth();


  // use effect subscribe to post
  useEffect(() => {
    if (!uid || !id) return;
    const unsub = subscribeToPost(uid, id, (post) => setSolutionId(post.solutionCommentId ?? null), console.error);
    return () => unsub();
  }, [uid, id]);

  // use effect subscribe to comments
  useEffect(() => {
    if (!uid || !id) return;
    const unsub = subscribeToComments(id, uid, setComments, console.log);
    return () => unsub();
  }, [uid, id]);

  const handleDelete = async (comment) => {
    try {
      await deleteComment(comment);
      setComments((prev) => prev.filter(c => c.id !== comment.id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleSolution = async (comment) => {
    try {
      await updateSolution(comment);
      setSolutionId(comment.id);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(comments);
  return (
    <>
    {comments.map(comment => 
    <div className={comment.id === solutionId ? "flex flex-col bg-emerald-200 p-2 gap-4" : "flex flex-col bg-white p-2 gap-4"}>
      {comment.id === solutionId && <h4 className="uppercase font-semibold text-xs">Solution</h4>}
      <div className="flex gap-2 items-center">
        <img src={comment.authorPhoto} className="h-8 w-8 rounded-full object-cover"></img>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-800">{comment.authorName}</span>
          <span className="text-xs text-zinc-400">{comment.createdAt?.toDate().toLocaleString()}</span>
        </div>
        <div className="flex gap-1 ml-auto">
        {comment.authorId === user.uid && <button onClick={() => handleDelete(comment)} className="hover:bg-zinc-300 p-2 cursor-pointer rounded"><TrashIcon className="text-zinc-500"/></button>}
        {comment.ownerId === user.uid && <button onClick={() => handleSolution(comment)} className="hover:bg-zinc-300  p-2 cursor-pointer rounded">{solutionId === comment.id ? <StarFilledIcon /> : <StarIcon className="text-zinc-500"/>}</button>}
        </div>
      </div>
      <p className="text-zinc-600">{comment.text}</p>
    </div>
    )}
    </>
  )
}

export default Comments