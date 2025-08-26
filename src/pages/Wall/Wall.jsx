import { useEffect, useState } from "react";
import { fetchAllPosts } from "../../utils/firebase";
import PostCard from "../../components/PostCard/PostCard";
import Spinner from "../../components/Spinner/Spinner";
import WallSkeleton from "../../components/Skeleton/WallSkeleton";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Wall() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterOption, setFilterOption] = useState("Filter by...");
  const [query, setQuery] = useState("");

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

    const filter = filterOption.toLowerCase();
    const q = query.toLowerCase();

    let filtered = allPosts;
    
    if (filter === "title") {
      filtered = allPosts.filter(p => p.title.toLowerCase().includes(q));
    } else if (filter === "tag") {
      filtered = allPosts.filter(p => p.tags.includes(q));
    } else if (filter === "date") {
      filtered = allPosts.filter(p => p.createdAt.toDate().toLocaleString().includes(q));
    } else {
      filtered = allPosts;
    }
    setPosts(filtered);
  }

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
  }

  if (err) return <p>Failed to load posts.</p>;
  if (loading) return <WallSkeleton />

  return (
    <section className="max-w-screen-xl mx-auto mt-4 mb-4 flex">
      {/* Main Wall */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold self-center">The Wall</h1>
        <SearchBar divClassName="self-center" inputClassName="bg-white ring-1 ring-zinc-300 p-1 w-[400px]" buttonClassName="right-0 top-0 bg-white ring-1 ring-zinc-300 hover:bg-zinc-200 cursor-pointer h-full p-1" dropDown="true" dropDown1="None" dropDown2="Title" dropDown3="Tag" dropDown4="Date" handleFilterOption={handleFilterOption} filterOption={filterOption} query={query} handleQuery={handleQuery} handleChange={handleChange} /> 
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {posts.map(p => (
            <div className="break-inside-avoid mb-6">
            <PostCard key={p.id} imageUrl={p.imageUrl} postType={p.postType} question={p.question} abstract={p.abstract} article={p.article} imageAlt={p.imageAlt} title={p.title} desc={p.desc} tags={p.tags} author={p.authorName} authorPhoto={p.authorPhoto ?? null} width="w-full" height="h-fit" createdAt={p.createdAt.toDate().toLocaleString()}></PostCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
}
