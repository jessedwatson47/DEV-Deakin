import { useEffect, useState } from "react";
import { fetchAllPosts } from "../../utils/firebase";
import PostCard from "../../components/PostCard/PostCard";

export default function Wall() {
  const [posts, setPosts] = useState(null);
  const [err, setErr] = useState(null);
  // function timeSincePost(time) {
  //   const postTime = time.ToDate().ToLocaleString();
  //   const currentTime = Date().ToLocaleString();
  //   const timeSince = currentTime - postTime;
  //   return timeSince;
  // }

  useEffect(() => {
    (async () => {
      try {
        const all = await fetchAllPosts({ pageSize: 100 });
        setPosts(all);
        console.log(all);
      } catch (e) {
        console.log(e);
        setErr(e);
      }
    })();
  }, []);

  if (err) return <p>Failed to load posts.</p>;
  if (!posts) return <p>Loading…</p>;

  return (
    <section className="max-w-screen-xl mx-auto">
    <div className="flex flex-col gap-4">
      {posts.map(p => (
        <PostCard imageUrl={p.imageUrl} postType={p.postType} question={p.question} abstract={p.abstract} article={p.article} imgUrl={p.imgUrl} imgAlt={p.imgAlt} title={p.title} desc={p.desc} tags={p.tags} author={p.userId} width="w-[400px]" height="h-fit" createdAt={p.createdAt.toDate().toLocaleString()}></PostCard>
      ))}
    </div>
    </section>
  );
  
}
