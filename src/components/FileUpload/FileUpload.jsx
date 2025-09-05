import React, { useState } from 'react'
import { UploadIcon } from '@radix-ui/react-icons'

function FileUpload({fileName, handleUpload, handleUploadChange, imageUrl, accept = "image/*" }) {

  return (
    <>
    <div className="flex items-center gap-2 mb-4">
      <label htmlFor="file-upload" className="cursor-pointer rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90">Choose file</label>
      <span className="flex-1">{fileName}</span>
      <input id="file-upload" type="file" accept={accept} className="hidden flex-1" onChange={handleUploadChange}></input>
      <button className="cursor-pointer rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90" type="button" onClick={handleUpload}><UploadIcon/></button>
    </div>
    {imageUrl ? <img src={imageUrl} className="size-50 object-cover"/> : ""}
    </>
  )
}

export default FileUpload