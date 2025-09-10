import React, { useState, useEffect } from 'react'
import { fetchAllPosts } from '../../../utils/firebase';
import { useAuth } from '../../../context/AuthContext';
import Spinner from '../../../components/Spinner/Spinner';
import { deletePosts } from '../../../utils/firebase';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, userLoading } = useAuth();
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastVisible, setLastVisible] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    console.log(selectedPosts);
    
      useEffect(() => {
        (async () => {
          try {
            setLoading(true);
            const {posts: all, lastVisible, hasMore} = await fetchAllPosts({ pageSize: pageSize, uid: user.uid } );
            setPosts(all);
            setVisiblePosts(all);
            setLastVisible(lastVisible);
            setHasMore(hasMore);
          } catch (e) {
            console.log(e);
            setErr(e);
          } finally {
            setLoading(false);
          }
        })();
      }, []);

    const handleLoadMore = async() => {
    if (posts.length > pageSize * pageNumber) {
      const targetPage = pageNumber + 1;
      const next = posts.slice(pageNumber * pageSize, Math.min(targetPage * pageSize, posts.length));
      console.log("Next debug", next);
      setVisiblePosts(next);
      setPageNumber(prev => prev + 1);
      return;
    };
    if (!hasMore) return;
    const { posts: morePosts, lastVisible: nextLastVisible, hasMore: hm } = await fetchAllPosts({ pageSize: pageSize, after: lastVisible });

    setPosts(prev => [...prev, ...morePosts]);
    setVisiblePosts(morePosts);
    setLastVisible(nextLastVisible);
    setHasMore(hm);
    setPageNumber(prev => prev + 1);
  }

  const handleLoadBack = () => {
    const targetPage = pageNumber - 1;
    const back = posts.slice((targetPage - 1) * pageSize, Math.min(targetPage * pageSize, posts.length));
    console.log("Back debug", back);
    setVisiblePosts(back);
    setPageNumber(prev => prev - 1)
  }

    
    if (loading) return (
    <article className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded items-center justify-center">
      <Spinner/>
    </article>)

    const handleCheck = (postId, checked) => {
        setSelectedPosts((prev) => 
        checked ? [...prev, postId] : prev.filter((post) => post !== postId)
     );
    }
    
    const allChecked = visiblePosts.length > 0 && selectedPosts.length === visiblePosts.length;
    const handleAllCheck = (checked) => {
        setSelectedPosts(checked ? visiblePosts.map(p => p.id) : [])
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deletePosts(selectedPosts);
            setPosts(prev => prev.filter(p => !selectedPosts.includes(p.id)));
        } catch (err) {
            console.log(err);
        }
        finally {
            setIsDeleting(false);
        }
    }

    console.log("posts array length =", posts.length)

  return (
    <article className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded">
        <div className="flex flex-col gap-4 w-full">
          {visiblePosts.length === 0
            ?
              <p className="text-zinc-400 self-center">You haven't made a post yet!</p>
            :
            <table className="text-sm text-left">
                <thead className="text-base text-zinc-700">
                    <tr>
                        <th className="p-2"><input type="checkbox"checked={allChecked} onChange={(e) => handleAllCheck(e.target.checked)} className="accent-teal-600"/></th>
                        <th className="p-2">Title</th>
                        <th className="p-2">Posted</th>
                        <th className="p-2">Type</th>
                    </tr>
                </thead>
                <tbody>
              {visiblePosts.map(p => (
              <tr key={p.id} className="even:bg-white odd:bg-zinc-200">
                <td className="p-2"><input type="checkbox" checked={selectedPosts.includes(p.id)} onChange={(e) => handleCheck(p.id, e.target.checked)} className="accent-teal-600"/></td>
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.createdAt.toDate().toLocaleString()}</td>
                <td className="p-2">{p.postType}</td>

              </tr>
              ))}
              </tbody>
            </table>
        }
        {/* Pagination Menu */}
        <div className="flex items-center gap-1 self-center">
          <button disabled={pageNumber === 1} onClick={handleLoadBack} className="p-2 hover:bg-zinc-200 cursor-pointer ring-1 ring-zinc-200 rounded disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-100"><ChevronLeftIcon/></button>
          <button className="p-2">{pageNumber}</button>
          <button disabled={!hasMore} onClick={handleLoadMore} className="p-2 hover:bg-zinc-200 cursor-pointer ring-1 ring-zinc-200 rounded disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-100"><ChevronRightIcon/></button>
        </div>
        {/* Delete Button */}
        {posts.length > 0 ? <button disabled={isDeleting || selectedPosts.length === 0} onClick={handleDelete} className="cursor-pointer bg-red-500 text-white py-2 px-4 hover:bg-red-400 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500">Delete</button> : undefined}
        </div>
    </article>
  )
}

export default Posts