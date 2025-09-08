import React, { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext';
import { useParams } from 'react-router-dom';
import { createComment } from '../../utils/firebase';
import { Toast } from 'radix-ui';


function NewComment() {
  const { user } = useAuth();
  const { uid, id } = useParams();
  const [toast, setToast] = useState({title: "", description: "", ok: true});
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({
    text: "",
    authorId: user?.uid,
    postId: id,
    ownerId: uid,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.uid) {
          alert("Please login");
          return
      }

    setIsSubmitting(true);
    try {
      await createComment(comment);
      setToast({title: "Success!", description: "You commented.", ok: true})
    } catch (err) {
      console.log(err);
      setToast({title: "Oops!", description: "Failed to comment, try again.", ok: false})
    } finally {
      setIsSubmitting(false);
      setOpen(true);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment( (prev) => {
      return {...prev, [name]:value}
    })
  }


  console.log(comment);
  console.log(toast);
  return (
    <>
      {/* Toast */}
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={`rounded-lg border px-4 py-3 shadow bg-white ${
          toast.ok ? "border-emerald-300" : "border-red-300"
        }`}
      >
        <Toast.Title className="font-medium">{toast.title}</Toast.Title>
        {toast.description && (
          <Toast.Description className="mt-1 text-sm text-zinc-600">
            {toast.description}
          </Toast.Description>
        )}
        <Toast.Close className="absolute right-2 top-2">×</Toast.Close>
      </Toast.Root>
    <form onSubmit={handleSubmit} className="">
        <div className="flex gap-2 items-center">
            <img src={user?.photoURL} alt="user photo" className="w-6 h-6 rounded-full object-cover"/>
            <textarea className="bg-white ring-1 ring-zinc-200 rounded py-1 px-2 flex-1 resize-none"name="text" id="text" value={comment.text} onChange={handleChange} placeholder="Write a comment"></textarea>
            <button disabled={isSubmitting} className="rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-900">Post</button>
        </div>
    </form>
    </>
  )
}

export default NewComment