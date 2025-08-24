import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../AuthContext';
import { Avatar, Toast } from 'radix-ui';
import { PersonIcon, CheckCircledIcon, CrossCircledIcon, Pencil2Icon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import Spinner from '../../../components/Spinner/Spinner';
import { sendVerification, updateDisplayName } from '../../../utils/firebase';

function Basic() {
  const { userLoading, user, userData } = useAuth();
  const [verified, setVerified] = useState(false);
  const [toast, setToast] = useState({title: "", description: "", ok: true})
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");

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

    const handleDisplayToggle = () => {
      setEditing(p => !p);
    }
    
    const handleDisplayNameChange = (e) => {
      setNewDisplayName(e.target.value);
    }

    const changeDisplayName = async () => {
      if (!newDisplayName) return;
      try {
        await updateDisplayName(newDisplayName);
        setToast({title: "Success!", description: `Display name updated succesfully. Hello ${user.displayName}`, ok: true})
      } catch (err) {
        console.log(err);
        setToast({title: "Oops!", description: `Please try changing your display name again.`, ok: false})
      } finally {
        setEditing(false);
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
          {editing 
            ? 
            <div className="relative">
              <input type="text" name="newDisplayName" value={newDisplayName} onChange={handleDisplayNameChange} className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full"></input>
              <span className="absolute left-2 top-[20%]">{user.displayName}</span>
              <button className="h-full hover:bg-emerald-100 rounded p-2 cursor-pointer absolute right-10" onClick={changeDisplayName}><CheckIcon/></button>
              <button className="h-full hover:bg-red-100 rounded p-2 cursor-pointer absolute right-2" onClick={handleDisplayToggle}><Cross2Icon/></button>
            </div>
            : 
            <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10">{user?.displayName ?? undefined }<button className="float-right h-full hover:bg-zinc-100 rounded p-1 cursor-pointer" onClick={handleDisplayToggle}><Pencil2Icon/></button></div>
            }
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          {user.emailVerified ? <div className="flex gap-4">Email <div className="text-emerald-500 flex gap-1 items-center text-xs"><CheckCircledIcon /> Verified</div></div> : <div className="flex gap-4">Email <div className="text-red-500 flex gap-1 items-center text-xs"><CrossCircledIcon /> Not Verified</div></div>}
          {user.emailVerified ? <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10">{user?.email ?? undefined}</div> : <div className="flex w-full justify-between"><div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-fit">{user?.email ?? undefined}</div><button onClick={handleSendVerification} type="button" className="rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90 cursor-pointer">Send Verification</button></div>}
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