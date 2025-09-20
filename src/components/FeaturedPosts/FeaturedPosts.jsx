import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import { fetchAllPosts, fetchFeaturedPosts } from '../../utils/firebase'
import Spinner from '../Spinner/Spinner';
import PostCardSkeleton from '../Skeleton/PostCardSkeleton';
import removeMd from 'remove-markdown';


function FeaturedPosts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          const all = await fetchFeaturedPosts();
          setAllPosts(all);
          setPosts([all[0], all[1], all[2]]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }, []);

  return (
    <>
        <section className="max-w-screen-xl mx-auto flex flex-col gap-4 mt-8 mb-8 items-center">
        <h2 className="text-2xl font-semibold">Featured Posts</h2>
        <div className="flex gap-8 w-full items-stretch">
          {loading ? 
          <div className="w-full flex justify-between">
            <PostCardSkeleton/>
            <PostCardSkeleton/>
            <PostCardSkeleton/>
          </div>
          : 
          posts.map(p => (
              <div key={p?.id} className="w-full">
                <PostCard id={p?.id} uid={p?.userId} imageUrl={p?.imageUrl} imageClass="object-cover" imageSize='w-full aspect-[16/9]' postType={p?.postType} question={removeMd(p?.question)} abstract={p?.abstract} article={removeMd(p?.article)} imageAlt={p?.imageAlt} title={p?.title} desc={removeMd(p?.desc)} tags={p?.tags} author={p?.authorName} authorPhoto={p?.authorPhoto ?? null} width="w-full" createdAt={p?.createdAt.toDate().toLocaleString()} likes={p.likeCount} comments={p.commentCount} ></PostCard>
              </div>
              ))
          }
        </div>
        </section>
    </>
  )
}

export default FeaturedPosts