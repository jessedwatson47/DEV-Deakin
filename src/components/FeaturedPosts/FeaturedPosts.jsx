import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import { fetchAllPosts } from '../../utils/firebase'

function FeaturedPosts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          const all = await fetchAllPosts({ pageSize: 100, random: true });
          setAllPosts(all);
          setPosts([all[1], all[2], all[3]]);
          console.log(all);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      })();
    }, []);
  return (
    <>
        <section className="max-w-screen-xl mx-auto flex flex-col gap-4 mt-8 mb-8 items-center">
        <h2 className="text-2xl font-semibold">Featured Posts</h2>
        <div className="flex gap-8 w-full">
          {posts.map(p => (
              <div key={p.id} className="w-full h-90">
                <PostCard id={p.id} uid={p.userId} imageUrl={p.imageUrl} imageClass="object-cover" imageSize='w-full max-h-30' postType={p.postType} question={p.question} abstract={p.abstract} article={p.article} imageAlt={p.imageAlt} title={p.title} desc={p.desc} tags={p.tags} author={p.authorName} authorPhoto={p.authorPhoto ?? null} width="w-full" height="h-fit" createdAt={p.createdAt.toDate().toLocaleString()} ></PostCard>
              </div>
              ))}
        </div>
        </section>
    </>
  )
}

export default FeaturedPosts