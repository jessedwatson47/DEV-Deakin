import { useEffect, useState } from "react";
import { fetchAllPosts } from "../../utils/firebase";
import PostCard from "../../components/PostCard/PostCard";
import Spinner from "../../components/Spinner/Spinner";
import WallSkeleton from "../../components/Skeleton/WallSkeleton";

export default function Wall() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const all = await fetchAllPosts({ pageSize: 100 });
        setPosts(all);
        console.log(all);
      } catch (e) {
        console.log(e);
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (err) return <p>Failed to load posts.</p>;
  if (loading) return <WallSkeleton />

  return (
    <section className="max-w-screen-xl mx-auto mt-4 mb-4">
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
      {posts.map(p => (
        <div className="break-inside-avoid mb-6">
         <PostCard key={p.id} imageUrl={p.imageUrl} postType={p.postType} question={p.question} abstract={p.abstract} article={p.article} imageAlt={p.imageAlt} title={p.title} desc={p.desc} tags={p.tags} author={p.authorName} authorPhoto={p.authorPhoto ?? null} width="w-full" height="h-fit" createdAt={p.createdAt.toDate().toLocaleString()}></PostCard>
        </div>
      ))}
    </div>
    </section>
  );
  
}
