import React, { useState } from 'react'
import FileUpload from '../FileUpload/FileUpload';

function NewPost() {

    const [post, setPost] = useState({
        postType: "question",
        title: "",
        question: "",
        tags: [],
        abstract: "",
        article: "",
        imageUrl: "",
    });


     const handleChange = (e) => {
        const {name, value} = e.target;
        setPost( (prev) => {
            return {...prev, [name]: value}
    })
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

    console.log(post);

  return (
    <form className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[30dvw] self-center p-10 rounded ring-1 ring-zinc-300">
            <div className="flex gap-4">
                <div className="flex gap-1">
                    <input type="radio" name="postType" id="question" value="question" checked={post.postType === "question"} onChange={handleChange}></input>
                    <label htmlFor="question">Question</label>
                </div>
                <div className="flex gap-1">
                    <input type="radio" name="postType" id="article" value="article" checked={post.postType === "article"} onChange={handleChange}></input>
                    <label htmlFor="article">Article</label>
                </div>
            </div>

        {/* Conditional Rendering */}

        {post.postType === "question" && (
        <>  
            <h3 className="text-lg font-semibold">What do you want to ask?</h3>
            <div className="flex flex-col gap-1">
                <FileUpload />
                <label htmlFor="question-title">Title</label>
                <input className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="title" onChange={handleChange} id="question-title" placeholder="Start your question with how, what, why, etc."/>
                <label htmlFor="question-content">Question</label>
                <textarea className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-40 w-full resize-none" name="question" id="question-content" onChange={handleChange}/>
                <label htmlFor="question-tags">Tags</label>
                <input className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="tags" id="question-tags" onKeyDown={handleKeyDown} placeholder="Press Enter to add a tag"/>
            </div>
        </>
        )}
        {post.postType === "article" && (
            <>  
            <h3 className="text-lg font-semibold">What do you want to share?</h3>
            <div className="flex flex-col gap-1">
                <FileUpload />
                <label htmlFor="article-title">Title</label>
                <input className="mb-4 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full" type="text" name="title" onChange={handleChange} id="article-title" placeholder="Enter a descriptive title"/>
                <label htmlFor="article-abstract">Abstract</label>
                <textarea className="mb-4 resize-none bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full h-20" name="abstract" onChange={handleChange} id="article-abstract" placeholder="Enter a 1-paragraph abstract"/>
                <label htmlFor="article-content">Article Text</label>
                <textarea className="mb-4 resize-none bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full h-40" name="article" onChange={handleChange} id="article-content" placeholder="Write your article here"/>
                <label htmlFor="article-tags">Tags</label>
                <input className="mb-2 bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 h-10 w-full submit-none" type="text" name="tags" onKeyDown={handleKeyDown} id="article-tags" placeholder="Press Enter to add a tag"/>
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                    <div className="bg-transparent text-zinc-900 ring-1 ring-zinc-400 text-xs font-semibold w-fit py-1 px-3 rounded-full tracking-wide">
                        {tag}
                    </div>
                ))}
                </div>
            </div>
        </>
        )}
        
        <button className="rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90">Post</button>
    </form>
  )
}

export default NewPost