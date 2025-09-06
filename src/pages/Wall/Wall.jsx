import { useEffect, useState } from "react";
import { doLike, fetchAllPosts } from "../../utils/firebase";
import PostCard from "../../components/PostCard/PostCard";
import Spinner from "../../components/Spinner/Spinner";
import WallSkeleton from "../../components/Skeleton/WallSkeleton";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default function Wall() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterOption, setFilterOption] = useState("Filter by...");
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const all = await fetchAllPosts({ pageSize: 100 });
        setAllPosts(all);
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

  const handleFilterOption = (e) => {
    const filter = e.target.innerText.trim();
    if (filter != "None") {
      setFilterOption(filter);
    } else {
      setFilterOption("Filter by...");
      setPosts(allPosts);
    }
    
  }

  const handleQuery = () => {
    if (!query) return;
    setNoResults(false);

    const filter = filterOption.toLowerCase();
    const q = query.toLowerCase();

    let filtered = allPosts;
    
    if (filter === "title") {
      filtered = allPosts.filter(p => p.title.toLowerCase().includes(q));
      if (filtered.length === 0) {
        setNoResults(true);
      }
    } else if (filter === "tag") {
      filtered = allPosts.filter(p => p.tags.includes(q));
      if (filtered.length === 0) {
        setNoResults(true);
      }
    } else if (filter === "date") {
      filtered = allPosts.filter(p => p.createdAt.toDate().toLocaleString().includes(q));
      if (filtered.length === 0) {
        setNoResults(true);
      }
    } else {
      filtered = allPosts;
    }
    setPosts(filtered);
  }

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
  }

  const handleVisibility = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  }

  const handleLike = async (postId, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(postId)

    try{
      await doLike(postId)
      setIsLiked(true);
    } catch (err) {
      console.log(err);
    }
  
  }

  if (err) return <p>Failed to load posts.</p>;
  if (loading) return <WallSkeleton />

  console.log(allPosts);

  return (
    <section className="max-w-screen-xl mx-auto mt-4 mb-4 flex">
      {/* Main Wall */}
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-semibold self-center">The Wall</h1>
        <div className="flex mx-auto gap-8">
          <SearchBar divClassName="self-center" inputClassName="bg-white ring-1 ring-zinc-300 p-1 w-[400px]" buttonClassName="right-0 top-0 bg-white ring-1 ring-zinc-300 hover:bg-zinc-200 cursor-pointer h-10 p-1" dropDown="true" dropDown1="None" dropDown2="Title" dropDown3="Tag" dropDown4="Date" handleFilterOption={handleFilterOption} filterOption={filterOption} query={query} handleQuery={handleQuery} handleChange={handleChange} /> 
          <Link to="/post" className="font-semibold text-white bg-teal-500 py-2 px-4 hover:bg-teal-600 rounded">Create a Post</Link>
        </div>
          {noResults
            ?
              <p className="text-zinc-400 self-center">No results found for "<span className="text-zinc-900">{query}</span>".</p>
            :
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {posts.map(p => (
              <div key={p.id} className="break-inside-avoid mb-6">
                <PostCard id={p.id} uid={p.userId} imageUrl={p.imageUrl} videoUrl={p.videoUrl} imageClass="object-cover" postType={p.postType} question={p.question} abstract={p.abstract} article={p.article} imageAlt={p.imageAlt} title={p.title} desc={p.desc} tags={p.tags} author={p.authorName} authorPhoto={p.authorPhoto ?? null} width="w-full" height="h-fit" createdAt={p.createdAt.toDate().toLocaleString()} handleVisibility={() => handleVisibility(p.id)} menu="true" likes={p.likes} handleLike={(e) => handleLike(p.id, e)} isLiked={isLiked}></PostCard>
              </div>
              ))}
            </div>
          }
        
      </div>
    </section>
  );
  
}
