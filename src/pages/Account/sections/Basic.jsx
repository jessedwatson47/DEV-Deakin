import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Avatar, Toast } from 'radix-ui';
import { PersonIcon, CheckCircledIcon, CrossCircledIcon, Pencil2Icon, CheckIcon, Cross2Icon, CubeIcon, RocketIcon } from '@radix-ui/react-icons';
import Spinner from '../../../components/Spinner/Spinner';
import { sendVerification, updateDisplayName, updateDisplayPicture, uploadImage } from '../../../utils/firebase';
import FileUpload from '../../../components/FileUpload/FileUpload';

function Basic() {
  const { userLoading, user, userData, refreshUser } = useAuth();
  const [verified, setVerified] = useState(false);
  const [toast, setToast] = useState({title: "", description: "", ok: true})
  const [open, setOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [editingDisplayPicture, setEditingDisplayPicture] = useState(false);
  
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  // const [newDisplayPicture, setNewDisplayPicture] = useState(false); ues this to try and preview new pfp and replace avatar..

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

    const handleDisplayNameToggle = () => {
      setEditingName(p => !p);
    }

    const handleDisplayPictureToggle = () => {
      setEditingDisplayPicture(p => !p);
    }
    
    const handleDisplayNameChange = (e) => {
      setNewDisplayName(e.target.value);
    }

    const handleUploadChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    const handleUpload = async () => {
        if (!file) return;
        try {
          const url = await uploadImage(file);
          setImageUrl(url);
          await updateDisplayPicture(url);
          await refreshUser();
          setToast({title: "Success!", description: "Display picture updated successfully!", ok: true})
        }
        catch (err) {
          console.log("Error uploading file / updating display picture", err)
          setToast({title: "Oops!", description: "Display picture updated failed to update. Please try again.", ok: false})
        } finally {
          setOpen(true);
          setEditingDisplayPicture(false);
        }   
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
        setEditingName(false);
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

      <article className="shadow flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded">
        {/* Avatar */}
        <Avatar.Root className="relative w-fit">
          <Avatar.Image
            className="rounded-full w-20 h-20 ring-2 ring-zinc-300 object-cover shadow-lg"
            src={(userData?.photoURL || imageUrl) ?? undefined}
            alt="User Avatar Image"
          />
    
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            <PersonIcon className="w-20 h-20"/>
          </Avatar.Fallback>
          {editingDisplayPicture ? <div className="mt-4"><FileUpload fileName={fileName} file={file} handleUpload={handleUpload} handleUploadChange={handleUploadChange} /></div> : <button onClick={handleDisplayPictureToggle} className="absolute right-0 top-0 text-zinc-500 bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded"><Pencil2Icon/></button>}
          
        </Avatar.Root>
        {/* Plan */}
        {userData?.plan === "free" ?
        <div className="flex gap-2 bg-emerald-200 w-fit py-1 px-2 rounded-full">
          <p className="text-xs text-emerald-800">{userData?.plan.toUpperCase()} PLAN </p>
          <CubeIcon className="text-emerald-800"/>
        </div>
        :
        <div className="flex gap-2 bg-amber-200 w-fit py-1 px-2 rounded-full">
          <p className="text-xs text-amber-800">{userData?.plan.toUpperCase()} PLAN </p>
          <RocketIcon className="text-amber-800"/>
        </div>
        }
        {/* Display Name */}
        <div className="flex flex-col gap-2">
          Display Name
          {editingName 
            ? 
            <div className="relative">
              <input type="text" name="newDisplayName" value={newDisplayName} onChange={handleDisplayNameChange} className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full"></input>
              <span className="absolute left-2 top-[20%]">{newDisplayName ? "" : user.displayName}</span>
              <button className="h-full hover:bg-emerald-100 rounded p-2 cursor-pointer absolute right-10" onClick={changeDisplayName}><CheckIcon/></button>
              <button className="h-full hover:bg-red-100 rounded p-2 cursor-pointer absolute right-2" onClick={handleDisplayNameToggle}><Cross2Icon/></button>
            </div>
            : 
            <div className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10">{user?.displayName ?? undefined }<button className="float-right h-full hover:bg-zinc-100 rounded p-1 cursor-pointer" onClick={handleDisplayNameToggle}><Pencil2Icon/></button></div>
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