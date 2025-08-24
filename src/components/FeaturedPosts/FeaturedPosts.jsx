import React from 'react'
import PostCard from '../PostCard/PostCard'

function FeaturedPosts() {
  return (
    <>
        <section className="max-w-screen-xl mx-auto flex flex-col gap-4 mt-8 mb-8 items-center">
        <h2 className="text-2xl font-semibold">Featured Posts</h2>
        <div className="flex gap-8">
            <PostCard width="w-[300px]" height="h-[400px]" imgUrl="src/assets/students-1.jpg" imgAlt="Students" title="GOAT Students" desc="Check out the best performing students of this year and what they had to say." tags={["React", "GOAT", "JavaScript"]} rating="5" author="Admin"></PostCard>
            <PostCard width="w-[300px]" height="h-[400px]" imgUrl="src/assets/students-1.jpg" imgAlt="Students" title="GOAT Students" desc="Check out the best performing students of this year and what they had to say." tags={["React", "GOAT", "JavaScript"]} rating="5" author="Admin"></PostCard>
            <PostCard width="w-[300px]" height="h-[400px]" imgUrl="src/assets/students-1.jpg" imgAlt="Students" title="GOAT Students" desc="Check out the best performing students of this year and what they had to say." tags={["React", "GOAT", "JavaScript"]} rating="5" author="Admin"></PostCard>
        </div>
        </section>
    </>
  )
}

export default FeaturedPosts