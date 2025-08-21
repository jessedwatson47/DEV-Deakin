import React, { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext';
import { Avatar } from 'radix-ui';
import { PersonIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';



function Account() {
  const { user } = useAuth();
  const [verified, setVerified] = useState(false);
  console.log(user);

  useEffect(() => {
    if (user.emailVerified) {
      setVerified(true);
    }
  },[]);

  return (
    <section className="flex flex-col max-w-screen-xl min-h-[100dvh] w-full justify-center items-center">
      <h1 className="mb-">Account Settings</h1>
      <article className="ring-1 ring-zinc-200 flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] min-w-[20dvw] p-10 shadow-2xl rounded">
        {/* Avatar */}
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage w-20 h-20"
            src={user?.photoURL || undefined}
            alt="User Avatar Image"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            <PersonIcon className="w-20 h-20"/>
          </Avatar.Fallback>
        </Avatar.Root>
        {/* Display Name */}
        <div className="flex flex-col gap-2">
          Display Name
          <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200">{user.displayName ? user.displayName : "Set a display name"}</div>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          {verified ? <div className="flex gap-4">Email <div className="text-emerald-500 flex gap-1 items-center text-xs"><CheckCircledIcon /> Verified</div></div> : <div className="flex gap-4">Email <div className="text-red-500 flex gap-1 items-center text-xs"><CrossCircledIcon /> Not Verified</div></div>}
          <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200">{user.email}</div>
        </div>
     
      </article>
    </section>
  )
}

export default Account