import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../AuthContext';
import { Avatar, Toast } from 'radix-ui';
import { PersonIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import Spinner from '../../../components/Spinner/Spinner';
import { sendVerification } from '../../../utils/firebase';

function Basic() {
  const { userLoading, user, userData } = useAuth();
  const [verified, setVerified] = useState(false);
  const [toast, setToast] = useState({title: "", description: "", ok: true})
  const [open, setOpen] = useState(false);

  if (userLoading) return (
    <article className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded items-center justify-center">
      <Spinner/>
    </article>)


    async function handleSendVerification() {
      try {
        await sendVerification();
        setToast({title: "Verification email sent!", description: "Check your inbox and follow the steps to verify your email.", ok: true})
      } catch (err) {
         setToast({title: "Oops!", description: "Please try sending a verification email again.", ok: false})
      } finally {
        setOpen(true);
      }
    }

  return (
    <>
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

      <article className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded">
        {/* Avatar */}
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage w-20 h-20"
            src={user?.photoURL ?? undefined}
            alt="User Avatar Image"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            <PersonIcon className="w-20 h-20"/>
          </Avatar.Fallback>
        </Avatar.Root>
        {/* Display Name */}
        <div className="flex flex-col gap-2">
          Display Name
          <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10">{user?.displayName ?? undefined }</div>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          {verified ? <div className="flex gap-4">Email <div className="text-emerald-500 flex gap-1 items-center text-xs"><CheckCircledIcon /> Verified</div></div> : <div className="flex gap-4">Email <div className="text-red-500 flex gap-1 items-center text-xs"><CrossCircledIcon /> Not Verified</div></div>}
          {verified ? <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10">{user?.email ?? undefined}</div> : <div className="flex w-full justify-between"><div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-fit">{user?.email ?? undefined}</div><button onClick={handleSendVerification} type="button" className="rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90 cursor-pointer">Send Verification</button></div>}
        </div>
        {/* CreatedAt */}
        <div className="flex flex-col gap-2">
          Joined
          <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10">{userData?.createdAt.toDate().toLocaleString() ?? undefined}</div>
        </div>
      </article>
    </>
  )
}

export default Basic