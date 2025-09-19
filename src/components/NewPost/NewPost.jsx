import React, { useState } from 'react'
import FileUpload from '../FileUpload/FileUpload';
import { useAuth } from '../../context/AuthContext';
import { createPost, uploadImage, uploadVideo } from '../../utils/firebase';
import { Toast } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';

// MD
import MarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark-dimmed.css";


function NewPost() {
    const { user } = useAuth();
    const [toast, setToast] = useState({title: "", description: "", ok: true})
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [videoObject, setVideoObject] = useState(null);

    const [post, setPost] = useState({
        postType: "question",
        title: "",
        question: "",
        tags: [],
        abstract: "",
        article: "",
        imageUrl: "",
        videoUrl: "",
        likeCount: 0,
        viewCount: 0,
        authorId: user.uid,
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost( (prev) => {
            return {...prev, [name]: value}
    })
    }

    const handleUploadChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        let url;
        if (file.type.startsWith("video"))
        {
            try {
                url = await uploadVideo(file);
                setVideoUrl(url);
                setPost( (prev) => {
                return {...prev, videoUrl: url }});
            } catch (err) {
                console.log(err);
                setIsUploading(false);
            }
        }

        if (file.type.startsWith("image"))
        {
            try {
                url = await uploadImage(file);
                setImageUrl(url);
                console.log("image uploaded");
                setPost( (prev) => {
                return {...prev, imageUrl: url}});
                
            } catch (err) {
                console.log(err);
                setIsUploading(false);
            }
        }
        
    }


    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const value = e.target.value.trim().toLowerCase();

        if (value !== "") {
        setPost((prev) => ({
            ...prev,
            tags: [...prev.tags, value],
        }));
        e.target.value = "";
        }
    }
    };

    const handleTag = (e, tag) => {
        e.preventDefault();

        setPost((prev) => ({
            ...prev,
            tags: [...prev.tags.filter(t => t !== tag)],
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user.uid) {
            alert("Please login");
            return
        }

        try {
            createPost(post);
            setPost(prev => ({ ...prev, title: "", question: "", tags: [], article: "", abstract: "", imageUrl: "", videoUrl: ""}));
            setToast({title: "Success!", description: "Post created, go check what people have to say about it.", ok: true})
        } catch (err) {
            console.error(err);
            setToast({title: "Oops!", description: "Failed to create post, please try again.", ok: false})
        } finally {
            setOpen(true);
        }
    };

    console.log(post);

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
        
     {/*Form  */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[30dvw] self-center p-10 rounded ring-1 ring-zinc-300">
            <div className="flex gap-4">
                <div className="flex gap-1">
                    <input type="radio" name="postType" id="question" value="question" checked={post.postType === "question"} onChange={handleChange}></input>
                    <label htmlFor="question">Question</label>
                </div>
                <div className="flex gap-1">
                    <input type="radio" name="postType" id="article" value="article" checked={post.postType === "article"} onChange={handleChange}></input>
                    <label htmlFor="article">Article</label>
                </div>
                <div className="flex gap-1">
                    <input type="radio" name="postType" id="tutorial" value="tutorial" checked={post.postType === "tutorial"} onChange={handleChange}></input>
                    <label htmlFor="article">Tutorial</label>
                </div>
            </div>

        {/* Conditional Rendering */}

        {post.postType === "question" && (
        <>  
            <h3 className="text-lg font-semibold">What do you want to ask?</h3>
            <div className="flex flex-col gap-1">
                <FileUpload file={file} fileName={fileName} handleUpload={handleUpload} handleUploadChange={handleUploadChange} imageUrl={imageUrl}/>
                <label htmlFor="question-title">Title</label>
                <input className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="title" onChange={handleChange} id="question-title" placeholder="Start your question with how, what, why, etc."/>
                <label htmlFor="question-content">Question</label>
                <textarea className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-40 w-full resize-none" name="question" id="question-content" onChange={handleChange}/>
                Preview
                <div className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-40 overflow-scroll w-full prose">
                    <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {post.question}
                    </MarkDown>
                </div>
                <label htmlFor="question-tags">Tags</label>
                <input className="mb-2 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="tags" id="question-tags" onKeyDown={handleKeyDown} placeholder="Press Enter to add a tag"/>
                <div className="flex gap-2">
                    {post.tags?.map(tag => (
                    <div className="flex gap-1 bg-transparent text-zinc-900 ring-1 ring-zinc-400 text-xs font-semibold w-fit py-1 px-3 rounded-full tracking-wide">
                        <p>{tag}</p>
                        <button className="cursor-pointer rounded hover:bg-zinc-300 p-1" onClick={(e) => handleTag(e, tag)}><Cross2Icon className="h-3 w-3 text-zinc-500"/></button>
                    </div>
                ))}
                </div>
            </div>
        </>
        )}
        {post.postType === "article" && (
            <>  
            <h3 className="text-lg font-semibold">What do you want to share?</h3>
            <div className="flex flex-col gap-1">
                <FileUpload file={file} fileName={fileName} handleUpload={handleUpload} handleUploadChange={handleUploadChange} imageUrl={imageUrl}/>
                <label htmlFor="article-title">Title</label>
                <input className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="title" onChange={handleChange} id="article-title" placeholder="Enter a descriptive title"/>
                <label htmlFor="article-abstract">Abstract</label>
                <textarea className="mb-4 resize-none bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full h-20" name="abstract" onChange={handleChange} id="article-abstract" placeholder="Enter a 1-paragraph abstract"/>
                <label htmlFor="article-content">Article Text</label>
                <textarea className="mb-4 resize-none bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full h-40" name="article" onChange={handleChange} id="article-content" placeholder="Write your article here"/>
                Preview
                <div className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-40 overflow-scroll w-full prose">
                    <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {post.article}
                    </MarkDown>
                </div>
                <label htmlFor="article-tags">Tags</label>
                <input className="mb-2 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full submit-none" type="text" name="tags" onKeyDown={handleKeyDown} id="article-tags" placeholder="Press Enter to add a tag"/>
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                    <div className="flex gap-1 bg-transparent text-zinc-900 ring-1 ring-zinc-400 text-xs font-semibold w-fit py-1 px-3 rounded-full tracking-wide">
                        <p>{tag}</p>
                        <button className="cursor-pointer rounded hover:bg-zinc-300 p-1" onClick={(e) => handleTag(e, tag)}><Cross2Icon className="h-3 w-3 text-zinc-500"/></button>
                    </div>
                ))}
                </div>
            </div>
        </>
        )}
        {post.postType === "tutorial" && (
        <>  
            <h3 className="text-lg font-semibold">What is the tutorial about?</h3>
            <div className="flex flex-col gap-1">
                <FileUpload accept="video/*" file={file} fileName={fileName} handleUpload={handleUpload} handleUploadChange={handleUploadChange} imageUrl={imageUrl}/>
                {videoUrl && <p className="text-xs text-emerald-500">Video uploaded successfully!</p>}
                <label htmlFor="tutorial-title">Title</label>
                <input className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="title" onChange={handleChange} id="tutorial-title" placeholder="Choose a relevant title"/>
                <label htmlFor="tutorial-content">Description</label>
                <textarea className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-40 w-full resize-none" name="description" id="tutorial-content" onChange={handleChange} placeholder="Add extra information"/>
                Preview
                <div className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-40 overflow-scroll w-full prose">
                    <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {post.description}
                    </MarkDown>
                </div>
                <label htmlFor="tutorial-tags">Tags</label>
                <input className="mb-2 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="tags" id="tutorial-tags" onKeyDown={handleKeyDown} placeholder="Press Enter to add a tag"/>
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                    <div className="flex gap-1 bg-transparent text-zinc-900 ring-1 ring-zinc-400 text-xs font-semibold w-fit py-1 px-3 rounded-full tracking-wide">
                        <p>{tag}</p>
                        <button className="cursor-pointer rounded hover:bg-zinc-300 p-1" onClick={(e) => handleTag(e, tag)}><Cross2Icon className="h-3 w-3 text-zinc-500"/></button>
                    </div>
                ))}
                </div>
            </div>
        </>
        )}
        
        <button className="rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90">Post</button>
    </form>
    </>
  )
}

export default NewPost