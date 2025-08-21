import React, { useState } from 'react'

function FileUpload() {
    const [fileName, setFileName] = useState("No file chosen");
  return (
    <div className="flex items-center gap-2 mb-4">
        <label htmlFor="file-upload" className="cursor-pointer rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90">Choose file</label>
        <span>{fileName}</span>
        <input id="file-upload" type="file" className="hidden" onChange={(e) => setFileName(e.target.files[0]?.name) || "No file chosen"}></input>
    </div>
  )
}

export default FileUpload