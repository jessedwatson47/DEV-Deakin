import React from 'react'
import { Form } from 'radix-ui'
import NewPost from '../../components/NewPost/NewPost'
function Post() {
  return (
    <section className="flex flex-col max-w-screen-xl min-h-[100dvh] w-[30%] mx-auto gap-4 mt-8">
        <h1 className="text-2xl">Create a Post</h1>
        <NewPost />
    </section>
  )
}

export default Post