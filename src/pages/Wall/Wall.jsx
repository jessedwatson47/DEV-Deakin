import { useEffect, useState } from "react";
import { fetchAllPosts } from "../../utils/firebase";
import PostCard from "../../components/PostCard/PostCard";

export default function Wall() {
  const [posts, setPosts] = useState(null);
  const [err, setErr] = useState(null);
  
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
    <section className="max-w-screen-xl mx-auto mt-4">
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
      {posts.map(p => (
        <div className="break-inside-avoid">
         <PostCard key={p.id} imageUrl={p.imageUrl} postType={p.postType} question={p.question} abstract={p.abstract} article={p.article} imageAlt={p.imageAlt} title={p.title} desc={p.desc} tags={p.tags} author={p.authorName} authorPhoto={p.authorPhoto ?? null} width="w-full" height="h-fit" createdAt={p.createdAt.toDate().toLocaleString()}></PostCard>
        </div>
      ))}
    </div>
    </section>
  );
  
}
