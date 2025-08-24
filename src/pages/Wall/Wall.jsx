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
    <ul className="space-y-3">
      {posts.map(p => (
        <PostCard postType={p.postType} question={p.question} abstract={p.abstract} article={p.article} imgUrl={p.imgUrl} imgAlt={p.imgAlt} title={p.title} desc={p.desc} tags={p.tags} rating="5" author={p.userId} width="w-[300px]" height="h-fit" ></PostCard>
      ))}
    </ul>
  );
}
