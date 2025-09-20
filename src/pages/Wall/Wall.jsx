import { useEffect, useState } from "react";
import { doLike, fetchAllPosts } from "../../utils/firebase";
import PostCard from "../../components/PostCard/PostCard";
import Spinner from "../../components/Spinner/Spinner";
import WallSkeleton from "../../components/Skeleton/WallSkeleton";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link, useSearchParams} from "react-router-dom";
import removeMd from "remove-markdown";

export default function Wall() {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  // Search Params
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = (searchParams.get("q") || "").toLowerCase();
  const fParam = (searchParams.get("f") || "none").toLowerCase();
  const [query, setQuery] = useState(qParam);
  const [filterOption, setFilterOption] = useState(fParam);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const {posts, lastVisible, hasMore} = await fetchAllPosts({ pageSize: 10 });
        setAllPosts(posts);
        setLastVisible(lastVisible);
        setHasMore(hasMore);
      } catch (err) {
        console.error(err);
        setErr(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
  if (!allPosts?.length) return;

  const q = qParam.trim();
  const f = fParam;

  setQuery(q);
  setFilterOption(f);

  if (!q || f === 'none') {
    setVisiblePosts(allPosts);
    setNoResults(false);
    return;
  }

  let filtered = allPosts;
    
    if (f === "title") {
      filtered = allPosts.filter(p => p.title.toLowerCase().includes(q));
      if (filtered.length === 0) {
        setNoResults(true);
      }
    } else if (f === "tag") {
      filtered = allPosts.filter(p => p.tags.includes(q));
      setNoResults(false);
      if (filtered.length === 0) {
        setNoResults(true);
      }
    } else if (f === "date") {
      filtered = allPosts.filter(p => p.createdAt.toDate().toLocaleString().includes(q));
      setNoResults(false);
      if (filtered.length === 0) {
        setNoResults(true);
      }
    } else {
      filtered = allPosts;
    }
    setVisiblePosts(filtered);
}, [allPosts, qParam, fParam]);

 

  const handleFilterOption = (e) => {
    const filter = e.target.innerText.trim().toLowerCase();
    if (filter != "none") {
      setFilterOption(filter);
      setParam('f', filter);
    } else {
      setFilterOption("none");
      setVisiblePosts(allPosts);
    }
    
  }

  const handleLoadMore = async() => {
    if (!hasMore) return;
    const { posts: morePosts, lastVisible: nextLastVisible, hasMore: hm } = await fetchAllPosts({ pageSize: 10, after: lastVisible });

    setAllPosts(prev => [...prev, ...morePosts]);
    setLastVisible(nextLastVisible);
    setHasMore(hm);
  }


  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    setParam('q', q.toLowerCase());
  }

  const handleVisibility = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    setVisiblePosts(prev => prev.filter(post => post.id !== postId));
  }

  const handleLike = async (e, authorId, postId) => {
    e.preventDefault();
    e.stopPropagation();

    try{
      await doLike(authorId, postId)
      setVisiblePosts(prev => prev.map(p => p.id === postId ? { ...p, likeCount: (p.likeCount ?? 0) + 1 } : p));
    } catch (err) {
      console.error(err);
    }
  
  }

  // Param helper
  const setParam = (key, value) => {
  setSearchParams(prev => {
    const p = new URLSearchParams(prev);
    if (!value || value === 'none') {
      p.delete(key);
    } else {
      p.set(key, value);
    }
    return p;
  });
};

  if (err) return <p>Failed to load posts.</p>;
  if (loading) return <WallSkeleton />


  return (
    <section className="max-w-screen-xl mx-auto mt-4 mb-4 flex">
      {/* Main Wall */}
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-semibold self-center">The Wall</h1>
        <div className="flex mx-auto gap-8">
          <SearchBar divClassName="self-center" button={false} inputClassName="bg-white ring-1 ring-zinc-300 p-1 w-[400px]" buttonClassName="right-0 top-0 bg-white ring-1 ring-zinc-300 hover:bg-zinc-200 cursor-pointer h-10 p-1" dropDown="true" dropDown1="None" dropDown2="Title" dropDown3="Tag" dropDown4="Date" handleFilterOption={handleFilterOption} filterOption={filterOption} query={query} handleChange={handleChange} /> 
          <Link to="/post" className="font-semibold text-white bg-teal-500 py-2 px-4 hover:bg-teal-600 rounded">Create a Post</Link>
        </div>
          {noResults
            ?
              <p className="text-zinc-400 self-center">No results found for "<span className="text-zinc-900">{query}</span>".</p>
            :
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {visiblePosts.map(p => (
              <div key={p.id} className="break-inside-avoid mb-6">
                <PostCard id={p.id} uid={p.userId} imageUrl={p.imageUrl} videoUrl={p.videoUrl} imageClass="object-cover" postType={p.postType} question={removeMd(p.question)} abstract={p.abstract} article={removeMd(p.article)} imageAlt={p.imageAlt} title={p.title} desc={removeMd(p.desc)} tags={p.tags} author={p.authorName} authorPhoto={p.authorPhoto ?? null} width="w-full" height="h-fit" createdAt={p.createdAt.toDate().toLocaleString()} handleVisibility={(e) => handleVisibility(e, p.id)} menu="true" likes={p.likeCount} handleLike={(e) => handleLike(e, p.userId, p.id)} isLiked={isLiked} comments={p.commentCount} solution={p.solution}></PostCard>
              </div>
              ))}
            </div>
          }
          {hasMore ? <button onClick={handleLoadMore} className="rounded-full transparent w-fit py-1 px-2 ring-1 ring-zinc-300 text-zinc-600 self-center cursor-pointer hover:ring-zinc-600 hover:text-zinc-900">Load More</button> : <p className="rounded-full w-fit py-1 px-2 text-zinc-600 self-center">No more posts</p>}
      </div>
    </section>
  );
  
}
